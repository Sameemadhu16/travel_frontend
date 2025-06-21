import { FiMessageSquare, FiUser } from 'react-icons/fi'

export default function Message({message}) {
    return (
        <div
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`max-w-[85%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] rounded-lg p-3 sm:p-4 ${message.sender === 'user' 
                    ? 'bg-brand-primary text-white rounded-tr-none' 
                    : 'bg-gray-50 text-content-primary rounded-tl-none'}`}
            >
            <div className='flex items-center gap-2 mb-1'>
                {message.sender === 'user' ? (
                    <FiUser className={`text-white ${window.innerWidth < 640 ? 'w-3 h-3' : 'w-4 h-4'}`} />
                ) : (
                    <FiMessageSquare className={`text-brand-primary ${window.innerWidth < 640 ? 'w-3 h-3' : 'w-4 h-4'}`} />
                )}
                <span className='text-xs opacity-80'>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
                <p className='text-sm sm:text-base leading-relaxed break-words'>{message.text}</p>
            </div>
        </div>
    )
}