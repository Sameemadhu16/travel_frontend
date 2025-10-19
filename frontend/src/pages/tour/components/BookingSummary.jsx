import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import FormContext from '../../../context/InitialValues';
import jsPDF from 'jspdf';
import { createTrip } from '../../../api/tourService';

export default function BookingSummary({tripData}) {
    const navigate = useNavigate();
    const { formData, setFormData } = useContext(FormContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [showDebug, setShowDebug] = useState(false);
    
    // Safety check
    if (!formData || !formData.selectedItems) {
        return (
            <div className="bg-white rounded-lg border border-brand-primary p-6 sticky top-6">
                <h2 className="text-lg font-semibold text-content-primary mb-4">Booking Summary</h2>
                <p className="text-content-secondary">Loading booking information...</p>
            </div>
        );
    }
    
    const {
        travelDetails, 
        selectedItems, 
        contactInfo,
        agreedToTerms
    } = formData;

    const setAgreedToTerms = (value) => {
        setFormData(prev => ({
            ...prev,
            agreedToTerms: value
        }));
    };

    const isTourComplete = () => {
        // Check if all required fields are filled
        const checks = {
            hasDuration: Boolean(travelDetails?.duration),
            hasStartDate: Boolean(travelDetails?.startDate),
            hasFullName: Boolean(contactInfo?.fullName?.trim()),
            hasEmail: Boolean(contactInfo?.email?.trim()),
            hasPhone: Boolean(contactInfo?.phone?.trim()),
            hasGuides: Boolean(selectedItems?.guides?.length > 0)
        };
        
        console.log('Tour completion checks:', {
            checks,
            travelDetails,
            contactInfo,
            selectedItems
        });
        
        const isComplete = Object.values(checks).every(check => check === true);
        
        console.log('Tour complete status:', isComplete);
        return isComplete;
    };
    const handleCompleteRequest = async() => {
        if (!agreedToTerms) {
            alert('Please agree to the terms and conditions before proceeding.');
            return;
        }
        
        if (!isTourComplete()) {
            alert('Please complete all required fields before submitting.');
            return;
        }
        
        setIsSubmitting(true);
        setSubmitError(null);
        
        try {
            console.log('Submitting trip data:', tripData);
            console.log('Trip data structure:', JSON.stringify(tripData, null, 2));
            
            const response = await createTrip(tripData);
            console.log('Trip created successfully:', response);
            
            // Clear form data from localStorage after successful submission
            localStorage.removeItem('formData');
            
            // Navigate to success page
            navigate('/tour/request-sent', { state: { tripData: response } });
        } catch (error) {
            console.error('Error creating trip - Full error:', error);
            console.error('Error response:', error.response);
            console.error('Error data:', error.response?.data);
            
            // Build detailed error message
            let errorMessage = 'Failed to submit tour request. ';
            
            if (error.response) {
                // Server responded with error
                const serverError = error.response.data;
                if (typeof serverError === 'string') {
                    errorMessage += serverError;
                } else if (serverError.message) {
                    errorMessage += serverError.message;
                } else if (serverError.error) {
                    errorMessage += serverError.error;
                } else {
                    errorMessage += `Server error (${error.response.status})`;
                }
            } else if (error.request) {
                // Request made but no response
                errorMessage += 'No response from server. Please check if backend is running.';
            } else {
                // Error in request setup
                errorMessage += error.message || 'Unknown error occurred.';
            }
            
            errorMessage += ' Please try again.';
            
            setSubmitError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSaveAsDraft = () => {
        generatePDFReport();
    };

    // Calculate costs for individual guide requests
    const calculateIndividualGuideCosts = () => {
        if (!selectedItems?.guides || selectedItems.guides.length === 0) return [];
        
        const duration = travelDetails?.duration ? 
            parseInt(travelDetails.duration.match(/(\d+)/)?.[1] || '1') : 1;
        const nights = Math.max(duration - 1, 1);
        
        // Calculate hotel costs using night-wise selections
        const calculateHotelCosts = () => {
            let totalHotelCost = 0;
            
            // Use nightHotels and nightRooms if available
            if (selectedItems.nightHotels && selectedItems.nightHotels.length > 0) {
                selectedItems.nightHotels.forEach((hotel, nightIndex) => {
                    if (hotel?.id) {
                        const room = selectedItems.nightRooms?.[nightIndex];
                        const nightCost = room ? (room.price || 0) : (hotel.pricePerNight || hotel.price || 0);
                        totalHotelCost += nightCost || 0;
                    }
                });
            } else {
                // Fallback to legacy hotels and rooms
                const legacyHotelCost = (selectedItems.hotels || []).reduce((total, hotel) => {
                    const nightlyRate = hotel.pricePerNight || hotel.price || 0;
                    return total + (nightlyRate * nights);
                }, 0);
                
                const legacyRoomCost = (selectedItems.rooms || []).reduce((total, room) => {
                    const nightlyRate = room.pricePerNight || room.price || 0;
                    return total + (nightlyRate * nights);
                }, 0);
                
                totalHotelCost = legacyHotelCost + legacyRoomCost;
            }
            
            return totalHotelCost;
        };
        
        // Calculate vehicle costs using trip cost data if available
        const calculateVehicleCosts = () => {
            if (selectedItems.selectedVehicle && selectedItems.selectedVehicle.tripCostData) {
                return selectedItems.selectedVehicle.tripCostData.cost.totalCost;
            } else if (selectedItems.selectedVehicle) {
                return (selectedItems.selectedVehicle.pricePerDay || selectedItems.selectedVehicle.price || 0) * duration;
            }
            return 0;
        };
        
        const baseCosts = {
            hotels: calculateHotelCosts(),
            vehicles: calculateVehicleCosts()
        };
        
        return selectedItems.guides.map((guide) => {
            const guidePrice = guide.price || guide.pricePerDay || 8500;
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
                duration,
                nights,
                vehicleDetails: selectedItems.selectedVehicle || null
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
        
        // Personal Details Section
        doc.setFontSize(16);
        doc.setTextColor(251, 146, 60);
        doc.text('Personal Details', 20, 65);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Name: ${contactInfo?.fullName || 'Not specified'}`, 20, 80);
        doc.text(`Email: ${contactInfo?.email || 'Not specified'}`, 20, 95);
        doc.text(`Phone: ${contactInfo?.phone || 'Not specified'}`, 20, 110);
        doc.text(`Country: ${contactInfo?.country || 'Not specified'}`, 20, 125);
        if (contactInfo?.nicNumber) {
            doc.text(`NIC Number: ${contactInfo.nicNumber}`, 20, 140);
        }
        if (contactInfo?.specialRequests) {
            doc.text(`Special Requests: ${contactInfo.specialRequests}`, 20, 155);
        }
        
        // Destination Details
        doc.setFontSize(16);
        doc.setTextColor(251, 146, 60);
        doc.text('Trip Details', 20, 180);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Destination: ${travelDetails?.destination || 'Not specified'}`, 20, 195);
        doc.text(`Duration: ${travelDetails?.duration || 'Not specified'}`, 20, 210);
        doc.text(`Start Date: ${travelDetails?.startDate || 'Not specified'}`, 20, 225);
        doc.text(`Pickup Location: ${travelDetails?.location || 'Not specified'}`, 20, 240);
        doc.text(`Pickup Time: ${travelDetails?.time || 'Not specified'}`, 20, 255);
        doc.text(`Travelers: ${travelDetails?.adults || 0} Adults${travelDetails?.children > 0 ? `, ${travelDetails.children} Children` : ''}`, 20, 270);
        
        // Add new page for guide options
        doc.addPage();
        
        // Individual Guide Requests
        if (individualCosts.length > 0) {
            doc.setFontSize(16);
            doc.setTextColor(251, 146, 60);
            doc.text('Guide Request Options', 20, 30);
            
            let currentY = 50;
            individualCosts.forEach((guideCost, index) => {
                // Check if we need a new page
                if (currentY > 240) {
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
                doc.text(`Accommodation (${guideCost.nights} nights): LKR ${guideCost.hotelsCost.toLocaleString()}`, 30, currentY);
                currentY += 12;
                doc.text(`Transportation (${guideCost.duration} days): LKR ${guideCost.vehiclesCost.toLocaleString()}`, 30, currentY);
                currentY += 12;
                doc.text(`Service Fee (5%): LKR ${guideCost.serviceFee.toLocaleString()}`, 30, currentY);
                currentY += 12;
                doc.text(`Taxes (8%): LKR ${guideCost.taxes.toLocaleString()}`, 30, currentY);
                currentY += 15;
                
                doc.setFontSize(14);
                doc.setTextColor(251, 146, 60);
                doc.text(`Total for Option ${index + 1}: LKR ${guideCost.totalCost.toLocaleString()}`, 30, currentY);
                currentY += 30;
            });
        }
        
        // Add new page for detailed selections
        doc.addPage();
        
        // Selected Accommodations
        doc.setFontSize(16);
        doc.setTextColor(251, 146, 60);
        doc.text('Selected Accommodations', 20, 30);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        let yPos = 45;
        if (selectedItems?.hotels && selectedItems.hotels.length > 0) {
            selectedItems.hotels.forEach((hotel, index) => {
                doc.text(`${index + 1}. ${hotel.name} - ${hotel.location}`, 20, yPos);
                yPos += 12;
                doc.text(`   LKR ${(hotel.pricePerNight || 0).toLocaleString()} per night`, 25, yPos);
                yPos += 15;
            });
        }
        
        if (selectedItems?.rooms && selectedItems.rooms.length > 0) {
            selectedItems.rooms.forEach((room, index) => {
                doc.text(`Room ${index + 1}: ${room.roomType} - ${room.bedType}`, 20, yPos);
                yPos += 12;
                doc.text(`   LKR ${(room.pricePerNight || 0).toLocaleString()} per night, Max ${room.maxGuests} guests`, 25, yPos);
                yPos += 15;
            });
        }
        
        if ((!selectedItems?.hotels || selectedItems.hotels.length === 0) && 
            (!selectedItems?.rooms || selectedItems.rooms.length === 0)) {
            doc.text('No accommodations selected', 20, yPos);
            yPos += 15;
        }
        
        // Selected Transportation
        yPos += 10;
        doc.setFontSize(16);
        doc.setTextColor(251, 146, 60);
        doc.text('Selected Transportation', 20, yPos);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        yPos += 15;
        
        if (selectedItems?.selectedVehicle) {
            const vehicle = selectedItems.selectedVehicle;
            doc.text(`Vehicle: ${vehicle.name}`, 20, yPos);
            yPos += 12;
            doc.text(`Type: ${vehicle.type || 'N/A'} | Seats: ${vehicle.seats || 'N/A'}`, 20, yPos);
            yPos += 12;
            doc.text(`Features: ${vehicle.amenities?.join(', ') || 'Standard features'}`, 20, yPos);
            yPos += 12;
            doc.text(`Driver: ${vehicle.driverIncluded ? 'Included' : 'Self-drive'}`, 20, yPos);
            yPos += 12;
            doc.text(`Cost: LKR ${(vehicle.pricePerDay || 0).toLocaleString()} per day`, 20, yPos);
            if (vehicle.driverIncluded && vehicle.driverFee) {
                yPos += 12;
                doc.text(`   (Base: LKR ${(vehicle.basePrice || 0).toLocaleString()} + Driver: LKR ${vehicle.driverFee.toLocaleString()})`, 25, yPos);
            }
        } else {
            doc.text('No vehicle selected', 20, yPos);
        }
        
        // Footer
        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        doc.text('This is a draft tour request. You will choose one guide from the options above.', 20, 280);
        doc.text('Prices are subject to change. Contact us: +94 11 234 5678 | support@travel.lk', 20, 290);
        
        // Save the PDF
        doc.save(`tour-request-${contactInfo?.fullName || 'draft'}-${new Date().toISOString().split('T')[0]}.pdf`);
    };

    return (
        <div className="bg-white rounded-lg border border-brand-primary p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-content-primary mb-4">Booking Summary</h2>
            
            {/* Debug section */}
            {showDebug && (
                <div className="mb-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
                    <h3 className="text-md font-semibold text-content-primary mb-2">Debug Info</h3>
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                        {JSON.stringify(formData, null, 2)}
                    </pre>
                </div>
            )}
            
            {individualCosts.length > 0 ? (
                <div className="space-y-6">
                    {individualCosts.map((guideCost, index) => (
                        <div key={`guide-option-${guideCost.guide.id || index}`} className="border border-border-light rounded-lg p-4">
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
                                    <span className="text-content-secondary">
                                        Hotels Cost:
                                        {guideCost.hotelsCost === 0 && <span className="text-xs text-gray-400 ml-1">(Not selected)</span>}
                                    </span>
                                    <span className="font-medium">LKR {guideCost.hotelsCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-content-secondary">
                                        Vehicle Cost:
                                        {guideCost.vehiclesCost === 0 && <span className="text-xs text-gray-400 ml-1">(Not selected)</span>}
                                    </span>
                                    <span className="font-medium">LKR {guideCost.vehiclesCost.toLocaleString()}</span>
                                </div>
                                
                                {/* Show vehicle cost breakdown if available */}
                                {guideCost.vehicleDetails && guideCost.vehicleDetails.tripCostData && (
                                    <div className="ml-4 text-xs text-gray-600 space-y-1">
                                        <div className="flex justify-between">
                                            <span>• Daily rate ({guideCost.vehicleDetails.tripCostData.trip.numberOfDays} days):</span>
                                            <span>LKR {guideCost.vehicleDetails.tripCostData.cost.breakdown.dailyCost.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>• Distance ({Math.round(guideCost.vehicleDetails.tripCostData.distance.totalDistance)} km):</span>
                                            <span>LKR {guideCost.vehicleDetails.tripCostData.cost.breakdown.distanceCost.toLocaleString()}</span>
                                        </div>
                                        {guideCost.vehicleDetails.driverFee > 0 && (
                                            <div className="flex justify-between">
                                                <span>• Driver fee:</span>
                                                <span>LKR {guideCost.vehicleDetails.driverFee.toLocaleString()}</span>
                                            </div>
                                        )}
                                        {guideCost.vehicleDetails.licenseData && (
                                            <div className="text-blue-600">
                                                • Self-drive (License: {guideCost.vehicleDetails.licenseData.licenseNumber})
                                            </div>
                                        )}
                                    </div>
                                )}
                                
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
                                
                                {/* Show note about optional items */}
                                {(guideCost.hotelsCost === 0 || guideCost.vehiclesCost === 0) && (
                                    <div className="bg-blue-50 border border-blue-200 rounded p-2 mt-2">
                                        <div className="text-xs text-blue-700">
                                            <strong>💡 Note:</strong> 
                                            {guideCost.hotelsCost === 0 && guideCost.vehiclesCost === 0 && 
                                                " Hotels and vehicles not selected. Your guide can help arrange accommodation and transportation."}
                                            {guideCost.hotelsCost === 0 && guideCost.vehiclesCost > 0 && 
                                                " Hotels not selected. Your guide can help arrange accommodation."}
                                            {guideCost.hotelsCost > 0 && guideCost.vehiclesCost === 0 && 
                                                " Vehicle not selected. Your guide can arrange transportation."}
                                        </div>
                                    </div>
                                )}
                                
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
                                <strong>Multiple Guide Options:</strong> You&apos;ve selected {individualCosts.length} guides. 
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
                {/* Debug Panel - Toggle on/off */}
                <button 
                    onClick={() => setShowDebug(!showDebug)}
                    className="mb-4 text-xs text-blue-600 hover:underline"
                >
                    {showDebug ? '▼ Hide Debug Info' : '▶ Show Debug Info'}
                </button>
                
                {showDebug && (
                    <div className="mb-4 p-3 bg-gray-100 border border-gray-300 rounded text-xs overflow-auto max-h-60">
                        <p className="font-semibold mb-2">FormData Debug:</p>
                        <pre className="whitespace-pre-wrap">
                            {JSON.stringify({
                                travelDetails: {
                                    destination: travelDetails?.destination,
                                    duration: travelDetails?.duration,
                                    startDate: travelDetails?.startDate,
                                },
                                contactInfo: {
                                    fullName: contactInfo?.fullName,
                                    email: contactInfo?.email,
                                    phone: contactInfo?.phone,
                                },
                                selectedItems: {
                                    guidesCount: selectedItems?.guides?.length || 0,
                                    guides: selectedItems?.guides
                                }
                            }, null, 2)}
                        </pre>
                    </div>
                )}
                
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
                        <a href="/terms" className="text-brand-primary hover:underline">Terms & Conditions</a>
                        {' '}and{' '}
                        <a href="/privacy" className="text-brand-primary hover:underline">Privacy Policy</a>
                    </label>
                </div>
                
                {/* Error message */}
                {submitError && (
                    <div className="mb-4 p-3 bg-danger-light border border-danger rounded-lg text-danger text-sm">
                        {submitError}
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <button 
                    disabled={!agreedToTerms || !isTourComplete() || isSubmitting}
                    onClick={handleCompleteRequest}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center shadow-md ${
                        agreedToTerms && isTourComplete() && !isSubmitting
                            ? 'bg-brand-primary text-white hover:bg-brand-secondary hover:shadow-lg' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                    }`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                            </svg>
                            Complete Request
                        </>
                    )}
                </button>
                
                {/* Help text when button is disabled */}
                {(!agreedToTerms || !isTourComplete()) && !isSubmitting && (
                    <div className="text-xs text-center text-red-600 bg-red-50 p-2 rounded">
                        {!agreedToTerms && "⚠️ Please agree to terms and conditions"}
                        {agreedToTerms && !isTourComplete() && (
                            <div>
                                <p className="font-semibold mb-1">⚠️ Missing required information:</p>
                                <ul className="text-left list-disc list-inside">
                                    {!travelDetails?.duration && <li>Duration not selected</li>}
                                    {!travelDetails?.startDate && <li>Start date not selected</li>}
                                    {!contactInfo?.fullName?.trim() && <li>Full name not provided</li>}
                                    {!contactInfo?.email?.trim() && <li>Email not provided</li>}
                                    {!contactInfo?.phone?.trim() && <li>Phone number not provided</li>}
                                    {(!selectedItems?.guides || selectedItems.guides.length === 0) && <li>No tour guide selected</li>}
                                </ul>
                                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-blue-800">
                                    <p className="text-xs">
                                        <strong>Debug Info:</strong> Check browser console for detailed validation data
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                
                <button 
                    onClick={handleSaveAsDraft}
                    className="w-full py-2 px-4 border-2 border-border-medium rounded-lg font-medium text-content-secondary hover:bg-surface-secondary hover:border-brand-primary transition flex items-center justify-center gap-2"
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

BookingSummary.propTypes = {
    tripData: PropTypes.object
};