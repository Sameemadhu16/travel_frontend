import { useState, useEffect } from 'react';
import { FaFilter, FaEye, FaCheck, FaTimes, FaHotel, FaUserTie, FaCar, FaCalendar, FaPhone, FaEnvelope, FaStar, FaMapMarkerAlt, FaSearch, FaClock, FaUsers, FaUserCheck, FaUserPlus, FaUserTimes, FaCheckCircle, FaDownload, FaBan } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';
import StatusBadge from '../../components/admin/StatusBadge';
import Pagination from '../../components/admin/Pagination';

// Mock data for partnership requests - Sri Lankan businesses
const mockPartnerRequests = [
  {
    id: 'PR001',
    type: 'Hotel',
    businessName: 'Cinnamon Grand Colombo',
    ownerName: 'Anura Wickramasinghe',
    email: 'anura@cinnamongrand.lk',
    phone: '+94 11 249 7973',
    location: 'Galle Road, Colombo 03',
    registeredDate: '2024-10-15',
    status: 'Pending',
    rating: 4.8,
    totalRooms: 501,
    description: 'Premier luxury hotel in Colombo offering world-class hospitality with stunning city and ocean views. Features multiple restaurants, spa facilities, and meeting rooms.',
    documents: ['hotel_license_sl.pdf', 'sltda_registration.pdf', 'fire_safety_certificate.pdf', 'hotel_photos.zip'],
    website: 'www.cinnamongrand.com',
    experience: '25 years',
    avatar: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'PR002',
    type: 'Guide',
    businessName: 'Lanka Cultural Adventures',
    ownerName: 'Kumari Dissanayake',
    email: 'kumari@lankaculture.lk',
    phone: '+94 77 123 4567',
    location: 'Temple Road, Kandy',
    registeredDate: '2024-10-14',
    status: 'Pending',
    rating: 4.9,
    languages: ['Sinhala', 'English', 'Tamil', 'Japanese', 'German'],
    description: 'Certified national tour guide specializing in Sri Lankan cultural heritage, ancient temples, and traditional arts. Over 12 years of experience guiding international tourists.',
    documents: ['sltda_guide_license.pdf', 'nlc_certification.pdf', 'first_aid_certificate.pdf', 'testimonials.pdf'],
    specializations: ['Cultural Heritage Tours', 'Temple Tours', 'Traditional Arts & Crafts', 'Ayurveda Tours'],
    experience: '12 years',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b4e8e4f8?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'PR003',
    type: 'Vehicle Agency',
    businessName: 'Malkey Rent A Car',
    ownerName: 'Chaminda Silva',
    email: 'chaminda@malkeyrentals.lk',
    phone: '+94 11 286 5365',
    location: 'Negombo Road, Katunayake',
    registeredDate: '2024-10-13',
    status: 'Approved',
    rating: 4.6,
    fleetSize: 150,
    description: 'Leading vehicle rental service in Sri Lanka with modern fleet including cars, vans, and buses. Professional chauffeur service available with English-speaking drivers.',
    documents: ['transport_board_license.pdf', 'comprehensive_insurance.pdf', 'vehicle_registrations.pdf', 'driver_certifications.pdf'],
    vehicleTypes: ['Economy Cars', 'Premium Sedans', 'SUVs', 'Mini Buses', 'Luxury Coaches'],
    experience: '18 years',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'PR004',
    type: 'Hotel',
    businessName: 'Jetwing Beach Negombo',
    ownerName: 'Ranjith Perera',
    email: 'ranjith@jetwingbeach.lk',
    phone: '+94 31 227 3500',
    location: 'Ethukala, Negombo',
    registeredDate: '2024-10-12',
    status: 'Rejected',
    rating: 4.2,
    totalRooms: 84,
    description: 'Beachfront resort in Negombo offering authentic Sri Lankan hospitality. Features traditional architecture, ayurvedic spa, and fresh seafood dining.',
    documents: ['hotel_license_sl.pdf', 'coastal_conservation_permit.pdf', 'environmental_clearance.pdf'],
    website: 'www.jetwinghotels.com',
    experience: '15 years',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'PR005',
    type: 'Guide',
    businessName: 'Ancient Wonders Tours',
    ownerName: 'Mahinda Rajapaksa',
    email: 'mahinda@ancientwonders.lk',
    phone: '+94 25 222 3456',
    location: 'Sacred City, Anuradhapura',
    registeredDate: '2024-10-11',
    status: 'Pending',
    rating: 4.7,
    languages: ['Sinhala', 'English', 'Pali', 'Hindi'],
    description: 'Archaeological tour specialist with deep knowledge of ancient Sri Lankan civilization. Expert in Anuradhapura, Polonnaruwa, and Sigiriya historical sites.',
    documents: ['sltda_guide_license.pdf', 'archaeology_department_permit.pdf', 'historical_research_credentials.pdf'],
    specializations: ['Archaeological Sites', 'Ancient Buddhist Temples', 'Historical Research Tours', 'Meditation Retreats'],
    experience: '20 years',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'PR006',
    type: 'Hotel',
    businessName: 'Tea Hills Resort Nuwara Eliya',
    ownerName: 'Nirmala Fernando',
    email: 'nirmala@teahills.lk',
    phone: '+94 52 222 2888',
    location: 'Gregory Lake Road, Nuwara Eliya',
    registeredDate: '2024-10-10',
    status: 'Approved',
    rating: 4.5,
    totalRooms: 45,
    description: 'Boutique hill country resort surrounded by tea plantations. Offers authentic Ceylon tea experiences, colonial-style accommodation, and mountain trekking.',
    documents: ['hotel_license_sl.pdf', 'tea_plantation_permit.pdf', 'mountain_safety_certification.pdf'],
    website: 'www.teahillsresort.lk',
    experience: '8 years',
    avatar: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'PR007',
    type: 'Vehicle Agency',
    businessName: 'Yala Safari Jeeps',
    ownerName: 'Bandula Gunasekara',
    email: 'bandula@yalasafari.lk',
    phone: '+94 47 223 9876',
    location: 'Tissamaharama Road, Yala',
    registeredDate: '2024-10-09',
    status: 'Pending',
    rating: 4.4,
    fleetSize: 25,
    description: 'Specialized safari vehicle service for Yala National Park. Modified jeeps with professional wildlife guides for leopard and elephant spotting tours.',
    documents: ['wildlife_department_permit.pdf', 'safari_vehicle_license.pdf', 'guide_certifications.pdf', 'insurance_coverage.pdf'],
    vehicleTypes: ['Safari Jeeps', 'Modified 4WDs', 'Wildlife Photography Vehicles'],
    experience: '10 years',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'PR008',
    type: 'Guide',
    businessName: 'Spice Garden Tours Ceylon',
    ownerName: 'Pradeep Karunaratne',
    email: 'pradeep@spicegardens.lk',
    phone: '+94 81 238 4567',
    location: 'Peradeniya Road, Kandy',
    registeredDate: '2024-10-08',
    status: 'Approved',
    rating: 4.8,
    languages: ['Sinhala', 'English', 'French', 'Italian'],
    description: 'Specialist in spice garden tours, traditional medicine, and ayurvedic treatments. Certified herbalist with extensive knowledge of Sri Lankan medicinal plants.',
    documents: ['sltda_guide_license.pdf', 'ayurveda_certification.pdf', 'herbalist_diploma.pdf', 'spice_garden_permits.pdf'],
    specializations: ['Spice Garden Tours', 'Ayurvedic Medicine', 'Traditional Cooking Classes', 'Herbal Medicine Tours'],
    experience: '15 years',
    avatar: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'PR009',
    type: 'Hotel',
    businessName: 'Fortress Resort & Spa Galle',
    ownerName: 'Roshan De Silva',
    email: 'roshan@fortressgalle.lk',
    phone: '+94 91 438 9400',
    location: 'Koggala Beach, Galle',
    registeredDate: '2024-10-07',
    status: 'Pending',
    rating: 4.6,
    totalRooms: 53,
    description: 'Luxury beachfront resort near historic Galle Fort. Offers authentic Sri Lankan architecture, award-winning spa, and traditional stilt fishing experiences.',
    documents: ['hotel_license_sl.pdf', 'unesco_heritage_compliance.pdf', 'spa_certification.pdf', 'beach_usage_permit.pdf'],
    website: 'www.fortressresorts.com',
    experience: '12 years',
    avatar: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 'PR010',
    type: 'Guide',
    businessName: 'Adam\'s Peak Trekking Adventures',
    ownerName: 'Lakshman Wijesinghe',
    email: 'lakshman@adamspeak.lk',
    phone: '+94 36 222 5678',
    location: 'Nallathanniya, Hatton',
    registeredDate: '2024-10-06',
    status: 'Approved',
    rating: 4.9,
    languages: ['Sinhala', 'English', 'Tamil'],
    description: 'Expert mountain guide specializing in Adam\'s Peak (Sri Pada) pilgrimage treks. Certified in mountain safety and first aid with 18 years of trekking experience.',
    documents: ['mountain_guide_license.pdf', 'first_aid_certification.pdf', 'pilgrimage_site_permit.pdf', 'safety_equipment_certificates.pdf'],
    specializations: ['Mountain Trekking', 'Pilgrimage Tours', 'Sunrise Expeditions', 'Mountain Safety'],
    experience: '18 years',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=center'
  }
];

