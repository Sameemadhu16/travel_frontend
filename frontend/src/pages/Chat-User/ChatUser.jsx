import { useCallback, useMemo, useState, useEffect } from 'react';
import Main from '../../components/Main';
import ChatSidebar from './components/ChatSidebar';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import { useWebSocket } from './hooks/useWebSocket';
import { useChatMessages } from './hooks/useChatMessages';

export default function ChatUser() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [currentUserId, setCurrentUserId] = useState(1); // TODO: Get from auth context
    const [testMode, setTestMode] = useState(true); // Testing mode
    
    const { isConnected, subscribeToMessages, sendMessage, stompClient } = useWebSocket(currentUserId, selectedUser);
    const { messages, fetchMessageHistory, addReceivedMessage, addSentMessage, clearMessages } = useChatMessages(currentUserId);

    // Initialize test conversations
    useEffect(() => {
        if (testMode) {
            setConversations([
                {
                    userId: 1,
                    userName: 'User 1',
                    userImage: null,
                    lastMessage: 'Click to start chatting...',
                    lastMessageTime: new Date().toISOString(),
                },
                {
                    userId: 2,
                    userName: 'User 2',
                    userImage: null,
                    lastMessage: 'Click to start chatting...',
                    lastMessageTime: new Date().toISOString(),
                },
            ]);
        }
    }, [testMode]);

    // Subscribe to messages when user is selected
    useEffect(() => {
        if (selectedUser && isConnected) {
            subscribeToMessages(currentUserId, addReceivedMessage);
        }
    }, [selectedUser, isConnected, currentUserId, subscribeToMessages, addReceivedMessage]);

    // Filter conversations based on search query
    const filteredConversations = useMemo(() => {
        if (!searchQuery.trim()) {
            return conversations;
        }
        return conversations.filter((conversation) =>
            conversation.userName?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [conversations, searchQuery]);

    // Handle user selection
    const handleSelectUser = useCallback((user) => {
        setSelectedUser(user);
        clearMessages();
        
        if (user && user.userId) {
            fetchMessageHistory(user.userId);
        }
    }, [fetchMessageHistory, clearMessages]);

    // Handle search input change
    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

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
            <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-100px)] p-4">
                {/* Sidebar */}
                <ChatSidebar
                    conversations={filteredConversations}
                    selectedUser={selectedUser}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    onSelectUser={handleSelectUser}
                    testMode={testMode}
                    currentUserId={currentUserId}
                    isConnected={isConnected}
                    onUserChange={setCurrentUserId}
                />

                {/* Chat Area */}
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
