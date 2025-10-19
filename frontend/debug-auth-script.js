// TEST SCRIPT - Run this in browser console to debug auth issue
// Copy and paste this entire script into your browser console (F12)

console.log('=== AUTH DEBUG SCRIPT ===\n');

// 1. Check Redux Persist Storage
console.log('1. Checking Redux Persist Storage:');
const persistAuth = localStorage.getItem('persist:auth');
if (persistAuth) {
    try {
        const parsed = JSON.parse(persistAuth);
        console.log('✅ Found persist:auth');
        console.log('Raw:', persistAuth);
        console.log('Parsed:', parsed);
        
        if (parsed.user) {
            const user = JSON.parse(parsed.user);
            console.log('User object:', user);
            console.log('User ID:', user?.data?.id || 'NOT FOUND');
        }
    } catch (e) {
        console.error('❌ Error parsing persist:auth:', e);
    }
} else {
    console.log('❌ persist:auth not found in localStorage');
}

// 2. Check all localStorage keys
console.log('\n2. All localStorage keys:');
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}:`, value?.substring(0, 100));
}

// 3. Quick fix - Set test user
console.log('\n3. Quick Fix Options:');
console.log('Run one of these commands to set a test user:');
console.log('\nOption A: Set test user ID directly');
console.log('localStorage.setItem("userId", "253");');

console.log('\nOption B: Set proper Redux persist structure');
console.log(`localStorage.setItem('persist:auth', JSON.stringify({
    user: JSON.stringify({ data: { id: 253, email: 'test@example.com' } }),
    isAuthenticated: "true",
    token: "\\"test-token\\""
}));
window.location.reload();`);

console.log('\n=== END DEBUG ===');

// Helper function to set test user
window.setTestUser = function(userId = 253) {
    localStorage.setItem('persist:auth', JSON.stringify({
        user: JSON.stringify({ 
            data: { 
                id: userId, 
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User'
            } 
        }),
        isAuthenticated: "true",
        token: '"test-token-' + Date.now() + '"'
    }));
    console.log('✅ Test user set with ID:', userId);
    console.log('Reloading page...');
    setTimeout(() => window.location.reload(), 1000);
};

console.log('\n💡 TIP: Run setTestUser(253) to quickly set a test user');
