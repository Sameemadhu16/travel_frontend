import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Main from '../../components/Main';
import Title from '../../components/Title';
import { FiSend, FiMessageSquare, FiSearch } from 'react-icons/fi';
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import defaultAvatar from '../../assets/users/user1.jpg';

export default function ChatPage() {
    const { user } = useSelector((state) => state.auth);
    const currentUserId = user?.data?.id || user?.id;
    
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const messagesEndRef = useRef(null);

    // Initialize WebSocket connection
    useEffect(() => {
        if (!currentUserId) return; // Don't initialize if no user
        
        try {
            const client = new Client({
                brokerURL: 'ws://localhost:5454/ws',
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                debug: (str) => {
                    console.log('STOMP:', str);
                }
            });
            
            client.onConnect = () => {
                console.log('WebSocket Connected');
                
                // Subscribe to user's private messages
                client.subscribe(`/topic/messages/${currentUserId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    
                    // Update messages if it's from the selected user
                    if (selectedUser && 
                        (receivedMessage.senderId === selectedUser.id || 
                         receivedMessage.receiverId === selectedUser.id)) {
                        setMessages(prev => [...prev, receivedMessage]);
                    }
                    
                    // Update conversation list
                    loadConversations();
                });
            };
            
            client.onStompError = (frame) => {
                console.error('STOMP error:', frame);
            };
            
            client.onWebSocketError = (event) => {
                console.error('WebSocket error:', event);
            };
            
            client.activate();
            setStompClient(client);
            
            return () => {
                if (client) {
                    client.deactivate();
                }
            };
        } catch (error) {
            console.error('Error initializing WebSocket:', error);
        }
    }, [currentUserId]);

    // Load conversations
    useEffect(() => {
        loadConversations();
    }, [currentUserId]);

    // Load messages when user is selected
    useEffect(() => {
        if (selectedUser) {
            loadMessages(selectedUser.id);
        }
    }, [selectedUser]);

    // Auto-scroll to bottom
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Load conversations
    const loadConversations = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5454/api/messages/conversations/${currentUserId}`
            );
            const partnerIds = response.data;
            
            // Fetch user details for each partner
            const conversationPromises = partnerIds.map(async (partnerId) => {
                try {
                    const userResponse = await axios.get(
                        `http://localhost:5454/api/user/${partnerId}`
                    );
                    return userResponse.data;
                } catch (error) {
                    console.error('Error fetching user:', error);
                    return {
                        id: partnerId,
                        username: `User ${partnerId}`,
                        profilePicture: defaultAvatar
                    };
                }
            });
            
            const conversationUsers = await Promise.all(conversationPromises);
            setConversations(conversationUsers);
        } catch (error) {
            console.error('Error loading conversations:', error);
            setConversations([]); // Set empty array on error
        }
    };

    const loadMessages = async (userId) => {
        try {
            const response = await axios.get(
                `http://localhost:5454/api/messages/conversation/${currentUserId}/${userId}`
            );
            setMessages(response.data);
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    const sendMessage = () => {
        if (!newMessage.trim() || !selectedUser || !stompClient) return;

        const message = {
            senderId: currentUserId,
            receiverId: selectedUser.id,
            content: newMessage,
            timestamp: new Date().toISOString(),
            seen: false
        };

        // Send via WebSocket
        if (stompClient.connected) {
            stompClient.publish({
                destination: '/app/sendMessage',
                body: JSON.stringify(message)
            });
            
            // Add to local messages
            setMessages(prev => [...prev, message]);
            setNewMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const filteredConversations = conversations.filter(conv =>
        conv.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Main>
            <div className="w-full max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center gap-3 mb-6">
                    <FiMessageSquare className="w-8 h-8 text-brand-primary" />
                    <Title
                        title="Messages"
                        size="text-3xl"
                        font="font-bold"
                    />
                </div>

                <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
                        {/* Conversations List */}
                        <div className="lg:col-span-1 border-r border-gray-200">
                            <div className="p-4 border-b border-gray-200">
                                <div className="relative">
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search conversations..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                    />
                                </div>
                            </div>

                            <div className="overflow-y-auto h-[calc(600px-73px)]">
                                {filteredConversations.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4">
                                        <FiMessageSquare className="w-16 h-16 mb-2" />
                                        <p className="text-center">No conversations yet</p>
                                        <p className="text-sm text-center mt-1">
                                            Start chatting with guides or travelers
                                        </p>
                                    </div>
                                ) : (
                                    filteredConversations.map((conv) => (
                                        <div
                                            key={conv.id}
                                            onClick={() => setSelectedUser(conv)}
                                            className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                                                selectedUser?.id === conv.id ? 'bg-brand-accent' : ''
                                            }`}
                                        >
                                            <img
                                                src={conv.profilePicture || defaultAvatar}
                                                alt={conv.username}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-900 truncate">
                                                    {conv.username || conv.email}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {conv.role || 'User'}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="lg:col-span-2 flex flex-col">
                            {selectedUser ? (
                                <>
                                    {/* Chat Header */}
                                    <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                                        <img
                                            src={selectedUser.profilePicture || defaultAvatar}
                                            alt={selectedUser.username}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {selectedUser.username || selectedUser.email}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {selectedUser.role || 'User'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                                        {messages.map((msg, index) => {
                                            const isOwnMessage = msg.senderId === currentUserId;
                                            return (
                                                <div
                                                    key={index}
                                                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div
                                                        className={`max-w-[70%] rounded-lg p-3 ${
                                                            isOwnMessage
                                                                ? 'bg-brand-primary text-white rounded-br-none'
                                                                : 'bg-white text-gray-900 rounded-bl-none shadow'
                                                        }`}
                                                    >
                                                        <p className="break-words">{msg.content}</p>
                                                        <p
                                                            className={`text-xs mt-1 ${
                                                                isOwnMessage
                                                                    ? 'text-white/80'
                                                                    : 'text-gray-500'
                                                            }`}
                                                        >
                                                            {new Date(msg.timestamp).toLocaleTimeString([], {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Message Input */}
                                    <div className="p-4 border-t border-gray-200 bg-white">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                placeholder="Type a message..."
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                            />
                                            <button
                                                onClick={sendMessage}
                                                disabled={!newMessage.trim()}
                                                className="bg-brand-primary text-white p-3 rounded-lg hover:bg-brand-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <FiSend className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                                    <FiMessageSquare className="w-20 h-20 mb-4" />
                                    <p className="text-xl font-semibold">Select a conversation</p>
                                    <p className="text-sm mt-2">Choose a user to start messaging</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
}
