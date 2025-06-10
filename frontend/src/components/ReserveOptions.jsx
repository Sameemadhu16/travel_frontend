import { FaUser, FaCar } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import Title from "./Title";
import Navigate from './Navigate'
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

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
        name: 'Vehicle rentals',
        icon: FaCar,
        path: '/vehicle-search'
    },
]
export default function ReserveOptions() {
    const location = useLocation();

    const optionMap = useMemo(()=>{
        return options.map((option)=>{
            const Icon = option.icon;
            const isActive = location.pathname === option.path;
            return (
                <Navigate
                    key={option.id}
                    path={option.path}
                    className={`p-3 hover:bg-surface-tertiary flex gap-1 items-center rounded-[32px] ${
                        isActive ? "bg-surface-tertiary border" : ""
                    }`}
                >
                    <Icon size={18}/>
                    <Title
                        title={option.name}
                        size='text-[20px]'
                        font='font-[500]'
                    />
                </Navigate>
            )
        })
    },[location.pathname]);

    return (
        <div className="flex gap-8 items-center">
            { optionMap}
        </div>
    )
}
