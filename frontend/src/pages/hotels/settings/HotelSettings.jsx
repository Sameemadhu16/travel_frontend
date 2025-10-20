import { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGlobe, 
  FaClock, 
  FaImage,
  FaCog,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSave,
  FaHistory,
  FaShieldAlt,
  FaLanguage,
  FaStar,
  FaWifi,
  FaCar,
  FaSwimmingPool,
  FaDumbbell,
  FaCoffee,
  FaConciergeBell,
  FaUtensilSpoon
} from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';
import ImageUploader from '../../../components/ImageUploader';
import { getHotelByUserDocId, updateHotel } from '../../../api/hotelService';
import { getUserByDocId } from '../../../api/userService';
import { showToastMessage } from '../../../utils/toastHelper';

// Enhanced Statistics Card Component (matching dashboard style)
function EnhancedStatsCard({ icon, title, value, change, changeType, subtitle, bgColor }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          {icon}
        </div>
      </div>
      {change && (
        <div className="mt-3">
          <span className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' : 
            changeType === 'warning' ? 'text-orange-600' : 'text-red-600'
          }`}>
            {change}
          </span>
        </div>
      )}
    </div>
  );
}

export default function HotelSettings() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const { date: currentDate, time: currentTime } = formatDateTime(currentDateTime);

  const ceylonHeritageProperties = [
    "Ceylon Heritage Grand Colombo",
    "Ceylon Heritage Kandy",
    "Ceylon Heritage Galle Fort", 
    "Ceylon Heritage Nuwara Eliya",
    "Ceylon Heritage Sigiriya",
    "Ceylon Heritage Bentota Beach"
  ];

  const [selectedBranch, setSelectedBranch] = useState(ceylonHeritageProperties[0]);

  const branchSettings = {
    "Ceylon Heritage Grand Colombo": {
      name: 'Ceylon Heritage Grand Colombo',
      email: 'reservations@ceylonheritage.lk',
      phone: '+94 11 542 8000',
      address: '77 Galle Road, Colombo 03, Sri Lanka',
      website: 'www.ceylonheritagegrand.com',
      checkInTime: '15:00',
      checkOutTime: '12:00',
      description: 'Premier flagship property combining colonial elegance with modern luxury. Overlooking Colombo Harbor with presidential suites and world-class heritage hospitality.',
      images: [],
      amenities: ['Free WiFi', 'Airport Shuttle', 'Swimming Pool', 'Fitness Center', 'Spa', 'Business Center', 'Concierge', 'Fine Dining'],
      languages: ['English', 'Sinhala', 'Tamil', 'German', 'French'],
      starRating: 5,
      established: '1875',
      heritage: 'Colonial Era Architecture',
      specialties: ['Presidential Suites', 'Harbor Views', 'Government VIP Services']
    },
    "Ceylon Heritage Kandy": {
      name: 'Ceylon Heritage Kandy',
      email: 'kandy@ceylonheritage.lk',
      phone: '+94 81 223 3500',
      address: 'Temple of Tooth Vicinity, Kandy 20000, Sri Lanka',
      website: 'www.ceylonheritagekandy.com',
      checkInTime: '14:00',
      checkOutTime: '11:00',
      description: 'Historic heritage property in the cultural heart of Sri Lanka. Walking distance to Temple of the Tooth with authentic Kandyan architecture and traditional hospitality.',
      images: [],
      amenities: ['Heritage Architecture', 'Temple Tours', 'Cultural Shows', 'Ayurveda Spa', 'Traditional Cuisine', 'Garden Views'],
      languages: ['English', 'Sinhala', 'Tamil', 'Hindi'],
      starRating: 4,
      established: '1920',
      heritage: 'Kandyan Architecture',
      specialties: ['Temple Proximity', 'Cultural Tours', 'Ayurveda Treatments']
    },
    "Ceylon Heritage Galle Fort": {
      name: 'Ceylon Heritage Galle Fort',
      email: 'galle@ceylonheritage.lk',
      phone: '+94 91 224 4200',
      address: 'Inside Galle Fort, Galle 80000, Sri Lanka',
      website: 'www.ceylonheritagegalle.com',
      checkInTime: '15:00',
      checkOutTime: '12:00',
      description: 'Boutique heritage hotel within the UNESCO World Heritage Galle Fort. Colonial Dutch architecture with ocean views and authentic heritage ambiance.',
      images: [],
      amenities: ['Fort Location', 'Ocean Views', 'Heritage Suites', 'Colonial Architecture', 'Walking Tours', 'Sunset Terrace'],
      languages: ['English', 'Sinhala', 'Tamil', 'Dutch', 'German'],
      starRating: 5,
      established: '1663',
      heritage: 'Dutch Colonial Fort',
      specialties: ['UNESCO Site', 'Ocean Views', 'Colonial Suites']
    },
    "Ceylon Heritage Nuwara Eliya": {
      name: 'Ceylon Heritage Nuwara Eliya',
      email: 'nuwaraeliya@ceylonheritage.lk',
      phone: '+94 52 222 2900',
      address: 'Hill Club Avenue, Nuwara Eliya 22200, Sri Lanka',
      website: 'www.ceylonheritagehills.com',
      checkInTime: '14:00',
      checkOutTime: '11:00',
      description: 'Colonial hill country retreat in Little England. Tea plantation setting with fireplaces, golf course, and cool mountain climate perfect for relaxation.',
      images: [],
      amenities: ['Fireplace Suites', 'Golf Course', 'Tea Plantation Tours', 'Cool Climate', 'Mountain Views', 'Colonial Ambiance'],
      languages: ['English', 'Sinhala', 'Tamil'],
      starRating: 4,
      established: '1891',
      heritage: 'British Colonial Hill Station',
      specialties: ['Tea Plantations', 'Golf Course', 'Cool Climate']
    },
    "Ceylon Heritage Sigiriya": {
      name: 'Ceylon Heritage Sigiriya',
      email: 'sigiriya@ceylonheritage.lk',
      phone: '+94 66 567 8900',
      address: 'Sigiriya Rock Vicinity, Sigiriya 21120, Sri Lanka',
      website: 'www.ceylonheritagesigiriya.com',
      checkInTime: '15:00',
      checkOutTime: '12:00',
      description: 'Luxury eco-resort with spectacular views of Sigiriya Rock. Ancient kingdom setting with modern amenities and cultural experiences.',
      images: [],
      amenities: ['Rock Views', 'Eco Resort', 'Cultural Tours', 'Spa', 'Nature Walks', 'Ancient Sites'],
      languages: ['English', 'Sinhala', 'Tamil', 'Japanese', 'Chinese'],
      starRating: 5,
      established: '2010',
      heritage: 'Ancient Kingdom Setting',
      specialties: ['Sigiriya Rock Views', 'Cultural Heritage', 'Eco Tourism']
    },
    "Ceylon Heritage Bentota Beach": {
      name: 'Ceylon Heritage Bentota Beach',
      email: 'bentota@ceylonheritage.lk',
      phone: '+94 34 227 5600',
      address: 'Bentota Beach, Bentota 80500, Sri Lanka',
      website: 'www.ceylonheritagebentota.com',
      checkInTime: '15:00',
      checkOutTime: '12:00',
      description: 'Beachfront paradise combining Ceylon hospitality with tropical luxury. Private beach access with water sports and romantic dining experiences.',
      images: [],
      amenities: ['Private Beach', 'Water Sports', 'Infinity Pool', 'Spa', 'Romantic Dining', 'Honeymoon Suites'],
      languages: ['English', 'Sinhala', 'Tamil', 'German', 'Russian'],
      starRating: 5,
      established: '1995',
      heritage: 'Tropical Beach Heritage',
      specialties: ['Private Beach', 'Honeymoon Packages', 'Water Sports']
    }
  };

  const [hotelInfo, setHotelInfo] = useState(branchSettings[selectedBranch]);

  useEffect(() => {
    setHotelInfo(branchSettings[selectedBranch]);
  }, [selectedBranch]);

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
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Header Section - Hotel Chain Settings */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ceylon Heritage Hotels</h1>
            <p className="text-gray-600">Property Management & Configuration Center for Sri Lanka's premier heritage hotel chain. Manage settings across all properties.</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">6 Properties Active</span>
              <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Heritage Configuration</span>
              <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">Multi-Property Settings</span>
            </div>
          </div>
          <div className="mt-4 lg:mt-0 text-right">
            <p className="text-sm text-gray-500">Current Time (Sri Lanka)</p>
            <p className="text-lg font-semibold text-orange-600">{currentDate} at {currentTime}</p>
            <p className="text-sm text-gray-500 mt-1">Configuration Management Center</p>
          </div>
        </div>

        {/* Settings Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-3" />
              <div>
                <p className="text-green-800 font-semibold">All Properties Synchronized</p>
                <p className="text-green-600 text-sm">Configuration changes applied across Ceylon Heritage chain</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex items-center">
              <FaShieldAlt className="text-blue-500 mr-3" />
              <div>
                <p className="text-blue-800 font-semibold">Security Settings Updated</p>
                <p className="text-blue-600 text-sm">Heritage property security protocols active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Settings Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnhancedStatsCard
            icon={<FaCog className="text-blue-500" />}
            title="Active Properties"
            value="6"
            subtitle="Ceylon Heritage locations"
            change="All systems operational"
            changeType="positive"
            bgColor="bg-blue-50"
          />
          <EnhancedStatsCard
            icon={<FaHistory className="text-green-500" />}
            title="Last Sync"
            value="2 min ago"
            subtitle="Chain-wide configuration"
            change="Real-time updates"
            changeType="positive"
            bgColor="bg-green-50"
          />
          <EnhancedStatsCard
            icon={<FaShieldAlt className="text-purple-500" />}
            title="Security Level"
            value="Enhanced"
            subtitle="VIP protocol ready"
            change="Government grade"
            changeType="positive"
            bgColor="bg-purple-50"
          />
          <EnhancedStatsCard
            icon={<FaStar className="text-orange-500" />}
            title="Heritage Status"
            value="Premium"
            subtitle="UNESCO recognized sites"
            change="Cultural authentication"
            changeType="positive"
            bgColor="bg-orange-50"
          />
        </div>

        {/* Property Selection */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-1 flex items-center">
                <FaCog className="mr-2 text-amber-600" />
                Select Ceylon Heritage Property
              </h2>
              <p className="text-sm text-gray-600">Configure settings for specific heritage property</p>
            </div>
            <select
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setHotelInfo(branchSettings[e.target.value]);
              }}
              className="w-80 p-3 border rounded-lg text-lg font-medium"
            >
              {ceylonHeritageProperties.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FaUser className="mr-2 text-amber-600" />
                Heritage Property Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Property Name</label>
                  <div className="relative">
                    <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={hotelInfo.name}
                      onChange={(e) => handleInfoChange('name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter heritage property name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="email"
                        value={hotelInfo.email}
                        onChange={(e) => handleInfoChange('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="reservations@ceylonheritage.lk"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Phone Number</label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="tel"
                        value={hotelInfo.phone}
                        onChange={(e) => handleInfoChange('phone', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="+94 XX XXX XXXX"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Property Address</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      value={hotelInfo.address}
                      onChange={(e) => handleInfoChange('address', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      rows="2"
                      placeholder="Complete address in Sri Lanka"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Website URL</label>
                  <div className="relative">
                    <FaGlobe className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="url"
                      value={hotelInfo.website}
                      onChange={(e) => handleInfoChange('website', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="www.ceylonheritage.com"
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

            {/* Heritage Property Description */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FaStar className="mr-2 text-amber-600" />
                Heritage Property Description
              </h2>
              <textarea
                value={hotelInfo.description}
                onChange={(e) => handleInfoChange('description', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                rows="4"
                placeholder="Describe the heritage significance, architecture, and unique features of this Ceylon Heritage property..."
              />
            </div>

            {/* Operational Settings */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FaClock className="mr-2 text-amber-600" />
                Operational Configuration
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Check-in Time</label>
                  <div className="relative">
                    <FaClock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="time"
                      value={hotelInfo.checkInTime}
                      onChange={(e) => handleInfoChange('checkInTime', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Standard Ceylon Heritage check-in time</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Check-out Time</label>
                  <div className="relative">
                    <FaClock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="time"
                      value={hotelInfo.checkOutTime}
                      onChange={(e) => handleInfoChange('checkOutTime', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Standard Ceylon Heritage check-out time</p>
                </div>
              </div>
            </div>

            {/* Heritage Amenities */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FaConciergeBell className="mr-2 text-amber-600" />
                Heritage Amenities & Services
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {hotelInfo.amenities && hotelInfo.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center bg-amber-50 p-3 rounded-lg">
                    <FaCheckCircle className="text-amber-600 mr-2" />
                    <span className="text-sm font-medium text-amber-800">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Heritage Settings Sidebar (1/3 width) */}
          <div className="space-y-6">
            {/* Property Heritage Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaStar className="mr-2 text-amber-600" />
                Heritage Details
              </h3>
              <div className="space-y-4 text-sm">
                <div className="bg-amber-50 p-3 rounded">
                  <p className="font-semibold text-amber-800">Star Rating</p>
                  <div className="flex items-center mt-1">
                    {[...Array(hotelInfo.starRating || 5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 mr-1" />
                    ))}
                    <span className="ml-2 text-amber-700">{hotelInfo.starRating || 5} Star Heritage Property</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-blue-800">Established</p>
                  <p className="text-blue-700 mt-1">{hotelInfo.established || 'Historic Property'}</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold text-green-800">Heritage Type</p>
                  <p className="text-green-700 mt-1">{hotelInfo.heritage || 'Ceylon Heritage Architecture'}</p>
                </div>
              </div>
            </div>

            {/* Property Images */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaImage className="mr-2 text-amber-600" />
                Heritage Property Images
              </h3>
              <ImageUploader
                images={hotelInfo.images}
                onChange={(images) => handleInfoChange('images', images)}
                maxImages={8}
              />
              <p className="text-sm text-gray-500 mt-2">
                Upload heritage property images. Recommended: 1920x1080 pixels. Showcase architecture, rooms, and cultural features.
              </p>
            </div>

            {/* Language Support */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaLanguage className="mr-2 text-amber-600" />
                Language Support
              </h3>
              <div className="space-y-2">
                {hotelInfo.languages && hotelInfo.languages.map((language, index) => (
                  <div key={index} className="flex items-center bg-blue-50 p-2 rounded">
                    <FaCheckCircle className="text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-800">{language}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Specialties */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaConciergeBell className="mr-2 text-amber-600" />
                Heritage Specialties
              </h3>
              <div className="space-y-2">
                {hotelInfo.specialties && hotelInfo.specialties.map((specialty, index) => (
                  <div key={index} className="flex items-center bg-orange-50 p-2 rounded">
                    <FaStar className="text-orange-600 mr-2" />
                    <span className="text-sm font-medium text-orange-800">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuration Status */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaCheckCircle className="mr-2 text-amber-600" />
                Configuration Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Property Information</span>
                  <FaCheckCircle className="text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Heritage Details</span>
                  <FaCheckCircle className="text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Amenities Configured</span>
                  <FaCheckCircle className="text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Security Settings</span>
                  <FaCheckCircle className="text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Chain Synchronization</span>
                  <FaCheckCircle className="text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Configuration Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Save Configuration Changes</h3>
              <p className="text-sm text-gray-600">Apply settings to {selectedBranch} and synchronize with Ceylon Heritage chain</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => console.log('Saving draft...')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <FaHistory className="mr-2" />
                Save Draft
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center font-medium"
              >
                <FaSave className="mr-2" />
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </HotelLayout>
  );
}
