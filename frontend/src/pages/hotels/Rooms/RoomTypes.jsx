import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
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
            <p className="text-content-secondary">LKR {roomType.price} per night</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(roomType)}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(roomType.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <p><span className="font-medium">Capacity:</span> {roomType.capacity} guests</p>
        <p><span className="font-medium">Size:</span> {roomType.size} sqft</p>
        <p><span className="font-medium">Amenities:</span> {roomType.amenities.join(', ')}</p>
        <p><span className="font-medium">Description:</span> {roomType.description}</p>
      </div>
    </div>
  );
}

function RoomTypeModal({ isOpen, onClose, roomType, onSave }) {
  const [formData, setFormData] = useState(
    roomType || {
      name: '',
      price: '',
      capacity: '',
      size: '',
      amenities: '',
      description: ''
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      amenities: formData.amenities.split(',').map(item => item.trim())
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">
          {roomType ? 'Edit Room Type' : 'Add New Room Type'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Room Type Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price per Night (LKR)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Capacity (Guests)</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Size (sqft)</label>
              <input
                type="number"
                value={formData.size}
                onChange={(e) => setFormData({...formData, size: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amenities (comma-separated)</label>
            <input
              type="text"
              value={formData.amenities}
              onChange={(e) => setFormData({...formData, amenities: e.target.value})}
              className="w-full p-2 border rounded-lg"
              placeholder="TV, Air Conditioning, Mini Bar"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-2 border rounded-lg"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-primary text-white rounded-lg"
            >
              {roomType ? 'Save Changes' : 'Add Room Type'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RoomTypes() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoomType, setEditingRoomType] = useState(null);

  // Sample data - replace with actual API calls
  const [roomTypes, setRoomTypes] = useState([
    {
      id: 1,
      name: 'Deluxe Room',
      price: '45000',
      capacity: 2,
      size: 400,
      amenities: ['King Bed', 'Ocean View', 'Mini Bar', 'Wi-Fi', 'Air Conditioning'],
      description: 'Luxurious room with modern amenities and stunning ocean views.'
    },
    {
      id: 2,
      name: 'Executive Suite',
      price: '75000',
      capacity: 3,
      size: 600,
      amenities: ['King Bed', 'Living Area', 'Mini Bar', 'Wi-Fi', 'Air Conditioning', 'Bathtub'],
      description: 'Spacious suite with separate living area and premium amenities.'
    },
    {
      id: 3,
      name: 'Family Room',
      price: '65000',
      capacity: 4,
      size: 550,
      amenities: ['2 Queen Beds', 'Pool View', 'Mini Bar', 'Wi-Fi', 'Air Conditioning'],
      description: 'Perfect for families, featuring two queen beds and pool views.'
    }
  ]);

  const handleAddRoomType = (newRoomType) => {
    setRoomTypes([...roomTypes, { ...newRoomType, id: roomTypes.length + 1 }]);
  };

  const handleEditRoomType = (updatedRoomType) => {
    setRoomTypes(roomTypes.map(rt => 
      rt.id === updatedRoomType.id ? updatedRoomType : rt
    ));
  };

  const handleDeleteRoomType = (id) => {
    if (window.confirm('Are you sure you want to delete this room type?')) {
      setRoomTypes(roomTypes.filter(rt => rt.id !== id));
    }
  };

  const openEditModal = (roomType) => {
    setEditingRoomType({
      ...roomType,
      amenities: roomType.amenities.join(', ')
    });
    setIsModalOpen(true);
  };

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

        <RoomTypeModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingRoomType(null);
          }}
          roomType={editingRoomType}
          onSave={editingRoomType ? handleEditRoomType : handleAddRoomType}
        />
      </div>
    </HotelLayout>
  );
}
