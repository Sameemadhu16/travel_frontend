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

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/hotels-search" element={<Search />} />
            <Route path="/vehicle-search" element={<SearchVehicles />} />
            <Route path="/hotel/:id" element={<Hotel />} />

            {/* hotels*/}
            <Route path="/hotel-registration" element={<HotelRegistration />} />

            {/* rooms */}
            <Route path="/rooms-add" element={<RoomsAdd />} />

            {/* partner */}
            <Route path="/partner-details" element={<Details />} />

            {/* admin */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/bookings" element={<Bookings />} />
            <Route path="/admin/users" element={<Users />} />
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
