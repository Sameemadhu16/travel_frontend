import { Search } from 'lucide-react';

export default function ConversationItem({ conversation, isSelected, onClick }) {
    const timeOnly = new Date(conversation.lastMessageTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <div
            className={`w-full border-b border-border-light ${
                isSelected ? 'bg-brand-accent' : 'bg-surface-primary'
            } h-[100px] flex items-center cursor-pointer hover:bg-background-hover transition-colors`}
            onClick={onClick}
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
}
