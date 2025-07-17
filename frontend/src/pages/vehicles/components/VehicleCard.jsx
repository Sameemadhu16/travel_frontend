import Title from '../../../components/Title';
import info from '../../../assets/icons/info-circle.svg';
import star from '../../../assets/icons/star.svg';
import heart from '../../../assets/icons/Heart.svg';
import heartFill from '../../../assets/icons/Heart-fill.svg';
import Tag from '../../hotels/components/Tag';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { handleNavigate } from '../../../core/constant';
import { useTourContext } from '../../../context/TourContext';
import { useContext, useState } from 'react';
// Add icon imports for amenities
import { FaSnowflake, FaBluetooth, FaCarBattery, FaMapMarkedAlt, FaCamera, FaMusic, FaCogs, FaChair, FaPlug, FaSun, FaRoad, FaGasPump, FaUser, FaCar } from "react-icons/fa";
import FormContext from '../../../context/InitialValues';

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
}) {
    const location = useLocation();
    const { formData, setFormData } = useContext(FormContext);
    const [showDriverOptions, setShowDriverOptions] = useState(false);
    const [driverOption, setDriverOption] = useState('without'); // 'with' or 'without'
    
    const isSelected = selectedVehicle?.id === id;
    
    // Calculate prices with/without driver
    const driverFee = Math.round(pricePerDay * 0.3); // 30% of vehicle price for driver
    const priceWithDriver = pricePerDay + driverFee;
    const priceWithoutDriver = pricePerDay;
    
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

    const handleVehicleSelection = (e) => {
        e.stopPropagation();
        if (!tourContext) return;
        
        if (isSelected) {
            setSelectedVehicle(null);
            setShowDriverOptions(false);
        } else {
            setShowDriverOptions(true);
        }
    };

    const handleDriverOptionSelect = (option) => {
        const vehicleData = {
            id,
            name,
            brand,
            model,
            type,
            pricePerDay: option === 'with' ? priceWithDriver : priceWithoutDriver,
            basePrice: pricePerDay,
            driverIncluded: option === 'with',
            driverFee: option === 'with' ? driverFee : 0,
            images,
            amenities,
            seats,
            transmission,
            fuelType,
            rating,
            reviews,
            rentalAgency,
            location: vehicleLocation,
            about,
            available
        };
        
        setSelectedVehicle(vehicleData);
        setDriverOption(option);
        setShowDriverOptions(false);
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
                            <p className='text-sm text-gray-400'>Starting from</p>
                            <p className='text-lg font-semibold text-brand-primary'>
                                LKR {isSelected && driverOption === 'with' ? priceWithDriver.toLocaleString() : pricePerDay.toLocaleString()} / day
                            </p>
                            {isSelected && (
                                <p className='text-xs text-content-secondary'>
                                    {driverOption === 'with' ? 'With driver included' : 'Self-drive only'}
                                </p>
                            )}
                        </div>
                        
                        {isTourMode ? (
                            <div className='flex flex-col items-end gap-2 w-1/2'>
                                <div className='flex gap-2 w-full'>
                                    <Tag title={`${rating} (${reviews})`} icon={star} />
                                    <Tag
                                        title={available ? "Available" : "Not Available"}
                                        color={available ? "bg-green-100" : "bg-red-100"}
                                        textColor={available ? "text-green-600" : "text-red-600"}
                                        icon={info}
                                    />
                                </div>
                                
                                {/* Vehicle Selection Button */}
                                {!isSelected && !showDriverOptions && (
                                    <button
                                        onClick={handleVehicleSelection}
                                        disabled={!available}
                                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                                            available
                                                ? 'bg-white text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-white'
                                                : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed'
                                        }`}
                                    >
                                        Select Vehicle
                                    </button>
                                )}
                                
                                {/* Driver Options */}
                                {showDriverOptions && (
                                    <div className='flex flex-col gap-2 p-3 bg-surface-secondary rounded-lg border'>
                                        <p className='text-sm font-medium text-content-primary'>Choose option:</p>
                                        <div className='flex gap-2'>
                                            <button
                                                onClick={() => handleDriverOptionSelect('without')}
                                                className='flex flex-col items-center gap-1 px-3 py-2 bg-white border-2 border-brand-primary text-brand-primary rounded-lg hover:bg-brand-primary hover:text-white transition text-xs'
                                            >
                                                <FaCar className="text-base" />
                                                <span>Self-drive</span>
                                                <span className='font-bold'>LKR {priceWithoutDriver.toLocaleString()}</span>
                                            </button>
                                            <button
                                                onClick={() => handleDriverOptionSelect('with')}
                                                className='flex flex-col items-center gap-1 px-3 py-2 bg-white border-2 border-brand-primary text-brand-primary rounded-lg hover:bg-brand-primary hover:text-white transition text-xs'
                                            >
                                                <FaUser className="text-base" />
                                                <span>With driver</span>
                                                <span className='font-bold'>LKR {priceWithDriver.toLocaleString()}</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Selected State */}
                                {isSelected && (
                                    <div className='flex items-center gap-2'>
                                        <div className='flex items-center gap-1 px-3 py-1 bg-brand-primary text-white rounded-lg text-sm'>
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                            </svg>
                                            Selected
                                        </div>
                                        <button
                                            onClick={handleVehicleSelection}
                                            className='px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition'
                                        >
                                            Change
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className='flex gap-2 w-1/2 cursor-pointer'>
                                <Tag title={`${rating} (${reviews})`} icon={star} />
                                <Tag
                                    title={available ? "Available" : "Not Available"}
                                    color={available ? "bg-brand-primary" : "bg-danger"}
                                    textColor="text-white"
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
    isTourMode: PropTypes.bool,
    selectedVehicle: PropTypes.object,
};
