import { useState } from 'react';
import { Search, MoreVertical, Paperclip, Send } from 'lucide-react';
import Card from './guideComponents/Card';
import Main from '../../components/Main';
import NavBar from './guideComponents/NavBar';

const GuideMessages = () => {
    const [message, setMessage] = useState('');

    const conversations = [
        {
            id: 1,
            name: "Ahamed Rizwan",
            lastMessage: "Thanks for the restaurant recommendation!",
            time: "2m",
            avatar: "ER"
        },
        {
            id: 2,
            name: "Sarath Perera",
            lastMessage: "Looking forward to the tour!",
            time: "1h",
            avatar: "MJ"
        },
        {
            id: 3,
            name: "Nadeesha Silva",
            lastMessage: "Thank you for an amazing trip!",
            time: "3h",
            avatar: "SC"
        }
    ];

    const messages = [
        {
            id: 1,
            sender: "guide",
            text: "Hi! I just arrived at the hotel. What time should we meet tomorrow for the kandy tour?",
            time: "2:15 PM",
            avatar: "ER"
        },
        {
            id: 2,
            sender: "user",
            text: "Great! Let's meet at 9 AM at the hotel lobby.",
            time: "2:17 PM"
        },
        {
            id: 3,
            sender: "guide",
            text: "I will see you at the hotel lobby! See you here at 9 AM 😊",
            time: "7:25 PM",
            avatar: "ER"
        },
        {
            id: 4,
            sender: "user",
            text: "Perfect! I can also recommend some great restaurants nearby if you're interested - or maybe for tonight?",
            time: "7:27 PM"
        }
    ];

    return (
        <div className='flex'>
            <div className='sticky top-0 h-fit'>
                <NavBar />
            </div>
            <div className='flex-1'>
                <Main hasNavbar={true}>
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Messages</h1>
                        <p className="text-gray-600 mb-6">Manage conversations with your travelers</p>
                    </div>
                    <Card>
                        <div className="flex">
                            {/* Sidebar */}
                            <div className="w-80 border-r border-orange-400 flex flex-col">
                                {/* Search */}
                                <div className="p-4 border-b border-orange-400">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search conversations..."
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                                        />
                                    </div>
                                </div>

                                {/* Conversations List */}
                                <div className="flex-1 overflow-y-auto">
                                    {conversations.map((conv) => (
                                        <div
                                            key={conv.id}
                                            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${conv.isActive ? 'bg-orange-50 border-r-2 border-r-orange-400' : ''
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                                    {conv.avatar}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-sm font-medium text-gray-900 truncate">
                                                            {conv.name}
                                                        </h3>
                                                        <span className="text-xs text-gray-500">{conv.time}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-500 truncate mt-1">
                                                        {conv.lastMessage}
                                                    </p>
                                                </div>
                                            </div>
                                            {conv.isActive && (
                                                <div className="mt-2">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full inline-block mr-2"></div>
                                                    <span className="text-xs text-green-600">Active</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 flex flex-col h-min">
                                {/* Chat Header */}
                                <div className="bg-white border-b border-orange-400 p-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-medium">
                                            ER
                                        </div>
                                        <h2 className="text-lg font-semibold text-gray-900">Emma Rodriguez</h2>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Search className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                                        <MoreVertical className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4">
                                    {messages.map((msg) => (
                                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <Card className={`max-w-md ${msg.sender === 'user'
                                                ? 'bg-orange-400 text-white border-orange-400'
                                                : 'bg-white border-orange-400'
                                                } mb-2`}>
                                                <div>
                                                    <p className={`text-sm ${msg.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                                                        {msg.text}
                                                    </p>
                                                    {msg.image && (
                                                        <div className="mt-2">
                                                            <img
                                                                src={msg.image}
                                                                alt="Hotel lobby"
                                                                className="rounded-lg w-full h-32 object-cover"
                                                                onError={(e) => {
                                                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDI4MCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjAgNzBIMTYwVjExMEgxMjBWNzBaIiBmaWxsPSIjRDFENUQ5Ii8+CjxjaXJjbGUgY3g9IjEzNSIgY3k9IjgwIiByPSI1IiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xMjUgMTAwTDE0MCA4NUwxNTUgMTAwSDEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg==';
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                    <p className={`text-xs mt-2 ${msg.sender === 'user' ? 'text-orange-100' : 'text-gray-500'}`}>
                                                        {msg.time}
                                                    </p>
                                                </div>
                                            </Card>
                                        </div>
                                    ))}

                                    {/* Typing indicator */}
                                    {/* <div className="flex justify-start">
                                        <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-medium mr-2 flex-shrink-0">
                                            ER
                                        </div>
                                        <Card className="bg-white border-orange-400 mb-2">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </Card>
                                    </div> */}
                                </div>

                                {/* Message Input */}
                                <div className="bg-white border-t border-orange-400 p-4">
                                    <div className="flex items-center space-x-2">
                                        <Paperclip className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                                        <input
                                            type="text"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Type a message..."
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter' && message.trim()) {
                                                    // Handle sending message
                                                    console.log('Sending:', message);
                                                    setMessage('');
                                                }
                                            }}
                                        />
                                        <button
                                            className="p-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors"
                                            onClick={() => {
                                                if (message.trim()) {
                                                    console.log('Sending:', message);
                                                    setMessage('');
                                                }
                                            }}
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Main>
            </div>
        </div>
    );
};

export default GuideMessages;