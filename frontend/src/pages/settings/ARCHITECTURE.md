# Profile Settings - Component Architecture

## 🏗️ Component Structure

```
ProfileSettings (Main Component)
│
├── State Management
│   ├── Redux (useSelector)
│   │   └── user (from authSlice)
│   ├── Local State (useState)
│   │   ├── loading
│   │   ├── saving
│   │   ├── userData
│   │   ├── isEditing
│   │   ├── formData
│   │   └── profilePreview
│   └── Refs (useRef)
│       └── fileInputRef
│
├── Effects (useEffect)
│   └── fetchUserData (on mount)
│
├── Event Handlers
│   ├── handleInputChange
│   ├── handleProfilePictureChange
│   ├── handleProfilePictureClick
│   ├── handleSubmit
│   └── handleCancel
│
└── UI Components
    ├── Header Section
    │   ├── Gradient Banner (orange gradient)
    │   ├── Profile Picture Container
    │   │   ├── Profile Image
    │   │   └── Camera Icon Button (edit mode)
    │   ├── User Info
    │   │   ├── Name (Title)
    │   │   ├── Email (with FaEnvelope icon)
    │   │   └── Level Badge
    │   └── Edit Button (view mode)
    │
    ├── Profile Form Section
    │   ├── Section Header (with FaUser icon)
    │   ├── Personal Information
    │   │   ├── First Name (InputField)
    │   │   └── Last Name (InputField)
    │   ├── Email Field (read-only)
    │   ├── Phone Number (with FaPhone icon)
    │   └── Location Details
    │       ├── Address
    │       ├── City
    │       └── Country
    │
    ├── Action Buttons (edit mode)
    │   ├── Save Changes (PrimaryButton)
    │   └── Cancel (SecondaryButton)
    │
    └── Statistics Cards
        ├── Total Bookings (orange gradient)
        ├── Active Trips (orange gradient)
        └── Rewards Points (orange gradient)
```

## 🔄 Data Flow

```
1. Component Mount
   └→ useEffect triggered
      └→ fetchUserData()
         └→ getUserByDocId(user.data.docId)
            └→ API: GET /api/users/public/:docId
               └→ setUserDataLocal(response)
                  └→ setFormData(response)
                     └→ setProfilePreview(response.profilePicture)
                        └→ setLoading(false)

2. Edit Mode Activated
   └→ Click "Edit Profile" button
      └→ setIsEditing(true)
         └→ Form fields become editable
            └→ Camera icon appears on profile picture

3. Profile Picture Upload
   └→ Click camera icon
      └→ File input triggered
         └→ User selects image
            └→ handleProfilePictureChange()
               └→ Validate file (type & size)
                  └→ Convert to base64
                     └→ setProfilePreview(base64)
                        └→ Update formData.profilePicture

4. Form Field Changes
   └→ User types in input field
      └→ onChange event
         └→ handleInputChange(e)
            └→ setFormData({ ...prev, [name]: value })

5. Save Changes
   └→ Click "Save Changes" button
      └→ handleSubmit(e)
         └→ e.preventDefault()
            └→ setSaving(true)
               └→ updateUser(userData.id, updateData)
                  └→ API: PUT /api/users/:id
                     └→ dispatch(setUserData(updatedData))
                        └→ Redux store updated
                           └→ Header component re-renders
                              └→ New profile picture displayed
                                 └→ toast.success()
                                    └→ setIsEditing(false)
                                       └→ setSaving(false)

6. Cancel Changes
   └→ Click "Cancel" button
      └→ handleCancel()
         └→ Reset formData to original userData
            └→ Reset profilePreview
               └→ setIsEditing(false)
```

## 🎨 Styling Architecture

```
Theme System (Tailwind CSS)
├── Colors
│   ├── brand-primary: #fb923c
│   ├── brand-secondary: #fed7aa
│   ├── brand-accent: #ffedd5
│   └── brand-light: #fff7ed
│
├── Layout
│   ├── Container: max-w-4xl mx-auto
│   ├── Padding: py-8 px-4 sm:px-6 lg:px-8
│   └── Background: gradient-to-br from-orange-50 via-white to-orange-50
│
├── Cards
│   ├── Border-radius: rounded-2xl
│   ├── Shadow: shadow-lg
│   ├── Background: bg-white
│   └── Padding: p-6 sm:p-8
│
├── Buttons
│   ├── Primary: bg-brand-primary hover:bg-orange-600
│   ├── Transitions: transition-all duration-200
│   └── Shadow: shadow-md hover:shadow-lg
│
└── Responsive Breakpoints
    ├── sm: 640px
    ├── md: 768px
    ├── lg: 1024px
    └── xl: 1280px
```

