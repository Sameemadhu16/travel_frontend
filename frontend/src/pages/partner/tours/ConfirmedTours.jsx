import React, { useState } from 'react';
import PartnerLayout from '../../../components/partner/PartnerLayout';
import TourDetailsModal from '../../../components/partner/TourDetailsModal';
import FilterModal from '../../../components/partner/FilterModal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../components/Calendar.module.css';

// Sample data - Replace with your API data later
const confirmedTours = [
  {
    id: 1,
    tourName: "Swiss Alps Adventure",
    customer: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      image: "/src/assets/users/user1.jpg"
    },
    date: "March 18, 2024 - 2:00 PM",
    travelers: 2,
    duration: "3 days",
    vehicle: "Toyota Prius 2023",
    status: "confirmed"
  },
  {
    id: 2,
    tourName: "Bali Cultural Tour",
    customer: {
      name: "Mike Chen",
      phone: "+1 (555) 987-6543",
      image: "/src/assets/users/user2.avif"
    },
    date: "March 18, 2024 - 2:00 PM",
    travelers: 2,
    duration: "3 days",
    vehicle: "Toyota Prius 2023",
    status: "starting_today"
  },
  {
    id: 3,
    tourName: "Rome Historical Walk",
    customer: {
      name: "Emma Rodriguez",
      phone: "+1 (555) 456-7890",
      image: "/src/assets/users/user3.avif"
    },
    date: "March 20, 2024 - 6:00 PM",
    travelers: 4,
    duration: "2 days",
    vehicle: "Toyota Prius 2023",
    status: "this_week"
  }
];

import { useNavigate } from 'react-router-dom';

