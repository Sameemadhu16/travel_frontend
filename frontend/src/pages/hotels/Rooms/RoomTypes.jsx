import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaEdit, FaTrash, FaPlus, FaExclamationTriangle } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import { app } from '../../../config/firebase';
import { getHotelByUserDocId } from '../../../api/hotelService';
import { getRoomsByHotelId, deleteRoom } from '../../../api/roomService';
import { showToastMessage } from '../../../utils/toastHelper';
import HotelLayout from '../../../components/hotel/HotelLayout';

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, roomName, isDeleting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <FaExclamationTriangle className="text-2xl text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Delete Room</h2>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-3">
            Are you sure you want to delete <span className="font-semibold text-gray-900">"{roomName}"</span>?
          </p>
          <p className="text-sm text-gray-600 bg-red-50 border border-red-200 rounded-lg p-3">
            <strong>Warning:</strong> This action cannot be undone. All room data including images will be permanently deleted.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Deleting...
              </>
            ) : (
              <>
                <FaTrash />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

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
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    roomId: null,
    roomName: '',
    isDeleting: false
  });

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

  const handleDeleteRoomType = (id) => {
    // Get the room details for confirmation message
    const roomToDelete = roomTypes.find(rt => rt.id === id);
    const roomName = roomToDelete ? roomToDelete.name : 'this room';
    
    // Open delete confirmation modal
    setDeleteModal({
      isOpen: true,
      roomId: id,
      roomName: roomName,
      isDeleting: false
    });
  };

  const handleConfirmDelete = async () => {
    const { roomId, roomName } = deleteModal;
    
    try {
      // Check authentication
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        showToastMessage('error', 'Please login to delete rooms');
        setDeleteModal({ isOpen: false, roomId: null, roomName: '', isDeleting: false });
        navigate('/partner-login/step-1');
        return;
      }

      // Set deleting state
      setDeleteModal(prev => ({ ...prev, isDeleting: true }));

      // Call API to delete room
      await deleteRoom(roomId);
      
      // Update local state to remove deleted room
      setRoomTypes(prevRooms => prevRooms.filter(rt => rt.id !== roomId));
      
      // Close modal
      setDeleteModal({ isOpen: false, roomId: null, roomName: '', isDeleting: false });
      
      // Show success message
      showToastMessage('success', `${roomName} deleted successfully`);
      
    } catch (error) {
      console.error('Error deleting room:', error);
      
      // Reset deleting state
      setDeleteModal(prev => ({ ...prev, isDeleting: false }));
      
      // Handle specific error cases
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          showToastMessage('error', 'Authentication failed. Please login again.');
          setDeleteModal({ isOpen: false, roomId: null, roomName: '', isDeleting: false });
          navigate('/partner-login/step-1');
        } else if (status === 403) {
          showToastMessage('error', 'You don\'t have permission to delete this room');
          setDeleteModal({ isOpen: false, roomId: null, roomName: '', isDeleting: false });
        } else if (status === 404) {
          showToastMessage('error', 'Room not found. It may have been already deleted.');
          // Remove from local state anyway
          setRoomTypes(prevRooms => prevRooms.filter(rt => rt.id !== roomId));
          setDeleteModal({ isOpen: false, roomId: null, roomName: '', isDeleting: false });
        } else if (status === 409) {
          showToastMessage('error', 'Cannot delete room. There are active bookings for this room.');
          setDeleteModal({ isOpen: false, roomId: null, roomName: '', isDeleting: false });
        } else {
          showToastMessage('error', error.response.data || 'Failed to delete room. Please try again.');
        }
      } else {
        showToastMessage('error', 'Failed to delete room. Please check your connection and try again.');
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, roomId: null, roomName: '', isDeleting: false });
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

        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          roomName={deleteModal.roomName}
          isDeleting={deleteModal.isDeleting}
        />
      </div>
    </HotelLayout>
  );
}
