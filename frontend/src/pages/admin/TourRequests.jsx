import { useState, useEffect } from 'react';
import { FaFilter, FaEye, FaCheck, FaTimes, FaCalendar, FaUsers, FaMapMarkerAlt, FaSearch, FaClock, FaRoute, FaUser, FaPhone, FaEnvelope, FaHeart, FaDollarSign } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';
import StatusBadge from '../../components/admin/StatusBadge';
import Pagination from '../../components/admin/Pagination';

// Mock data for tour requests - Authentic Sri Lankan tour data
const mockTourRequests = [
  {
    id: 'TR001',
    tourTitle: 'Ancient Cities Cultural Circuit',
    travelerName: 'Nuwan Perera',
    travelerEmail: 'nuwan.perera@email.lk',
    travelerPhone: '+94 77 123 4567',
    travelerCountry: 'Sri Lanka (Colombo)',
    groupSize: 5,
    tourDuration: 4,
    tourType: 'Cultural & Historical',
    startDate: '2024-11-15',
    endDate: '2024-11-19',
    requestDate: '2024-10-18',
    status: 'Pending',
    budget: 'Rs. 180,000',
    priority: 'High',
    destinations: ['Anuradhapura', 'Polonnaruwa', 'Sigiriya', 'Dambulla'],
    specialRequests: ['Sinhala-speaking guide', 'Traditional Sri Lankan meals', 'Temple visit protocols', 'Photography permissions'],
    accommodation: 'Mid-range hotels with cultural themes',
    description: 'Local family from Colombo wanting to explore our ancient heritage with children. Educational trip focusing on Sri Lankan Buddhist culture and archaeological sites.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
    estimatedCost: 165000,
    guidePreference: 'Licensed local guide fluent in Sinhala',
    transportPreference: 'Air-conditioned van with experienced driver'
  },
  {
    id: 'TR002',
    tourTitle: 'Leopard Safari & Elephant Experience',
    travelerName: 'Chaminda Silva',
    travelerEmail: 'chaminda.silva@wildlife.lk',
    travelerPhone: '+94 71 987 6543',
    travelerCountry: 'Sri Lanka (Kandy)',
    groupSize: 3,
    tourDuration: 6,
    tourType: 'Wildlife & Nature',
    startDate: '2024-12-05',
    endDate: '2024-12-11',
    requestDate: '2024-10-17',
    status: 'Approved',
    budget: 'Rs. 250,000',
    priority: 'Medium',
    destinations: ['Yala National Park', 'Udawalawe National Park', 'Kaudulla National Park', 'Minneriya National Park'],
    specialRequests: ['Early morning safaris', 'Wildlife photography equipment support', 'Elephant gathering seasons', 'Local naturalist guide'],
    accommodation: 'Safari lodges and eco-resorts',
    description: 'Wildlife photography enthusiast from Kandy seeking the best leopard and elephant viewing opportunities. Interested in conservation efforts and endemic species.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center',
    estimatedCost: 235000,
    guidePreference: 'Certified wildlife guide with photography knowledge',
    transportPreference: 'Modified safari jeeps with camera mounts'
  },
  {
    id: 'TR003',
    tourTitle: 'Upcountry Tea Estate Experience',
    travelerName: 'Nirmala Fernando',
    travelerEmail: 'nirmala.fernando@tea.lk',
    travelerPhone: '+94 52 222 3456',
    travelerCountry: 'Sri Lanka (Nuwara Eliya)',
    groupSize: 2,
    tourDuration: 3,
    tourType: 'Cultural & Scenic',
    startDate: '2024-11-28',
    endDate: '2024-11-30',
    requestDate: '2024-10-16',
    status: 'Pending',
    budget: 'Rs. 85,000',
    priority: 'Medium',
    destinations: ['Nuwara Eliya', 'Ella', 'Haputale', 'Diyatalawa'],
    specialRequests: ['Tea factory visits', 'Train journey from Kandy', 'Traditional tea estate bungalow stay', 'Tea tasting sessions'],
    accommodation: 'Heritage tea estate bungalows',
    description: 'Couple from hill country wanting to explore different tea regions and learn about Ceylon tea heritage. Interest in colonial history and scenic landscapes.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center',
    estimatedCost: 78000,
    guidePreference: 'Local guide with tea industry background',
    transportPreference: 'Hill country vehicle + scenic train rides'
  },
  {
    id: 'TR004',
    tourTitle: 'Traditional Ayurveda Healing Journey',
    travelerName: 'Sunil Wickramasinghe',
    travelerEmail: 'sunil.w@ayurveda.lk',
    travelerPhone: '+94 31 227 8901',
    travelerCountry: 'Sri Lanka (Negombo)',
    groupSize: 1,
    tourDuration: 21,
    tourType: 'Wellness & Spa',
    startDate: '2024-11-10',
    endDate: '2024-12-01',
    requestDate: '2024-10-15',
    status: 'Confirmed',
    budget: 'Rs. 420,000',
    priority: 'High',
    destinations: ['Beruwala', 'Bentota', 'Balapitiya', 'Ambalangoda'],
    specialRequests: ['Authentic Ayurveda treatments', 'Herbal medicine preparation', 'Yoga and meditation', 'Organic vegetarian meals', 'Panchakarma therapy'],
    accommodation: 'Traditional Ayurveda treatment centers',
    description: 'Individual seeking comprehensive Ayurvedic healing for chronic health issues. Looking for authentic treatments from qualified Ayurveda physicians with traditional methods.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
    estimatedCost: 395000,
    guidePreference: 'Qualified Ayurvedic physician and wellness coordinator',
    transportPreference: 'Comfortable private vehicle for medical treatments'
  },
  {
    id: 'TR005',
    tourTitle: 'Southern Coast Surfing & Beach Tour',
    travelerName: 'Kasun Rajapaksa',
    travelerEmail: 'kasun@surfclub.lk',
    travelerPhone: '+94 91 438 5672',
    travelerCountry: 'Sri Lanka (Galle)',
    groupSize: 8,
    tourDuration: 5,
    tourType: 'Beach & Adventure',
    startDate: '2024-12-20',
    endDate: '2024-12-25',
    requestDate: '2024-10-14',
    status: 'Pending',
    budget: 'Rs. 320,000',
    priority: 'Medium',
    destinations: ['Hikkaduwa', 'Unawatuna', 'Mirissa', 'Weligama', 'Arugam Bay'],
    specialRequests: ['Surfing lessons for beginners', 'Whale watching in Mirissa', 'Stilt fishing demonstrations', 'Beach volleyball tournaments', 'Fresh seafood meals'],
    accommodation: 'Beach hostels and surf camps',
    description: 'Group of university friends from Galle planning a graduation celebration tour. Mix of experienced and beginner surfers looking for beach adventures and coastal experiences.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center',
    estimatedCost: 295000,
    guidePreference: 'Local surf instructor and coastal guide',
    transportPreference: 'Beach buggy and comfortable van for group'
  },
  {
    id: 'TR006',
    tourTitle: 'Sacred Temple Pilgrimage Circuit',
    travelerName: 'Anusha Jayawardena',
    travelerEmail: 'anusha.j@temple.lk',
    travelerPhone: '+94 25 222 4567',
    travelerCountry: 'Sri Lanka (Anuradhapura)',
    groupSize: 12,
    tourDuration: 8,
    tourType: 'Religious & Spiritual',
    startDate: '2024-11-05',
    endDate: '2024-11-13',
    requestDate: '2024-10-13',
    status: 'Approved',
    budget: 'Rs. 480,000',
    priority: 'High',
    destinations: ['Sri Dalada Maligawa (Kandy)', 'Ruwanwelisaya (Anuradhapura)', 'Thuparamaya', 'Kataragama', 'Adam\'s Peak', 'Kelaniya Raja Maha Viharaya'],
    specialRequests: ['Buddhist rituals and offerings', 'Dawn pilgrimage to Adam\'s Peak', 'Temple accommodation where possible', 'Vegetarian meals', 'Religious ceremony participation'],
    accommodation: 'Temple guest houses and pilgrim rest houses',
    description: 'Religious group from Anuradhapura organizing pilgrimage to most sacred Buddhist sites in Sri Lanka. Seeking spiritual guidance and participation in religious ceremonies.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center',
    estimatedCost: 445000,
    guidePreference: 'Buddhist monk or qualified religious guide',
    transportPreference: 'Simple, respectful transportation for pilgrims'
  },
  {
    id: 'TR007',
    tourTitle: 'Knuckles Mountain Range Trekking',
    travelerName: 'Roshan Gunaratne',
    travelerEmail: 'roshan@adventure.lk',
    travelerPhone: '+94 81 234 5678',
    travelerCountry: 'Sri Lanka (Matale)',
    groupSize: 6,
    tourDuration: 4,
    tourType: 'Adventure & Trekking',
    startDate: '2024-12-15',
    endDate: '2024-12-19',
    requestDate: '2024-10-12',
    status: 'Rejected',
    budget: 'Rs. 150,000',
    priority: 'Low',
    destinations: ['Knuckles Mountain Range', 'Riverston', 'Pitawala Pathana', 'Corbett\'s Gap', 'Mini World\'s End'],
    specialRequests: ['Camping under stars', 'Mountain stream bathing', 'Endemic flora and fauna spotting', 'Traditional village visits', 'Local guide from area'],
    accommodation: 'Mountain camping and village homestays',
    description: 'Adventure group from Matale seeking challenging mountain treks in UNESCO World Heritage Knuckles range. Experienced trekkers looking for wilderness camping.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center',
    estimatedCost: 168000,
    guidePreference: 'Certified mountain guide from local communities',
    transportPreference: '4WD vehicles for mountain access roads'
  },
  {
    id: 'TR008',
    tourTitle: 'Ancestral Village Heritage Tour',
    travelerName: 'Priyantha Mendis',
    travelerEmail: 'priyantha@heritage.lk',
    travelerPhone: '+94 37 567 8901',
    travelerCountry: 'Sri Lanka (Kurunegala)',
    groupSize: 15,
    tourDuration: 7,
    tourType: 'Family & Cultural',
    startDate: '2024-11-25',
    endDate: '2024-12-02',
    requestDate: '2024-10-11',
    status: 'Pending',
    budget: 'Rs. 525,000',
    priority: 'High',
    destinations: ['Kurunegala', 'Puttalam', 'Chilaw', 'Wariyapola', 'Kuliyapitiya', 'Pannala'],
    specialRequests: ['Ancestral village visits', 'Traditional ceremonies', 'Family tree documentation', 'Local family connections', 'Traditional craft workshops'],
    accommodation: 'Village homestays and heritage hotels',
    description: 'Extended family reunion tour visiting ancestral villages in North Western Province. Multi-generational group wanting to connect with roots and traditional culture.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
    estimatedCost: 485000,
    guidePreference: 'Local cultural historian familiar with family genealogy',
    transportPreference: 'Large comfortable bus for extended family group'
  },
  {
    id: 'TR009',
    tourTitle: 'Traditional Cuisine & Spice Discovery',
    travelerName: 'Malika Abeysekera',
    travelerEmail: 'malika@cuisine.lk',
    travelerPhone: '+94 11 278 9012',
    travelerCountry: 'Sri Lanka (Colombo)',
    groupSize: 4,
    tourDuration: 5,
    tourType: 'Culinary & Cultural',
    startDate: '2024-12-01',
    endDate: '2024-12-06',
    requestDate: '2024-10-10',
    status: 'Confirmed',
    budget: 'Rs. 200,000',
    priority: 'Medium',
    destinations: ['Matale Spice Gardens', 'Kandy Central Market', 'Peradeniya', 'Gampola', 'Traditional villages around Kandy'],
    specialRequests: ['Traditional cooking classes', 'Spice cultivation learning', 'Local market tours', 'Village cooking demonstrations', 'Recipe documentation'],
    accommodation: 'Boutique hotels with cooking facilities',
    description: 'Food blogger and friends from Colombo exploring authentic Sri Lankan cuisine and spice heritage. Interest in documenting traditional recipes and cooking methods.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center',
    estimatedCost: 185000,
    guidePreference: 'Traditional cook and spice cultivation expert',
    transportPreference: 'Private vehicle with market and village access'
  },
  {
    id: 'TR010',
    tourTitle: 'Luxury Southern Coast Experience',
    travelerName: 'Dilshan Perera',
    travelerEmail: 'dilshan@luxury.lk',
    travelerPhone: '+94 75 123 4567',
    travelerCountry: 'Sri Lanka (Colombo)',
    groupSize: 2,
    tourDuration: 6,
    tourType: 'Luxury & Cultural',
    startDate: '2024-11-20',
    endDate: '2024-11-26',
    requestDate: '2024-10-09',
    status: 'Pending',
    budget: 'Rs. 850,000',
    priority: 'High',
    destinations: ['Galle Fort', 'Unawatuna', 'Koggala', 'Weligama', 'Mirissa', 'Tangalle'],
    specialRequests: ['5-star beach resorts', 'Private yacht charters', 'Helicopter transfers', 'Fine dining experiences', 'Spa treatments', 'Private beach access'],
    accommodation: 'Ultra-luxury beach resorts and villas',
    description: 'Affluent couple from Colombo celebrating anniversary with luxury southern coast tour. Seeking exclusive experiences, private services, and premium accommodations.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
    estimatedCost: 795000,
    guidePreference: 'VIP concierge and luxury travel coordinator',
    transportPreference: 'Luxury vehicles with personal chauffeur'
  },
  {
    id: 'TR011',
    tourTitle: 'Central Province Hill Station Circuit',
    travelerName: 'Tharanga Wickramarachchi',
    travelerEmail: 'tharanga@hillstation.lk',
    travelerPhone: '+94 66 223 4567',
    travelerCountry: 'Sri Lanka (Badulla)',
    groupSize: 7,
    tourDuration: 6,
    tourType: 'Scenic & Cultural',
    startDate: '2024-12-10',
    endDate: '2024-12-16',
    requestDate: '2024-10-08',
    status: 'Approved',
    budget: 'Rs. 280,000',
    priority: 'Medium',
    destinations: ['Ella', 'Bandarawela', 'Haputale', 'Ohiya', 'Horton Plains', 'Nuwara Eliya'],
    specialRequests: ['Scenic train journeys', 'World\'s End sunrise viewing', 'Tea plantation visits', 'Waterfall trekking', 'Cool climate relaxation'],
    accommodation: 'Mountain view hotels and guesthouses',
    description: 'Office colleagues from Badulla planning team outing to explore Central Province hill stations. Mix of adventure and relaxation in mountain landscapes.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center',
    estimatedCost: 265000,
    guidePreference: 'Hill country guide with botanical knowledge',
    transportPreference: 'Mountain-adapted vehicles and train tickets'
  },
  {
    id: 'TR012',
    tourTitle: 'Western Province Cultural Day Tours',
    travelerName: 'Sanduni Rathnayake',
    travelerEmail: 'sanduni@culture.lk',
    travelerPhone: '+94 33 445 6789',
    travelerCountry: 'Sri Lanka (Kalutara)',
    groupSize: 3,
    tourDuration: 2,
    tourType: 'Cultural & Historical',
    startDate: '2024-11-30',
    endDate: '2024-12-01',
    requestDate: '2024-10-07',
    status: 'Pending',
    budget: 'Rs. 45,000',
    priority: 'Low',
    destinations: ['Kelaniya Raja Maha Viharaya', 'Colombo National Museum', 'Independence Memorial Hall', 'Gangaramaya Temple', 'Pettah Markets'],
    specialRequests: ['Historical site guided tours', 'Traditional craft shopping', 'Local street food tasting', 'Photography opportunities'],
    accommodation: 'Day tours - no accommodation needed',
    description: 'Weekend cultural exploration for family from Kalutara. Short trip to explore Colombo\'s historical and cultural attractions with educational focus.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center',
    estimatedCost: 42000,
    guidePreference: 'Colombo city cultural guide',
    transportPreference: 'Day tour vehicle with city access'
  }
];

