import { useCallback, useState } from "react";
import Main from "../../../components/Main";
import Message from "./components/Message";
import Title from "../../../components/Title";
import InputField from "../../../components/InputField";
import { handleSelect } from "../../../core/service";
import { formValidator } from "../../../core/validation";
import { navigateTo } from "../../../core/navigateHelper";
import PrimaryButton from "../../../components/PrimaryButton";
import SecondaryButton from "../../../components/SecondaryButton";
import Border from "../../../components/Border";
import Navigate from "../../../components/Navigate";
import { motion, AnimatePresence } from "framer-motion";
import AnyQuestion from "../components/AnyQuestion";

export default function PartnerRegisterStep1() {

    const [message,setMessage] = useState(true);
    const formData = {
        email: 'sachithavinta@gmail.com'
    }

    
    return (
        <AnimatePresence>
            <motion.div
                key={''}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="relative w-full overflow-x-hidden"
            >
                <Main>
                    <div className="w-full flex flex-col items-center justify-center ">
                        <div className="w-full md:w-2/5">
                            <div className="h-[100px]">
                                {
                                    message && (
                                        <Message setMessage={setMessage}/>
                                    )
                                }
                            </div>
                            <div className="w-full flex flex-col justify-start mt-5 gap-2">
                                <Title 
                                    title="Create your partner account"
                                    size="text-[24px]"
                                    font="font-[600]"
                                />
                                <Title 
                                    title="Create an account to list and manage your property."
                                    size="text-[16px]"
                                    font="font-[400]"
                                />
                            </div>
                            <div className="flex flex-col gap-4 mt-5">
                                <InputField
                                    label='Email'
                                    type='text'
                                    name='email'
                                    value={formData.email}
                                    placeholder=''
                                    disabled={true}
                                />
                                <PrimaryButton
                                    text="Continue"
                                    type={'button'}
                                    onClick={() => navigateTo('/partner-register-step-2')}
                                />
                                <Border/>
                                <AnyQuestion/>
                                <SecondaryButton
                                    text="Sign in"
                                    type={'button'}
                                    onClick={() => navigateTo('/partner-login-step-1')}
                                />
                                <Border/>
                            </div>
                        </div>
                    </div>
                </Main>
            </motion.div>
        </AnimatePresence>
    )
}
