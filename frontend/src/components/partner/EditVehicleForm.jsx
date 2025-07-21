import React, { useState } from 'react';

export default function EditVehicleForm({ vehicle, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    vehicleName: 'Toyota Prius Hybrid',
    vehicleType: 'Sedan',
    registrationNumber: 'CAB-1234',
    numberOfSeats: '5',
    pricePerDay: '8500',
    vehicleImage: null
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        vehicleImage: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[550px]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl">Edit Vehicle</h2>
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
              value={formData.vehicleName}
              onChange={(e) => handleChange('vehicleName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Vehicle Type */}
          <div className="mb-4">
            <label className="block text-sm mb-2">
              Vehicle Type
            </label>
            <select
              value={formData.vehicleType}
              onChange={(e) => handleChange('vehicleType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
            >
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
              <option value="Bus">Bus</option>
            </select>
          </div>

          {/* Registration Number */}
          <div className="mb-4">
            <label className="block text-sm mb-2">
              Registration Number
            </label>
            <input
              type="text"
              value={formData.registrationNumber}
              onChange={(e) => handleChange('registrationNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Number of Seats */}
          <div className="mb-4">
            <label className="block text-sm mb-2">
              Number of Seats
            </label>
            <input
              type="text"
              value={formData.numberOfSeats}
              onChange={(e) => handleChange('numberOfSeats', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
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
                type="text"
                value={formData.pricePerDay}
                onChange={(e) => handleChange('pricePerDay', e.target.value)}
                className="w-full px-3 py-2 pl-12 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Vehicle Image */}
          <div className="mb-6">
            <label className="block text-sm mb-2">
              Vehicle Image
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
              <div className="flex flex-col items-center justify-center py-5">
                {formData.vehicleImage ? (
                  <div className="relative">
                    <img
                      src={typeof formData.vehicleImage === 'string' 
                        ? formData.vehicleImage 
                        : URL.createObjectURL(formData.vehicleImage)}
                      alt="Vehicle preview"
                      className="w-32 h-32 object-cover rounded-lg mb-4"
                    />
                    <button
                      type="button"
                      onClick={() => handleChange('vehicleImage', null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <>
                    <i className="fas fa-cloud-upload-alt text-gray-400 text-3xl"></i>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-orange-500 hover:text-orange-400">
                        <span>Click to upload new image</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </>
                )}
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
              Update Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
