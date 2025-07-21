import { useState } from 'react';
import { 
  FaChevronLeft, 
  FaChevronRight
} from 'react-icons/fa';
import HotelLayout from '../../../components/hotel/HotelLayout';

const roomTypes = [
  { id: 1, name: 'Deluxe Room', totalRooms: 10 },
  { id: 2, name: 'Executive Suite', totalRooms: 5 },
  { id: 3, name: 'Standard Room', totalRooms: 15 },
  { id: 4, name: 'Premium Suite', totalRooms: 3 },
];

// Sample booking data
const bookings = [
  {
    id: 1,
    roomType: 'Deluxe Room',
    startDate: '2025-07-20',
    endDate: '2025-07-23',
    guestName: 'John Smith',
    roomCount: 2
  },
  {
    id: 2,
    roomType: 'Executive Suite',
    startDate: '2025-07-21',
    endDate: '2025-07-24',
    guestName: 'Sarah Wilson',
    roomCount: 1
  }
];

// Removed duplicate CalendarControlsSection - using the one defined below

function RoomTypeRow({ roomType, currentDate, bookings }) {
  // Generate days in the current month
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Get bookings for this room type
  const roomBookings = bookings.filter(b => b.roomType === roomType.name);

  // Create a map of dates to booked room counts
  const bookedRooms = {};
  roomBookings.forEach(booking => {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      const dateStr = date.toISOString().split('T')[0];
      bookedRooms[dateStr] = (bookedRooms[dateStr] || 0) + booking.roomCount;
    }
  });

  return (
    <div className="flex">
      {/* Room type info */}
      <div className="w-48 p-4 border-r bg-gray-50 flex flex-col justify-center">
        <h3 className="font-medium">{roomType.name}</h3>
        <p className="text-sm text-gray-500">{roomType.totalRooms} rooms</p>
      </div>
      
      {/* Calendar cells */}
      <div className="flex-1 flex">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            i + 1
          );
          const dateStr = date.toISOString().split('T')[0];
          const booked = bookedRooms[dateStr] || 0;
          const available = roomType.totalRooms - booked;
          
          // Determine cell color based on availability
          let bgColor = 'bg-green-100';
          if (available === 0) bgColor = 'bg-red-100';
          else if (available <= roomType.totalRooms * 0.3) bgColor = 'bg-yellow-100';

          return (
            <div
              key={i}
              className={`w-12 h-16 border-r border-b flex flex-col items-center justify-center ${bgColor}`}
            >
              <span className="text-sm font-medium">{i + 1}</span>
              <span className="text-xs text-gray-600">{available}/{roomType.totalRooms}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendarControlsSection({ currentDate, onPrevMonth, onNextMonth, selectedBranch, onBranchChange, branches }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={selectedBranch}
            onChange={(e) => onBranchChange(e.target.value)}
            className="p-2 border rounded-lg w-64"
          >
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <FaChevronLeft className="text-gray-600" />
            </button>
            <span className="text-lg font-medium">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={onNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <FaChevronRight className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HotelCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const branches = [
    "Cinnamon Grand Colombo",
    "Cinnamon Red Colombo",
    "Cinnamon Lakeside",
    "Cinnamon Wild Yala",
    "Cinnamon Bentota Beach",
    "Trinco Blu by Cinnamon"
  ];
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Get days of the week
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <HotelLayout
      activePage="calendar"
      pageTitle="Room Calendar"
      pageSubtitle="Manage room availability and bookings"
    >
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Room Calendar</h1>
          <p className="text-gray-600">Manage room availability and bookings</p>
        </div>

        <CalendarControlsSection
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          selectedBranch={selectedBranch}
          onBranchChange={setSelectedBranch}
          branches={branches}
        />

        {/* Calendar Grid */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {/* Days header */}
          <div className="flex border-b">
            <div className="w-48 p-4 border-r bg-gray-50">
              <h3 className="font-medium">Room Type</h3>
            </div>
            <div className="flex-1 flex">
              {weekDays.map((day, index) => (
                <div key={index} className="w-12 p-2 text-center border-r">
                  <span className="text-sm font-medium">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room type rows */}
          {roomTypes.map(roomType => (
            <RoomTypeRow
              key={roomType.id}
              roomType={roomType}
              currentDate={currentDate}
              bookings={bookings}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-xl shadow p-4">
          <h3 className="font-medium mb-3">Availability Legend</h3>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 rounded"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-100 rounded"></div>
              <span className="text-sm">Limited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 rounded"></div>
              <span className="text-sm">Fully Booked</span>
            </div>
          </div>
        </div>
      </div>
    </HotelLayout>
  );
}
