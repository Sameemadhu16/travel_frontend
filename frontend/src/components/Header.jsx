import Title from '../components/Title';
import defaultAvatar from '../assets/users/user1.jpg';
import Navigate from './Navigate';
import logo from '../assets/logo/logo1.png'
import { useDispatch, useSelector } from 'react-redux';
import { checkTokenExpiration } from '../core/authChecker';
import { resetAuth } from '../redux/slices/authSlice';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReserveDropdown from './ReserveDropdown';
import SecondaryButton from './SecondaryButton';
import { navigateTo } from '../core/navigateHelper';

export default function Header() {
    const { user, token } = useSelector((state) => state.auth);
    const isExpired = checkTokenExpiration(token);
    const dispatch = useDispatch();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    // Handle both login structure (user.data.profilePicture) and registration structure (user.profilePicture)
    const [profilePicture, setProfilePicture] = useState(user?.data?.profilePicture || user?.profilePicture || defaultAvatar);
    const menuRef = useRef(null);
    // Handle both login structure (user.data.role) and registration structure (user.role)
    const role = user?.data?.role || user?.role || '';
    
    // Debug: Log user data and role
    useEffect(() => {
        console.log('Header Debug - User:', user);
        console.log('Header Debug - Role:', role);
        console.log('Header Debug - User Data:', user?.data);
    }, [user, role]);
    
    // Check if user is authenticated (has valid token)
    const isAuthenticated = token && !isExpired;
    
    // Update profile picture when user data changes
    useEffect(() => {
        const newProfilePic = user?.data?.profilePicture || user?.profilePicture;
        if (newProfilePic) {
            console.log('Header: Profile picture updated from Redux');
            setProfilePicture(newProfilePic);
        }
    }, [user?.data?.profilePicture, user?.profilePicture]);
    
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
            <div className='sticky top-0 left-0 right-0 z-50 bg-white  px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 2xl:px-60 '>
                <div className='flex justify-between items-center w-full'>
                    <Navigate 
                        path="/home"
                        className='h-[80px] w-40 rounded-[4px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity'
                    >
                        <img src={logo} alt="Travel.lk" className='h-full w-full object-cover' />
                    </Navigate>
                    
                    {isAuthenticated ? (
                        <div className='flex gap-4 items-center'>
                            {/* Messages Icon */}
                            <Navigate
                                path={'/messages'}
                                className='relative p-2 hover:bg-surface-tertiary cursor-pointer rounded-[8px] transition-colors'
                                title="Messages"
                            >
                                <svg className="w-6 h-6 text-content-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </Navigate>
                            
                            {/* Show Reserve dropdown for traveler role or if role is not set */}
                            {(!role || role === '' || role === 'traveler') && (
                                <ReserveDropdown />
                            )}
                            {/* Show List Property for traveler role or if role is not set */}
                            {(!role || role === '' || role === 'traveler') && (
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
                            )}
                            <div className='flex items-center gap-2 p-2 hover:bg-surface-tertiary cursor-pointer rounded-[8px]'>
                                <div onClick={() => setShowProfileMenu((v) => !v)} className='h-[40px] w-[40px] border-2 border-brand-primary rounded-full overflow-hidden bg-white'>
                                    <img 
                                        src={profilePicture} 
                                        alt="profile" 
                                        className='h-full w-full object-cover' 
                                        onError={(e) => {
                                            console.error('Header: Failed to load profile picture');
                                            e.target.src = defaultAvatar;
                                        }}
                                    />
                                </div>
                                <div className='flex flex-col overflow-hidden' onClick={() => setShowProfileMenu((v) => !v)}>
                                    <Title
                                        title={user?.email || user?.data?.email || 'User'}
                                        size='text-[16px]'
                                        font='font-[600]'
                                    />
                                </div>
                                {showProfileMenu && (
                                    <div
                                        ref={menuRef}
                                        className="absolute top-14 right-0 w-56 bg-white rounded-xl shadow-xl border z-50 animate-fade-in"
                                    >
                                        <ul className="py-2">
                                            {/* <li>
                                                <Link to="/settings/general" className="block px-5 py-3 text-sm font-semibold text-brand-primary bg-brand-accent hover:bg-brand-secondary rounded-t-xl">
                                                    General Settings
                                                </Link>
                                            </li> */}
                                            <li>
                                                <Link to="/settings/profile" className="block px-5 py-3 text-sm text-content-primary hover:bg-brand-accent">
                                                    Profile Settings
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/messages" className="block px-5 py-3 text-sm text-content-primary hover:bg-brand-accent">
                                                    Messages
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/trips" className="block px-5 py-3 text-sm text-content-primary hover:bg-brand-accent">
                                                    Trips
                                                </Link>
                                            </li>
                                            {/* <li>
                                                <Link to="/bookings" className="block px-5 py-3 text-sm text-content-primary hover:bg-brand-accent">
                                                    Bookings
                                                </Link>
                                            </li> */}
                                            <li>
                                                <Link to="/my-bookings/guides" className="block px-5 py-3 text-sm text-content-primary hover:bg-brand-accent">
                                                    Guide Bookings
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/my-bookings/hotels" className="block px-5 py-3 text-sm text-content-primary hover:bg-brand-accent">
                                                    Hotel Bookings
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/my-bookings/vehicles" className="block px-5 py-3 text-sm text-content-primary hover:bg-brand-accent">
                                                    Vehicle Bookings
                                                </Link>
                                            </li>
                                            {/* <li>
                                                <Link to="/payments" className="block px-5 py-3 text-sm text-content-primary hover:bg-brand-accent">
                                                    Payments
                                                </Link>
                                            </li> */}
                                            <li>
                                                <Link to="/partner-login/step-1" onClick={() => dispatch(resetAuth())} className="block px-5 py-3 text-sm text-content-primary hover:bg-brand-accent rounded-b-xl">
                                                    Log Out
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            {/* Debug: Always show dropdown for testing
                            {(!role || role === '' || role === 'traveler') && (
                                <div className="bg-red-200 p-2 rounded">
                                    <p className="text-xs">Debug: Role = {role || 'undefined'}</p>
                                    <ReserveDropdown />
                                </div>
                            )} */}
                        </div>
                    ) : (
                        /* Show login/signup buttons when not authenticated */
                        <div className='flex gap-3 items-center'>
                            <h2 
                                onClick={() => navigateTo('/partner-login/step-1')}
                                className='text-brand-primary text-[20px] cursor-pointer'>Login
                            </h2>
                            <SecondaryButton
                                text="Get Started"
                                onClick={() => navigateTo('/traveler-register')}
                                className="px-4 py-2"
                            />
                        </div>
                    )}
                </div>  
            </div>
    );
}