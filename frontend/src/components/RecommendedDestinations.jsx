import React from 'react';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const destinations = [
    {
        name: 'Kandy',
        desc: 'Ancient capital with sacred temples',
        image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&h=300&fit=crop'
    },
    {
        name: 'Galle',
        desc: 'Historic fort and coastal charm',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop'
    },
    {
        name: 'Sigiriya',
        desc: 'Majestic Lion Rock fortress',
        image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&h=300&fit=crop'
    },
    {
        name: 'Ella',
        desc: 'Scenic hills and tea plantations',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop'
    },
    {
        name: 'Nuwara Eliya',
        desc: 'Cool climate and beautiful landscapes',
        image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&h=300&fit=crop'
    },
    {
        name: 'Mirissa',
        desc: 'Pristine beaches and whale watching',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop'
    },
    {
        name: 'Anuradhapura',
        desc: 'Ancient ruins and Buddhist heritage',
        image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&h=300&fit=crop'
    }
];

export default function RecommendedDestinations() {
    const scrollContainer = React.useRef(null);

    const scrollLeft = () => {
        scrollContainer.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollContainer.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className="bg-gray-50">
            <section className="py-12 px-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800">Recommended Destinations</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={scrollLeft}
                            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:bg-gray-50"
                        >
                            <FaChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:bg-gray-50"
                        >
                            <FaChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div
                        ref={scrollContainer}
                        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitScrollbar: { display: 'none' }
                        }}
                    >
                        {destinations.map((d, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl shadow-lg min-w-[280px] max-w-[280px] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={d.image}
                                        alt={d.name}
                                        className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-orange-500 transition-colors">
                                        {d.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-6 line-clamp-2">{d.desc}</p>
                                    <div className="mt-auto">
                                        <a
                                            href="#"
                                            className="text-[15px] text-orange-400 font-medium flex items-center gap-2 hover:text-orange-500 transition-colors group-hover:gap-3"
                                        >
                                            Explore
                                            <FaArrowRight className="text-[13px] transition-transform group-hover:translate-x-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}