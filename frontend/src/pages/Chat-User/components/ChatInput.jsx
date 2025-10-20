import { Mic, Plus, Send } from 'lucide-react';

export default function ChatInput({ 
    newMessage, 
    isConnected, 
    onChange, 
    onSend, 
    onKeyPress 
}) {
    return (
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
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    className="border-2 border-border-light focus:border-brand-primary flex-1 px-4 py-3 
                        rounded-full focus:outline-none focus:ring-0 bg-surface-primary transition-colors"
                />
                <button 
                    className="p-2 bg-brand-primary hover:bg-brand-primary/90 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onSend}
                    disabled={!newMessage.trim() || !isConnected}
                    aria-label="Send message"
                >
                    <Send size={24} className="text-white" />
                </button>
            </div>
        </div>
    );
}
