import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import Main from '../../../components/Main'
import Title from '../../../components/Title'
import TermsAndPrivacy from '../components/TermsAndPrivacy'
import InputField from '../../../components/InputField'
import PrimaryButton from '../../../components/PrimaryButton'
import { handleSelect } from '../../../core/service'
import { formValidator } from '../../../core/validation'
import Border from '../../../components/Border'
import { navigateTo } from '../../../core/navigateHelper'
import TextLink from '../components/TextLink'

export default function ForgotPassword() {
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
                //need email verify sending function call here
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
                                title="Forgotten your password?"
                                size="text-[24px]"
                                font="font-[600]"
                            />
                            <Title
                                title="Please confirm your username and we'll send you a link to reset your password."
                                size="text-[16px]"
                                font="font-[400]"
                            />
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
