import { useEffect, useMemo, useRef, useState } from 'react';
import Main from '../../components/Main';
import Title from '../../components/Title';
import Message from './components/Message';
import InputField from './components/InputField';
import QuickActions from './components/QuickActions';

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
    const [error, setError] = useState('');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputMessage.trim() === ''){
            setError("Please enter a message before sending.");
            return;
        };
        setError('');
        
        const userMessage = inputMessage;
        
        // Add user message
        setMessages(prev => [
            ...prev,
            {
                id: prev.length + 1,
                text: userMessage,
                sender: 'user',
                timestamp: new Date(),
            }
        ]);
    
        setInputMessage('');
        
        // Add typing indicator
        setMessages(prev => [
            ...prev,
            {
                id: prev.length + 1,
                text: "Typing...",
                sender: 'bot',
                timestamp: new Date(),
                isTyping: true,
            }
        ]);

        try {
            // Call backend AI assistant API
            const response = await fetch('http://localhost:5454/api/ai-assistant/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    userId: localStorage.getItem('userId') || 'guest'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();
            
            // Remove typing indicator and add actual response
            setMessages(prev => {
                const filtered = prev.filter(msg => !msg.isTyping);
                return [
                    ...filtered,
                    {
                        id: filtered.length + 1,
                        text: data.message,
                        sender: 'bot',
                        timestamp: new Date(data.timestamp),
                    }
                ];
            });
        } catch (error) {
            console.error('Error getting AI response:', error);
            // Remove typing indicator and show error message
            setMessages(prev => {
                const filtered = prev.filter(msg => !msg.isTyping);
                return [
                    ...filtered,
                    {
                        id: filtered.length + 1,
                        text: "I apologize, but I'm having trouble connecting. Please try again or contact support.",
                        sender: 'bot',
                        timestamp: new Date(),
                    }
                ];
            });
        }
    };

    const messageContainer = useMemo(()=>{
        return messages.map((message, index)=>(
            <Message key={index} message={message}/>
        ))
    },[messages]);

    return (
        <Main>
            <div className='w-full max-w-4xl mx-auto px-2 sm:px-4 lg:px-6'>
                {/* Chat Container */}
                <div className='bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-100 overflow-hidden'>
                    {/* Header */}
                <div className='w-full flex flex-col items-center justify-center mt-4 sm:mt-6 mb-6 sm:mb-8 px-4'>
                    <div className='flex flex-col sm:flex-row gap-1 sm:gap-2 items-center justify-center text-center'>
                        <Title
                            title='Welcome to Travel.lk'
                            font='font-[500]'
                            size='text-2xl sm:text-3xl md:text-4xl'
                        />
                        <Title
                            title='Assistant!'
                            color='text-brand-primary'
                            size='text-2xl sm:text-3xl md:text-4xl'
                            font='font-[600]'
                        />
                    </div>
                    <div className='text-center mt-1 max-w-2xl px-4'>
                        <Title
                            title="I'm here to help you explore Sri Lanka effortlessly. Ask me anything about travel plans, bookings, or account help."
                            color='text-content-tertiary'
                            size='text-base sm:text-lg'
                            font='font-[400]'
                        />
                    </div>
                </div>
                    {/* Messages Area */}
                    <div className='h-[280px] sm:h-[320px] md:h-[340px] lg:h-[340px] overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 scrollbar-hide'>
                        {messageContainer}
                        <div ref={messagesEndRef} />
                    </div>
                    {/* Quick Actions */}
                    <div className='px-2 sm:px-4'>
                        <QuickActions
                            setInputMessage={setInputMessage}
                        />
                    </div>
                    {/* Input Area */}
                    <div className='mt-3 sm:mt-5'>
                        <InputField
                            handleSendMessage={handleSendMessage}
                            setInputMessage={setInputMessage}
                            inputMessage={inputMessage}
                            error={error}
                        />
                    </div>
                </div>
            </div>
        </Main>
    );
}