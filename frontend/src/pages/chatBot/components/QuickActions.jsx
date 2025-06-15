import React from 'react'

export default function QuickActions({setInputMessage}) {
    return (
        <div className='mt-6 flex flex-wrap justify-center gap-3'>
            {['Plan a trip', 'Find hotels', 'Reset password', 'Contact support'].map((action) => (
                <button
                    key={action}
                    onClick={() => setInputMessage(action)}
                    className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors'
                >
                    {action}
                </button>
            ))}
        </div>
    )
}
