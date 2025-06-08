import { FaUser, FaCar } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import Title from "./Title";
import Navigate from './Navigate'

const options = [
    {
        id: 1,
        name: 'Guide',
        icon: FaUser,
        path: '/'
    },
    {
        id: 2,
        name: 'Stays',
        icon: IoIosBed,
        path: '/hotels-search'
    },
    {
        id: 3,
        name: 'Car rentals',
        icon: FaCar,
        path: '/'
    },
]
export default function ReserveOptions() {
    return (
        <div className="flex gap-8 items-center">
            {
                options.map((option)=>{
                    const Icon = option.icon
                    return (
                        <Navigate key={option.id} path={option.path} 
                            className="p-2 hover:bg-surface-tertiary flex gap-1 items-center rounded-[8px]">
                            <Icon size={18}/>
                            <Title
                                title={option.name}
                                size='text-[20px]'
                                font='font-[500]'
                            />
                        </Navigate>
                    )
                })
            }
        </div>
    )
}
