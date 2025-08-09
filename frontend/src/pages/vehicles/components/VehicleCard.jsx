import Title from '../../../components/Title';
import info from '../../../assets/icons/info-circle.svg';
import star from '../../../assets/icons/star.svg';
import heart from '../../../assets/icons/Heart.svg';
import heartFill from '../../../assets/icons/Heart-fill.svg';
import Tag from '../../hotels/components/Tag';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { handleNavigate } from '../../../core/constant';
import { FaSnowflake, FaBluetooth, FaCarBattery, FaMapMarkedAlt, FaCamera, FaMusic, FaCogs, FaChair, FaPlug, FaSun, FaRoad, FaGasPump } from "react-icons/fa";

const amenityIconMap = {
    "Air Conditioning": <FaSnowflake className="inline mr-1" />,
    "Bluetooth": <FaBluetooth className="inline mr-1" />,
    "ABS": <FaCarBattery className="inline mr-1" />,
    "Power Steering": <FaCogs className="inline mr-1" />,
    "USB Charger": <FaPlug className="inline mr-1" />,
    "4WD": <FaRoad className="inline mr-1" />,
    "Navigation System": <FaMapMarkedAlt className="inline mr-1" />,
    "Parking Sensors": <FaCogs className="inline mr-1" />,
    "Cruise Control": <FaRoad className="inline mr-1" />,
    "Rear Camera": <FaCamera className="inline mr-1" />,
    "Leather Seats": <FaChair className="inline mr-1" />,
    "Sunroof": <FaSun className="inline mr-1" />,
    "Premium Audio": <FaMusic className="inline mr-1" />,
    "Electric Charging": <FaPlug className="inline mr-1" />,
    "Climate Control": <FaSnowflake className="inline mr-1" />,
    "Hybrid Engine": <FaGasPump className="inline mr-1" />,
    "Convertible Roof": <FaSun className="inline mr-1" />,
};

export default function VehicleCard({
    id,
    name,
    brand,
    model,
    type,
    pricePerDay,
    pricePerKm,
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
    location: vehicleLocation,
    isTourMode = false,
    selectedVehicle = null,
    about,
    available,
    tripCostData = null,
}) {
    const location = useLocation();
    const driverOption = 'without'; // Default driver option
    
    const isSelected = selectedVehicle?.id === id;
    
    // Calculate prices with/without driver
    const driverFee = Math.round(pricePerDay * 0.3); // 30% of vehicle price for driver
    const priceWithDriver = pricePerDay + driverFee;
    
    const handleCardClick = () => {
        // Check if current path includes tour/select-vehicle
        if (location.pathname.includes('/tour/select-vehicle')) {
            // Tour vehicle selection flow
            handleNavigate(`/tour/select-vehicle/${id}`);
        } else {
            // Regular vehicle details flow
            handleNavigate(`/vehicle/${id}`);
        }
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        // toggle favorite logic here
    };
    
    return (
        <div
            onClick={handleCardClick}
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

                        <div className='flex flex-row flex-wrap gap-x-4 gap-y-1 items-center mt-1'>
                            {rentalAgency && (
                                <div
                                    className='text-s text-brand-primary font-semibold mt-1 cursor-pointer'
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleNavigate('/vehicle-agency');
                                    }}
                                >
                                    {rentalAgency}
                                </div>
                            )}
                            {vehicleLocation && (
                                <div className='text-xs text-gray-400'>
                                    {vehicleLocation}
                                </div>
                            )}
                        </div>
                        
                        
                        <div className='text-xs text-gray-400 mt-1'>
                            {seats && <span>{seats} seats</span>}
                            {transmission && <span> • {transmission}</span>}
                            {fuelType && <span> • {fuelType}</span>}
                        </div>
                    </div>

                    {/* Amenities with icons */}
                    <div className='flex gap-2 items-center flex-wrap mt-2 text-xs text-gray-600'>
                        {amenities?.slice(0, 3).map((item, index) => (
                            <span
                                key={index}
                                className='bg-gray-100 rounded-full px-3 py-1 border flex items-center gap-1'
                            >
                                {amenityIconMap[item] || null}
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
                            {tripCostData ? (
                                // Show trip cost information
                                <div>
                                    <p className='text-sm text-gray-400'>Trip Total Cost</p>
                                    <p className='text-lg font-semibold text-brand-primary'>
                                        LKR {tripCostData.cost.totalCost.toLocaleString()}
                                    </p>
                                    <div className='text-xs text-gray-500 mt-1'>
                                        <div>LKR {pricePerDay.toLocaleString()}/day × {tripCostData.trip.numberOfDays} days = LKR {tripCostData.cost.breakdown.dailyCost.toLocaleString()}</div>
                                        <div>LKR {pricePerKm}/km × {Math.round(tripCostData.distance.totalDistance)} km = LKR {tripCostData.cost.breakdown.distanceCost.toLocaleString()}</div>
                                        <div className='font-medium mt-1'>Total Distance: {Math.round(tripCostData.distance.totalDistance)} km</div>
                                    </div>
                                </div>
                            ) : (
                                // Show regular pricing
                                <div>
                                    <p className='text-sm text-gray-400'>Starting from</p>
                                    <p className='text-lg font-semibold text-brand-primary'>
                                        LKR {isSelected && driverOption === 'with' ? priceWithDriver.toLocaleString() : pricePerDay.toLocaleString()} / day
                                    </p>
                                    {pricePerKm && (
                                        <p className='text-xs text-gray-500'>
                                            + LKR {pricePerKm}/km
                                        </p>
                                    )}
                                    {isSelected && (
                                        <p className='text-xs text-content-secondary'>
                                            {driverOption === 'with' ? 'With driver included' : 'Self-drive only'}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        <div className='flex gap-2 w-1/2 cursor-pointer'>
                            <Tag title={`${rating} (${reviews})`} icon={star} />
                            <Tag
                                title={available ? "Available" : "Not Available"}
                                color={available ? "bg-success" : "bg-danger"}
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
    pricePerKm: PropTypes.number,
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
    isTourMode: PropTypes.bool,
    selectedVehicle: PropTypes.object,
    tripCostData: PropTypes.object,
};