// Partner Details Modal Component
function PartnerDetailsModal({ partner, isOpen, onClose, onApprove, onReject }) {
  if (!isOpen || !partner) return null;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Hotel': return <FaHotel className="text-blue-500" />;
      case 'Guide': return <FaUserTie className="text-green-500" />;
      case 'Vehicle Agency': return <FaCar className="text-orange-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-100';
      case 'Rejected': return 'text-red-600 bg-red-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img 
              src={partner.avatar} 
              alt={partner.ownerName}
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold">{partner.businessName}</h2>
              <div className="flex items-center gap-2">
                {getTypeIcon(partner.type)}
                <span className="text-gray-600">{partner.type} Partnership Request</span>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <span className="text-sm">{partner.rating}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(partner.status)}`}>
              {partner.status}
            </span>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Business Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Business Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <p className="text-gray-900">{partner.businessName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                    <p className="text-gray-900">{partner.ownerName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                    <p className="text-gray-900">{partner.experience}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span>{partner.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-gray-500" />
                    <span>{partner.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-gray-500" />
                    <span>{partner.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <span>{partner.location}</span>
                  </div>
                  {partner.website && (
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">🌐</span>
                      <a href={`https://${partner.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {partner.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Type-specific Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">
                  {partner.type === 'Hotel' ? 'Hotel Details' : 
                   partner.type === 'Guide' ? 'Guide Details' : 
                   'Agency Details'}
                </h3>
                
                {partner.type === 'Hotel' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Rooms</label>
                      <p className="text-gray-900">{partner.totalRooms}</p>
                    </div>
                  </div>
                )}

                {partner.type === 'Guide' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                      <div className="flex flex-wrap gap-2">
                        {partner.languages?.map((lang, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specializations</label>
                      <div className="flex flex-wrap gap-2">
                        {partner.specializations?.map((spec, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {partner.type === 'Vehicle Agency' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fleet Size</label>
                      <p className="text-gray-900">{partner.fleetSize} vehicles</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Types</label>
                      <div className="flex flex-wrap gap-2">
                        {partner.vehicleTypes?.map((type, index) => (
                          <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 text-sm rounded">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">{partner.description}</p>
              </div>
            </div>

            {/* Right Column - Actions & Documents */}
            <div className="space-y-6">
              {/* Owner Profile */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Owner Profile</h3>
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={partner.avatar} 
                    alt={partner.ownerName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{partner.ownerName}</p>
                    <p className="text-sm text-gray-600">{partner.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex items-center gap-2 mb-1">
                    <FaCalendar />
                    <span>Registered: {new Date(partner.registeredDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Submitted Documents</h3>
                <div className="space-y-2">
                  {partner.documents?.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm">{doc}</span>
                      <button className="text-blue-500 hover:text-blue-700">
                        <FaEye />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Actions</h3>
                <div className="space-y-3">
                  {partner.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => onApprove(partner.id)}
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                      >
                        <FaCheck /> Approve Partnership
                      </button>
                      <button
                        onClick={() => onReject(partner.id)}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
                      >
                        <FaTimes /> Reject Partnership
                      </button>
                    </>
                  )}
                  {partner.status === 'Approved' && (
                    <button
                      onClick={() => onReject(partner.id)}
                      className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
                    >
                      <FaBan /> Suspend Partnership
                    </button>
                  )}
                  {partner.status === 'Rejected' && (
                    <button
                      onClick={() => onApprove(partner.id)}
                      className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                    >
                      <FaCheckCircle /> Reactivate Partnership
                    </button>
                  )}
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2">
                    <FaEnvelope /> Send Message
                  </button>
                  <button className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2">
                    <FaDownload /> Export Data
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

// Statistics Card Component
function PartnerStatsCard({ icon, title, value, change, color }) {
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

// Main Component
export default function PartnerManagement() {
  const [partners, setPartners] = useState(mockPartnerRequests);
  const [filteredPartners, setFilteredPartners] = useState(mockPartnerRequests);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    type: 'All',
    status: 'All',
    location: 'All'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter partners based on current filters
  useEffect(() => {
    let filtered = partners;

    if (filters.search) {
      filtered = filtered.filter(partner => 
        partner.businessName.toLowerCase().includes(filters.search.toLowerCase()) ||
        partner.ownerName.toLowerCase().includes(filters.search.toLowerCase()) ||
        partner.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        partner.phone.includes(filters.search)
      );
    }

    if (filters.type !== 'All') {
      filtered = filtered.filter(partner => partner.type === filters.type);
    }

    if (filters.status !== 'All') {
      filtered = filtered.filter(partner => partner.status === filters.status);
    }

    if (filters.location !== 'All') {
      filtered = filtered.filter(partner => partner.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    setFilteredPartners(filtered);
    setCurrentPage(1);
  }, [filters, partners]);

  const handleViewDetails = (partner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const handleApprove = (partnerId) => {
    setPartners(prev => 
      prev.map(partner => 
        partner.id === partnerId 
          ? { ...partner, status: 'Approved' }
          : partner
      )
    );
    setIsModalOpen(false);
  };

  const handleReject = (partnerId) => {
    setPartners(prev => 
      prev.map(partner => 
        partner.id === partnerId 
          ? { ...partner, status: 'Rejected' }
          : partner
      )
    );
    setIsModalOpen(false);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Hotel': return <FaHotel className="text-blue-500" />;
      case 'Guide': return <FaUserTie className="text-green-500" />;
      case 'Vehicle Agency': return <FaCar className="text-orange-500" />;
      default: return null;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Hotel': return 'bg-blue-100 text-blue-700';
      case 'Guide': return 'bg-green-100 text-green-700';
      case 'Vehicle Agency': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPartners = filteredPartners.slice(startIndex, endIndex);

  // Get unique locations for filter
  const uniqueLocations = [...new Set(partners.map(partner => partner.location.split(',')[0].trim()))].sort();

  // Statistics
  const stats = {
    total: partners.length,
    pending: partners.filter(p => p.status === 'Pending').length,
    approved: partners.filter(p => p.status === 'Approved').length,
    rejected: partners.filter(p => p.status === 'Rejected').length
  };

  return (
    <AdminLayout activePage="partners">
      <AdminHeader 
        title="Partner Management" 
        subtitle="Manage partnership requests from hotels, tour guides, and vehicle agencies across Sri Lanka"
      />
      
      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <PartnerStatsCard
          icon={<FaUsers />}
          title="Total Partners"
          value={stats.total}
          change="+18% this month"
          color="bg-blue-500"
        />
        <PartnerStatsCard
          icon={<FaClock />}
          title="Pending Approval"
          value={stats.pending}
          change="+5 new today"
          color="bg-yellow-500"
        />
        <PartnerStatsCard
          icon={<FaUserCheck />}
          title="Approved Partners"
          value={stats.approved}
          change="+12% this month"
          color="bg-green-500"
        />
        <PartnerStatsCard
          icon={<FaUserTimes />}
          title="Rejected"
          value={stats.rejected}
          change="-3 this month"
          color="bg-red-500"
        />
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500" 
              placeholder="Search by business name, owner, email, or phone..." 
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
            <option value="Hotel">Hotels</option>
            <option value="Guide">Tour Guides</option>
            <option value="Vehicle Agency">Vehicle Agencies</option>
          </select>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
          >
            <option value="All">All Locations</option>
            {uniqueLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Enhanced Partners Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partner Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentPartners.map(partner => (
                <tr key={partner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img 
                        src={partner.avatar} 
                        alt={partner.businessName} 
                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{partner.businessName}</div>
                        <div className="text-sm text-gray-500">{partner.ownerName}</div>
                        <div className="text-xs text-gray-400 font-mono">{partner.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-1">
                      {getTypeIcon(partner.type)}
                      <span className="text-sm font-medium text-gray-900">{partner.type}</span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-gray-400" />
                      {partner.location.split(',')[0]}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-1 mb-1">
                        <FaStar className="text-yellow-500 text-xs" />
                        <span className="font-medium">{partner.rating}</span>
                        <span className="text-gray-500">({partner.experience})</span>
                      </div>
                      <div className="text-xs text-gray-600">{partner.email}</div>
                      <div className="text-xs text-gray-500">{partner.phone}</div>
                      {partner.type === 'Hotel' && (
                        <div className="text-xs text-blue-600">{partner.totalRooms} rooms</div>
                      )}
                      {partner.type === 'Vehicle Agency' && (
                        <div className="text-xs text-orange-600">{partner.fleetSize} vehicles</div>
                      )}
                      {partner.type === 'Guide' && partner.languages && (
                        <div className="text-xs text-green-600">{partner.languages.length} languages</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={partner.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(partner.registeredDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {Math.floor((new Date() - new Date(partner.registeredDate)) / (1000 * 60 * 60 * 24))} days ago
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleViewDetails(partner)}
                        className="text-blue-500 hover:text-blue-700 p-2 rounded"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      {partner.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => handleApprove(partner.id)}
                            className="text-green-500 hover:text-green-700 p-2 rounded"
                            title="Approve"
                          >
                            <FaCheck />
                          </button>
                          <button 
                            onClick={() => handleReject(partner.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded"
                            title="Reject"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={filteredPartners.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Partner Details Modal */}
      <PartnerDetailsModal
        partner={selectedPartner}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPartner(null);
        }}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </AdminLayout>
  );
}