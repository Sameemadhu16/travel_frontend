import Main from './Main';
import Title from '../components/Title';
import room from '../assets/rooms/room1.png';
import Navigate from './Navigate';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkTokenExpiration } from '../core/authChecker';
import { resetAuth } from '../redux/slices/authSlice';
import { useState, useRef, useEffect, useCallback } from 'react';

export default function Header() {
    const { user, token } = useSelector((state) => state.auth);
    const isExpired = checkTokenExpiration(token);
    const dispatch = useDispatch();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const menuRef = useRef(null);

    const userLogOut = useCallback(() => {
        dispatch(resetAuth());
    }, [dispatch]);

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

    const handleMenuClick = () => {
        setShowProfileMenu(false); // Close menu when clicking a link
    };

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
                {token && !isExpired ? (
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
                        <div onClick={() => dispatch(resetAuth())} className='flex items-center w-[300px] gap-2 p-2 hover:bg-surface-tertiary cursor-pointer rounded-[8px]'>
                            <div className='h-[40px] w-[40px] border-2 border-brand-primary rounded-full overflow-hidden'>
                                <img src={room} alt="room" className='h-full w-full object-cover' />
                            </div>
                            <div className='flex flex-col overflow-hidden'>
                                <Title
                                    title={user?.data?.email}
                                    size='text-[16px]'
                                    font='font-[600]'
                                />
                                <Title
                                    title='Level 1'
                                    size='text-[14px]'
                                    font='font-[300]'
                                />
                            </div>
                        </div>
                    </div>
                ) : (
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
                                <img src={room} alt="room" className='h-full w-full object-cover' />
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
                                            <Link
                                                to="/settings/general"
                                                onClick={handleMenuClick}
                                                className="block px-5 py-3 text-sm font-semibold text-brand-primary bg-brand-accent hover:bg-brand-secondary rounded-t-xl"
                                            >
                                                General Settings
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/settings/profile"
                                                onClick={handleMenuClick}
                                                className="block px-5 py-3 text-sm text-content-primary hover:bg-brand-accent"
                                            >
                                                Profile Settings
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/bookings"
                                                onClick={handleMenuClick}
                                                className="block px-5 py-3 text-sm text-content-primary hover:bg-brand-accent"
                                            >
                                                Bookings
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/payments"
                                                onClick={handleMenuClick}
                                                className="block px-5 py-3 text-sm text-content-primary hover:bg-brand-accent"
                                            >
                                                Payments
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/partner-login/step-1"
                                                onClick={() => userLogOut()}
                                                className="block px-5 py-3 text-sm text-content-primary hover:bg-brand-accent rounded-b-xl"
                                            >
                                                LogOut
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Main>
    );
}