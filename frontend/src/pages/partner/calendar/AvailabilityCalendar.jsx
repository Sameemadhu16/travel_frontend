import React, { useState } from 'react';
import PartnerLayout from '../../../components/partner/PartnerLayout';
import Card from '../../../components/partner/Card';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../components/Calendar.module.css';

const TimeSlot = ({ time, status, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'booked':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'blocked':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div 
      className={`p-3 rounded-lg border ${getStatusColor(status)} cursor-pointer hover:opacity-80`}
      onClick={onClick}
    >
      <div className="text-sm font-medium">{time}</div>
      <div className="text-xs capitalize">{status}</div>
    </div>
  );
};

const AddTourSlotModal = ({ onClose }) => {
  const [tourData, setTourData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    duration: '',
    maxTravelers: '',
    price: '',
    frequency: 'once', // once, daily, weekly
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the tour slot
    console.log('New tour slot:', tourData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Add New Tour Slot</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tour Title
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={tourData.title}
              onChange={(e) => setTourData({ ...tourData, title: e.target.value })}
              placeholder="Enter tour title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                className="w-full p-2 border rounded-lg"
                value={tourData.startTime}
                onChange={(e) => setTourData({ ...tourData, startTime: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                className="w-full p-2 border rounded-lg"
                value={tourData.endTime}
                onChange={(e) => setTourData({ ...tourData, endTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (hours)
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                value={tourData.duration}
                onChange={(e) => setTourData({ ...tourData, duration: e.target.value })}
                placeholder="2.5"
                min="0.5"
                step="0.5"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Travelers
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                value={tourData.maxTravelers}
                onChange={(e) => setTourData({ ...tourData, maxTravelers: e.target.value })}
                placeholder="10"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per Person ($)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg"
              value={tourData.price}
              onChange={(e) => setTourData({ ...tourData, price: e.target.value })}
              placeholder="99.99"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <select
              className="w-full p-2 border rounded-lg"
              value={tourData.frequency}
              onChange={(e) => setTourData({ ...tourData, frequency: e.target.value })}
              required
            >
              <option value="once">One-time slot</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              className="w-full p-2 border rounded-lg"
              value={tourData.notes}
              onChange={(e) => setTourData({ ...tourData, notes: e.target.value })}
              rows="3"
              placeholder="Any special instructions or details..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Add Tour Slot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AvailabilityCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showAddTourModal, setShowAddTourModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Sample data - Replace with your API data
  const availability = {
    stats: {
      totalBookings: 45,
      availableSlots: 128,
      blockedDates: 12,
      upcomingTours: 8
    },
    timeSlots: [
      { time: '09:00 AM - 11:00 AM', status: 'available' },
      { time: '11:30 AM - 01:30 PM', status: 'booked' },
      { time: '02:00 PM - 04:00 PM', status: 'blocked' },
      { time: '04:30 PM - 06:30 PM', status: 'available' },
      { time: '07:00 PM - 09:00 PM', status: 'available' }
    ]
  };

  const handleTimeSlotClick = (slot) => {
    setSelectedTimeSlot(slot);
    setShowBlockModal(true);
  };

  const BlockTimeModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <h3 className="text-lg font-semibold mb-4">
          {selectedTimeSlot.status === 'blocked' ? 'Unblock Time Slot' : 'Block Time Slot'}
        </h3>
        <p className="text-gray-600 mb-4">
          {selectedTimeSlot.time} on {selectedDate.toLocaleDateString()}
        </p>
        <div className="space-y-4">
          {selectedTimeSlot.status !== 'blocked' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for blocking
                </label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Maintenance</option>
                  <option>Personal Leave</option>
                  <option>Technical Issues</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <textarea 
                  className="w-full p-2 border rounded-lg"
                  rows="3"
                  placeholder="Add any additional notes..."
                />
              </div>
            </>
          )}
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              onClick={onClose}
            >
              {selectedTimeSlot.status === 'blocked' ? 'Unblock Time' : 'Block Time'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const StatsCard = ({ icon, label, value, type }) => (
    <Card>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          type === "bookings" ? "bg-orange-100 text-orange-500" :
          type === "available" ? "bg-green-100 text-green-500" :
          type === "blocked" ? "bg-red-100 text-red-500" :
          "bg-orange-100 text-orange-500"
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

  return (
    <PartnerLayout>
      <div className="p-6 pt-0 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Availability Calendar</h1>
          <p className="text-gray-600 mb-6">Manage your tour schedule and vehicle availability.</p>
        </div>
        <div className="flex justify-end items-center">
          <div className="flex gap-3">
            <button 
              className="px-4 py-2 border text-gray-600 rounded-lg hover:bg-gray-50"
            >
              <i className="far fa-clock mr-2"></i>
              Set Regular Hours
            </button>
            <button 
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              onClick={() => setShowAddTourModal(true)}
            >
              <i className="fas fa-plus mr-2"></i>
              Add Tour Slot
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <StatsCard 
            icon="fa-calendar-check" 
            label="Total Bookings" 
            value={availability.stats.totalBookings}
            type="bookings"
          />
          <StatsCard 
            icon="fa-clock" 
            label="Available Slots" 
            value={availability.stats.availableSlots}
            type="available"
          />
          <StatsCard 
            icon="fa-calendar-times" 
            label="Blocked Dates" 
            value={availability.stats.blockedDates}
            type="blocked"
          />
          <StatsCard 
            icon="fa-route" 
            label="Upcoming Tours" 
            value={availability.stats.upcomingTours}
            type="upcoming"
          />
        </div>

        {/* Calendar Section */}
        <div className="grid grid-cols-3 gap-6">
          <Card className="col-span-1">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="w-full"
              tileContent={({ date }) => {
                // Sample data - Replace with actual availability data
                const hasBooking = date.getDate() % 3 === 0;
                const isBlocked = date.getDate() % 7 === 0;
                
                return hasBooking || isBlocked ? (
                  <div className="absolute bottom-0 left-0 right-0 text-xs p-1 text-center">
                    <div className={`w-2 h-2 rounded-full mx-auto ${
                      isBlocked ? 'bg-red-500' : 'bg-orange-500'
                    }`} />
                  </div>
                ) : null;
              }}
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Has Bookings</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Blocked</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Available</span>
              </div>
            </div>
          </Card>

          <Card className="col-span-2">
            <h3 className="font-semibold mb-4">
              Available Time Slots - {selectedDate.toLocaleDateString()}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {availability.timeSlots.map((slot, index) => (
                <TimeSlot
                  key={index}
                  time={slot.time}
                  status={slot.status}
                  onClick={() => handleTimeSlotClick(slot)}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Block Time Modal */}
      {showBlockModal && selectedTimeSlot && (
        <BlockTimeModal onClose={() => setShowBlockModal(false)} />
      )}

      {/* Add Tour Slot Modal */}
      {showAddTourModal && (
        <AddTourSlotModal onClose={() => setShowAddTourModal(false)} />
      )}
    </PartnerLayout>
  );
};

export default AvailabilityCalendar;
