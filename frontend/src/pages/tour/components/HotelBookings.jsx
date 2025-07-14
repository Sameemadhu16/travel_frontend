import React from 'react';

export default function HotelBookings() {
    const hotels = [
        {
            id: 1,
            name: "Cinnamon Grand Colombo",
            room: "Deluxe Room • 2 Nights",
            dates: "Mar 15-17, 2024",
            price: 32000
        },
        {
            id: 2,
            name: "Hotel Suisse Kandy",
            room: "Superior Room • 2 Nights", 
            dates: "Mar 17-19, 2024",
            price: 28000
        }
    ];

    return (
        <div className="bg-white rounded-lg border border-brand-primary p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-content-primary">Hotel Bookings</h2>
                <button className="text-brand-primary text-sm font-medium hover:underline flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Edit
                </button>
            </div>
            
            <div className="space-y-4">
                {hotels.map((hotel, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-brand-primary rounded-lg">
                        <div>
                            <h3 className="font-semibold text-content-primary">{hotel.name}</h3>
                            <p className="text-sm text-content-secondary">{hotel.room}</p>
                            <p className="text-sm text-content-tertiary">{hotel.dates}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold text-brand-primary">LKR {hotel.price.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
