import Title from '../../../components/Title';
import info from '../../../assets/icons/info-circle.svg';
import star from '../../../assets/icons/star.svg';
import heart from '../../../assets/icons/Heart.svg';
import heartFill from '../../../assets/icons/Heart-fill.svg';
import Tag from './Tag';
import PropTypes from 'prop-types';
import { handleNavigate } from '../../../core/constant';
import { useLocation } from 'react-router-dom';
import { useTourContext } from '../../../context/TourContext';

export default function HotelCard({
    id,
    name,
    location,
    rating,
    pricePerNight,
    images,
    amenities,
    type,
    roomLeft,
    reviews,
    isFavorite = true,
    isTourMode = false,
    selectedHotels = [],
}) {
    const currentLocation = useLocation();
    const tourContext = isTourMode ? useTourContext() : null;
    const { addSelectedHotel, removeSelectedHotel } = tourContext || {};
    
    const isSelected = selectedHotels.some(hotel => hotel.id === id);

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        // toggle favorite logic here
    };

    const handleTourSelection = (e) => {
        e.stopPropagation();
        if (!tourContext) return;
        
        const hotelData = {
            id,
            name,
            location,
            rating,
            pricePerNight,
            images,
            amenities,
            type,
            roomLeft,
            reviews
        };
        
        if (isSelected) {
            removeSelectedHotel(id);
        } else {
            addSelectedHotel(hotelData);
        }
    };

    const handleCardClick = () => {
        if (currentLocation.pathname === '/hotels-search') {
            handleNavigate(`/hotel/${id}`);
        } else if (currentLocation.pathname === '/tour/select-hotel') {
            handleNavigate(`/tour/select-hotel/${id}`);
        }
    };
    return (
        <div 
            onClick={handleCardClick}
            className='border p-4 rounded-[8px] shadow-sm bg-white'>
            <div className='flex gap-4'>
                {/* Hotel Image */}
                <div className='relative cursor-pointer h-[200px] w-[200px] rounded-[8px] overflow-hidden'>
                    <img
                        src={images && images.length > 0 ? images[0] : ''}
                        alt={`${name} image`}
                        className='h-full w-full object-cover'
                    />
                    <div 
                        onClick={handleFavoriteClick}
                        className='absolute top-2 right-2 cursor-pointer'>
                        <img src={isFavorite ? heartFill: heart } alt="icon" />
                    </div>
                </div>

                {/* Hotel Details */}
                <div className='flex flex-col justify-between w-full'>
                    {/* Title and type */}
                    <div className='flex flex-col gap-1'>
                        <Title title={name} size='text-[18px]' />
                        <p className='text-sm text-gray-500'>{type} • {location}</p>
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
                        
                        {isTourMode ? (
                            <div className='flex flex-col items-end gap-2 w-1/2'>
                                <div className='flex gap-2 w-full'>
                                    <Tag title={`${rating} (${reviews})`} icon={star} />
                                    <Tag
                                        title={`Only ${roomLeft} left`}
                                        color='bg-red-100'
                                        textColor='text-red-600'
                                        icon={info}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className='flex gap-2 w-1/2'>
                                <Tag title={`${rating} (${reviews})`} icon={star} />
                                <Tag
                                    title={`Only ${roomLeft} left`}
                                    color='bg-brand-primary'
                                    textColor='text-white'
                                    icon={info}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

HotelCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    pricePerNight: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    amenities: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string.isRequired,
    roomLeft: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool,
    isTourMode: PropTypes.bool,
    selectedHotels: PropTypes.array,
};
