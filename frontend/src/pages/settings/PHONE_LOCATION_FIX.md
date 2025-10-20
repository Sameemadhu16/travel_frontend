# Phone Number and Location Not Saving - Fix Guide

## 🐛 Issue
Only First Name and Last Name are saving. Phone Number, Address, City, and Country are not being saved or displayed after save.

## 🔍 Root Causes

### Possible Cause 1: Database Columns Don't Exist
The database might not have the new columns (`phone_number`, `address`, `city`, `country`) yet.

### Possible Cause 2: Backend Not Returning Updated Data
The backend API might not be returning the updated user object after save.

### Possible Cause 3: Field Mapping Issue
Frontend field names (`formData.phone`) need to map correctly to backend field names (`phoneNumber`).

## ✅ Solution Steps

### Step 1: Run Database Migration (REQUIRED!)

**This is likely the main issue!** The database needs the new columns.

```bash
cd travel-backend

# Run the migration SQL
psql -U your_username -d your_database -f database_migrations/add_user_profile_fields.sql
```

**Or run manually in database:**
```sql
-- Add phone_number column
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS phone_number VARCHAR(20);

-- Add address column
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS address VARCHAR(255);

-- Add city column
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS city VARCHAR(100);

-- Add country column
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS country VARCHAR(100);

-- Add profile_picture column
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS profile_picture TEXT;

-- Verify columns were added
SELECT column_name, data_type, character_maximum_length 
FROM information_schema.columns 
WHERE table_name = 'users'
ORDER BY ordinal_position;
```

### Step 2: Restart Backend Server

After running the migration:
```bash
cd travel-backend
./mvnw spring-boot:run
```

### Step 3: Test the Save Function

1. **Open Browser Console** (F12)
2. **Navigate to Profile Settings**
3. **Click "Edit Profile"**
4. **Enter Data**:
   ```
   First Name: John
   Last Name: Smith
   Phone: 0123456789
   Address: 123 Main Street
   City: Colombo
   Country: Sri Lanka
   ```
5. **Click "Save Changes"**
6. **Check Console Logs**

## 🔍 Console Logs to Check

### What You Should See:

#### Before Save (on page load):
```javascript
Profile preview set from: Backend
```

#### During Save:
```javascript
📤 Sending update to backend: {
    firstName: "John",
    lastName: "Smith",
    phoneNumber: "0123456789",  // ← Should be here!
    address: "123 Main Street",  // ← Should be here!
    city: "Colombo",            // ← Should be here!
    country: "Sri Lanka",       // ← Should be here!
    profilePicture: "data:image/..."
}
```

#### After Save Response:
```javascript
📥 Response from backend: {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    phoneNumber: "0123456789",  // ← Should be returned!
    address: "123 Main Street",  // ← Should be returned!
    city: "Colombo",            // ← Should be returned!
    country: "Sri Lanka",       // ← Should be returned!
    email: "user@email.com",
    docId: "firebase-uid",
    profilePicture: "data:image/..."
}
```

#### Updated Local State:
```javascript
✅ Updated userData: {
    firstName: "John",
    lastName: "Smith",
    phoneNumber: "0123456789",  // ← Should be stored!
    address: "123 Main Street",  // ← Should be stored!
    city: "Colombo",            // ← Should be stored!
    country: "Sri Lanka"        // ← Should be stored!
}
```

## 🚨 Troubleshooting

### Issue 1: Console shows "null" for phone/address/city/country in response

**Diagnosis**: Database columns don't exist yet

**Solution**:
1. Run the database migration (Step 1 above)
2. Verify columns exist:
   ```sql
   \d users
   -- Should show phone_number, address, city, country columns
   ```
3. Restart backend server
4. Try saving again

### Issue 2: Console shows error "column does not exist"

**Error Example**:
```
ERROR: column "phone_number" of relation "users" does not exist
```

**Solution**:
1. The migration wasn't run or failed
2. Run the migration SQL manually
3. Check database user permissions
4. Restart backend

### Issue 3: Data saves but doesn't display after save

**Diagnosis**: Frontend state not updating correctly

**Solution**: Already fixed in code with these changes:
```javascript
// After save, update local state
const newUserData = {
    ...userData,
    phoneNumber: formData.phone,  // Maps phone → phoneNumber
    address: formData.address,
    city: formData.city,
    country: formData.country
};
setUserDataLocal(newUserData);
```

### Issue 4: Data disappears after page refresh

**Diagnosis**: Data not actually saved to database

**Check**:
1. Open database directly:
   ```sql
   SELECT id, first_name, last_name, phone_number, address, city, country 
   FROM users 
   WHERE email = 'your@email.com';
   ```
