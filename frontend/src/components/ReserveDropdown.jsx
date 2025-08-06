import { useState, useRef, useEffect } from 'react';
import { FaUser, FaCar, FaChevronDown } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import Title from "./Title";
import Navigate from './Navigate';
import { useLocation } from "react-router-dom";

const reserveOptions = [
    {
        id: 1,
        name: 'Guide',
        icon: FaUser,
        path: '/tour/select-guide',
        description: 'Find expert local guides'
    },
    {
        id: 2,
        name: 'Stays',
        icon: IoIosBed,
        path: '/hotels-search',
        description: 'Book hotels & accommodations'
    },
    {
        id: 3,
        name: 'Vehicle Rentals',
        icon: FaCar,
        path: '/vehicle-search',
        description: 'Rent cars, bikes & more'
    },
];

export default function ReserveDropdown() {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    // Check if any reserve option is active
    const isAnyReserveOptionActive = reserveOptions.some(option => 
        location.pathname.startsWith(option.path)
    );

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:bg-brand-accent ${
                    isAnyReserveOptionActive ? 'bg-brand-accent border border-brand-primary' : 'hover:bg-surface-tertiary'
                }`}
            >
                <Title
                    title="Reserve"
                    size="text-[16px]"
                    font="font-[500]"
                />
                <FaChevronDown 
                    size={12} 
                    className={`transition-transform duration-200 ${
                        showDropdown ? 'rotate-180' : ''
                    }`} 
                />
            </button>

            {showDropdown && (
                <div className="absolute top-full mt-2 left-0 w-80 bg-white rounded-2xl shadow-2xl border border-border-light z-50 overflow-hidden animate-fade-in">
                    <div className="p-4">
                        <Title
                            title="What would you like to reserve?"
                            size="text-[14px]"
                            font="font-[600]"
                            className="text-content-secondary mb-3"
                        />
                        <div className="space-y-2">
                            {reserveOptions.map((option) => {
                                const Icon = option.icon;
                                const isActive = location.pathname.startsWith(option.path);
                                
                                return (
                                    <Navigate
                                        key={option.id}
                                        path={option.path}
                                        className={`block p-4 rounded-xl transition-all hover:bg-brand-accent hover:border-brand-primary border ${
                                            isActive 
                                                ? 'bg-brand-accent border-brand-primary' 
                                                : 'border-transparent hover:shadow-sm'
                                        }`}
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${
                                                isActive 
                                                    ? 'bg-brand-primary text-white' 
                                                    : 'bg-brand-light text-brand-primary'
                                            }`}>
                                                <Icon size={16} />
                                            </div>
                                            <div className="flex-1">
                                                <Title
                                                    title={option.name}
                                                    size="text-[16px]"
                                                    font="font-[500]"
                                                    className={isActive ? 'text-brand-primary' : 'text-content-primary'}
                                                />
                                                <Title
                                                    title={option.description}
                                                    size="text-[13px]"
                                                    font="font-[400]"
                                                    className="text-content-tertiary"
                                                />
                                            </div>
                                        </div>
                                    </Navigate>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
