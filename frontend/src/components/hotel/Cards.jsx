export function StatsCard({ icon: Icon, label, value, subValue, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white`}>
          <Icon className="text-xl" />
        </div>
        <div>
          <h3 className="text-gray-600 text-sm">{label}</h3>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
          {subValue && (
            <p className="text-sm text-gray-500 mt-1">{subValue}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function BookingCard({ booking }) {
  return (
    <div className="flex items-center gap-4 p-4 border-b last:border-0">
      <img 
        src={booking.userImage} 
        alt={booking.userName}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-grow">
        <h4 className="font-medium text-gray-800">{booking.userName}</h4>
        <p className="text-sm text-gray-500">
          {booking.roomType} · {booking.duration}
        </p>
      </div>
      <div className="text-right">
        <p className="font-medium text-gray-800">LKR {booking.amount}</p>
        <span className={`text-sm px-2 py-1 rounded ${
          booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
          booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {booking.status}
        </span>
      </div>
    </div>
  );
}

export function RoomCard({ room }) {
  const statusColors = {
    Available: 'bg-green-500',
    Occupied: 'bg-red-500',
    Maintenance: 'bg-yellow-500',
    'Needs Cleaning': 'bg-purple-500'
  };

  return (
    <div className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-800">Room {room.number}</h4>
        <div className={`w-3 h-3 rounded-full ${statusColors[room.status]}`} />
      </div>
      <p className="text-sm text-gray-500">{room.type}</p>
      <p className="text-sm text-gray-500">{room.status}</p>
      {room.guest && (
        <div className="mt-2 pt-2 border-t">
          <p className="text-sm text-gray-600">{room.guest}</p>
          <p className="text-xs text-gray-500">{room.checkOut}</p>
        </div>
      )}
    </div>
  );
}

export function ActionCard({ icon: Icon, title, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="p-4 bg-white rounded-xl shadow hover:shadow-md transition-shadow text-center w-full"
    >
      <div className="w-12 h-12 rounded-full bg-brand-primary bg-opacity-10 flex items-center justify-center mx-auto mb-3">
        <Icon className="text-xl text-brand-primary" />
      </div>
      <span className="text-sm font-medium text-gray-800">{title}</span>
    </button>
  );
}

export function ScheduleCard({ icon: Icon, title, time, description }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow">
      <div className="w-10 h-10 rounded-full bg-brand-primary bg-opacity-10 flex items-center justify-center">
        <Icon className="text-brand-primary" />
      </div>
      <div>
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}

export function ContentCard({ title, children, action }) {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {action}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
