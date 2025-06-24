import { useState, useCallback } from 'react';
import Main from '../components/Main';
import Title from '../components/Title';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import Border from '../components/Border';
import { formValidator } from '../core/validation';
import { navigateTo } from '../core/navigateHelper';
import TermsAndPrivacy from './partner/components/TermsAndPrivacy';
import { showToastMessage } from '../utils/toastHelper';
import { handleSelect, postRequest } from '../core/service';
import { handleFirebaseRegister } from '../core/Firebase/service';
import { USER_ROLES } from '../core/constant';
import { getFirebaseErrorMessage } from '../core/Firebase/validation';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { registerFailure, registerStart, registerSuccess } from '../redux/slices/authSlice';

export default function TravelerRegister() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = useCallback( async (e) => {
        e.preventDefault();
        try {
            dispatch(registerStart());
            const error = formValidator(formData);
            setErrors(error);

            if (error === null) {
                const { uid, code, accessToken } = await handleFirebaseRegister(formData.email, formData.password);
                if (code) {
                    const errorMessage = getFirebaseErrorMessage(code);
                    showToastMessage('error', errorMessage); 
                    dispatch(registerFailure());
                    return; // Stop execution; do not proceed to backend registration
                }

                formData.docId = uid;
                formData.role = USER_ROLES.TRAVELER;

                await postRequest('/api/users/register', formData);
                dispatch(registerSuccess({
                    user: formData,
                    token: accessToken
                }))
                showToastMessage('success', 'Traveler account created successfully!');
                //navigateTo('/partner-login/step-1');
            } else {
                dispatch(registerFailure());
            }
        } catch (e) {
            console.error("Unexpected error:", e);
            dispatch(registerFailure());
            showToastMessage('error', 'Registration failed. Please try again.');
        }
    }, [formData]);

    return (
        <Main>
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center">
                <div className="w-full md:w-2/5 flex flex-col justify-start mt-5 gap-2">
                    <Title
                        title="Traveler Registration"
                        size="text-[24px]"
                        font="font-[600]"
                    />
                    <Title
                        title="Create your traveler account to book and manage your trips."
                        size="text-[16px]"
                        font="font-[400]"
                    />
                    <div className="flex flex-col gap-4 mt-5">
                        <InputField
                            label='Email'
                            type='text'
                            name='email'
                            value={formData.email}
                            onChange={e => handleSelect(setFormData, 'email', e.target.value)}
                            placeholder='Enter your email'
                            error={errors?.errors?.email}
                        />
                        <InputField
                            label='Password'
                            type='password'
                            name='password'
                            value={formData.password}
                            onChange={e => handleSelect(setFormData, 'password', e.target.value)}
                            placeholder='Enter your password'
                            error={errors?.errors?.password}
                            icon={true}
                        />
                        <InputField
                            label='Confirm Password'
                            type='password'
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={e => handleSelect(setFormData, 'confirmPassword', e.target.value)}
                            placeholder='Re-enter your password'
                            error={errors?.errors?.confirmPassword}
                            icon={true}
                        />
                        <PrimaryButton
                            text="Register"
                            type={'submit'}
                        />
                        <Border />
                        <TermsAndPrivacy />
                    </div>
                </div>
            </form>
            {
                loading && (
                    <Spinner/>
                )
            }
        </Main>
    );
}
