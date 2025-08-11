import { FaCar, FaCheck, FaEdit, FaHotel, FaMapMarkerAlt, FaRobot, FaStar, FaUserTie } from "react-icons/fa";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import StepIndicator from "../../components/StepIndicator";
import { useContext, useState } from "react";
import Main from "../../components/Main";
import { navigateTo } from "../../core/navigateHelper";
import FormContext from "../../context/InitialValues";
import { recommendationService } from "../../api/recommendationService";
import GeneratingContent from "./components/GeneratingContent";
import ReadyPart from "./components/ReadyPart";
import GeneratedTrip from "./components/GeneratedTrip";

export default function AIGenerationStep(){

    const { formData } = useContext(FormContext);
    
    // State management for AI generation
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedTrip, setGeneratedTrip] = useState(null);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setError(null);
        
        try {            
            // Use the recommendation service
            const result = await recommendationService.generateRecommendations(formData);
                        setGeneratedTrip(result.data);
            
        } catch (error) {
            console.error('❌ Error generating trip:', error);
            setError(error.message || 'Failed to generate trip. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleEdit = () => {
        navigateTo('/ai-trip/basic-info');
    };
    
    // Enhanced error handling function
    const getErrorContent = (errorMessage) => {
        const lowerError = errorMessage.toLowerCase();
        
        if (lowerError.includes('database connection')) {
            return {
                icon: FaRobot,
                title: "Service Temporarily Unavailable",
                message: "Our recommendation service is currently experiencing technical difficulties.",
                suggestions: [
                    "Please try again in a few moments",
                    "Check your internet connection",
                    "Contact support if the problem persists"
                ],
                actions: [
                    { label: "Try Again", action: handleGenerate, type: "primary" },
                    { label: "Go Back", action: handleEdit, type: "secondary" }
                ]
            };
        }
        
        if (lowerError.includes('no travel data found')) {
            return {
                icon: FaMapMarkerAlt,
                title: "Destination Not Found",
                message: errorMessage,
                suggestions: [
                    "Check the spelling of your destination",
                    "Try a nearby major city instead",
                    "Contact us to add this destination to our database"
                ],
                actions: [
                    { label: "Edit Destination", action: handleEdit, type: "primary" },
                    { label: "Try Again", action: handleGenerate, type: "secondary" }
                ]
            };
        }
        
        // Default error case
        return {
            icon: FaRobot,
            title: "Something went wrong",
            message: errorMessage,
            suggestions: [
                "Please try again",
                "Check your input details",
                "Contact support if the issue continues"
            ],
            actions: [
                { label: "Try Again", action: handleGenerate, type: "primary" },
                { label: "Edit Details", action: handleEdit, type: "secondary" }
            ]
        };
    };
    
    // Error state
    if (error) {
        const errorContent = getErrorContent(error);
        const IconComponent = errorContent.icon;
        
        return (
            <Main>
                <div className="text-center mb-60 justify-center items-center flex flex-col max-w-2xl mx-auto">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-error rounded-full mb-6">
                        <IconComponent className="text-white text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-content-primary mb-4">{errorContent.title}</h2>
                    <p className="text-content-secondary mb-6 max-w-md mx-auto">{errorContent.message}</p>
                    
                    {/* Suggestions */}
                    <div className="bg-surface-secondary rounded-lg p-6 mb-8 w-full max-w-lg">
                        <h3 className="font-semibold text-content-primary mb-3">Possible solutions:</h3>
                        <ul className="text-left space-y-2">
                            {errorContent.suggestions.map((suggestion, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-brand-primary mr-2">•</span>
                                    <span className="text-content-secondary text-sm">{suggestion}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex space-x-4 w-full max-w-md">
                        {errorContent.actions.map((action, index) => (
                            action.type === "primary" ? (
                                <PrimaryButton
                                    key={index}
                                    text={action.label}
                                    onClick={action.action}
                                />
                            ) : (
                                <SecondaryButton
                                    key={index}
                                    text={action.label}
                                    onClick={action.action}
                                />
                            )
                        ))}
                    </div>
                </div>
            </Main>
        );
    }

    if (isGenerating) {
        return (
            <GeneratingContent/>
        );
    }

    // Show trip generation form if no trip generated yet
    if (!generatedTrip) {
        return (
            <ReadyPart formData={formData} handleGenerate={handleGenerate}/>
        );
    }

    // Show generated trip results
    return (
        <GeneratedTrip generatedTrip={generatedTrip} handleEdit={handleEdit} formData={formData}/>
    );
};