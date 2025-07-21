export function DashboardCard({ icon, label, value, subValue, color }) {
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

export function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      {subtitle && <p className="text-content-secondary">{subtitle}</p>}
    </div>
  );
}

export function RoomStatusCard({ room }) {
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

export function BookingItem({ booking }) {
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

export function ScheduleItem({ icon: Icon, title, detail, time }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <Icon className="text-brand-primary" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-content-secondary">{detail} - {time}</p>
      </div>
    </div>
  );
}

export function CardContainer({ title, children, actionLabel, onAction }) {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="divide-y">
        {children}
      </div>
      {actionLabel && (
        <div className="p-4 border-t text-center">
          <button 
            onClick={onAction}
            className="text-brand-primary hover:underline"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
}

export function QuickAction({ icon: Icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="p-4 bg-white rounded-xl shadow text-center hover:bg-gray-50"
    >
      <Icon className="text-2xl text-brand-primary mx-auto mb-2" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
