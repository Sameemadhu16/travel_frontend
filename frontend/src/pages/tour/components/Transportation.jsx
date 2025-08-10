import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContext from '../../../context/InitialValues';

export default function Transportation() {
    const navigate = useNavigate();
    const { formData, setFormData } = useContext(FormContext);
    const [showLicenseModal, setShowLicenseModal] = useState(false);
    const [licenseData, setLicenseData] = useState({
        licenseNumber: '',
        expiryDate: ''
    });

    // Initialize license data from existing vehicle selection
    useEffect(() => {
        const vehicle = formData?.selectedItems?.selectedVehicle;
        if (vehicle?.licenseData) {
            setLicenseData({
                licenseNumber: vehicle.licenseData.licenseNumber || '',
                expiryDate: vehicle.licenseData.expiryDate || ''
            });
        }
    }, [formData?.selectedItems?.selectedVehicle]);

    // Safety check
    if (!formData?.selectedItems || !formData?.travelDetails) {
        return (
            <div className="bg-white rounded-lg border border-brand-primary p-6">
                <h2 className="text-lg font-semibold text-content-primary mb-4">Transportation</h2>
                <p className="text-content-secondary">Loading transportation information...</p>
            </div>
        );
    }

    const travelDetails = formData.travelDetails;    
    const selectedItems = formData.selectedItems;
    // Get selected vehicles and transportation
    const getTransportationDetails = () => {
        const transportation = [];
        
        // Add selected vehicles (legacy array)
        if (selectedItems.vehicles && selectedItems.vehicles.length > 0) {
            selectedItems.vehicles.forEach(vehicle => {
                transportation.push({
                    id: vehicle.id,
                    name: vehicle.name,
                    type: vehicle.type,
                    capacity: vehicle.capacity || vehicle.seats,
                    price: vehicle.price,
                    features: vehicle.features || vehicle.amenities,
                    driver: vehicle.driverIncluded,
                    fuelType: vehicle.fuelType,
                    image: vehicle.image || vehicle.images?.[0],
                    pricePerKm: vehicle.pricePerKm,
                    tripCostData: vehicle.tripCostData
                });
            });
        }
        
        // Add selected vehicle (single selection - current implementation)
        if (
            selectedItems.selectedVehicle &&
            Object.keys(selectedItems.selectedVehicle).length > 0 &&
            selectedItems.selectedVehicle.id
        ) {
            const vehicle = selectedItems.selectedVehicle;
            transportation.push({
                id: vehicle.id,
                name: vehicle.name,
                brand: vehicle.brand,
                model: vehicle.model,
                type: vehicle.type,
                capacity: vehicle.seats,
                price: vehicle.pricePerDay,
                basePrice: vehicle.basePrice,
                features: vehicle.amenities,
                driver: vehicle.driverIncluded,
                driverFee: vehicle.driverFee,
                fuelType: vehicle.fuelType,
                transmission: vehicle.transmission,
                image: vehicle.images?.[0],
                pricePerKm: vehicle.pricePerKm,
                tripCostData: vehicle.tripCostData,
                licenseData: vehicle.licenseData,
                rating: vehicle.rating,
                reviews: vehicle.reviews,
                rentalAgency: vehicle.rentalAgency,
                location: vehicle.location
            });
        }
        
        return transportation;
    };
    // Calculate total days based on duration
    const calculateDays = () => {
        if (travelDetails.duration) {
            const match = travelDetails.duration.match(/(\d+)/);
            return match ? parseInt(match[1]) : 1;
        }
        return 1;
    };

    const handleEdit = () => {
        navigate('/tour/select-vehicle');
    };

    // Function to update license information
    const handleLicenseSubmit = () => {
        if (licenseData.licenseNumber && licenseData.expiryDate) {
            setFormData(prev => {
                const newFormData = {
                    ...prev,
                    selectedItems: {
                        ...prev.selectedItems,
                        selectedVehicle: {
                            ...prev.selectedItems.selectedVehicle,
                            licenseData: {
                                licenseNumber: licenseData.licenseNumber,
                                expiryDate: licenseData.expiryDate
                            }
                        }
                    }
                };
                
                // Explicitly save to localStorage to ensure persistence
                localStorage.setItem('formData', JSON.stringify(newFormData));
                
                return newFormData;
            });
            setShowLicenseModal(false);
        }
    };

    const handleLicenseModalClose = () => {
        setShowLicenseModal(false);
        // Reset to original data
        const vehicle = formData?.selectedItems?.selectedVehicle;
        if (vehicle?.licenseData) {
            setLicenseData({
                licenseNumber: vehicle.licenseData.licenseNumber || '',
                expiryDate: vehicle.licenseData.expiryDate || ''
            });
        } else {
            setLicenseData({
                licenseNumber: '',
                expiryDate: ''
            });
        }
    };

    const transportationItems = getTransportationDetails();
    const totalDays = calculateDays();

    return (
        <>
            <div className="bg-white rounded-lg border border-brand-primary p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-content-primary">Transportation</h2>
                <button 
                    onClick={handleEdit}
                    className="text-brand-primary text-sm font-medium hover:underline flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Edit
                </button>
            </div>
            
            {transportationItems.length === 0 ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-content-tertiary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16v-6a1 1 0 00-1-1H4a1 1 0 00-1 1v6h1m0 0v1a2 2 0 002 2h2a2 2 0 002-2v-1m-6 0h6"/>
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-content-secondary mb-2">No Vehicle Selected</h3>
                    <p className="text-content-tertiary text-sm mb-4">Please select transportation for your tour</p>
                    <button 
                        onClick={handleEdit}
                        className="bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-secondary transition"
                    >
                        Select Vehicle
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {transportationItems.map((vehicle, index) => (
                        <div key={vehicle.id || index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-4 mb-4">
                                {vehicle.image && (
                                    <img 
                                        src={vehicle.image} 
                                        alt={vehicle.name}
                                        className="w-24 h-24 rounded-lg object-cover"
                                    />
                                )}
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-content-primary">
                                        {vehicle.brand ? `${vehicle.brand} ${vehicle.model}` : vehicle.name}
                                    </h3>
                                    <p className="text-content-secondary">{vehicle.type}</p>
                                    {vehicle.capacity && (
                                        <p className="text-sm text-content-tertiary">
                                            Seats: {vehicle.capacity} passengers
                                        </p>
                                    )}
                                    {vehicle.rating && (
                                        <div className="flex items-center gap-1 mt-1">
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                            </svg>
                                            <span className="text-sm font-medium">{vehicle.rating}</span>
                                            <span className="text-sm text-content-tertiary">({vehicle.reviews} reviews)</span>
                                        </div>
                                    )}
                                    {vehicle.rentalAgency && (
                                        <p className="text-sm text-brand-primary font-medium">{vehicle.rentalAgency}</p>
                                    )}
                                </div>
                                <div className="text-right">
                                    {vehicle.tripCostData ? (
                                        <div>
                                            <p className="text-xl font-bold text-brand-primary">
                                                LKR {vehicle.tripCostData.cost.totalCost.toLocaleString()}
                                            </p>
                                            <p className="text-sm text-content-secondary">Total Trip Cost</p>
                                            <div className="text-xs text-gray-500 mt-1">
                                                <div>Daily: LKR {vehicle.tripCostData.cost.breakdown.dailyCost.toLocaleString()}</div>
                                                <div>Distance: LKR {vehicle.tripCostData.cost.breakdown.distanceCost.toLocaleString()}</div>
                                                {(vehicle.driverFee || 0) > 0 && (
                                                    <div>Driver: LKR {(vehicle.driverFee || 0).toLocaleString()}</div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-xl font-bold text-brand-primary">
                                                LKR {((vehicle.price || 0) * totalDays).toLocaleString()}
                                            </p>
                                            <p className="text-sm text-content-secondary">
                                                LKR {(vehicle.price || 0).toLocaleString()} per day × {totalDays} days
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-content-secondary mb-1">Vehicle Type</h4>
                                    <p className="text-content-primary font-medium">{vehicle.type || 'Standard Vehicle'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-content-secondary mb-1">Driver</h4>
                                    <p className="text-content-primary font-medium">
                                        {vehicle.driver ? 'Professional Driver Included' : 'Self-Drive'}
                                    </p>
                                </div>
                                {vehicle.fuelType && (
                                    <div>
                                        <h4 className="text-sm font-medium text-content-secondary mb-1">Fuel Type</h4>
                                        <p className="text-content-primary font-medium">{vehicle.fuelType}</p>
                                    </div>
                                )}
                                {vehicle.transmission && (
                                    <div>
                                        <h4 className="text-sm font-medium text-content-secondary mb-1">Transmission</h4>
                                        <p className="text-content-primary font-medium">{vehicle.transmission}</p>
                                    </div>
                                )}
                            </div>

                            {/* Trip Distance Information */}
                            {vehicle.tripCostData && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <h4 className="text-sm font-medium text-content-secondary mb-2">Trip Details</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <span className="text-content-tertiary">Duration:</span>
                                            <span className="ml-2 font-medium">{vehicle.tripCostData.trip.numberOfDays} days</span>
                                        </div>
                                        <div>
                                            <span className="text-content-tertiary">Distance:</span>
                                            <span className="ml-2 font-medium">{Math.round(vehicle.tripCostData.distance.totalDistance)} km</span>
                                        </div>
                                        <div>
                                            <span className="text-content-tertiary">Rate per km:</span>
                                            <span className="ml-2 font-medium">LKR {vehicle.pricePerKm ? vehicle.pricePerKm.toLocaleString() : 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* License Information for Self-Drive */}
                            {!vehicle.driver && vehicle.licenseData && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-medium text-content-secondary">Driver License Information</h4>
                                        <button 
                                            onClick={() => setShowLicenseModal(true)}
                                            className="text-brand-primary text-xs hover:underline"
                                        >
                                            Update License
                                        </button>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                            <div className="flex flex-col">
                                                <span className="text-content-tertiary text-xs">License Number:</span>
                                                <span className="font-medium text-content-primary">{vehicle.licenseData.licenseNumber}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-content-tertiary text-xs">Expiry Date:</span>
                                                <span className="font-medium text-content-primary">{vehicle.licenseData.expiryDate}</span>
                                            </div>
                                        </div>
                                        <div className="mt-2 text-xs text-blue-700">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                                                </svg>
                                                Self-drive vehicle selected. Please ensure your license is valid for the travel dates.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Vehicle Features */}
                            {vehicle.features && vehicle.features.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <h4 className="text-sm font-medium text-content-secondary mb-2">Features & Amenities</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {vehicle.features.map((feature, featureIndex) => (
                                            <span 
                                                key={`feature-${feature}-${featureIndex}`}
                                                className="bg-surface-secondary text-content-primary px-3 py-1 rounded-full text-sm"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {/* Total Summary for multiple vehicles */}
                    {transportationItems.length > 1 && (
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-content-secondary">
                                    Total Transportation ({transportationItems.length} vehicle{transportationItems.length > 1 ? 's' : ''})
                                </span>
                                <span className="text-xl font-bold text-brand-primary">
                                    LKR {transportationItems.reduce((total, vehicle) => total + ((vehicle.price || 0) * totalDays), 0).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* License Update Modal */}
        {showLicenseModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-content-primary">
                            Update Driving License
                        </h3>
                        <button
                            onClick={handleLicenseModalClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <p className="text-sm text-content-secondary mb-4">
                        Update your driving license information for the self-drive vehicle.
                    </p>
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="licenseNumber" className="block text-sm font-medium text-content-primary mb-1">
                                License Number *
                            </label>
                            <input
                                id="licenseNumber"
                                type="text"
                                value={licenseData.licenseNumber}
                                onChange={(e) => setLicenseData(prev => ({
                                    ...prev,
                                    licenseNumber: e.target.value
                                }))}
                                placeholder="Enter your license number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-content-primary mb-1">
                                Expiry Date *
                            </label>
                            <input
                                id="expiryDate"
                                type="date"
                                value={licenseData.expiryDate}
                                onChange={(e) => setLicenseData(prev => ({
                                    ...prev,
                                    expiryDate: e.target.value
                                }))}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={handleLicenseModalClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLicenseSubmit}
                            disabled={!licenseData.licenseNumber || !licenseData.expiryDate}
                            className={`flex-1 px-4 py-2 rounded-md transition ${
                                licenseData.licenseNumber && licenseData.expiryDate
                                    ? 'bg-brand-primary text-white hover:bg-brand-primary-dark'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            Update License
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}
