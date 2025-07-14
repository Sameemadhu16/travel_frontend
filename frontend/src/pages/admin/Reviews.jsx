import { FaStar, FaCheckCircle, FaClock, FaFlag, FaEye, FaCheck, FaBan, FaDownload } from 'react-icons/fa';

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
    status: "Reported"
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
    status: "Pending"
  }
];

export default function Reviews() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white rounded-xl shadow p-4 flex flex-col gap-4">
        <div className="font-bold text-xl text-brand-primary mb-4">Travel.lk</div>
        <nav className="flex flex-col gap-2">
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Dashboard</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Users</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Listings</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Bookings</button>
          <button className="bg-brand-primary text-white px-4 py-2 rounded font-semibold">Reviews</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Reports</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Notifications</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Payments</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Settings</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Review Moderation</h1>
            <p className="text-content-secondary">Manage and moderate user reviews across all listings</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">Admin User</span>
            <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="Admin" className="w-10 h-10 rounded-full" />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center gap-4">
          <select className="border rounded px-3 py-2">
            <option>All Types</option>
            <option>Hotel</option>
            <option>Vehicle</option>
            <option>Tour</option>
          </select>
          <select className="border rounded px-3 py-2">
            <option>All Ratings</option>
            <option>5 Stars</option>
            <option>4 Stars</option>
            <option>3 Stars</option>
            <option>2 Stars</option>
            <option>1 Star</option>
          </select>
          <input 
            className="border rounded px-3 py-2 flex-1" 
            placeholder="Search reviews..." 
          />
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Reported Only</span>
          </label>
          <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded flex items-center gap-2">
            <FaDownload /> Export
          </button>
        </div>

        {/* Reviews Table */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Reviews (247)</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-content-secondary">
                <th className="py-3">Review ID</th>
                <th>User</th>
                <th>Listing</th>
                <th>Rating</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(review => (
                <tr key={review.id} className="border-t">
                  <td className="py-3">{review.id}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <img src={review.user.avatar} alt={review.user.name} className="w-8 h-8 rounded-full" />
                      <span>{review.user.name}</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-semibold">{review.listing.title}</div>
                      <div className="text-xs text-content-secondary">{review.listing.type}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{review.rating}</span>
                      <FaStar className="text-yellow-400" />
                    </div>
                  </td>
                  <td>{review.date}</td>
                  <td>
                    {review.status === "Approved" && (
                      <span className="flex items-center gap-1 text-green-600">
                        <FaCheckCircle /> Approved
                      </span>
                    )}
                    {review.status === "Pending" && (
                      <span className="flex items-center gap-1 text-yellow-600">
                        <FaClock /> Pending
                      </span>
                    )}
                    {review.status === "Reported" && (
                      <span className="flex items-center gap-1 text-red-600">
                        <FaFlag /> Reported
                      </span>
                    )}
                  </td>
                  <td className="flex gap-2">
                    <button className="text-blue-500"><FaEye /></button>
                    <button className="text-green-500"><FaCheck /></button>
                    <button className="text-red-500"><FaBan /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-content-secondary">
              Showing 1 to 3 of 247 results
            </div>
            <div className="flex gap-2">
              <button className="text-content-secondary">Previous</button>
              <button className="px-2 py-1 rounded bg-brand-primary text-white">1</button>
              <button className="px-2 py-1 rounded border">2</button>
              <button className="px-2 py-1 rounded border">3</button>
              <button className="text-content-secondary">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}