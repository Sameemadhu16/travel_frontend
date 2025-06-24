import { FaCar, FaUser } from 'react-icons/fa'
import Main from '../../../components/Main'
import Title from '../../../components/Title'
import { IoIosBed } from 'react-icons/io'
import { useMemo } from 'react';
import PropertyCard from './components/PropertyCard';

const options = [
    {
        id: 1,
        name: 'Guide',
        icon: FaUser,
        path: '/',
        description: 'As a Guide, you can offer your local expertise to travelers, create custom tours, and earn money by sharing your knowledge.'
    },
    {
        id: 2,
        name: 'Stays',
        icon: IoIosBed,
        path: '/hotel-registration',
        description: 'As a Host, you can list your property, manage bookings, and provide travelers with a comfortable place to stay.'
    },
    {
        id: 3,
        name: 'Vehicle rentals',
        icon: FaCar,
        path: '/vehicle-search',
        description: 'As a Vehicle Owner, you can rent out your cars, bikes, or other vehicles to travelers when you\'re not using them.'
    },
];

export default function ChooseProperty() {

    const optionList = useMemo(() => {  
        return options.map((option) => (
            <PropertyCard property={option}/>
        ))
    },[])
    return (
        <Main>
            <div className='flex flex-col gap-5 w-5/6 mt-10'>
                <Title
                    title='List your property on travel.lk and start welcoming guests in no time!'
                    size='text-[32px]'
                    font='font-[600]'
                />
                <Title
                    title='To get started, choose the type of property you want to list on travel.lk'
                    size='text-[24px]'
                    font='font-[400]'
                />
            </div>
            <div className='w-3/4 grid grid-rows-1 sm:grid-cols-3 gap-3 mt-5 justify-center'>
                {optionList}
            </div>
        </Main>
    )
}
