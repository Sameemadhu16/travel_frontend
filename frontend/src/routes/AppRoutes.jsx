import { Route, Routes } from 'react-router-dom'
import Welcome from '../pages/Welcome'
import Search from '../pages/hotels/search/Search'
import Hotel from '../pages/hotels/Details/Hotel'
import HotelRegistration from '../pages/hotels/auth/HotelRegistration'
import RoomsAdd from '../pages/hotels/Rooms/RoomsAdd'
import Home from '../pages/home/Home'
import Details from '../pages/partner/details/Details'
import SearchVehicles from '../pages/vehicles/search/SearchVehicles'
import AdminDashboard from '../pages/admin/Dashboard'
import Users from '../pages/admin/Users'
import Listings from '../pages/admin/Listings'
import Reviews from '../pages/admin/Reviews'
import Reports from '../pages/admin/Reports'
import Notifications from '../pages/admin/Notifications'
import Payments from '../pages/admin/Payments'
import Bookings from '../pages/admin/Bookings'
import AdminSettings from '../pages/admin/Settings'
import Vehicles from '../pages/partner/vehicles/Vehicles'
import AddVehicle from '../pages/partner/vehicles/AddVehicle'
import BookingRequests from '../pages/partner/bookings/BookingRequests'
import ActiveBookings from '../pages/partner/bookings/ActiveBookings'
import BookingHistory from '../pages/partner/bookings/BookingHistory'
import BookingDetails from '../pages/partner/bookings/BookingDetails'
import ConfirmedTours from '../pages/partner/tours/ConfirmedTours'
import ActiveTourDashboard from '../pages/partner/tours/ActiveTourDashboard'
import AvailabilityCalendar from '../pages/partner/calendar/AvailabilityCalendar'
import Messages from '../pages/partner/messages/Messages'
import SpecialInquiries from '../pages/partner/inquiries/SpecialInquiries'
import PartnerReviews from '../pages/partner/reviews/Reviews'
import EarningsAndPayments from '../pages/partner/earnings/EarningsAndPayments'
import Analytics from '../pages/partner/analytics/Analytics'
import TripPlanner from '../pages/partner/trips/TripPlanner'
import Settings from '../pages/partner/settings/Settings'
import HelpCenter from '../pages/partner/help/HelpCenter'
import Dashboard from '../pages/partner/dashboard/Dashboard'
import HotelDashboard from '../pages/hotels/dashboard/Dashboard'
import HotelListings from '../pages/hotels/listings/HotelListings'
import HotelDetails from '../pages/hotels/details/HotelDetails'
import RoomTypes from '../pages/hotels/rooms/RoomTypes'
import BookingsPage from '../pages/hotels/bookings/BookingsPage'
import HotelReviews from '../pages/hotels/reviews/HotelReviews'
import HotelReports from '../pages/hotels/reports/HotelReports'
import HotelSettings from '../pages/hotels/settings/HotelSettings'
import HotelCalendar from '../pages/hotels/calendar/HotelCalendar'
import PaymentsPage from '../pages/hotels/payments/PaymentsPage'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/hotels-search" element={<Search />} />
            <Route path="/vehicle-search" element={<SearchVehicles />} />
            <Route path="/hotel/:id" element={<Hotel />} />

            {/* Admin Routes */}
            <Route path="/admin">
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="admin-listings" element={<Listings />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="reports" element={<Reports />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="payments" element={<Payments />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Hotel Management Routes */}
            <Route path="/hotel-registration" element={<HotelRegistration />} />
            <Route path="/hotel">
              <Route path="dashboard" element={<HotelDashboard />} />
              <Route path="listings" element={<HotelListings />} />
              <Route path="rooms" element={<RoomTypes />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="calendar" element={<HotelCalendar />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="reviews" element={<HotelReviews />} />
              <Route path="reports" element={<HotelReports />} />
              <Route path="settings" element={<HotelSettings />} />
              <Route path="branch/:id" element={<HotelDetails />} />
            </Route>

            {/* partner */}
            <Route path="/partner-details" element={<Details />} />
            <Route path="/admin/listings" element={<Listings />} />
            <Route path="/admin/reviews" element={<Reviews />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/notifications" element={<Notifications />} />
            <Route path="/admin/payments" element={<Payments />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            {/* Partner Routes */}
            <Route path="/partner/vehicles" element={<Vehicles />} />
            <Route path="/partner/vehicles/add" element={<AddVehicle />} />
            <Route path="/partner/bookings/active" element={<ActiveBookings />} />
            <Route path="/partner/bookings/history" element={<BookingHistory />} />
            <Route path="/partner/bookings/details/:id" element={<BookingDetails />} />
            <Route path="/partner/calendar" element={<AvailabilityCalendar />} />
            <Route path="/partner/messages" element={<Messages />} />
            <Route path="/partner/inquiries" element={<SpecialInquiries />} />
            <Route path="/partner/reviews" element={<PartnerReviews />} />
            <Route path="/partner/dashboard" element={<Dashboard />} />
            <Route path="/partner/tours/confirmed" element={<ConfirmedTours />} />
            <Route path="/partner/tours/active/:id" element={<ActiveTourDashboard />} />
            <Route path="/partner/booking-requests" element={<BookingRequests />} />
            <Route path="/partner/earnings" element={<EarningsAndPayments />} />
            <Route path="/partner/analytics" element={<Analytics />} />
            <Route path="/partner/trip-planner" element={<TripPlanner />} />
            <Route path="/partner/settings" element={<Settings />} />
            <Route path="/partner/help" element={<HelpCenter />} />
        </Routes>
    )
}
