import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { Search, Mic, Plus, Send } from 'lucide-react';
import { IoCallOutline } from 'react-icons/io5';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import Main from '../../components/Main';
import ReciveMessage from './components/ReciveMessage';
import SendMessage from './components/SendMessage';

export default function ChatUser() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(1); // TODO: Get from auth context
    
    const stompClientRef = useRef(null);
    const subscriptionRef = useRef(null);

    // WebSocket connection
    useEffect(() => {
        connectWebSocket();
        
        return () => {
            disconnectWebSocket();
        };
    }, []);

    // Subscribe to messages when user is selected
    useEffect(() => {
        if (selectedUser && isConnected) {
            subscribeToMessages(currentUserId);
        }
        
        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
                subscriptionRef.current = null;
            }
        };
    }, [selectedUser, isConnected, currentUserId]);

    const connectWebSocket = useCallback(() => {
        const wsUrl = 'http://localhost:5454/ws';
        
        try {
            const socket = new SockJS(wsUrl);
            const client = Stomp.over(socket);
            
            client.connect(
                {},
                (frame) => {
                    console.log('✅ Connected to WebSocket:', frame);
                    setIsConnected(true);
                    stompClientRef.current = client;
                },
                (error) => {
                    console.error('❌ WebSocket connection error:', error);
                    setIsConnected(false);
                    
                    // Retry connection after 5 seconds
                    setTimeout(() => {
                        console.log('🔄 Retrying connection...');
                        connectWebSocket();
                    }, 5000);
                }
            );
        } catch (error) {
            console.error('❌ Failed to create WebSocket connection:', error);
            setIsConnected(false);
        }
    }, []);

    const disconnectWebSocket = useCallback(() => {
        if (stompClientRef.current) {
            stompClientRef.current.disconnect(() => {
                console.log('👋 Disconnected from WebSocket');
                setIsConnected(false);
            });
        }
    }, []);

    const subscribeToMessages = useCallback((userId) => {
        if (!stompClientRef.current || !userId) {
            return;
        }

        // Unsubscribe from previous subscription
        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
        }

        const topic = `/topic/messages/${userId}`;
        console.log(`🔔 Subscribing to: ${topic}`);

        subscriptionRef.current = stompClientRef.current.subscribe(topic, (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log('📥 New message received:', receivedMessage);
            
            // Add received message to messages list
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: Date.now(),
                    type: 'received',
                    messageBody: receivedMessage.content,
                    dateTime: receivedMessage.timestamp || new Date().toISOString(),
                    senderId: receivedMessage.senderId,
                    receiverId: receivedMessage.receiverId,
                },
            ]);
        });

        console.log(`✅ Subscribed to user ${userId}'s messages`);
    }, []);

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
        setMessages([]); // Clear messages when switching users
        // TODO: Fetch message history for selected user
        // fetchMessageHistory(user.userId);
    }, []);

  // Handle search input change
    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    // Handle send message
    const handleSendMessage = useCallback(() => {
        if (!newMessage.trim() || !selectedUser || !stompClientRef.current) {
            return;
        }

        const messageData = {
            senderId: currentUserId,
            receiverId: selectedUser.userId,
            content: newMessage.trim(),
        };

        console.log('📤 Sending message:', messageData);

        try {
            stompClientRef.current.send(
                '/app/sendMessage',
                {},
                JSON.stringify(messageData)
            );

            // Add sent message to messages list
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: Date.now(),
                    type: 'sent',
                    messageBody: newMessage.trim(),
                    dateTime: new Date().toISOString(),
                    senderId: currentUserId,
                    receiverId: selectedUser.userId,
                },
            ]);

            console.log('✅ Message sent successfully!');
            setNewMessage('');
        } catch (error) {
            console.error('❌ Failed to send message:', error);
        }
    }, [newMessage, selectedUser, currentUserId]);

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

    // Format current date
    const today = useMemo(() => {
        return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        });
    }, []);

    // Render conversation list item
    const renderConversationItem = useCallback((conversation, index) => {
        const timeOnly = new Date(conversation.lastMessageTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        });

    const isSelected = selectedUser?.id === conversation.userId;

        return (
        <div
            key={conversation.userId || index}
            className={`w-full border-b border-border-light ${
            isSelected ? 'bg-brand-accent' : 'bg-surface-primary'
            } h-[100px] flex items-center cursor-pointer hover:bg-background-hover transition-colors`}
            onClick={() => handleSelectUser(conversation)}
        >
            <div className="w-full flex flex-row gap-4 px-4">
            {/* User Avatar */}
            <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 bg-border-light">
                {conversation.userImage ? (
                <img 
                    className="h-full w-full object-cover" 
                    src={conversation.userImage} 
                    alt={conversation.userName || 'User'} 
                />
                ) : (
                <div className="h-full w-full flex items-center justify-center text-content-tertiary">
                    <Search size={20} />
                </div>
                )}
            </div>

            {/* User Details */}
            <div className="w-full overflow-hidden">
                <div className="w-full flex flex-row justify-between items-center">
                {/* User Name */}
                <h1 className="text-content-primary text-[16px] font-semibold truncate">
                    {conversation.userName || 'Unknown User'}
                </h1>

                {/* Last Message Time */}
                <h1 className="text-content-tertiary text-[14px] font-medium ml-2">
                    {timeOnly}
                </h1>
                </div>

                {/* Last Message Preview */}
                <h2 className="text-content-secondary text-[14px] font-normal truncate mt-1">
                {conversation.lastMessage || 'No messages yet'}
                </h2>
            </div>
            </div>
        </div>
        );
    }, [selectedUser, handleSelectUser]);

    // Render messages
    const renderMessages = useMemo(() => {
        if (!messages.length) {
        return null;
        }

    return (
        <div className="w-full flex flex-col gap-3 mt-3 pb-4">
            {messages.map((message, index) => (
                <div 
                    key={message.id || index} 
                    className={`w-full flex ${message.type === 'received' ? 'justify-start' : 'justify-end'}`}
                >
                    {message.type === 'received' ? (
                    <ReciveMessage 
                        message={message.messageBody} 
                        time={message.dateTime} 
                    />
                    ) : (
                    <SendMessage 
                        message={message.messageBody} 
                        time={message.dateTime} 
                    />
                    )}
                </div>
            ))}
        </div>
    );
    }, [messages]);

    return (
        <Main>
            <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-100px)] p-4">
                {/* User List Sidebar */}
                <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col bg-surface-primary rounded-3xl shadow-lg overflow-hidden">
                <div className="flex flex-col p-6">
                    {/* Search Input */}
                    <div className="relative">
                        <input
                            type="text"
                            className="border-2 border-border-light focus:border-brand-primary w-full px-4 py-3 pl-12 
                                rounded-xl focus:outline-none focus:ring-0 bg-surface-secondary transition-colors"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <div className="absolute top-1/2 left-4 -translate-y-1/2">
                            <Search size={20} className="text-content-tertiary" />
                        </div>
                    </div>
                </div>

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredConversations.length > 0 ? (
                    filteredConversations.map(renderConversationItem)
                    ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-content-tertiary text-center px-4">
                        {searchQuery ? 'No conversations found' : 'No conversations yet'}
                        </p>
                    </div>
                    )}
                </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-surface-primary rounded-3xl shadow-lg overflow-hidden">
                {/* Chat Header */}
                <div className="border-b border-border-light p-4 flex flex-row justify-between items-center bg-surface-secondary">
                    <div className="flex flex-row items-center gap-3">
                    {/* User Avatar */}
                    <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 bg-border-light">
                        {selectedUser?.userImage ? (
                        <img 
                            className="h-full w-full object-cover" 
                            src={selectedUser.userImage} 
                            alt={selectedUser.userName || 'User'} 
                        />
                        ) : (
                        <div className="h-full w-full flex items-center justify-center">
                            <Search size={24} className="text-content-tertiary" />
                        </div>
                        )}
                    </div>

                    {/* User Name */}
                    <h1 className="font-semibold text-xl text-content-primary">
                        {selectedUser?.userName || 'Select a conversation'}
                    </h1>
                    </div>

                    {/* Action Buttons */}
                    {selectedUser && (
                    <div className="flex flex-row gap-4">
                        <button 
                        className="p-2 hover:bg-background-hover rounded-full transition-colors"
                        aria-label="Search in conversation"
                        >
                        <Search size={24} className="text-content-secondary" />
                        </button>
                        <button 
                        className="p-2 hover:bg-background-hover rounded-full transition-colors"
                        aria-label="Call user"
                        >
                        <IoCallOutline size={24} className="text-content-secondary" />
                        </button>
                    </div>
                    )}
                </div>

                {/* Messages Container */}
                <div className="flex-1 flex flex-col overflow-y-auto px-6 pt-4">
                    {selectedUser && messages.length > 0 ? (
                    <>
                        {/* Date Badge */}
                        <div className="w-full flex justify-center sticky top-0 z-10 mb-4">
                        <div className="bg-surface-primary shadow-md rounded-full px-6 py-2 border border-border-light">
                            <h1 className="text-content-secondary font-medium text-sm">
                            {today}
                            </h1>
                        </div>
                        </div>

                        {/* Messages */}
                        {renderMessages}
                    </>
                    ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                        <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={40} className="text-brand-primary" />
                        </div>
                        <h2 className="text-xl font-semibold text-content-primary mb-2">
                            {selectedUser ? 'No messages yet' : 'No conversation selected'}
                        </h2>
                        <p className="text-content-tertiary">
                            {selectedUser 
                            ? 'Start a conversation by sending a message' 
                            : 'Choose a conversation from the list to start chatting'
                            }
                        </p>
                        </div>
                    </div>
                    )}
                </div>

                {/* Message Input */}
                {selectedUser && (
                    <div className="border-t border-border-light p-4 bg-surface-secondary">
                    <div className="flex flex-row gap-3 items-center">
                        <button 
                        className="p-2 hover:bg-background-hover rounded-full transition-colors"
                        aria-label="Voice message"
                        >
                        <Mic size={24} className="text-content-secondary" />
                        </button>
                        <button 
                        className="p-2 hover:bg-background-hover rounded-full transition-colors"
                        aria-label="Attach file"
                        >
                        <Plus size={24} className="text-content-secondary" />
                        </button>
                        <input
                            type="text"
                            name="message"
                            id="message"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={handleMessageChange}
                            onKeyPress={handleKeyPress}
                            className="border-2 border-border-light focus:border-brand-primary flex-1 px-4 py-3 
                                rounded-full focus:outline-none focus:ring-0 bg-surface-primary transition-colors"
                        />
                        <button 
                            className="p-2 bg-brand-primary hover:bg-brand-primary/90 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim() || !isConnected}
                            aria-label="Send message"
                        >
                            <Send size={24} className="text-white" />
                        </button>
                    </div>
                    </div>
                )}
                </div>
            </div>
        </Main>
    );
}
