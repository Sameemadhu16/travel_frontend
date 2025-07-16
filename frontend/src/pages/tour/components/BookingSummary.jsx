import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTourContext } from '../../../context/TourContext';
import jsPDF from 'jspdf';

export default function BookingSummary() {
    const navigate = useNavigate();
    const { 
        bookingSummary, 
        travelDetails, 
        selectedItems, 
        contactInfo,
        agreedToTerms, 
        setAgreedToTerms,
        isTourComplete,
        isTourCompleteCheck 
    } = useTourContext();

    const handleCompleteRequest = () => {
        if (agreedToTerms && isTourComplete()) {
            navigate('/tour/request-sent');
        }
    };

    const handleSaveAsDraft = () => {
        generatePDFReport();
    };

    // Calculate costs for individual guide requests
    const calculateIndividualGuideCosts = () => {
        if (!selectedItems.guides || selectedItems.guides.length === 0) return [];
        
        const baseCosts = {
            hotels: bookingSummary.hotelsCost || 0,
            vehicles: bookingSummary.vehiclesCost || 0,
        };
        
        return selectedItems.guides.map((guide, index) => {
            const guidePrice = guide.price || guide.pricePerDay || 8500;
            const duration = travelDetails.duration ? 
                parseInt(travelDetails.duration.match(/(\d+)/)?.[1] || '1') : 1;
            const guideCost = guidePrice * duration;
            
            const subtotal = guideCost + baseCosts.hotels + baseCosts.vehicles;
            const serviceFee = Math.round(subtotal * 0.05);
            const taxes = Math.round(subtotal * 0.08);
            const totalCost = subtotal + serviceFee + taxes;
            
            return {
                guide,
                guideCost,
                hotelsCost: baseCosts.hotels,
                vehiclesCost: baseCosts.vehicles,
                subtotal,
                serviceFee,
                taxes,
                totalCost,
                duration
            };
        });
    };

    const individualCosts = calculateIndividualGuideCosts();

    const generatePDFReport = () => {
        const doc = new jsPDF();
        const individualCosts = calculateIndividualGuideCosts();
        
        // Header
        doc.setFontSize(20);
        doc.setTextColor(251, 146, 60); // brand-primary color
        doc.text('Travel.lk - Tour Request Draft', 20, 30);
        
        // Date
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
        
        // Destination Details
        doc.setFontSize(16);
        doc.setTextColor(251, 146, 60);
        doc.text('Destination Details', 20, 65);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Destination: ${travelDetails.destination || 'Not specified'}`, 20, 80);
        doc.text(`Duration: ${travelDetails.duration || 'Not specified'}`, 20, 95);
        doc.text(`Start Date: ${travelDetails.startDate || 'Not specified'}`, 20, 110);
        doc.text(`Travelers: ${travelDetails.adults} Adults${travelDetails.children > 0 ? `, ${travelDetails.children} Children` : ''}`, 20, 125);
        
        // Individual Guide Requests
        if (individualCosts.length > 0) {
            doc.setFontSize(16);
            doc.setTextColor(251, 146, 60);
            doc.text('Guide Request Options', 20, 150);
            
            let currentY = 170;
            individualCosts.forEach((guideCost, index) => {
                // Check if we need a new page
                if (currentY > 250) {
                    doc.addPage();
                    currentY = 30;
                }
                
                doc.setFontSize(14);
                doc.setTextColor(251, 146, 60);
                doc.text(`Option ${index + 1}: ${guideCost.guide.name}`, 20, currentY);
                
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0);
                currentY += 15;
                
                doc.text(`Guide: ${guideCost.guide.name}`, 25, currentY);
                currentY += 12;
                doc.text(`Specialty: ${guideCost.guide.specialty || 'Professional Tour Guide'}`, 25, currentY);
                currentY += 12;
                doc.text(`Rating: ${guideCost.guide.rating || '4.8'} (${guideCost.guide.reviewCount || '100+'} reviews)`, 25, currentY);
                currentY += 12;
                doc.text(`Price: LKR ${(guideCost.guide.price || guideCost.guide.pricePerDay || 8500).toLocaleString()} per day`, 25, currentY);
                currentY += 20;
                
                // Cost breakdown for this guide
                doc.setFontSize(12);
                doc.setTextColor(60, 60, 60);
                doc.text('Cost Breakdown:', 25, currentY);
                currentY += 12;
                doc.text(`Guide Cost (${guideCost.duration} days): LKR ${guideCost.guideCost.toLocaleString()}`, 30, currentY);
                currentY += 12;
                doc.text(`Hotels Cost: LKR ${guideCost.hotelsCost.toLocaleString()}`, 30, currentY);
                currentY += 12;
                doc.text(`Transportation: LKR ${guideCost.vehiclesCost.toLocaleString()}`, 30, currentY);
                currentY += 12;
                doc.text(`Service Fee (5%): LKR ${guideCost.serviceFee.toLocaleString()}`, 30, currentY);
                currentY += 12;
                doc.text(`Taxes (8%): LKR ${guideCost.taxes.toLocaleString()}`, 30, currentY);
                currentY += 15;
                
                doc.setFontSize(14);
                doc.setTextColor(251, 146, 60);
                doc.text(`Total for Option ${index + 1}: LKR ${guideCost.totalCost.toLocaleString()}`, 30, currentY);
                currentY += 25;
            });
        }
        
        // Add new page for additional details
        doc.addPage();
        
        // Hotel Bookings
        doc.setFontSize(16);
        doc.setTextColor(251, 146, 60);
        doc.text('Hotel Bookings', 20, 30);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        if (selectedItems.hotels && selectedItems.hotels.length > 0) {
            let yPos = 45;
            selectedItems.hotels.forEach((hotel, index) => {
                doc.text(`${index + 1}. ${hotel.name} - ${hotel.roomType || 'Standard Room'}`, 20, yPos);
                yPos += 15;
                if (hotel.checkIn && hotel.checkOut) {
                    doc.text(`   ${hotel.checkIn} to ${hotel.checkOut}`, 25, yPos);
                    yPos += 15;
                }
            });
        } else {
            doc.text('No hotels selected yet', 20, 45);
        }
        
        // Transportation
        let transportY = 120;
        doc.setFontSize(16);
        doc.setTextColor(251, 146, 60);
        doc.text('Transportation', 20, transportY);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        transportY += 15;
        
        if (selectedItems.selectedVehicle) {
            doc.text(`Vehicle: ${selectedItems.selectedVehicle.name}`, 20, transportY);
            transportY += 15;
            doc.text(`Type: ${selectedItems.selectedVehicle.type}`, 20, transportY);
            transportY += 15;
            doc.text(`Features: ${selectedItems.selectedVehicle.features?.join(', ') || 'Standard features'}`, 20, transportY);
        } else {
            doc.text('No vehicle selected yet', 20, transportY);
        }
        
        // Footer
        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        doc.text('This is a draft tour request. You will choose one guide from the options above.', 20, 250);
        doc.text('Prices are subject to change. Contact us: +94 11 234 5678 | support@travel.lk', 20, 265);
        
        // Save the PDF
        doc.save('tour-request-draft.pdf');
    };

    return (
        <div className="bg-white rounded-lg border border-brand-primary p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-content-primary mb-4">Booking Summary</h2>
            
            {individualCosts.length > 0 ? (
                <div className="space-y-6">
                    {individualCosts.map((guideCost, index) => (
                        <div key={index} className="border border-border-light rounded-lg p-4">
                            <h3 className="text-md font-semibold text-content-primary mb-3">
                                Option {index + 1}: {guideCost.guide.name}
                            </h3>
                            
                            {/* Guide Details */}
                            <div className="mb-3 p-3 bg-surface-secondary rounded-lg">
                                <div className="text-sm text-content-secondary mb-1">
                                    {guideCost.guide.specialty || 'Professional Tour Guide'}
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-warning fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <span className="text-content-secondary">
                                            {guideCost.guide.rating || '4.8'}
                                        </span>
                                    </div>
                                    <span className="text-content-disabled">•</span>
                                    <span className="text-content-secondary">
                                        {guideCost.guide.reviewCount || '100+'} reviews
                                    </span>
                                </div>
                            </div>
                            
                            {/* Cost Breakdown */}
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-content-secondary">
                                        Guide Cost ({guideCost.duration} days):
                                    </span>
                                    <span className="font-medium">LKR {guideCost.guideCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-content-secondary">Hotels Cost:</span>
                                    <span className="font-medium">LKR {guideCost.hotelsCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-content-secondary">Vehicles Cost:</span>
                                    <span className="font-medium">LKR {guideCost.vehiclesCost.toLocaleString()}</span>
                                </div>
                                <div className="border-t border-border-light pt-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-content-secondary">Service Fee (5%):</span>
                                        <span className="font-medium">LKR {guideCost.serviceFee.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-content-secondary">Taxes (8%):</span>
                                        <span className="font-medium">LKR {guideCost.taxes.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="border-t border-brand-primary pt-2">
                                    <div className="flex justify-between text-md font-bold">
                                        <span className="text-content-primary">Option {index + 1} Total:</span>
                                        <span className="text-brand-primary">LKR {guideCost.totalCost.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <div className="bg-info-light border border-info rounded-lg p-4">
                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-info mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                            </svg>
                            <div className="text-sm text-info-dark">
                                <strong>Multiple Guide Options:</strong> You've selected {individualCosts.length} guides. 
                                You can choose one guide from these options when finalizing your tour. 
                                Each option shows the total cost if you select that specific guide.
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 text-content-secondary">
                    <svg className="w-12 h-12 mx-auto mb-4 text-border-medium" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <p>No guides selected yet</p>
                    <p className="text-sm">Add guides to see cost breakdown</p>
                </div>
            )}

            <h3 className="text-md font-semibold text-content-primary mb-3 mt-6">Need Help?</h3>
            
            <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span className="text-content-secondary">+94 11 234 5678</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span className="text-content-secondary">support@seylonauts.lk</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-content-secondary">24/7 Support Available</span>
                </div>
            </div>

            <div className="border-t border-border-light pt-4 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <input 
                        type="checkbox" 
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-4 h-4 text-brand-primary border-border-medium rounded focus:ring-brand-primary"
                    />
                    <label htmlFor="terms" className="text-sm text-content-secondary">
                        I agree to the{' '}
                        <a href="#" className="text-brand-primary hover:underline">Terms & Conditions</a>
                        {' '}and{' '}
                        <a href="#" className="text-brand-primary hover:underline">Privacy Policy</a>
                    </label>
                </div>
            </div>

            <div className="space-y-3">
                <button 
                    disabled={!agreedToTerms || !isTourCompleteCheck()}
                    onClick={handleCompleteRequest}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
                        agreedToTerms && isTourCompleteCheck()
                            ? 'bg-brand-primary text-white hover:bg-warning' 
                            : 'bg-border-light text-content-disabled cursor-not-allowed'
                    }`}
                >
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    Complete Request
                </button>
                
                <button 
                    onClick={handleSaveAsDraft}
                    className="w-full py-2 px-4 border border-border-light rounded-lg font-medium text-content-secondary hover:bg-surface-secondary transition flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                    </svg>
                    Save as Draft
                </button>
            </div>
        </div>
    );
}
