import React from 'react';
import PrimaryButton from './PrimaryButton';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Main from './Main';

export default function HeroSection() {
    const navigate = useNavigate();
    return (
        <section className="relative h-[600px] flex items-center justify-start bg-cover bg-center" style={{ backgroundImage: "url('src/assets/home/colombo.png')" }}>
            <Main>
                <div className="absolute inset-0 bg-black/40" />
                <div className="w-1/3 relative z-10 text-white text-left max-w-xl">
                    <h1 className="text-[40px] font-semibold mb-10">Welcome to the Pearl of the Indian Ocean</h1>
                    <p className="mb-6 text-md">Discover the mesmerizing beauty of Sri Lanka with our curated tours, personalized recommendations, and expert guides.</p>
                        <PrimaryButton
                            text={
                                <span className="flex items-center justify-center gap-2">
                                    <FaPlus className="inline" />
                                    Create New Tour
                                </span>
                            }
                            className="w-fit px-4"
                            onClick={() => navigate('/tour/create-tour')}
                        />
                </div>
            </Main>
        </section>
    );
}