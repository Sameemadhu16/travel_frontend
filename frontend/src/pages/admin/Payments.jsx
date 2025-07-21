import { FaFilter, FaEye, FaDownload } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';
import StatusBadge from '../../components/admin/StatusBadge';
import Pagination from '../../components/admin/Pagination';

const transactions = [
  {
    id: "PMT-2024-01",
    user: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    type: "Hotel",
    amount: "$400.00",
    method: "Card",
    status: "Success",
    date: "Dec 15, 2024"
  },
  {
    id: "PMT-2024-02",
    user: {
      name: "Sarah Wilson",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    type: "Guide",
    amount: "$250.00",
    method: "Bank Transfer",
    status: "Pending",
    date: "Dec 14, 2024"
  },
  {
    id: "PMT-2024-03",
    user: {
      name: "Mike Chan",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    type: "Hotel",
    amount: "$675.50",
    method: "PayPal",
    status: "Failed",
    date: "Dec 13, 2024"
  }
];

export default function Payments() {
  return (
    <AdminLayout activePage="payments">
      <AdminHeader 
        title="Payment Management" 
        subtitle="Track and manage payment transactions" 
      />

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center gap-4">
        <input 
          className="border rounded px-3 py-2 flex-1" 
          placeholder="Search transactions..." 
        />
        <select className="border rounded px-3 py-2">
          <option>All Types</option>
          <option>Hotel</option>
          <option>Guide</option>
          <option>Vehicle</option>
        </select>
        <select className="border rounded px-3 py-2">
          <option>All Status</option>
          <option>Success</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
        <button className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaFilter /> Apply Filters
        </button>
        <button className="bg-brand-primary text-white px-4 py-2 rounded flex items-center gap-2">
          <FaDownload /> Export
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left text-content-secondary">
              <th className="py-3">Transaction ID</th>
              <th>User</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id} className="border-t">
                <td className="py-3">{transaction.id}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <img 
                      src={transaction.user.avatar} 
                      alt={transaction.user.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="font-semibold">{transaction.user.name}</div>
                  </div>
                </td>
                <td>{transaction.type}</td>
                <td className="font-semibold">{transaction.amount}</td>
                <td>{transaction.method}</td>
                <td>
                  <StatusBadge status={transaction.status} />
                </td>
                <td>{transaction.date}</td>
                <td>
                  <button className="text-blue-500"><FaEye /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination 
          currentPage={1}
          totalPages={8}
          totalResults={75}
          onPageChange={(page) => console.log('Page changed to:', page)}
        />
      </div>
    </AdminLayout>
  );
}