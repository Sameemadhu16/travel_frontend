import React, { useState } from 'react';
import PartnerLayout from '../../../components/partner/PartnerLayout';
import Card from '../../../components/partner/Card';
import FilterModal from '../../../components/partner/FilterModal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../components/Calendar.module.css';

const BookingCard = ({ booking }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'refunded':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'fa-check-circle';
      case 'cancelled':
        return 'fa-times-circle';
      case 'refunded':
        return 'fa-undo';
      default:
        return 'fa-info-circle';
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="border-b pb-4 mb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">{booking.tourName}</h3>
            <p className="text-gray-600">{booking.date}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${getStatusColor(booking.status)}`}>
            <i className={`fas ${getStatusIcon(booking.status)}`}></i>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <img
            src={booking.customer.image}
            alt={booking.customer.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h4 className="font-semibold">{booking.customer.name}</h4>
            <p className="text-sm text-gray-600">{booking.customer.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium mb-1">Duration</p>
            <div className="flex items-center gap-2">
              <i className="far fa-clock"></i>
              <span>{booking.duration}</span>
            </div>
          </div>
          <div>
            <p className="font-medium mb-1">Travelers</p>
            <div className="flex items-center gap-2">
              <i className="fas fa-users"></i>
              <span>{booking.travelers}</span>
            </div>
          </div>
          <div>
            <p className="font-medium mb-1">Amount</p>
            <div className="flex items-center gap-2">
              <i className="fas fa-dollar-sign"></i>
              <span>LKR{booking.amount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="text-sm text-gray-600">
          Booking ID: {booking.id}
        </div>
        <button
          className="text-orange-500 hover:text-orange-600 font-medium"
          onClick={() => window.location.href = `/partner/bookings/details/${booking.id}`}
        >
          View Details
        </button>
      </div>
    </Card>
  );
};

const StatsCard = ({ icon, label, value, type }) => (
  <Card>
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
        type === "completed" ? "bg-green-100 text-green-500" :
        type === "cancelled" ? "bg-red-100 text-red-500" :
        type === "revenue" ? "bg-orange-100 text-orange-500" :
        "bg-purple-100 text-purple-500"
      }`}>
        <i className={`fas ${icon} text-xl`}></i>
      </div>
      <div>
        <h4 className="text-2xl font-bold">{value}</h4>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  </Card>
);

