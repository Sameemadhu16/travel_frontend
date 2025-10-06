import React from 'react';
import PropTypes from 'prop-types';
import { Star, Calendar, Languages, Award, CheckCircle } from 'lucide-react';

export default function GuideCard({ guide, isSelected, onSelect, disabled }) {
    const {
        id,
        name,
        profilePicture,
        bio,
        languagesSpoken,
        specialization,
        experienceYears,
        price,
        isVerified,
        isAvailable,
        status,
        rating,
        reviewCount
    } = guide;

    // Map backend fields to component logic
    const guideLanguages = languagesSpoken || [];
    const guideSpecialties = specialization || [];
    const available = isAvailable;
    const verified = isVerified;
    const reviews = reviewCount;
    const experience = experienceYears ? `${experienceYears} years` : null;
    const description = bio;
    const image = profilePicture || '/default-avatar.png';
    
    // Safely handle languages and specialties arrays to prevent .join() errors
    const languageList = Array.isArray(guideLanguages) ? guideLanguages : 
                        typeof guideLanguages === 'string' ? [guideLanguages] : 
                        ['Not specified'];
    
    const specialtyList = Array.isArray(guideSpecialties) ? guideSpecialties : 
                         typeof guideSpecialties === 'string' ? [guideSpecialties] : 
                         ['General tours'];

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating || 0);
        const hasHalfStar = (rating || 0) % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative">
                        <Star className="w-4 h-4 text-gray-300 fill-gray-300" />
                        <div className="absolute inset-0 overflow-hidden w-1/2">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        </div>
                    </div>
                );
            } else {
                stars.push(
                    <Star key={i} className="w-4 h-4 text-gray-300 fill-gray-300" />
                );
            }
        }

        return stars;
    };

    return (
        <div className={`bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
            isSelected 
                ? 'border-orange-500 shadow-lg ring-2 ring-orange-100' 
                : disabled 
                    ? 'border-gray-200 opacity-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-orange-300 cursor-pointer'
        }`}>
            <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                    <div className="relative flex-shrink-0">
                        <img 
                            src={image} 
                            alt={name}
                            className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-lg"
                        />
                        {verified && (
                            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                                <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                        )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{name}</h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex items-center gap-1">
                                        {renderStars(rating)}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {rating || 0} ({reviews || 0} reviews)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        available 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                    }`}>
                        {status || (available ? 'Available' : 'Busy')}
                    </span>
                    {verified && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            Verified Guide
                        </span>
                    )}
                    {isSelected && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                            Selected
                        </span>
                    )}
                </div>

                <div className="space-y-3 mb-4">
                    {experience && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-orange-500" />
                            <span>{experience} experience</span>
                        </div>
                    )}
                    
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <Languages className="w-4 h-4 text-orange-500 mt-0.5" />
                        <span>{languageList.join(', ')}</span>
                    </div>
                    
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <Award className="w-4 h-4 text-orange-500 mt-0.5" />
                        <span>{specialtyList.join(', ')}</span>
                    </div>

                    {description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                            {description}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-left">
                        <div className="text-2xl font-bold text-orange-600">
                            LKR {price?.toLocaleString() || '0'}
                            <span className="text-sm font-normal text-gray-500">/day</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button className="text-orange-600 hover:text-orange-700 font-medium text-sm px-3 py-1 border border-orange-600 rounded-lg hover:bg-orange-50 transition">
                            View Profile
                        </button>
                        <button 
                            onClick={onSelect}
                            disabled={disabled}
                            className={`font-semibold py-2 px-4 rounded-lg transition ${
                                isSelected
                                    ? 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                                    : disabled
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : available
                                            ? 'bg-orange-600 text-white hover:bg-orange-700'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {isSelected ? 'Remove' : available ? 'Select Guide' : 'Currently Unavailable'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}