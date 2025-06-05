import Title from '../../../components/Title';
import family from '../../../assets/icons/users-group.svg';
import info from '../../../assets/icons/info-circle.svg';
import star from '../../../assets/icons/star.svg';
import Tag from './Tag';

export default function HotelCard({
    name,
    location,
    rating,
    pricePerNight,
    image,
    amenities,
    type,
    roomLeft,
}) {
    return (
        <div className='border p-4 rounded-[8px] shadow-sm bg-white'>
            <div className='flex gap-4'>
                {/* Hotel Image */}
                <div className='h-[200px] w-[200px] rounded-[8px] overflow-hidden'>
                <img
                    src={image}
                    alt={`${name} image`}
                    className='h-full w-full object-cover'
                />
                </div>

                {/* Hotel Details */}
                <div className='flex flex-col justify-between w-full'>
                    {/* Title and type */}
                    <div className='flex flex-col gap-1'>
                        <Title title={name} size='text-[18px]' />
                        <p className='text-sm text-gray-500'>{type} • {location}</p>
                    </div>

                    {/* Tags and rating */}
                    <div className='flex w-1/2 items-center gap-2 mt-2'>
                        <Tag title={'Family'} icon={family} />
                        <Tag title={`${rating}`} icon={star} />
                    </div>

                    {/* Amenities */}
                    <div className='flex gap-2 items-center flex-wrap mt-2 text-xs text-gray-600'>
                        {amenities?.slice(0, 3).map((item, index) => (
                        <span
                            key={index}
                            className='bg-gray-100 rounded-full px-3 py-1 border'
                        >
                            {item}
                        </span>
                        ))}
                        {amenities?.length > 3 && (
                            <span className='cursor-pointer text-blue-500'>+{amenities.length - 3} more</span>
                        )}
                    </div>

                    {/* Footer Row: Price and status */}
                    <div className='flex justify-between items-center mt-4'>
                        <div>
                            <p className='text-sm text-gray-400'>Starting from</p>
                            <p className='text-lg font-semibold text-brand-primary'>LKR {pricePerNight} / night</p>
                        </div>
                        <div className='w-1/4'>
                            <Tag
                                title={`Only ${roomLeft} left`}
                                color='bg-brand-primary'
                                textColor='text-white'
                                icon={info}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
