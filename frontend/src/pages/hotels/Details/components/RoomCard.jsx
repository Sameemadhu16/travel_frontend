import Title from '../../../../components/Title';
import FormatText from '../../../../components/FormatText';
import { FaBed, FaUser } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import FormContext from '../../../../context/InitialValues';

export default function RoomCard({ room, isTourMode = false, hotel = {} }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isTourSelectHotel = location.pathname.includes('/tour/select-hotel');
    const { formData, setFormData } = useContext(FormContext);

    const selectedRoomId = formData.selectedItems?.rooms?.[0]?.id;
    const selectedHotelId = formData.selectedItems?.hotels?.[0]?.id;

    // If selected hotel doesn't match current one, clear previous selection
    if (isTourMode && isTourSelectHotel && selectedHotelId && selectedHotelId !== (hotel.id || room.hotelId)) {
        setFormData(prev => ({
            ...prev,
            selectedItems: {
                hotels: [],
                rooms: [],
            }
        }));
    }
    const isSelected = selectedRoomId === room.id;

    const handleRoomSelection = () => {
        if (!isTourMode || !isTourSelectHotel) return;

        const hotelData = {
            id: hotel.id || room.hotelId,
            name: hotel.name || room.hotelName || '',
            location: hotel.location || '',
            rating: hotel.rating || 0,
            pricePerNight: hotel.pricePerNight || 0,
            images: hotel.images || [],
            amenities: hotel.amenities || [],
            type: hotel.type || '',
            roomLeft: hotel.leftRooms || 0,
            reviews: hotel.reviews || [],
        };

        // If the room is already selected, unselect it
        if (isSelected) {
            setFormData(prev => ({
                ...prev,
                selectedItems: {
                    ...prev.selectedItems,
                    rooms: [],
                    hotels: [],
                }
            }));
        } else {
            // Replace current selection with the new room and hotel
            setFormData(prev => ({
                ...prev,
                selectedItems: {
                    ...prev.selectedItems,
                    rooms: [room],
                    hotels: [hotelData],
                }
            }));
        }
    };

    const handleReserve = () => {
        navigate(`/hotel/${room.hotelId}/room/${room.id}/book`);
    };

    return (
        <div className='border rounded-[8px] overflow-hidden pb-4'>
            <div className='w-full flex h-[400px] gap-2'>
                <div className='w-1/2 h-full rounded-[8px] overflow-hidden'>
                    {room?.images?.[0] && (
                        <img src={room.images[0]} alt={room?.name || "Hotel"} className="h-full w-full object-cover" />
                    )}
                </div>
                <div className='w-1/2 h-full grid grid-cols-2 gap-2'>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className='rounded-[8px] overflow-hidden'>
                            {room?.images?.[i] && (
                                <img
                                    src={room.images[i]}
                                    alt={room?.name || "Hotel"}
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className='px-4'>
                <div className='mt-5'>
                    <Title title={room.roomType} size='text-[24px]' />
                </div>

                <div className='w-full flex flex-wrap gap-2 mt-2'>
                    {room.amenities.map((amenity, index) => {
                        const Icon = amenity.icon;
                        return (
                            <div className='flex gap-1 items-center' key={index}>
                                <Icon className='text-brand-primary' />
                                <span className="text-brand-primary">{amenity.value}</span>
                            </div>
                        );
                    })}
                </div>

                <div className='flex flex-wrap'>
                    <FormatText text={room.description} />
                </div>

                <div className='w-full flex items-center justify-between mt-4'>
                    <div className='flex gap-2 items-center'>
                        <Title title={`LKR ${room.pricePerNight}`} size='text-[20px]' />
                        <div className='flex items-center gap-1'>
                            <FaBed size={16} />
                            <Title title={room.bedType} size='text-[16px]' />
                        </div>
                    </div>
                    <div className='w-1/4 flex justify-end flex-wrap'>
                        {[...Array(room.maxGuests)].map((_, i) => (
                            <FaUser key={i} />
                        ))}
                    </div>
                </div>

                <div className='flex items-center justify-between mt-2'>
                    <div className='w-1/3'>
                        <button
                            onClick={isTourMode ? handleRoomSelection : handleReserve}
                            className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                                isTourMode
                                    ? isSelected
                                        ? 'bg-brand-primary text-white border-2 border-brand-primary'
                                        : 'bg-white text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-white'
                                    : 'bg-brand-primary text-white border-2 border-brand-primary hover:bg-warning'
                            }`}
                        >
                            {isTourMode ? (
                                isSelected ? (
                                    <>
                                        <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Selected
                                    </>
                                ) : (
                                    'Select Room'
                                )
                            ) : (
                                'Reserve'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}