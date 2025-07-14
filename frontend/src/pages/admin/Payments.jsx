import { FaFilter, FaDownload, FaCheck, FaClock, FaTimes, FaEye } from 'react-icons/fa';

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
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white rounded-xl shadow p-4 flex flex-col gap-4">
        <div className="font-bold text-xl text-brand-primary mb-4">Travel.lk</div>
        <nav className="flex flex-col gap-2">
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Dashboard</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Users</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Listings</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Bookings</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Reviews</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Reports</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Notifications</button>
          <button className="bg-brand-primary text-white px-4 py-2 rounded font-semibold">Payments</button>
          <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Settings</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Payment Management</h1>
            <p className="text-content-secondary">Manage all payment transactions and financial data</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">Admin User</span>
            <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="Admin" className="w-10 h-10 rounded-full" />
          </div>
        </div>

        {/* Payment Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-content-secondary mb-2">Total Revenue</div>
            <div className="text-2xl font-bold">$125,430</div>
            <div className="text-green-500 text-sm">+13.2% from last month</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-content-secondary mb-2">Due Balance</div>
            <div className="text-2xl font-bold">$89,240</div>
            <div className="text-yellow-500 text-sm">-4.3% from last month</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-content-secondary mb-2">Commission Earned</div>
            <div className="text-2xl font-bold">$36,190</div>
            <div className="text-green-500 text-sm">+8.7% from last month</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm mb-1">Date Range</label>
              <input type="date" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1">Payment Type</label>
              <select className="w-full border rounded px-3 py-2">
                <option>All Types</option>
                <option>Hotel</option>
                <option>Guide</option>
                <option>Vehicle</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Method</label>
              <select className="w-full border rounded px-3 py-2">
                <option>All Methods</option>
                <option>Card</option>
                <option>Bank Transfer</option>
                <option>PayPal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Status</label>
              <select className="w-full border rounded px-3 py-2">
                <option>All Status</option>
                <option>Success</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button className="text-gray-600">Reset</button>
            <div className="flex gap-2">
              <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded flex items-center gap-2">
                <FaDownload /> Export
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
                <FaFilter /> Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold">Payment Transactions</h2>
            <button className="text-blue-600 flex items-center gap-1">
              <FaDownload /> Export
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-content-secondary border-b">
                <th className="p-4">Payment ID</th>
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
                <tr key={transaction.id} className="border-b">
                  <td className="p-4">{transaction.id}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <img src={transaction.user.avatar} alt={transaction.user.name} className="w-8 h-8 rounded-full" />
                      <span>{transaction.user.name}</span>
                    </div>
                  </td>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.method}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${transaction.status === 'Success' ? 'bg-green-100 text-green-600' :
                        transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'}`}>
                      {transaction.status === 'Success' && <FaCheck className="inline mr-1" />}
                      {transaction.status === 'Pending' && <FaClock className="inline mr-1" />}
                      {transaction.status === 'Failed' && <FaTimes className="inline mr-1" />}
                      {transaction.status}
                    </span>
                  </td>
                  <td>{transaction.date}</td>
                  <td>
                    <button className="text-blue-600">
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 flex justify-between items-center">
            <div className="text-sm text-content-secondary">
              Showing 1 to 3 of 50 results
            </div>
            <div className="flex gap-2">
              <button className="px-2 py-1 rounded border">Previous</button>
              <button className="px-2 py-1 rounded bg-brand-primary text-white">1</button>
              <button className="px-2 py-1 rounded border">2</button>
              <button className="px-2 py-1 rounded border">3</button>
              <button className="px-2 py-1 rounded border">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}