import { FaCar, FaCheck, FaHotel, FaMapMarkerAlt, FaRobot, FaStar, FaUserTie } from "react-icons/fa";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import { useState } from "react";

export default function AIGenerationStep({  generatedTrip, isGenerating, onGenerate, onEdit }){

    const [formData, setFormData] = useState({
        destination: '',
    })
    if (isGenerating) {
        return (
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
        );
    }

    if (!generatedTrip) {
        return (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-accent rounded-full mb-6">
                    <FaRobot className="text-brand-primary text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-content-primary mb-4">Ready to Generate Your Trip?</h2>
                <p className="text-content-secondary mb-8">Based on your preferences, we'll create a personalized itinerary with recommendations for guides, hotels, and vehicles</p>
                
                {/* Summary of selections */}
                <div className="max-w-2xl mx-auto bg-surface-secondary rounded-lg p-6 mb-8">
                    <h3 className="font-semibold text-content-primary mb-4">Trip Summary</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="text-left">
                            <p><span className="font-medium">Destination:</span> {formData.destination}</p>
                            <p><span className="font-medium">Duration:</span> {formData.duration} days</p>
                            <p><span className="font-medium">Group:</span> {formData.adults} adults, {formData.children} children</p>
                        </div>
                        <div className="text-left">
                            <p><span className="font-medium">Trip Type:</span> {formData.tripType?.[0] || 'Not selected'}</p>
                            <p><span className="font-medium">Budget:</span> {formData.budget || 'Flexible'}</p>
                            <p><span className="font-medium">Activity Level:</span> {formData.activityLevel || 'Not selected'}</p>
                        </div>
                    </div>
                </div>

                <PrimaryButton
                    text="Generate My Trip with AI"
                    onClick={onGenerate}
                    className="max-w-md mx-auto"
                />
            </div>
        );
    }

    // Show generated trip results
    return (
        <div className="space-y-8">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-full mb-4">
                    <FaCheck className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-content-primary mb-2">Your Perfect Trip is Ready!</h2>
                <p className="text-content-secondary">Here's your AI-generated itinerary with personalized recommendations</p>
            </div>

            {/* Trip Overview */}
            <div className="bg-gradient-to-r from-brand-accent to-brand-secondary rounded-lg p-6">
                <h3 className="text-xl font-bold text-content-primary mb-4">{formData.destination} - {formData.duration} Day Adventure</h3>
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <FaMapMarkerAlt className="text-brand-primary text-2xl mx-auto mb-2" />
                        <p className="text-sm font-medium text-content-primary">Destinations</p>
                        <p className="text-lg font-bold text-brand-primary">{generatedTrip.itinerary?.destinations || 8}</p>
                    </div>
                    <div className="text-center">
                        <FaUserTie className="text-brand-primary text-2xl mx-auto mb-2" />
                        <p className="text-sm font-medium text-content-primary">Recommended Guides</p>
                        <p className="text-lg font-bold text-brand-primary">{generatedTrip.recommendations?.guides?.length || 3}</p>
                    </div>
                    <div className="text-center">
                        <FaHotel className="text-brand-primary text-2xl mx-auto mb-2" />
                        <p className="text-sm font-medium text-content-primary">Hotel Options</p>
                        <p className="text-lg font-bold text-brand-primary">{generatedTrip.recommendations?.hotels?.length || 5}</p>
                    </div>
                    <div className="text-center">
                        <FaCar className="text-brand-primary text-2xl mx-auto mb-2" />
                        <p className="text-sm font-medium text-content-primary">Vehicle Options</p>
                        <p className="text-lg font-bold text-brand-primary">{generatedTrip.recommendations?.vehicles?.length || 3}</p>
                    </div>
                </div>
            </div>

            {/* Daily Itinerary Preview */}
            <div>
                <h3 className="text-xl font-bold text-content-primary mb-4">Daily Itinerary</h3>
                <div className="space-y-4">
                    {Array.from({length: parseInt(formData.duration)}, (_, index) => (
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
                        {[1,2,3].map(i => (
                            <div key={i} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-content-primary">Guide {i}</p>
                                    <div className="flex items-center">
                                        <FaStar className="text-warning text-xs mr-1" />
                                        <span className="text-xs text-content-secondary">4.{8+i} (120+ reviews)</span>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-brand-primary">$50/day</span>
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
                        {[1,2,3].map(i => (
                            <div key={i} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-content-primary">Hotel {i}</p>
                                    <div className="flex items-center">
                                        <FaStar className="text-warning text-xs mr-1" />
                                        <span className="text-xs text-content-secondary">4.{6+i} (80+ reviews)</span>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-brand-primary">${30+i*20}/night</span>
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
                        {[1,2,3].map(i => (
                            <div key={i} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-content-primary">Vehicle {i}</p>
                                    <div className="flex items-center">
                                        <FaStar className="text-warning text-xs mr-1" />
                                        <span className="text-xs text-content-secondary">4.{7+i} (50+ reviews)</span>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-brand-primary">${25+i*15}/day</span>
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
                        <p className="text-xl font-bold text-brand-primary">$150</p>
                    </div>
                    <div>
                        <p className="text-sm text-content-secondary">Hotels</p>
                        <p className="text-xl font-bold text-brand-primary">$200</p>
                    </div>
                    <div>
                        <p className="text-sm text-content-secondary">Transport</p>
                        <p className="text-xl font-bold text-brand-primary">$100</p>
                    </div>
                    <div>
                        <p className="text-sm text-content-secondary font-bold">Total</p>
                        <p className="text-2xl font-bold text-success">$450</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
                <SecondaryButton
                    text="Edit Trip Details"
                    onClick={onEdit}
                    image=""
                />
                <PrimaryButton
                    text="Proceed to Booking"
                    onClick={() => console.log('Proceed to booking')}
                />
            </div>
        </div>
    );
};