# Profile Picture Not Showing in Header - Troubleshooting Guide

## Issue Description
Profile picture uploads correctly and shows in the Profile Settings page, but doesn't update in the header (top-right corner).

## Root Cause
The header component wasn't re-rendering when Redux state changed. The profile picture state needed to be reactive to Redux changes.

## Fix Applied

### 1. Updated Header.jsx
Added state management and useEffect to track Redux changes:

```javascript
const [profilePicture, setProfilePicture] = useState(user?.data?.profilePicture || defaultAvatar);

// Update profile picture when user data changes
useEffect(() => {
    if (user?.data?.profilePicture) {
        console.log('Header: Profile picture updated from Redux');
        setProfilePicture(user.data.profilePicture);
    }
}, [user?.data?.profilePicture]);
```

### 2. Updated ProfileSettings.jsx
Enhanced Redux update to include all fields:

```javascript
dispatch(setUserData({
    ...user.data,
    firstName: formData.firstName,
    lastName: formData.lastName,
    phoneNumber: formData.phone,
    address: formData.address,
    city: formData.city,
    country: formData.country,
    profilePicture: formData.profilePicture, // This is the key field
}));
```

## How to Test

### Step 1: Clear Browser Cache
```bash
# Chrome/Edge
Cmd+Shift+Delete (Mac) or Ctrl+Shift+Delete (Windows)
Select "Cached images and files"
Click "Clear data"
```

### Step 2: Open Browser Console
```
Press F12 or Cmd+Option+I (Mac)
Go to Console tab
```

### Step 3: Upload Profile Picture
1. Navigate to `/settings/profile`
2. Click "Edit Profile"
3. Click camera icon on profile picture
4. Select an image from your computer
5. You should see the preview immediately
6. Click "Save Changes"

### Step 4: Check Console Logs
You should see these messages in console:
```
Redux updated with profile picture: data:image/jpeg;base64,/9j/4AAQSkZJRg...
Header: Profile picture updated from Redux
```

### Step 5: Verify Header Updates
- Look at top-right corner of page
- Profile picture should update automatically
- If not, refresh the page (Cmd+R or F5)

## Debugging Steps

### Check 1: Redux State
Open Redux DevTools:
1. Install Redux DevTools browser extension
2. Open DevTools (F12)
3. Click Redux tab
4. Check `state.auth.user.data.profilePicture`
5. Should contain base64 string starting with `data:image/`

### Check 2: Network Request
1. Open Network tab in DevTools
2. Upload and save profile picture
3. Look for PUT request to `/api/users/:id`
4. Check request payload includes `profilePicture` field
5. Check response status is 200 OK

### Check 3: Local Storage
1. Open Application tab in DevTools
2. Go to Local Storage
3. Check if Redux persist has the profile picture
4. If using Redux Persist, clear storage and re-login

### Check 4: Image Format
Make sure your image is:
- Valid format (JPEG, PNG, GIF, WebP)
- Under 5MB in size
- Not corrupted

## Common Issues and Solutions

### Issue 1: Header shows old picture after saving
**Solution:**
- Refresh the page (Cmd+R or F5)
- The useEffect hook should trigger on Redux change
- Check console for "Header: Profile picture updated from Redux"

### Issue 2: Profile picture is too large
**Solution:**
- Keep images under 5MB
- Consider compressing images before upload
- Use tools like TinyPNG or ImageOptim

### Issue 3: Base64 string is truncated
**Solution:**
- Check database column type is TEXT (not VARCHAR)
- Run migration: `add_user_profile_fields.sql`
- Column should support large text data

### Issue 4: Image shows broken icon
**Solution:**
- Check browser console for errors
- Verify base64 string format: `data:image/jpeg;base64,...`
- Check image loads in Profile Settings page first
- Use onError handler to fallback to default avatar

## Manual Fix Steps

If automatic update doesn't work:

### Option 1: Force Refresh
```javascript
// Add this to ProfileSettings after save
window.location.reload();
```

### Option 2: Re-login
1. Logout from application
2. Login again
3. Redux state will be refreshed from backend

### Option 3: Clear Redux State
```javascript
// In browser console
localStorage.clear();
// Then refresh page
```

## Verification Checklist

After upload, verify:
- [ ] Image preview shows in Profile Settings
- [ ] Console shows: "Redux updated with profile picture"
- [ ] Console shows: "Header: Profile picture updated from Redux"
- [ ] Header (top-right) shows new profile picture
- [ ] Profile picture persists after page refresh
- [ ] Profile picture shows on other pages

## Expected Behavior

### Before Save:
```
Profile Settings: [New Picture Preview]
Header:          [Old Picture or Default Avatar]
```

### After Save (Immediately):
```
Profile Settings: [New Picture]
Header:          [New Picture] ← Should update automatically
```

### After Page Refresh:
```
Profile Settings: [New Picture]
Header:          [New Picture] ← Should persist
```

## Console Commands for Debugging

### Check Redux State:
```javascript
// In browser console
console.log(window.store.getState().auth.user.data.profilePicture);
```

### Manually Update Redux:
```javascript
// In browser console
window.store.dispatch({
  type: 'auth/setUserData',
  payload: {
    ...window.store.getState().auth.user.data,
    profilePicture: 'YOUR_BASE64_STRING_HERE'
  }
});
```

### Check if Image is Valid Base64:
```javascript
// In browser console
const img = new Image();
img.onload = () => console.log('Image loaded successfully!');
img.onerror = () => console.error('Image failed to load!');
img.src = 'YOUR_BASE64_STRING_HERE';
```

## Still Not Working?

### Last Resort Solutions:

1. **Clear Everything:**
   ```bash
   # Stop servers
   # Clear browser cache completely
   # Clear localStorage
   # Delete node_modules and reinstall
   npm install
   # Restart servers
   ```

2. **Check Backend:**
   ```bash
   # Check if profile picture is saved in database
   psql -U your_username -d your_database
   SELECT id, email, profile_picture FROM users WHERE email = 'your@email.com';
   # Should show base64 string
   ```

3. **Add Debug Image:**
   ```javascript
   // In ProfileSettings.jsx, add after save:
   const testImg = new Image();
   testImg.src = formData.profilePicture;
   document.body.appendChild(testImg);
   ```

## Contact Support
If none of these solutions work, provide:
1. Browser console logs
2. Network tab screenshot
3. Redux DevTools state
4. Backend logs

The issue should now be fixed with the latest changes!
