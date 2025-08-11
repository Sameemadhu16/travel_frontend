import { FaCar, FaCheck, FaEdit, FaHotel, FaMapMarkerAlt, FaRobot, FaStar, FaUserTie } from "react-icons/fa";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import StepIndicator from "../../components/StepIndicator";
import { useContext, useState } from "react";
import Main from "../../components/Main";
import { navigateTo } from "../../core/navigateHelper";
import FormContext from "../../context/InitialValues";
import { recommendationService } from "../../api/recommendationService";

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
    
    // Error state
    if (error) {
        return (
            <Main>
                <StepIndicator currentStep={3} />
                <div className="text-center py-12 justify-center items-center flex flex-col">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-error rounded-full mb-6">
                        <FaRobot className="text-white text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-content-primary mb-4">Oops! Something went wrong</h2>
                    <p className="text-content-secondary mb-8 max-w-md mx-auto">{error}</p>
                    <div className="flex space-x-4 w-1/2 ">
                        <PrimaryButton
                            text="Try Again"
                            onClick={handleGenerate}
                        />
                        <SecondaryButton
                            text="Edit Details"
                            onClick={handleEdit}
                        />
                    </div>
                </div>
            </Main>
        );
    }

    if (isGenerating) {
        return (
            <Main>
                <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-accent rounded-full mb-6 animate-pulse">
                        <FaRobot className="text-brand-primary text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-content-primary mb-4">Creating Your Perfect Trip...</h2>
                    <p className="text-content-secondary mb-8">Our AI is analyzing your preferences and matching them with the best local experiences</p>
                    <div className="max-w-md mx-auto bg-surface-secondary rounded-lg p-6">
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-brand-primary rounded-full animate-pulse mr-3"></div>
                                <span className="text-content-secondary">Analyzing destination and preferences...</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-brand-primary rounded-full animate-pulse mr-3" style={{animationDelay: '0.5s'}}></div>
                                <span className="text-content-secondary">Finding best guides and activities...</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-brand-primary rounded-full animate-pulse mr-3" style={{animationDelay: '1s'}}></div>
                                <span className="text-content-secondary">Matching hotels and transportation...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
        );
    }

    // Show trip generation form if no trip generated yet
    if (!generatedTrip) {
        return (
            <Main>
                <StepIndicator currentStep={3} />
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-content-primary mb-4">Ready to Generate Your Trip?</h2>
                    <p className="text-content-secondary mb-8">Based on your preferences, we'll create a personalized itinerary with recommendations for guides, hotels, and vehicles</p>
                    
                    {/* Summary of selections */}
                    <div className="max-w-3xl mx-auto bg-surface-secondary rounded-2xl p-8 mb-10 border border-gray-200">
                        <div className="flex justify-between items-center mb-6 border-b pb-3">
                            <h3 className="font-bold text-2xl text-content-primary">
                                Trip Summary
                            </h3>
                            <div 
                                onClick={() => navigateTo('/ai-trip/basic-info')}
                                className="flex items-center justify-center gap-1 text-brand-primary cursor-pointer hover:underline">
                                <FaEdit/>
                                <p>Edit</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 text-lg leading-relaxed">
                            {/* Left column */}
                            <div className="text-left space-y-3">
                            <p>
                                <span className="font-semibold text-gray-800">Destination:</span>{" "}
                                {formData.destination || "Not specified"}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-800">Duration:</span>{" "}
                                {formData.duration || "0"} days
                            </p>
                            <p>
                                <span className="font-semibold text-gray-800">Group:</span>{" "}
                                {formData.adults || 0} adults, {formData.children || 0} children
                            </p>
                            </div>

                            {/* Right column */}
                            <div className="text-left space-y-3">
                            <p>
                                <span className="font-semibold text-gray-800">Trip Type:</span>{" "}
                                {Array.isArray(formData.tripType) ? formData.tripType.join(', ') : (formData.tripType || "Not selected")}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-800">Budget:</span>{" "}
                                {formData.budget || "Flexible"}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-800">Activity Level:</span>{" "}
                                {formData.activityLevel || "Not selected"}
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <PrimaryButton
                            text="Generate My Trip with AI"
                            onClick={handleGenerate}
                            className="max-w-md mx-auto"
                        />
                    </div>
                </div>
            </Main>
        );
    }

    // Show generated trip results
    return (
        <Main>
            <div className="space-y-8">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-full mb-4">
                    <FaCheck className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-content-primary mb-2">Your Perfect Trip is Ready!</h2>
                <p className="text-content-secondary">Here's your AI-generated itinerary with personalized recommendations</p>
            </div>

            {/* Trip Overview */}
            <div className="bg-brand-accent rounded-lg p-6">
                <h3 className="text-xl font-bold text-content-primary mb-4">{formData.destination} - {formData.duration} Day Adventure</h3>
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <FaMapMarkerAlt className="text-brand-primary text-2xl mx-auto mb-2" />
                        <p className="text-sm font-medium text-content-primary">Destinations</p>
                        <p className="text-lg font-bold text-brand-primary">{generatedTrip?.itinerary?.destinations || formData.duration}</p>
                    </div>
                    <div className="text-center">
                        <FaUserTie className="text-brand-primary text-2xl mx-auto mb-2" />
                        <p className="text-sm font-medium text-content-primary">Recommended Guides</p>
                        <p className="text-lg font-bold text-brand-primary">{generatedTrip?.recommendations?.guides?.length || 3}</p>
                    </div>
                    <div className="text-center">
                        <FaHotel className="text-brand-primary text-2xl mx-auto mb-2" />
                        <p className="text-sm font-medium text-content-primary">Hotel Options</p>
                        <p className="text-lg font-bold text-brand-primary">{generatedTrip?.recommendations?.hotels?.length || 3}</p>
                    </div>
                    <div className="text-center">
                        <FaCar className="text-brand-primary text-2xl mx-auto mb-2" />
                        <p className="text-sm font-medium text-content-primary">Vehicle Options</p>
                        <p className="text-lg font-bold text-brand-primary">{generatedTrip?.recommendations?.vehicles?.length || 3}</p>
                    </div>
                </div>
            </div>

            {/* Daily Itinerary Preview */}
            <div>
                <h3 className="text-xl font-bold text-content-primary mb-4">Daily Itinerary</h3>
                <div className="space-y-4">
                    {generatedTrip?.itinerary?.dailyPlans?.map((day, index) => (
                        <div key={index} className="bg-white border border-border-light rounded-lg p-4">
                            <h4 className="font-semibold text-content-primary mb-2">Day {day.day} - {day.destination}</h4>
                            <div className="text-sm text-content-secondary space-y-1">
                                {day.activities?.map((activity, i) => (
                                    <p key={i}>• {activity}</p>
                                )) || (
                                    <>
                                        <p>• Morning: Temple visit and cultural exploration</p>
                                        <p>• Afternoon: Local market tour and lunch</p>
                                        <p>• Evening: Scenic viewpoint and sunset</p>
                                    </>
                                )}
                            </div>
                            {day.highlights && day.highlights.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-gray-100">
                                    <p className="text-xs font-medium text-brand-primary">Highlights:</p>
                                    <div className="text-xs text-content-secondary">
                                        {day.highlights.map((highlight, i) => (
                                            <span key={i} className="inline-block bg-brand-accent px-2 py-1 rounded mr-1 mt-1">{highlight}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )) || Array.from({length: parseInt(formData.duration)}, (_, index) => (
                        <div key={index} className="bg-white border border-border-light rounded-lg p-4">
                            <h4 className="font-semibold text-content-primary mb-2">Day {index + 1}</h4>
                            <div className="text-sm text-content-secondary space-y-1">
                                <p>• Morning: Temple visit and cultural exploration</p>
                                <p>• Afternoon: Local market tour and lunch</p>
                                <p>• Evening: Scenic viewpoint and sunset</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recommendations Preview */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Guides */}
                <div className="bg-white border border-border-light rounded-lg p-4">
                    <h4 className="font-semibold text-content-primary mb-3 flex items-center">
                        <FaUserTie className="mr-2 text-brand-primary" />
                        Top Recommended Guides
                    </h4>
                    <div className="space-y-3">
                        {generatedTrip?.recommendations?.guides?.map((guide, i) => (
                            <div key={guide.id || i} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-content-primary">{guide.name}</p>
                                    <div className="flex items-center">
                                        <FaStar className="text-warning text-xs mr-1" />
                                        <span className="text-xs text-content-secondary">{guide.rating} ({guide.reviews}+ reviews)</span>
                                    </div>
                                    {guide.specialties && (
                                        <p className="text-xs text-brand-primary">{guide.specialties}</p>
                                    )}
                                </div>
                                <span className="text-sm font-bold text-brand-primary">LKR {guide.price}/day</span>
                            </div>
                        )) || [1,2,3].map(i => (
                            <div key={i} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-content-primary">Guide {i}</p>
                                    <div className="flex items-center">
                                        <FaStar className="text-warning text-xs mr-1" />
                                        <span className="text-xs text-content-secondary">4.{8+i} (120+ reviews)</span>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-brand-primary">LKR 15,000/day</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hotels */}
                <div className="bg-white border border-border-light rounded-lg p-4">
                    <h4 className="font-semibold text-content-primary mb-3 flex items-center">
                        <FaHotel className="mr-2 text-brand-primary" />
                        Recommended Hotels
                    </h4>
                    <div className="space-y-3">
                        {generatedTrip?.recommendations?.hotels?.map((hotel, i) => (
                            <div key={hotel.id || i} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-content-primary">{hotel.name}</p>
                                    <div className="flex items-center">
                                        <FaStar className="text-warning text-xs mr-1" />
                                        <span className="text-xs text-content-secondary">{hotel.rating} ({hotel.reviews}+ reviews)</span>
                                    </div>
                                    {hotel.location && (
                                        <p className="text-xs text-brand-primary">{hotel.location}</p>
                                    )}
                                </div>
                                <span className="text-sm font-bold text-brand-primary">LKR {hotel.price}/night</span>
                            </div>
                        )) || [1,2,3].map(i => (
                            <div key={i} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-content-primary">Hotel {i}</p>
                                    <div className="flex items-center">
                                        <FaStar className="text-warning text-xs mr-1" />
                                        <span className="text-xs text-content-secondary">4.{6+i} (80+ reviews)</span>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-brand-primary">LKR {9000+i*6000}/night</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vehicles */}
                <div className="bg-white border border-border-light rounded-lg p-4">
                    <h4 className="font-semibold text-content-primary mb-3 flex items-center">
                        <FaCar className="mr-2 text-brand-primary" />
                        Recommended Vehicles
                    </h4>
                    <div className="space-y-3">
                        {generatedTrip?.recommendations?.vehicles?.map((vehicle, i) => (
                            <div key={vehicle.id || i} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-content-primary">{vehicle.name}</p>
                                    <div className="flex items-center">
                                        <FaStar className="text-warning text-xs mr-1" />
                                        <span className="text-xs text-content-secondary">{vehicle.rating} ({vehicle.reviews}+ reviews)</span>
                                    </div>
                                    {vehicle.capacity && (
                                        <p className="text-xs text-brand-primary">Capacity: {vehicle.capacity} people</p>
                                    )}
                                </div>
                                <span className="text-sm font-bold text-brand-primary">LKR {vehicle.price}/day</span>
                            </div>
                        )) || [1,2,3].map(i => (
                            <div key={i} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-content-primary">Vehicle {i}</p>
                                    <div className="flex items-center">
                                        <FaStar className="text-warning text-xs mr-1" />
                                        <span className="text-xs text-content-secondary">4.{7+i} (50+ reviews)</span>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-brand-primary">LKR {7500+i*4500}/day</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Estimated Cost */}
            <div className="bg-surface-secondary rounded-lg p-6">
                <h3 className="text-lg font-bold text-content-primary mb-4">Estimated Trip Cost</h3>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-sm text-content-secondary">Guides</p>
                        <p className="text-xl font-bold text-brand-primary">
                            LKR {(generatedTrip?.recommendations?.guides?.[0]?.price || 15000) * parseInt(formData.duration)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-content-secondary">Hotels</p>
                        <p className="text-xl font-bold text-brand-primary">
                            LKR {(generatedTrip?.recommendations?.hotels?.[0]?.price || 24000) * parseInt(formData.duration)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-content-secondary">Transport</p>
                        <p className="text-xl font-bold text-brand-primary">
                            LKR {(generatedTrip?.recommendations?.vehicles?.[0]?.price || 12000) * parseInt(formData.duration)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-content-secondary font-bold">Total</p>
                        <p className="text-2xl font-bold text-success">
                            LKR {((generatedTrip?.recommendations?.guides?.[0]?.price || 15000) + 
                                (generatedTrip?.recommendations?.hotels?.[0]?.price || 24000) + 
                               (generatedTrip?.recommendations?.vehicles?.[0]?.price || 12000)) * parseInt(formData.duration)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="w-1/2 grid md:grid-cols-2 gap-4">
                <SecondaryButton
                    text="Edit Trip Details"
                    onClick={handleEdit}
                    image=""
                />
                <PrimaryButton
                    text="Proceed to Booking"
                    onClick={() => console.log('Proceed to booking')}
                />
            </div>
        </div>
        </Main>
    );
};