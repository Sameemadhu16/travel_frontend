import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContext from '../../../context/InitialValues';
import axios from 'axios';

export default function SelectedTourGuide() {
    const { formData } = useContext(FormContext);
    const navigate = useNavigate();
    const [guideDetails, setGuideDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const selectedItems = formData.selectedItems;
    const guideIds = (selectedItems.guides || []).map(guide => guide.id).filter(Boolean);

    useEffect(() => {
        const fetchGuideDetails = async () => {
            if (guideIds.length === 0) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                // Fetch detailed information for each guide
                const guidePromises = guideIds.map(id =>
                    axios.get(`http://localhost:8080/api/guides/${id}`)
                );
                const responses = await Promise.all(guidePromises);
                const fetchedGuides = responses.map(response => response.data);
                setGuideDetails(fetchedGuides);
            } catch (error) {
                console.error('Error fetching guide details:', error);
                // Fallback to selected guides data
                setGuideDetails(selectedItems.guides || []);
            } finally {
                setLoading(false);
            }
        };

        fetchGuideDetails();
    }, [guideIds.join(',')]);  // eslint-disable-line react-hooks/exhaustive-deps

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

    const guides = guideDetails.length > 0 ? guideDetails : (selectedItems.guides || []);

    if (loading) {
        return (
            <div className="bg-white rounded-lg border border-brand-primary p-6">
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
                </div>
            </div>
        );
    }

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
                    {guides.map((guide, index) => {
                        // Handle both detailed guide objects from API and basic guide objects
                        const guideUser = guide.user || {};
                        const firstName = guideUser.firstName || '';
                        const lastName = guideUser.lastName || '';
                        const guideName = firstName && lastName 
                            ? `${firstName} ${lastName}`.trim() 
                            : guide.name || 'Unknown Guide';
                        
                        // Get profile picture from user's profilePictures array (first one) or fallback
                        const profilePictures = guideUser.profilePictures || [];
                        const guideImage = profilePictures.length > 0 
                            ? profilePictures[0] 
                            : guide.image || guide.profilePicture || '/src/assets/users/user1.jpg';
                        
                        const guideRating = guide.rating || 4.5;
                        const guideTours = guide.tours || guide.toursCompleted || guide.experienceYears || 0;
                        const guidePrice = guide.price || guide.pricePerDay || guide.hoursRate || 8500;
                        const guideSpecialty = guide.specialty || guide.specialization || guide.bio?.substring(0, 50) + '...' || 'Professional Guide';
                        const guideLanguages = guide.languagesSpoken || guide.languages || [];
                        const guideSpecializations = guide.specialization || guide.specializations || [];
                        
                        return (
                            <div key={guide.id || index} className="border border-brand-primary rounded-lg overflow-hidden">
                                <div className="flex items-center gap-4 p-4">
                                    <img 
                                        src={guideImage} 
                                        alt={guideName}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-content-primary">{guideName}</h3>
                                        <p className="text-sm text-content-secondary">{guideSpecialty}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex gap-1">
                                                {renderStars(guideRating)}
                                            </div>
                                            <span className="text-sm text-content-secondary">
                                                ({guideRating}) • {guideTours}+ tours
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-brand-primary">
                                            LKR {guidePrice.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-content-secondary">per day</p>
                                    </div>
                                </div>
                                
                                {/* Additional Guide Details */}
                                {(guideLanguages.length > 0 || guideSpecializations.length > 0 || guide.bio) && (
                                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                                        {guide.bio && (
                                            <p className="text-sm text-content-secondary mb-3">{guide.bio}</p>
                                        )}
                                        
                                        {guideLanguages.length > 0 && (
                                            <div className="mb-2">
                                                <span className="text-xs font-semibold text-content-tertiary">Languages: </span>
                                                <span className="text-sm text-content-secondary">
                                                    {guideLanguages.join(', ')}
                                                </span>
                                            </div>
                                        )}
                                        
                                        {guideSpecializations.length > 0 && (
                                            <div>
                                                <span className="text-xs font-semibold text-content-tertiary">Specializations: </span>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {guideSpecializations.map((spec, idx) => (
                                                        <span key={idx} className="text-xs bg-brand-primary/10 text-brand-primary px-2 py-1 rounded">
                                                            {spec}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {guide.experienceYears && (
                                            <div className="mt-2">
                                                <span className="text-xs font-semibold text-content-tertiary">Experience: </span>
                                                <span className="text-sm text-content-secondary">
                                                    {guide.experienceYears} years
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
