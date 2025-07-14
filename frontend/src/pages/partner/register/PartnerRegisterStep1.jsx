import { useContext, useEffect, useState } from "react";
import Main from "../../../components/Main";
import Message from "./components/Message";
import Title from "../../../components/Title";
import InputField from "../../../components/InputField";
import { navigateTo } from "../../../core/navigateHelper";
import PrimaryButton from "../../../components/PrimaryButton";
import SecondaryButton from "../../../components/SecondaryButton";
import Border from "../../../components/Border";
import { motion, AnimatePresence } from "framer-motion";
import AnyQuestion from "../components/AnyQuestion";
import FormContext, { registerPartnerAccountForm } from "../../../context/InitialValues";
import { useSelector } from 'react-redux';
import { USER_ROLES } from "../../../core/constant";

export default function PartnerRegisterStep1() {

    const [message,setMessage] = useState(true);
    const { formData, setFormData } = useContext(FormContext);
    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        // Clear form data from localStorage and reset context state
        localStorage.removeItem('formData');
        setFormData(registerPartnerAccountForm.formData);

        const email = user.data.email;
        const id = user.data.id;
        const role = USER_ROLES.PARTNER;

        setFormData((prev)=>({
            ...prev,
            id:id,
            role: role,
            email,
        }))
    }, [setFormData]);

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
                            <div className="w-full flex flex-col justify-start mt-8 gap-2">
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
                                    onClick={() => navigateTo('/partner-register/step-2')}
                                />
                                <Border/>
                                <AnyQuestion/>
                                <Border/>
                            </div>
                        </div>
                    </div>
                </Main>
            </motion.div>
        </AnimatePresence>
    )
}
