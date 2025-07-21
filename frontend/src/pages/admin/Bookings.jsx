import { FaCalendarCheck, FaSearch, FaFilter, FaEllipsisV } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';
import StatusBadge from '../../components/admin/StatusBadge';
import Pagination from '../../components/admin/Pagination';

function BookingCard({ icon, label, value, change, color }) {
  return (
    <div className={`flex items-center gap-4 bg-white rounded-xl shadow p-4`}>
      <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${color}`}>
        {icon}
      </div>
      <div>
        <div className="font-bold text-xl text-content-primary">{value}</div>
        <div className="text-content-secondary text-sm">{label}</div>
        <div className="text-success text-xs">{change}</div>
      </div>
    </div>
  );
}

export default function Bookings() {
  return (
    <AdminLayout activePage="bookings">
      <AdminHeader 
        title="Bookings" 
        subtitle="Manage and track all bookings across the platform"
      />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <BookingCard
          icon={<FaCalendarCheck />}
          label="Total Bookings"
          value="8,923"
          change="+15% from last month"
          color="bg-brand-primary"
        />
        <BookingCard
          icon={<FaCalendarCheck />}
          label="Pending Bookings"
          value="156"
          change="+5% from last month"
          color="bg-warning"
        />
        <BookingCard
          icon={<FaCalendarCheck />}
          label="Completed"
          value="7,234"
          change="+18% from last month"
          color="bg-success"
        />
        <BookingCard
          icon={<FaCalendarCheck />}
          label="Cancelled"
          value="1,533"
          change="-2% from last month"
          color="bg-danger"
        />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 flex-grow">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search bookings..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-brand-primary"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <FaFilter />
            Filter
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-content-primary">BK-{2023001 + index}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={`/src/assets/users/user${(index % 5) + 1}.jpg`}
                      alt="User"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-content-primary">John Doe</div>
                      <div className="text-sm text-content-secondary">john@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-content-primary">Hotel Booking</div>
                  <div className="text-sm text-content-secondary">Cinnamon Grand</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-content-primary">July 25, 2023</div>
                  <div className="text-sm text-content-secondary">2 nights</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-content-primary">LKR 45,000</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge 
                    status={['Confirmed', 'Pending', 'Completed', 'Cancelled'][index % 4]} 
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <FaEllipsisV />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t">
          <Pagination 
            currentPage={1} 
            totalPages={10} 
            onPageChange={(page) => console.log('Page changed:', page)} 
          />
        </div>
      </div>
    </AdminLayout>
  );
}
