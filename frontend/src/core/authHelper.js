// src/core/authHelper.js
// Helper functions to work with Redux Persist Auth State
// Place this file in the core folder alongside your other services

export const getUserIdFromStorage = () => {
    try {
        const authState = localStorage.getItem('persist:auth')
        if (!authState) {
            console.warn('No auth state found in localStorage')
            return null
        }
        
        const parsed = JSON.parse(authState)
        const user = JSON.parse(parsed.user)
        
        // Handle nested data structure: user.data.id or user.id
        const userId = user?.data?.id || user?.id
        
        if (!userId) {
            console.warn('No user ID found in auth state')
            return null
        }
        
        return userId
    } catch (error) {
        console.error('Error parsing user ID from storage:', error)
        return null
    }
}

export const getUserFromStorage = () => {
    try {
        const authState = localStorage.getItem('persist:auth')
        if (!authState) return null
        
        const parsed = JSON.parse(authState)
        const user = JSON.parse(parsed.user)
        
        // Return the full user object (could be user.data or just user)
        return user?.data || user
    } catch (error) {
        console.error('Error parsing user from storage:', error)
        return null
    }
}

export const getAuthTokenFromStorage = () => {
    try {
        const authState = localStorage.getItem('persist:auth')
        if (!authState) return null
        
        const parsed = JSON.parse(authState)
        const token = parsed.token
        
        // Remove quotes if they're included in the string
        return token ? token.replace(/^"|"$/g, '') : null
    } catch (error) {
        console.error('Error parsing token from storage:', error)
        return null
    }
}

export const isUserAuthenticated = () => {
    try {
        const authState = localStorage.getItem('persist:auth')
        if (!authState) return false
        
        const parsed = JSON.parse(authState)
        return parsed.isAuthenticated === 'true' || parsed.isAuthenticated === true
    } catch (error) {
        console.error('Error checking authentication:', error)
        return false
    }
}

export const logoutUser = () => {
    // Clear auth state from localStorage
    localStorage.removeItem('persist:auth')
    localStorage.removeItem('persist:root')
    // Redirect to login
    window.location.href = '/login'
}