# User Profile Settings Feature

## Overview
This feature allows users to view and edit their profile information, including personal details, contact information, location, and profile picture.

## Features

### 1. Profile Picture Upload
- Users can upload a profile picture from their device
- Supports common image formats (JPEG, PNG, GIF, WebP)
- Maximum file size: 5MB
- Image is stored as base64 in the database
- Profile picture is displayed in:
  - Header navigation menu
  - Profile settings page
  - Other user-related components

### 2. Editable Profile Information
- **Personal Information**
  - First Name
  - Last Name
  - Email (read-only)
  
- **Contact Information**
  - Phone Number
  
- **Location Details**
  - Address
  - City
  - Country

### 3. User Interface
- **Orange Theme**: Matches the Travel.lk brand colors
- **Gradient Background**: Orange-50 to white gradient
- **Modern Design**: Rounded corners, shadows, and smooth transitions
- **Responsive Layout**: Works on mobile, tablet, and desktop
- **Interactive Elements**:
  - Edit mode toggle
  - Camera icon for profile picture upload
  - Save/Cancel buttons
  - Toast notifications for success/error messages

### 4. Account Statistics (Coming Soon)
- Total Bookings
- Active Trips
- Rewards Points

## Technical Implementation

### Frontend Components
- **Page**: `/src/pages/settings/ProfileSettings.jsx`
- **Route**: `/settings/profile`
- **Dependencies**:
  - React Hooks (useState, useEffect, useRef)
  - Redux (useSelector, useDispatch)
  - React Hot Toast for notifications
  - React Icons for UI icons

### Backend API
- **Endpoints**:
  - `GET /api/users/public/:docId` - Fetch user by Firebase UID
  - `PUT /api/users/:id` - Update user information
  
### Database Schema
New fields added to `users` table:
```sql
- phone_number VARCHAR(20)
- address VARCHAR(255)
- city VARCHAR(100)
- country VARCHAR(100)
- profile_picture TEXT
```

### Redux State Management
- Uses `authSlice` for user state management
- Action: `setUserData` - Updates user data in Redux store after successful profile update

## Usage

### Accessing Profile Settings
1. User must be logged in
2. Click on profile picture/name in the header
3. Click "Profile Settings" from the dropdown menu
4. Route: `/settings/profile`

### Editing Profile
1. Click the "Edit Profile" button
2. Make changes to any editable field
3. Upload a profile picture by clicking the camera icon
4. Click "Save Changes" to persist updates
5. Click "Cancel" to discard changes

### Profile Picture Upload
1. Click the camera icon on the profile picture (only in edit mode)
2. Select an image file from your device
3. Preview appears immediately
4. Save changes to persist the new profile picture

## File Structure
```
travel_frontend/frontend/src/
├── pages/
│   └── settings/
│       └── ProfileSettings.jsx          # Main profile settings component
├── api/
│   └── userService.js                   # User API service
├── redux/
│   └── slices/
│       └── authSlice.js                 # Authentication state management
└── components/
    ├── Header.jsx                       # Updated to show profile picture
    ├── PrimaryButton.jsx               # Reusable button component
    ├── SecondaryButton.jsx             # Reusable secondary button
    └── InputField.jsx                  # Reusable input field component
```

## Color Scheme (Orange Theme)
- **Primary**: `#fb923c` (orange-400)
- **Secondary**: `#fed7aa` (orange-200)
- **Accent**: `#ffedd5` (orange-100)
- **Light**: `#fff7ed` (orange-50)
- **Gradients**: Various orange gradients for visual appeal

## Future Enhancements
1. Password change functionality
2. Email verification
3. Two-factor authentication
4. Social media profile linking
5. Account deletion
6. Privacy settings
7. Notification preferences
8. Real-time booking statistics
9. Rewards system integration
10. Profile completion percentage

## Security Considerations
- Email cannot be changed (linked to Firebase authentication)
- Profile pictures are validated for type and size
- All API calls are authenticated
- User data is protected by Firebase security rules

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies
```json
{
  "react": "^18.x",
  "react-redux": "^8.x",
  "react-hot-toast": "^2.x",
  "react-icons": "^4.x",
  "react-router-dom": "^6.x",
  "axios": "^1.x"
}
```

## Migration Required
Before using this feature, run the database migration:
```bash
# Navigate to travel-backend directory
cd travel-backend

# Run the migration script
psql -U your_username -d your_database -f database_migrations/add_user_profile_fields.sql
```

## Testing Checklist
- [ ] Profile loads correctly on page load
- [ ] Edit mode toggles properly
- [ ] All form fields update correctly
- [ ] Profile picture upload works
- [ ] Image validation (type and size) works
- [ ] Save button persists changes
- [ ] Cancel button discards changes
- [ ] Toast notifications display correctly
- [ ] Profile picture updates in header
- [ ] Responsive design works on all screen sizes
- [ ] API error handling works
- [ ] Redux state updates correctly

## Known Issues
None at this time.

## Support
For issues or questions, please contact the development team.
