import { RiErrorWarningLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import Title from "../../../../components/Title";

export default function Message({setMessage}) {

    const handleClose = () => {
        setMessage(false);
    }

    return (
        <div className="border border-border-dark p-4 flex items-start justify-between gap-4 bg-background-muted rounded-[8px]">
            <RiErrorWarningLine size={24}/>
            <div className="w-3/4 flex flex-wrap ">
                <Title
                    title="We’ve completed the signup form using your account information as you’re logged in to your Booking.com account."
                    size="text-[16px]"
                    font="font-[400]"
                />
            </div>
            <IoCloseSharp onClick={handleClose} className='cursor-pointer' size={24}/>
        </div>
    )
}
