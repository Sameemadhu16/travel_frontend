import { useState, useMemo, useCallback } from "react";
import { FaCamera, FaMonument, FaMountain, FaMusic, FaShoppingBag, FaSpa, FaUmbrellaBeach, FaUsers, FaUtensils } from "react-icons/fa";
import Main from "../../components/Main";
import SecondaryButton from "../../components/SecondaryButton";
import PrimaryButton from "../../components/PrimaryButton";
import StepIndicator from "../../components/StepIndicator";
import { navigateTo } from "../../core/navigateHelper";

    const tripTypes = [
        { id: 'cultural', label: 'Cultural & Historical', icon: FaMonument },
        { id: 'adventure', label: 'Adventure & Outdoor', icon: FaMountain },
        { id: 'relaxation', label: 'Relaxation & Wellness', icon: FaSpa },
        { id: 'family', label: 'Family Friendly', icon: FaUsers },
        { id: 'food', label: 'Food & Culinary', icon: FaUtensils },
        { id: 'beach', label: 'Beach & Coastal', icon: FaUmbrellaBeach }
    ];

    const interests = [
        { id: 'temples', label: 'Temples & Monuments', icon: FaMonument },
        { id: 'nature', label: 'Nature & Wildlife', icon: FaMountain },
        { id: 'food', label: 'Local Cuisine', icon: FaUtensils },
        { id: 'shopping', label: 'Shopping', icon: FaShoppingBag },
        { id: 'photography', label: 'Photography', icon: FaCamera },
        { id: 'nightlife', label: 'Nightlife & Entertainment', icon: FaMusic },
        { id: 'beaches', label: 'Beaches', icon: FaUmbrellaBeach },
        { id: 'museums', label: 'Museums & Galleries', icon: FaMonument }
    ];

    const activityLevels = [
        { id: 'low', label: 'Low', description: 'Relaxed pace, minimal walking' },
        { id: 'moderate', label: 'Moderate', description: 'Some walking, mixed activities' },
        { id: 'high', label: 'High', description: 'Active adventures, lots of walking' }
    ];

export default function PreferenceInfoStep (){

    const [formData, setFormData] = useState({
        tripType: '',
        activityLevel: '',
    })
    
    const toggleSelection = useCallback((field, value) => {
        setFormData(prev => {
            const currentArray = prev[field] || [];
            const isSelected = currentArray.includes(value);
            
            if (field === 'tripType') {
                // Single selection for trip type
                return { ...prev, [field]: [value] };
            } else {
                // Multiple selection for interests
                return {
                    ...prev,
                    [field]: isSelected 
                        ? currentArray.filter(item => item !== value)
                        : [...currentArray, value]
                };
            }
        });
    }, []);

    const handleActivityLevelChange = useCallback((levelId) => {
        setFormData(prev => ({ ...prev, activityLevel: levelId }));
    }, []);

    // Memoized trip type components
    const tripTypeComponents = useMemo(() => {
        return tripTypes.map((type) => {
            const IconComponent = type.icon;
            const isSelected = formData.tripType?.includes(type.id);
            return (
                <div
                    key={type.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected 
                            ? 'border-brand-primary bg-brand-accent' 
                            : 'border-border-light hover:border-brand-primary'
                    }`}
                    onClick={() => toggleSelection('tripType', type.id)}
                >
                    <div className="text-center">
                        <IconComponent className={`text-2xl mx-auto mb-2 ${
                            isSelected ? 'text-brand-primary' : 'text-content-tertiary'
                        }`} />
                        <span className={`text-sm font-medium ${
                            isSelected ? 'text-brand-primary' : 'text-content-primary'
                        }`}>
                            {type.label}
                        </span>
                    </div>
                </div>
            );
        });
    }, [formData.tripType, toggleSelection]);

    // Memoized interests components
    const interestComponents = useMemo(() => {
        return interests.map((interest) => {
            const IconComponent = interest.icon;
            const isSelected = formData.interests?.includes(interest.id);
            return (
                <div
                    key={interest.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected 
                            ? 'border-brand-primary bg-brand-accent' 
                            : 'border-border-light hover:border-brand-primary'
                    }`}
                    onClick={() => toggleSelection('interests', interest.id)}
                >
                    <div className="text-center">
                        <IconComponent className={`text-lg mx-auto mb-1 ${
                            isSelected ? 'text-brand-primary' : 'text-content-tertiary'
                        }`} />
                        <span className={`text-xs font-medium ${
                            isSelected ? 'text-brand-primary' : 'text-content-primary'
                        }`}>
                            {interest.label}
                        </span>
                    </div>
                </div>
            );
        });
    }, [formData.interests, toggleSelection]);

    // Memoized activity level components
    const activityLevelComponents = useMemo(() => {
        return activityLevels.map((level) => {
            const isSelected = formData.activityLevel === level.id;
            return (
                <div
                    key={level.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected 
                            ? 'border-brand-primary bg-brand-accent' 
                            : 'border-border-light hover:border-brand-primary'
                    }`}
                    onClick={() => handleActivityLevelChange(level.id)}
                >
                    <h4 className={`font-semibold mb-1 ${
                        isSelected ? 'text-brand-primary' : 'text-content-primary'
                    }`}>
                        {level.label}
                    </h4>
                    <p className="text-sm text-content-secondary">{level.description}</p>
                </div>
            );
        });
    }, [formData.activityLevel, handleActivityLevelChange]);

    // Navigation callbacks
    const handleBackClick = useCallback(() => {
        navigateTo('/ai-trip-basic-info');
    }, []);

    const handleNextClick = useCallback(() => {
        navigateTo('/ai-trip-generation');
    }, []);

    return (
        <Main>
            <StepIndicator currentStep={2} />
            <div className="space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-content-primary mb-2">What kind of trip are you looking for?</h2>
                    <p className="text-content-secondary">Help us understand your travel style</p>
                </div>

                {/* Trip Type Selection */}
                <div>
                    <h3 className="text-lg font-semibold text-content-primary mb-4">Trip Type</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {tripTypeComponents}
                    </div>
                </div>

                {/* Interests Selection */}
                <div>
                    <h3 className="text-lg font-semibold text-content-primary mb-4">What interests you? (Select multiple)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {interestComponents}
                    </div>
                </div>

                {/* Activity Level */}
                <div>
                    <h3 className="text-lg font-semibold text-content-primary mb-4">Activity Level</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {activityLevelComponents}
                    </div>
                </div>
            </div>
            <div className='w-1/4 grid grid-cols-2 gap-2 mt-5 mb-5'>
                <SecondaryButton
                    text='Back'
                    onClick={handleBackClick}
                />
                <PrimaryButton
                    text='Next'
                    onClick={handleNextClick}
                />
            </div>
        </Main>
    );
};
