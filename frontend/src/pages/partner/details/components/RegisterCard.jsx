import { MdDone } from "react-icons/md";
import Title from '../../../../components/Title'
import PrimaryButton from "../../../../components/PrimaryButton";
import Navigate from "../../../../components/Navigate";
import { useMemo } from "react";
import Border from "../../../../components/Border";

const textList = [
    { icon: MdDone, text: '45% of hosts get their first booking within a week' },
    { icon: MdDone, text: 'Choose instant bookings or Request to Book' },
    { icon: MdDone, text: "We'll facilitate payments for you" },
]

export default function RegisterCard() {

    const texts = useMemo(()=>{
        return textList.map((text, index)=>{
            const Icon = text.icon
            return (
                <div key={index} className='flex gap-10 items-start'>
                    <Icon size={24} className="text-success"/>
                    <Title
                        title={text.text}
                        size='text-[16px]'
                        font='font-[400]'
                    />
                </div>
            )
        })
    },[]);

    return (
        <div className='w-full border-4 rounded-[16px] bg-background-base border-brand-primary'>
            <div className='p-4'>
                <Title
                    title='Register for free'
                    size='text-[24px]'
                    font='font-[600]'
                />
                <div className="flex flex-col gap-2 mt-5">
                    {texts}
                </div>
            </div>
            <Border/>

            <div className="w-full mt-5 flex items-center justify-center">
                <Navigate path="/partner-register-step-1" className="w-1/2">
                    <PrimaryButton text="Get start now"/>
                </Navigate>
            </div>

            <Border/>
            <div className="flex gap-2 mt-5 p-4">
                <Title
                    title='Already have an account?'
                    size='text-[20px]'
                    font='font-[600]'
                />
                <Navigate path="/" className="hover:underline text-brand-primary">
                    <Title
                        title='Log in'
                        size='text-[20px]'
                        font='font-[600]'
                        color="text-brand-primary"
                    />
                </Navigate>
            </div>
        </div>
    )
}
