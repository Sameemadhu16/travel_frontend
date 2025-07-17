import React, { useContext } from 'react';
import { useTourContext } from '../../../context/TourContext';
import { useNavigate } from 'react-router-dom';
import FormContext from '../../../context/InitialValues';

export default function SelectedTourGuide() {
    const { formData, setFormData } = useContext(FormContext);
    const navigate = useNavigate();

    const selectedItems = formData.selectedItems;
    const guides = selectedItems.guides || [];

    const handleEdit = () => {
        navigate('/tour/select-guide');
    };

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
                <h2 className="text-lg font-semibold text-content-primary">Selected Tour Guide{guides.length > 1 ? 's' : ''}</h2>
                <button 
                    onClick={handleEdit}
                    className="text-brand-primary text-sm font-medium hover:underline flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Edit
                </button>
            </div>
            
            {guides.length === 0 ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-content-tertiary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-content-secondary mb-2">No Guide Selected</h3>
                    <p className="text-content-tertiary text-sm mb-4">Please select a tour guide to continue</p>
                    <button 
                        onClick={handleEdit}
                        className="bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-secondary transition"
                    >
                        Select Guide
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {guides.map((guide, index) => (
                        <div key={guide.id || index} className="flex items-center justify-between p-4 border border-brand-primary rounded-lg">
                            <div className="flex items-center gap-4">
                                <img 
                                    src={guide.image || '/src/assets/users/user1.jpg'} 
                                    alt={guide.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold text-content-primary">{guide.name}</h3>
                                    <p className="text-sm text-content-secondary">{guide.specialty || guide.specialization}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex gap-1">
                                            {renderStars(guide.rating || 4.5)}
                                        </div>
                                        <span className="text-sm text-content-secondary">
                                            ({guide.rating || 4.5}) • {guide.tours || guide.toursCompleted || 0} tours
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold text-brand-primary">
                                    LKR {(guide.price || guide.pricePerDay || 8500).toLocaleString()}
                                </p>
                                <p className="text-sm text-content-secondary">per day</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
