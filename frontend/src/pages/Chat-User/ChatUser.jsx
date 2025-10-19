import { useCallback, useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Main from '../../components/Main';
import ChatSidebar from './components/ChatSidebar';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import { useWebSocket } from './hooks/useWebSocket';
import { useChatMessages } from './hooks/useChatMessages';

export default function ChatUser() {
    const { userId } = useParams(); // Get receiver user ID from route
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const currentUserId = user?.data?.id || user?.id || 1; // Sender ID (fallback to 1 for testing)
    const receiverId = userId ? parseInt(userId) : null; // Receiver ID from URL
    
    const [selectedUser, setSelectedUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [testMode] = useState(false); // Disable test mode
    
    const { isConnected, subscribeToMessages, sendMessage, stompClient } = useWebSocket(currentUserId, selectedUser);
    const { messages, fetchMessageHistory, addReceivedMessage, addSentMessage, clearMessages } = useChatMessages(currentUserId);

    // Initialize conversations based on logged-in user's role
    useEffect(() => {
        const userRole = user?.data?.role || 'traveler';
        
        if (userRole === 'guide') {
            // If logged in as guide (id: 3), show traveler (id: 4) in conversation list
            setConversations([
                {
                    userId: 4,
                    userName: 'Sachith University',
                    userImage: null,
                    lastMessage: 'Looking for tour guidance',
                    lastMessageTime: new Date().toISOString(),
                },
            ]);
        } else if (userRole === 'traveler') {
            // If logged in as traveler (id: 4), show guide (id: 3) in conversation list
            setConversations([
                {
                    userId: 3,
                    userName: 'Sachith Avintha',
                    userImage: null,
                    lastMessage: 'Available to guide your tour',
                    lastMessageTime: new Date().toISOString(),
                },
            ]);
        } else {
            // Default: show guide for other roles
            setConversations([
                {
                    userId: 3,
                    userName: 'Sachith Avintha',
                    userImage: null,
                    lastMessage: 'Available to guide your tour',
                    lastMessageTime: new Date().toISOString(),
                },
            ]);
        }
    }, [user]);

    // Initialize selected user from route params
    useEffect(() => {
        if (receiverId && !isNaN(receiverId)) {
            // Find the user in conversations list to get their actual name
            const userInConversations = conversations.find(conv => conv.userId === receiverId);
            
            if (userInConversations) {
                setSelectedUser(userInConversations);
            } else {
                // Fallback if user not in conversations yet
                setSelectedUser({
                    userId: receiverId,
                    userName: `User ${receiverId}`,
                    userImage: null,
                });
            }
        }
    }, [receiverId, conversations]);

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

    // Filter conversations based on search query
    const filteredConversations = useMemo(() => {
        if (!searchQuery.trim()) {
            return conversations;
        }
        return conversations.filter((conversation) =>
            conversation.userName?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [conversations, searchQuery]);

    // Handle user selection from sidebar
    const handleSelectUser = useCallback((user) => {
        setSelectedUser(user);
        clearMessages();
        
        // Update URL to reflect selected user
        navigate(`/user-chat/${user.userId}`);
        
        // Fetch message history for selected user
        if (user && user.userId) {
            fetchMessageHistory(user.userId);
        }
    }, [navigate, fetchMessageHistory, clearMessages]);

    // Handle search input change
    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    // Handle send message
    const handleSendMessage = useCallback(async () => {
        if (!newMessage.trim() || !selectedUser || !currentUserId) {
            console.error('Missing required data:', { newMessage, selectedUser, currentUserId });
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
                const errorText = await response.text();
                console.error('Server error:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const savedMessage = await response.json();
            
            console.log('Message saved to DB:', savedMessage);

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
                    onUserChange={() => {}} // No need to change user in production
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
