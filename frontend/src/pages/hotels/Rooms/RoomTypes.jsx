import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import { app } from '../../../config/firebase';
import { getHotelByUserDocId } from '../../../api/hotelService';
import { getRoomsByHotelId, deleteRoom } from '../../../api/roomService';
import { showToastMessage } from '../../../utils/toastHelper';
import HotelLayout from '../../../components/hotel/HotelLayout';

function RoomTypeCard({ roomType, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white">
            <FaBed className="text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{roomType.name}</h3>
            <p className="text-content-secondary">LKR {Number(roomType.price).toLocaleString()} per night</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(roomType)}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
            title="Edit room"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(roomType.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            title="Delete room"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <p><span className="font-medium">Capacity:</span> {roomType.capacity} guests</p>
        <p><span className="font-medium">Bed Types:</span> {roomType.bedTypes}</p>
        <p><span className="font-medium">Amenities:</span> {roomType.amenities?.join(', ') || 'None'}</p>
        <p><span className="font-medium">Description:</span> {roomType.description}</p>
        <div className="mt-2">
          <span className={`inline-block px-3 py-1 rounded-full text-sm ${
            roomType.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {roomType.availability ? 'Available' : 'Not Available'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function RoomTypes() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotelId, setHotelId] = useState(null);

  // Fetch rooms from backend
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
          showToastMessage('error', 'Please login to view rooms');
          navigate('/partner-login/step-1');
          return;
        }

        // Get hotel data using Firebase UID
        const hotelData = await getHotelByUserDocId(currentUser.uid);
        
        if (!hotelData || !hotelData.id) {
          showToastMessage('error', 'Hotel not found');
          return;
        }

        setHotelId(hotelData.id);

        // Get rooms for this hotel
        const rooms = await getRoomsByHotelId(hotelData.id);
        
        // Transform backend data to match UI expectations
        const transformedRooms = rooms.map(room => ({
          id: room.id,
          name: room.roomType,
          price: room.pricePerNight,
          capacity: room.maxGuests,
          bedTypes: room.bedTypes,
          amenities: room.amenities || [],
          description: room.description,
          images: room.images || [],
          availability: room.availability
        }));

        setRoomTypes(transformedRooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        showToastMessage('error', error.message || 'Failed to load rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [auth, navigate]);

  const handleDeleteRoomType = async (id) => {
    if (window.confirm('Are you sure you want to delete this room type?')) {
      try {
        await deleteRoom(id);
        setRoomTypes(roomTypes.filter(rt => rt.id !== id));
        showToastMessage('success', 'Room deleted successfully');
      } catch (error) {
        console.error('Error deleting room:', error);
        showToastMessage('error', 'Failed to delete room');
      }
    }
  };

  const openEditModal = (roomType) => {
    // Navigate to edit page instead of opening modal
    navigate(`/rooms-edit/${roomType.id}`);
  };

  // Show loading state
  if (loading) {
    return (
      <HotelLayout>
        <div className="p-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
            <p className="mt-4 text-content-secondary">Loading rooms...</p>
          </div>
        </div>
      </HotelLayout>
    );
  }

  return (
    <HotelLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Room Types</h1>
            <p className="text-content-secondary">Manage your hotel room types and their details</p>
          </div>
          <button
            onClick={() => navigate('/rooms-add')}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg"
          >
            <FaPlus />
            Add Room Type
          </button>
        </div>

        {roomTypes.length === 0 ? (
          <div className="text-center py-12">
            <FaBed className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Room Types Yet</h3>
            <p className="text-content-secondary mb-4">Start by adding your first room type</p>
            <button
              onClick={() => navigate('/rooms-add')}
              className="px-6 py-2 bg-brand-primary text-white rounded-lg"
            >
              Add Room Type
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {roomTypes.map(roomType => (
              <RoomTypeCard
                key={roomType.id}
                roomType={roomType}
                onEdit={openEditModal}
                onDelete={handleDeleteRoomType}
              />
            ))}
          </div>
        )}
      </div>
    </HotelLayout>
  );
}
