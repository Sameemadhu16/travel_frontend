import { FaUsers, FaClipboardList, FaCalendarCheck, FaRupeeSign, FaFlag, FaClipboard, FaEye, FaBell, FaCreditCard } from 'react-icons/fa';
import { FaMessage, FaUserPlus, FaStar } from 'react-icons/fa6';
import Main from '../../components/Main';
import AdminCard from '../../components/admin/AdminCard';
import AdminSidebar from '../../components/admin/AdminSidebar';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import user4 from '../../assets/users/user4.jpg';
import user5 from '../../assets/users/user5.jpg';

export default function AdminDashboard() {
  return (
    <div className='flex'>
      <div className='sticky top-0 h-fit'>
        <AdminSidebar />
      </div>
      <div className='flex-1'>
        <Main hasNavbar={true}>
          <div>
            <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-gray-600 mb-6">Monitor and manage your travel platform. Here&apos;s your system overview and what needs attention today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <AdminCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Pending Requests</p>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-orange-500 text-sm">View All Requests</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <FaClipboardList className="text-orange-500 text-xl" />
                </div>
              </div>
            </AdminCard>

            <AdminCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Active Users</p>
                  <p className="text-3xl font-bold">2,847</p>
                  <p className="text-gray-400 text-xs">+12% from last month</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaUsers className="text-blue-500 text-xl" />
                </div>
              </div>
            </AdminCard>

            <AdminCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Monthly Revenue</p>
                  <p className="text-3xl font-bold">$24,680</p>
                  <p className="text-green-500 text-sm">+8.2% increase</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <FaRupeeSign className="text-green-500 text-xl" />
                </div>
              </div>
            </AdminCard>

            <AdminCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Bookings</p>
                  <p className="text-3xl font-bold">1,543</p>
                  <p className="text-gray-400 text-xs">This month</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaCalendarCheck className="text-purple-500 text-xl" />
                </div>
              </div>
            </AdminCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <AdminCard>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Recent Activities</h3>
                  <SecondaryButton className="text-xs px-3 py-1">
                    <FaEye className="mr-1" /> View All
                  </SecondaryButton>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img src={user4} alt="User" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">New tour booking from John Smith</p>
                      <p className="text-gray-500 text-xs">Colombo to Kandy - 3 days tour</p>
                      <p className="text-gray-400 text-xs">2 minutes ago</p>
                    </div>
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">New</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img src={user5} alt="User" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Payment received from Sarah Johnson</p>
                      <p className="text-gray-500 text-xs">Tour booking #TB-2024-089</p>
                      <p className="text-gray-400 text-xs">15 minutes ago</p>
                    </div>
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">Payment</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <FaFlag className="text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">New complaint submitted</p>
                      <p className="text-gray-500 text-xs">Tour guide availability issue</p>
                      <p className="text-gray-400 text-xs">1 hour ago</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full">Issue</span>
                  </div>
                </div>
              </AdminCard>
            </div>

            <div>
              <AdminCard>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Quick Actions</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors">
                    <div className="bg-blue-500 p-2 rounded-full">
                      <FaUserPlus className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Add New Partner</p>
                      <p className="text-gray-500 text-xs">Register hotels, guides, drivers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 cursor-pointer transition-colors">
                    <div className="bg-green-500 p-2 rounded-full">
                      <FaBell className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Send Notifications</p>
                      <p className="text-gray-500 text-xs">Broadcast to users/partners</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 cursor-pointer transition-colors">
                    <div className="bg-purple-500 p-2 rounded-full">
                      <FaCreditCard className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Process Payments</p>
                      <p className="text-gray-500 text-xs">Review pending transactions</p>
                    </div>
                  </div>
                </div>
              </AdminCard>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <AdminCard>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">System Overview</h3>
                <SecondaryButton className="text-xs px-3 py-1">
                  <FaEye className="mr-1" /> Details
                </SecondaryButton>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Tours</span>
                  <span className="font-semibold">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Registered Partners</span>
                  <span className="font-semibold">234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Users</span>
                  <span className="font-semibold">12,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">System Uptime</span>
                  <span className="font-semibold text-green-600">99.9%</span>
                </div>
              </div>
            </AdminCard>

            <AdminCard>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Top Performers</h3>
                <SecondaryButton className="text-xs px-3 py-1">
                  <FaStar className="mr-1" /> View Rankings
                </SecondaryButton>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Mountain View Tours</p>
                    <p className="text-gray-500 text-xs">4.9 rating • 127 tours</p>
                  </div>
                  <FaStar className="text-yellow-500" />
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Coastal Adventures</p>
                    <p className="text-gray-500 text-xs">4.8 rating • 98 tours</p>
                  </div>
                  <FaStar className="text-yellow-500" />
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Heritage Explorer</p>
                    <p className="text-gray-500 text-xs">4.7 rating • 85 tours</p>
                  </div>
                  <FaStar className="text-yellow-500" />
                </div>
              </div>
            </AdminCard>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton className="px-6 py-3">
              <FaMessage className="mr-2" />
              Send Announcements
            </PrimaryButton>
            <SecondaryButton className="px-6 py-3">
              <FaClipboard className="mr-2" />
              Generate Reports
            </SecondaryButton>
          </div>
        </Main>
      </div>
    </div>
  );
}