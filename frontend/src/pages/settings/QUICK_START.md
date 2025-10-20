# Quick Start Guide - User Profile Settings

## Setup Instructions

### 1. Database Migration
First, apply the database migration to add the new profile fields:

```bash
cd travel-backend
# Replace with your actual database credentials
psql -U your_username -d your_database -f database_migrations/add_user_profile_fields.sql
```

### 2. Start Backend Server
```bash
cd travel-backend
./mvnw spring-boot:run
```

### 3. Start Frontend Development Server
```bash
cd travel_frontend/frontend
npm install  # If dependencies are not installed
npm run dev
```

## Accessing the Profile Settings

1. Open your browser and navigate to `http://localhost:5000` (or your configured port)
2. Log in with your credentials
3. Click on your profile picture/email in the top-right corner
4. Select "Profile Settings" from the dropdown menu
5. You will be redirected to `/settings/profile`

## Using the Profile Settings

### View Mode (Default)
- All fields are displayed in read-only mode
- Profile picture is shown with your current photo or a default avatar
- User information is displayed in a clean, organized layout

### Edit Mode
1. Click the "Edit Profile" button (top-right of the profile card)
2. All editable fields become active
3. A camera icon appears on the profile picture

### Updating Profile Picture
1. Enter edit mode
2. Click the camera icon on the profile picture
3. Select an image file from your device (JPEG, PNG, GIF, WebP)
4. Image preview appears immediately
5. Click "Save Changes" to persist

### Updating Profile Information
1. Enter edit mode
2. Modify any of the following fields:
   - First Name
   - Last Name
   - Phone Number
   - Address
   - City
   - Country
3. Click "Save Changes" to persist
4. Click "Cancel" to discard changes

## Features Demonstrated

✅ **User Profile Management**
- Fetch user data from backend API
- Display user information in a modern UI
- Edit profile information inline

✅ **Profile Picture Upload**
- Select and preview images
- Base64 encoding for storage
- Image validation (type and size)
- Update profile picture in real-time

✅ **Orange Theme Integration**
- Matches Travel.lk brand colors
- Gradient backgrounds
- Modern, clean design
- Responsive layout

✅ **State Management**
- Redux integration for user state
- Persists changes across components
- Updates header profile picture automatically

✅ **Form Validation**
- Client-side validation
- Error handling with toast notifications
- Success feedback

## Testing the Feature

### Test Cases to Try:
1. **View Profile**: Load the page and verify all user data displays correctly
2. **Edit Profile**: Click edit and modify your information
3. **Upload Picture**: Upload a profile picture and verify it updates
4. **Cancel Changes**: Make changes, then click cancel to verify rollback
5. **Save Changes**: Make changes and save to verify persistence
6. **Header Update**: Verify profile picture updates in the header after save
7. **Responsive Design**: Test on different screen sizes (mobile, tablet, desktop)

## Expected Behavior

### On Load
- Page fetches user data using the docId from Redux state
- Displays user information in read-only mode
- Shows profile picture or default avatar

### During Edit
- All fields become editable except email
- Camera icon appears for profile picture upload
- Form maintains original values if cancelled

### On Save
- API call updates user data in database
- Redux state updates with new data
- Success toast notification appears
- Edit mode exits automatically
- Header profile picture updates

### On Cancel
- Form resets to original values
- Profile picture preview resets
- Edit mode exits
- No API calls are made

## Troubleshooting

### Issue: Profile data not loading
**Solution**: 
- Check if user is logged in (Redux state should have user.data.docId)
- Verify backend is running on correct port
- Check browser console for API errors

### Issue: Profile picture not uploading
**Solution**:
- Verify file is an image (JPEG, PNG, GIF, WebP)
- Check file size is under 5MB
- Check browser console for validation errors

### Issue: Changes not persisting
**Solution**:
- Verify backend API is accessible
- Check network tab for failed PUT requests
- Ensure database migration was applied
- Check backend logs for errors

### Issue: Header not showing updated profile picture
**Solution**:
- Verify Redux state is updating (check with Redux DevTools)
- Refresh the page
- Clear browser cache

## API Endpoints Used

- `GET /api/users/public/:docId` - Fetch user by Firebase UID
- `PUT /api/users/:id` - Update user information

## File Locations

- **Frontend Page**: `travel_frontend/frontend/src/pages/settings/ProfileSettings.jsx`
- **Frontend Route**: `travel_frontend/frontend/src/routes/AppRoutes.jsx`
- **API Service**: `travel_frontend/frontend/src/api/userService.js`
- **Redux Slice**: `travel_frontend/frontend/src/redux/slices/authSlice.js`
- **Backend Controller**: `travel-backend/src/main/java/com/travel/travel/Controller/UserController.java`
- **Backend Model**: `travel-backend/src/main/java/com/travel/travel/Models/User.java`
- **Database Migration**: `travel-backend/database_migrations/add_user_profile_fields.sql`

## Screenshots Checklist
When testing, verify these visual elements:
- [ ] Orange gradient header banner
- [ ] Large circular profile picture with border
- [ ] User name and email displayed
- [ ] Level badge visible
- [ ] Edit button (view mode) or Save/Cancel buttons (edit mode)
- [ ] Camera icon on profile picture (edit mode only)
- [ ] All form fields properly styled
- [ ] Statistics cards at bottom (orange gradients)
- [ ] Responsive layout on mobile devices

## Next Steps

After verifying the profile settings work correctly, you can:
1. Add password change functionality
2. Implement email verification
3. Add social media profile linking
4. Create profile completion progress indicator
5. Add user preferences section
6. Implement notification settings
7. Add account deletion feature

## Support
If you encounter any issues, check:
1. Browser console for JavaScript errors
2. Network tab for failed API requests
3. Backend logs for server errors
4. Redux DevTools for state issues
