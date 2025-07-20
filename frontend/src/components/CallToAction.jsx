import React from 'react';
import PrimaryButton from './PrimaryButton';
import { FaPaperPlane } from "react-icons/fa";

export default function CallToAction() {
    return (
        <section className="bg-gradient-to-r from-[#e95413] to-[#e86a1a] text-white py-16 flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 font-sans">Ready to Explore Sri Lanka?</h2>
            <p className="mb-8 text-lg font-sans text-white/90">Start planning your dream vacation today</p>
            {/* <PrimaryButton
                text={
                    <span className="flex items-center gap-2 text-brand-primary font-bold text-base">
                        <FaPaperPlane className="text-brand-primary" />
                        <span className="text-brand-primary font-bold">Create Your Tour Request</span>
                    </span>
                }
                className="bg-white text-brand-primary font-bold px-4 py-2 rounded-lg shadow hover:bg-brand-accent transition w-auto mx-auto min-w-0"
            /> */}
        </section>
    );
}