const BookingHistory = () => {
  const [viewType, setViewType] = useState('grid');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filters, setFilters] = useState({
    status: [],
    dateRange: 'all',
    priceRange: 'all'
  });

  const bookings = [
    {
      id: "BK-2024-001",
      tourName: "Sigiriya & Dambulla Cultural Tour",
      date: "December 15, 2024",
      customer: {
        name: "Nuwan Samarasinghe",
        email: "nuwan.s@email.lk",
        image: "https://randomuser.me/api/portraits/men/35.jpg"
      },
      duration: "3 days",
      travelers: 2,
      amount: 27000,
      status: "completed"
    },
    {
      id: "BK-2024-002",
      tourName: "Colombo City & Shopping Tour",
      date: "December 18, 2024",
      customer: {
        name: "Anjali Wijesinghe",
        email: "anjali.w@email.lk",
        image: "https://randomuser.me/api/portraits/women/38.jpg"
      },
      duration: "2 days",
      travelers: 4,
      amount: 18000,
      status: "cancelled"
    },
    {
      id: "BK-2024-003",
      tourName: "Ella & Udawalawe Safari",
      date: "December 20, 2024",
      customer: {
        name: "Pradeep Gunasekara",
        email: "pradeep.g@email.lk",
        image: "https://randomuser.me/api/portraits/men/42.jpg"
      },
      duration: "4 days",
      travelers: 3,
      amount: 48000,
      status: "completed"
    },
    {
      id: "BK-2024-004",
      tourName: "Mirissa Beach & Whale Watching",
      date: "December 22, 2024",
      customer: {
        name: "Sanduni Rajapaksha",
        email: "sanduni.r@email.lk",
        image: "https://randomuser.me/api/portraits/women/48.jpg"
      },
      duration: "2 days",
      travelers: 2,
      amount: 16000,
      status: "completed"
    },
    {
      id: "BK-2024-005",
      tourName: "Trincomalee Beach Tour",
      date: "December 25, 2024",
      customer: {
        name: "Lasith Malinga",
        email: "lasith.m@email.lk",
        image: "https://randomuser.me/api/portraits/men/55.jpg"
      },
      duration: "5 days",
      travelers: 5,
      amount: 75000,
      status: "refunded"
    }
  ];

  const stats = {
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    refunded: bookings.filter(b => b.status === 'refunded').length,
    totalRevenue: bookings
      .filter(b => b.status === 'completed')
      .reduce((sum, booking) => sum + booking.amount, 0)
  };

  const filteredBookings = bookings.filter(booking => {
    if (filters.status.length > 0 && !filters.status.includes(booking.status)) {
      return false;
    }

    if (filters.dateRange !== 'all') {
      const bookingDate = new Date(booking.date);
      const today = new Date();
      
      switch (filters.dateRange) {
        case 'last_week':
          const lastWeek = new Date(today);
          lastWeek.setDate(lastWeek.getDate() - 7);
          if (bookingDate < lastWeek) return false;
          break;
        case 'last_month':
          const lastMonth = new Date(today);
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          if (bookingDate < lastMonth) return false;
          break;
        case 'last_3_months':
          const last3Months = new Date(today);
          last3Months.setMonth(last3Months.getMonth() - 3);
          if (bookingDate < last3Months) return false;
          break;
      }
    }

    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'under_500':
          if (booking.amount >= 500) return false;
          break;
        case '500_1000':
          if (booking.amount < 500 || booking.amount > 1000) return false;
          break;
        case 'over_1000':
          if (booking.amount <= 1000) return false;
          break;
      }
    }

    return true;
  });

  return (
    <PartnerLayout>
      <div className="p-6 pt-0 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Booking History</h1>
          <p className="text-gray-600 mb-6">View and manage your past bookings and completed tours.</p>
        </div>
        <div className="flex justify-end items-center">
          <div className="flex gap-3">
            <button 
              className={`px-4 py-2 rounded-lg ${
                viewType === 'calendar' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-600 bg-white hover:bg-gray-50'
              }`}
              onClick={() => setViewType(viewType === 'calendar' ? 'grid' : 'calendar')}
            >
              <i className="far fa-calendar-alt mr-2"></i>
              {viewType === 'calendar' ? 'Grid View' : 'Calendar View'}
            </button>
            <button 
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              onClick={() => setShowFilterModal(true)}
            >
              <i className="fas fa-filter mr-2"></i>
              Filter Bookings
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <StatsCard 
            icon="fa-check-circle" 
            label="Completed Tours" 
            value={stats.completed}
            type="completed"
          />
          <StatsCard 
            icon="fa-times-circle" 
            label="Cancelled" 
            value={stats.cancelled}
            type="cancelled"
          />
          <StatsCard 
            icon="fa-undo" 
            label="Refunded" 
            value={stats.refunded}
            type="refunded"
          />
          <StatsCard 
            icon="fa-dollar-sign" 
            label="Total Revenue" 
            value={`LKR ${stats.totalRevenue.toLocaleString()}`}
            type="revenue"
          />
        </div>

        {/* Bookings View */}
        {viewType === 'grid' ? (
          <div className="grid grid-cols-2 gap-6">
            {filteredBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <Card>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={({ date }) => {
                const bookingsOnDate = filteredBookings.filter(booking => {
                  const bookingDate = new Date(booking.date);
                  return bookingDate.toDateString() === date.toDateString();
                });
                
                return bookingsOnDate.length > 0 ? (
                  <div className="absolute bottom-0 left-0 right-0 bg-orange-500 text-white text-xs p-1">
                    {bookingsOnDate.length} bookings
                  </div>
                ) : null;
              }}
              onClickDay={(value) => {
                const bookingsOnDate = filteredBookings.filter(booking => {
                  const bookingDate = new Date(booking.date);
                  return bookingDate.toDateString() === value.toDateString();
                });
                
                if (bookingsOnDate.length === 1) {
                  window.location.href = `/partner/booking-details/${bookingsOnDate[0].id}`;
                }
              }}
            />
          </Card>
        )}
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <FilterModal
          currentFilters={filters}
          onClose={() => setShowFilterModal(false)}
          onApply={setFilters}
        />
      )}
    </PartnerLayout>
  );
};

export default BookingHistory;
