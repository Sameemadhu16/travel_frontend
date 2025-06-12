import { motion, AnimatePresence } from 'framer-motion'
import Main from '../../../components/Main'
import Title from '../../../components/Title'
import PrimaryButton from '../../../components/PrimaryButton'
import Navigate from '../../../components/Navigate'
import Border from '../../../components/Border'
import SecondaryButton from '../../../components/SecondaryButton'

export default function ForgotDetailsStep1() {
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
                        <div className='flex flex-col w-full md:w-2/5'>
                            <Title
                                title="Having trouble signing in?"
                                size="text-[24px]"
                                font="font-[600]"
                            />
                            <Title
                                title="We're here to help. Below are some options to help get you back on track."
                                size="text-[16px]"
                                font="font-[400]"
                            />
                            <div className="flex flex-col gap-4 mt-5">
                                <PrimaryButton
                                    text="Reset your password"
                                    type={'button'}
                                    // onClick={...} // Add navigation if needed
                                />
                                <PrimaryButton
                                    text="Recover your username"
                                    type={'button'}
                                    // onClick={...} // Add navigation if needed
                                />
                                <Navigate path='/' className='w-full py-3 flex justify-center hover:bg-brand-accent rounded-[8px] cursor-pointer mt-10'>
                                    <Title
                                        title="Back to sign in"
                                        size="text-[18px]"
                                        font="font-[500]"
                                        color='text-brand-primary'
                                    />
                                </Navigate>
                                <Border />
                                <SecondaryButton
                                    text="Contact support"
                                    type={'button'}
                                    // onClick={...} // Add navigation if needed
                                />
                                <Border />
                            </div>
                        </div>
                    </div>
                </Main>
            </motion.div>
        </AnimatePresence>
    )
}
