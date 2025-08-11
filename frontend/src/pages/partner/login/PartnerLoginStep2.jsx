import { motion, AnimatePresence } from 'framer-motion'
import {useDispatch} from 'react-redux'
import Main from '../../../components/Main'
import { useCallback, useContext, useState } from 'react'
import InputField from '../../../components/InputField';
import PrimaryButton from '../../../components/PrimaryButton';
import Title from '../../../components/Title';
import { navigateTo } from '../../../core/navigateHelper';
import Border from '../../../components/Border';
import { getRequest, handleSelect } from '../../../core/service';
import { formValidator } from '../../../core/validation';
import TermsAndPrivacy from '../components/TermsAndPrivacy';
import TextLink from '../components/TextLink';
import { showToastMessage } from '../../../utils/toastHelper';
import FormContext from '../../../context/InitialValues';
import { handleFirebaseLogin } from '../../../core/Firebase/service';
import Spinner from '../../../components/Spinner';
import { registerStart, registerSuccess } from '../../../redux/slices/authSlice';

export default function PartnerLoginStep2() {
    const { formData, setFormData } = useContext(FormContext);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        dispatch(registerStart());
        try {
            setLoading(true);
            const error = formValidator(formData, ['password']);
            setError(error);
            if (error === null) {
                const user = await handleFirebaseLogin(formData.email, formData.password);
                if (user && user.emailVerified) {
                    const userData = await getRequest(`/api/users/public/${user.uid}`);
                    dispatch(
                        registerSuccess({
                        user: {
                            email: user.email,
                            uid: user.uid,
                            data: userData 
                        },
                        token: user.accessToken,
                        }),
                    );
                    {localStorage.removeItem('formData')}
                    
                    if(userData.role === 'guide'){
                        navigateTo('/guide-dashboard');
                    }else if(userData.role === 'agency'){
                        navigateTo('/partner/dashboard')
                    }else if(userData.role === 'hotel'){
                        navigateTo('/hotel/dashboard')
                    }else if(userData.role === 'admin'){
                        navigateTo('/admin/dashboard')
                    }else{
                        navigateTo('/home')
                    };
                    showToastMessage('success', 'Welcome back! You’ve logged in successfully.');
                }else if (user && !user.emailVerified) {
                    showToastMessage('warning', 'Your email is not verified. Please check your inbox or resend the verification email.');
                } else {
                    showToastMessage('error', 'Login failed. Please try again.');
                    dispatch(registerFailure('Login failed'));
                }
            }
        } catch (e) {
            showToastMessage('error', 'Registration failed. Please try again.');
            navigateTo('/partner-login/step-1')
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

