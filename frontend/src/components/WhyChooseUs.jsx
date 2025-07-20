import React from 'react';
import { FaMapMarkedAlt, FaHeart, FaShieldAlt } from "react-icons/fa";

const features = [
    {
        title: 'Expert Local Guides',
        desc: 'Our experienced guides share authentic stories and hidden gems',
        icon: <FaMapMarkedAlt className="text-5xl text-brand-primary bg-white rounded-full p-3 shadow mb-4" />,
    },
    {
        title: 'Personalized Experiences',
        desc: 'Tailored tours that match your interests and preferences',
        icon: <FaHeart className="text-5xl text-brand-primary bg-white rounded-full p-3 shadow mb-4" />,
    },
    {
        title: 'Safe & Reliable',
        desc: 'Your safety is our priority with comprehensive travel insurance',
        icon: <FaShieldAlt className="text-5xl text-brand-primary bg-white rounded-full p-3 shadow mb-4" />,
    },
];

export default function WhyChooseUs() {
    return (
        <section className="mt-10">
            <h2 className="text-3xl font-semibold mt-5 text-center mb-2 text-content-primary">Why Choose Ceylon Tours</h2>
            <p className="text-center text-content-secondary mb-10 text-lg">Experience Sri Lanka like never before</p>
            <div className="flex flex-col md:flex-row justify-center gap-12">
                {features.map((f, i) => (
                    <div key={i} className="flex flex-col items-center text-center max-w-xs">
                        {f.icon}
                        <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                        <p className="text-content-secondary">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}