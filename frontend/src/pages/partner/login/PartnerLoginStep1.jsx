import { motion, AnimatePresence } from 'framer-motion'
import Main from '../../../components/Main'
import { useCallback, useState } from 'react'
import Title from '../../../components/Title';
import { handleSelect } from '../../../core/service';
import InputField from '../../../components/InputField';
import PrimaryButton from '../../../components/PrimaryButton';
import Navigate from '../../../components/Navigate';
import Border from '../../../components/Border';
import AnyQuestion from '../components/AnyQuestion';
import SecondaryButton from '../../../components/SecondaryButton';
import { navigateTo } from '../../../core/navigateHelper';
import { formValidator } from '../../../core/validation';

export default function PartnerLoginStep1() {

    const [formData,setFormData] = useState({
        email: '',
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
                        <Title
                            title="Sign in to manage your property"
                            size="text-[24px]"
                            font="font-[600]"
                        />
                        <div className="w-full md:w-2/5 flex flex-col gap-4 mt-5">
                            <InputField
                                label='Account Email'
                                type='text'
                                name='email'
                                value={formData.email}
                                onChange={e => handleSelect(setFormData, 'email', e.target.value)}
                                placeholder='Also known as username'
                                error={error?.errors?.email}
                            />
                            <PrimaryButton
                                text="Next"
                                type={'submit'}
                            />
                            <Navigate path='/' className='w-full py-3 flex justify-center hover:bg-brand-accent rounded-[8px] cursor-pointer mt-10'>
                                <Title
                                    title="Having trouble signing in?"
                                    size="text-[18px]"
                                    font="font-[500]"
                                    color='text-brand-primary'
                                />
                            </Navigate>
                            <Border/>
                            <AnyQuestion/>
                            <SecondaryButton
                                text="Create a Partner Account"
                                type={'button'}
                                onClick={() => navigateTo('/partner-register-step-1')}
                            />
                            <Border/>
                        </div>
                    </form>
                </Main>
            </motion.div>
        </AnimatePresence>
    )
}
