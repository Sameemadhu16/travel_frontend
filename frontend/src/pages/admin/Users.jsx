import { useState } from 'react';
import { FaFilter, FaPlus, FaEye, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
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

function AddUserModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Tourist',
    password: '',
    confirmPassword: ''
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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-primary"
              >
                <option value="Tourist">Tourist</option>
                <option value="Guide">Guide</option>
                <option value="Hotel Host">Hotel Host</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
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
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Users() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [usersList, setUsersList] = useState(users);

  const handleAddUser = (userData) => {
    const newUser = {
      ...userData,
      id: 'U' + Date.now().toString().slice(-8),
      status: 'Active',
      registered: new Date().toLocaleDateString('en-US', { 
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg' // Default avatar
    };
    setUsersList(prev => [newUser, ...prev]);
  };

  return (
    <AdminLayout activePage="users">
      <AdminHeader 
        title="User Management" 
        subtitle="Manage and monitor user accounts" 
      />
      
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
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
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-brand-primary text-white px-4 py-2 rounded flex items-center gap-2"
        >
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
            {usersList.map(user => (
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