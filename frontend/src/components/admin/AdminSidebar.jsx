import { Link } from 'react-router-dom';

export default function AdminSidebar({ activePage }) {
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Listings', path: '/admin/listings' },
    { name: 'Bookings', path: '/admin/bookings' },
    { name: 'Calendar', path: '/admin/calendar' },
    { name: 'Notifications', path: '/admin/notifications' },
    { name: 'Payments', path: '/admin/payments' },
    { name: 'Reviews', path: '/admin/reviews' },
    { name: 'Settings', path: '/admin/settings' },
    { name: 'Help Center', path: '/admin/help' }
  ];

  return (
    <aside className="w-1/5 bg-white rounded-xl shadow p-4 flex flex-col gap-4">
      <div className="font-bold text-xl text-brand-primary mb-4">Travel.lk</div>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`px-4 py-2 rounded text-left ${
              activePage === item.name.toLowerCase()
                ? 'bg-brand-primary text-white font-semibold'
                : 'text-content-primary hover:bg-brand-accent'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