// Tour Details Modal Component
function TourDetailsModal({ tour, isOpen, onClose, onApprove, onReject, onConfirm }) {
  if (!isOpen || !tour) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'text-green-600 bg-green-100';
      case 'Approved': return 'text-blue-600 bg-blue-100';
      case 'Rejected': return 'text-red-600 bg-red-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img 
              src={tour.avatar} 
              alt={tour.travelerName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{tour.tourTitle}</h2>
              <p className="text-gray-600">Request from {tour.travelerName}</p>
              <p className="text-sm text-gray-500">ID: {tour.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(tour.priority)}`}>
              {tour.priority} Priority
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tour.status)}`}>
              {tour.status}
            </span>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Tour Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Tour Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaRoute className="text-blue-500" />
                  Tour Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tour Type</label>
                    <p className="text-gray-900">{tour.tourType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <p className="text-gray-900">{tour.tourDuration} days</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
                    <p className="text-gray-900 flex items-center gap-1">
                      <FaUsers className="text-gray-500" />
                      {tour.groupSize} {tour.groupSize === 1 ? 'person' : 'people'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                    <p className="text-gray-900 flex items-center gap-1">
                      <FaDollarSign className="text-green-500" />
                      {tour.budget}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaCalendar className="text-orange-500" />
                  Travel Dates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <p className="text-gray-900">{new Date(tour.startDate).toLocaleDateString('en-US', { 
                      year: 'numeric', month: 'long', day: 'numeric' 
                    })}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <p className="text-gray-900">{new Date(tour.endDate).toLocaleDateString('en-US', { 
                      year: 'numeric', month: 'long', day: 'numeric' 
                    })}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Request Date</label>
                    <p className="text-sm text-gray-600">{new Date(tour.requestDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Destinations */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  Destinations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tour.destinations.map((destination, index) => (
                    <span key={index} className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      {destination}
                    </span>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaHeart className="text-pink-500" />
                  Special Requests
                </h3>
                <div className="space-y-2">
                  {tour.specialRequests.map((request, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FaCheck className="text-green-500 text-sm" />
                      <span className="text-gray-700">{request}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Tour Description</h3>
                <p className="text-gray-700 leading-relaxed">{tour.description}</p>
              </div>

              {/* Preferences */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Accommodation</label>
                    <p className="text-gray-900">{tour.accommodation}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guide Preference</label>
                    <p className="text-gray-900">{tour.guidePreference}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transport Preference</label>
                    <p className="text-gray-900">{tour.transportPreference}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Traveler & Actions */}
            <div className="space-y-6">
              {/* Traveler Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaUser className="text-purple-500" />
                  Traveler Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={tour.avatar} 
                      alt={tour.travelerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{tour.travelerName}</p>
                      <p className="text-sm text-gray-600">{tour.travelerCountry}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-gray-400" />
                      <span className="text-sm">{tour.travelerEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-gray-400" />
                      <span className="text-sm">{tour.travelerPhone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost Estimation */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Cost Estimation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Requested Budget:</span>
                    <span className="font-semibold">{tour.budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Cost:</span>
                    <span className="font-semibold text-green-600">${tour.estimatedCost}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        tour.estimatedCost <= parseInt(tour.budget.replace('$', '').replace(',', '')) 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {tour.estimatedCost <= parseInt(tour.budget.replace('$', '').replace(',', '')) 
                          ? 'Within Budget' 
                          : 'Over Budget'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {tour.status === 'Pending' && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => onApprove(tour.id)}
                      className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 font-medium"
                    >
                      <FaCheck /> Approve Request
                    </button>
                    <button
                      onClick={() => onReject(tour.id)}
                      className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 font-medium"
                    >
                      <FaTimes /> Reject Request
                    </button>
                  </div>
                </div>
              )}

              {tour.status === 'Approved' && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Next Action</h3>
                  <button
                    onClick={() => onConfirm(tour.id)}
                    className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 font-medium"
                  >
                    <FaCheck /> Confirm Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function TourRequests() {
  const [tours, setTours] = useState(mockTourRequests);
  const [filteredTours, setFilteredTours] = useState(mockTourRequests);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    tourType: 'All',
    priority: 'All'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter tours based on current filters
  useEffect(() => {
    let filtered = tours;

    if (filters.search) {
      filtered = filtered.filter(tour => 
        tour.tourTitle.toLowerCase().includes(filters.search.toLowerCase()) ||
        tour.travelerName.toLowerCase().includes(filters.search.toLowerCase()) ||
        tour.travelerEmail.toLowerCase().includes(filters.search.toLowerCase()) ||
        tour.destinations.some(dest => dest.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    if (filters.status !== 'All') {
      filtered = filtered.filter(tour => tour.status === filters.status);
    }

    if (filters.tourType !== 'All') {
      filtered = filtered.filter(tour => tour.tourType === filters.tourType);
    }

    if (filters.priority !== 'All') {
      filtered = filtered.filter(tour => tour.priority === filters.priority);
    }

    setFilteredTours(filtered);
    setCurrentPage(1);
  }, [filters, tours]);

  const handleViewDetails = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const handleApprove = (tourId) => {
    setTours(prev => 
      prev.map(tour => 
        tour.id === tourId 
          ? { ...tour, status: 'Approved' }
          : tour
      )
    );
    setIsModalOpen(false);
  };

  const handleReject = (tourId) => {
    setTours(prev => 
      prev.map(tour => 
        tour.id === tourId 
          ? { ...tour, status: 'Rejected' }
          : tour
      )
    );
    setIsModalOpen(false);
  };

  const handleConfirm = (tourId) => {
    setTours(prev => 
      prev.map(tour => 
        tour.id === tourId 
          ? { ...tour, status: 'Confirmed' }
          : tour
      )
    );
    setIsModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'text-green-600 bg-green-100';
      case 'Approved': return 'text-blue-600 bg-blue-100';
      case 'Rejected': return 'text-red-600 bg-red-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTours = filteredTours.slice(startIndex, endIndex);

  // Statistics
  const stats = {
    total: tours.length,
    pending: tours.filter(t => t.status === 'Pending').length,
    approved: tours.filter(t => t.status === 'Approved').length,
    confirmed: tours.filter(t => t.status === 'Confirmed').length,
    rejected: tours.filter(t => t.status === 'Rejected').length
  };

  return (
    <AdminLayout activePage="tour-requests">
      <AdminHeader 
        title="Tour Requests Management" 
        subtitle="Manage and respond to tour requests from travelers worldwide" 
      />
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaRoute className="text-blue-500" size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FaClock className="text-yellow-500" size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-blue-600">{stats.approved}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaCheck className="text-blue-500" size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FaCheck className="text-green-500" size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FaTimes className="text-red-500" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500" 
              placeholder="Search by tour title, traveler name, or destination..." 
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.tourType}
            onChange={(e) => setFilters(prev => ({ ...prev, tourType: e.target.value }))}
          >
            <option value="All">All Types</option>
            <option value="Cultural & Historical">Cultural & Historical</option>
            <option value="Wildlife & Nature">Wildlife & Nature</option>
            <option value="Beach & Adventure">Beach & Adventure</option>
            <option value="Wellness & Spa">Wellness & Spa</option>
            <option value="Adventure & Trekking">Adventure & Trekking</option>
            <option value="Religious & Spiritual">Religious & Spiritual</option>
            <option value="Culinary & Cultural">Culinary & Cultural</option>
            <option value="Luxury & Cultural">Luxury & Cultural</option>
          </select>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.priority}
            onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2">
            <FaFilter /> Apply
          </button>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {currentTours.map(tour => (
          <div key={tour.id} className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img 
                  src={tour.avatar} 
                  alt={tour.travelerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{tour.tourTitle}</h3>
                  <p className="text-gray-600">{tour.travelerName} • {tour.travelerCountry}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(tour.priority)}`}>
                  {tour.priority}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tour.status)}`}>
                  {tour.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <FaCalendar className="text-orange-500" />
                  <span>{new Date(tour.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaUsers className="text-blue-500" />
                  <span>{tour.groupSize} {tour.groupSize === 1 ? 'person' : 'people'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="text-green-500" />
                  <span>{tour.tourDuration} days</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500 text-sm" />
                <div className="flex flex-wrap gap-1">
                  {tour.destinations.slice(0, 3).map((dest, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {dest}
                    </span>
                  ))}
                  {tour.destinations.length > 3 && (
                    <span className="text-gray-500 text-xs">+{tour.destinations.length - 3} more</span>
                  )}
                </div>
              </div>

              <p className="text-gray-700 text-sm line-clamp-2">{tour.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-green-600">{tour.budget}</span>
                <span className="text-sm text-gray-500">{tour.tourType}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleViewDetails(tour)}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <FaEye /> View Details
              </button>
              {tour.status === 'Pending' && (
                <>
                  <button 
                    onClick={() => handleApprove(tour.id)}
                    className="bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600"
                    title="Approve"
                  >
                    <FaCheck />
                  </button>
                  <button 
                    onClick={() => handleReject(tour.id)}
                    className="bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600"
                    title="Reject"
                  >
                    <FaTimes />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-xl shadow p-4">
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={filteredTours.length}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Tour Details Modal */}
      <TourDetailsModal
        tour={selectedTour}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTour(null);
        }}
        onApprove={handleApprove}
        onReject={handleReject}
        onConfirm={handleConfirm}
      />
    </AdminLayout>
  );
}