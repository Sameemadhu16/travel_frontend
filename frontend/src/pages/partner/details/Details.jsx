import { useEffect, useState } from 'react';
import Main from '../../../components/Main';
import Title from '../../../components/Title';
import { motion, AnimatePresence } from 'framer-motion';
import RegisterCard from './components/RegisterCard';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import BlurPage from '../../../components/BlurPage';
import { LuMouse } from "react-icons/lu";
import { FaAnglesDown } from "react-icons/fa6";
import review from '../../../assets/images/Review.png'
import puzzle from '../../../assets/images/Puzzle.png'
import search from '../../../assets/images/Search.png'

const features = [
    {
        id: 1,
        title: 'Create and Manage Your Profile',
        description: 'Easily set up and customize your professional profile to showcase your services, experience, and unique offerings.'
    },
    {
        id: 2,
        title: 'Add Services or Listings',
        description: 'Add hotels, vehicles, drivers, or experiences — depending on your business — and keep them updated anytime.'
    },
    {
        id: 3,
        title: 'Set Availability with a Calendar',
        description: 'Mark unavailable dates and manage your schedule easily to avoid overbookings and stay organized.'
    },
    {
        id: 4,
        title: 'Receive and Manage Requests',
        description: 'View service requests and respond quickly by accepting or rejecting based on your availability.'
    },
    {
        id: 5,
        title: 'Track Ratings and Reviews',
        description: 'Monitor feedback from users to build trust and continuously improve your service quality.'
    },
    {
        id: 6,
        title: 'Create Promotions or Ads',
        description: 'Run ads or special offers to attract more customers and boost your visibility within the platform.'
    },
    {
        id: 7,
        title: 'Review Service History',
        description: 'Look back at your past trips, bookings, or rentals to keep track of your business activity and performance.'
    }
];



