import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaFilter, FaPlus, FaEye, FaEdit, FaTrash, FaTimes, FaMapMarkerAlt, FaUsers, FaClock, FaHotel, FaUserTie, FaCar, FaRoute, FaStar, FaChevronLeft, FaChevronRight, FaCalendarCheck, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';
import StatusBadge from '../../components/admin/StatusBadge';

// Sri Lankan Calendar Events and Bookings Data
const sriLankanEvents = [
  // October 2025 Events (Current Month)
  {
    id: 'EVT001',
    title: 'Diwali Festival Tours',
    type: 'Cultural Event',
    date: '2025-10-31',
    time: '06:00 AM',
    location: 'Colombo & Negombo',
    organizer: 'Ceylon Cultural Tours',
    participants: 85,
    status: 'Confirmed',
    description: 'Grand Diwali celebrations with temple visits, traditional oil lamp lighting ceremonies, and cultural performances across Colombo and Negombo. Includes authentic sweets tasting and fireworks displays.',
    bookings: 72,
    revenue: 540000,
    category: 'Festival',
    duration: '8 hours',
    price: 7500,
    contact: '+94 77 123 4567',
    requirements: 'Comfortable walking shoes, respectful attire for temples'
  },
  {
    id: 'EVT002',
    title: 'Yala Safari Peak Season Launch',
    type: 'Wildlife Event',
    date: '2025-10-25',
    time: '05:30 AM',
    location: 'Yala National Park',
    organizer: 'Lanka Safari Adventures',
    participants: 64,
    status: 'Active',
    description: 'Peak wildlife viewing season begins with highest leopard density in the world. Early morning and evening safaris with experienced naturalist guides. Elephant herds, sloth bears, and over 200 bird species.',
    bookings: 58,
    revenue: 435000,
    category: 'Wildlife',
    duration: '6 hours',
    price: 7500,
    contact: '+94 77 234 5678',
    requirements: 'Early morning departure, sun protection, binoculars recommended'
  },
  {
    id: 'EVT003',
    title: 'Ceylon Tea Plucking & Factory Tour',
    type: 'Cultural Activity',
    date: '2025-10-22',
    time: '07:00 AM',
    location: 'Nuwara Eliya - Pedro Estate',
    organizer: 'Hill Country Experiences',
    participants: 42,
    status: 'Confirmed',
    description: 'Authentic tea plucking experience with Tamil estate workers, factory tour showing the complete tea processing from leaf to cup, tasting sessions of different grades including Orange Pekoe and Broken Orange Pekoe.',
    bookings: 38,
    revenue: 342000,
    category: 'Agro Tourism',
    duration: '5 hours',
    price: 9000,
    contact: '+94 77 345 6789',
    requirements: 'Warm clothing for hill country weather, comfortable walking shoes'
  },
  {
    id: 'EVT004',
    title: 'Sigiriya Rock Fortress Sunrise Tour',
    type: 'Historical Tour',
    date: '2025-10-28',
    time: '05:00 AM',
    location: 'Sigiriya',
    organizer: 'Ancient Wonders Lanka',
    participants: 55,
    status: 'Confirmed',
    description: 'Early morning climb to witness sunrise from the 8th wonder of the world. Explore ancient frescoes, mirror wall, and royal gardens. Professional archaeological guide explains 1500-year history.',
    bookings: 51,
    revenue: 459000,
    category: 'Heritage',
    duration: '4 hours',
    price: 9000,
    contact: '+94 77 456 7890',
    requirements: 'Good fitness level required, 1200 steps to climb, sunrise departure'
  },
  {
    id: 'EVT005',
    title: 'Spice Garden & Ayurveda Workshop',
    type: 'Wellness Event',
    date: '2025-10-24',
    time: '08:00 AM',
    location: 'Matale Spice Gardens',
    organizer: 'Spice Route Ceylon',
    participants: 35,
    status: 'Active',
    description: 'Comprehensive spice garden tour featuring cinnamon, cardamom, pepper, and nutmeg. Hands-on Ayurveda medicine preparation workshop with qualified practitioners.',
    bookings: 32,
    revenue: 288000,
    category: 'Wellness',
    duration: '6 hours',
    price: 9000,
    contact: '+94 77 567 8901',
    requirements: 'Interest in traditional medicine, note-taking materials'
  },
  
  // November 2025 Events
  {
    id: 'EVT006',
    title: 'Galle Fort Heritage Walk & Sunset',
    type: 'Historical Tour',
    date: '2025-11-15',
    time: '03:00 PM',
    location: 'Galle Fort',
    organizer: 'Heritage Walk Lanka',
    participants: 48,
    status: 'Planning',
    description: 'UNESCO World Heritage site exploration with Dutch colonial architecture, rampart walks, lighthouse visit, and spectacular sunset viewing from bastions.',
    bookings: 35,
    revenue: 350000,
    category: 'Heritage',
    duration: '4 hours',
    price: 7500,
    contact: '+94 77 678 9012',
    requirements: 'Comfortable walking shoes, sun protection, camera'
  },
  {
    id: 'EVT007',
    title: 'Kandy Cultural Show & Temple of Tooth',
    type: 'Cultural Event',
    date: '2025-11-08',
    time: '06:00 PM',
    location: 'Kandy',
    organizer: 'Sacred City Tours',
    participants: 75,
    status: 'Confirmed',
    description: 'Evening cultural show featuring traditional Kandyan dancing, fire walking, and drumming, followed by visit to Sri Dalada Maligawa (Temple of the Sacred Tooth Relic).',
    bookings: 68,
    revenue: 510000,
    category: 'Cultural',
    duration: '3 hours',
    price: 7500,
    contact: '+94 77 789 0123',
    requirements: 'Respectful temple attire, no shoes in temple premises'
  },
  {
    id: 'EVT008',
    title: 'Bentota River Safari & Turtle Hatchery',
    type: 'Wildlife Event',
    date: '2025-11-25',
    time: '07:30 AM',
    location: 'Bentota & Kosgoda',
    organizer: 'Coastal Adventures Lanka',
    participants: 40,
    status: 'Planning',
    description: 'Madu River mangrove safari with cinnamon island visit, followed by sea turtle conservation project at Kosgoda Turtle Hatchery. Baby turtle release experience (seasonal).',
    bookings: 28,
    revenue: 280000,
    category: 'Eco Tourism',
    duration: '6 hours',
    price: 7000,
    contact: '+94 77 890 1234',
    requirements: 'Sun protection, mosquito repellent, swimwear optional'
  },

  // December 2025 Events
  {
    id: 'EVT009',
    title: 'Christmas Celebration Tour - Negombo',
    type: 'Holiday Event',
    date: '2025-12-24',
    time: '06:00 PM',
    location: 'Negombo & St. Sebastian Church',
    organizer: 'Festive Lanka Tours',
    participants: 95,
    status: 'Planning',
    description: 'Traditional Catholic Christmas celebrations in fishing community of Negombo. Midnight mass at historic St. Sebastian Church, carol singing, and festive dinner with local families.',
    bookings: 42,
    revenue: 504000,
    category: 'Religious',
    duration: '8 hours',
    price: 12000,
    contact: '+94 77 901 2345',
    requirements: 'Formal attire for church service, advance booking essential'
  },
  {
    id: 'EVT010',
    title: 'Adam\'s Peak Pilgrimage Experience',
    type: 'Religious Adventure',
    date: '2025-12-15',
    time: '02:00 AM',
    location: 'Sri Pada (Adam\'s Peak)',
    organizer: 'Peak Pilgrimage Guides',
    participants: 85,
    status: 'Active',
    description: 'Sacred pilgrimage to Sri Pada footprint. Night climb to witness sunrise from 2243m summit. Multi-religious significance for Buddhists, Hindus, Muslims, and Christians.',
    bookings: 76,
    revenue: 684000,
    category: 'Pilgrimage',
    duration: '8 hours',
    price: 9000,
    contact: '+94 77 012 3456',
    requirements: 'Excellent fitness required, warm clothing, torch/headlamp, good hiking boots'
  },
  {
    id: 'EVT011',
    title: 'Blue Whale Watching - Mirissa',
    type: 'Marine Wildlife',
    date: '2025-12-01',
    time: '06:30 AM',
    location: 'Mirissa Harbor',
    organizer: 'Ocean Safari Lanka',
    participants: 65,
    status: 'Confirmed',
    description: 'World-class blue whale watching season begins. Largest animals on Earth migrate through Sri Lankan waters. Also spot sperm whales, pilot whales, and spinner dolphins.',
    bookings: 58,
    revenue: 464000,
    category: 'Marine Life',
    duration: '4 hours',
    price: 8000,
    contact: '+94 77 123 4567',
    requirements: 'Motion sickness medication, sun protection, early morning departure'
  },

  // January 2026 Events
  {
    id: 'EVT012',
    title: 'Thaipusam Festival - Kataragama',
    type: 'Cultural Event',
    date: '2026-01-13',
    time: '05:00 AM',
    location: 'Kataragama Temple Complex',
    organizer: 'Multi-Cultural Tours Lanka',
    participants: 65,
    status: 'Planning',
    description: 'Intense Hindu-Tamil festival with kavadi processions, body piercing rituals, and fire walking ceremonies. One of Sri Lanka\'s most spectacular religious events.',
    bookings: 38,
    revenue: 494000,
    category: 'Festival',
    duration: '10 hours',
    price: 13000,
    contact: '+94 77 234 5678',
    requirements: 'Respectful behavior during religious ceremonies, comfortable footwear'
  },
  {
    id: 'EVT013',
    title: 'Traditional Cooking Masterclass',
    type: 'Culinary Experience',
    date: '2026-01-20',
    time: '08:00 AM',
    location: 'Dambulla - Village Home',
    organizer: 'Authentic Ceylon Cuisine',
    participants: 24,
    status: 'Confirmed',
    description: 'Learn authentic Sri Lankan cooking with village family. Prepare rice and curry, hoppers, string hoppers, and traditional sweets using clay pots and firewood.',
    bookings: 22,
    revenue: 264000,
    category: 'Culinary',
    duration: '6 hours',
    price: 12000,
    contact: '+94 77 345 6789',
    requirements: 'Apron provided, dietary restrictions can be accommodated'
  },

  // February 2026 Events
  {
    id: 'EVT014',
    title: 'Maha Shivaratri - Koneswaram Temple',
    type: 'Religious Event',
    date: '2026-02-26',
    time: '04:30 AM',
    location: 'Trincomalee - Koneswaram Temple',
    organizer: 'Sacred Sites Lanka',
    participants: 55,
    status: 'Planning',
    description: 'Ancient cliff-top temple dedicated to Lord Shiva overlooking Trincomalee Bay. All-night prayers, abhishekam ceremonies, and traditional music performances.',
    bookings: 32,
    revenue: 384000,
    category: 'Religious',
    duration: '12 hours',
    price: 7000,
    contact: '+94 77 456 7890',
    requirements: 'Temple dress code, fasting optional, sleeping arrangements available'
  },
  {
    id: 'EVT015',
    title: 'Cultural Triangle Heritage Circuit',
    type: 'Archaeological Tour',
    date: '2026-02-15',
    time: '07:00 AM',
    location: 'Anuradhapura-Polonnaruwa-Sigiriya',
    organizer: 'Ancient Wonders Lanka',
    participants: 45,
    status: 'Confirmed',
    description: '5-day comprehensive journey through 2500 years of Sri Lankan civilization. Ancient capitals, royal palaces, dagobas, and rock fortresses with expert archaeologist guides.',
    bookings: 38,
    revenue: 1140000,
    category: 'Heritage',
    duration: '5 days',
    price: 30000,
    contact: '+94 77 567 8901',
    requirements: 'Comfortable walking shoes, sun protection, cultural sensitivity'
  }
];

