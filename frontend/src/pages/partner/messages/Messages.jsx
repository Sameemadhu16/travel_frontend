import React, { useState } from 'react';
import PartnerLayout from '../../../components/partner/PartnerLayout';

const MessageCard = ({ message, isSelected, onClick }) => (
  <div 
    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${isSelected ? 'bg-orange-50' : ''}`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <img 
        src={message.sender.image} 
        alt={message.sender.name}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold">{message.sender.name}</h4>
          <span className="text-xs text-gray-500">{message.time}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-1">{message.lastMessage}</p>
        {message.unread > 0 && (
          <span className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded-full mt-1">
            {message.unread} new
          </span>
        )}
      </div>
    </div>
  </div>
);

const ChatMessage = ({ message, isOwn }) => (
  <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
    {!isOwn && (
      <img 
        src={message.sender.image} 
        alt={message.sender.name}
        className="w-8 h-8 rounded-full mr-2"
      />
    )}
    <div className={`max-w-[70%] ${isOwn ? 'bg-orange-500 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
      <p className="text-sm">{message.text}</p>
      <span className="text-xs mt-1 block opacity-70">{message.time}</span>
    </div>
  </div>
);

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - Replace with your API data
  const conversations = [
    {
      id: 1,
      sender: {
        name: "Sarah Johnson",
        image: "/src/assets/users/user1.jpg",
      },
      lastMessage: "Looking forward to the Swiss Alps tour tomorrow!",
      time: "10:30 AM",
      unread: 2,
      messages: [
        {
          id: 1,
          sender: {
            name: "Sarah Johnson",
            image: "/src/assets/users/user1.jpg",
          },
          text: "Hi! I have a question about tomorrow's tour.",
          time: "10:15 AM",
          isOwn: false
        },
        {
          id: 2,
          sender: {
            name: "Tour Guide",
            image: "/src/assets/users/user4.jpg",
          },
          text: "Of course! How can I help you?",
          time: "10:20 AM",
          isOwn: true
        },
        {
          id: 3,
          sender: {
            name: "Sarah Johnson",
            image: "/src/assets/users/user1.jpg",
          },
          text: "Looking forward to the Swiss Alps tour tomorrow!",
          time: "10:30 AM",
          isOwn: false
        }
      ]
    },
    {
      id: 2,
      sender: {
        name: "Mike Chen",
        image: "/src/assets/users/user2.avif",
      },
      lastMessage: "Can we reschedule the city tour?",
      time: "Yesterday",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: {
            name: "Mike Chen",
            image: "/src/assets/users/user2.avif",
          },
          text: "Can we reschedule the city tour?",
          time: "Yesterday",
          isOwn: false
        }
      ]
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add new message to the conversation
    const message = {
      id: Date.now(),
      sender: {
        name: "Tour Guide",
        image: "/src/assets/users/user4.jpg",
      },
      text: newMessage,
      time: "Just now",
      isOwn: true
    };

    selectedConversation.messages.push(message);
    setNewMessage('');
  };

  const filteredConversations = conversations.filter(conv => 
    conv.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PartnerLayout>
      <div className="h-[calc(100vh-120px)] flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r bg-white">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-88px)]">
            {filteredConversations.map(conversation => (
              <MessageCard
                key={conversation.id}
                message={conversation}
                isSelected={selectedConversation?.id === conversation.id}
                onClick={() => setSelectedConversation(conversation)}
              />
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedConversation.sender.image} 
                  alt={selectedConversation.sender.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{selectedConversation.sender.name}</h3>
                  <p className="text-sm text-gray-500">Active Now</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="text-gray-600 hover:text-gray-800">
                  <i className="fas fa-phone"></i>
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <i className="fas fa-video"></i>
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <i className="fas fa-info-circle"></i>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {selectedConversation.messages.map(message => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isOwn={message.isOwn}
                />
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
              <button 
                type="button"
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <i className="fas fa-paperclip"></i>
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button 
                type="submit"
                className="p-2 text-orange-500 hover:text-orange-600"
                disabled={!newMessage.trim()}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <i className="far fa-comments text-5xl text-gray-400 mb-2"></i>
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </PartnerLayout>
  );
};

export default Messages;
