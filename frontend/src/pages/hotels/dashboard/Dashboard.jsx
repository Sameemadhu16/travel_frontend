import { useState } from 'react';
import { 
  FaBed, FaCalendarCheck, FaStar, FaWallet, 
  FaUsers, FaCheck, FaClock 
} from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';
import { 
  DashboardCard, 
  PageHeader, 
  RoomStatusCard, 
  BookingItem,
  ScheduleItem,
  CardContainer,
  QuickAction
} from '../../../components/hotel/DashboardComponents';
import AdminLayout from '../../../components/admin/AdminLayout';
import StatusBadge from '../../../components/admin/StatusBadge';

function DashboardMetricCard({ icon, label, value, subValue, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white`}>
          {icon}
        </div>
        <div>
          <h3 className="text-content-secondary">{label}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
      {subValue && (
        <p className="text-sm text-content-secondary">{subValue}</p>
      )}
    </div>
  );
}

function RecentBooking({ booking }) {
  return (
    <div className="flex items-center gap-4 p-4 border-b last:border-0">
      <img 
        src={booking.userImage} 
        alt={booking.userName} 
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-grow">
        <h4 className="font-medium">{booking.userName}</h4>
        <p className="text-sm text-content-secondary">{booking.roomType} - {booking.duration}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">LKR {booking.amount}</p>
        <StatusBadge status={booking.status} />
      </div>
    </div>
  );
}

function RoomStatusDisplay({ room }) {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-3 h-3 rounded-full ${
          room.status === 'Occupied' ? 'bg-red-500' :
          room.status === 'Available' ? 'bg-green-500' :
          'bg-yellow-500'
        }`} />
        <h4 className="font-medium">{room.number}</h4>
      </div>
      <p className="text-sm text-content-secondary mb-1">{room.type}</p>
      <p className="text-sm text-content-secondary">{room.status}</p>
    </div>
  );
}

export default function HotelDashboard() {
  // Sample data
  const recentBookings = [
    {
      userName: "John Smith",
      userImage: "/src/assets/users/user1.jpg",
      roomType: "Deluxe Room",
      duration: "3 nights",
      amount: "45,000",
      status: "Confirmed"
    },
    {
      userName: "Sarah Wilson",
      userImage: "/src/assets/users/user2.avif",
      roomType: "Suite",
      duration: "2 nights",
      amount: "65,000",
      status: "Pending"
    },
    {
      userName: "Mike Johnson",
      userImage: "/src/assets/users/user3.avif",
      roomType: "Standard Room",
      duration: "1 night",
      amount: "25,000",
      status: "Completed"
    }
  ];

  const rooms = [
    { number: "101", type: "Deluxe Room", status: "Occupied" },
    { number: "102", type: "Suite", status: "Available" },
    { number: "103", type: "Standard Room", status: "Maintenance" },
    { number: "104", type: "Deluxe Room", status: "Available" },
    { number: "105", type: "Suite", status: "Occupied" },
    { number: "106", type: "Standard Room", status: "Available" }
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Hotel Dashboard</h1>
          <p className="text-content-secondary">Welcome back! Here's what's happening with your hotel today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <DashboardMetricCard
            icon={<FaBed />}
            label="Total Rooms"
            value="24"
            subValue="18 Occupied, 6 Available"
            color="bg-brand-primary"
          />
          <DashboardMetricCard
            icon={<FaCalendarCheck />}
            label="Today's Bookings"
            value="12"
            subValue="4 Check-ins, 3 Check-outs"
            color="bg-green-500"
          />
          <DashboardMetricCard
            icon={<FaWallet />}
            label="Revenue (This Month)"
            value="LKR 845,000"
            subValue="+15.3% from last month"
            color="bg-blue-500"
          />
          <DashboardMetricCard
            icon={<FaStar />}
            label="Average Rating"
            value="4.8"
            subValue="From 236 reviews"
            color="bg-yellow-500"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Recent Bookings</h2>
              </div>
              <div className="divide-y">
                {recentBookings.map((booking, index) => (
                  <RecentBooking key={index} booking={booking} />
                ))}
              </div>
              <div className="p-4 border-t text-center">
                <button className="text-brand-primary hover:underline">
                  View All Bookings
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <button className="p-4 bg-white rounded-xl shadow text-center hover:bg-gray-50">
                <FaCalendarCheck className="text-2xl text-brand-primary mx-auto mb-2" />
                <span className="text-sm font-medium">New Booking</span>
              </button>
              <button className="p-4 bg-white rounded-xl shadow text-center hover:bg-gray-50">
                <FaUsers className="text-2xl text-green-500 mx-auto mb-2" />
                <span className="text-sm font-medium">Guest Check-in</span>
              </button>
              <button className="p-4 bg-white rounded-xl shadow text-center hover:bg-gray-50">
                <FaCheck className="text-2xl text-blue-500 mx-auto mb-2" />
                <span className="text-sm font-medium">Guest Check-out</span>
              </button>
            </div>
          </div>

          {/* Room Status */}
          <div className="bg-white rounded-xl shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Room Status</h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              {rooms.map((room, index) => (
                <RoomStatusDisplay key={index} room={room} />
              ))}
            </div>
            <div className="p-4 border-t text-center">
              <button className="text-brand-primary hover:underline">
                View All Rooms
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Section */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <FaClock className="text-brand-primary" />
                <div>
                  <p className="font-medium">Check-in: Room 204</p>
                  <p className="text-sm text-content-secondary">Guest: David Miller - 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <FaClock className="text-brand-primary" />
                <div>
                  <p className="font-medium">Check-out: Room 305</p>
                  <p className="text-sm text-content-secondary">Guest: Sarah Johnson - 11:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <FaClock className="text-brand-primary" />
                <div>
                  <p className="font-medium">Room Cleaning: 401-405</p>
                  <p className="text-sm text-content-secondary">Scheduled: 1:00 PM - 3:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
