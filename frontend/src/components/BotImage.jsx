import { useState } from 'react'
import ai from '../assets/images/ai-bot.jpg'
import { navigateTo } from '../core/navigateHelper'

export default function BotImage() {
    const [isHovered, setIsHovered] = useState(false)

    const handleChatClick = () => {
        // Navigate to chat bot page
        navigateTo('/chat-bot')
    }

    return (
        <div className='fixed bottom-10 right-10 z-50'>
            <div 
                className='relative h-16 w-16 bg-brand-primary bg-opacity-90 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-110 group'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleChatClick}
                title="Chat with AI Assistant"
            >
                <img src={ai} alt="AI Assistant" className='h-full w-full object-cover'/>             
                {/* Pulse animation */}
                <div className='absolute inset-0 rounded-full bg-brand-primary opacity-30 animate-ping group-hover:animate-none'></div>
            </div>

            {/* Tooltip */}
            {isHovered && (
                <div className='absolute bottom-20 right-0 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap'>
                    Chat with AI Assistant
                    <div className='absolute top-full right-6 border-4 border-transparent border-t-gray-800'></div>
                </div>
            )}
        </div>
    )
}
