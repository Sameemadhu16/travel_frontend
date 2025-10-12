import { FaHotel, FaMapMarkerAlt, FaRobot, FaStar, FaUserTie } from "react-icons/fa";
import { getRequest } from "../../core/service";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
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
    const capacity = Number(formData.adults) + Number(formData.children);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setError(null);
        
        try {            
            // Use the recommendation service
            const result = await recommendationService.generateRecommendations(formData);
            const bookingData = await getRequest(`/api/search/all?city=${formData.destination}&capacity=${capacity}`);
            
            // Transform the data to match RecommendationCard expectations
            const recommendations = {
                guides: bookingData.guides?.map(guide => ({
                    ...guide,
                    price: guide.pricePerDay || guide.price || 0,
                    rating: guide.rating || 4.5,
                    reviews: guide.reviews || '50+'
                })) || [],
                hotels: bookingData.hotels?.map(hotel => ({
                    ...hotel,
                    price: hotel.pricePerNight || hotel.price || 8500, // Default fake price for hotels
                    rating: hotel.rating || 4.0,
                    reviews: hotel.reviews || '30+'
                })) || [],
                vehicles: bookingData.vehicles?.map(vehicle => ({
                    ...vehicle,
                    price: vehicle.basePrice || vehicle.pricePerDay || vehicle.price || 0,
                    rating: vehicle.rating || 4.2,
                    reviews: vehicle.reviews || '25+'
                })) || [],
            };
            
            // Update missing data based on actual availability
            const missingData = {
                guides: !recommendations.guides || recommendations.guides.length === 0,
                hotels: !recommendations.hotels || recommendations.hotels.length === 0,
                vehicles: !recommendations.vehicles || recommendations.vehicles.length === 0
            };
            
            // Calculate costs based on available recommendations
            const duration = formData.duration || 1;
            const guideCost = !missingData.guides && recommendations.guides.length > 0 
                ? recommendations.guides[0].price * duration 
                : 0;
            const hotelCost = !missingData.hotels && recommendations.hotels.length > 0 
                ? recommendations.hotels[0].price * duration 
                : 0;
            const vehicleCost = !missingData.vehicles && recommendations.vehicles.length > 0 
                ? recommendations.vehicles[0].price * duration 
                : 0;
            const totalCost = guideCost + hotelCost + vehicleCost;
            
            const costs = {
                guide: guideCost,
                hotel: hotelCost,
                vehicle: vehicleCost,
                total: totalCost
            };
            
            setGeneratedTrip({
                ...result.data,
                recommendations: recommendations,
                missingData: missingData,
                costs: costs,
                hasData: totalCost > 0
            });
        } catch (error) {
            console.error(error);
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
                "Check your internet connection",
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