## 🔌 API Integration

```
User Service (userService.js)
├── Base URL: API_BASE_URL
├── HTTP Client: axios
│
├── getUserByDocId(docId)
│   ├── Method: GET
│   ├── Endpoint: /api/users/public/:docId
│   ├── Returns: User object
│   └── Error handling: try-catch with console.error
│
└── updateUser(id, userData)
    ├── Method: PUT
    ├── Endpoint: /api/users/:id
    ├── Body: { firstName, lastName, phoneNumber, address, city, country, profilePicture }
    ├── Returns: Updated user object
    └── Error handling: try-catch with console.error
```

## 🗄️ Redux State Structure

```
Redux Store
└── auth (authSlice)
    ├── user
    │   ├── data
    │   │   ├── docId (Firebase UID)
    │   │   ├── email
    │   │   ├── firstName
    │   │   ├── lastName
    │   │   ├── phoneNumber
    │   │   ├── profilePicture
    │   │   ├── role
    │   │   └── level
    │   └── token
    ├── token
    ├── isAuthenticated
    ├── loading
    └── error

Actions:
├── setUserData(payload)
│   └── Updates user.data with new information
├── registerStart()
├── registerSuccess(payload)
├── registerFailure(payload)
└── resetAuth()
```

## 📊 Component Lifecycle

```
1. Mounting Phase
   ├── Constructor (implicit)
   ├── Initial state setup
   ├── Render (loading state)
   └── useEffect (fetch data)

2. Updating Phase
   ├── User interaction
   ├── State update
   ├── Re-render
   └── DOM update

3. Unmounting Phase
   └── Cleanup (if needed)
```

## 🔐 Security Measures

```
Security Layer
├── Authentication
│   ├── Token-based (Redux)
│   ├── Protected route
│   └── User session validation
│
├── Input Validation
│   ├── File type check (images only)
│   ├── File size limit (5MB)
│   └── Base64 encoding
│
├── API Security
│   ├── JWT token in headers
│   ├── CORS configuration
│   └── Rate limiting (backend)
│
└── Data Protection
    ├── Email read-only (linked to Firebase)
    ├── Password not exposed
    └── Sensitive data encryption (backend)
```

## 📱 Responsive Behavior

```
Screen Sizes
├── Mobile (< 640px)
│   ├── Single column layout
│   ├── Stacked form fields
│   ├── Full-width buttons
│   └── Centered profile picture
│
├── Tablet (640px - 1024px)
│   ├── Two-column form grid
│   ├── Side-by-side buttons
│   └── Flexible profile section
│
└── Desktop (> 1024px)
    ├── Optimized layout (max-w-4xl)
    ├── Multi-column grids
    ├── Hover effects
    └── Enhanced spacing
```

## 🎯 Component Props & State

```javascript
// Local State
const [loading, setLoading] = useState(true)           // Boolean
const [saving, setSaving] = useState(false)            // Boolean
const [userData, setUserDataLocal] = useState(null)    // Object | null
const [isEditing, setIsEditing] = useState(false)      // Boolean
const [formData, setFormData] = useState({             // Object
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: '',
  profilePicture: null
})
const [profilePreview, setProfilePreview] = useState(null)  // String | null

// Redux State (useSelector)
const { user } = useSelector((state) => state.auth)    // Object

// Refs
const fileInputRef = useRef(null)                      // HTMLInputElement
```

## 🚦 Error Handling Flow

```
Error Handling
├── API Errors
│   ├── Catch in try-catch block
│   ├── Log to console
│   ├── Display toast.error()
│   └── Maintain current state
│
├── File Upload Errors
│   ├── Invalid file type → toast.error()
│   ├── File too large → toast.error()
│   └── Return early (no state change)
│
└── Form Validation
    ├── Client-side checks
    ├── Required field validation
    └── Format validation
```

This architecture provides a complete, maintainable, and scalable solution for user profile management!
