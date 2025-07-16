import { FaFilter, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';
import StatusBadge from '../../components/admin/StatusBadge';
import Pagination from '../../components/admin/Pagination';

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
    <AdminLayout activePage="users">
      <AdminHeader 
        title="User Management" 
        subtitle="Manage and monitor user accounts" 
      />

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center gap-4">
        <input 
          className="border rounded px-3 py-2 flex-1" 
          placeholder="Search users..." 
        />
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
        <table className="w-full">
          <thead>
            <tr className="text-left text-content-secondary">
              <th className="py-3">User ID</th>
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
                <td className="py-3">{user.id}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-xs text-content-secondary">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                    {user.role}
                  </span>
                </td>
                <td>
                  <StatusBadge status={user.status} />
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

        <Pagination 
          currentPage={1}
          totalPages={5}
          totalResults={50}
          onPageChange={(page) => console.log('Page changed to:', page)}
        />
      </div>
    </AdminLayout>
  );
}