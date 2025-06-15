export default function QuickActions({setInputMessage}) {
    return (
        <div className='mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 px-2'>
            {['Plan a trip', 'Find hotels', 'Reset password', 'Contact support'].map((action) => (
                <button
                    key={action}
                    onClick={() => setInputMessage(action)}
                    className='px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full 
                        text-xs sm:text-sm font-medium transition-colors whitespace-nowrap
                        active:scale-95 transform duration-150'
                >
                    {action}
                </button>
            ))}
        </div>
    )
}