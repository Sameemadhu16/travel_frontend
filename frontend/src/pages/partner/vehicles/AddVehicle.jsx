import React from 'react';
import PartnerLayout from '../../../components/partner/PartnerLayout';

export default function AddVehicle() {
  return (
    <PartnerLayout activePage="my vehicles">
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Add New Vehicle</h2>
          <p className="text-gray-600 text-sm mt-1">Fill in the details below to add a new vehicle to your fleet</p>
        </div>

        <form className="space-y-6">
          {/* Vehicle Name */}
          <div>
            <label className="block text-sm mb-2">
              Vehicle Name
            </label>
            <input
              type="text"
              placeholder="e.g. Toyota Prius 2023"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-sm mb-2">
              Vehicle Type
            </label>
            <select
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
          <div>
            <label className="block text-sm mb-2">
              Registration Number
            </label>
            <input
              type="text"
              placeholder="ABC-1234"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Number of Seats */}
          <div>
            <label className="block text-sm mb-2">
              Number of Seats
            </label>
            <input
              type="number"
              placeholder="5"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Price per Day */}
          <div>
            <label className="block text-sm mb-2">
              Price per Day
              <span className="ml-1 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                <i className="fas fa-info-circle mr-1"></i>
                Daily rental rate
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">LKR</span>
              <input
                type="number"
                placeholder="5000"
                className="w-full px-3 py-2 pl-12 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Vehicle Image */}
          <div>
            <label className="block text-sm mb-2">
              Vehicle Image (Upload 5 to 10 images)
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-3">
                  <i className="fas fa-cloud-upload-alt text-gray-400 text-4xl"></i>
                </div>
                <p className="text-sm text-gray-600">Drag and drop an image here, or click to browse</p>
                <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, WebP (Max 5MB)</p>
                <input 
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Save Vehicle
            </button>
          </div>
        </form>
      </div>
    </PartnerLayout>
  );
}
