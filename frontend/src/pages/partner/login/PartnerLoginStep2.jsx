import { motion, AnimatePresence } from 'framer-motion'
import Main from '../../../components/Main'
import { useCallback, useState } from 'react'
import InputField from '../../../components/InputField';
import PrimaryButton from '../../../components/PrimaryButton';
import Navigate from '../../../components/Navigate';
import Title from '../../../components/Title';
import { navigateTo } from '../../../core/navigateHelper';
import Border from '../../../components/Border';
import SecondaryButton from '../../../components/SecondaryButton';
import { handleSelect } from '../../../core/service';
import { formValidator } from '../../../core/validation';
import TermsAndPrivacy from '../components/TermsAndPrivacy';

export default function PartnerLoginStep2() {

    const [formData,setFormData] = useState({
            password: '',
        });
        const [error,setError]=useState({});

    const handleSubmit = useCallback((e)=>{
        e.preventDefault();
        try{
            const error = formValidator(formData);
            setError(error)
            if(error === null){
                navigateTo('/partner-login-step-2');
            }
        }catch(e){
            console.log(e)
        }
    },[formData]);
    return (
        <AnimatePresence>
            <motion.div
                key={''}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="relative w-full overflow-x-hidden"
            >
                <Main>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center">
                        <div className='flex flex-col w-full md:w-2/5'>
                            <Title
                                title="Enter your password"
                                size="text-[24px]"
                                font="font-[600]"
                            />
                            <div className='mt-5'>
                                <Title 
                                    title="Please enter your Booking.com password for"
                                    size="text-[16px]"
                                    font="font-[400]"
                                />
                                <Title 
                                    title="sachithavintha35@gmail.com"
                                    size="text-[16px]"
                                    font="font-[600]"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-2/5 flex flex-col gap-4 mt-5">
                            <InputField
                                label='Password'
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={e => handleSelect(setFormData, 'password', e.target.value)}
                                placeholder='password'
                                error={error?.errors?.password}
                                icon={true}
                            />
                            <PrimaryButton
                                text="Sign in"
                                type={'submit'}
                            />
                            <Navigate path='' className='w-full py-3 flex justify-center hover:bg-brand-accent rounded-[8px] cursor-pointer mt-10'>
                                <Title
                                    title="Forgotten your password?"
                                    size="text-[18px]"
                                    font="font-[500]"
                                    color='text-brand-primary'
                                />
                            </Navigate>
                            <Border/>
                            <TermsAndPrivacy/>
                        </div>
                    </form>
                </Main>
            </motion.div>
        </AnimatePresence>
    )
}
