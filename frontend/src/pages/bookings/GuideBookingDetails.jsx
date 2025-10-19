import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getGuideById } from '../../api/tourService';
import { createGuideBooking } from '../../api/guideBookingService';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Main from '../../components/Main';
import Spinner from '../../components/Spinner';
import defaultGuideImg from '../../assets/users/user1.jpg';

const GuideBookingDetails = () => {
    const { guideId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [isMultipleBooking, setIsMultipleBooking] = useState(false);
    
    const [formData, setFormData] = useState({
        locations: '',
        startDate: '',
        endDate: '',
        startTime: '',
        numberOfDays: 1,
        numberOfPeople: 1,
        contactNumber: '',
        specialRequests: '',
        preferredLanguage: '',
        accommodationNeeded: false,
        transportationNeeded: false,
        mealPreferences: ''
    });

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                setLoading(true);
                
                // Check if this is a multiple guide booking
                const guideIdsParam = searchParams.get('guides');
                
                if (guideIdsParam) {
                    // Multiple guides
                    setIsMultipleBooking(true);
                    const guideIds = guideIdsParam.split(',').map(id => parseInt(id));
                    const guidePromises = guideIds.map(id => getGuideById(id));
                    const guidesData = await Promise.all(guidePromises);
                    setGuides(guidesData);
                } else if (guideId && guideId !== 'multiple') {
                    // Single guide
                    setIsMultipleBooking(false);
                    const guideData = await getGuideById(guideId);
                    setGuides([guideData]);
                } else {
                    toast.error('No guides selected');
                    navigate('/bookings/guide');
                }
            } catch (error) {
                console.error('Error fetching guides:', error);
                toast.error('Failed to load guide details');
            } finally {
                setLoading(false);
            }
        };

        fetchGuides();
    }, [guideId, searchParams, navigate]);

    // Calculate number of days when dates change
    useEffect(() => {
        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both days
            setFormData(prev => ({ ...prev, numberOfDays: diffDays }));
        }
    }, [formData.startDate, formData.endDate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.locations || !formData.startDate || !formData.endDate || !formData.contactNumber) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (new Date(formData.startDate) < new Date()) {
            toast.error('Start date cannot be in the past');
            return;
        }

        if (new Date(formData.endDate) < new Date(formData.startDate)) {
            toast.error('End date must be after start date');
            return;
        }

        try {
            setSubmitting(true);
            
            // Collect all guide IDs
            const allGuideIds = guides.map(g => g.id);
            
            // Calculate total price (use average or first guide's rate)
            const avgRate = guides.reduce((sum, g) => sum + (g?.hoursRate || g?.price || 0), 0) / guides.length;
            const totalPrice = avgRate * formData.numberOfDays;
            
            // Create ONE booking request with all guide IDs
            // Backend will create individual bookings for each guide
            const bookingData = {
                guideIds: allGuideIds, // Send all guide IDs at once
                userId: user?.data?.id,
                locations: formData.locations,
                startDate: formData.startDate,
                endDate: formData.endDate,
                startTime: formData.startTime,
                numberOfDays: formData.numberOfDays,
                numberOfPeople: formData.numberOfPeople,
                contactNumber: formData.contactNumber,
                specialRequests: formData.specialRequests,
                preferredLanguage: formData.preferredLanguage,
                accommodationNeeded: formData.accommodationNeeded,
                transportationNeeded: formData.transportationNeeded,
                mealPreferences: formData.mealPreferences,
                totalPrice: totalPrice
            };
            
            // Backend will handle multi_request_id generation
            await createGuideBooking(bookingData);
            
            if (guides.length > 1) {
                toast.success(`Booking requests sent to ${guides.length} guides! First guide to approve gets the booking.`);
            } else {
                toast.success('Booking request sent successfully!');
            }
            
            navigate('/my-bookings/guides');
        } catch (error) {
            console.error('Error creating booking:', error);
            toast.error(error.response?.data?.message || 'Failed to create booking');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Main>
                <div className="min-h-screen flex items-center justify-center">
                    <Spinner />
                </div>
            </Main>
        );
    }

    if (!guides || guides.length === 0) {
        return (
            <Main>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-danger mb-4">No guides selected</p>
                        <button onClick={() => navigate('/bookings/guide')} className="px-4 py-2 bg-brand-primary text-white rounded">
                            Back to Guides
                        </button>
                    </div>
                </div>
            </Main>
        );
    }

    // Calculate average price from all selected guides
    const averagePrice = guides.reduce((sum, g) => sum + (g?.hoursRate || g?.price || 0), 0) / guides.length;
    const totalPrice = averagePrice * formData.numberOfDays;

    return (
        <Main>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="mb-6">
                        <button 
                            onClick={() => navigate('/bookings/guide')} 
                            className="text-brand-primary hover:underline mb-4 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Guides
                        </button>
                        <h1 className="text-3xl font-bold text-content-primary">Complete Your Booking</h1>
                        <p className="text-content-secondary mt-2">Fill in the details below to book your guide</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Booking Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Locations */}
                                    <div>
                                        <label className="block text-sm font-medium text-content-primary mb-2">
                                            Locations/Destinations <span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            name="locations"
                                            value={formData.locations}
                                            onChange={handleChange}
                                            placeholder="e.g., Sigiriya, Dambulla, Polonnaruwa"
                                            className="w-full px-4 py-2 border border-surface-secondary rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                            rows="3"
                                            required
                                        />
                                        <p className="text-xs text-content-tertiary mt-1">List all the places you want to visit</p>
                                    </div>

                                    {/* Date Range */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-content-primary mb-2">
                                                Start Date <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="startDate"
                                                value={formData.startDate}
                                                onChange={handleChange}
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full px-4 py-2 border border-surface-secondary rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-content-primary mb-2">
                                                End Date <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="endDate"
                                                value={formData.endDate}
                                                onChange={handleChange}
                                                min={formData.startDate || new Date().toISOString().split('T')[0]}
                                                className="w-full px-4 py-2 border border-surface-secondary rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Time and People */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-content-primary mb-2">
                                                Start Time
                                            </label>
                                            <input
                                                type="time"
                                                name="startTime"
                                                value={formData.startTime}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-surface-secondary rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-content-primary mb-2">
                                                Number of People
                                            </label>
                                            <input
                                                type="number"
                                                name="numberOfPeople"
                                                value={formData.numberOfPeople}
                                                onChange={handleChange}
                                                min="1"
                                                max="50"
                                                className="w-full px-4 py-2 border border-surface-secondary rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-content-primary mb-2">
                                            Contact Number <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            placeholder="+94 77 123 4567"
                                            className="w-full px-4 py-2 border border-surface-secondary rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    {/* Preferred Language */}
                                    <div>
                                        <label className="block text-sm font-medium text-content-primary mb-2">
                                            Preferred Language
                                        </label>
                                        <select
                                            name="preferredLanguage"
                                            value={formData.preferredLanguage}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-surface-secondary rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                        >
                                            <option value="">Select language</option>
                                            <option value="English">English</option>
                                            <option value="Sinhala">Sinhala</option>
                                            <option value="Tamil">Tamil</option>
                                            <option value="French">French</option>
                                            <option value="German">German</option>
                                            <option value="Spanish">Spanish</option>
                                            <option value="Chinese">Chinese</option>
                                            <option value="Japanese">Japanese</option>
                                        </select>
                                    </div>

                                    {/* Additional Services */}
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-semibold">Additional Services</h3>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                name="accommodationNeeded"
                                                id="accommodationNeeded"
                                                checked={formData.accommodationNeeded}
                                                onChange={handleChange}
                                                className="w-5 h-5 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                                            />
                                            <label htmlFor="accommodationNeeded" className="text-sm text-content-primary">
                                                Accommodation needed for guide
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                name="transportationNeeded"
                                                id="transportationNeeded"
                                                checked={formData.transportationNeeded}
                                                onChange={handleChange}
                                                className="w-5 h-5 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                                            />
                                            <label htmlFor="transportationNeeded" className="text-sm text-content-primary">
                                                Transportation arrangement needed
                                            </label>
                                        </div>
                                    </div>

                                    {/* Meal Preferences */}
                                    <div>
                                        <label className="block text-sm font-medium text-content-primary mb-2">
                                            Meal Preferences
                                        </label>
                                        <input
                                            type="text"
                                            name="mealPreferences"
                                            value={formData.mealPreferences}
                                            onChange={handleChange}
                                            placeholder="e.g., Vegetarian, Halal, No pork"
                                            className="w-full px-4 py-2 border border-surface-secondary rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                        />
                                    </div>

                                    {/* Special Requests */}
                                    <div>
                                        <label className="block text-sm font-medium text-content-primary mb-2">
                                            Special Requests / Additional Information
                                        </label>
                                        <textarea
                                            name="specialRequests"
                                            value={formData.specialRequests}
                                            onChange={handleChange}
                                            placeholder="Any special requirements or information the guide should know..."
                                            className="w-full px-4 py-2 border border-surface-secondary rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                            rows="4"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-brand-primary hover:bg-warning text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? 'Sending Request...' : 'Send Booking Request'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Booking Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                                <h3 className="text-xl font-semibold mb-4">
                                    {guides.length > 1 ? `${guides.length} Guides Selected` : 'Booking Summary'}
                                </h3>
                                
                                {/* Multiple Guides Info */}
                                {guides.length > 1 ? (
                                    <div className="mb-4 pb-4 border-b">
                                        <div className="bg-blue-50 p-3 rounded-lg mb-3">
                                            <p className="text-sm text-blue-800 font-medium">
                                                ℹ️ Multi-Guide Request
                                            </p>
                                            <p className="text-xs text-blue-700 mt-1">
                                                Your request will be sent to {guides.length} guides. The first guide who approves will get the booking.
                                            </p>
                                        </div>
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {guides.map((g) => {
                                                const gName = g.user ? `${g.user.firstName || ''} ${g.user.lastName || ''}`.trim() : g.name || 'Guide';
                                                const gImage = g.user?.profilePictures?.[0] || g.image || '/src/assets/users/user1.jpg';
                                                return (
                                                    <div key={g.id} className="flex items-center gap-2 text-sm">
                                                        <img src={gImage} alt={gName} className="w-8 h-8 rounded-full object-cover" />
                                                        <span className="font-medium">{gName}</span>
                                                        <span className="text-content-tertiary text-xs">
                                                            LKR {(g?.hoursRate || g?.price || 0).toLocaleString()}/day
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    /* Single Guide Info */
                                    <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                                        <img 
                                            src={guides[0]?.user?.profilePictures?.[0] || guides[0]?.image || '/src/assets/users/user1.jpg'} 
                                            alt={guides[0]?.user ? `${guides[0].user.firstName || ''} ${guides[0].user.lastName || ''}`.trim() : guides[0]?.name || 'Guide'}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-content-primary">
                                                {guides[0]?.user ? `${guides[0].user.firstName || ''} ${guides[0].user.lastName || ''}`.trim() : guides[0]?.name || 'Guide'}
                                            </h4>
                                            <div className="flex items-center gap-1 text-sm">
                                                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                </svg>
                                                <span>{guides[0]?.rating || 4.5}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Price Breakdown */}
                                <div className="space-y-3 mb-4">
                                    {guides.length > 1 ? (
                                        <>
                                            <div className="bg-yellow-50 p-3 rounded-lg mb-2">
                                                <p className="text-xs text-yellow-800">
                                                    💡 <strong>Pricing Note:</strong> Each guide has a different rate. 
                                                    The final price will be based on which guide accepts your request.
                                                </p>
                                            </div>
                                            <div className="text-sm text-content-secondary">
                                                <p className="font-medium mb-2">Guide Rates (per day):</p>
                                                <div className="space-y-1 max-h-32 overflow-y-auto">
                                                    {guides.map((g) => {
                                                        const gName = g.user ? `${g.user.firstName || ''} ${g.user.lastName || ''}`.trim() : g.name || 'Guide';
                                                        const rate = g?.hoursRate || g?.price || 0;
                                                        return (
                                                            <div key={g.id} className="flex justify-between items-center text-xs">
                                                                <span>{gName}</span>
                                                                <span className="font-medium">LKR {rate.toLocaleString()}/day</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-content-secondary">Price per day</span>
                                            <span className="font-medium">LKR {averagePrice.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-content-secondary">Number of days</span>
                                        <span className="font-medium">{formData.numberOfDays}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-content-secondary">Number of people</span>
                                        <span className="font-medium">{formData.numberOfPeople}</span>
                                    </div>
                                    {formData.accommodationNeeded && (
                                        <div className="flex justify-between text-sm text-brand-primary">
                                            <span>+ Accommodation</span>
                                            <span>Required</span>
                                        </div>
                                    )}
                                    {formData.transportationNeeded && (
                                        <div className="flex justify-between text-sm text-brand-primary">
                                            <span>+ Transportation</span>
                                            <span>Required</span>
                                        </div>
                                    )}
                                </div>

                                {/* Total - Only show for single guide */}
                                {guides.length === 1 ? (
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold">Estimated Total</span>
                                            <span className="text-2xl font-bold text-brand-primary">
                                                LKR {totalPrice.toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="text-xs text-content-tertiary mt-2">
                                            Payment will be processed after guide approval
                                        </p>
                                    </div>
                                ) : (
                                    <div className="border-t pt-4">
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                            <p className="text-sm text-blue-800 font-medium mb-1">
                                                📊 Estimated Price Range
                                            </p>
                                            <p className="text-xs text-blue-700">
                                                Your booking will cost between <strong>LKR {Math.min(...guides.map(g => (g?.hoursRate || g?.price || 0) * formData.numberOfDays)).toLocaleString()}</strong> and <strong>LKR {Math.max(...guides.map(g => (g?.hoursRate || g?.price || 0) * formData.numberOfDays)).toLocaleString()}</strong> depending on which guide accepts.
                                            </p>
                                        </div>
                                        <p className="text-xs text-content-tertiary mt-2">
                                            Payment will be processed after a guide approves your request
                                        </p>
                                    </div>
                                )}

                                {/* Info Box */}
                                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <p className="text-xs text-blue-800">
                                        <strong>Note:</strong> {guides.length > 1 
                                            ? `Your booking request will be sent to ${guides.length} guides. The first guide who approves will get the booking. Other requests will be automatically cancelled. You'll have 24 hours to complete payment after approval.`
                                            : 'Your booking request will be sent to the guide for approval. You\'ll have 24 hours to complete payment after the guide approves your request.'
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default GuideBookingDetails;
