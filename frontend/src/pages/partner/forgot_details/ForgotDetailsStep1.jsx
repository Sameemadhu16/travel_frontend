import { motion, AnimatePresence } from 'framer-motion'
import Main from '../../../components/Main'
import Title from '../../../components/Title'
import Navigate from '../../../components/Navigate'
import Border from '../../../components/Border'
import { FiLock } from "react-icons/fi";
import { FaAngleRight, FaUserCircle } from "react-icons/fa";
import { useMemo } from 'react'
import { IoMdLogOut } from 'react-icons/io'
import TermsAndPrivacy from '../components/TermsAndPrivacy'

const options = [
    { 
        id: 1,
        name: 'Forgot your password?',
        icon: FiLock,
        path: '/partner-forgot-password',
    },
    { 
        id: 2,
        name: 'Forgot your username',
        icon: FaUserCircle,
        path: '/partner-forgot-username',
    },
    { 
        id: 3,
        name: 'Go to sign-in',
        icon: IoMdLogOut,
        path: '/partner-login-step-1',
    },
]

export default function ForgotDetailsStep1() {

    const optionList = useMemo(()=>{
        return options.map((option)=>{
            const Icon = option.icon;
            return (
                <Navigate key={option.id} path={option.path} className='w-full flex flex-col gap-2 hover:underline text-brand-primary'>
                    <div className='w-full  flex justify-between items-center'>
                        <div className='flex items-center gap-3'>
                            <Icon size={24}/>
                            <Title
                                title={option.name}
                                size='text-[16px]'
                                font='font-[400]'
                                color='text-brand-primary'
                            />
                        </div>
                        <div>
                            <FaAngleRight size={24}/>
                        </div>
                    </div>
                    <Border/>
                </Navigate>
            )
        })
    },[])
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
                            <div className='w-full flex items-center flex-col gap-4 mt-10 mb-10'>
                                {optionList}
                            </div>
                            <TermsAndPrivacy/>
                        </div>
                    </div>
                </Main>
            </motion.div>
        </AnimatePresence>
    )
}
