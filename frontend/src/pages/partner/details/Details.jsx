import { useEffect, useMemo, useState } from 'react';
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
import { testimonials } from '../../../core/Lists/reviews';
import ReviewCard from './components/ReviewCard';
import PrimaryButton from '../../../components/PrimaryButton';
import { navigateTo } from '../../../core/navigateHelper';

const titles = [ 'anything', 'guides', 'hotels', 'vehicles' ];

export default function Details() {
    const [currentTitle, setCurrentTitle] = useState('anything');
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

    const reviews = useMemo(()=>{
        return testimonials.map((review)=>(
            <div key={review.id}>
                <ReviewCard
                    review={review}
                />
            </div>
        ))
    },[]);

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
                <div className='flex flex-col md:flex-row w-full items-center'>
                    <div className='w-1/2 h-[400px] md:flex hidden md:flex-col items-start justify-center'>
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
                    <div className='flex items-center justify-center w-full md:w-1/2'>
                        <div className='w-full md:w-3/4 z-50'>
                            <RegisterCard/>
                        </div>
                    </div>
                </div>
            </Main>
            <div className='w-full h-full bg-background-muted mt-10 py-24'>
                <Main>
                    {/*features */}
                    <div className='w-full'>
                        <Title
                            title='Host worry-free. We’ve got your back'
                            size='text-[32px] md:text-[48px]'
                            font='font-[600]'
                        />
                        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-5 items-start mt-10'>
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
                                        title='Chat with your guests before accepting their 
                                            stay with pre-booking messaging.*'
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
                                        title='Highlight your strengths, special offers, and services to
                                            attract the right customers.'
                                        size='text-[16px]'
                                        font='font-[400]'
                                    />
                                </div>
                                <div className='flex gap-2 items-start'>
                                    <IoMdCheckmarkCircleOutline size={24} className='text-success shrink-0 mt-1'/>
                                    <Title
                                        title="Create and manage ads or offers to reach more 
                                            travelers and grow your bookings."
                                        size='text-[16px]'
                                        font='font-[400]'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 md:w-1/4 mt-10">
                        <PrimaryButton 
                            text="Host with us today"
                            type={'button'}
                            onClick={() => navigateTo('/partner-register-step-1')}
                        />
                    </div>
                </Main>
            </div>
            <Main>
                <div className='w-full mt-24'>
                    <Title
                        title='Simple to begin and stay ahead'
                        size='text-[32px] md:text-[48px]'
                        font='font-[600]'
                    />
                    <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-5 items-start mt-10'>
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
                                    title='Seamlessly import your property information from 
                                        other travel websites and avoid overbooking with calendar sync.'
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
                                    title='Your review scores on other travel websites are converted 
                                        and displayed on your property page before your first Booking.com 
                                        guests leave their reviews.'
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
                <div className="w-1/2 md:w-1/4 mt-10">
                    <PrimaryButton
                        text="Get started today"
                        type={'button'}
                        onClick={() => navigateTo('/partner-register-step-1')}
                    />
                </div>
            </Main>
            <div className='mt-24 w-full h-full py-10 bg-background-muted'>
                <Main>
                    <Title
                        title='What hosts like you say'
                        size='text-[32px] md:text-[48px]'
                        font='font-[600]'
                    />
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-2 mt-4'>
                        {reviews}
                    </div>
                    <div className="w-1/2 md:w-1/4 mt-10">
                        <PrimaryButton
                            text="Join hosts like you"
                            type={'button'}
                            onClick={() => navigateTo('/partner-register-step-1')}
                        />
                    </div>
                </Main>
            </div>
        </>
        
    );
}