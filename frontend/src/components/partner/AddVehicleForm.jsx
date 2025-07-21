import React, { useState } from 'react';

export default function AddVehicleForm({ onClose }) {
  const [formData, setFormData] = useState({
    vehicleName: '',
    vehicleType: '',
    registrationNumber: '',
    numberOfSeats: '',
    pricePerDay: '',
    vehicleImage: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement save functionality
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[550px]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl">Add New Vehicle</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Vehicle Name */}
          <div className="mb-4">
            <label className="block text-sm mb-2">
              Vehicle Name
            </label>
            <input
              type="text"
              placeholder="e.g. Toyota Prius 2023"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              value={formData.vehicleName}
              onChange={(e) => setFormData({...formData, vehicleName: e.target.value})}
            />
          </div>

          {/* Vehicle Type */}
          <div className="mb-4">
            <label className="block text-sm mb-2">
              Vehicle Type
            </label>
            <select
              value={formData.vehicleType}
              onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
            >
              <option value="">Select vehicle type</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
              <option value="Bus">Bus</option>
              <option value="Car">Car</option>
            </select>
          </div>

          {/* Registration Number */}
          <div className="mb-4">
            <label className="block text-sm mb-2">
              Registration Number
            </label>
            <input
              type="text"
              placeholder="ABC-1234"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              value={formData.registrationNumber}
              onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
            />
          </div>

          {/* Number of Seats */}
          <div className="mb-4">
            <label className="block text-sm mb-2">
              Number of Seats
            </label>
            <input
              type="number"
              placeholder="5"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              value={formData.numberOfSeats}
              onChange={(e) => setFormData({...formData, numberOfSeats: e.target.value})}
            />
          </div>

          {/* Price per Day */}
          <div className="mb-4">
            <label className="block text-sm mb-2">
              Price per Day
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">LKR</span>
              <input
                type="number"
                placeholder="5000"
                className="w-full px-3 py-2 pl-12 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                value={formData.pricePerDay}
                onChange={(e) => setFormData({...formData, pricePerDay: e.target.value})}
              />
            </div>
          </div>

          {/* Vehicle Image */}
          <div className="mb-6">
            <label className="block text-sm mb-2">
              Vehicle Image (Upload 5 to 10 images)
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
              <div className="flex flex-col items-center justify-center py-5">
                <div className="mb-3">
                  <i className="fas fa-cloud-upload-alt text-gray-400 text-4xl"></i>
                </div>
                <p className="text-sm text-gray-500">Drag and drop an image here, or click to browse</p>
                <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, WebP (Max 5MB)</p>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => setFormData({...formData, vehicleImage: e.target.files[0]})}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Save Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
