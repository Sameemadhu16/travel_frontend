import React, { useEffect, useState } from 'react';
import { useTourContext } from '../context/TourContext';
import { testTourBookingFlow, expectedCosts, validateCostCalculation } from './TourBookingTest';

export default function TourBookingValidator() {
    const {
        selectedItems,
        totalCosts,
        tourDetails,
        addSelectedGuide,
        addSelectedHotel,
        addSelectedRoom,
        addSelectedVehicle,
        setDriverOption,
        updateTourDetails,
        setPersonalDetails
    } = useTourContext();

    const [testResults, setTestResults] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const runFullTest = async () => {
        setIsLoading(true);
        console.log("🧪 Starting comprehensive tour booking test...");

        try {
            // Step 1: Set tour details
            updateTourDetails(testTourBookingFlow.tourDetails);
            setPersonalDetails(testTourBookingFlow.personalDetails);

            // Step 2: Add test selections
            testTourBookingFlow.selectedGuides.forEach(guide => {
                addSelectedGuide(guide);
            });

            testTourBookingFlow.selectedHotels.forEach(hotel => {
                addSelectedHotel(hotel);
            });

            testTourBookingFlow.selectedRooms.forEach(room => {
                addSelectedRoom(room);
            });

            testTourBookingFlow.selectedVehicles.forEach(vehicle => {
                addSelectedVehicle(vehicle);
            });

            setDriverOption(testTourBookingFlow.driverOption);

            // Wait for context to update
            setTimeout(() => {
                const isValid = validateCostCalculation(totalCosts);
                setTestResults({
                    valid: isValid,
                    timestamp: new Date().toISOString(),
                    costs: totalCosts,
                    selections: selectedItems,
                    tourDetails: tourDetails
                });
                setIsLoading(false);
            }, 500);

        } catch (error) {
            console.error("Test failed:", error);
            setTestResults({
                valid: false,
                error: error.message,
                timestamp: new Date().toISOString()
            });
            setIsLoading(false);
        }
    };

    const clearTest = () => {
        // Reset all selections - you may need to implement these methods in TourContext
        setTestResults({});
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg m-4">
            <h2 className="text-2xl font-bold mb-4">Tour Booking System Validator</h2>
            
            <div className="flex gap-4 mb-6">
                <button
                    onClick={runFullTest}
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? "Running Test..." : "Run Full Test"}
                </button>
                <button
                    onClick={clearTest}
                    className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                    Clear Test
                </button>
            </div>

            {/* Current Selections Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-semibold mb-2">Current Selections</h3>
                    <div className="text-sm space-y-1">
                        <p>Guides: {selectedItems?.guides?.length || 0}</p>
                        <p>Hotels: {selectedItems?.hotels?.length || 0}</p>
                        <p>Rooms: {selectedItems?.rooms?.length || 0}</p>
                        <p>Vehicles: {selectedItems?.vehicles?.length || 0}</p>
                        <p>Duration: {tourDetails?.duration || 0} days</p>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-semibold mb-2">Current Costs</h3>
                    <div className="text-sm space-y-1">
                        <p>Guides: LKR {totalCosts?.guideCosts?.toLocaleString() || 0}</p>
                        <p>Hotels: LKR {totalCosts?.hotelCosts?.toLocaleString() || 0}</p>
                        <p>Vehicles: LKR {totalCosts?.vehicleCosts?.toLocaleString() || 0}</p>
                        <p>Service Fee: LKR {totalCosts?.serviceFee?.toLocaleString() || 0}</p>
                        <p>Taxes: LKR {totalCosts?.taxes?.toLocaleString() || 0}</p>
                        <p className="font-bold">Total: LKR {totalCosts?.total?.toLocaleString() || 0}</p>
                    </div>
                </div>
            </div>

            {/* Test Results */}
            {Object.keys(testResults).length > 0 && (
                <div className={`p-4 rounded ${testResults.valid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
                    <h3 className="font-semibold mb-2">
                        {testResults.valid ? "✅ Test Passed" : "❌ Test Failed"}
                    </h3>
                    
                    {testResults.error && (
                        <p className="text-red-600 mb-2">Error: {testResults.error}</p>
                    )}

                    <div className="text-sm">
                        <p>Test run at: {new Date(testResults.timestamp).toLocaleString()}</p>
                        
                        {testResults.costs && (
                            <div className="mt-4">
                                <h4 className="font-medium mb-2">Expected vs Actual Costs:</h4>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div>
                                        <p className="font-medium">Expected:</p>
                                        <p>Guides: LKR {expectedCosts.guideCosts.toLocaleString()}</p>
                                        <p>Hotels: LKR {expectedCosts.hotelCosts.toLocaleString()}</p>
                                        <p>Vehicles: LKR {expectedCosts.vehicleCosts.toLocaleString()}</p>
                                        <p>Total: LKR {expectedCosts.total.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Actual:</p>
                                        <p>Guides: LKR {testResults.costs.guideCosts?.toLocaleString() || 0}</p>
                                        <p>Hotels: LKR {testResults.costs.hotelCosts?.toLocaleString() || 0}</p>
                                        <p>Vehicles: LKR {testResults.costs.vehicleCosts?.toLocaleString() || 0}</p>
                                        <p>Total: LKR {testResults.costs.total?.toLocaleString() || 0}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Manual Testing Instructions */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                <h3 className="font-semibold mb-2">Manual Testing Guide</h3>
                <div className="text-sm space-y-2">
                    <p>1. <strong>Navigation Flow:</strong> Test Welcome → Tour → Guide → Hotel → Room → Vehicle → Summary</p>
                    <p>2. <strong>Cost Calculations:</strong> Verify costs update when selections change</p>
                    <p>3. <strong>PDF Generation:</strong> Check BookingSummary PDF includes all details</p>
                    <p>4. <strong>Driver Options:</strong> Test with/without driver pricing (30% surcharge)</p>
                    <p>5. <strong>Edge Cases:</strong> Test single day tours, no hotel nights, multiple selections</p>
                </div>
            </div>

            {/* Real-world Validation Checklist */}
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <h3 className="font-semibold mb-2">Real-world Validation Checklist</h3>
                <div className="text-sm space-y-1">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span>Guide pricing matches market rates (LKR 10,000-25,000/day)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span>Hotel pricing realistic for Sri Lankan market</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span>Vehicle pricing includes fuel and insurance considerations</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span>Service fees and taxes align with industry standards</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span>Duration calculations account for arrival/departure days</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span>PDF format suitable for travel documentation</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
