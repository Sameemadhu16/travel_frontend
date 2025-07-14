import React from 'react';
import PrimaryButton from './PrimaryButton';

export default function TravelBlogSection() {
    return (
        <section className="relative bg-gradient-to-br from-orange-50 to-orange-100 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[url('/src/assets/bg/lines.svg')] bg-repeat bg-[length:400px_400px]"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side: Content */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                Plan Smarter,
                                <br />
                                <span className="text-brand-primary">Travel Better</span>
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                From expert packing hacks to discovering hidden gems around the world
                                <span className="block mt-2 font-medium text-gray-700">
                                    – Explore our curated travel insights today!
                                </span>
                            </p>
                        </div>
                        
                        {/* AI Trip Planning Feature */}
                        <div className="bg-brand-primary to-brand-secondary rounded-2xl p-6 shadow-lg border border-primary">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">AI Trip Planner</h3>
                                    <p className="text-white/80 text-sm">Let AI create your perfect itinerary</p>
                                </div>
                            </div>
                            <button className="w-full bg-surface-primary hover:bg-surface-secondary text-content-primary font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-border-light hover:border-primary">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Plan My Trip with AI
                            </button>
                        </div>
                        
                       
                    </div>

                    {/* Right Side: Blog Cards */}
                    <div className="relative">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Card 1 */}
                            <div className="group relative transform hover:-translate-y-2 transition-all duration-300">
                                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                    <div className="relative h-76">
                                        <img 
                                            src="/src/assets/home/card1.png" 
                                            alt="Travel Packing Tips" 
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                        
                                        {/* Category Tag */}
                                        {/* <div className="absolute top-4 left-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-sm">
                                                Tips
                                            </span>
                                        </div> */}
                                        
                                        {/* Content Overlay */}
                                        {/* <div className="absolute bottom-0 left-0 right-0 p-6"> */}
                                            {/* <h3 className="text-white font-semibold text-lg leading-tight mb-2">
                                                How to Pack Like a Pro: Essential Tips for Every Traveler
                                            </h3> */}
                                            {/* <p className="text-white/80 text-sm">
                                                Master the art of efficient packing with our expert guide
                                            </p> */}
                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="group relative transform hover:-translate-y-2 transition-all duration-300 mt-8 sm:mt-12">
                                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                    <div className="relative h-76">
                                        <img 
                                            src="/src/assets/home/card2.png" 
                                            alt="New York City Guide" 
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                        
                                        {/* Category Tag */}
                                        {/* <div className="absolute top-4 left-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-sm">
                                                Destinations
                                            </span>
                                        </div> */}
                                        
                                        {/* Content Overlay */}
                                        {/* <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3 className="text-white font-semibold text-lg leading-tight mb-2">
                                                How to Spend 3 Days in New York City Like a Local
                                            </h3>
                                            <p className="text-white/80 text-sm">
                                                Discover hidden gems and local favorites in the Big Apple
                                            </p>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-primary/10 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-orange-200/30 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
