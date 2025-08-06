import Title from '../../../components/Title';
import info from '../../../assets/icons/info-circle.svg';
import star from '../../../assets/icons/star.svg';
import heart from '../../../assets/icons/Heart.svg';
import heartFill from '../../../assets/icons/Heart-fill.svg';
import Tag from './Tag';
import PropTypes from 'prop-types';
import { handleNavigate } from '../../../core/constant';
import { useLocation } from 'react-router-dom';

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
    onHotelSelect,
    currentNight,
    isSelectedForCurrentNight = false,
}) {
    const currentLocation = useLocation();

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        // toggle favorite logic here
    };

    const handleCardClick = () => {
        // In tour mode, only the buttons should handle navigation, not the whole card
        if (isTourMode) return;
        
        if (currentLocation.pathname === '/hotels-search') {
            handleNavigate(`/hotel/${id}`);
        } else if (currentLocation.pathname === '/tour/select-hotel') {
            handleNavigate(`/tour/select-hotel/${id}`);
        }
    };

    const handleViewDetails = (e) => {
        e.stopPropagation();
        if (currentLocation.pathname === '/hotels-search') {
            handleNavigate(`/hotel/${id}`);
        } else if (currentLocation.pathname === '/tour/select-hotel') {
            handleNavigate(`/tour/select-hotel/${id}`);
        }
    };

    const handleSelectForNight = (e) => {
        e.stopPropagation();
        if (onHotelSelect) {
            // First select the hotel
            onHotelSelect({
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
            });
            
            // Then navigate to hotel details page for room selection
            setTimeout(() => {
                if (currentLocation.pathname === '/tour/select-hotel') {
                    handleNavigate(`/tour/select-hotel/${id}`);
                }
            }, 100);
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
                        alt={name}
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
                        {amenities?.slice(0, 3).map((item) => (
                        <span
                            key={`${id}-${item}`}
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
                                <div className='flex gap-2 w-full'>
                                    {isSelectedForCurrentNight ? (
                                        <button
                                            onClick={handleSelectForNight}
                                            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition flex items-center gap-1"
                                        >
                                            ✓ Selected Night {currentNight}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSelectForNight}
                                            className="px-3 py-1 bg-brand-primary text-white text-sm rounded hover:bg-brand-primary-dark transition"
                                        >
                                            Select for Night {currentNight}
                                        </button>
                                    )}
                                    <button
                                        onClick={handleViewDetails}
                                        className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition"
                                    >
                                        Just View Details
                                    </button>
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
    onHotelSelect: PropTypes.func,
    currentNight: PropTypes.number,
    isSelectedForCurrentNight: PropTypes.bool,
};
