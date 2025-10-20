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
import { registerStart, registerSuccess, registerFailure } from '../../../redux/slices/authSlice';
import { getHotelByUserDocId } from '../../../api/hotelService';

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
                    // Fetch user data from backend API using Firebase UID
                    let userData = await getRequest(`/api/users/public/${user.uid}`);
                    
                    // If user data is not found in backend, use mock data based on email
                    if (!userData || !userData.id) {
                        console.log('User data not found in backend, using mock data for:', user.email);
                        
                        // Create mock user data based on email
                        if (user.email.includes('hotel') || user.email.includes('ceylon')) {
                            userData = {
                                id: Math.floor(Math.random() * 10000),
                                created_at: new Date().toISOString(),
                                doc_id: user.uid,
                                email: user.email,
                                first_name: 'Hotel',
                                gender: 'm',
                                last_name: 'Partner',
                                role: 'partner'
                            };
                        } else if (user.email.includes('guide')) {
                            userData = {
                                id: Math.floor(Math.random() * 10000),
                                created_at: new Date().toISOString(),
                                doc_id: user.uid,
                                email: user.email,
                                first_name: 'Tour',
                                gender: 'm',
                                last_name: 'Guide',
                                role: 'partner'
                            };
                        } else if (user.email.includes('admin')) {
                            userData = {
                                id: Math.floor(Math.random() * 10000),
                                created_at: new Date().toISOString(),
                                doc_id: user.uid,
                                email: user.email,
                                first_name: 'Admin',
                                gender: 'm',
                                last_name: 'User',
                                role: 'admin'
                            };
                        } else {
                            // Default traveler
                            userData = {
                                id: Math.floor(Math.random() * 10000),
                                created_at: new Date().toISOString(),
                                doc_id: user.uid,
                                email: user.email,
                                first_name: user.email.split('@')[0],
                                gender: 'm',
                                last_name: 'User',
                                role: 'traveler'
                            };
                        }
                    }
                    
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
                   
                    // Navigate based on user role and partner type
                    if (userData.role === 'admin') {
                        showToastMessage('success', 'Welcome back Admin!');
                        navigateTo('/admin/dashboard');
                    } else if (userData.role === 'partner') {
                        // Check what type of partner (hotel, guide, or vehicle agency)
                        try {
                            // Try to fetch hotel data
                            const hotelData = await getHotelByUserDocId(user.uid);
                            if (hotelData && hotelData.id) {
                                showToastMessage('success', 'Welcome back to your hotel dashboard!');
                                navigateTo(`/hotel/dashboard/${hotelData.id}`);
                            }
                        } catch (hotelError) {
                            // If no hotel found, check if it's a guide
                            console.log('No hotel found for user, checking for guide:', hotelError.message || hotelError);
                            try {
                                const guideData = await getRequest(`/api/guides/docId/${user.uid}`);
                                if (guideData && guideData.id) {
                                    showToastMessage('success', 'Welcome back Guide!');
                                    navigateTo('/guide-dashboard');
                                }
                            } catch (guideError) {
                                // If no guide found, assume it's a vehicle agency
                                console.log('No guide found for user, defaulting to vehicle agency:', guideError.message || guideError);
                                showToastMessage('success', 'Welcome back Partner!');
                                navigateTo('/partner/dashboard');
                            }
                        }
                    } else if (userData.role === 'traveler') {
                        showToastMessage('success', 'Welcome back!');
                        navigateTo('/home');
                    } else {
                        showToastMessage('success', 'Welcome back!');
                        navigateTo('/home');
                    }
                } else if (user && !user.emailVerified) {
                    showToastMessage('warning', 'Your email is not verified. Please check your inbox or resend the verification email.');
                } else {
                    showToastMessage('error', 'Login failed. Please try again.');
                    dispatch(registerFailure('Login failed'));
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            showToastMessage('error', 'Login failed. Please check your credentials and try again.');
            dispatch(registerFailure('Login failed'));
        } finally {
            setLoading(false);
        }
    }, [formData, dispatch]);

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

