import React from 'react';
import { useTourContext } from '../../../context/TourContext';
import { useNavigate } from 'react-router-dom';

export default function Transportation() {
    const navigate = useNavigate();
    const { selectedItems, travelDetails } = useTourContext();
    
    // Get selected vehicles and transportation
    const getTransportationDetails = () => {
        const transportation = [];
        
        // Add selected vehicles
        if (selectedItems.vehicles && selectedItems.vehicles.length > 0) {
            selectedItems.vehicles.forEach(vehicle => {
                transportation.push({
                    id: vehicle.id,
                    name: vehicle.name || vehicle.model,
                    type: vehicle.type || vehicle.category,
                    capacity: vehicle.capacity || vehicle.seats,
                    price: vehicle.price || vehicle.pricePerDay || 15000,
                    features: vehicle.features || [],
                    driver: vehicle.driverIncluded !== false,
                    fuelType: vehicle.fuelType,
                    image: vehicle.image
                });
            });
        }
        
        // Add selected vehicle (single selection)
        if (selectedItems.selectedVehicle) {
            const vehicle = selectedItems.selectedVehicle;
            transportation.push({
                id: vehicle.id,
                name: vehicle.name || vehicle.model,
                type: vehicle.type || vehicle.category,
                capacity: vehicle.capacity || vehicle.seats,
                price: vehicle.price || vehicle.pricePerDay || 15000,
                features: vehicle.features || [],
                driver: vehicle.driverIncluded !== false,
                fuelType: vehicle.fuelType,
                image: vehicle.image
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

    const transportationItems = getTransportationDetails();
    const totalDays = calculateDays();

    return (
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
                        <div key={vehicle.id || index}>
                            <div className="flex items-center gap-4 mb-4">
                                {vehicle.image && (
                                    <img 
                                        src={vehicle.image} 
                                        alt={vehicle.name}
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />
                                )}
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-content-primary">{vehicle.name}</h3>
                                    <p className="text-content-secondary">{vehicle.type}</p>
                                    {vehicle.capacity && (
                                        <p className="text-sm text-content-tertiary">
                                            Seats: {vehicle.capacity} passengers
                                        </p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-brand-primary">
                                        LKR {(vehicle.price * totalDays).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-content-secondary">
                                        LKR {vehicle.price.toLocaleString()} per day × {totalDays} days
                                    </p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium text-content-secondary mb-2">Vehicle Type</h4>
                                    <p className="text-content-primary font-medium">{vehicle.type || 'Standard Vehicle'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-content-secondary mb-2">Driver</h4>
                                    <p className="text-content-primary font-medium">
                                        {vehicle.driver ? 'Professional Driver Included' : 'Self-Drive'}
                                    </p>
                                </div>
                                {vehicle.fuelType && (
                                    <div>
                                        <h4 className="text-sm font-medium text-content-secondary mb-2">Fuel Type</h4>
                                        <p className="text-content-primary font-medium">{vehicle.fuelType}</p>
                                    </div>
                                )}
                                <div>
                                    <h4 className="text-sm font-medium text-content-secondary mb-2">Duration</h4>
                                    <p className="text-content-primary font-medium">{totalDays} Day{totalDays > 1 ? 's' : ''}</p>
                                </div>
                            </div>
                            
                            {/* Vehicle Features */}
                            {vehicle.features && vehicle.features.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <h4 className="text-sm font-medium text-content-secondary mb-2">Features</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {vehicle.features.map((feature, featureIndex) => (
                                            <span 
                                                key={featureIndex}
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
                                    LKR {transportationItems.reduce((total, vehicle) => total + (vehicle.price * totalDays), 0).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
