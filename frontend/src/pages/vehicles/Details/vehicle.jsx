import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { vehicleList } from '../../../core/Lists/vehicles';
import { useEffect, useState, useContext } from 'react';
import Main from '../../../components/Main';
import Title from '../../../components/Title';
import Breadcrumb from '../../../components/Breadcrumb';
import FormatText from '../../../components/FormatText';
import PrimaryButton from '../../../components/PrimaryButton';
import { FaCar, FaUsers, FaCogs, FaGasPump, FaUser } from 'react-icons/fa';
import FormContext from '../../../context/InitialValues';

export default function Vehicle() {
    const [vehicle, setVehicle] = useState({});
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const isTourSelectVehicle = location.pathname.includes('/tour/select-vehicle');
    const { formData, setFormData } = useContext(FormContext);
    
    const [driverOption, setDriverOption] = useState('without'); // 'with' or 'without'
    
    const isVehicleSelected = formData.selectedItems?.selectedVehicle?.id === id;
    
    // Calculate prices with/without driver
    const driverFee = vehicle.pricePerDay ? Math.round(vehicle.pricePerDay * 0.3) : 0; // 30% of vehicle price for driver
    const priceWithDriver = (vehicle.pricePerDay || 0) + driverFee;
    const priceWithoutDriver = vehicle.pricePerDay || 0;

    useEffect(() => {
        const matchVehicle = vehicleList.find((v) => v.id.toString() === id);
        setVehicle(matchVehicle || {});
    }, [id]);

    const breadcrumbItems = [
        { label: "Home", path: "/home" },
        { label: "Vehicles", path: isTourSelectVehicle ? "/tour/select-vehicle" : "/vehicle-search" },
        { label: vehicle.name || "Vehicle", path: isTourSelectVehicle ? `/tour/select-vehicle/${id}` : `/vehicle/${id}` },
    ];

    const handleReserve = () => {
        if (isTourSelectVehicle) {
            const vehicleData = {
                id: parseInt(id),
                name: vehicle.name,
                brand: vehicle.brand,
                model: vehicle.model,
                type: vehicle.type,
                pricePerDay: driverOption === 'with' ? priceWithDriver : priceWithoutDriver,
                basePrice: vehicle.pricePerDay,
                driverIncluded: driverOption === 'with',
                driverFee: driverOption === 'with' ? driverFee : 0,
                images: vehicle.images,
                amenities: vehicle.amenities,
                seats: vehicle.seats,
                transmission: vehicle.transmission,
                fuelType: vehicle.fuelType,
                rating: vehicle.rating,
                reviews: vehicle.reviews,
                rentalAgency: vehicle.rentalAgency,
                location: vehicle.location,
                about: vehicle.about,
                available: vehicle.available
            };
            
            // Update context with selected vehicle
            setFormData(prev => ({
                ...prev,
                selectedItems: {
                    ...prev.selectedItems,
                    selectedVehicle: vehicleData
                }
            }));
            
            navigate('/tour/complete-request');
        } else {
            // Regular vehicle booking flow
            localStorage.setItem('selectedVehicle', JSON.stringify(vehicle));
            navigate('/book-vehicle');
        }
    };

    const handleContinue = () => {
        navigate('/tour/complete-request');
    };

    return (
        <Main>
            <div>
                <Breadcrumb items={breadcrumbItems} />
            </div>
            
            <div className='border rounded-[8px] overflow-hidden pb-4 mt-5'>
                {/* Vehicle Images */}
                <div className='w-full flex h-[400px] gap-2'>
                    <div className='w-1/2 h-full rounded-[8px] overflow-hidden'>
                        {vehicle?.images?.[0] && (
                            <img src={vehicle.images[0]} alt={vehicle?.name || "Vehicle"} className="h-full w-full object-cover" />
                        )}
                    </div>
                    <div className='w-1/2 h-full grid grid-cols-2 gap-2'>
                        <div className='rounded-[8px] overflow-hidden'>
                            {vehicle?.images?.[1] && (
                                <img 
                                    src={vehicle.images[1]} 
                                    alt={vehicle?.name || "Vehicle"} 
                                    className="h-full w-full object-cover" 
                                />
                            )}
                        </div>
                        <div className='rounded-[8px] overflow-hidden'>
                            {vehicle?.images?.[2] && (
                                <img 
                                    src={vehicle.images[2]} 
                                    alt={vehicle?.name || "Vehicle"} 
                                    className="h-full w-full object-cover" 
                                />
                            )}
                        </div>
                        <div className='rounded-[8px] overflow-hidden'>
                            {vehicle?.images?.[3] && (
                                <img 
                                    src={vehicle.images[3]} 
                                    alt={vehicle?.name || "Vehicle"} 
                                    className="h-full w-full object-cover" 
                                />
                            )}
                        </div>
                        <div className='rounded-[8px] overflow-hidden'>
                            {vehicle?.images?.[4] && (
                                <img 
                                    src={vehicle.images[4]} 
                                    alt={vehicle?.name || "Vehicle"} 
                                    className="h-full w-full object-cover" 
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Vehicle Details */}
                <div className='px-4'>
                    <div className='mt-5'>
                        <Title
                            title={`${vehicle.brand || ''} ${vehicle.model || ''} `}
                            size='text-[24px]'
                        />
                        <Title
                            title={vehicle.type || ''}
                            size='text-[16px]'
                            color='text-content-secondary'
                        />
                    </div>

                    {/* Vehicle Specifications */}
                    <div className='w-full flex flex-wrap gap-4 mt-4'>
                        {vehicle.seats && (
                            <div className='flex gap-1 items-center'>
                                <FaUsers className='text-brand-primary'/>
                                <span className="text-brand-primary">{vehicle.seats} Seats</span>
                            </div>
                        )}
                        {vehicle.transmission && (
                            <div className='flex gap-1 items-center'>
                                <FaCogs className='text-brand-primary'/>
                                <span className="text-brand-primary">{vehicle.transmission}</span>
                            </div>
                        )}
                        {vehicle.fuelType && (
                            <div className='flex gap-1 items-center'>
                                <FaGasPump className='text-brand-primary'/>
                                <span className="text-brand-primary">{vehicle.fuelType}</span>
                            </div>
                        )}
                        {vehicle.type && (
                            <div className='flex gap-1 items-center'>
                                <FaCar className='text-brand-primary'/>
                                <span className="text-brand-primary">{vehicle.type}</span>
                            </div>
                        )}
                    </div>

                    {/* Amenities */}
                    {vehicle.amenities && vehicle.amenities.length > 0 && (
                        <div className='w-full flex flex-wrap gap-2 mt-4'>
                            {vehicle.amenities.map((amenity, index) => (
                                <span 
                                    key={index}
                                    className='bg-brand-light text-brand-primary px-3 py-1 rounded-full text-sm border border-brand-secondary'
                                >
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Description */}
                    <div className='flex flex-wrap mt-4'>
                        <FormatText text={vehicle.about}/>
                    </div>

                    {/* Rental Agency & Location */}
                    {(vehicle.rentalAgency || vehicle.location) && (
                        <div className='flex gap-4 mt-4 text-sm'>
                            {vehicle.rentalAgency && (
                                <div>
                                    <span className='font-semibold text-content-primary'>Rental Agency: </span>
                                    <span className='text-brand-primary font-medium'>{vehicle.rentalAgency}</span>
                                </div>
                            )}
                            {vehicle.location && (
                                <div>
                                    <span className='font-semibold text-content-primary'>Location: </span>
                                    <span className='text-content-secondary'>{vehicle.location}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Rating */}
                    {vehicle.rating && (
                        <div className='flex items-center gap-2 mt-2'>
                            <div className='flex items-center gap-1'>
                                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                </svg>
                                <span className='font-semibold'>{vehicle.rating}</span>
                                <span className='text-content-secondary'>({vehicle.reviews} reviews)</span>
                            </div>
                        </div>
                    )}

                    {/* Price and Booking */}
                    <div className='w-full mt-6'>
                        {isTourSelectVehicle ? (
                            <div className='space-y-4'>
                                {/* Driver Options for Tour Mode */}
                                <div className='border rounded-lg p-4'>
                                    <h3 className='text-lg font-semibold text-content-primary mb-3'>
                                        Choose your option:
                                    </h3>
                                    <div className='grid grid-cols-2 gap-4'>
                                        {/* Self-drive Option */}
                                        <div 
                                            onClick={() => setDriverOption('without')}
                                            className={`cursor-pointer border-2 rounded-lg p-4 transition ${
                                                driverOption === 'without' 
                                                    ? 'border-brand-primary bg-brand-primary/5' 
                                                    : 'border-border-light hover:border-brand-primary/50'
                                            }`}
                                        >
                                            <div className='flex flex-col items-center text-center gap-3'>
                                                <FaCar className={`text-2xl ${driverOption === 'without' ? 'text-brand-primary' : 'text-content-secondary'}`} />
                                                <div>
                                                    <h4 className='font-semibold text-content-primary'>Self-drive</h4>
                                                    <p className='text-sm text-content-secondary'>Drive yourself</p>
                                                </div>
                                                <div className='text-center'>
                                                    <div className='text-2xl font-bold text-brand-primary'>
                                                        LKR {priceWithoutDriver.toLocaleString()}
                                                    </div>
                                                    <div className='text-sm text-content-secondary'>/day</div>
                                                </div>
                                                {driverOption === 'without' && (
                                                    <div className='flex items-center gap-1 text-brand-primary text-sm font-medium'>
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                                        </svg>
                                                        Selected
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* With Driver Option */}
                                        <div 
                                            onClick={() => setDriverOption('with')}
                                            className={`cursor-pointer border-2 rounded-lg p-4 transition ${
                                                driverOption === 'with' 
                                                    ? 'border-brand-primary bg-brand-primary/5' 
                                                    : 'border-border-light hover:border-brand-primary/50'
                                            }`}
                                        >
                                            <div className='flex flex-col items-center text-center gap-3'>
                                                <FaUser className={`text-2xl ${driverOption === 'with' ? 'text-brand-primary' : 'text-content-secondary'}`} />
                                                <div>
                                                    <h4 className='font-semibold text-content-primary'>With Driver</h4>
                                                    <p className='text-sm text-content-secondary'>Professional driver included</p>
                                                </div>
                                                <div className='text-center'>
                                                    <div className='text-2xl font-bold text-brand-primary'>
                                                        LKR {priceWithDriver.toLocaleString()}
                                                    </div>
                                                    <div className='text-sm text-content-secondary'>/day</div>
                                                    <div className='text-xs text-warning'>
                                                        +LKR {driverFee.toLocaleString()} driver fee
                                                    </div>
                                                </div>
                                                {driverOption === 'with' && (
                                                    <div className='flex items-center gap-1 text-brand-primary text-sm font-medium'>
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                                        </svg>
                                                        Selected
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons for Tour Mode */}
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            vehicle.available 
                                                ? 'bg-success text-white' 
                                                : 'bg-danger text-white'
                                        }`}>
                                            {vehicle.available ? 'Available' : 'Not Available'}
                                        </span>
                                        {isVehicleSelected && (
                                            <span className='px-3 py-1 bg-brand-primary text-white rounded-full text-sm font-medium'>
                                                Selected for Tour
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className='flex gap-3'>
                                        <button
                                            onClick={handleContinue}
                                            className="px-6 py-2 bg-surface-secondary text-content-primary rounded-lg font-semibold hover:bg-surface-tertiary transition"
                                        >
                                            Continue without Vehicle
                                        </button>
                                        <button
                                            onClick={handleReserve}
                                            disabled={!vehicle.available}
                                            className={`px-6 py-2 rounded-lg font-semibold transition ${
                                                vehicle.available
                                                    ? 'bg-brand-primary text-white hover:bg-warning'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            {isVehicleSelected ? 'Update Selection' : 'Select This Vehicle'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Regular Mode - Original Layout */
                            <div>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-baseline gap-2'>
                                        <Title
                                            title={`LKR ${vehicle.pricePerDay?.toLocaleString() || 0}`}
                                            size='text-[24px]'
                                            font='font-bold'
                                            color='text-brand-primary'
                                        />
                                        <span className='text-content-secondary'>/day</span>
                                    </div>
                                    
                                    <div className='flex items-center gap-2'>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            vehicle.available 
                                                ? 'bg-success text-white' 
                                                : 'bg-danger text-white'
                                        }`}>
                                            {vehicle.available ? 'Available' : 'Not Available'}
                                        </span>
                                    </div>
                                </div>

                                {/* Reserve Button */}
                                <div className='w-1/4 mt-4'>
                                    <PrimaryButton
                                        text={vehicle.available ? 'Reserve Vehicle' : 'Not Available'}
                                        type={'button'}
                                        onClick={vehicle.available ? handleReserve : undefined}
                                        disabled={!vehicle.available}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Main>
    );
}