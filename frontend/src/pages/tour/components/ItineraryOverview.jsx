import React from 'react';

export default function ItineraryOverview() {
    const itinerary = [
        {
            day: 1,
            title: "Arrive in Colombo",
            description: "Airport pickup, city tour, hotel check-in"
        },
        {
            day: 2,
            title: "Colombo to Kandy",
            description: "Temple of Tooth, Royal Botanical Gardens"
        },
        {
            day: 3,
            title: "Kandy to Sigiriya",
            description: "Sigiriya Rock Fortress, Dambulla Cave Temple"
        }
    ];

    return (
        <div className="bg-white rounded-lg border border-brand-primary p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-content-primary">Itinerary Overview</h2>
                <button className="text-brand-primary text-sm font-medium hover:underline flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Edit
                </button>
            </div>
            
            <div className="space-y-4">
                {itinerary.map((item, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                {item.day}
                            </div>
                            {index < itinerary.length - 1 && (
                                <div className="w-0.5 h-12 bg-border-light mt-2"></div>
                            )}
                        </div>
                        <div className="flex-1 pb-4">
                            <h3 className="font-semibold text-content-primary">{item.title}</h3>
                            <p className="text-sm text-content-secondary mt-1">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
