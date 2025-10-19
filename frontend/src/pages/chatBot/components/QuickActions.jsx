export default function QuickActions({setInputMessage}) {
    const quickActions = [
        { label: 'Plan a trip', emoji: '🗺️' },
        { label: 'Find hotels', emoji: '🏨' },
        { label: 'Reset password', emoji: '🔑' },
        { label: 'How to use this?', emoji: '❓' }
    ];

    return (
        <div className='mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 px-2'>
            {quickActions.map((action) => (
                <button
                    key={action.label}
                    onClick={() => setInputMessage(action.label)}
                    className='px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full 
                        text-xs sm:text-sm font-medium transition-colors whitespace-nowrap
                        active:scale-95 transform duration-150 flex items-center gap-1.5'
                >
                    <span>{action.emoji}</span>
                    <span>{action.label}</span>
                </button>
            ))}
        </div>
    )
}