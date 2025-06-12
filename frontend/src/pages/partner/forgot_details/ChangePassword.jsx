import { AnimatePresence, motion } from 'framer-motion'
import InputField from '../../../components/InputField'
import Title from '../../../components/Title'
import Main from '../../../components/Main'
import PrimaryButton from '../../../components/PrimaryButton'
import TextLink from '../components/TextLink'
import Border from '../../../components/Border'
import { useCallback, useState } from 'react'
import { navigateTo } from '../../../core/navigateHelper'
import { formValidator } from '../../../core/validation'
import TermsAndPrivacy from '../components/TermsAndPrivacy'
import { handleSelect } from '../../../core/service'
import { showToastMessage } from '../../../utils/toastHelper'

export default function ChangePassword() {

    const [formData,setFormData] = useState({
            password: '',
            confirmPassword: '',
    });
    const [error,setError]=useState({});

    const handleSubmit = useCallback((e)=>{
        e.preventDefault();
        try{
            const error = formValidator(formData);
            setError(error)
            if(error === null){
                showToastMessage('success','Your password has been reset.')
                navigateTo('/partner-login-step-1')
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
                        <div className='flex flex-col gap-4 w-full md:w-2/5'>
                            <Title
                                title="Change password"
                                size="text-[24px]"
                                font="font-[600]"
                            />
                            <Title
                                title="Add new password and confirm it"
                                size="text-[16px]"
                                font="font-[400]"
                            />
                            <InputField
                                label='New Password'
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={e => handleSelect(setFormData, 'password', e.target.value)}
                                placeholder='password'
                                error={error?.errors?.password}
                                icon={true}
                            />
                            <InputField
                                label='Confirm password'
                                type='password'
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={e => handleSelect(setFormData, 'confirmPassword', e.target.value)}
                                placeholder='Confirm password'
                                error={error?.errors?.confirmPassword}
                                icon={true}
                            />
                            <PrimaryButton
                                text="Send reset link"
                                type={'submit'}
                            />
                            <TextLink
                                title='Forgotten your username?'
                                path='/partner-forgot-username'
                            />
                            <Border/>
                            <TermsAndPrivacy/>
                        </div>
                    </form>
                </Main>
            </motion.div>
        </AnimatePresence>
    )
}
