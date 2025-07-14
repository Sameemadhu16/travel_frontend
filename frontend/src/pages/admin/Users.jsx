import { FaUser, FaCheckCircle, FaHourglassHalf, FaBan, FaPlus, FaFilter, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const users = [
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@gmail.com",
    role: "Tourist",
    status: "Active",
    registered: "Dec 15, 2023",
    id: "U123456781",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    name: "Michael Chen",
    email: "michael.chen@mail.com",
    role: "Guide",
    status: "Pending",
    registered: "Dec 14, 2023",
    id: "U123456782",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    name: "Emma Wilson",
    email: "emma.wilson@gmail.com",
    role: "Hotel Host",
    status: "Banned",
    registered: "Dec 10, 2023",
    id: "U123456783",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg"
  }
];

export default function Users() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white rounded-xl shadow p-4 flex flex-col gap-4">
        <div className="font-bold text-xl text-brand-primary mb-4">Travel.lk</div>
        <nav className="flex flex-col gap-2">
          <button className="bg-brand-primary text-white px-4 py-2 rounded font-semibold">Dashboard</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Users</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Listings</button>
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
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-content-secondary">Manage and moderate platform users</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">Admin User</span>
            <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="Admin" className="w-10 h-10 rounded-full" />
          </div>
        </div>
        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center gap-4">
          <input className="border rounded px-3 py-2 flex-1" placeholder="Search by name, email, or user ID..." />
          <select className="border rounded px-3 py-2">
            <option>All Roles</option>
            <option>Tourist</option>
            <option>Guide</option>
            <option>Hotel Host</option>
          </select>
          <select className="border rounded px-3 py-2">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Banned</option>
          </select>
          <button className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2">
            <FaFilter /> Apply Filters
          </button>
          <button className="bg-brand-primary text-white px-4 py-2 rounded flex items-center gap-2">
            <FaPlus /> Add User
          </button>
        </div>
        {/* Users Table */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="font-semibold mb-2">Users (1,247)</div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-content-secondary">
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Registered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t">
                  <td className="py-3 flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-xs text-content-secondary">{user.email}</div>
                      <div className="text-xs text-content-tertiary">{user.id}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === "Tourist" ? "bg-blue-100 text-blue-700" : user.role === "Guide" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {user.status === "Active" && <span className="flex items-center gap-1 text-green-600 font-semibold text-xs"><FaCheckCircle /> Active</span>}
                    {user.status === "Pending" && <span className="flex items-center gap-1 text-yellow-600 font-semibold text-xs"><FaHourglassHalf /> Pending</span>}
                    {user.status === "Banned" && <span className="flex items-center gap-1 text-red-600 font-semibold text-xs"><FaBan /> Banned</span>}
                  </td>
                  <td>{user.registered}</td>
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
          <div className="flex justify-end items-center gap-2 mt-4">
            <span>Previous</span>
            <button className="bg-orange-500 text-white px-2 rounded">1</button>
            <button className="bg-gray-200 px-2 rounded">2</button>
            <button className="bg-gray-200 px-2 rounded">3</button>
            <span>Next</span>
          </div>
          <div className="text-xs text-content-tertiary mt-2">Showing 1 to 3 of 1,247 results</div>
        </div>
      </main>
    </div>
  );
}