// Regular bookings data
const sriLankanBookings = [
  {
    id: 'BK001',
    customerName: 'Kasun Mendis',
    service: 'Hotel Booking',
    serviceName: 'Cinnamon Grand Colombo',
    date: '2025-10-25',
    duration: '3 nights',
    amount: 185000,
    status: 'Confirmed',
    type: 'hotel',
    checkIn: '2025-10-25',
    checkOut: '2025-10-28',
    guests: 2,
    roomType: 'Deluxe City View',
    contact: '+94 77 123 4567'
  },
  {
    id: 'BK002',
    customerName: 'Nirmala Perera',
    service: 'Tour Package',
    serviceName: 'Cultural Heritage Tour',
    date: '2025-10-22',
    duration: '5 days',
    amount: 325000,
    status: 'Confirmed',
    type: 'tour',
    participants: 4,
    guide: 'Sunil Ratnayake',
    destinations: 'Kandy, Sigiriya, Polonnaruwa',
    contact: '+94 77 234 5678'
  },
  {
    id: 'BK003',
    customerName: 'Chaminda Silva',
    service: 'Vehicle Rental',
    serviceName: 'Safari Jeep - Yala',
    date: '2025-10-24',
    duration: '2 days',
    amount: 55000,
    status: 'Confirmed',
    type: 'vehicle',
    vehicleType: 'Toyota Land Cruiser',
    driver: 'Included',
    pickupLocation: 'Tissamaharama',
    contact: '+94 77 345 6789'
  },
  {
    id: 'BK004',
    customerName: 'Priya Jayawardena',
    service: 'Ayurveda Treatment',
    serviceName: 'Panchakarma Therapy',
    date: '2025-10-28',
    duration: '7 days',
    amount: 425000,
    status: 'Pending',
    type: 'wellness',
    location: 'Bentota Beach Resort',
    treatment: 'Full Body Detox',
    doctor: 'Dr. Ananda Karunaratne',
    contact: '+94 77 456 7890'
  },
  {
    id: 'BK005',
    customerName: 'Rohan Fernando',
    service: 'Adventure Tour',
    serviceName: 'White Water Rafting',
    date: '2025-10-31',
    duration: '1 day',
    amount: 12000,
    status: 'Confirmed',
    type: 'adventure',
    location: 'Kitulgala',
    participants: 6,
    difficulty: 'Grade 3-4 Rapids',
    contact: '+94 77 567 8901'
  },
  {
    id: 'BK006',
    customerName: 'Sanduni Wickramasinghe',
    service: 'Wedding Photography',
    serviceName: 'Beach Wedding Package',
    date: '2025-11-15',
    duration: '2 days',
    amount: 285000,
    status: 'Planning',
    type: 'special',
    location: 'Bentota & Galle Fort',
    package: 'Premium Coverage',
    photographer: 'Malinda Photography',
    contact: '+94 77 678 9012'
  }
];

