import { FaFilter, FaStar, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';
import StatusBadge from '../../components/admin/StatusBadge';
import Pagination from '../../components/admin/Pagination';

const reviews = [
  {
    id: "#RV001",
    user: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    listing: {
      title: "Luxury Beach Resort",
      type: "Hotel"
    },
    rating: 5.0,
    date: "Jan 15, 2024",
    status: "Approved"
  },
  {
    id: "#RV002",
    user: {
      name: "Mike Chen",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    listing: {
      title: "Toyota Camry 2023",
      type: "Vehicle"
    },
    rating: 1.0,
    date: "Jan 15, 2024",
    status: "Pending"
  },
  {
    id: "#RV003",
    user: {
      name: "Emma Wilson",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    listing: {
      title: "Sigiriya Rock Tour",
      type: "Tour"
    },
    rating: 4.0,
    date: "Jan 13, 2024",
    status: "Rejected"
  }
];

export default function Reviews() {
  return (
    <AdminLayout activePage="reviews">
      <AdminHeader 
        title="Reviews Management" 
        subtitle="Monitor and manage user reviews" 
      />

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center gap-4">
        <input 
          className="border rounded px-3 py-2 flex-1" 
          placeholder="Search reviews..." 
        />
        <select className="border rounded px-3 py-2">
          <option>All Types</option>
          <option>Hotel</option>
          <option>Vehicle</option>
          <option>Tour</option>
        </select>
        <select className="border rounded px-3 py-2">
          <option>All Status</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>
        <button className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaFilter /> Apply Filters
        </button>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left text-content-secondary">
              <th className="py-3">Review ID</th>
              <th>Reviewer</th>
              <th>Listing</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review.id} className="border-t">
                <td className="py-3">{review.id}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <img 
                      src={review.user.avatar} 
                      alt={review.user.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="font-semibold">{review.user.name}</div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-semibold">{review.listing.title}</div>
                    <div className="text-xs text-content-secondary">{review.listing.type}</div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <FaStar />
                    <span className="text-content-primary">{review.rating.toFixed(1)}</span>
                  </div>
                </td>
                <td>
                  <StatusBadge status={review.status} />
                </td>
                <td>{review.date}</td>
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
          totalPages={7}
          totalResults={65}
          onPageChange={(page) => console.log('Page changed to:', page)}
        />
      </div>
    </AdminLayout>
  );
}