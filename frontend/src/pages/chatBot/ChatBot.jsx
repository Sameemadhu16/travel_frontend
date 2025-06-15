import { useEffect, useRef, useState } from 'react';
import Main from '../../components/Main';
import Title from '../../components/Title';
import { FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';

export default function ChatBot() {
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([
    {
        id: 1,
        text: "Hello! I'm your Travel.lk assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
    }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;
        
        // Add user message
        setMessages(prev => [
            ...prev,
            {
                id: prev.length + 1,
                text: inputMessage,
                sender: 'user',
                timestamp: new Date(),
            }
        ]);
    
        setInputMessage('');
        
        // Simulate bot response after a delay
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                {
                id: prev.length + 1,
                text: "Thanks for your message! I'll help you with that shortly.",
                sender: 'bot',
                timestamp: new Date(),
                }
            ]);
        }, 1000);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <Main>
            <div className='w-full max-w-4xl mx-auto px-4'>
                {/* Chat Container */}
                <div className='bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden'>
                    {/* Header */}
                <div className='w-full flex flex-col items-center justify-center mt-6 mb-8'>
                    <div className='flex gap-2 items-center justify-center'>
                        <Title
                        title='Welcome to Travel.lk'
                        font='font-[500]'
                        size='text-3xl md:text-4xl'
                        />
                        <Title
                        title='Assistant!'
                        color='text-brand-primary'
                        size='text-3xl md:text-4xl'
                        font='font-[600]'
                        />
                    </div>
                    <p className='text-center text-lg text-content-tertiary mt-2 max-w-2xl'>
                        I'm here to help you explore Sri Lanka effortlessly. Ask me anything about travel plans, bookings, or account help.
                    </p>
                </div>
                    {/* Messages Area */}
                    <div className='h-[300px] overflow-y-auto p-4 space-y-4 scrollbar-hide'>
                        {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-lg p-4 ${message.sender === 'user' 
                                    ? 'bg-brand-primary text-white rounded-tr-none' 
                                    : 'bg-gray-50 text-content-primary rounded-tl-none'}`}
                            >
                            <div className='flex items-center gap-2 mb-1'>
                                {message.sender === 'user' ? (
                                    <FiUser className='text-white' />
                                ) : (
                                    <FiMessageSquare className='text-brand-primary' />
                                )}
                                <span className='text-xs opacity-80'>
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <p>{message.text}</p>
                            </div>
                        </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className='border-t border-gray-100 p-4 bg-gray-50'>
                        <div className='flex items-center gap-2'>
                            <input
                                type='text'
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder='Type your message here...'
                                className='flex-1 border border-gray-200 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent'
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button
                                onClick={handleSendMessage}
                                className='bg-brand-primary text-white p-3 rounded-full hover:bg-brand-primary-dark transition-colors'
                            >
                                <FiSend />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className='mt-6 flex flex-wrap justify-center gap-3'>
                    {['Plan a trip', 'Find hotels', 'Reset password', 'Contact support'].map((action) => (
                        <button
                        key={action}
                        onClick={() => setInputMessage(action)}
                        className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors'
                        >
                            {action}
                        </button>
                    ))}
                </div>
            </div>
        </Main>
    );
}