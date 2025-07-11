import React from 'react';
import { FaArrowRight } from "react-icons/fa";

const destinations = [
    {
        name: 'Kandy',
        desc: 'Ancient capital with sacred temples',
        image: 'src/assets/places/kandy.jpg'
    },
    {
        name: 'Galle',
        desc: 'Historic fort and coastal charm',
        image: 'src/assets/places/galle.jpg'
    },
    {
        name: 'Sigiriya',
        desc: 'Majestic Lion Rock fortress',
        image: 'src/assets/places/sigiriya.jpeg'
    },
    {
        name: 'Ella',
        desc: 'Scenic hills and tea plantations',
        image: 'src/assets/places/ella.jpeg'
    },
];

export default function RecommendedDestinations() {
    return (
        <section className="py-12 bg-[#fcfbf7]">
            <h2 className="text-3xl font-semibold text-center mb-10">Recommended Destinations</h2>
            <div className="flex justify-center gap-8 flex-wrap">
                {destinations.map((d, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl shadow-lg w-72 overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-xl"
                    >
                        <img src={d.image} alt={d.name} className="h-44 w-full object-cover" />
                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="text-lg font-bold mb-1">{d.name}</h3>
                            <p className="text-sm text-gray-600 mb-6">{d.desc}</p>
                            <div className="mt-auto">
                                <a
                                    href="#"
                                    className="text-[15px] text-orange-400 font-medium flex items-center gap-1 hover:underline"
                                >
                                    Explore <FaArrowRight className="inline text-[13px] mt-[2px]" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
