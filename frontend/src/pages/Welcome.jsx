import Main from '../components/Main';
import anuradhapura from './../assets/places/4.webp';
import adamasPeak from './../assets/places/2.jpg';
import downSouth from './../assets/places/3.jpg';
import hikka from './../assets/places/6.jpg';
import { useMemo } from 'react';
import SearchContainer from '../components/SearchContainer';

const places = [
    {name:'Anuradhapura',image:anuradhapura},
    {name:"Adam's peak",image:adamasPeak},
    {name:'Down South',image:downSouth},
    {name:'Hikkaduwa',image:hikka},
]

export default function Welcome() {

    const placesContainer = useMemo(()=>{
        return places.map((place,index)=>(
                <div key={index} className='w-1/4 h-[600px] rounded-[8px] overflow-hidden relative'>
                    <img 
                        src={place.image} 
                        alt="place" 
                        className='h-full w-full object-cover'
                    />
                    <div className='absolute inset-0 flex items-end justify-center bg-black/40'>
                        <h2 className='mb-5 text-white text-xl font-semibold'>{place.name}</h2>
                    </div>
                </div>
            ))
        
    },[places]);

    return (
        <Main>
            <div className='relative flex flex-row gap-2 w-full mt-4'>
                {placesContainer}
                <div className='absolute top-60 left-1/2 transform -translate-x-1/2 w-4/6'>
                    <SearchContainer/>
                </div>
            </div>
        </Main>
    )
}
