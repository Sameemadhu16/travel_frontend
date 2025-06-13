import { AnimatePresence, motion } from 'framer-motion'
import Main from '../../../components/Main'
import Title from '../../../components/Title'
import TextLink from '../components/TextLink'
import Border from '../../../components/Border'
import TermsAndPrivacy from '../components/TermsAndPrivacy'
import PrimaryButton from '../../../components/PrimaryButton'

export default function ForgotUsername() {

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
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className='flex flex-col gap-4 w-full md:w-2/5'>
                            <Title
                                title="Contact local support team"
                                size="text-[24px]"
                                font="font-[600]"
                            />
                            <Title
                                title="Unfortunately, we are unable to help you retrieve your username, please contact your local support team."
                                size="text-[16px]"
                                font="font-[400]"
                            />
                            <PrimaryButton
                                text="Contact support"
                                type={'button'}
                            />
                            <TextLink
                                title='Back to sign-in'
                                path='/partner-login-step-1'
                            />
                            <Border/>
                            <TermsAndPrivacy/>
                        </div>
                    </div>
                </Main>
            </motion.div>
        </AnimatePresence>
    )
}
