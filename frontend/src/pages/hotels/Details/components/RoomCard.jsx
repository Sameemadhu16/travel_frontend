import Title from '../../../../components/Title'
import FormatText from '../../../../components/FormatText'
import { FaUser } from 'react-icons/fa'
import { amenities } from '../../../../core/constant'

export default function RoomCard({room}) {
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
                            <img src={room.images[1]} alt={room?.name || "Hotel"} className="h-full w-full object-cover" />
                        )}
                    </div>
                    <div className='rounded-[8px] overflow-hidden'>
                        {room?.images?.[2] && (
                            <img src={room.images[2]} alt={room?.name || "Hotel"} className="h-full w-full object-cover" />
                        )}
                    </div>
                    <div className='rounded-[8px] overflow-hidden'>
                        {room?.images?.[3] && (
                            <img src={room.images[3]} alt={room?.name || "Hotel"} className="h-full w-full object-cover" />
                        )}
                    </div>
                    <div className='rounded-[8px] overflow-hidden'>
                        {room?.images?.[4] && (
                            <img src={room.images[4]} alt={room?.name || "Hotel"} className="h-full w-full object-cover" />
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
                <div className='w-full flex items-center justify-between'>
                    <Title
                        title={`LKR ${room.pricePerNight}`}
                        size='text-[20px]'
                    />
                    <div className='w-1/4 flex justify-end flex-wrap'>
                        {[...Array(room.maxGuests)].map((_, i) => (
                            <FaUser key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
