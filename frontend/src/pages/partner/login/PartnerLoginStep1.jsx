import { motion, AnimatePresence } from 'framer-motion'
import Main from '../../../components/Main'
import { useCallback, useContext, useEffect, useState } from 'react'
import Title from '../../../components/Title';
import { handleSelect } from '../../../core/service';
import InputField from '../../../components/InputField';
import PrimaryButton from '../../../components/PrimaryButton';
import Border from '../../../components/Border';
import AnyQuestion from '../components/AnyQuestion';
import SecondaryButton from '../../../components/SecondaryButton';
import { navigateTo } from '../../../core/navigateHelper';
import { formValidator } from '../../../core/validation';
import TextLink from '../components/TextLink';
import FormContext, { loginPartnerAccountForm } from '../../../context/InitialValues';
import Navigate from '../../../components/Navigate';

export default function PartnerLoginStep1() {
    const [error,setError]=useState({});
    const { formData, setFormData } = useContext(FormContext);

    useEffect(() => {
        // Clear form data from localStorage and reset context state
        localStorage.removeItem('formData');
        setFormData(loginPartnerAccountForm.formData);
    }, [setFormData]);

    const handleSubmit = useCallback((e)=>{
        e.preventDefault();
        try{
            const error = formValidator(formData,['email']);
            setError(error)
            if(error === null){
                navigateTo('/partner-login/step-2');
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
                            title="Enter your account to get started"
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
                            <TextLink
                                title='Having trouble signing in?'
                                path='/partner-details-forgot'
                            />
                            <div className='w-full items-center justify-center flex gap-2'>
                                <Title 
                                    title="Not registered yet?"
                                    size="text-[14px]"
                                    font="font-[400]"
                                />
                                <Navigate path="/" className="hover:underline text-brand-primary">
                                    <Title 
                                        title="Register now"
                                        size="text-[14px]"
                                        font="font-[400]"
                                        color="text-brand-primary"
                                    />   
                                </Navigate>
                            </div>
                            <Border/>
                            <AnyQuestion/>

                            <Border/>

                            {/* <SecondaryButton
                                text="Create a Partner Account"
                                type={'button'}
                                onClick={() => navigateTo('/partner-register/step-1')}
                            />
                            <Border/> */}

                        </div>
                    </form>
                </Main>
            </motion.div>
        </AnimatePresence>
    )
}
