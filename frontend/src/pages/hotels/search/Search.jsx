import { useMemo } from 'react'
import cover from '../../../assets/images/cover.png'
import CustomSelector from '../../../components/CustomSelector'
import Main from '../../../components/Main'
import SearchContainer from '../../../components/SearchContainer'
import Title from '../../../components/Title'
import { hotelFilterOptions, hotelList, travelPlaces } from '../../../core/constant'
import HotelCard from '../components/HotelCard'

export default function Search() {

    const hotelsContainer = useMemo(()=>{
        return hotelList.map((hotel,index)=>(
            <div key={index}>
                <HotelCard
                    name={hotel.name}
                    location={hotel.location}
                    rating={hotel.rating}
                    pricePerNight={hotel.pricePerNight}
                    image={hotel.image}
                    amenities={hotel.amenities}
                    type={hotel.type}
                    roomLeft={hotel.leftRooms}
                />
            </div>
        ))
    })

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
                    <div className='absolute top-24 left-1/2 transform -translate-x-1/2 w-1/2'>
                        <SearchContainer/>
                    </div>
                </div>
            </div>
            <Main>
                <div className='flex gap-2 mt-5'>

                    {/* for filter */}
                    <div className='w-1/4'>

                    </div>

                    {/* for item list */}
                    <div className='flex flex-col flex-1'>
                        <div className='flex justify-between items-center'>
                            <Title 
                                title={`Kandy: ${hotelList.length} matches`}
                                size='text-[16px]'
                            />
                            <CustomSelector
                                options={hotelFilterOptions}
                                placeholder="Recommended"
                                onChange={handleSelect}
                            />
                        </div>
                        <div className='flex flex-col gap-2 w-full mt-5'>
                            {hotelsContainer}
                        </div>
                    </div>
                </div>
            </Main>
        </>
        
    )
}
