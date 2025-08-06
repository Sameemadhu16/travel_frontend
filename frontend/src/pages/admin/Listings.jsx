import { useState } from 'react';
import { FaHotel, FaCar, FaRoute, FaFilter, FaPlus, FaEye, FaEdit, FaTrash, FaTimes, FaImage } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';
import StatusBadge from '../../components/admin/StatusBadge';
import Pagination from '../../components/admin/Pagination';

const listings = [
  {
    id: "#TL001",
    title: "Luxury Beach Resort",
    location: "Colombo, Sri Lanka",
    type: "Hotel",
    submittedBy: "John Silva",
    status: "Pending",
    date: "2024-01-15",
    thumbnail: "https://images.unsplash.com/photo-1571896349842-33c89424de2d"
  },
  {
    id: "#TL002",
    title: "Toyota Prius Rental",
    location: "Kandy, Sri Lanka",
    type: "Vehicle",
    submittedBy: "Maria Fernando",
    status: "Approved",
    date: "2024-01-14",
    thumbnail: "https://images.unsplash.com/photo-1621993203334-9c0c21ae368f"
  },
  {
    id: "#TL003",
    title: "Sigiriya Rock Tour",
    location: "Dambulla, Sri Lanka",
    type: "Tour",
    submittedBy: "David Perera",
    status: "Rejected",
    date: "2024-01-13",
    thumbnail: "https://images.unsplash.com/photo-1625045307598-304f916a0f1e"
  }
];

function AddListingModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Hotel',
    location: '',
    description: '',
    price: '',
    thumbnail: '',
    facilities: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Listing</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-primary"
                placeholder="Enter listing title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-primary"
              >
                <option value="Hotel">Hotel</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Tour">Tour</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-primary"
                placeholder="City, Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-primary"
                placeholder="Enter price"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-primary"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-primary"
                placeholder="Enter image URL"
              />
              <button
                type="button"
                className="px-3 py-2 border rounded-lg hover:bg-gray-50"
                title="Upload Image"
              >
                <FaImage />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facilities/Features
            </label>
            <input
              type="text"
              name="facilities"
              value={formData.facilities}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-primary"
              placeholder="Enter facilities (comma separated)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark"
            >
              Add Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Listings() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [listingsList, setListingsList] = useState(listings);

  const handleAddListing = (listingData) => {
    const newListing = {
      ...listingData,
      id: "#TL" + (listingsList.length + 1).toString().padStart(3, '0'),
      submittedBy: "Admin User",
      status: "Pending",
      date: new Date().toISOString().split('T')[0]
    };
    setListingsList(prev => [newListing, ...prev]);
  };

  return (
    <AdminLayout activePage="listings">
      <AdminHeader 
        title="Listings Management" 
        subtitle="Manage and review all travel listings" 
      />
      
      <AddListingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddListing}
      />

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center gap-4">
        <input 
          className="border rounded px-3 py-2 flex-1" 
          placeholder="Search listings..." 
        />
        <select className="border rounded px-3 py-2">
          <option>All Types</option>
          <option>Hotel</option>
          <option>Vehicle</option>
          <option>Tour</option>
        </select>
        <select className="border rounded px-3 py-2">
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
        <button className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaFilter /> Apply Filters
        </button>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-brand-primary text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add Listing
        </button>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left text-content-secondary">
              <th className="py-3">Listing ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Submitted By</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listingsList.map(listing => (
              <tr key={listing.id} className="border-t">
                <td className="py-3">{listing.id}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <img 
                      src={listing.thumbnail} 
                      alt={listing.title} 
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <div className="font-semibold">{listing.title}</div>
                      <div className="text-xs text-content-secondary">{listing.location}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`px-2 py-1 rounded text-xs font-semibold 
                    ${listing.type === "Hotel" ? "bg-purple-100 text-purple-700" : 
                      listing.type === "Vehicle" ? "bg-orange-100 text-orange-700" : 
                      "bg-green-100 text-green-700"}`}>
                    {listing.type === "Hotel" && <FaHotel className="inline mr-1" />}
                    {listing.type === "Vehicle" && <FaCar className="inline mr-1" />}
                    {listing.type === "Tour" && <FaRoute className="inline mr-1" />}
                    {listing.type}
                  </span>
                </td>
                <td>{listing.submittedBy}</td>
                <td>
                  <StatusBadge status={listing.status} />
                </td>
                <td>{listing.date}</td>
                <td className="flex gap-2">
                  <button className="text-orange-500"><FaEye /></button>
                  <button className="text-green-500"><FaEdit /></button>
                  <button className="text-red-500"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination 
          currentPage={1}
          totalPages={10}
          totalResults={97}
          onPageChange={(page) => console.log('Page changed to:', page)}
        />
      </div>
    </AdminLayout>
  );
}