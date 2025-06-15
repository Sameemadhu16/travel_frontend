import React from 'react'
import { FiSend } from 'react-icons/fi'

export default function InputField({inputMessage, handleSendMessage, setInputMessage}) {
    return (
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
                    <FiSend/>
                </button>
            </div>
        </div>
    )
}
