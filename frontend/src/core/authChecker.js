export const checkTokenExpiration = (token) => {
    if (!token) return true; // No token = expired
    
    try {
        // Split the JWT into its 3 parts
        const parts = token.split('.');
        if (parts.length !== 3) return true; // Invalid JWT format
        
        // Decode the payload (middle part)
        const payload = JSON.parse(atob(parts[1]));

        // Check if exp claim exists
        if (!payload.exp) return true;
        
        // Convert expiration time (seconds) to milliseconds and compare
        const expirationTime = payload.exp * 1000; 
        const currentTime = Date.now();
        
        return currentTime > expirationTime;
        
    } catch (error) {
        console.error('Error decoding token:', error);
        return true; // If there's any error, consider expired
    }
};