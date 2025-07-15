import cover from '../../../assets/images/vehicle1.jpg'
import SearchContainer from '../../../components/SearchContainer'
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
import { handleSelect } from '../../../core/service';
import CustomSelector from '../../../components/CustomSelector';
import { hotelList } from '../../../core/Lists/hotels';
import CheckboxGroup from '../../hotels/components/CheckboxGroup';
import { useMemo, useState } from 'react';
import VehicleCard from '../components/VehicleCard.jsx';
import { vehicleList } from '../../../core/Lists/vehicles';

const breadcrumbItems = [
    { label: "Home", path: "/home" },
    { label: "Vehicles", path: "/vehicle-search" },
];


export default function SearchVehicles() {
    const location = useLocation();
    const navigate = useNavigate();
    const isTourSelectVehicle = location.pathname === '/tour/select-vehicle';

    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [selectedFuelPolicies, setSelectedFuelPolicies] = useState([]);
    const [selectedInsuranceOptions, setSelectedInsuranceOptions] = useState([]);
    const [selectedPickupOptions, setSelectedPickupOptions] = useState([]);

    const vehiclesContainer = useMemo(() => {
            return vehicleList.map((vehicle, index) => (
                <div key={index}>
                    <VehicleCard
                        id={vehicle.id}
                        name={vehicle.name}
                        type={vehicle.type}
                        brand={vehicle.brand}
                        model={vehicle.model}
                        pricePerDay={vehicle.pricePerDay}
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
                    />
                </div>
            ));
        }, []);

    // const handleSkip = () => {
    //     navigate('/tour/complete-request');
    // };

    const handleNext = () => {
        navigate('/tour/complete-request');
    };

    const handleSelect = (value) => {
        console.log('Selected:', value);
    };

    return (
        <>
            {/* <div className='w-full relative'>
                <img
                    src={cover}
                    alt="cover"
                    className='h-full w-full object-fit'
                />
                <div>
                    <div className='z-10 absolute top-24 left-1/2 transform -translate-x-1/2 w-1/2'>
                        <SearchContainer />
                    </div>
                </div>
            </div> */}
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
                                title={`Kandy: ${hotelList.length} matches`}
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
                            {isTourSelectVehicle && (
                                <div className='flex gap-4'>
                                    <button 
                                        onClick={handleNext}
                                        className="px-6 py-2 rounded bg-brand-primary text-white font-semibold flex items-center gap-2 hover:bg-warning transition"
                                    >
                                        Skip & Next
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Main>

            <Main>

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
