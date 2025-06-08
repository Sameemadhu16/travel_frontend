import { useEffect, useState } from 'react';
import Main from '../../../components/Main';
import Title from '../../../components/Title';
import { motion, AnimatePresence } from 'framer-motion';
import RegisterCard from './components/RegisterCard';

export default function Details() {
    const [currentTitle, setCurrentTitle] = useState('anything');
    const titles = [ 'anything', 'guides', 'hotels', 'vehicles' ];

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

    return (
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
                    <div className='w-3/4'>
                        <RegisterCard/>
                    </div>
                </div>
            </div>
        </Main>
    );
}