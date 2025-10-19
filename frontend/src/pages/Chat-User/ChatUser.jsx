import { useCallback, useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Main from '../../components/Main';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import { useWebSocket } from './hooks/useWebSocket';
import { useChatMessages } from './hooks/useChatMessages';

export default function ChatUser() {
    const { userId } = useParams(); // Get receiver user ID from route
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [currentUserId, setCurrentUserId] = useState(1); // TODO: Get from auth context
    
    const { isConnected, subscribeToMessages, sendMessage, stompClient } = useWebSocket(currentUserId, selectedUser);
    const { messages, fetchMessageHistory, addReceivedMessage, addSentMessage, clearMessages } = useChatMessages(currentUserId);

    // Initialize selected user from route params
    useEffect(() => {
        if (userId) {
            setSelectedUser({
                userId: parseInt(userId),
                userName: `User ${userId}`, // TODO: Fetch actual user name from API
                userImage: null,
            });
        }
    }, [userId]);

    // Subscribe to messages when user is selected
    useEffect(() => {
        if (selectedUser && isConnected) {
            subscribeToMessages(currentUserId, addReceivedMessage);
        }
    }, [selectedUser, isConnected, currentUserId, subscribeToMessages, addReceivedMessage]);

    // Fetch message history when selected user changes
    useEffect(() => {
        if (selectedUser && selectedUser.userId) {
            clearMessages();
            fetchMessageHistory(selectedUser.userId);
        }
    }, [selectedUser, fetchMessageHistory, clearMessages]);

    // Handle send message
    const handleSendMessage = useCallback(async () => {
        if (!newMessage.trim() || !selectedUser) {
            return;
        }

        if (!stompClient) {
            alert('Not connected to chat server. Please wait...');
            return;
        }

        if (!stompClient.connected) {
            alert('Connection lost. Reconnecting...');
            return;
        }

        const messageData = {
            senderId: currentUserId,
            receiverId: selectedUser.userId,
            content: newMessage.trim(),
        };

        try {
            // 1. Save message to database
            const response = await fetch('http://localhost:5454/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const savedMessage = await response.json();

            // 2. Add to UI immediately
            addSentMessage(savedMessage, newMessage.trim(), selectedUser.userId);

            // 3. Broadcast via WebSocket
            sendMessage({
                ...messageData,
                id: savedMessage.id,
                timestamp: savedMessage.timestamp
            });

            setNewMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
            alert('Failed to send message. Please check your connection and try again.');
        }
    }, [newMessage, selectedUser, currentUserId, stompClient, addSentMessage, sendMessage]);

    // Handle message input change
    const handleMessageChange = useCallback((e) => {
        setNewMessage(e.target.value);
    }, []);

    // Handle key press (Enter to send)
    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }, [handleSendMessage]);

    return (
        <Main>
            <div className="flex h-[calc(100vh-100px)] p-4">
                {/* Chat Area - Full Width */}
                <div className="flex-1 flex flex-col bg-surface-primary rounded-3xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <ChatHeader selectedUser={selectedUser} />

                    {/* Messages */}
                    <div className="flex-1 flex flex-col overflow-y-auto px-6 pt-4">
                        <ChatMessages selectedUser={selectedUser} messages={messages} />
                    </div>

                    {/* Input */}
                    {selectedUser && (
                        <ChatInput
                            newMessage={newMessage}
                            isConnected={isConnected}
                            onChange={handleMessageChange}
                            onSend={handleSendMessage}
                            onKeyPress={handleKeyPress}
                        />
                    )}
                </div>
            </div>
        </Main>
    );
}
