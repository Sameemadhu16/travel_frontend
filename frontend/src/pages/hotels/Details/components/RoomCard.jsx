import Title from '../../../../components/Title'
import FormatText from '../../../../components/FormatText'
import { FaBed, FaUser } from 'react-icons/fa'
import PrimaryButton from '../../../../components/PrimaryButton'
import { useNavigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function RoomCard({room}) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleReserve = () => {
        // Store selected room data
        localStorage.setItem('selectedRoom', JSON.stringify(room));
        
        // Check if current path includes tour/select-hotel
        if (location.pathname.includes('/tour/select-hotel')) {
            // Tour booking flow - go to vehicle selection
            navigate('/tour/select-vehicle');
        } else {
            // Regular hotel booking flow
            navigate('/book-hotel');
        }
    };

    return (
        <div className='border rounded-[8px]  overflow-hidden pb-4'>
            <div className='w-full flex h-[400px] gap-2'>
                <div className='w-1/2 h-full rounded-[8px] overflow-hidden'>
                    {room?.images?.[0] && (
                        <img src={room.images[0]} alt={room?.name || "Hotel"} className="h-full w-full object-cover" />
                    )}
                </div>
                <div className='w-1/2 h-full grid grid-cols-2 gap-2'>
                    <div className='rounded-[8px] overflow-hidden'>
                        {room?.images?.[1] && (
                            <img 
                                src={room.images[1]} 
                                alt={room?.name || "Hotel"} 
                                className="h-full w-full object-cover" 
                            />
                        )}
                    </div>
                    <div className='rounded-[8px] overflow-hidden'>
                        {room?.images?.[2] && (
                            <img 
                                src={room.images[2]} 
                                alt={room?.name || "Hotel"} 
                                className="h-full w-full object-cover" 
                            />
                        )}
                    </div>
                    <div className='rounded-[8px] overflow-hidden'>
                        {room?.images?.[3] && (
                            <img 
                                src={room.images[3]} 
                                alt={room?.name || "Hotel"} 
                                className="h-full w-full object-cover" 
                            />
                        )}
                    </div>
                    <div className='rounded-[8px] overflow-hidden'>
                        {room?.images?.[4] && (
                            <img 
                                src={room.images[4]} 
                                alt={room?.name || "Hotel"} 
                                className="h-full w-full object-cover" 
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className='px-4'>
                <div className='mt-5'>
                    <Title
                        title={room.roomType}
                        size='text-[24px]'
                    />
                </div>
                <div className='w-full flex flex-wrap gap-2 mt-2'>
                    {
                        room.amenities.map((amenity,index)=>{
                            const Icon = amenity.icon
                            return (
                                <div
                                    className='flex gap-1 items-center'
                                    key={index}>
                                    <Icon className='text-brand-primary'/>
                                    <span className="text-brand-primary">{amenity.value}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='flex flex-wrap'>
                    <FormatText text={room.description}/>
                </div>
                <div className='w-full flex items-center justify-between mt-4'>
                    <div className='flex gap-2 items-center'>
                        <Title
                            title={`LKR ${room.pricePerNight}`}
                            size='text-[20px]'
                        />
                        <div className='flex items-center gap-1'>
                        <FaBed size={16}/>
                            <Title
                                title={room.bedType}
                                size='text-[16px]'
                            />
                        </div>
                    </div>
                    <div className='w-1/4 flex justify-end flex-wrap'>
                        {[...Array(room.maxGuests)].map((_, i) => (
                            <FaUser key={i} />
                        ))}
                    </div>
                </div>
                <div className='w-1/2 mt-2'>
                    <PrimaryButton
                        text='Reserve'
                        type={'button'}
                        onClick={handleReserve}
                    />
                </div>
            </div>
        </div>
    )
}

// Add PropTypes for RoomCard
RoomCard.propTypes = {
    room: PropTypes.shape({
        id: PropTypes.number,
        hotelId: PropTypes.number,
        roomType: PropTypes.string,
        maxGuests: PropTypes.number,
        bedType: PropTypes.string,
        pricePerNight: PropTypes.number,
        amenities: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string,
                icon: PropTypes.elementType
            })
        ),
        images: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.string,
        name: PropTypes.string
    }).isRequired
};
