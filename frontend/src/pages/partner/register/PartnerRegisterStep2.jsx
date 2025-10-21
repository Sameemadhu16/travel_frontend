import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useContext, useEffect, useState } from 'react'
import Main from '../../../components/Main'
import Title from '../../../components/Title'
import { handleSelect, putRequest } from '../../../core/service'
import InputField from '../../../components/InputField'
import PrimaryButton from '../../../components/PrimaryButton'
import Border from '../../../components/Border'
import { formValidator } from '../../../core/validation'
import TermsAndPrivacy from '../components/TermsAndPrivacy'
import { showToastMessage } from '../../../utils/toastHelper'
import FormContext from '../../../context/InitialValues'
import { useDispatch, useSelector } from 'react-redux'
import { registerFailure, registerStart, registerSuccess, setUserData } from '../../../redux/slices/authSlice'
import Spinner from '../../../components/Spinner'
import { navigateTo } from '../../../core/navigateHelper'

export default function PartnerRegisterStep2() {

    const { formData, setFormData } = useContext(FormContext);
    const [errors,setErrors] = useState({});
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback( async (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);
        
        try{
            setLoading(true);
            const error = formValidator(formData);
            console.log('Validation errors:', error);
            setErrors(error);

            if(error === null){
                console.log('No validation errors, submitting to API...');
                const res = await putRequest(`/api/users/${formData.id}`, formData);
                console.log('API response:', res);
                
                // Check if response is successful (status 200-299 or has data)
                if(res) {
                    dispatch(setUserData(formData));
                    showToastMessage('success', 'You have successfully created your partner account.');
                    console.log('Navigating to choose-property...');
                    navigateTo('/choose-property');
                } else {
                    console.error('API response was empty or falsy:', res);
                    showToastMessage('error', 'Failed to update user data.');
                }
            } else {
                console.log('Form has validation errors, not submitting');
                showToastMessage('error', 'Please fill in all required fields correctly.');
            }
        }catch(e){
            console.error('Error during submission:', e);
            showToastMessage('error', e.message || 'Registration failed. Please try again.');
        }finally {
            setLoading(false);
        }
    },[formData, dispatch]);

    return (
        <AnimatePresence>
            <motion.div
                key="partner-register-step-2"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="relative w-full overflow-x-hidden"
            >
                <Main>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center ">
                        <div className="w-full md:w-2/5 flex flex-col justify-start mt-5 gap-2">
                            <Title 
                                title="Contact details"
                                size="text-[24px]"
                                font="font-[600]"
                            />
                            <Title 
                                title="Your full name and phone number are needed to ensure the security of your travel.lk account."
                                size="text-[16px]"
                                font="font-[400]"
                            />
                            <div className="flex flex-col gap-4 mt-5">
                                <InputField
                                    label='First name'
                                    type='text'
                                    name='firstName'
                                    value={formData.firstName || ''}
                                    onChange={e => handleSelect(setFormData, 'firstName', e.target.value)}
                                    placeholder=''
                                    error={errors?.errors?.firstName}
                                />
                                <InputField
                                    label='Last name'
                                    type='text'
                                    name='lastName'
                                    value={formData.lastName || ''}
                                    onChange={e => handleSelect(setFormData, 'lastName', e.target.value)}
                                    placeholder=''
                                    error={errors?.errors?.lastName}
                                />
                                <InputField
                                    label='Phone number'
                                    type='text'
                                    name='phoneNumber'
                                    value={formData.phoneNumber || ''}
                                    onChange={e => handleSelect(setFormData, 'phoneNumber', e.target.value)}
                                    placeholder='+9477123123'
                                    error={errors?.errors?.phoneNumber}
                                />
                                <PrimaryButton
                                    text="Next"
                                    type={'submit'}
                                />
                                <Border/>
                                <TermsAndPrivacy/>
                            </div>
                        </div>
                    </form>
                </Main>
            </motion.div>
            {
                loading && (
                    <Spinner/>
                )
            }
        </AnimatePresence>
    )
}
