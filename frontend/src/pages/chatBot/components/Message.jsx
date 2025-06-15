import React from 'react'
import { FiMessageSquare, FiUser } from 'react-icons/fi'

export default function Message({message}) {
    return (
        <div
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
    )
}
