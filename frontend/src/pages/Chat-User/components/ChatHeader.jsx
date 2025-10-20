import { Search } from 'lucide-react';
import { IoCallOutline } from 'react-icons/io5';

export default function ChatHeader({ selectedUser }) {
    return (
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
    );
}
