import React, { useState } from 'react';
import { Camera, Upload, Plus, Edit, Check, X } from 'lucide-react';
import Main from '../../components/Main';

// This component is designed to be used inside your Main component
// Usage: <Main><TourGuideProfile /></Main>

export default function TourGuideProfile() {
  const [languages, setLanguages] = useState(['English', 'Sinhala', 'Tamil']);
  const [newLanguage, setNewLanguage] = useState('');
  const [showLanguageInput, setShowLanguageInput] = useState(false);

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage('');
      setShowLanguageInput(false);
    }
  };

  const handleRemoveLanguage = (langToRemove) => {
    setLanguages(languages.filter(lang => lang !== langToRemove));
  };

  return (
    <Main>
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
              alt="John Anderson" 
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
              <Check className="w-3 h-3" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">John Anderson</h1>
            <p className="text-sm text-gray-600">Professional Tour Guide</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium">Verified</span>
              </div>
              <span className="text-xs text-gray-500">Member since 2021</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Panel - Personal Information */}
        <div className="w-1/2 p-6 border-r border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            <Edit className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                value="John Anderson"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                readOnly
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                value="john.anderson@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                readOnly
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                value="+94 77 123 4567"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                readOnly
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input 
                type="text" 
                value="Colombo, Sri Lanka"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                readOnly
              />
            </div>

            {/* Languages Spoken */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Languages Spoken</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {languages.map((lang, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {lang}
                    <button
                      onClick={() => handleRemoveLanguage(lang)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              {showLanguageInput ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Add new language"
                    className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddLanguage()}
                  />
                  <button
                    onClick={handleAddLanguage}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLanguageInput(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Add new language
                </button>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea 
                rows={4}
                value="Experienced tour guide with 8+ years in Sri Lankan tourism. Specialized in cultural heritage sites, wildlife tours, and adventure travel. Passionate about sharing Sri Lanka's rich history and natural beauty with visitors from around the world."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Certifications & Photos */}
        <div className="w-1/2 p-6">
          {/* Certifications & Documents */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Certifications & Documents</h2>
            
            <div className="space-y-4">
              {/* SLTDA License */}
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">SLTDA License</h3>
                  <p className="text-sm text-gray-600">Expires: Dec 31, 2025</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Verified</span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* First Aid Certificate */}
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">First Aid Certificate</h3>
                  <p className="text-sm text-gray-600">Expires: Dec 2024</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add New Certificate */}
              <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                <Plus className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm">Add New Certificate</span>
              </button>
            </div>
          </div>

          {/* Photo Gallery */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Photo Gallery</h2>
              <button className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add Photos</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {/* Photo 1 */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop"
                  alt="Tour photo 1"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Photo 2 */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=200&h=200&fit=crop"
                  alt="Tour photo 2"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Photo 3 */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop"
                  alt="Tour photo 3"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Add Photo Placeholder */}
              <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Main>
  );
}