import Main from '../../../components/Main';
import Breadcrumb from '../../../components/Breadcrumb';
import Title from '../../../components/Title';
import Spinner from '../../../components/Spinner';
import { useLocation } from 'react-router-dom';
import {
    vehicleAmenities,
    vehicleFuelPolicies,
    vehicleInsuranceOptions,
    vehiclePickupOptions,
    vehiclePriceRanges,
    vehiclePropertyTypes,
    vehicleFilterOptions
} from '../../../core/constant';
import CustomSelector from '../../../components/CustomSelector';
import CheckboxGroup from '../../hotels/components/CheckboxGroup';
import { useContext, useMemo, useState, useEffect } from 'react';
import VehicleCard from '../components/VehicleCard.jsx';
import FormContext from '../../../context/InitialValues.js';
import { calculateCompleteTripCost, getDaysFromDuration } from '../../../utils/tripCalculator.js';
import { getAllVehicles } from '../../../api/tourService';

const breadcrumbItems = [
    { label: "Home", path: "/home" },
    { label: "Vehicles", path: "/vehicle-search" },
];


export default function SearchVehicles() {
    const location = useLocation();
    const { formData } = useContext(FormContext);
    const [vehicleList, setVehicleList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const travelDetails = formData.travelDetails;
    const isTourSelectVehicle = location.pathname === '/tour/select-vehicle';

    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [selectedFuelPolicies, setSelectedFuelPolicies] = useState([]);
    const [selectedInsuranceOptions, setSelectedInsuranceOptions] = useState([]);
    const [selectedPickupOptions, setSelectedPickupOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch vehicles from backend API
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log('🚗 Fetching vehicles from API...');
                const vehicles = await getAllVehicles();
                console.log('✅ Vehicles fetched successfully:', vehicles);
                console.log('📊 Number of vehicles:', vehicles.length);
                
                // Map backend vehicle data to frontend format
                const mappedVehicles = vehicles.map(vehicle => {
                    // Transform images array from objects to strings
                    const imageUrls = Array.isArray(vehicle.images) 
                        ? vehicle.images.map(img => typeof img === 'string' ? img : img.imageUrl || img.url || '')
                        : [];
                    
                    // Transform amenities array from objects to strings
                    const amenityNames = Array.isArray(vehicle.amenities)
                        ? vehicle.amenities.map(amenity => typeof amenity === 'string' ? amenity : amenity.amenityName || amenity.name || '')
                        : [];
                    
                    return {
                        id: String(vehicle.id), // Convert to string for PropTypes
                        name: `${vehicle.vehicleModel}`,
                        type: vehicle.vehicleType || 'Car',
                        brand: vehicle.vehicleModel?.split(' ')[0] || 'Unknown',
                        model: vehicle.vehicleModel || 'Unknown Model',
                        pricePerDay: vehicle.basePrice || 0,
                        pricePerKm: parseFloat(vehicle.pricePerKilometer) || 0,
                        images: imageUrls,
                        amenities: amenityNames,
                        seats: vehicle.capacity || 4,
                        transmission: 'Automatic', // Default, can be added to model
                        fuelType: 'Petrol', // Default, can be added to model
                        rating: 4.5, // Default rating
                        reviews: 0,
                        rentalAgency: String(vehicle.agency?.agencyName || 'Unknown Agency'), // Ensure string
                        location: vehicle.agency?.city || 'Sri Lanka',
                        about: `${vehicle.vehicleModel} - ${vehicle.vehicleType}`,
                        available: vehicle.availability !== false,
                        isVerified: vehicle.isVerified || false,
                        registrationNo: vehicle.registrationNo,
                        vehicleNo: vehicle.vehicleNo,
                        insuranceNumber: vehicle.insuranceNumber,
                        insuranceExpiryDate: vehicle.insuranceExpiryDate,
                        agency: vehicle.agency
                    };
                });
                
                console.log('📦 Mapped vehicles:', mappedVehicles);
                setVehicleList(mappedVehicles);
            } catch (error) {
                console.error('❌ Error fetching vehicles:', error);
                setError('Failed to load vehicles. Please try again later.');
                setVehicleList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    // Filter vehicles based on travel details and search term
    const filteredVehicles = useMemo(() => {
        let filtered = [...vehicleList];

        // Apply search filter
        if (searchTerm) {
            const search = searchTerm.trim().toLowerCase();
            filtered = filtered.filter(vehicle => 
                vehicle.name?.toLowerCase().includes(search) ||
                vehicle.model?.toLowerCase().includes(search) ||
                vehicle.brand?.toLowerCase().includes(search) ||
                vehicle.type?.toLowerCase().includes(search) ||
                vehicle.rentalAgency?.toLowerCase().includes(search) ||
                vehicle.location?.toLowerCase().includes(search) ||
                vehicle.about?.toLowerCase().includes(search)
            );
        }

        // If in tour mode, filter by passenger capacity
        if (isTourSelectVehicle && travelDetails?.adults) {
            const totalPassengers = (travelDetails.adults || 0) + (travelDetails.children || 0);
            filtered = filtered.filter(vehicle => 
                vehicle.seats >= totalPassengers
            );
        }

        return filtered;
    }, [isTourSelectVehicle, travelDetails?.adults, travelDetails?.children, vehicleList, searchTerm]);

    const vehiclesContainer = useMemo(() => {
            return filteredVehicles.map((vehicle) => {
                // Calculate trip cost if in tour mode
                let tripCostData = null;
                if (isTourSelectVehicle && formData.itinerary && travelDetails.duration) {
                    // Calculate trip cost if needed
                    getDaysFromDuration(travelDetails.duration);
                    tripCostData = calculateCompleteTripCost(
                        vehicle,
                        formData.itinerary,
                        travelDetails.duration,
                        travelDetails.location || 'Colombo'
                    );
                }

                return (
                    <div key={vehicle.id}>
                        <VehicleCard
                            id={vehicle.id}
                            name={vehicle.name}
                            type={vehicle.type}
                            brand={vehicle.brand}
                            model={vehicle.model}
                            pricePerDay={vehicle.pricePerDay}
                            pricePerKm={vehicle.pricePerKm}
                            images={vehicle.images}
                            amenities={vehicle.amenities}
                            seats={vehicle.seats}
                            transmission={vehicle.transmission}
                            fuelType={vehicle.fuelType}
                            rating={vehicle.rating}
                            reviews={vehicle.reviews}
                            rentalAgency={vehicle.rentalAgency}
                            location={vehicle.location}
                            about={vehicle.about}
                            available={vehicle.available}
                            isTourMode={isTourSelectVehicle}
                            tripCostData={tripCostData}
                        />
                    </div>
                );
            });
        }, [filteredVehicles, isTourSelectVehicle, formData.itinerary, travelDetails.duration, travelDetails.location]);

    const handleSelect = (value) => {
        console.log('Selected:', value);
    };

    return (
        <>
            <Main>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spinner />
                    </div>
                ) : error ? (
                    <div className="text-center py-10">
                        <div className="text-red-500 mb-4">{error}</div>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <>
                        <div className='flex items-center w-full mt-5'>
                            <div className='w-1/4'>
                                <Breadcrumb
                                    items={breadcrumbItems}
                                />
                            </div>
                            <div className='flex flex-1'>
                                <div className='w-full flex justify-between items-center'>
                                    <Title
                                        title={`Vehicles: ${filteredVehicles.length} matches ${travelDetails?.adults ? `(${(travelDetails.adults || 0) + (travelDetails.children || 0)} passengers)` : ''}`}
                                        size='text-[16px]'
                                    />
                                    {!isTourSelectVehicle && (
                                        <div className='w-1/2'>
                                            <CustomSelector
                                                options={vehicleFilterOptions}
                                                placeholder="Recommended"
                                                onChange={handleSelect}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="mt-5 mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex gap-4 items-end">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Search Vehicles
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Search by name, type, brand, agency, or location..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                    />
                                </div>
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition whitespace-nowrap"
                                    >
                                        Clear Search
                                    </button>
                                )}
                            </div>
                            {searchTerm && (
                                <div className="mt-3 text-sm text-gray-600">
                                    Showing {filteredVehicles.length} vehicles matching &quot;{searchTerm}&quot;
                                </div>
                            )}
                        </div>

                        <div className='flex gap-2'>
                            {/* for filter */}
                            <div className='w-1/4 h-full overflow-y-auto sticky top-[100px] scrollbar-hide'>
                                <div className='flex flex-col gap-2 border rounded-[8px]'>
                                    <div className='p-4 border-b'>
                                        <Title
                                            title='Filter By:'
                                            size='text-[20px]'
                                            font='font-[600]'
                                        />
                                    </div>
                                    <div className='p-4 border-b'>
                                        <CheckboxGroup
                                            title="Vehicle Type"
                                            options={vehiclePropertyTypes}
                                            selected={selectedPropertyTypes}
                                            onChange={setSelectedPropertyTypes}
                                        />
                                    </div>
                                    <div className='p-4 border-b'>
                                        <CheckboxGroup
                                            title="Facilities"
                                            options={vehicleAmenities}
                                            selected={selectedFacilities}
                                            onChange={setSelectedFacilities}
                                        />
                                    </div>
                                    <div className='p-4 border-b'>
                                        <CheckboxGroup
                                            title="Price Range"
                                            options={vehiclePriceRanges}
                                            selected={selectedPriceRanges}
                                            onChange={setSelectedPriceRanges}
                                        />
                                    </div>
                                    <div className='p-4 border-b'>
                                        <CheckboxGroup
                                            title="Fuel Policy"
                                            options={vehicleFuelPolicies}
                                            selected={selectedFuelPolicies}
                                            onChange={setSelectedFuelPolicies}
                                        />
                                    </div>
                                    <div className='p-4 border-b'>
                                        <CheckboxGroup
                                            title="Insurance Options"
                                            options={vehicleInsuranceOptions}
                                            selected={selectedInsuranceOptions}
                                            onChange={setSelectedInsuranceOptions}
                                        />
                                    </div>
                                    <div className='p-4 border-b'>
                                        <CheckboxGroup
                                            title="Pickup Options"
                                            options={vehiclePickupOptions}
                                            selected={selectedPickupOptions}
                                            onChange={setSelectedPickupOptions}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* for item list */}
                            <div className='flex flex-col flex-1'>
                                <div className='flex flex-col gap-2 w-full'>
                                    {filteredVehicles.length === 0 ? (
                                        <div className="text-center py-10">
                                            <div className="text-content-secondary mb-4">No vehicles found matching your criteria</div>
                                            <div className="text-content-tertiary text-sm">Try adjusting your search filters or check back later</div>
                                        </div>
                                    ) : (
                                        vehiclesContainer
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Main>
        </>
    )
}
