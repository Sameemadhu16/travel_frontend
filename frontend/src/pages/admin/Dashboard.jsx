import { FaUsers, FaClipboardList, FaCalendarCheck, FaRupeeSign, FaCheckCircle, FaFlag, FaClipboard } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';

function StatCard({ icon, label, value, change, color }) {
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

function ActivityItem({ icon, text, detail, time }) {
  return (
    <li className="flex items-center gap-3">
      {icon}
      <div>
        <span className="font-semibold text-content-primary">{text}</span>
        <div className="text-content-secondary text-sm">{detail}</div>
        <div className="text-content-tertiary text-xs">{time}</div>
      </div>
    </li>
  );
}

function QuickActionItem({ color, text, detail }) {
  return (
    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
      <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-white`}>
        <FaClipboard />
      </div>
      <div>
        <div className="font-semibold">{text}</div>
        <div className="text-content-secondary text-sm">{detail}</div>
      </div>
    </li>
  );
}

export default function AdminDashboard() {
  return (
    <AdminLayout activePage="dashboard">
      <AdminHeader 
        title="Welcome back, Admin!" 
        subtitle="Here's what's happening with Travel.lk today."
      />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<FaUsers />}
          label="Total Users"
          value="12,847"
          change="+12% from last month"
          color="bg-brand-primary"
        />
        <StatCard
          icon={<FaClipboardList />}
          label="Total Listings"
          value="2,341"
          change="+8% from last month"
          color="bg-success"
        />
        <StatCard
          icon={<FaCalendarCheck />}
          label="Total Bookings"
          value="8,923"
          change="+15% from last month"
          color="bg-info"
        />
        <StatCard
          icon={<FaRupeeSign />}
          label="Total Revenue"
          value="LKR 45.2M"
          change="+22% from last month"
          color="bg-warning"
        />
      </div>

      {/* Activity and Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            <ActivityItem
              icon={<FaCheckCircle className="text-success" />}
              text="New user registered"
              detail="John Doe joined as a traveler"
              time="2 minutes ago"
            />
            <ActivityItem
              icon={<FaFlag className="text-danger" />}
              text="Review flagged"
              detail="Inappropriate content reported"
              time="15 minutes ago"
            />
            <ActivityItem
              icon={<FaClipboardList className="text-info" />}
              text="New listing submitted"
              detail="Villa in Kandy awaiting approval"
              time="1 hour ago"
            />
            <ActivityItem
              icon={<FaRupeeSign className="text-warning" />}
              text="Payment processed"
              detail="LKR 25,000 booking payment"
              time="2 hours ago"
            />
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <ul className="space-y-4">
            <QuickActionItem
              color="bg-brand-primary"
              text="Verify New Listings"
              detail="12 listings pending approval"
            />
            <QuickActionItem
              color="bg-danger"
              text="View Flagged Reviews"
              detail="3 reviews need attention"
            />
            <QuickActionItem
              color="bg-info"
              text="Approve Pending Providers"
              detail="8 providers awaiting verification"
            />
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}