import HotelSidebar from './HotelSidebar';
import HotelHeader from './HotelHeader';

export default function HotelLayout({ children, activePage, pageTitle, pageSubtitle }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <HotelSidebar activePage={activePage} />
      
      <div className="flex-1">
        <HotelHeader title={pageTitle} subtitle={pageSubtitle} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
