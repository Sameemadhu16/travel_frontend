import PropTypes from 'prop-types';
import defaultGuideImg from '../../../assets/users/user1.jpg';

export default function GuideCard({ guide, isSelected, onSelect, disabled }) {
    // Map backend fields to frontend display
    const name = guide.user?.fullName || guide.name || 'Unknown Guide';
    const rating = guide.rating || 4.5;
    const reviews = guide.reviews || guide.reviewCount || 0;
    const experience = guide.experienceYears 
        ? `${guide.experienceYears} years experience` 
        : guide.experience || '5+ years experience';
    const languages = guide.languagesSpoken || guide.languages || [];
    const specialties = guide.specialization || guide.specialties || [];
    const price = guide.hoursRate || guide.price || guide.pricePerDay || 8500;
    const image = guide.user?.profilePicture || guide.image || defaultGuideImg;
    const available = guide.isAvailable !== undefined ? guide.isAvailable : guide.available !== undefined ? guide.available : true;

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
            );
        }

        if (hasHalfStar) {
            stars.push(
                <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <defs>
                        <linearGradient id="half">
                            <stop offset="50%" stopColor="currentColor"/>
                            <stop offset="50%" stopColor="transparent"/>
                        </linearGradient>
                    </defs>
                    <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
            );
        }

        return stars;
    };

    return (
        <div className={`bg-white rounded-xl border-2 p-4 transition ${
            isSelected 
                ? 'border-brand-primary bg-brand-light shadow-lg' 
                : disabled 
                    ? 'border-surface-secondary opacity-50' 
                    : 'border-brand-secondary hover:border-brand-primary'
        }`}>
            {/* Header with Profile and Availability */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img 
                            src={image} 
                            alt={name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        {isSelected && (
                            <div className="absolute -top-1 -right-1 bg-brand-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                </svg>
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-content-primary">{name}</h3>
                        <div className="flex items-center gap-1">
                            {renderStars(rating)}
                            <span className="text-sm text-content-secondary ml-1">
                                {rating} ({reviews} reviews)
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                        available 
                            ? 'bg-success text-white' 
                            : 'bg-surface-secondary text-content-tertiary'
                    }`}>
                        {available ? 'Available' : 'Busy'}
                    </span>
                    {isSelected && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-brand-primary text-white">
                            Selected
                        </span>
                    )}
                </div>
            </div>

            {/* Experience and Details */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-content-secondary">
                    <svg className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                    </svg>
                    {experience}
                </div>
                <div className="flex items-center gap-2 text-sm text-content-secondary">
                    <svg className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3V3a1 1 0 112 0v1h3a2 2 0 012 2v2H1V6a2 2 0 012-2h3V3a1 1 0 011-1zM1 9h18v8a2 2 0 01-2 2H3a2 2 0 01-2-2V9z" clipRule="evenodd"/>
                    </svg>
                    {Array.isArray(languages) && languages.length > 0 ? languages.join(', ') : 'English, Sinhala'}
                </div>
                <div className="flex items-center gap-2 text-sm text-content-secondary">
                    <svg className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd"/>
                    </svg>
                    {Array.isArray(specialties) && specialties.length > 0 ? specialties.join(', ') : 'Cultural Tours'}
                </div>
            </div>

            {/* Price and Buttons */}
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-2xl font-bold text-content-primary">LKR{price}</span>
                    <span className="text-sm text-content-secondary">/day</span>
                </div>
                <button className="text-brand-primary text-sm font-medium hover:underline">
                    View Profile
                </button>
            </div>

            {/* Select Guide Button */}
            <div className="mt-4">
                {available ? (
                    <button 
                        onClick={onSelect}
                        disabled={disabled && !isSelected}
                        className={`w-full py-2 rounded font-semibold transition ${
                            isSelected 
                                ? 'bg-danger text-white hover:bg-danger-dark' 
                                : disabled 
                                    ? 'bg-surface-secondary text-content-tertiary cursor-not-allowed'
                                    : 'bg-brand-primary text-white hover:bg-warning'
                        }`}
                    >
                        {isSelected ? 'Remove Guide' : 'Select Guide'}
                    </button>
                ) : (
                    <button 
                        disabled 
                        className="w-full bg-surface-secondary text-content-tertiary py-2 rounded font-semibold cursor-not-allowed"
                    >
                        Currently Unavailable
                    </button>
                )}
            </div>

            {/* Selection limit warning */}
            {disabled && !isSelected && (
                <div className="mt-2 p-2 bg-warning-light border border-warning rounded text-warning text-xs text-center">
                    Maximum guides selected
                </div>
            )}
        </div>
    );
}

GuideCard.propTypes = {
    guide: PropTypes.object.isRequired,
    isSelected: PropTypes.bool,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool
};
