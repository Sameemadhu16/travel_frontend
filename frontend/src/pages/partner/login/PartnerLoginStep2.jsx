import { motion, AnimatePresence } from 'framer-motion'
import Main from '../../../components/Main'
import { useCallback, useContext, useState } from 'react'
import InputField from '../../../components/InputField';
import PrimaryButton from '../../../components/PrimaryButton';
import Title from '../../../components/Title';
import { navigateTo } from '../../../core/navigateHelper';
import Border from '../../../components/Border';
import { handleSelect } from '../../../core/service';
import { formValidator } from '../../../core/validation';
import TermsAndPrivacy from '../components/TermsAndPrivacy';
import TextLink from '../components/TextLink';
import { showToastMessage } from '../../../utils/toastHelper';
import FormContext from '../../../context/InitialValues';
import { handleFirebaseLogin } from '../../../core/Firebase/service';
import Spinner from '../../../components/Spinner';

export default function PartnerLoginStep2() {
    const { formData, setFormData } = useContext(FormContext);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const error = formValidator(formData, ['password']);
            setError(error);
            if (error === null) {
                const user = await handleFirebaseLogin(formData.email, formData.password);
                if (user) {
                    navigateTo('/home');
                    showToastMessage('success', 'Welcome back! You’ve logged in successfully.');
                }
            }
        } catch (e) {
            console.error("Unexpected error:", e);
            showToastMessage('error', 'Registration failed. Please try again.');
        }finally{
            setLoading(false);
        }
    }, [formData]);

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
                                    title={formData.email}
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
                                value={formData.password || ''}
                                onChange={e => handleSelect(setFormData, 'password', e.target.value)}
                                placeholder='password'
                                error={error?.errors?.password}
                                icon={true}
                            />
                            <PrimaryButton
                                text="Sign in"
                                type={'submit'}
                            />
                            <TextLink
                                title='Forgotten your password?'
                                path='/partner-for-forgot-password'
                            />
                            <Border/>
                            <TermsAndPrivacy/>
                        </div>
                    </form>
                </Main>
                {
                    loading && (
                        <Spinner/>
                    )
                }
            </motion.div>
        </AnimatePresence>
    )
}

