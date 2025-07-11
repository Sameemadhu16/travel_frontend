import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import cover from '../../../assets/images/cover.png'
import CustomSelector from '../../../components/CustomSelector'
import Main from '../../../components/Main'
import SearchContainer from '../../../components/SearchContainer'
import Title from '../../../components/Title'
import { amenities, hotelFilterOptions, mealOptions, priceRanges, propertyTypes } from '../../../core/constant'
import { hotelList } from '../../../core/Lists/hotels'
import HotelCard from '../components/HotelCard'
import CheckboxGroup from '../components/CheckboxGroup'
import Breadcrumb from '../../../components/Breadcrumb'

const breadcrumbItems = [
    { label: "Home", path: "/home" },
    { label: "Hotels", path: "/hotels-search" },
];

export default function Search() {
    const location = useLocation();
    const navigate = useNavigate();
    const isTourSelectHotel = location.pathname === '/tour/select-hotel';

    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

    const handleSkip = () => {
        navigate('/tour/select-vehicle');
    };

    const handleNext = () => {
        navigate('/tour/select-vehicle');
    };

    const hotelsContainer = useMemo(()=>{
        return hotelList.map((hotel,index)=>(
            <div key={index}>
                <HotelCard
                    id={hotel.id}
                    name={hotel.name}
                    location={hotel.location}
                    rating={hotel.rating}
                    pricePerNight={hotel.pricePerNight}
                    images={hotel.images}
                    amenities={hotel.amenities}
                    type={hotel.type}
                    roomLeft={hotel.leftRooms}
                    reviews={hotel.reviews}
                />
            </div>
        ))
    },[]);

    const handleSelect = (value) => {
        console.log('Selected:', value);
    };

    return (
        <>
            <div className='w-full relative'>
                <img 
                    src={cover} 
                    alt="cover" 
                    className='h-full w-full object-fit'
                />
                <div>
                    <div className='z-10 absolute top-24 left-1/2 transform -translate-x-1/2 w-1/2'>
                        <SearchContainer/>
                    </div>
                </div>
            </div>
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
                            {!isTourSelectHotel && (
                                <div className='w-1/2'>
                                    <CustomSelector
                                        options={hotelFilterOptions}
                                        placeholder="Recommended"
                                        onChange={handleSelect}
                                    />
                                </div>
                            )}
                            {isTourSelectHotel && (
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
                                    title="Property Type"
                                    options={propertyTypes}
                                    selected={selectedPropertyTypes}
                                    onChange={setSelectedPropertyTypes}
                                />
                            </div>
                            <div className='p-4 border-b'>
                                <CheckboxGroup
                                    title="Meals"
                                    options={mealOptions}
                                    selected={selectedMeals}
                                    onChange={setSelectedMeals}
                                />
                            </div>
                            <div className='p-4 border-b'>
                                <CheckboxGroup
                                    title="Facilities"
                                    options={amenities}
                                    selected={selectedFacilities}
                                    onChange={setSelectedFacilities}
                                />
                            </div>
                            <div className='p-4 border-b'>
                                <CheckboxGroup
                                    title="Price range"
                                    options={priceRanges}
                                    selected={selectedPriceRanges}
                                    onChange={setSelectedPriceRanges}
                                />
                            </div>
                        </div>
                    </div>

                    {/* for item list */}
                    <div className='flex flex-col flex-1'>
                        <div className='flex flex-col gap-2 w-full'>
                            {hotelsContainer}
                        </div>
                    </div>
                </div>
            </Main>
        </>
        
    )
}
