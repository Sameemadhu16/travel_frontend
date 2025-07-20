// import React from 'react';
import Main from '../../components/Main';
// import NavBar from './guideComponents/NavBar';
import TourRequestCard from './guideComponents/TourRequestCard';

const dummyRequests = [
  {
    name: 'Priya Sharma',
    joined: '2 years ago',
    destination: 'Nuwaraeliya',
    dates: 'Dec 15–22, 2024',
    duration: '7 Days',
    groupSize: '4 People',
    dailyRate: '4,500',
    totalEarnings: '31,500',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Raj Patel',
    joined: '1 year ago',
    destination: 'Trincomalee',
    dates: 'Jan 5–12, 2025',
    duration: '7 Days',
    groupSize: '2 People',
    dailyRate: '4,500',
    totalEarnings: '31,500',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Anita Gupta',
    joined: '3 years ago',
    destination: 'Jaffna',
    dates: 'Dec 20–25, 2024',
    duration: '5 Days',
    groupSize: '6 People',
    dailyRate: '4,500',
    totalEarnings: '22,500',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Vikram Singh',
    joined: '6 months ago',
    destination: 'Kandy',
    dates: 'Feb 10–20, 2025',
    duration: '10 Days',
    groupSize: '3 People',
    dailyRate: '4,500',
    totalEarnings: '45,000',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
];

const TourRequest = () => {
  return (
    <Main>
      <div className="">
        <h1 className="text-2xl font-bold mb-1">Tour Requests</h1>
        <p className="text-gray-600 mb-6">Manage your incoming tour requests and bookings</p>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <input type="text" placeholder="Search by traveler name..." className="col-span-1 md:col-span-2 border border-gray-300 px-3 py-2 rounded" />
          <input type="date" className="border border-gray-300 px-3 py-2 rounded" />
          <select className="border border-gray-300 px-3 py-2 rounded">
            <option>All Destinations</option>
          </select>
          <select className="border border-gray-300 px-3 py-2 rounded">
            <option>All Status</option>
          </select>
        </div>

        {/* Cards */}
        {dummyRequests.map((traveler, index) => (
          <TourRequestCard traveler={traveler} key={index} />
        ))}
      </div>
    </Main>
  );
};

export default TourRequest;
