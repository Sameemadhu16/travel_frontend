import { useMemo } from 'react';
import { Search } from 'lucide-react';
import ReciveMessage from './ReciveMessage';
import SendMessage from './SendMessage';

export default function ChatMessages({ selectedUser, messages }) {
    const today = useMemo(() => {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
    }, []);

    if (!selectedUser) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search size={40} className="text-brand-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-content-primary mb-2">
                        No conversation selected
                    </h2>
                    <p className="text-content-tertiary">
                        Choose a conversation from the list to start chatting
                    </p>
                </div>
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search size={40} className="text-brand-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-content-primary mb-2">
                        No messages yet
                    </h2>
                    <p className="text-content-tertiary">
                        Start a conversation by sending a message
                    </p>
                </div>
            </div>
        );
    }

    return (
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
        </>
    );
}
