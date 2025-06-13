import Title from '../../../components/Title';
import info from '../../../assets/icons/info-circle.svg';
import star from '../../../assets/icons/star.svg';
import heart from '../../../assets/icons/Heart.svg';
import heartFill from '../../../assets/icons/Heart-fill.svg';
import Tag from '../../hotels/components/Tag';
import PropTypes from 'prop-types';
import { handleNavigate } from '../../../core/constant';

export default function VehicleCard({
    id,
    name,
    brand,
    model,
    type,
    pricePerDay,
    images,
    amenities,
    seats,
    transmission,
    fuelType,
    rating,
    reviews,
    isFavorite = false,
    availableCount,
    rentalAgency,
    location,
    about,
    available,
}) {
    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        // toggle favorite logic here
    };
    return (
        <div
            onClick={() => handleNavigate(`/vehicle/${id}`)}
            className='border p-4 rounded-[8px] shadow-sm bg-white'
        >
            <div className='flex gap-4'>
                {/* Vehicle Image */}
                <div className='relative cursor-pointer h-[200px] w-[200px] rounded-[8px] overflow-hidden'>
                    <img
                        src={images && images.length > 0 ? images[0] : ''}
                        alt={`${name} image`}
                        className='h-full w-full object-cover'
                    />
                    <div
                        onClick={handleFavoriteClick}
                        className='absolute top-2 right-2 cursor-pointer'
                    >
                        <img src={isFavorite ? heartFill : heart} alt="icon" />
                    </div>
                </div>

                {/* Vehicle Details */}
                <div className='flex flex-col justify-between w-full'>
                    {/* Title and type */}
                    <div className='flex flex-col gap-1'>
                        {/* Optionally show ID for admin/debug */}
                        {/* <span className="text-xs text-gray-300">ID: {id}</span> */}
                        <Title title={name} size='text-[18px]' />
                        <p className='text-sm text-gray-500'>
                            {type} {brand && `• ${brand}`}{model && ` ${model}`}
                        </p>
                        {location && (
                            <div className='text-xs text-gray-400'>
                                {location}
                            </div>
                        )}
                        {rentalAgency && (
                            <div className='text-xs text-brand-primary font-semibold mt-1'>
                                {rentalAgency}
                            </div>
                        )}
                        <div className='text-xs text-gray-400 mt-1'>
                            {seats && <span>{seats} seats</span>}
                            {transmission && <span> • {transmission}</span>}
                            {fuelType && <span> • {fuelType}</span>}
                        </div>
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
                            <p className='text-lg font-semibold text-brand-primary'>LKR {pricePerDay} / day</p>
                        </div>
                        <div className='flex gap-2 w-1/2'>
                            <Tag title={`${rating} (${reviews})`} icon={star} />
                            <Tag
                                title={available ? "Available" : "Not Available"}
                                color={available ? "bg-brand-primary" : "bg-red-500"}
                                textColor="text-white"
                                icon={info}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

VehicleCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string,
    model: PropTypes.string,
    type: PropTypes.string.isRequired,
    pricePerDay: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    amenities: PropTypes.arrayOf(PropTypes.string),
    seats: PropTypes.number,
    transmission: PropTypes.string,
    fuelType: PropTypes.string,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool,
    availableCount: PropTypes.number,
    rentalAgency: PropTypes.string,
    location: PropTypes.string,
    about: PropTypes.string,
    available: PropTypes.bool,
};
