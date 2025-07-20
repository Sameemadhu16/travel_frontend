export const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
        // Registration errors
        case 'auth/email-already-in-use':
            return 'This email is already registered. Please use a different email or try signing in.';
        case 'auth/weak-password':
            return 'Password is too weak. Please use at least 6 characters.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/operation-not-allowed':
            return 'Email/password accounts are not enabled. Please contact support.';
        
        // Login errors
        case 'auth/user-not-found':
            return 'No account found with this email address. Please check your email or sign up.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again or reset your password.';
        case 'auth/invalid-credential':
            return 'Invalid email or password. Please check your credentials and try again.';
        case 'auth/user-disabled':
            return 'This account has been disabled. Please contact support.';
        case 'auth/too-many-requests':
            return 'Too many failed login attempts. Please try again later or reset your password.';
        
        // Password reset errors
        case 'auth/user-not-found':
            return 'No account found with this email address.';
        
        // Update operations errors
        case 'auth/requires-recent-login':
            return 'This operation requires recent authentication. Please log in again and try.';
        case 'auth/email-already-in-use':
            return 'This email is already in use by another account.';
        
        // General errors
        case 'auth/network-request-failed':
            return 'Network error. Please check your internet connection and try again.';
        case 'auth/internal-error':
            return 'An internal error occurred. Please try again later.';
        
        default:
            return 'An error occurred. Please try again.';
    }
};
