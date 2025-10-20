import Title from '../../../../components/Title';
import FormatText from '../../../../components/FormatText';
import { FaBed, FaUser } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import FormContext from '../../../../context/InitialValues';

export default function RoomCard({ room, isTourMode = false, hotel = {} }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isTourSelectHotel = location.pathname.includes('/tour/select-hotel');
    const { formData, setFormData } = useContext(FormContext);
    
    // For tour mode, we need to find which night this hotel was selected for
    const getCurrentNightIndex = () => {
        if (!isTourMode || !isTourSelectHotel) return -1;
        const nightHotels = formData.selectedItems?.nightHotels || [];
        return nightHotels.findIndex(nightHotel => nightHotel && nightHotel.id === (hotel.id || room.hotelId));
    };

    const currentNightIndex = getCurrentNightIndex();
    const selectedRoom = currentNightIndex >= 0 ? formData.selectedItems?.nightRooms?.[currentNightIndex] : null;
    const isSelected = selectedRoom && selectedRoom.id === room.id;

    const handleRoomSelection = () => {
        if (!isTourMode || !isTourSelectHotel || currentNightIndex < 0) return;

        // If the room is already selected, unselect it
        if (isSelected) {
            const updatedNightRooms = [...(formData.selectedItems.nightRooms || [])];
            updatedNightRooms[currentNightIndex] = null;
            
            setFormData(prev => ({
                ...prev,
                selectedItems: {
                    ...prev.selectedItems,
                    nightRooms: updatedNightRooms
                }
            }));
        } else {
            // Select the new room for this night
            const updatedNightRooms = [...(formData.selectedItems.nightRooms || [])];
            updatedNightRooms[currentNightIndex] = {
                ...room,
                selectedForNight: currentNightIndex + 1
            };
            
            setFormData(prev => ({
                ...prev,
                selectedItems: {
                    ...prev.selectedItems,
                    nightRooms: updatedNightRooms
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
                    {(room.amenities || []).map((amenity, index) => {
                        // Handle both string amenities and object amenities with icon
                        const amenityValue = typeof amenity === 'string' ? amenity : amenity.value;
                        const Icon = typeof amenity === 'object' && amenity.icon ? amenity.icon : null;
                        
                        return (
                            <div className='flex gap-1 items-center' key={index}>
                                {Icon && <Icon className='text-brand-primary' />}
                                <span className="text-brand-primary">{amenityValue}</span>
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