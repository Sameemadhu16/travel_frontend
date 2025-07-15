import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { vehicleList } from '../../../../core/Lists/vehicles';
import { useEffect, useMemo, useState } from 'react';
import Main from '../../../../components/Main';
import Title from '../../../../components/Title';
import Breadcrumb from '../../../../components/Breadcrumb';
import FormatText from '../../../../components/FormatText';
import PrimaryButton from '../../../../components/PrimaryButton';
import { FaCar, FaUsers, FaCogs, FaGasPump } from 'react-icons/fa';

export default function Vehicle() {
    const [vehicle, setVehicle] = useState({});
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const matchVehicle = vehicleList.find((v) => v.id.toString() === id);
        setVehicle(matchVehicle || {});
    }, [id]);

    const breadcrumbItems = [
        { label: "Home", path: "/home" },
        { label: "Vehicles", path: "/vehicle-search" },
        { label: vehicle.name || "Vehicle", path: `/vehicle/${id}` },
    ];

    const handleReserve = () => {
        // Store selected vehicle data
        localStorage.setItem('selectedVehicle', JSON.stringify(vehicle));
        
        // Check if current path includes tour/select-vehicle
        if (location.pathname.includes('/tour/select-vehicle')) {
            // Tour booking flow - go to booking summary
            navigate('/tour/complete-request');
        } else {
            // Regular vehicle booking flow
            navigate('/book-vehicle');
        }
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
                    <div className='w-full flex items-center justify-between mt-6'>
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
            </div>
        </Main>
    );
}
