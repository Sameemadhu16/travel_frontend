import React from 'react';
import PrimaryButton from './PrimaryButton';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
    const navigate = useNavigate();
    return (
        <section className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-start bg-cover bg-center" style={{ backgroundImage: "url('src/assets/home/colombo.png')" }}>
            <div className="absolute inset-0 bg-black/40" />
            <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 relative z-10 text-white text-left mx-4 sm:mx-6 md:mx-8 lg:mx-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-10 leading-tight">Welcome to the Pearl of the Indian Ocean</h1>
                <p className="mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-md leading-relaxed">Discover the mesmerizing beauty of Sri Lanka with our curated tours, personalized recommendations, and expert guides.</p>
                <div className="w-fit">
                    <PrimaryButton
                        text={
                            <span className="flex items-center gap-2 text-sm sm:text-base">
                                <FaPlus className="inline text-xs sm:text-sm" />
                                <span className="hidden sm:inline">Create New Tour</span>
                                <span className="sm:hidden">New Tour</span>
                            </span>
                        }
                        onClick={() => navigate('/tour/create-tour')}
                    />
                </div>
            </div>
        </section>
    );
}
