import { useSelector } from 'react-redux';

/**
 * Authentication Debug Component
 * 
 * This component displays the current authentication state from Redux.
 * Use this temporarily to debug authentication issues.
 * 
 * Usage:
 * Import and add to any page:
 * 
 * import AuthDebug from './AuthDebug';
 * 
 * function MyComponent() {
 *   return (
 *     <div>
 *       <AuthDebug />
 *       // ... rest of your component
 *     </div>
 *   );
 * }
 * 
 * Remove this component once authentication is working correctly.
 */
const AuthDebug = () => {
  const { user, isAuthenticated, token } = useSelector((state) => state.auth);

  // Don't show in production
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg max-w-md z-50">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-sm">🔍 Auth Debug</h3>
        <button
          onClick={() => {
            const el = document.getElementById('auth-debug');
            if (el) el.style.display = 'none';
          }}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="text-xs space-y-2 font-mono">
        <div>
          <span className="text-green-400">isAuthenticated:</span>{' '}
          <span className={isAuthenticated ? 'text-green-300' : 'text-red-300'}>
            {String(isAuthenticated)}
          </span>
        </div>
        
        <div>
          <span className="text-green-400">hasToken:</span>{' '}
          <span className={token ? 'text-green-300' : 'text-red-300'}>
            {String(!!token)}
          </span>
        </div>
        
        <div>
          <span className="text-green-400">hasUser:</span>{' '}
          <span className={user ? 'text-green-300' : 'text-red-300'}>
            {String(!!user)}
          </span>
        </div>
        
        {user && (
          <>
            <div>
              <span className="text-green-400">user.email:</span>{' '}
              {user.email || 'N/A'}
            </div>
            
            <div>
              <span className="text-green-400">user.uid:</span>{' '}
              {user.uid || 'N/A'}
            </div>
            
            <div>
              <span className="text-green-400">user.data?.id:</span>{' '}
              {user.data?.id || 'N/A'}
            </div>
            
            <div>
              <span className="text-green-400">user.data?.role:</span>{' '}
              {user.data?.role || 'N/A'}
            </div>
          </>
        )}
        
        <div className="pt-2 border-t border-gray-700">
          <span className="text-green-400">localStorage:</span>
          <button
            onClick={() => {
              const auth = localStorage.getItem('persist:auth');
              console.log('persist:auth =', auth);
              console.log('parsed =', JSON.parse(auth || '{}'));
            }}
            className="ml-2 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
          >
            Log to Console
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthDebug;
