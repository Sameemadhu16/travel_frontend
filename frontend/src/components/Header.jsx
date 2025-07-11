import Main from './Main'
import Title from '../components/Title'
import room from '../assets/rooms/room1.png'
import ReserveOptions from './ReserveOptions'
import Navigate from './Navigate'
import { useState, useRef, useEffect } from 'react';

export default function Header() {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const menuRef = useRef(null);

    // Close menu on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        }
        if (showProfileMenu) {
            document.addEventListener("mousedown", handleClickOutside);
            // Add blur to main content
            const mainContent = document.getElementById('main-content-blur');
            if (mainContent) mainContent.classList.add('blur-sm');
        } else {
            const mainContent = document.getElementById('main-content-blur');
            if (mainContent) mainContent.classList.remove('blur-sm');
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            const mainContent = document.getElementById('main-content-blur');
            if (mainContent) mainContent.classList.remove('blur-sm');
        };
    }, [showProfileMenu]);

    return (
        <Main>
            <div className='flex justify-between items-center mt-2'>
                <div>
                    <Title
                        title='travel.lk'
                        size='text-[28px]'
                        font='font-[600]'
                    />
                </div>
                <div className='flex gap-1 items-center'>
                    <Navigate 
                        path={'/partner-details'} 
                        className='p-2 hover:bg-surface-tertiary cursor-pointer rounded-[8px]'
                    >
                        <Title
                            title='List your property'
                            size='text-[16px]'
                            font='font-[500]'
                        />
                    </Navigate>
                    <div className='relative flex items-center gap-2 p-2 hover:bg-surface-tertiary cursor-pointer rounded-[8px]'>
                        <div
                            className='h-[40px] w-[40px] border-2 border-brand-primary rounded-full overflow-hidden'
                            onClick={() => setShowProfileMenu((v) => !v)}
                        >
                            <img src={room} alt="room" className='h-full w-full object-cover'/>
                        </div>
                        <div className='flex flex-col' onClick={() => setShowProfileMenu((v) => !v)}>
                            <Title
                                title='Sachith'
                                size='text-[16px]'
                                font='font-[600]'
                            />
                            <Title
                                title='Level 1'
                                size='text-[14px]'
                                font='font-[300]'
                            />
                        </div>
                        {showProfileMenu && (
                            <div
                                ref={menuRef}
                                className="absolute top-14 right-0 w-56 bg-white rounded-xl shadow-xl border z-50 animate-fade-in"
                            >
                                <ul className="py-2">
                                    <li>
                                        <a href="/settings/general" className="block px-5 py-3 text-sm font-semibold text-brand-primary bg-brand-accent hover:bg-brand-secondary rounded-t-xl">
                                            General Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/settings/profile" className="block px-5 py-3 text-sm text-content-primary hover:bg-brand-accent">
                                            Profile Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/bookings" className="block px-5 py-3 text-sm text-content-primary hover:bg-brand-accent">
                                            Bookings
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/payments" className="block px-5 py-3 text-sm text-content-primary hover:bg-brand-accent rounded-b-xl">
                                            Payments
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Main>
    )
}
