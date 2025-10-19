import HotelSidebar from './HotelSidebar';
import Main from '../Main';

export default function HotelLayout({ children, activePage, pageTitle, pageSubtitle }) {
  return (
    <div className='flex'>
      <div className='sticky top-0 h-fit'>
        <HotelSidebar />
      </div>
      <div className='flex-1'>
        <Main hasNavbar={true}>
          {children}
        </Main>
      </div>
    </div>
  );
}
