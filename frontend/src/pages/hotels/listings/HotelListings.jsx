import { useState } from 'react';
import { FaBed, FaStar } from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';
import HotelCard from '../../../components/hotel/HotelCard';
import SearchFilters from '../../../components/hotel/SearchFilters';

export default function HotelListings() {
  // Sample data - Cinnamon Hotels Chain
  const hotels = [
    {
      name: "Cinnamon Grand Colombo",
      location: "Colombo 03, Sri Lanka",
      image: "/src/assets/hotels/cinnamon-grand.jpg",
      rating: 4.9,
      reviewCount: 425,
      startingPrice: "45,000",
      status: "Active",
      rooms: 483,
      occupancyRate: "85%"
    },
    {
      name: "Cinnamon Red Colombo",
      location: "Colombo 07, Sri Lanka",
      image: "/src/assets/hotels/cinnamon-red.jpg",
      rating: 4.8,
      reviewCount: 245,
      startingPrice: "25,000",
      status: "Active",
      rooms: 242,
      occupancyRate: "78%"
    },
    {
      name: "Cinnamon Lakeside Colombo",
      location: "Colombo 02, Sri Lanka",
      image: "/src/assets/hotels/cinnamon-lakeside.jpg",
      rating: 4.7,
      reviewCount: 312,
      startingPrice: "35,000",
      status: "Active",
      rooms: 346,
      occupancyRate: "82%"
    },
    {
      name: "Cinnamon Wild Yala",
      location: "Yala, Sri Lanka",
      image: "/src/assets/hotels/cinnamon-yala.jpg",
      rating: 4.6,
      reviewCount: 189,
      startingPrice: "55,000",
      status: "Active",
      rooms: 68,
      occupancyRate: "90%"
    },
    {
      name: "Cinnamon Bentota Beach",
      location: "Bentota, Sri Lanka",
      image: "/src/assets/hotels/cinnamon-bentota.jpg",
      rating: 4.8,
      reviewCount: 276,
      startingPrice: "42,000",
      status: "Active",
      rooms: 159,
      occupancyRate: "75%"
    },
    {
      name: "Trinco Blu by Cinnamon",
      location: "Trincomalee, Sri Lanka",
      image: "/src/assets/hotels/trinco.jpg",
      rating: 4.4,
      reviewCount: 167,
      startingPrice: "32,000",
      status: "Maintenance",
      rooms: 81,
      occupancyRate: "0%"
    }
  ];

  return (
    <HotelLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Cinnamon Hotels & Resorts</h1>
          <p className="text-content-secondary">Manage and monitor all Cinnamon properties across Sri Lanka</p>
        </div>

        {/* Search and Filters */}
        <SearchFilters />

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white">
                <FaBed />
              </div>
              <div>
                <h3 className="text-content-secondary">Total Properties</h3>
                <p className="text-2xl font-semibold">6</p>
                <p className="text-sm text-content-secondary">Cinnamon Hotels & Resorts</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                <FaBed />
              </div>
              <div>
                <h3 className="text-content-secondary">Total Rooms</h3>
                <p className="text-2xl font-semibold">1,379</p>
                <p className="text-sm text-content-secondary">Across all properties</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <FaBed />
              </div>
              <div>
                <h3 className="text-content-secondary">Average Occupancy</h3>
                <p className="text-2xl font-semibold">82%</p>
                <p className="text-sm text-content-secondary">Last 30 days</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                <FaStar />
              </div>
              <div>
                <h3 className="text-content-secondary">Average Rating</h3>
                <p className="text-2xl font-semibold">4.7</p>
                <p className="text-sm text-content-secondary">From 1,614 reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hotel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Previous</button>
            <button className="px-4 py-2 bg-brand-primary text-white rounded-lg">1</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">3</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Next</button>
          </nav>
        </div>
      </div>
    </HotelLayout>
  );
}
