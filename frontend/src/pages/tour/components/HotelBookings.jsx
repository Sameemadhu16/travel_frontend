import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContext from '../../../context/InitialValues';

export default function HotelBookings() {
    const navigate = useNavigate();
    const { formData } = useContext(FormContext);

    // Safety check
    if (!formData || !formData.selectedItems) {
        return (
            <div className="bg-white rounded-lg border border-brand-primary p-6">
                <h2 className="text-lg font-semibold text-content-primary mb-4">Hotel Bookings</h2>
                <p className="text-content-secondary">Loading hotel information...</p>
            </div>
        );
    }

    const selectedItems = formData.selectedItems;
    const travelDetails = formData.travelDetails;
    
    // Get night-wise hotel and room bookings
    const getHotelBookings = () => {
        const bookings = [];
        
        // Use the new nightHotels and nightRooms arrays
        if (selectedItems.nightHotels && selectedItems.nightHotels.length > 0) {
            selectedItems.nightHotels.forEach((hotel, nightIndex) => {
                if (hotel?.id) {
                    const room = selectedItems.nightRooms?.[nightIndex];
                    
                    bookings.push({
                        id: `${hotel.id}-night-${nightIndex + 1}`,
                        hotelId: hotel.id,
                        name: hotel.name,
                        type: 'hotel',
                        room: room ? room.roomType || room.type : 'Standard Room',
                        roomPrice: room ? (room.price || 25000) : (hotel.pricePerNight || 25000),
                        night: nightIndex + 1,
                        nights: 1, // Each booking is for one night
                        price: room ? (room.price || 25000) : (hotel.pricePerNight || 25000),
                        image: hotel.image || hotel.images?.[0],
                        location: hotel.location,
                        rating: hotel.rating,
                        amenities: hotel.amenities,
                        roomDetails: room
                    });
                }
            });
        }
        
        // Fallback to legacy hotels and rooms for backwards compatibility
        if (bookings.length === 0) {
            // Add selected hotels (legacy)
            if (selectedItems.hotels && selectedItems.hotels.length > 0) {
                selectedItems.hotels.forEach(hotel => {
                    bookings.push({
                        id: hotel.id,
                        name: hotel.name,
                        type: 'hotel',
                        room: hotel.roomType || 'Standard Room',
                        nights: hotel.nights || calculateNights(),
                        price: hotel.price || hotel.pricePerNight || 25000,
                        image: hotel.image,
                        location: hotel.location
                    });
                });
            }
            
            // Add selected rooms (legacy)
            if (selectedItems.rooms && selectedItems.rooms.length > 0) {
                selectedItems.rooms.forEach(room => {
                    bookings.push({
                        id: room.id,
                        name: room.hotelName || room.name,
                        type: 'room',
                        room: room.roomType || room.type,
                        nights: room.nights || calculateNights(),
                        price: room.price || room.pricePerNight || 25000,
                        image: room.image,
                        location: room.location
                    });
                });
            }
        }
        
        return bookings;
    };

    // Calculate nights based on travel duration
    const calculateNights = () => {
        if (travelDetails.duration) {
            const match = travelDetails.duration.match(/(\d+)/);
            return match ? parseInt(match[1]) - 1 : 1;
        }
        return 1;
    };

    // Format dates for display
    const formatDates = (startDate, nights) => {
        if (!startDate) return 'Dates TBD';
        
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + nights);
        
        const formatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
        return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString('en-US', formatOptions)}`;
    };

    const handleEdit = () => {
        navigate('/tour/select-hotel');
    };

    const hotels = getHotelBookings();

    return (
        <div className="bg-white rounded-lg border border-brand-primary p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-content-primary">Hotel Bookings</h2>
                <button 
                    onClick={handleEdit}
                    className="text-brand-primary text-sm font-medium hover:underline flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Edit
                </button>
            </div>
            
            {hotels.length === 0 ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-content-tertiary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-content-secondary mb-2">No Hotel Selected</h3>
                    <p className="text-content-tertiary text-sm mb-4">Please select accommodation for your tour</p>
                    <button 
                        onClick={handleEdit}
                        className="bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-secondary transition"
                    >
                        Select Hotel
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Show night-wise bookings or traditional bookings */}
                    {hotels.some(hotel => hotel.night) ? (
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium text-content-secondary mb-3">Night-by-Night Accommodation</h3>
                            {hotels.map((hotel, index) => (
                                <div key={hotel.id || index} className="flex items-center justify-between p-4 border border-brand-primary rounded-lg bg-gray-50">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                                {hotel.night}
                                            </div>
                                        </div>
                                        {hotel.image && (
                                            <img 
                                                src={hotel.image} 
                                                alt={hotel.name}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                        )}
                                        <div>
                                            <h3 className="font-semibold text-content-primary">{hotel.name}</h3>
                                            <p className="text-sm text-content-secondary">
                                                {hotel.room} • Night {hotel.night}
                                            </p>
                                            {hotel.location && (
                                                <p className="text-xs text-content-tertiary">📍 {hotel.location}</p>
                                            )}
                                            {hotel.rating && (
                                                <div className="flex items-center gap-1 mt-1">
                                                    <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                    </svg>
                                                    <span className="text-xs text-content-tertiary">{hotel.rating}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-brand-primary">
                                            LKR {(hotel.price || 25000).toLocaleString()}
                                        </p>
                                        <p className="text-xs text-content-secondary">per night</p>
                                        {hotel.roomDetails?.amenities && (
                                            <p className="text-xs text-content-tertiary mt-1">
                                                {hotel.roomDetails.amenities.slice(0, 2).join(', ')}
                                                {hotel.roomDetails.amenities.length > 2 && '...'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {hotels.map((hotel, index) => (
                                <div key={hotel.id || index} className="flex items-center justify-between p-4 border border-brand-primary rounded-lg">
                                    <div className="flex items-center gap-4">
                                        {hotel.image && (
                                            <img 
                                                src={hotel.image} 
                                                alt={hotel.name}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                        )}
                                        <div>
                                            <h3 className="font-semibold text-content-primary">{hotel.name}</h3>
                                            <p className="text-sm text-content-secondary">
                                                {hotel.room} • {hotel.nights} Night{hotel.nights > 1 ? 's' : ''}
                                            </p>
                                            <p className="text-sm text-content-tertiary">
                                                {formatDates(travelDetails.startDate, hotel.nights)}
                                            </p>
                                            {hotel.location && (
                                                <p className="text-xs text-content-tertiary">📍 {hotel.location}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-brand-primary">
                                            LKR {((hotel.price || 25000) * (hotel.nights || 1)).toLocaleString()}
                                        </p>
                                        <p className="text-xs text-content-secondary">
                                            LKR {(hotel.price || 25000).toLocaleString()} per night
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* Total Summary */}
                    {hotels.length > 1 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-content-secondary">
                                    Total Accommodation ({hotels.length} night{hotels.length > 1 ? 's' : ''})
                                </span>
                                <span className="text-xl font-bold text-brand-primary">
                                    LKR {hotels.reduce((total, hotel) => total + ((hotel.price || 25000) * (hotel.nights || 1)), 0).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
