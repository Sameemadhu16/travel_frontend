import { FaCar, FaCheck, FaHotel, FaMapMarkerAlt, FaStar, FaUserTie } from 'react-icons/fa'
import Main from '../../../components/Main'
import SecondaryButton from '../../../components/SecondaryButton'
import PrimaryButton from '../../../components/PrimaryButton'
import RecommendationCard from './RecommendationCard'
import { useMemo } from 'react'

export default function GeneratedTrip({ generatedTrip, handleEdit, formData }) {

    const tripPlain = useMemo(()=>{
        return generatedTrip?.itinerary?.dailyPlans?.map((day, index) => (
            <div key={index} className="bg-white border border-border-light rounded-lg p-4">
                <h4 className="font-semibold text-content-primary mb-2">Day {day.day} - {day.destination}</h4>
                <div className="text-sm text-content-secondary space-y-1">
                    {day.activities?.map((activity, i) => (
                        <p key={i}>• {activity}</p>
                    ))}
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
        )) || (
            <div className="text-center py-6 bg-surface-secondary rounded-lg">
                <p className="text-content-secondary">No itinerary available</p>
            </div>
        )
    },[generatedTrip])
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
                            <p className="text-lg font-bold text-brand-primary">{generatedTrip?.itinerary?.destinations || 0}</p>
                        </div>
                        <div className="text-center">
                            <FaUserTie className="text-brand-primary text-2xl mx-auto mb-2" />
                            <p className="text-sm font-medium text-content-primary">Recommended Guides</p>
                            <p className="text-lg font-bold text-brand-primary">
                                {generatedTrip?.missingData?.guides ? 
                                    <span className="text-gray-400">Not Available</span> : 
                                    generatedTrip?.recommendations?.guides?.length || 0
                                }
                            </p>
                        </div>
                        <div className="text-center">
                            <FaHotel className="text-brand-primary text-2xl mx-auto mb-2" />
                            <p className="text-sm font-medium text-content-primary">Hotel Options</p>
                            <p className="text-lg font-bold text-brand-primary">
                                {generatedTrip?.missingData?.hotels ? 
                                    <span className="text-gray-400">Not Available</span> : 
                                    generatedTrip?.recommendations?.hotels?.length || 0
                                }
                            </p>
                        </div>
                        <div className="text-center">
                            <FaCar className="text-brand-primary text-2xl mx-auto mb-2" />
                            <p className="text-sm font-medium text-content-primary">Vehicle Options</p>
                            <p className="text-lg font-bold text-brand-primary">
                                {generatedTrip?.missingData?.vehicles ? 
                                    <span className="text-gray-400">Not Available</span> : 
                                    generatedTrip?.recommendations?.vehicles?.length || 0
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Daily Itinerary Preview */}
                <div>
                    <h3 className="text-xl font-bold text-content-primary mb-4">Daily Itinerary</h3>
                    <div className="space-y-4">
                        {tripPlain}
                    </div>
                </div>

                {/* Recommendations Preview */}
                <div className="grid md:grid-cols-3 gap-6">
                    <RecommendationCard
                        icon={FaUserTie}
                        title="Top Recommended Guides"
                        items={generatedTrip?.recommendations?.guides}
                        isMissing={generatedTrip?.missingData?.guides}
                        missingMessage={`No verified guides found for ${formData.destination}`}
                        missingDescription="Try searching nearby cities or we'll help you find suitable guides."
                        priceUnit="day"
                        extraField="specialties"
                    />

                    <RecommendationCard
                        icon={FaHotel}
                        title="Recommended Hotels"
                        items={generatedTrip?.recommendations?.hotels}
                        isMissing={generatedTrip?.missingData?.hotels}
                        missingMessage={`No hotels found for ${formData.destination}`}
                        missingDescription="Try searching for nearby cities or contact us to add hotels in this area."
                        priceUnit="night"
                        extraField="location"
                    />

                    <RecommendationCard
                        icon={FaCar}
                        title="Recommended Vehicles"
                        items={generatedTrip?.recommendations?.vehicles}
                        isMissing={generatedTrip?.missingData?.vehicles}
                        missingMessage={`No suitable vehicles for ${formData.adults + formData.children} people`}
                        missingDescription="Try reducing group size or contact us for custom vehicle arrangements."
                        priceUnit="day"
                        extraField="capacity"
                        extraFieldLabel="Capacity"
                    />
                </div>

                {/* Estimated Cost */}
                <div className="bg-surface-secondary rounded-lg p-6">
                    <h3 className="text-lg font-bold text-content-primary mb-4">Estimated Trip Cost</h3>
                    <div className="grid md:grid-cols-4 gap-4 text-center">
                        <div>
                            <p className="text-sm text-content-secondary">Guides</p>
                            <p className="text-xl font-bold text-brand-primary">
                                {generatedTrip?.costs?.guide === 0 || generatedTrip?.missingData?.guides ? 
                                    <span className="text-gray-400">LKR 0</span> :
                                    `LKR ${generatedTrip?.costs?.guide?.toLocaleString()}`
                                }
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-content-secondary">Hotels</p>
                            <p className="text-xl font-bold text-brand-primary">
                                {generatedTrip?.costs?.hotel === 0 || generatedTrip?.missingData?.hotels ? 
                                    <span className="text-gray-400">LKR 0</span> :
                                    `LKR ${generatedTrip?.costs?.hotel?.toLocaleString()}`
                                }
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-content-secondary">Transport</p>
                            <p className="text-xl font-bold text-brand-primary">
                                {generatedTrip?.costs?.vehicle === 0 || generatedTrip?.missingData?.vehicles ? 
                                    <span className="text-gray-400">LKR 0</span> :
                                    `LKR ${generatedTrip?.costs?.vehicle?.toLocaleString()}`
                                }
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-content-secondary font-bold">Total</p>
                            <p className="text-2xl font-bold text-success">
                                {generatedTrip?.costs?.total === 0 || !generatedTrip?.hasData ? 
                                    <span className="text-gray-400">LKR 0</span> :
                                    `LKR ${generatedTrip?.costs?.total?.toLocaleString()}`
                                }
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
    )
}