// Booking Details Modal Component
function BookingDetailsModal({ booking, isOpen, onClose }) {
  if (!isOpen || !booking) return null;

  const getServiceIcon = (type) => {
    switch (type) {
      case 'hotel': return <FaHotel className="text-blue-500" />;
      case 'tour': return <FaRoute className="text-green-500" />;
      case 'vehicle': return <FaCar className="text-orange-500" />;
      case 'wellness': return <FaStar className="text-purple-500" />;
      case 'adventure': return <FaUsers className="text-red-500" />;
      case 'special': return <FaCalendarCheck className="text-pink-500" />;
      default: return <FaCalendarAlt className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Planning': return 'text-blue-600 bg-blue-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {getServiceIcon(booking.type)}
            <div>
              <h2 className="text-2xl font-bold">{booking.serviceName}</h2>
              <p className="text-gray-600">{booking.service}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
              {booking.status}
            </span>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Customer Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Customer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <p className="text-gray-900 font-medium">{booking.customerName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <p className="text-gray-900">{booking.contact}</p>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Service Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <p className="text-gray-900">{new Date(booking.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <p className="text-gray-900">{booking.duration}</p>
              </div>
              {booking.participants && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Participants</label>
                  <p className="text-gray-900">{booking.participants} persons</p>
                </div>
              )}
              {booking.guests && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <p className="text-gray-900">{booking.guests} persons</p>
                </div>
              )}
            </div>
          </div>

          {/* Booking Amount */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="text-lg font-semibold mb-2 text-green-800">Total Amount</h3>
            <p className="text-3xl font-bold text-green-600">Rs. {booking.amount.toLocaleString()}</p>
          </div>

          {/* Additional Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Additional Information</h3>
            <div className="space-y-2">
              {booking.roomType && <p><span className="font-medium">Room Type:</span> {booking.roomType}</p>}
              {booking.guide && <p><span className="font-medium">Guide:</span> {booking.guide}</p>}
              {booking.destinations && <p><span className="font-medium">Destinations:</span> {booking.destinations}</p>}
              {booking.vehicleType && <p><span className="font-medium">Vehicle:</span> {booking.vehicleType}</p>}
              {booking.driver && <p><span className="font-medium">Driver:</span> {booking.driver}</p>}
              {booking.treatment && <p><span className="font-medium">Treatment:</span> {booking.treatment}</p>}
              {booking.doctor && <p><span className="font-medium">Doctor:</span> {booking.doctor}</p>}
              {booking.difficulty && <p><span className="font-medium">Difficulty:</span> {booking.difficulty}</p>}
              {booking.package && <p><span className="font-medium">Package:</span> {booking.package}</p>}
              {booking.photographer && <p><span className="font-medium">Photographer:</span> {booking.photographer}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Event Details Modal Component
function EventDetailsModal({ event, isOpen, onClose, onEdit, onDelete }) {
  if (!isOpen || !event) return null;

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'Cultural Event':
      case 'Cultural Activity':
        return <FaUsers className="text-orange-500" />;
      case 'Wildlife Event':
      case 'Marine Wildlife':
        return <FaStar className="text-green-500" />;
      case 'Religious Event':
        return <FaCalendarAlt className="text-purple-500" />;
      case 'Historical Tour':
        return <FaRoute className="text-blue-500" />;
      case 'Wellness Event':
        return <FaHotel className="text-pink-500" />;
      default:
        return <FaCalendarAlt className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'text-green-600 bg-green-100';
      case 'Active': return 'text-blue-600 bg-blue-100';
      case 'Planning': return 'text-yellow-600 bg-yellow-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {getEventTypeIcon(event.type)}
            <div>
              <h2 className="text-2xl font-bold">{event.title}</h2>
              <p className="text-gray-600">{event.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  Event Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <p className="text-gray-900">{new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <p className="text-gray-900 flex items-center gap-1">
                      <FaClock className="text-gray-500" />
                      {event.time}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <p className="text-gray-900 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-gray-500" />
                      {event.location}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organizer</label>
                    <p className="text-gray-900">{event.organizer}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <p className="text-gray-900">{event.duration}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <p className="text-gray-900">{event.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price per Person</label>
                    <p className="text-gray-900 font-semibold">Rs. {event.price?.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                    <p className="text-gray-900">{event.contact}</p>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              {event.requirements && (
                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaExclamationTriangle className="text-yellow-500" />
                    Requirements & Important Notes
                  </h3>
                  <p className="text-gray-700">{event.requirements}</p>
                </div>
              )}

              {/* Description */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </div>

              {/* Performance Metrics */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{event.participants}</div>
                    <div className="text-sm text-gray-600">Expected Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{event.bookings}</div>
                    <div className="text-sm text-gray-600">Current Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">Rs. {event.revenue.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Expected Revenue</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Actions & Status */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Booking Rate:</span>
                    <span className="font-semibold">{Math.round((event.bookings / event.participants) * 100)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Revenue per Person:</span>
                    <span className="font-semibold">Rs. {Math.round(event.revenue / event.participants).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Days Until Event:</span>
                    <span className="font-semibold">
                      {Math.ceil((new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => onEdit(event)}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
                  >
                    <FaEdit /> Edit Event
                  </button>
                  {event.status === 'Planning' && (
                    <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2">
                      <FaCheckCircle /> Confirm Event
                    </button>
                  )}
                  {event.status === 'Confirmed' && (
                    <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-2">
                      <FaExclamationTriangle /> Cancel Event
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(event.id)}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
                  >
                    <FaTrash /> Delete Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Calendar Statistics Card Component
function CalendarStatsCard({ icon, title, value, change, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change && <p className="text-sm text-green-500">{change}</p>}
        </div>
        <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Main Calendar Component
export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 19)); // October 19, 2025
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState(sriLankanEvents);
  const [bookings, setBookings] = useState(sriLankanBookings);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: 'All',
    status: 'All',
    search: ''
  });
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [currentTime, setCurrentTime] = useState(new Date());

  // Filter events based on current filters
  const filteredEvents = events.filter(event => {
    const matchesType = filters.type === 'All' || event.type === filters.type;
    const matchesStatus = filters.status === 'All' || event.status === filters.status;
    const matchesSearch = filters.search === '' || 
      event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.location.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.organizer.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  // Get events for a specific date
  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredEvents.filter(event => event.date === dateStr);
  };

  // Get bookings for a specific date
  const getBookingsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter(booking => booking.date === dateStr);
  };

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Calendar navigation
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 41); // 6 weeks

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const events = getEventsForDate(date);
      const bookings = getBookingsForDate(date);
      days.push({
        date: new Date(date),
        isCurrentMonth: date.getMonth() === month,
        events: events,
        bookings: bookings,
        hasActivity: events.length > 0 || bookings.length > 0
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Event type options for filter
  const eventTypes = [...new Set(events.map(event => event.type))];

  // Statistics
  const stats = {
    totalEvents: events.length,
    upcomingEvents: events.filter(e => new Date(e.date) > new Date()).length,
    confirmedEvents: events.filter(e => e.status === 'Confirmed').length,
    totalRevenue: events.reduce((sum, event) => sum + event.revenue, 0)
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setIsBookingModalOpen(true);
  };

  const handleEditEvent = (event) => {
    // Implementation for editing event
    console.log('Edit event:', event);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setIsEventModalOpen(false);
  };

  const isToday = (date) => {
    const today = new Date(2025, 9, 19); // October 19, 2025
    return date.toDateString() === today.toDateString();
  };

  return (
    <AdminLayout activePage="calendar">
      <AdminHeader 
        title="Calendar Management" 
        subtitle="Manage events, bookings, and activities across Sri Lankan tourism calendar"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CalendarStatsCard
          icon={<FaCalendarAlt />}
          title="Total Events"
          value={stats.totalEvents}
          change="+8% this month"
          color="bg-blue-500"
        />
        <CalendarStatsCard
          icon={<FaClock />}
          title="Upcoming Events"
          value={stats.upcomingEvents}
          change="+12% this month"
          color="bg-orange-500"
        />
        <CalendarStatsCard
          icon={<FaCheckCircle />}
          title="Confirmed Events"
          value={stats.confirmedEvents}
          change="+15% this month"
          color="bg-green-500"
        />
        <CalendarStatsCard
          icon={<FaStar />}
          title="Expected Revenue"
          value={`Rs. ${(stats.totalRevenue / 1000000).toFixed(1)}M`}
          change="+22% this month"
          color="bg-purple-500"
        />
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <input 
                className="w-full pl-4 pr-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500" 
                placeholder="Search events by title, location, or organizer..." 
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
            <select 
              className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="All">All Types</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select 
              className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Planning">Planning</option>
              <option value="Active">Active</option>
            </select>
          </div>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2">
            <FaPlus /> Add Event
          </button>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {/* Calendar Header */}
        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-200 rounded-lg"
            >
              <FaChevronLeft />
            </button>
            <h2 className="text-xl font-bold">
              {currentDate.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </h2>
            <button 
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-200 rounded-lg"
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="flex gap-2">
            <button 
              className={`px-4 py-2 rounded-lg ${viewMode === 'month' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setViewMode('month')}
            >
              Month
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${viewMode === 'week' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setViewMode('week')}
            >
              Week
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`min-h-24 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 ${
                  !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                } ${day.hasActivity ? 'border-orange-300 bg-orange-50' : ''}`}
                onClick={() => setSelectedDate(day.date)}
              >
                <div className="font-medium mb-1">
                  {day.date.getDate()}
                </div>
                
                {/* Events */}
                {day.events.slice(0, 2).map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="text-xs p-1 mb-1 rounded bg-orange-200 text-orange-800 truncate cursor-pointer hover:bg-orange-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewEvent(event);
                    }}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}

                {/* Bookings */}
                {day.bookings.slice(0, 1).map((booking, bookingIndex) => (
                  <div
                    key={bookingIndex}
                    className="text-xs p-1 mb-1 rounded bg-blue-200 text-blue-800 truncate"
                    title={`${booking.customerName} - ${booking.serviceName}`}
                  >
                    {booking.customerName}
                  </div>
                ))}

                {/* More indicator */}
                {(day.events.length + day.bookings.length) > 3 && (
                  <div className="text-xs text-gray-500">
                    +{(day.events.length + day.bookings.length) - 3} more
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      <EventDetailsModal
        event={selectedEvent}
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          setSelectedEvent(null);
        }}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />
    </AdminLayout>
  );
}