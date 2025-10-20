import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCamera, FaEdit } from 'react-icons/fa';
import { getUserByDocId, updateUser } from '../../api/userService';
import { setUserData } from '../../redux/slices/authSlice';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import InputField from '../../components/InputField';
import Title from '../../components/Title';
import toast from 'react-hot-toast';
import defaultAvatar from '../../assets/users/user1.jpg';

export default function ProfileSettings() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [userData, setUserDataLocal] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        profilePicture: null,
    });
    
    const [profilePreview, setProfilePreview] = useState(null);

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user?.data?.docId) {
                    const response = await getUserByDocId(user.data.docId);
                    setUserDataLocal(response);
                    
                    // Populate form data - prioritize Redux state for profile picture
                    setFormData({
                        firstName: response.firstName || '',
                        lastName: response.lastName || '',
                        email: response.email || '',
                        phone: response.phoneNumber || '',
                        address: response.address || '',
                        city: response.city || '',
                        country: response.country || '',
                        profilePicture: user?.data?.profilePicture || response.profilePicture || null,
                    });
                    
                    // Set profile preview - prioritize Redux state
                    const currentProfilePic = user?.data?.profilePicture || response.profilePicture;
                    if (currentProfilePic) {
                        setProfilePreview(currentProfilePic);
                        console.log('Profile preview set from:', user?.data?.profilePicture ? 'Redux' : 'Backend');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);
    
    // Update profile preview when Redux state changes (after save)
    useEffect(() => {
        if (user?.data?.profilePicture && !isEditing) {
            console.log('Updating profile preview from Redux state');
            setProfilePreview(user.data.profilePicture);
            setFormData(prev => ({
                ...prev,
                profilePicture: user.data.profilePicture
            }));
        }
    }, [user?.data?.profilePicture, isEditing]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle profile picture selection
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error('Please select a valid image file');
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePreview(reader.result);
                setFormData(prev => ({
                    ...prev,
                    profilePicture: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Trigger file input click
    const handleProfilePictureClick = () => {
        fileInputRef.current?.click();
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const updateData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phone,
                address: formData.address,
                city: formData.city,
                country: formData.country,
                profilePicture: formData.profilePicture,
            };

            console.log('📤 Sending update to backend:', updateData);

            const response = await updateUser(userData.id, updateData);
            console.log('📥 Response from backend:', response);
            
            // Update local user data state with the response from backend
            setUserDataLocal(response);
            
            console.log('✅ Updated userData from backend:', {
                firstName: response.firstName,
                lastName: response.lastName,
                phoneNumber: response.phoneNumber,
                address: response.address,
                city: response.city,
                country: response.country
            });
            
            // Update form data to reflect the saved state
            setFormData({
                firstName: response.firstName || '',
                lastName: response.lastName || '',
                email: response.email || '',
                phone: response.phoneNumber || '',
                address: response.address || '',
                city: response.city || '',
                country: response.country || '',
                profilePicture: response.profilePicture || null,
            });
            
            // Update Redux store with complete user data from backend response
            dispatch(setUserData({
                ...user.data,
                ...response,
                // Ensure phoneNumber is available for forms that use it
                phoneNumber: response.phoneNumber,
            }));

            // Debug log to verify Redux update
            console.log('✅ Profile saved successfully! Redux updated with backend response');

            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    // Handle cancel editing
    const handleCancel = () => {
        // Reset form data - prioritize Redux state for profile picture (in case it was just saved)
        const currentProfilePic = user?.data?.profilePicture || userData?.profilePicture || null;
        
        if (userData) {
            setFormData({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: userData.email || '',
                phone: userData.phoneNumber || '',
                address: userData.address || '',
                city: userData.city || '',
                country: userData.country || '',
                profilePicture: currentProfilePic,
            });
            setProfilePreview(currentProfilePic);
            console.log('Cancel: Reset to saved profile picture from', user?.data?.profilePicture ? 'Redux' : 'userData');
        }
        setIsEditing(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-brand-primary to-orange-500 h-32"></div>
                    <div className="px-6 pb-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-12">
                            {/* Profile Picture */}
                            <div className="relative group">
                                <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden shadow-xl bg-white">
                                    <img 
                                        src={profilePreview || defaultAvatar} 
                                        alt="Profile" 
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                {isEditing && (
                                    <button
                                        onClick={handleProfilePictureClick}
                                        className="absolute bottom-0 right-0 bg-brand-primary hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
                                    >
                                        <FaCamera className="text-lg" />
                                    </button>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                    className="hidden"
                                />
                            </div>
                            
                            {/* User Info */}
                            <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 text-center sm:text-left">
                                <Title
                                    title={`${formData.firstName} ${formData.lastName}`}
                                    size="text-3xl"
                                    font="font-bold"
                                />
                                <p className="text-content-secondary mt-1 flex items-center justify-center sm:justify-start gap-2">
                                    <FaEnvelope className="text-brand-primary" />
                                    {formData.email}
                                </p>
                                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-brand-accent text-brand-primary text-sm font-medium">
                                    Level {user?.data?.level || 1}
                                </div>
                            </div>

                            {/* Edit Button */}
                            {!isEditing && (
                                <div className="mt-4 sm:mt-0">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-orange-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                                    >
                                        <FaEdit />
                                        <span>Edit Profile</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    <div className="flex items-center gap-2 mb-6">
                        <FaUser className="text-brand-primary text-2xl" />
                        <Title title="Personal Information" size="text-2xl" font="font-bold" />
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <InputField
                                    label="First Name"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your first name"
                                    disabled={!isEditing}
                                />
                            </div>
                            <div>
                                <InputField
                                    label="Last Name"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your last name"
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        {/* Email Field (Read-only) */}
                        <div className="mb-6">
                            <InputField
                                label="Email Address"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={() => {}}
                                placeholder="Email"
                                disabled={true}
                            />
                            <p className="text-sm text-content-tertiary mt-1">
                                Email cannot be changed
                            </p>
                        </div>

                        {/* Phone Field */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <FaPhone className="text-brand-primary" />
                                <label htmlFor="phone" className="font-medium text-[16px]">Phone Number</label>
                            </div>
                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                                disabled={!isEditing}
                                className={`border-2 w-full py-2 px-4 rounded-md border-b-2 focus:border-brand-primary focus:outline-none ${
                                    isEditing ? '' : 'bg-gray-100 cursor-not-allowed opacity-60'
                                }`}
                            />
                        </div>

                        {/* Address Section */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                <FaMapMarkerAlt className="text-brand-primary text-xl" />
                                <Title title="Location Details" size="text-xl" font="font-semibold" />
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="address" className="font-medium text-[16px]">Address</label>
                                    <input
                                        id="address"
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Street address"
                                        disabled={!isEditing}
                                        className={`border-2 w-full py-2 px-4 rounded-md border-b-2 focus:border-brand-primary focus:outline-none ${
                                            isEditing ? '' : 'bg-gray-100 cursor-not-allowed opacity-60'
                                        }`}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="city" className="font-medium text-[16px]">City</label>
                                        <input
                                            id="city"
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="City"
                                            disabled={!isEditing}
                                            className={`border-2 w-full py-2 px-4 rounded-md border-b-2 focus:border-brand-primary focus:outline-none ${
                                                isEditing ? '' : 'bg-gray-100 cursor-not-allowed opacity-60'
                                            }`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="country" className="font-medium text-[16px]">Country</label>
                                        <input
                                            id="country"
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            placeholder="Country"
                                            disabled={!isEditing}
                                            className={`border-2 w-full py-2 px-4 rounded-md border-b-2 focus:border-brand-primary focus:outline-none ${
                                                isEditing ? '' : 'bg-gray-100 cursor-not-allowed opacity-60'
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {isEditing && (
                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                <PrimaryButton
                                    text={saving ? "Saving..." : "Save Changes"}
                                    type="submit"
                                    isDisabled={saving}
                                    className="flex-1"
                                />
                                <SecondaryButton
                                    text="Cancel"
                                    onClick={handleCancel}
                                    className="flex-1"
                                />
                            </div>
                        )}
                    </form>
                </div>

                {/* Account Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-brand-primary to-orange-500 rounded-xl p-6 text-white shadow-lg">
                        <p className="text-sm opacity-90">Total Bookings</p>
                        <p className="text-3xl font-bold mt-2">0</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                        <p className="text-sm opacity-90">Active Trips</p>
                        <p className="text-3xl font-bold mt-2">0</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl p-6 text-white shadow-lg">
                        <p className="text-sm opacity-90">Rewards Points</p>
                        <p className="text-3xl font-bold mt-2">0</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
