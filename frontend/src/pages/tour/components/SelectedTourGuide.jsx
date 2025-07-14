import React from 'react';

export default function SelectedTourGuide() {
    const guides = [
        {
            id: 1,
            name: "Chaminda Perera",
            specialty: "Certified Cultural & Wildlife Guide",
            rating: 4.8,
            tours: 127,
            price: 8500,
            image: "/src/assets/users/user1.jpg"
        },
        {
            id: 2,
            name: "Chaminda Perera",
            specialty: "Certified Cultural & Wildlife Guide", 
            rating: 4.8,
            tours: 127,
            price: 8500,
            image: "/src/assets/users/user1.jpg"
        }
    ];

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
            );
        }
        return stars;
    };

    return (
        <div className="bg-white rounded-lg border border-brand-primary p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-content-primary">Selected Tour Guide</h2>
                <button className="text-brand-primary text-sm font-medium hover:underline flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Edit
                </button>
            </div>
            
            <div className="space-y-4">
                {guides.map((guide, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-brand-primary rounded-lg">
                        <div className="flex items-center gap-4">
                            <img 
                                src={guide.image} 
                                alt={guide.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-content-primary">{guide.name}</h3>
                                <p className="text-sm text-content-secondary">{guide.specialty}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex gap-1">
                                        {renderStars(guide.rating)}
                                    </div>
                                    <span className="text-sm text-content-secondary">
                                        ({guide.rating}) • {guide.tours} tours
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold text-brand-primary">LKR {guide.price.toLocaleString()}</p>
                            <p className="text-sm text-content-secondary">per day</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
