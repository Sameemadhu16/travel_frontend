import React, { useState } from 'react';
import PartnerLayout from '../../../components/partner/PartnerLayout';

const ItineraryItem = ({ item }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-orange-100 text-orange-700';
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <h4 className="font-semibold">{item.title}</h4>
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
            {item.status}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          {item.time}
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <i className="far fa-clock"></i>
          <span>{item.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <i className="fas fa-map-marker-alt"></i>
          <span>{item.location}</span>
        </div>
        {item.status === 'upcoming' && (
          <button className="ml-auto text-orange-500 border border-orange-500 px-3 py-1 rounded-lg text-sm hover:bg-orange-50">
            Mark as Done
          </button>
        )}
      </div>
    </div>
  );
};

const ActiveTourDashboard = () => {
  const [currentTour] = useState({
    destination: "Santorini, Greece",
    totalDuration: "7 Days",
    travelers: "4 People",
    currentDay: 3,
    traveler: {
      name: "Sarah Johnson",
      image: "/src/assets/users/user1.jpg",
      role: "Group Leader"
    },
    itinerary: [
      {
        title: "Oia Village Walking Tour",
        time: "09:00 - 11:00",
        duration: "2 hours",
        location: "Oia Village",
        status: "completed"
      },
      {
        title: "Traditional Greek Lunch",
        time: "12:00 - 14:00",
        duration: "2 hours",
        location: "Ammoudi Bay",
        status: "in-progress"
      },
      {
        title: "Sunset Photography Session",
        time: "18:00 - 20:00",
        duration: "2 hours",
        location: "Imerovigli",
        status: "upcoming"
      },
      {
        title: "Dinner at Local Taverna",
        time: "21:00 - 23:00",
        duration: "2 hours",
        location: "Fira Town",
        status: "upcoming"
      }
    ]
  });

  return (
    <PartnerLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Active Tour Dashboard</h1>
            <p className="text-gray-600">Day {currentTour.currentDay} of 7</p>
          </div>
        </div>

        {/* Tour Info */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-orange-500 text-white p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Destination</h3>
            <p>{currentTour.destination}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">Total Duration</h3>
            <p className="text-gray-700">{currentTour.totalDuration}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">Travelers</h3>
            <p className="text-gray-700">{currentTour.travelers}</p>
          </div>
        </div>

        {/* Traveler Info */}
        <div className="bg-white p-6 rounded-lg border mb-8">
          <h3 className="font-semibold mb-4">Traveler</h3>
          <div className="flex items-center gap-3">
            <img 
              src={currentTour.traveler.image}
              alt={currentTour.traveler.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h4 className="font-semibold">{currentTour.traveler.name}</h4>
              <p className="text-sm text-gray-600">{currentTour.traveler.role}</p>
            </div>
          </div>
        </div>

        {/* Today's Itinerary */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Today's Itinerary - Day {currentTour.currentDay}</h3>
            <button className="text-orange-500 hover:text-orange-600">
              View Full Itinerary
            </button>
          </div>
          
          <div className="space-y-4">
            {currentTour.itinerary.map((item, index) => (
              <ItineraryItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
};

export default ActiveTourDashboard;
