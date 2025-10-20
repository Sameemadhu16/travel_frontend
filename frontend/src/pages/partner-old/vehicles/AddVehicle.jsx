import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import PartnerLayout from '../../../components/partner/PartnerLayout';
import { registerVehicle } from '../../../api/vehicleService';
import { registerDriver } from '../../../api/driverService';
import { getVehicleAgencyByUserDocId } from '../../../api/vehicleAgencyService';
import { getUserByDocId } from '../../../api/userService';

export default function AddVehicle() {
  const [loading, setLoading] = useState(false);
  const [userDocId, setUserDocId] = useState('');
  const [agencyData, setAgencyData] = useState(null);
  const [addDriver, setAddDriver] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  
  const [vehicleData, setVehicleData] = useState({
    vehicleType: '',
    vehicleNo: '',
    registrationNo: '',
    pricePerKilometer: '',
    basePrice: '',
    insuranceNumber: '',
    insuranceExpiryDate: '',
    vehicleModel: '',
    capacity: '',
    amenities: [],
    availability: true,
    isVerified: false
  });

  const [driverData, setDriverData] = useState({
    age: '',
    experience: '',
    driverLicenseNumber: '',
    driverLicensePhoto: '',
    licenseExpiryDate: ''
  });
  
  const [licensePhotoFile, setLicensePhotoFile] = useState(null);
  const [licensePhotoPreview, setLicensePhotoPreview] = useState('');

  // Fetch user and agency data on component mount
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    if (currentUser) {
      setUserDocId(currentUser.uid);
      fetchAgencyData(currentUser.uid);
    }
  }, []);

  const fetchAgencyData = async (docId) => {
    try {
      const agency = await getVehicleAgencyByUserDocId(docId);
      if (agency) {
        setAgencyData(agency);
      } else {
        toast.error('Please register as a vehicle agency first');
      }
    } catch (error) {
      console.error('Error fetching agency:', error);
      toast.error('Failed to fetch agency information');
    }
  };

  const handleVehicleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVehicleData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDriverChange = (e) => {
    const { name, value } = e.target;
    setDriverData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setVehicleData(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev.amenities, value]
        : prev.amenities.filter(a => a !== value)
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length < 5 || files.length > 10) {
      toast.error('Please upload between 5 to 10 images');
      return;
    }

    setImageFiles(files);

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleLicensePhotoChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('License photo must be less than 5MB');
      return;
    }

    setLicensePhotoFile(file);
    setLicensePhotoPreview(URL.createObjectURL(file));
  };

  const uploadImagesToCloudinary = async (files) => {
    const uploadedUrls = [];
    
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'travel_app'); // Replace with your Cloudinary upload preset
      formData.append('cloud_name', 'your_cloud_name'); // Replace with your Cloudinary cloud name

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
          method: 'POST',
          body: formData
        });
        
        const data = await response.json();
        uploadedUrls.push(data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agencyData) {
      toast.error('Agency information not found');
      return;
    }

    if (imageFiles.length < 5 || imageFiles.length > 10) {
      toast.error('Please upload between 5 to 10 vehicle images');
      return;
    }

    if (addDriver && !licensePhotoFile) {
      toast.error('Please upload driver license photo');
      return;
    }

    setLoading(true);

    try {
      // Upload images to Cloudinary
      toast.loading('Uploading images...');
      const imageUrls = await uploadImagesToCloudinary(imageFiles);
      toast.dismiss();

      // Prepare vehicle data
      const vehiclePayload = {
        ...vehicleData,
        images: imageUrls,
        agency: {
          id: agencyData.id
        }
      };

      // Register vehicle
      toast.loading('Registering vehicle...');
      const savedVehicle = await registerVehicle(vehiclePayload);
      toast.dismiss();
      toast.success('Vehicle registered successfully!');

      // If add driver is enabled, register driver
      if (addDriver) {
        try {
          // Upload driver license photo to Cloudinary
          toast.loading('Uploading driver license photo...');
          const licensePhotoUrl = await uploadImagesToCloudinary([licensePhotoFile]);
          toast.dismiss();

          // Get user data
          const userData = await getUserByDocId(userDocId);
          
          const driverPayload = {
            ...driverData,
            driverLicensePhoto: licensePhotoUrl[0], // Use the uploaded photo URL
            user: {
              id: userData.id
            },
            agency: {
              id: agencyData.id
            }
          };

          toast.loading('Registering driver...');
          await registerDriver(driverPayload);
          toast.dismiss();
          toast.success('Driver registered successfully!');
        } catch (driverError) {
          console.error('Error registering driver:', driverError);
          toast.error('Vehicle added but driver registration failed');
        }
      }

      // Reset form
      setVehicleData({
        vehicleType: '',
        vehicleNo: '',
        registrationNo: '',
        pricePerKilometer: '',
        basePrice: '',
        insuranceNumber: '',
        insuranceExpiryDate: '',
        vehicleModel: '',
        capacity: '',
        amenities: [],
        availability: true,
        isVerified: false
      });
      setDriverData({
        age: '',
        experience: '',
        driverLicenseNumber: '',
        driverLicensePhoto: '',
        licenseExpiryDate: ''
      });
      setImageFiles([]);
      setImagePreviews([]);
      setLicensePhotoFile(null);
      setLicensePhotoPreview('');
      setAddDriver(false);

      // Redirect after delay
      setTimeout(() => {
        window.location.href = '/partner/vehicles';
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data || 'Failed to add vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PartnerLayout activePage="my vehicles">
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Add New Vehicle</h2>
          <p className="text-gray-600 text-sm mt-1">Fill in the details below to add a new vehicle to your fleet</p>
        </div>

        {/* Agency Information Display */}
        {agencyData && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <i className="fas fa-building text-blue-600 text-xl"></i>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-1">Agency Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-blue-700 font-medium">Agency Name:</span>{' '}
                    <span className="text-blue-900">{agencyData.agencyName}</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Agency ID:</span>{' '}
                    <span className="text-blue-900">#{agencyData.id}</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Registration:</span>{' '}
                    <span className="text-blue-900">{agencyData.registrationNumber}</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Status:</span>{' '}
                    <span className={`font-semibold ${agencyData.isVerified ? 'text-green-600' : 'text-orange-600'}`}>
                      {agencyData.isVerified ? '✓ Verified' : '⏳ Pending Verification'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!agencyData && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <i className="fas fa-exclamation-triangle text-yellow-600 text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">Agency Not Found</h3>
                <p className="text-sm text-yellow-800">
                  Please register as a vehicle agency before adding vehicles.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vehicle Information Section */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-4">Vehicle Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vehicle Model */}
              <div>
                <label className="block text-sm mb-2">
                  Vehicle Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleModel"
                  value={vehicleData.vehicleModel}
                  onChange={handleVehicleChange}
                  placeholder="e.g. Toyota Prius 2023"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              {/* Vehicle Type */}
              <div>
                <label className="block text-sm mb-2">
                  Vehicle Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="vehicleType"
                  value={vehicleData.vehicleType}
                  onChange={handleVehicleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                  required
                >
                  <option value="">Select vehicle type</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Van">Van</option>
                  <option value="Bus">Bus</option>
                  <option value="Car">Car</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

              {/* Vehicle Number */}
              <div>
                <label className="block text-sm mb-2">
                  Vehicle Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleNo"
                  value={vehicleData.vehicleNo}
                  onChange={handleVehicleChange}
                  placeholder="ABC-1234"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              {/* Registration Number */}
              <div>
                <label className="block text-sm mb-2">
                  Registration Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="registrationNo"
                  value={vehicleData.registrationNo}
                  onChange={handleVehicleChange}
                  placeholder="REG-5678"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              {/* Capacity */}
              <div>
                <label className="block text-sm mb-2">
                  Number of Seats <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={vehicleData.capacity}
                  onChange={handleVehicleChange}
                  placeholder="5"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              {/* Base Price */}
              <div>
                <label className="block text-sm mb-2">
                  Base Price (LKR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="basePrice"
                  value={vehicleData.basePrice}
                  onChange={handleVehicleChange}
                  placeholder="5000"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              {/* Price Per Kilometer */}
              <div>
                <label className="block text-sm mb-2">
                  Price per Kilometer (LKR)
                </label>
                <input
                  type="text"
                  name="pricePerKilometer"
                  value={vehicleData.pricePerKilometer}
                  onChange={handleVehicleChange}
                  placeholder="50"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Insurance Number */}
              <div>
                <label className="block text-sm mb-2">
                  Insurance Number
                </label>
                <input
                  type="text"
                  name="insuranceNumber"
                  value={vehicleData.insuranceNumber}
                  onChange={handleVehicleChange}
                  placeholder="INS-123456"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Insurance Expiry */}
              <div>
                <label className="block text-sm mb-2">
                  Insurance Expiry Date
                </label>
                <input
                  type="date"
                  name="insuranceExpiryDate"
                  value={vehicleData.insuranceExpiryDate}
                  onChange={handleVehicleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['AC', 'WiFi', 'GPS', 'Music System', 'Bluetooth', 'USB Charging', 'Child Seat', 'Pet Friendly'].map(amenity => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={amenity}
                    checked={vehicleData.amenities.includes(amenity)}
                    onChange={handleAmenityChange}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Vehicle Images */}
          <div>
            <label className="block text-sm mb-2">
              Vehicle Images <span className="text-red-500">* (5 to 10 images required)</span>
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-3">
                  <i className="fas fa-cloud-upload-alt text-gray-400 text-4xl"></i>
                </div>
                <p className="text-sm text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
                <p className="text-xs text-gray-400 mb-3">Supports JPG, PNG, WebP (Max 5MB each)</p>
                <input 
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="vehicle-images"
                  required
                />
                <label
                  htmlFor="vehicle-images"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 cursor-pointer"
                >
                  Choose Images
                </label>
                {imageFiles.length > 0 && (
                  <p className="text-sm text-green-600 mt-3">
                    {imageFiles.length} image(s) selected
                  </p>
                )}
              </div>
              
              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Driver Section */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Add Driver (Optional)</h3>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addDriver}
                  onChange={(e) => setAddDriver(e.target.checked)}
                  className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-sm">Include driver with this vehicle</span>
              </label>
            </div>

            {addDriver && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                {/* Age */}
                <div>
                  <label className="block text-sm mb-2">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={driverData.age}
                    onChange={handleDriverChange}
                    placeholder="30"
                    min="18"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                    required={addDriver}
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm mb-2">
                    Experience (years) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={driverData.experience}
                    onChange={handleDriverChange}
                    placeholder="5"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                    required={addDriver}
                  />
                </div>

                {/* License Number */}
                <div>
                  <label className="block text-sm mb-2">
                    Driver License Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="driverLicenseNumber"
                    value={driverData.driverLicenseNumber}
                    onChange={handleDriverChange}
                    placeholder="B1234567"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                    required={addDriver}
                  />
                </div>

                {/* License Expiry */}
                <div>
                  <label className="block text-sm mb-2">
                    License Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="licenseExpiryDate"
                    value={driverData.licenseExpiryDate}
                    onChange={handleDriverChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                    required={addDriver}
                  />
                </div>

                {/* License Photo Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm mb-2">
                    Driver License Photo <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={handleLicensePhotoChange}
                        className="hidden"
                        id="license-photo"
                        required={addDriver}
                      />
                      <label
                        htmlFor="license-photo"
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 cursor-pointer text-sm"
                      >
                        Choose Photo
                      </label>
                      {licensePhotoFile && (
                        <span className="text-sm text-green-600">
                          {licensePhotoFile.name}
                        </span>
                      )}
                    </div>
                    {licensePhotoPreview && (
                      <div className="mt-3">
                        <img
                          src={licensePhotoPreview}
                          alt="License Preview"
                          className="w-40 h-24 object-cover rounded border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Upload a clear photo of the driver&apos;s license (JPG, PNG, WebP - Max 5MB)</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </PartnerLayout>
  );
}
