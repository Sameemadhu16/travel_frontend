import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import Main from '../../components/Main';
import GuideFilters from './components/GuideFilters';
import GuideCard from './components/GuideCard';
import { fetchGuides, fetchGuidesWithFilters } from '../guide/service';
import FormContext from '../../context/InitialValues';
import Spinner from '../../components/Spinner';

export default function SelectGuide() {
    const navigate = useNavigate();
    const { formData, setFormData } = useContext(FormContext);
    
    // State for guides data
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});
    
    const MAX_GUIDES = 3;
    const MIN_GUIDES = 1;
    const selectedGuides = formData.selectedItems?.guides || [];
    const errors = formData.errors || {};

    // Fetch guides on component mount
    useEffect(() => {
        loadGuides();
    }, []);

    // Fetch guides with filters when filters change
    useEffect(() => {
        const loadGuidesWithFilters = async () => {
            try {
                setLoading(true);
                setError(null);
                const guidesData = await fetchGuidesWithFilters(filters);
                setGuides(guidesData);
            } catch (err) {
                console.error('Error loading guides with filters:', err);
                setError('Failed to load guides. Please try again.');
                // Fallback to empty array if API fails
                setGuides([]);
            } finally {
                setLoading(false);
            }
        };

        if (Object.keys(filters).length > 0) {
            loadGuidesWithFilters();
        }
    }, [filters]);

    const loadGuides = async () => {
        try {
            setLoading(true);
            setError(null);
            const guidesData = await fetchGuides();
            setGuides(guidesData);
        } catch (err) {
            console.error('Error loading guides:', err);
            setError('Failed to load guides. Please try again.');
            // Fallback to empty array if API fails
            setGuides([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
    };
    
    const handleGuideSelection = (guide) => {
        console.log('handleGuideSelection called:', { guide: guide.name, selectedGuides: selectedGuides.length });
        const isAlreadySelected = selectedGuides.some(g => g.id === guide.id);
        console.log('Is already selected:', isAlreadySelected);
        
        if (isAlreadySelected) {
            // Remove guide from selection
            console.log('Removing guide:', guide.name);
            removeSelectedGuide(guide.id);
            // Clear errors if we have valid selection count
            if (selectedGuides.length - 1 >= MIN_GUIDES) {
                clearFieldError('guideSelection');
            }
        } else {
            // Add guide if under limit
            if (selectedGuides.length < MAX_GUIDES) {
                console.log('Adding guide:', guide.name);
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
                    <p className="text-content-secondary">Choose up to 3 experienced local guides for your Sri Lankan adventure. Your requests will be sent to selected guides, and the first to accept will be your confirmed guide.</p>
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
                                            src={guide.profilePicture || guide.image || '/default-avatar.png'} 
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
                                        <li>• You&apos;ll receive notification once a guide accepts</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filters Section */}
                <GuideFilters onFiltersChange={handleFiltersChange} />

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-danger-light border border-danger rounded-lg text-danger">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-2-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                            <span>{error}</span>
                            <button 
                                onClick={() => setFilters({})}
                                className="ml-auto px-3 py-1 bg-danger text-white rounded text-sm hover:bg-danger-dark"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Spinner />
                        <span className="ml-3 text-content-secondary">Loading guides...</span>
                    </div>
                ) : (
                    <>
                        {/* Guides Grid */}
                        {guides.length > 0 ? (
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
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-content-secondary mb-4">
                                    <svg className="w-16 h-16 mx-auto mb-4 text-content-tertiary" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-content-primary mb-2">No guides found</h3>
                                <p className="text-content-secondary mb-4">
                                    {Object.keys(filters).length > 0 
                                        ? 'No guides match your current filters. Try adjusting your search criteria.'
                                        : 'No guides are available at the moment. Please try again later.'
                                    }
                                </p>
                                {Object.keys(filters).length > 0 && (
                                    <button 
                                        onClick={() => setFilters({})}
                                        className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-warning transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}

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