import { Search } from 'lucide-react';
import TestModePanel from './TestModePanel';
import ConversationItem from './ConversationItem';

export default function ChatSidebar({ 
    conversations, 
    selectedUser, 
    searchQuery, 
    onSearchChange, 
    onSelectUser,
    testMode,
    currentUserId,
    isConnected,
    onUserChange
}) {
    return (
        <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col bg-surface-primary rounded-3xl shadow-lg overflow-hidden">
            <div className="flex flex-col p-6">
                {/* Test Mode User Selector */}
                {testMode && (
                    <TestModePanel 
                        currentUserId={currentUserId} 
                        isConnected={isConnected} 
                        onUserChange={onUserChange} 
                    />
                )}

                {/* Search Input */}
                <div className="relative">
                    <input
                        type="text"
                        className="border-2 border-border-light focus:border-brand-primary w-full px-4 py-3 pl-12 
                            rounded-xl focus:outline-none focus:ring-0 bg-surface-secondary transition-colors"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={onSearchChange}
                    />
                    <div className="absolute top-1/2 left-4 -translate-y-1/2">
                        <Search size={20} className="text-content-tertiary" />
                    </div>
                </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
                {conversations.length > 0 ? (
                    conversations.map((conversation, index) => (
                        <ConversationItem
                            key={conversation.userId || index}
                            conversation={conversation}
                            isSelected={selectedUser?.userId === conversation.userId}
                            onClick={() => onSelectUser(conversation)}
                        />
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-content-tertiary text-center px-4">
                            {searchQuery ? 'No conversations found' : 'No conversations yet'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
