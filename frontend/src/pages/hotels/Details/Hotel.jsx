import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { hotelList } from '../../../core/Lists/hotels';
import { useEffect, useMemo, useState } from 'react';
import Main from '../../../components/Main';
import Title from '../../../components/Title';
import Breadcrumb from '../../../components/Breadcrumb';
import { roomList } from '../../../core/Lists/rooms';
import RoomCard from './components/RoomCard';
import FormatText from '../../../components/FormatText';
import Border from '../../../components/Border';
import { useTourContext } from '../../../context/TourContext';

export default function Hotel() {
    const [hotel,setHotel] = useState({});
    const [rooms,setRooms]= useState([]);
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const isTourSelectHotel = location.pathname.includes('/tour/select-hotel');
    
    // Use TourContext if in tour flow
    const tourContext = isTourSelectHotel ? useTourContext() : null;
    const { selectedItems, addSelectedHotel, removeSelectedHotel } = tourContext || {};
    
    const isHotelSelected = selectedItems?.hotels?.some(h => h.id.toString() === id) || false;
    
    useEffect(()=>{
        const matchHotel = hotelList.find((hotel) => hotel.id.toString() === id);
        const matchRooms = roomList.filter((room)=>room.hotelId.toString() === id);
        setHotel(matchHotel);
        setRooms(matchRooms);
    },[id]);

    const breadcrumbItems = [
        { label: "Home", path: "/home" },
        { label: "Hotels", path: isTourSelectHotel ? "/tour/select-hotel" : "/hotels-search" },
        { label: hotel.name || "Hotel", path: isTourSelectHotel ? `/tour/select-hotel/${id}` : `/hotel/${id}` },
    ];

    const handleHotelSelection = () => {
        if (!tourContext) return;
        
        const hotelData = {
            id: parseInt(id),
            name: hotel.name,
            location: hotel.location,
            rating: hotel.rating,
            pricePerNight: hotel.pricePerNight,
            images: hotel.images,
            amenities: hotel.amenities,
            type: hotel.type,
            roomLeft: hotel.leftRooms,
            reviews: hotel.reviews
        };
        
        if (isHotelSelected) {
            removeSelectedHotel(parseInt(id));
        } else {
            addSelectedHotel(hotelData);
        }
    };

    const handleContinue = () => {
        navigate('/tour/select-vehicle');
    };

    const roomsList = useMemo(()=>{
        return rooms.map((room)=>(
            <div 
                key={room.id}
                className='w-full md:w-1/2'
            >
                <RoomCard
                    room={room}
                    isTourMode={isTourSelectHotel}
                />
            </div>
        ))
    },[rooms, isTourSelectHotel]);

    const amenityList = useMemo(()=>{
        return hotel.amenities && hotel.amenities.map((amenity,index)=>(
            <Title
                key={index}
                title={amenity || ''}
                size='text-[18px]'
                color='text-content-tertiary'
                font='font-[400]'
            />
        ))
    },[hotel.amenities])

    return (
        <Main>
            <div>
                <Breadcrumb 
                    items={breadcrumbItems} 
                />
            </div>
            <div className='w-full flex h-[400px] gap-2 mt-5'>
                <div className='w-1/2 h-full rounded-[8px] overflow-hidden'>
                    {hotel?.images?.[0] && (
                        <img 
                            src={hotel.images[0]} 
                            alt={hotel?.name || "Hotel"} 
                            className="h-full w-full object-cover" 
                        />
                    )}
                </div>
                <div className='w-1/2 h-full grid grid-cols-2 gap-2'>
                    <div className='rounded-[8px] overflow-hidden'>
                        {hotel?.images?.[1] && (
                            <img 
                                src={hotel.images[1]} 
                                alt={hotel?.name || "Hotel"} 
                                className="h-full w-full object-cover" 
                            />
                        )}
                    </div>
                    <div className='rounded-[8px] overflow-hidden'>
                        {hotel?.images?.[2] && (
                            <img 
                                src={hotel.images[2]} 
                                alt={hotel?.name || "Hotel"} 
                                className="h-full w-full object-cover" 
                            />
                        )}
                    </div>
                    <div className='rounded-[8px] overflow-hidden'>
                        {hotel?.images?.[3] && (
                            <img 
                                src={hotel.images[3]} 
                                alt={hotel?.name || "Hotel"} 
                                className="h-full w-full object-cover" 
                            />
                        )}
                    </div>
                    <div className='rounded-[8px] overflow-hidden'>
                        {hotel?.images?.[4] && (
                            <img 
                                src={hotel.images[4]} 
                                alt={hotel?.name || "Hotel"} 
                                className="h-full w-full object-cover" 
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className='flex gap-2 mt-5'>
                <div className='flex-1'>
                    <Title
                        title={hotel.name || ''}
                    />
                    <Title
                        title={hotel.location || ''}
                        color='text-brand-primary'
                    />
                </div>
                
                {isTourSelectHotel && (
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2 text-sm text-content-secondary'>
                            <span>Starting from</span>
                            <span className='text-lg font-bold text-brand-primary'>
                                LKR {hotel.pricePerNight?.toLocaleString()} / night
                            </span>
                        </div>
                        <div className='flex gap-2'>
                            <button
                                onClick={handleHotelSelection}
                                className={`px-6 py-2 rounded-lg font-semibold transition ${
                                    isHotelSelected 
                                        ? 'bg-brand-primary text-white border-2 border-brand-primary' 
                                        : 'bg-white text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-white'
                                }`}
                            >
                                {isHotelSelected ? (
                                    <>
                                        <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                        </svg>
                                        Selected
                                    </>
                                ) : (
                                    'Select This Hotel'
                                )}
                            </button>
                            <button
                                onClick={handleContinue}
                                className="px-6 py-2 rounded-lg bg-surface-secondary text-content-primary font-semibold hover:bg-surface-tertiary transition"
                            >
                                Continue to Vehicles
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className='flex gap-2'>
                { amenityList }
            </div>
            <div className='flex flex-wrap'>
                <FormatText text={hotel.about}/>
            </div>
            <Border/>
            <div className='w-full mt-5'>
                <Title
                    title={'Rooms'}
                    size='text-[24px]'
                />
                <div className='flex flex-col md:flex-row items-center gap-2 mt-5'>
                    { roomsList }
                </div>
            </div>
        </Main>
    )
}
