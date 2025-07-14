import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function BookingSummary() {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const navigate = useNavigate();

    const handleCompleteRequest = () => {
        if (agreedToTerms) {
            navigate('/tour/request-sent');
        }
    };

    const handleSaveAsDraft = () => {
        generatePDFReport();
    };

    const generatePDFReport = () => {
        const doc = new jsPDF();
        
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
        doc.text('Tour Package: Cultural Heritage & Wildlife Safari', 20, 80);
        doc.text('Duration: 7 Days, 6 Nights', 20, 95);
        doc.text('Start Date: March 15, 2024', 20, 110);
        doc.text('Travelers: 2 Adults', 20, 125);
        doc.text('Destinations: Colombo, Kandy, Sigiriya, Yala', 20, 140);
        
        // Selected Tour Guide
        doc.setFontSize(16);
        doc.setTextColor(251, 146, 60);
        doc.text('Selected Tour Guide', 20, 165);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Guide: Chaminda Perera', 20, 180);
        doc.text('Specialty: Certified Cultural & Wildlife Guide', 20, 195);
        doc.text('Rating: 4.8 (127 tours)', 20, 210);
        doc.text('Price: LKR 8,500 per day', 20, 225);
        
        // Hotel Bookings
        doc.setFontSize(16);
        doc.setTextColor(251, 146, 60);
        doc.text('Hotel Bookings', 20, 250);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('1. Cinnamon Grand Colombo - Deluxe Room (2 Nights) - LKR 32,000', 20, 265);
        doc.text('   Mar 15-17, 2024', 25, 280);
        doc.text('2. Hotel Suisse Kandy - Superior Room (2 Nights) - LKR 28,000', 20, 295);
        doc.text('   Mar 17-19, 2024', 25, 310);
        
        // Add new page if needed
        doc.addPage();
        
        // Transportation
        doc.setFontSize(16);
        doc.setTextColor(251, 146, 60);
        doc.text('Transportation', 20, 30);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Vehicle Type: Air-Conditioned Car', 20, 45);
        doc.text('Driver: Professional Driver Included', 20, 60);
        doc.text('Cost: LKR 45,000', 20, 75);
        
        // Itinerary Overview
        doc.setFontSize(16);
        doc.setTextColor(251, 146, 60);
        doc.text('Itinerary Overview', 20, 100);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Day 1: Arrive in Colombo', 20, 115);
        doc.text('       Airport pickup, city tour, hotel check-in', 25, 130);
        doc.text('Day 2: Colombo to Kandy', 20, 145);
        doc.text('       Temple of Tooth, Royal Botanical Gardens', 25, 160);
        doc.text('Day 3: Kandy to Sigiriya', 20, 175);
        doc.text('       Sigiriya Rock Fortress, Dambulla Cave Temple', 25, 190);
        
        // Cost Summary
        doc.setFontSize(16);
        doc.setTextColor(251, 146, 60);
        doc.text('Cost Summary', 20, 220);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Tour Guide: LKR 59,500 (7 days)', 20, 235);
        doc.text('Hotels: LKR 60,000', 20, 250);
        doc.text('Transportation: LKR 45,000', 20, 265);
        doc.setFontSize(14);
        doc.setTextColor(251, 146, 60);
        doc.text('Total Estimated Cost: LKR 164,500', 20, 285);
        
        // Footer
        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        doc.text('This is a draft tour request. Prices are subject to change.', 20, 300);
        doc.text('Contact us: +94 11 234 5678 | support@seylonauts.lk', 20, 315);
        
        // Save the PDF
        doc.save('tour-request-draft.pdf');
    };

    return (
        <div className="bg-white rounded-lg border border-brand-primary p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-content-primary mb-4">Need Help?</h2>
            
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
                    disabled={!agreedToTerms}
                    onClick={handleCompleteRequest}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
                        agreedToTerms 
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
