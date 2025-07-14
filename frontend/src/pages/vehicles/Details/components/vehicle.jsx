import { useParams } from 'react-router-dom';
import { vehicleList } from '../../../../core/Lists/vehicles';
import { useEffect, useMemo, useState } from 'react';
import Main from '../../../../components/Main';
import Title from '../../../../components/Title';
import Breadcrumb from '../../../../components/Breadcrumb';
import FormatText from '../../../../components/FormatText';
import Border from '../../../../components/Border';
import { handleNavigate } from '../../../../core/constant';
import star from '../../../../assets/icons/star.svg';
import info from '../../../../assets/icons/info-circle.svg';
import Tag from '../../../hotels/components/Tag';

export default function Vehicle() {
    const [vehicle, setVehicle] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const matchVehicle = vehicleList.find((v) => v.id.toString() === id);
        setVehicle(matchVehicle || {});
    }, [id]);

    const breadcrumbItems = [
        { label: "Home", path: "/home" },
        { label: "Vehicles", path: "/vehicle-search" },
        { label: vehicle.name || "Vehicle", path: `/vehicle/${id}` },
    ];

    const amenityList = useMemo(() => {
        return vehicle.amenities && vehicle.amenities.map((amenity, index) => (
            <Title
                key={index}
                title={amenity || ''}
                size='text-[18px]'
                color='text-content-tertiary'
                font='font-[400]'
            />
        ));
    }, [vehicle.amenities]);

    return (
        <Main>
            <div>
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className='w-full flex h-[400px] gap-2 mt-5'>
                <div className='w-1/2 h-full rounded-[8px] overflow-hidden'>
                    {vehicle?.images?.[0] && (
                        <img
                            src={vehicle.images[0]}
                            alt={vehicle?.name || "Vehicle"}
                            className="h-full w-full object-cover"
                        />
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
            <div className='flex flex-row gap-10'>
                <div className='flex gap-2 mt-5'>
                    <Title title={vehicle.name || ''} />
                    <Title title={vehicle.location || ''} color='text-brand-secondary' />
                </div>
                <div className='flex gap-2 mt-5 cursor-pointer' onClick={() => handleNavigate(`/vehicle-agency/${id}`)}>
                    <Title title={vehicle.rentalAgency || ''} color='text-brand-primary' />
                </div>
                <div className='flex flex-between mt-4 p-2  w-1/3 rounded-lg  text-[15px]  leading-relaxed cursor-pointer'>

                    <Tag
                        title={vehicle.available ? "Available" : "Not Available"}
                        color={vehicle.available ? "bg-brand-primary" : "bg-danger"}
                        textColor="text-white"
                        icon={info}
                    />
                </div>
            </div>
            <div className='flex flex-row gap-5'>
                <div className='flex gap-2 mt-2 flex-wrap'>
                    {amenityList}
                </div>
                <div className='flex  w-1/5 cursor-pointer'>
                    <Tag title={`${vehicle.rating} (${vehicle.reviews})`} icon={star} />
                </div>

            </div>
            
            {/* Additional vehicle details */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 mt-4 text-[15px] text-gray-700'>
                <div>
                    <span className='font-semibold text-content-primary'>Type:</span>
                    <span className='ml-2'>{vehicle.type || '-'}</span>
                </div>
                <div>
                    <span className='font-semibold text-content-primary'>Brand:</span>
                    <span className='ml-2'>{vehicle.brand || '-'}</span>
                </div>
                <div>
                    <span className='font-semibold text-content-primary'>Model:</span>
                    <span className='ml-2'>{vehicle.model || '-'}</span>
                </div>
                <div>
                    <span className='font-semibold text-content-primary'>Seats:</span>
                    <span className='ml-2'>{vehicle.seats || '-'}</span>
                </div>
                <div>
                    <span className='font-semibold text-content-primary'>Transmission:</span>
                    <span className='ml-2'>{vehicle.transmission || '-'}</span>
                </div>
                <div>
                    <span className='font-semibold text-content-primary'>Fuel Type:</span>
                    <span className='ml-2'>{vehicle.fuelType || '-'}</span>
                </div>
                
                
            </div>
            {/* Vehicle Description */}
            <div className='mt-4 p-4  rounded-lg border text-[15px]  leading-relaxed'>
                <FormatText text={vehicle.about} />
            </div>
            <Border />
            <div className='flex justify-between items-center mt-4'>
                <div>
                    <p className='text-sm text-gray-400'>Starting from</p>
                    <p className='text-lg font-semibold text-brand-primary'>LKR {vehicle.pricePerDay} / day</p>
                </div>
                <div className='flex gap-2 w-1/3 cursor-pointer'>
                    
                    <Tag
                        title={vehicle.available ? "Book Now" : "Not Available"}
                        color={vehicle.available ? "bg-brand-primary" : "bg-danger"}
                        textColor="text-white"
                        icon={info}
                    />
                </div>
            </div>
            <Border />
            {/* You can add more vehicle-specific details here if needed */}
        </Main>
    );
}