export default function Details() {
    const [currentTitle, setCurrentTitle] = useState('anything');
    const titles = [ 'anything', 'guides', 'hotels', 'vehicles' ];
    const [blur,setBlur] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTitle(prevTitle => {
                const currentIndex = titles.indexOf(prevTitle);
                const nextIndex = (currentIndex + 1) % titles.length;
                return titles[nextIndex];
            });
        }, 3000); 
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setBlur(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <AnimatePresence>
            {blur && (
                <BlurPage>
                    <motion.div
                        className="w-full h-full flex flex-col items-center justify-end"
                        initial={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                        <Title
                            title="Scroll"
                            size="text-[20px]"
                            font="font-[500]"
                            color="text-content-secondary"
                        />
                        <LuMouse size={48} className="text-content-secondary" />
                        <FaAnglesDown size={36} className="text-content-secondary" />
                    </motion.div>
                </BlurPage>
            )}
        </AnimatePresence>
        <Main>
            <div className='flex w-full items-center'>
                <div className='w-1/2 h-[400px] flex flex-col items-start justify-center'>
                    <Title
                        title='List your'
                        size='text-[60px]'
                        font='font-[600]'
                    />
                    
                    <div className="relative h-[72px] ">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentTitle}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="absolute"
                            >
                                <Title
                                    title={currentTitle}
                                    size='text-[60px]'
                                    font='font-[600]'
                                    color='text-brand-primary'
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <Title
                        title='on travel.lk'
                        size='text-[60px]'
                        font='font-[600]'
                    />
                </div>
                <div className='flex items-center justify-center w-1/2'>
                    <div className='w-3/4 z-50'>
                        <RegisterCard/>
                    </div>
                </div>
            </div>

            {/*features */}
            <div className='w-full mt-36'>
                <Title
                    title='Host worry-free. We’ve got your back'
                    size='text-[48px]'
                    font='font-[600]'
                />
                <div className='w-full grid grid-cols-3 gap-5 items-start mt-10'>
                    <div className='flex flex-col gap-3'>
                        <Title
                            title='Your rental, your rules'
                            size='text-[24px]'
                            font='font-[600]'
                        />
                        <div className='flex gap-2 items-start'>
                            <IoMdCheckmarkCircleOutline size={24} className='text-success shrink-0 mt-1'/>
                            <Title
                                title='Accept or decline bookings with Request to Book'
                                size='text-[16px]'
                                font='font-[400]'
                            />
                        </div>
                        <div className='flex gap-2 items-start'>
                            <IoMdCheckmarkCircleOutline size={24} className='text-success shrink-0 mt-1'/>
                            <Title
                                title="Manage your guests' expectations by setting up clear house rules."
                                size='text-[16px]'
                                font='font-[400]'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Title
                            title='Get to know your guests'
                            size='text-[24px]'
                            font='font-[600]'
                        />
                        <div className='flex gap-2 items-start'>
                            <IoMdCheckmarkCircleOutline size={24} className='text-success shrink-0 mt-1'/>
                            <Title
                                title='Chat with your guests before accepting their stay with pre-booking messaging.*'
                                size='text-[16px]'
                                font='font-[400]'
                            />
                        </div>
                        <div className='flex gap-2 items-start'>
                            <IoMdCheckmarkCircleOutline size={24} className='text-success shrink-0 mt-1'/>
                            <Title
                                title="Access guest travel history insights."
                                size='text-[16px]'
                                font='font-[400]'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Title
                            title='What makes you unique'
                            size='text-[24px]'
                            font='font-[600]'
                        />
                        <div className='flex gap-2 items-start'>
                            <IoMdCheckmarkCircleOutline size={24} className='text-success shrink-0 mt-1'/>
                            <Title
                                title='Highlight your strengths, special offers, and services to attract the right customers.'
                                size='text-[16px]'
                                font='font-[400]'
                            />
                        </div>
                        <div className='flex gap-2 items-start'>
                            <IoMdCheckmarkCircleOutline size={24} className='text-success shrink-0 mt-1'/>
                            <Title
                                title="Create and manage ads or offers to reach more travelers and grow your bookings."
                                size='text-[16px]'
                                font='font-[400]'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full mt-36'>
                <Title
                    title='Simple to begin and stay ahead'
                    size='text-[48px]'
                    font='font-[600]'
                />
                <div className='w-full grid grid-cols-3 gap-5 items-start mt-10'>
                    <div className='flex flex-col gap-3 justify-center items-center'>
                        <div className='w-40 h-40'>
                            <img 
                                className='w-full h-full object-cover'
                                src={review} 
                                alt="review" />
                        </div>
                        <div className='flex flex-col items-center justify-center text-center'>
                            <Title
                                title='Import your property details'
                                size='text-[24px]'
                                font='font-[600]'
                            />
                            <Title
                                title='Seamlessly import your property information from other travel websites and avoid overbooking with calendar sync.'
                                size='text-[16px]'
                                font='font-[400]'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 justify-center items-center'>
                        <div className='w-40 h-40'>
                            <img 
                                className='w-full h-full object-cover'
                                src={puzzle} 
                                alt="review" />
                        </div>
                        <div className='flex flex-col items-center justify-center text-center'>
                            <Title
                                title='Start fast with review scores'
                                size='text-[24px]'
                                font='font-[600]'
                            />
                            <Title
                                title='Your review scores on other travel websites are converted and displayed on your property page before your first Booking.com guests leave their reviews.'
                                size='text-[16px]'
                                font='font-[400]'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 justify-center items-center'>
                        <div className='w-30 h-40'>
                            <img 
                                className='w-full h-full object-cover'
                                src={search} 
                                alt="review" />
                        </div>
                        <div className='flex flex-col items-center justify-center text-center'>
                            <Title
                                title='Stand out in the market'
                                size='text-[24px]'
                                font='font-[600]'
                            />
                            <Title
                                title='The "New to travel.lk" label helps you stand out in our search results.'
                                size='text-[16px]'
                                font='font-[400]'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Main>
        </>
        
    );
}