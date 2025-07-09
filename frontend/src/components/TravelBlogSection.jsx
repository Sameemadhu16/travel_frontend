import React from 'react';

export default function TravelBlogSection() {
    return (
        <section className="flex flex-col md:flex-row bg-[#ffd6c2] bg-[url('/src/assets/bg/lines.svg')] bg-repeat bg-[length:600px_600px] py-16 px-8 gap-8 items-center">
            {/* Left Side: Text and Button */}
            <div className="flex-1 flex flex-col justify-center items-start">
                <h2 className="text-5xl font-bold mb-4 text-content-primary">Plan Smarter,<br />Travel Better</h2>
                <p className="mb-8 text-lg text-content-secondary">
                    From Packing Hacks to Dream Destinations<br />
                    – Explore Our Blog Today!
                </p>
                <button className="bg-brand-primary hover:bg-brand-secondary transition text-white px-6 py-3 rounded font-semibold text-base shadow">
                    Start Exploring Our Blog!
                </button>
            </div>
            {/* Right Side: Blog Cards */}
            <div className="flex-1 flex gap-8 justify-center md:justify-end items-end">
                <div className="relative w-80  rounded-2xl overflow-hidden shadow-xl bg-black/80 mb-20">
                    <img src="/src/assets/home/card1.png" alt="How to Pack Like a Pro" className="w-full h-full object-cover" />
                </div>
                <div className="relative w-80  rounded-2xl overflow-hidden shadow-xl bg-black/80 mt-20">
                    <img src="/src/assets/home/card2.png" alt="How to Spend 3 Days in New York City Like a Local" className="w-full h-full object-cover" />
                </div>
            </div>
        </section>
    );
}
