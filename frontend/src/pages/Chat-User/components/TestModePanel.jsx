export default function TestModePanel({ currentUserId, isConnected, onUserChange }) {
    return (
        <div className="mb-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
            <p className="text-sm font-medium text-yellow-800 mb-2">🧪 Test Mode</p>
            <div className="flex gap-2">
                <button
                    onClick={() => onUserChange(1)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentUserId === 1 
                            ? 'bg-brand-primary text-white' 
                            : 'bg-white text-gray-700 border border-gray-300'
                    }`}
                >
                    User 1
                </button>
                <button
                    onClick={() => onUserChange(2)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentUserId === 2 
                            ? 'bg-brand-primary text-white' 
                            : 'bg-white text-gray-700 border border-gray-300'
                    }`}
                >
                    User 2
                </button>
            </div>
            <p className="text-xs text-yellow-700 mt-2">
                Current User ID: <strong>{currentUserId}</strong> | 
                Status: <strong className={isConnected ? 'text-green-600' : 'text-red-600'}>
                    {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
                </strong>
            </p>
        </div>
    );
}
