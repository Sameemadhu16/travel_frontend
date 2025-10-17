import React from 'react'
import Main from '../../../components/Main'
import { FaEdit } from 'react-icons/fa'
import StepIndicator from '../../tour/components/StepIndicator'
import PrimaryButton from '../../../components/PrimaryButton'
import { navigateTo } from '../../../core/navigateHelper'

export default function ReadyPart({ formData , handleGenerate}) {
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
    )
}
