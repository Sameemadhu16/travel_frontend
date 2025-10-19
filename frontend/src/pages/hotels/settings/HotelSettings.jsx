import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaClock, FaImage, FaSave, FaBuilding, FaIdCard } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../../config/firebase';
import HotelLayout from '../../../components/hotel/HotelLayout';
import ImageUploader from '../../../components/ImageUploader';
import { getHotelByUserDocId, updateHotel } from '../../../api/hotelService';
import { getUserByDocId } from '../../../api/userService';
import { showToastMessage } from '../../../utils/toastHelper';

export default function HotelSettings() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hotelId, setHotelId] = useState(null);
  const [hotelImages, setHotelImages] = useState([]);
  const [imageError, setImageError] = useState('');
  const [hotelInfo, setHotelInfo] = useState({
    hotelName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    district: '',
    province: '',
    registrationNo: '',
    type: '',
    description: '',
    pricePerNight: '',
    amenities: [],
    images: [],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  });

  // Fetch hotel data on component mount
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        setLoading(true);
        const currentUser = auth.currentUser;

        if (!currentUser) {
          showToastMessage('error', 'Please login to access settings');
          navigate('/partner-login/step-1');
          return;
        }

        // Get hotel data using Firebase UID
        const hotelData = await getHotelByUserDocId(currentUser.uid);
        
        if (!hotelData || !hotelData.id) {
          showToastMessage('error', 'Hotel not found');
          return;
        }

        // Get user data to fetch email
        let userEmail = '';
        try {
          const userData = await getUserByDocId(currentUser.uid);
          userEmail = userData?.email || '';
        } catch (userError) {
          console.warn('Could not fetch user email:', userError);
          // If user fetch fails, continue without email
        }

        setHotelId(hotelData.id);
        
        // Set form data with existing hotel data
        setHotelInfo({
          hotelName: hotelData.hotelName || '',
          email: userEmail, // Email from user table
          phone: hotelData.phone || '',
          street: hotelData.street || '',
          city: hotelData.city || '',
          district: hotelData.district || '',
          province: hotelData.province || '',
          registrationNo: hotelData.registrationNo || '',
          type: hotelData.type || '', // Hotel type (Hotel, Resort, Guest House, etc.)
          description: hotelData.description || '',
          pricePerNight: hotelData.pricePerNight || '',
          amenities: hotelData.amenities || [],
          images: hotelData.images || [],
          checkInTime: hotelData.checkInTime || '14:00',
          checkOutTime: hotelData.checkOutTime || '12:00'
        });

        // Set existing images
        setHotelImages(hotelData.images || []);
        
        console.log('Hotel data loaded:', {
          hotelName: hotelData.hotelName,
          type: hotelData.type,
          imageCount: (hotelData.images || []).length
        });

      } catch (error) {
        console.error('Error fetching hotel data:', error);
        showToastMessage('error', 'Failed to load hotel data');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [auth, navigate]);

  const handleInfoChange = (field, value) => {
    setHotelInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!hotelInfo.hotelName || !hotelInfo.street || !hotelInfo.city) {
        showToastMessage('error', 'Please fill in all required fields');
        return;
      }

      // Check authentication
      const currentUser = auth.currentUser;
      if (!currentUser) {
        showToastMessage('error', 'Please login to save settings');
        navigate('/partner-login/step-1');
        return;
      }

      setSaving(true);

      // Prepare data for update (email is excluded as it comes from user table)
      const updateData = {
        hotelName: hotelInfo.hotelName,
        phone: hotelInfo.phone,
        street: hotelInfo.street,
        city: hotelInfo.city,
        district: hotelInfo.district,
        province: hotelInfo.province,
        registrationNo: hotelInfo.registrationNo,
        type: hotelInfo.type,
        description: hotelInfo.description,
        pricePerNight: hotelInfo.pricePerNight ? Number(hotelInfo.pricePerNight) : null,
        amenities: hotelInfo.amenities,
        images: hotelImages,
        checkInTime: hotelInfo.checkInTime,
        checkOutTime: hotelInfo.checkOutTime
      };

      // Call API to update hotel
      await updateHotel(hotelId, updateData);
      
      showToastMessage('success', 'Hotel settings saved successfully!');
      
    } catch (error) {
      console.error('Error saving hotel settings:', error);
      
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          showToastMessage('error', 'Authentication failed. Please login again.');
          navigate('/partner-login/step-1');
        } else if (status === 403) {
          showToastMessage('error', 'You don\'t have permission to update this hotel');
        } else if (status === 404) {
          showToastMessage('error', 'Hotel not found');
        } else {
          showToastMessage('error', error.response.data || 'Failed to save settings');
        }
      } else {
        showToastMessage('error', 'Failed to save settings. Please check your connection.');
      }
    } finally {
      setSaving(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <HotelLayout>
        <div className="p-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
            <p className="mt-4 text-content-secondary">Loading hotel settings...</p>
          </div>
        </div>
      </HotelLayout>
    );
  }

  return (
    <HotelLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Hotel Settings</h1>
          <p className="text-gray-600">Manage your hotel information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Hotel Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={hotelInfo.hotelName}
                      onChange={(e) => handleInfoChange('hotelName', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="Enter hotel name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Registration Number</label>
                  <div className="relative">
                    <FaIdCard className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={hotelInfo.registrationNo}
                      onChange={(e) => handleInfoChange('registrationNo', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="Enter registration number"
                      readOnly
                      disabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                      <span className="text-xs text-gray-500 ml-2">(From user account)</span>
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="email"
                        value={hotelInfo.email}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                        placeholder="Email from user account"
                        readOnly
                        disabled
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      To change your email, please update your account settings
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="tel"
                        value={hotelInfo.phone}
                        onChange={(e) => handleInfoChange('phone', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Hotel Type</label>
                  <select
                    value={hotelInfo.type}
                    onChange={(e) => handleInfoChange('type', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white"
                  >
                    <option value="">Select hotel type</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Resort">Resort</option>
                    <option value="Guest House">Guest House</option>
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Boutique Hotel">Boutique Hotel</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Bed & Breakfast">Bed & Breakfast</option>
                  </select>
                  {hotelInfo.type && (
                    <p className="text-xs text-gray-500 mt-1">
                      Current type: <span className="font-semibold">{hotelInfo.type}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={hotelInfo.street}
                      onChange={(e) => handleInfoChange('street', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="Enter street address"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={hotelInfo.city}
                      onChange={(e) => handleInfoChange('city', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="Enter city"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">District</label>
                    <input
                      type="text"
                      value={hotelInfo.district}
                      onChange={(e) => handleInfoChange('district', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="Enter district"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Province</label>
                    <input
                      type="text"
                      value={hotelInfo.province}
                      onChange={(e) => handleInfoChange('province', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="Enter province"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price Per Night (LKR)</label>
                  <input
                    type="number"
                    value={hotelInfo.pricePerNight}
                    onChange={(e) => handleInfoChange('pricePerNight', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="Enter price per night"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Hotel Description</h2>
              <textarea
                value={hotelInfo.description}
                onChange={(e) => handleInfoChange('description', e.target.value)}
                className="w-full p-4 border rounded-lg"
                rows="4"
                placeholder="Enter hotel description"
              />
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Check-in/Check-out Times</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Check-in Time</label>
                  <div className="relative">
                    <FaClock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="time"
                      value={hotelInfo.checkInTime}
                      onChange={(e) => handleInfoChange('checkInTime', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Check-out Time</label>
                  <div className="relative">
                    <FaClock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="time"
                      value={hotelInfo.checkOutTime}
                      onChange={(e) => handleInfoChange('checkOutTime', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaImage className="text-brand-primary" />
                Hotel Images
              </h2>
              <ImageUploader
                label=""
                images={hotelImages}
                setImages={setHotelImages}
                error={imageError}
                setError={setImageError}
                multiple={false}
              />
              <p className="text-sm text-gray-500 mt-2">
                Upload up to 10 images. Recommended size: 1200x800 pixels
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Click the ✕ button on any image to remove it
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Settings Status</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    hotelInfo.hotelName && hotelInfo.street && hotelInfo.city 
                      ? 'bg-green-500' 
                      : 'bg-yellow-500'
                  }`}></div>
                  <span className="text-sm">
                    {hotelInfo.hotelName && hotelInfo.street && hotelInfo.city 
                      ? 'Basic information complete' 
                      : 'Basic information incomplete'}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    hotelImages.length > 0 ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <span className="text-sm">
                    {hotelImages.length > 0 
                      ? `${hotelImages.length} image(s) uploaded` 
                      : 'No images uploaded'}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    hotelInfo.description ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <span className="text-sm">
                    {hotelInfo.description 
                      ? 'Description added' 
                      : 'Description missing'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <FaSave />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </HotelLayout>
  );
}
