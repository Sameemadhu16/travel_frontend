import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ children, activePage }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activePage={activePage} />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
