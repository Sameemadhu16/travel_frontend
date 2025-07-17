import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Main from '../../components/Main';
import GuideFilters from './components/GuideFilters';
import GuideCard from './components/GuideCard';
import { guides } from '../../core/Lists/guides';
import FormContext from '../../context/InitialValues';

export default function SelectGuide() {
    const navigate = useNavigate();
    const { formData, setFormData } = useContext(FormContext);
    const MAX_GUIDES = 5;
    const MIN_GUIDES = 1;
console.log(formData)
    const selectedGuides = formData.selectedItems?.guides || [];
    const errors = formData.errors || {};
    
    const handleGuideSelection = (guide) => {
        const isAlreadySelected = selectedGuides.some(g => g.id === guide.id);
        
        if (isAlreadySelected) {
            // Remove guide from selection
            removeSelectedGuide(guide.id);
            // Clear errors if we have valid selection count
            if (selectedGuides.length - 1 >= MIN_GUIDES) {
                clearFieldError('guideSelection');
            }
        } else {
            // Add guide if under limit
            if (selectedGuides.length < MAX_GUIDES) {
                addSelectedGuide(guide);
                // Clear errors if we have valid selection
                clearFieldError('guideSelection');
            } else {
                // Show error for exceeding limit
                setFieldError('guideSelection', `You can select maximum ${MAX_GUIDES} guides`);
            }
        }
    };

    const isGuideSelected = (guideId) => {
        return selectedGuides.some(guide => guide.id === guideId);
    };

    const handleNext = () => {
        if (validateGuideSelection()) {
            // Update step in form data
            setFormData(prev => ({
                ...prev,
                currentStep: prev.currentStep + 1
            }));
            navigate('/tour/select-hotel');
        }
    };

    const removeGuide = (guideId) => {
        removeSelectedGuide(guideId);
        if (selectedGuides.length - 1 >= MIN_GUIDES) {
            clearFieldError('guideSelection');
        }
    };

    // Helper functions
    const addSelectedGuide = (guide) => {
        setFormData(prev => ({
            ...prev,
            selectedItems: {
                ...prev.selectedItems,
                guides: [...(prev.selectedItems?.guides || []), guide]
            }
        }));
    };

    const removeSelectedGuide = (guideId) => {
        setFormData(prev => ({
            ...prev,
            selectedItems: {
                ...prev.selectedItems,
                guides: (prev.selectedItems?.guides || []).filter(g => g.id !== guideId)
            }
        }));
    };

    const setFieldError = (field, message) => {
        setFormData(prev => ({
            ...prev,
            errors: {
                ...prev.errors,
                [field]: message
            }
        }));
    };

    const clearFieldError = (field) => {
        setFormData(prev => {
            const newErrors = { ...prev.errors };
            delete newErrors[field];
            return {
                ...prev,
                errors: newErrors
            };
        });
    };

    const validateGuideSelection = () => {
        if (selectedGuides.length < MIN_GUIDES) {
            setFieldError('guideSelection', `Please select at least ${MIN_GUIDES} guide`);
            return false;
        }
        return true;
    };

    return (
        <Main>
            <div className="max-w-6xl mx-auto px-4">
                {/* Header Section */}
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-content-primary mb-2">Select Your Tour Guide(s)</h1>
                    <p className="text-content-secondary">Choose up to 5 experienced local guides for your Sri Lankan adventure. Your requests will be sent to selected guides, and the first to accept will be your confirmed guide.</p>
                </div>

                {/* Selection Status */}
                <div className="mb-6 p-4 bg-white rounded-xl shadow border border-brand-accent border-l-4 border-l-brand-primary">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-brand-primary">Guide Selection</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedGuides.length === 0 ? 'bg-surface-secondary text-content-tertiary' :
                            selectedGuides.length <= MAX_GUIDES ? 'bg-success text-white' :
                            'bg-danger text-white'
                        }`}>
                            {selectedGuides.length}/{MAX_GUIDES} Selected
                        </span>
                    </div>
                    
                    {errors.guideSelection && (
                        <div className="mb-3 p-2 bg-danger-light border border-danger rounded text-danger text-sm">
                            {errors.guideSelection}
                        </div>
                    )}

                    {selectedGuides.length > 0 ? (
                        <div>
                            <p className="text-sm text-content-tertiary mb-3">Selected Guides:</p>
                            <div className="flex flex-wrap gap-2">
                                {selectedGuides.map((guide) => (
                                    <div key={guide.id} className="flex items-center gap-2 bg-brand-light px-3 py-2 rounded-lg border border-brand-secondary">
                                        <img 
                                            src={guide.image} 
                                            alt={guide.name}
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                        <span className="text-sm font-medium text-brand-primary">{guide.name}</span>
                                        <button
                                            onClick={() => removeGuide(guide.id)}
                                            className="text-danger hover:text-danger-dark transition-colors"
                                            title="Remove guide"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-content-tertiary text-sm">No guides selected yet. Click on guide cards below to select them.</p>
                    )}

                    {selectedGuides.length > 0 && (
                        <div className="mt-3 p-3 bg-brand-light border border-brand-secondary rounded-lg">
                            <div className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                                </svg>
                                <div className="text-sm text-brand-primary">
                                    <p className="font-medium mb-1">How guide booking works:</p>
                                    <ul className="space-y-1 text-xs">
                                        <li>• Your request will be sent to all selected guides</li>
                                        <li>• The first guide to accept your request will be confirmed</li>
                                        <li>• Other pending requests will be automatically cancelled</li>
                                        <li>• You'll receive notification once a guide accepts</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filters Section */}
                <GuideFilters />

                {/* Guides Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {guides.map((guide) => (
                        <GuideCard 
                            key={guide.id} 
                            guide={guide}
                            isSelected={isGuideSelected(guide.id)}
                            onSelect={() => handleGuideSelection(guide)}
                            disabled={selectedGuides.length >= MAX_GUIDES && !isGuideSelected(guide.id)}
                        />
                    ))}
                </div>

                {/* Next Button */}
                <div className="flex justify-start">
                    <button 
                        onClick={handleNext}
                        disabled={selectedGuides.length === 0}
                        className={`px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition ${
                            selectedGuides.length === 0 
                                ? 'bg-surface-secondary text-content-tertiary cursor-not-allowed' 
                                : 'bg-brand-primary text-white hover:bg-warning'
                        }`}
                    >
                        {selectedGuides.length === 0 ? 'Select a Guide to Continue' : 'Next: Select Hotel'}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                
                <div className="text-start mt-2">
                    <p className="text-content-tertiary text-sm">
                        {selectedGuides.length > 0 
                            ? `Continue with ${selectedGuides.length} selected guide${selectedGuides.length > 1 ? 's' : ''}`
                            : 'Select at least one guide to proceed'
                        }
                    </p>
                </div>
            </div>
        </Main>
    );
}