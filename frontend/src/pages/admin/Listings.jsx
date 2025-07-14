import { FaHotel, FaCar, FaRoute, FaCheckCircle, FaClock, FaBan, FaPlus, FaFilter, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

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

export default function Listings() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white rounded-xl shadow p-4 flex flex-col gap-4">
        <div className="font-bold text-xl text-brand-primary mb-4">Travel.lk</div>
        <nav className="flex flex-col gap-2">
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Dashboard</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Users</button>
          <button className="bg-brand-primary text-white px-4 py-2 rounded font-semibold">Listings</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Bookings</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Reviews</button>
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
            <h1 className="text-2xl font-bold">Listings Management</h1>
            <p className="text-content-secondary">Manage and review all travel listings</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">Admin User</span>
            <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="Admin" className="w-10 h-10 rounded-full" />
          </div>
        </div>

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
          <button className="bg-brand-primary text-white px-4 py-2 rounded flex items-center gap-2">
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
              {listings.map(listing => (
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
                        listing.type === "Vehicle" ? "bg-blue-100 text-blue-700" : 
                        "bg-green-100 text-green-700"}`}>
                      {listing.type === "Hotel" && <FaHotel className="inline mr-1" />}
                      {listing.type === "Vehicle" && <FaCar className="inline mr-1" />}
                      {listing.type === "Tour" && <FaRoute className="inline mr-1" />}
                      {listing.type}
                    </span>
                  </td>
                  <td>{listing.submittedBy}</td>
                  <td>
                    {listing.status === "Approved" && <span className="flex items-center gap-1 text-green-600"><FaCheckCircle /> Approved</span>}
                    {listing.status === "Pending" && <span className="flex items-center gap-1 text-yellow-600"><FaClock /> Pending</span>}
                    {listing.status === "Rejected" && <span className="flex items-center gap-1 text-red-600"><FaBan /> Rejected</span>}
                  </td>
                  <td>{listing.date}</td>
                  <td className="flex gap-2">
                    <button className="text-blue-500"><FaEye /></button>
                    <button className="text-green-500"><FaEdit /></button>
                    <button className="text-red-500"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-content-secondary">
              Showing 1 to 3 of 97 results
            </div>
            <div className="flex gap-2">
              <button className="px-2 py-1 rounded border">&lt;</button>
              <button className="px-2 py-1 rounded bg-orange-500 text-white">1</button>
              <button className="px-2 py-1 rounded border">2</button>
              <button className="px-2 py-1 rounded border">3</button>
              <button className="px-2 py-1 rounded border">&gt;</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}