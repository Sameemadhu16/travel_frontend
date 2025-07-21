import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  FaBed, FaCalendarCheck, FaStar, FaWallet, 
  FaUsers, FaCheck, FaClock, FaSwimmingPool,
  FaParking, FaWifi, FaUtensils, FaPencilAlt,
  FaPlus, FaTrash
} from 'react-icons/fa';
import AdminLayout from '../../../components/admin/AdminLayout';
import StatusBadge from '../../../components/admin/StatusBadge';
import EditModal from '../../../components/hotel/EditModal';

function RoomTypeCard({ roomType }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img 
        src={roomType.image} 
        alt={roomType.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">{roomType.name}</h3>
            <p className="text-content-secondary">{roomType.totalRooms} Rooms</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">LKR {roomType.rate}/night</p>
            <StatusBadge status={roomType.availability > 0 ? 'Available' : 'Fully Booked'} />
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-content-secondary">Available</span>
            <span className="font-medium">{roomType.availability} rooms</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-content-secondary">Occupied</span>
            <span className="font-medium">{roomType.occupied} rooms</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-content-secondary">Under Maintenance</span>
            <span className="font-medium">{roomType.maintenance} rooms</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-content-secondary mb-2">Amenities</p>
          <div className="flex gap-2">
            {roomType.amenities.map((amenity, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 rounded-lg text-xs">
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, subValue }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
          <Icon className="text-xl" />
        </div>
        <div>
          <h3 className="text-content-secondary">{label}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
      {subValue && (
        <p className="text-sm text-content-secondary">{subValue}</p>
      )}
    </div>
  );
}

export default function HotelDetails() {
  const { id } = useParams();
  const [editingFacilities, setEditingFacilities] = useState(false);
  const [editingRoomType, setEditingRoomType] = useState(false);
  const [editingHotelInfo, setEditingHotelInfo] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(null);

  // Function to handle edit room type
  const handleEditRoomType = (roomType) => {
    setSelectedRoomType(roomType);
    setEditingRoomType(true);
  };

  // Function to handle save facilities
  const handleSaveFacilities = (updatedFacilities) => {
    // In a real app, make API call to update facilities
    console.log('Saving facilities:', updatedFacilities);
    setEditingFacilities(false);
  };

  // Function to handle save room type
  const handleSaveRoomType = (updatedRoomType) => {
    // In a real app, make API call to update room type
    console.log('Saving room type:', updatedRoomType);
    setEditingRoomType(false);
  };

  // Function to handle save hotel info
  const handleSaveHotelInfo = (updatedInfo) => {
    // In a real app, make API call to update hotel info
    console.log('Saving hotel info:', updatedInfo);
    setEditingHotelInfo(false);
  };

  // Sample data - In a real app, fetch this based on the hotel ID
  const hotelData = {
    name: "Cinnamon Grand Colombo",
    location: "77 Galle Road, Colombo 03, Sri Lanka",
    description: "A luxury five-star hotel in the heart of Colombo, offering world-class hospitality and modern amenities.",
    rating: 4.9,
    reviewCount: 425,
    facilities: ["Swimming Pool", "Spa", "Fitness Center", "Restaurant", "Bar", "Conference Rooms"],
    metrics: {
      totalRooms: 483,
      occupiedRooms: 410,
      availableRooms: 63,
      maintenanceRooms: 10,
      occupancyRate: "85%",
      averageRate: "45,000",
      monthlyRevenue: "152,450,000"
    },
    roomTypes: [
      {
        name: "Deluxe Room",
        image: "/src/assets/rooms/room1.png",
        totalRooms: 200,
        availability: 15,
        occupied: 180,
        maintenance: 5,
        rate: "45,000",
        amenities: ["King Bed", "City View", "Mini Bar", "Wi-Fi"]
      },
      {
        name: "Premium Room",
        image: "/src/assets/rooms/room2.jpg",
        totalRooms: 150,
        availability: 25,
        occupied: 122,
        maintenance: 3,
        rate: "55,000",
        amenities: ["Ocean View", "Balcony", "Lounge Access", "Mini Bar"]
      },
      {
        name: "Executive Suite",
        image: "/src/assets/rooms/room3.jpg",
        totalRooms: 100,
        availability: 18,
        occupied: 80,
        maintenance: 2,
        rate: "75,000",
        amenities: ["Separate Living Area", "Club Access", "Butler Service"]
      },
      {
        name: "Presidential Suite",
        image: "/src/assets/rooms/room4.jpg",
        totalRooms: 33,
        availability: 5,
        occupied: 28,
        maintenance: 0,
        rate: "125,000",
        amenities: ["Panoramic View", "Private Butler", "Dining Room"]
      }
    ]
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">{hotelData.name}</h1>
              <p className="text-content-secondary">{hotelData.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="font-medium">{hotelData.rating}</span>
              <span className="text-content-secondary">({hotelData.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={FaBed}
            label="Total Rooms"
            value={hotelData.metrics.totalRooms}
            subValue={`${hotelData.metrics.occupancyRate} Occupancy Rate`}
          />
          <MetricCard
            icon={FaCheck}
            label="Available Rooms"
            value={hotelData.metrics.availableRooms}
            subValue={`${hotelData.metrics.maintenanceRooms} Under Maintenance`}
          />
          <MetricCard
            icon={FaWallet}
            label="Average Room Rate"
            value={`LKR ${hotelData.metrics.averageRate}`}
            subValue="Per Night"
          />
          <MetricCard
            icon={FaCalendarCheck}
            label="Monthly Revenue"
            value={`LKR ${hotelData.metrics.monthlyRevenue}`}
            subValue="This Month"
          />
        </div>

        {/* Facilities */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Hotel Facilities</h2>
            <button
              onClick={() => setEditingFacilities(true)}
              className="flex items-center gap-2 px-4 py-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg"
            >
              <FaPencilAlt /> Edit Facilities
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            {hotelData.facilities.map((facility, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                <FaBed className="text-brand-primary" />
                <span>{facility}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Facilities Modal */}
        <EditModal
          isOpen={editingFacilities}
          onClose={() => setEditingFacilities(false)}
          title="Edit Hotel Facilities"
        >
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {hotelData.facilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <span>{facility}</span>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <input
                type="text"
                placeholder="Add new facility"
                className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <button className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark">
                <FaPlus /> Add
              </button>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingFacilities(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveFacilities(hotelData.facilities)}
                className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark"
              >
                Save Changes
              </button>
            </div>
          </div>
        </EditModal>

        {/* Room Types */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Room Types & Availability</h2>
            <button
              onClick={() => {
                setSelectedRoomType(null);
                setEditingRoomType(true);
              }}
              className="flex items-center gap-2 px-4 py-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg"
            >
              <FaPlus /> Add Room Type
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotelData.roomTypes.map((roomType, index) => (
              <div key={index} className="relative group">
                <button
                  onClick={() => handleEditRoomType(roomType)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaPencilAlt className="text-brand-primary" />
                </button>
                <RoomTypeCard roomType={roomType} />
              </div>
            ))}
          </div>
        </div>

        {/* Edit Room Type Modal */}
        <EditModal
          isOpen={editingRoomType}
          onClose={() => setEditingRoomType(false)}
          title={selectedRoomType ? "Edit Room Type" : "Add New Room Type"}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Room Type Name</label>
              <input
                type="text"
                defaultValue={selectedRoomType?.name}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                placeholder="e.g., Deluxe Room"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Total Rooms</label>
                <input
                  type="number"
                  defaultValue={selectedRoomType?.totalRooms}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rate per Night</label>
                <input
                  type="text"
                  defaultValue={selectedRoomType?.rate}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  placeholder="LKR amount"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Room Amenities</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedRoomType?.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg">
                    <span>{amenity}</span>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add amenity"
                  className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <button className="px-4 py-2 bg-brand-primary text-white rounded-lg">
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingRoomType(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveRoomType(selectedRoomType)}
                className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark"
              >
                {selectedRoomType ? "Save Changes" : "Add Room Type"}
              </button>
            </div>
          </div>
        </EditModal>
      </div>
    </AdminLayout>
  );
}
