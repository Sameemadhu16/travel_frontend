import Main from '../../../components/Main';
import Breadcrumb from '../../../components/Breadcrumb';
import Title from '../../../components/Title';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { useContext, useMemo, useState } from 'react';
import VehicleCard from '../components/VehicleCard.jsx';
import { vehicleList } from '../../../core/Lists/vehicles';
import FormContext from '../../../context/InitialValues.js';
import { calculateCompleteTripCost, getDaysFromDuration } from '../../../utils/tripCalculator.js';

const breadcrumbItems = [
    { label: "Home", path: "/home" },
    { label: "Vehicles", path: "/vehicle-search" },
];


export default function SearchVehicles() {
    const location = useLocation();
    const navigate = useNavigate();
    const { formData } = useContext(FormContext);

    const travelDetails = formData.travelDetails;
    const isTourSelectVehicle = location.pathname === '/tour/select-vehicle';

    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [selectedFuelPolicies, setSelectedFuelPolicies] = useState([]);
    const [selectedInsuranceOptions, setSelectedInsuranceOptions] = useState([]);
    const [selectedPickupOptions, setSelectedPickupOptions] = useState([]);

    // Filter vehicles based on travel details if available
    const filteredVehicles = useMemo(() => {
        if (!isTourSelectVehicle || !travelDetails?.adults) {
            return vehicleList;
        }
        
        const totalPassengers = (travelDetails.adults || 0) + (travelDetails.children || 0);
        
        // Filter vehicles by passenger capacity
        return vehicleList.filter(vehicle => 
            vehicle.seats >= totalPassengers
        );
    }, [isTourSelectVehicle, travelDetails?.adults, travelDetails?.children]);

    const vehiclesContainer = useMemo(() => {
            return filteredVehicles.map((vehicle, index) => {
                // Calculate trip cost if in tour mode
                let tripCostData = null;
                if (isTourSelectVehicle && formData.itinerary && travelDetails.duration) {
                    const numberOfDays = getDaysFromDuration(travelDetails.duration);
                    tripCostData = calculateCompleteTripCost(
                        vehicle,
                        formData.itinerary,
                        travelDetails.duration,
                        travelDetails.location || 'Colombo'
                    );
                }

                return (
                    <div key={index}>
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

    const handleNext = () => {
        navigate('/tour/complete-request');
    };

    const handleSelect = (value) => {
        console.log('Selected:', value);
    };

    return (
        <>
            <Main>
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

                <div className='flex gap-2 mt-5'>
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
                            {vehiclesContainer}
                        </div>
                    </div>
                </div>
            </Main>
        </>
    )
}
