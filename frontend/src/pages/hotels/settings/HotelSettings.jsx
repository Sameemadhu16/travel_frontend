import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaClock, FaImage } from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';
import ImageUploader from '../../../components/ImageUploader';

export default function HotelSettings() {
  const branches = [
    "Cinnamon Grand Colombo",
    "Cinnamon Red Colombo",
    "Cinnamon Lakeside",
    "Cinnamon Wild Yala",
    "Cinnamon Bentota Beach",
    "Trinco Blu by Cinnamon"
  ];

  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  const branchSettings = {
    "Cinnamon Grand Colombo": {
      name: 'Cinnamon Grand Colombo',
      email: 'info@cinnamongrand.lk',
      phone: '+94 11 234 5678',
      address: '77 Galle Road, Colombo 3, Sri Lanka',
      website: 'www.cinnamongrand.com',
      checkInTime: '14:00',
      checkOutTime: '12:00',
      description: 'Experience luxury in the heart of Colombo with world-class amenities and exceptional service.',
      images: []
    },
    "Cinnamon Red Colombo": {
      name: 'Cinnamon Red Colombo',
      email: 'info@cinnamonred.lk',
      phone: '+94 11 345 6789',
      address: '59 Ananda Coomaraswamy Mawatha, Colombo 3',
      website: 'www.cinnamonred.com',
      checkInTime: '14:00',
      checkOutTime: '12:00',
      description: 'Urban lifestyle hotel in the heart of Colombo.',
      images: []
    },
    // Add other branches with default settings
  };

  const [hotelInfo, setHotelInfo] = useState(branchSettings[selectedBranch]);

  const handleInfoChange = (field, value) => {
    setHotelInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Update the branch settings
    branchSettings[selectedBranch] = hotelInfo;
    console.log('Saving hotel settings for branch:', selectedBranch, hotelInfo);
    
    // TODO: Send to backend API
    // Show success message
    alert('Settings saved successfully for ' + selectedBranch);
  };

  return (
    <HotelLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Hotel Settings</h1>
          <p className="text-gray-600">Manage your hotel information and preferences</p>
        </div>

        {/* Branch Selection */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-1">Select Branch</h2>
              <p className="text-sm text-gray-600">Configure settings for specific branch</p>
            </div>
            <select
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setHotelInfo(branchSettings[e.target.value]);
              }}
              className="w-64 p-2 border rounded-lg"
            >
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Hotel Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={hotelInfo.name}
                      onChange={(e) => handleInfoChange('name', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      placeholder="Enter hotel name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      value={hotelInfo.email}
                      onChange={(e) => handleInfoChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      value={hotelInfo.phone}
                      onChange={(e) => handleInfoChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      value={hotelInfo.address}
                      onChange={(e) => handleInfoChange('address', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      rows="2"
                      placeholder="Enter hotel address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Website</label>
                  <div className="relative">
                    <FaGlobe className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="url"
                      value={hotelInfo.website}
                      onChange={(e) => handleInfoChange('website', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      placeholder="Enter website URL"
                    />
                  </div>
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
              <h2 className="text-lg font-semibold mb-4">Hotel Images</h2>
              <ImageUploader
                images={hotelInfo.images}
                onChange={(images) => handleInfoChange('images', images)}
                maxImages={5}
              />
              <p className="text-sm text-gray-500 mt-2">
                Upload up to 5 images. Recommended size: 1200x800 pixels
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Settings Status</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Basic information complete</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">Images need updating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90"
          >
            Save Changes
          </button>
        </div>
      </div>
    </HotelLayout>
  );
}
