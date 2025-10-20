import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState, useContext } from 'react';
import Main from '../../../components/Main';
import Title from '../../../components/Title';
import Breadcrumb from '../../../components/Breadcrumb';
import RoomCard from './components/RoomCard';
import FormatText from '../../../components/FormatText';
import Border from '../../../components/Border';
import FormContext from '../../../context/InitialValues';
import { getHotelById } from '../../../api/tourService';
import Spinner from '../../../components/Spinner';

export default function Hotel() {
    const [hotel, setHotel] = useState({});
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const isTourSelectHotel = location.pathname.includes('/tour/select-hotel');
    const { formData } = useContext(FormContext);
    
    // Find which night this hotel was selected for
    const getSelectedNightInfo = () => {
        if (!isTourSelectHotel) return null;
        const nightHotels = formData.selectedItems?.nightHotels || [];
        const nightIndex = nightHotels.findIndex(nightHotel => nightHotel && nightHotel.id.toString() === id);
        if (nightIndex >= 0) {
            const selectedRoom = formData.selectedItems?.nightRooms?.[nightIndex];
            return {
                nightNumber: nightIndex + 1,
                selectedRoom: selectedRoom
            };
        }
        return null;
    };

    const selectedNightInfo = getSelectedNightInfo();
    
    useEffect(() => {
        const matchHotel = hotelList.find((hotel) => hotel.id.toString() === id);
        const matchRooms = roomList.filter((room) => room.hotelId.toString() === id);
        setHotel(matchHotel || {});
        setRooms(matchRooms || []);
    }, [id]);

    const breadcrumbItems = [
        { label: "Home", path: "/home" },
        { label: "Hotels", path: isTourSelectHotel ? "/tour/select-hotel" : "/hotels-search" },
        { label: hotel?.name || "Hotel", path: isTourSelectHotel ? `/tour/select-hotel/${id}` : `/hotel/${id}` },
    ];

    const roomsList = useMemo(() => {
        return rooms.map((room) => (
            <div 
                key={room.id}
                className='w-full md:w-1/2'
            >
                <RoomCard
                    room={room}
                    isTourMode={isTourSelectHotel}
                    hotel={hotel}
                />
            </div>
        ));
    }, [rooms, isTourSelectHotel, hotel]);

    const amenityList = useMemo(() => {
        return hotel.amenities?.map((amenity) => (
            <Title
                key={`amenity-${amenity}`}
                title={amenity || ''}
                size='text-[18px]'
                color='text-content-tertiary'
                font='font-[400]'
            />
        ));
    }, [hotel.amenities]);

    // Show loading or return early if hotel data is not loaded yet
    if (!hotel || Object.keys(hotel).length === 0) {
        return (
            <Main>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">Loading hotel details...</div>
                </div>
            </Main>
        );
    }

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
            <div className='mt-5'>
                <Title
                    title={hotel.name || ''}
                />
                <Title
                    title={hotel.location || ''}
                    color='text-brand-primary'
                />
                {selectedNightInfo && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <Title
                            title={`Selected for Night ${selectedNightInfo.nightNumber}`}
                            size='text-[14px]'
                            color='text-blue-900'
                            font='font-[600]'
                        />
                        {selectedNightInfo.selectedRoom && (
                            <div className="mt-1">
                                <Title
                                    title={`Room: ${selectedNightInfo.selectedRoom.roomType}`}
                                    size='text-[12px]'
                                    color='text-blue-700'
                                />
                                <Title
                                    title={`LKR ${selectedNightInfo.selectedRoom.pricePerNight} / night`}
                                    size='text-[12px]'
                                    color='text-blue-700'
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className='flex gap-2'>
                { amenityList }
            </div>
            <div className='flex flex-wrap'>
                <FormatText text={hotel?.about || ''}/>
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