const TourCard = ({ tour, onStartTour, onViewItinerary, onCall }) => {
  const navigate = useNavigate();
  const getIconByTourName = (name) => {
    switch (name) {
      case "Swiss Alps Adventure":
        return "🏔️";
      case "Bali Cultural Tour":
        return "🏃";
      case "Rome Historical Walk":
        return "🏛️";
      default:
        return "🗺️";
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
      <div className={`p-6 ${
        tour.tourName === "Swiss Alps Adventure" ? "bg-orange-500" :
        tour.tourName === "Bali Cultural Tour" ? "bg-orange-500" :
        "bg-orange-500"
      } text-white`}>
        <div className="text-3xl mb-2">{getIconByTourName(tour.tourName)}</div>
        <h3 className="text-xl font-semibold">{tour.tourName}</h3>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={tour.customer.image} 
            alt={tour.customer.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h4 className="font-semibold">{tour.customer.name}</h4>
            <p className="text-sm text-gray-600">{tour.customer.phone}</p>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <i className="fas fa-calendar"></i>
            <span>{tour.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <i className="fas fa-users"></i>
            <span>{tour.travelers} Travelers</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <i className="fas fa-clock"></i>
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <i className="fas fa-car"></i>
            <span>{tour.vehicle}</span>
          </div>
        </div>

        <div className="flex justify-between gap-3">
          {tour.status === 'starting_today' ? (
            <button
              onClick={() => navigate(`/partner/tours/active/${tour.id}`)}
              className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
            >
              Start Tour
            </button>
          ) : (
            <button
              onClick={() => navigate(`/partner/tours/active/${tour.id}`)}
              className="flex-1 text-orange-500 border border-orange-500 py-2 px-4 rounded-lg hover:bg-orange-50"
            >
              View Tour Dashboard
            </button>
          )}
          <button
            onClick={() => onCall(tour)}
            className="w-12 h-10 flex items-center justify-center text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50"
          >
            <i className="fas fa-phone"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded-lg flex items-center gap-4 shadow-sm">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
      label === "Confirmed Tours" ? "bg-orange-100 text-orange-500" :
      label === "Starting Today" ? "bg-green-100 text-green-500" :
      label === "This Week" ? "bg-blue-100 text-blue-500" :
      "bg-purple-100 text-purple-500"
    }`}>
      <i className={`fas ${icon} text-xl`}></i>
    </div>
    <div>
      <h4 className="text-2xl font-bold">{value}</h4>
      <p className="text-gray-600">{label}</p>
    </div>
  </div>
);

const ConfirmedTours = () => {
  const [viewType, setViewType] = useState('grid');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filters, setFilters] = useState({
    status: [],
    dateRange: 'all',
    groupSize: 'all',
    duration: 'all'
  });

  const handleStartTour = (tour) => {
    setSelectedTour(tour);
    // Add your tour start logic here
    console.log('Starting tour:', tour);
  };

  const handleViewItinerary = (tour) => {
    setSelectedTour(tour);
    setShowDetailsModal(true);
  };

  const handleCall = (tour) => {
    window.location.href = `tel:${tour.customer.phone}`;
  };

  const stats = {
    confirmedTours: confirmedTours.filter(t => t.status === 'confirmed').length,
    startingToday: confirmedTours.filter(t => t.status === 'starting_today').length,
    thisWeek: confirmedTours.filter(t => t.status === 'this_week').length,
    totalRevenue: 24500
  };

  // Apply filters to tours

  // Apply filters to tours
  const filteredTours = confirmedTours.filter(tour => {
    // Filter by status
    if (filters.status.length > 0 && !filters.status.includes(tour.status)) {
      return false;
    }
    
    // Filter by date range
    if (filters.dateRange !== 'all') {
      const tourDate = new Date(tour.date.split(' - ')[0]);
      const today = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          if (tourDate.toDateString() !== today.toDateString()) return false;
          break;
        case 'tomorrow':
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          if (tourDate.toDateString() !== tomorrow.toDateString()) return false;
          break;
        case 'this_week':
          const thisWeek = new Date(today);
          thisWeek.setDate(thisWeek.getDate() + 7);
          if (tourDate > thisWeek) return false;
          break;
        case 'next_week':
          const nextWeekStart = new Date(today);
          nextWeekStart.setDate(nextWeekStart.getDate() + 7);
          const nextWeekEnd = new Date(today);
          nextWeekEnd.setDate(nextWeekEnd.getDate() + 14);
          if (tourDate < nextWeekStart || tourDate > nextWeekEnd) return false;
          break;
      }
    }

    // Filter by group size
    if (filters.groupSize !== 'all') {
      const size = tour.travelers;
      switch (filters.groupSize) {
        case '1-2':
          if (size < 1 || size > 2) return false;
          break;
        case '3-5':
          if (size < 3 || size > 5) return false;
          break;
        case '6+':
          if (size < 6) return false;
          break;
      }
    }

    // Filter by duration
    if (filters.duration !== 'all') {
      const duration = parseInt(tour.duration);
      switch (filters.duration) {
        case '1':
          if (duration !== 1) return false;
          break;
        case '2-3':
          if (duration < 2 || duration > 3) return false;
          break;
        case '4+':
          if (duration < 4) return false;
          break;
      }
    }
    return true;
  });

  return (
    <PartnerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Confirmed Tours</h1>
            <p className="text-gray-600">Ready-to-go tours with confirmed payments</p>
          </div>
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
              Filter Tours
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <StatsCard 
            icon="fa-check-circle" 
            label="Confirmed Tours" 
            value={stats.confirmedTours} 
          />
          <StatsCard 
            icon="fa-play-circle" 
            label="Starting Today" 
            value={stats.startingToday} 
          />
          <StatsCard 
            icon="fa-calendar-week" 
            label="This Week" 
            value={stats.thisWeek} 
          />
          <StatsCard 
            icon="fa-dollar-sign" 
            label="Total Revenue" 
            value={`$${stats.totalRevenue.toLocaleString()}`} 
          />
        </div>

        {/* Tours View (Grid or Calendar) */}
        {viewType === 'grid' ? (
          <div className="grid grid-cols-3 gap-6">
            {filteredTours.map(tour => (
              <TourCard
                key={tour.id}
                tour={tour}
                onStartTour={handleStartTour}
                onViewItinerary={handleViewItinerary}
                onCall={handleCall}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={({ date }) => {
                const toursOnDate = filteredTours.filter(tour => {
                  const tourDate = new Date(tour.date.split(' - ')[0]);
                  return tourDate.toDateString() === date.toDateString();
                });
                
                return toursOnDate.length > 0 ? (
                  <div className="absolute bottom-0 left-0 right-0 bg-orange-500 text-white text-xs p-1">
                    {toursOnDate.length} tours
                  </div>
                ) : null;
              }}
              onClickDay={(value) => {
                const toursOnDate = filteredTours.filter(tour => {
                  const tourDate = new Date(tour.date.split(' - ')[0]);
                  return tourDate.toDateString() === value.toDateString();
                });
                
                if (toursOnDate.length === 1) {
                  setSelectedTour(toursOnDate[0]);
                  setShowDetailsModal(true);
                }
                // Could add a list view modal for multiple tours on same date
              }}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      {showFilterModal && (
        <FilterModal
          currentFilters={filters}
          onClose={() => setShowFilterModal(false)}
          onApply={setFilters}
        />
      )}

      {showDetailsModal && selectedTour && (
        <TourDetailsModal
          tour={selectedTour}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedTour(null);
          }}
        />
      )}
    </PartnerLayout>
  );
};

export default ConfirmedTours;
