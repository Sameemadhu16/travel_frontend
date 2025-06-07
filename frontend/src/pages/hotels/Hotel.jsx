import { useParams } from 'react-router-dom';
import { hotelList } from '../../core/constant';
import { useEffect, useState } from 'react';
import Main from '../../components/Main';
import Title from '../../components/Title';
import Breadcrumb from '../../components/Breadcrumb';

export default function Hotel() {
    const [hotel,setHotel] = useState({});
    const {id} = useParams();
    
    useEffect(()=>{
        const matchHotel = hotelList.find((hotel) => hotel.id.toString() === id);
        setHotel(matchHotel);
    },[id]);

    const breadcrumbItems = [
        { label: "Home", path: "/home" },
        { label: "Hotels", path: "/hotels-search" },
        { label: hotel.name || "Hotel", path: `/hotel/${id}` },
    ];


    const formatAboutText = (text) => {
        if (!text) return null;

        // Split by **heading** pattern
        const parts = text.split(/\*\*(.*?)\*\*/g);

        return parts.map((part, index) => {
            // Odd indexes are headings (due to split behavior)
            if (index % 2 === 1) {
            return (
                <strong key={index} className="block font-bold my-2">
                    {part}
                </strong>
            );
            }
            // Even indexes are normal text (skip empty strings)
            else if (part.trim()) {
            return (
                <p key={index} className="mb-3">
                    {part}
                </p>
            );
            }
            return null;
        });
    };

    return (
        <Main>
            <div>
                <Breadcrumb 
                    items={breadcrumbItems} 
                />
            </div>
            <div className='w-full flex h-[400px] gap-2 mt-5'>
                <div className='w-1/2 h-full rounded-[8px] overflow-hidden'>
                    {hotel?.images?.[0] && (
                        <img src={hotel.images[0]} alt={hotel?.name || "Hotel"} className="h-full w-full object-cover" />
                    )}
                </div>
                <div className='w-1/2 h-full grid grid-cols-2 gap-2'>
                    <div className='rounded-[8px] overflow-hidden'>
                        {hotel?.images?.[1] && (
                            <img src={hotel.images[1]} alt={hotel?.name || "Hotel"} className="h-full w-full object-cover" />
                        )}
                    </div>
                    <div className='rounded-[8px] overflow-hidden'>
                        {hotel?.images?.[2] && (
                            <img src={hotel.images[2]} alt={hotel?.name || "Hotel"} className="h-full w-full object-cover" />
                        )}
                    </div>
                    <div className='rounded-[8px] overflow-hidden'>
                        {hotel?.images?.[3] && (
                            <img src={hotel.images[3]} alt={hotel?.name || "Hotel"} className="h-full w-full object-cover" />
                        )}
                    </div>
                    <div className='rounded-[8px] overflow-hidden'>
                        {hotel?.images?.[4] && (
                            <img src={hotel.images[4]} alt={hotel?.name || "Hotel"} className="h-full w-full object-cover" />
                        )}
                    </div>
                </div>
            </div>
            <div className='flex gap-2 mt-5'>
                <Title
                    title={hotel.name || ''}
                />
                <Title
                    title={hotel.location || ''}
                    color='text-brand-primary'
                />
            </div>
            <div className='flex flex-wrap'>
                {formatAboutText(hotel.about)}
            </div>
            <div className='flex gap-2'>
                {
                    hotel.amenities && hotel.amenities.map((amenity,index)=>(
                        <Title
                            key={index}
                            title={amenity || ''}
                            size='text-[20px]'
                            color='text-brand-primary'
                        />
                    ))
                }
            </div>
        </Main>
    )
}
