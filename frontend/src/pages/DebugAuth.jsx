import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DebugAuth = () => {
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    // Try to get user ID from different sources
    const getUserIdFromPersist = () => {
        try {
            const persistRoot = localStorage.getItem('persist:auth');
            if (persistRoot) {
                const authData = JSON.parse(persistRoot);
                return authData;
            }
        } catch (e) {
            return { error: e.message };
        }
        return null;
    };

    const persistData = getUserIdFromPersist();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Auth Debug Information</h1>
                    <button 
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-brand-primary text-white rounded"
                    >
                        Go Back
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Redux State */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Redux Auth State</h2>
                        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                            {JSON.stringify(auth, null, 2)}
                        </pre>
                    </div>

                    {/* User ID */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">User ID</h2>
                        <div className="space-y-2">
                            <p><strong>From Redux:</strong> {auth?.user?.data?.id || 'Not found'}</p>
                            <p><strong>Is Authenticated:</strong> {auth?.isAuthenticated ? 'Yes' : 'No'}</p>
                        </div>
                    </div>

                    {/* Persisted Data */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Redux Persist Data (localStorage)</h2>
                        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                            {JSON.stringify(persistData, null, 2)}
                        </pre>
                    </div>

                    {/* LocalStorage */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">All LocalStorage Keys</h2>
                        <div className="space-y-1">
                            {Object.keys(localStorage).map(key => (
                                <div key={key} className="text-sm">
                                    <strong>{key}:</strong> {localStorage.getItem(key)?.substring(0, 100)}...
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                        <div className="space-x-4">
                            <button 
                                onClick={() => {
                                    localStorage.setItem('userId', '253');
                                    alert('Set userId to 253 in localStorage');
                                    window.location.reload();
                                }}
                                className="px-4 py-2 bg-green-500 text-white rounded"
                            >
                                Set Test User ID (253)
                            </button>
                            <button 
                                onClick={() => {
                                    localStorage.clear();
                                    alert('Cleared localStorage');
                                    window.location.reload();
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Clear All Storage
                            </button>
                            <button 
                                onClick={() => navigate('/partner-login/step-1')}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Go to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DebugAuth;