2. If columns show NULL, backend isn't saving
3. Check backend logs for errors
4. Verify backend User model has the fields

## 🧪 Step-by-Step Test

### Test Case: Save Phone Number

1. **Clear browser console**
2. **Click "Edit Profile"**
3. **Enter Phone**: `0706281338`
4. **Click "Save Changes"**
5. **Check Console** - Should see:
   ```
   📤 Sending update to backend: { ..., phoneNumber: "0706281338", ... }
   📥 Response from backend: { ..., phoneNumber: "0706281338", ... }
   ✅ Updated userData: { ..., phoneNumber: "0706281338", ... }
   ```
6. **Verify Field Shows**: `0706281338` in gray (disabled) field
7. **Refresh Page**
8. **Verify Still Shows**: `0706281338`

### Test Case: Save Location Details

1. **Click "Edit Profile"**
2. **Enter**:
   - Address: `17 B Maitipe 3 Lane Galle`
   - City: `Galle`
   - Country: `Sri Lanka`
3. **Click "Save Changes"**
4. **Check Console** - Should see all three fields in logs
5. **Verify All Three Fields Show** the entered data
6. **Refresh Page**
7. **Verify All Three Still Show** the entered data

## 📊 Database Verification

After saving, check the database directly:

```sql
-- Connect to database
psql -U your_username -d your_database

-- Check user data
SELECT 
    id,
    email,
    first_name,
    last_name,
    phone_number,
    address,
    city,
    country,
    SUBSTRING(profile_picture, 1, 50) as profile_pic_preview
FROM users 
WHERE email = 'umeshi2kavindya@gmail.com';
```

**Expected Result**:
```
 id | email                        | first_name | last_name | phone_number | address              | city  | country    | profile_pic_preview
----+------------------------------+------------+-----------+--------------+---------------------+-------+------------+--------------------
  1 | umeshi2kavindya@gmail.com    | hirun      | mihisara  | 0706281338   | 17 B Maitipe 3 ...  | Galle | Sri Lanka  | data:image/jpeg...
```

## 🔧 Backend Verification

### Check UserController.java

Make sure the PUT endpoint accepts all fields:

```java
@PutMapping("/{id}")
ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable Long id) {
    try {
        userService.updateUser(user, id);
        return ResponseEntity.ok("OK");
    } catch (Exception e) {
        return ResponseEntity.badRequest().build();
    }
}
```

### Check UserService Implementation

Make sure it updates all fields:

```java
public void updateUser(User newUser, Long id) {
    Optional<User> existingUser = userRepository.findById(id);
    if (existingUser.isPresent()) {
        User user = existingUser.get();
        user.setFirstName(newUser.getFirstName());
        user.setLastName(newUser.getLastName());
        user.setPhoneNumber(newUser.getPhoneNumber());  // ← Must be here!
        user.setAddress(newUser.getAddress());          // ← Must be here!
        user.setCity(newUser.getCity());                // ← Must be here!
        user.setCountry(newUser.getCountry());          // ← Must be here!
        user.setProfilePicture(newUser.getProfilePicture());
        userRepository.save(user);
    }
}
```

## ✅ Final Checklist

Before testing, make sure:

- [ ] Database migration has been run
- [ ] New columns exist in users table
- [ ] Backend server has been restarted
- [ ] Frontend code has been saved and webpack recompiled
- [ ] Browser cache has been cleared (Cmd+Shift+R)
- [ ] Console is open to see debug logs

## 🎯 Expected Behavior After Fix

### Before Fix (Current Issue):
```
Save:
  First Name: John ✅ Saves
  Last Name: Smith ✅ Saves
  Phone: 0123456789 ❌ Doesn't save
  Address: 123 Main St ❌ Doesn't save
  City: Colombo ❌ Doesn't save
  Country: Sri Lanka ❌ Doesn't save
```

### After Fix:
```
Save:
  First Name: John ✅ Saves & Displays
  Last Name: Smith ✅ Saves & Displays
  Phone: 0123456789 ✅ Saves & Displays
  Address: 123 Main St ✅ Saves & Displays
  City: Colombo ✅ Saves & Displays
  Country: Sri Lanka ✅ Saves & Displays

After Refresh:
  All data persists ✅
```

## 🚀 Quick Fix Summary

**Most Likely Fix**: Run the database migration!

```bash
# 1. Run migration
cd travel-backend
psql -U your_username -d your_database -f database_migrations/add_user_profile_fields.sql

# 2. Restart backend
./mvnw spring-boot:run

# 3. Hard refresh browser
# Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

# 4. Test saving phone number and location
# All fields should now save and display correctly!
```

---

**Status**: 🔧 Fix Applied + Migration Required

The code is ready, but the database needs the new columns. Run the migration and everything should work!
