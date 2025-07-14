import anuradhapura from '../../assets/places/4.webp';
import adamasPeak from '../../assets/places/2.jpg';
import downSouth from '../../assets/places/3.jpg';
import hikka from '../../assets/places/6.jpg';
import Main from '../../components/Main';
import { useMemo, useRef } from 'react';
import SearchContainer from '../../components/SearchContainer';
import Title from '../../components/Title';
import PrimaryButton from '../../components/PrimaryButton';
import { useSelector } from 'react-redux';

const places = [
    {name:'Anuradhapura',image:anuradhapura},
    {name:"Adam's peak",image:adamasPeak},
    {name:'Down South',image:downSouth},
    {name:'Hikkaduwa',image:hikka},
];

export default function Home() {

    const containerRef = useRef();
    const { user } = useSelector((state) => state.auth);
console.log(user)
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
        
    },[]);

    const handleImageClick = (index) => {
        const container = containerRef.current;
        const scrollAmount = container.offsetWidth * index;
        container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    };
    
    const popularPlaces = useMemo(()=>{
        return places.map((place,index)=>(
            <div 
                key={index} 
                className='w-[400px] h-[300px] rounded-[10px] overflow-hidden flex-shrink-0 cursor-pointer'
                onClick={() => handleImageClick}
            >
                <img 
                    src={place.image} 
                    alt="place" 
                    className='h-full w-full object-cover'
                />
            </div>
        ))
    },[]);

    return (
        <>
            <Main>
                <div className='relative flex gap-2 w-full mt-4'>
                    {placesContainer}
                    <div className='absolute top-60 left-1/2 transform -translate-x-1/2 w-4/6'>
                        <SearchContainer/>
                    </div>
                </div>
                <div className='mt-10'>
                    <Title title={'Popular Places'}/>
                    <div 
                        ref={containerRef}
                        className='flex overflow-x-scroll scrollbar-hide space-x-4 w-full'>
                        {popularPlaces}
                    </div>
                </div>
            </Main>
            <div className='w-full h-[600px] bg-orange-100 mt-20 flex'>
                <Main>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col justify-center w-1/2'>
                            <Title 
                                title='Plan Your Perfect Trip with AI'
                                size='text-[60px]'
                                font='font-[600]'
                            />
                            <Title 
                                title='Discover personalized itineraries, real-time 
                                    recommendations, and hassle-free travel planning powered by 
                                    artificial intelligence'
                                size='text-[24px]'
                                font='font-[400]'
                            />
                            <div className='w-1/2 mt-6'>
                                <PrimaryButton text='Create AI Trip'/>
                            </div>
                        </div>
                        <div className='relative w-1/2 flex gap-3 justify-end'>
                            <div 
                                className='-mt-11 w-[300px] h-[500px] rounded-[10px] overflow-hidden flex-shrink-0 z-10'
                            >
                                <img 
                                    src={anuradhapura} 
                                    alt="place" 
                                    className='h-full w-full object-cover'
                                />
                            </div>
                            <div 
                                className='mt-20 w-[300px] h-[500px] rounded-[10px] overflow-hidden flex-shrink-0'
                            >
                                <img 
                                    src={downSouth} 
                                    alt="place" 
                                    className='h-full w-full object-cover'
                                />
                            </div>
                        </div>
                    </div>
                </Main>
            </div>
        </>
        
    )
}
