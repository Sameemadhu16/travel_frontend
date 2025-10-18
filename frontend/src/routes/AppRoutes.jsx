import { Route, Routes, Navigate } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Search from '../pages/hotels/search/Search';
import Hotel from '../pages/hotels/Details/Hotel';
import HotelRegistration from '../pages/hotels/auth/HotelRegistration';
import RoomsAdd from '../pages/hotels/Rooms/RoomsAdd';
import Home from '../pages/home/Home';
import Details from '../pages/partner/details/Details';
import SearchVehicles from '../pages/vehicles/search/SearchVehicles';
import PartnerRegisterStep1 from '../pages/partner/register/PartnerRegisterStep1';
import PartnerRegisterStep2 from '../pages/partner/register/PartnerRegisterStep2';
import PartnerLoginStep1 from '../pages/partner/login/PartnerLoginStep1';
import PartnerLoginStep2 from '../pages/partner/login/PartnerLoginStep2';
import ForgotDetailsStep1 from '../pages/partner/forgot_details/ForgotDetailsStep1';
import ForgotPassword from '../pages/partner/forgot_details/ForgotPassword';
import ForgotUsername from '../pages/partner/forgot_details/ForgotUsername';
import ChangePassword from '../pages/partner/forgot_details/ChangePassword';
import { FormProvider } from '../context/FormContext';
import { initialAiTripData, initialTripFormData, loginPartnerAccountForm, registerPartnerAccountForm } from '../context/InitialValues';
import ChatBot from '../pages/chatBot/ChatBot';
import TravelerRegister from '../pages/TravelerRegister';
import ChooseProperty from '../pages/partner/register/ChooseProperty';
import { useSelector } from 'react-redux';
import { checkTokenExpiration } from '../core/authChecker';
import Vehicle from '../pages/vehicles/Details/vehicle';
import VehicleRegistration from '../pages/vehicles/auth/VehicleRegistration';
import VehicleAgencyRegistration from '../pages/vehicles/auth/VehicleAgencyRegistration';
import CreateTour from '../pages/tour/createTour';
import SelectGuide from '../pages/tour/selectGuide';
import TourRequest from '../pages/guide/TourRequest';
import AcceptedTours from '../pages/guide/AcceptedTours';
import ConfirmedTours from '../pages/guide/ConfirmedTours';
import ActiveTour from '../pages/guide/ActiveTour';
import GuideProfile from '../pages/guide/GuideProfile';
import GuideComplaints from '../pages/guide/GuideComplaints';
import CompleteRequest from '../pages/tour/completeRequest';
import RequestSent from '../pages/tour/requestSent';
import Payment from '../pages/tour/payment';
import DestinationPage from '../pages/destinations/DestinationPage';
import GuideNotifications from '../pages/guide/Notifications';
import GuideReviews from '../pages/guide/Reviews';
import GuideAvailability from '../pages/guide/GuideAvailability';
import GuideDashboard from '../pages/guide/GuideDashboard';
import GuideTourHistory from '../pages/guide/TourHistory';


// Booking pages
import GuideBooking from '../pages/bookings/GuideBooking';
import HotelBooking from '../pages/bookings/HotelBooking';
import VehicleBooking from '../pages/bookings/VehicleBooking';
import VehicleDeal from '../pages/bookings/VehicleDeal';
import VehicleProtection from '../pages/bookings/VehicleProtection';
import VehicleCheckout from '../pages/bookings/VehicleCheckout';
import VehicleBookingConfirmation from '../pages/bookings/VehicleBookingConfirmation';


// Admin imports
import AdminDashboard from '../pages/admin/Dashboard';
import Users from '../pages/admin/Users';
import Listings from '../pages/admin/Listings';
import Reviews from '../pages/admin/Reviews';
import Reports from '../pages/admin/Reports';
import Notifications from '../pages/admin/Notifications';
import Payments from '../pages/admin/Payments';
import Bookings from '../pages/admin/Bookings';
import AdminSettings from '../pages/admin/Settings';

// Guide Registration imports
import GuideRegister from '../pages/guide/auth/guideRegister';
import GuidePending from '../pages/guide/auth/GuidePending';
import AdminGuideReview from '../pages/admin/GuideReview';
import AdminHotelReview from '../pages/admin/HotelReview';
import AdminVehicleAgencyReview from '../pages/admin/VehicleAgencyReview';
import VehicleAgencyPending from '../pages/vehicles/auth/VehicleAgencyPending';
import HotelPending from '../pages/hotels/auth/HotelPending';

// Partner Dashboard imports
import Vehicles from '../pages/partner/vehicles/Vehicles';
import AddVehicle from '../pages/partner/vehicles/AddVehicle';
import BookingRequests from '../pages/partner/bookings/BookingRequests';
import ActiveBookings from '../pages/partner/bookings/ActiveBookings';
import BookingHistory from '../pages/partner/bookings/BookingHistory';
import BookingDetails from '../pages/partner/bookings/BookingDetails';
import PartnerConfirmedTours from '../pages/partner/tours/ConfirmedTours';
import ActiveTourDashboard from '../pages/partner/tours/ActiveTourDashboard';
import AvailabilityCalendar from '../pages/partner/calendar/AvailabilityCalendar';
import Messages from '../pages/partner/messages/Messages';
import SpecialInquiries from '../pages/partner/inquiries/SpecialInquiries';
import PartnerReviews from '../pages/partner/reviews/Reviews';
import EarningsAndPayments from '../pages/partner/earnings/EarningsAndPayments';
import Analytics from '../pages/partner/analytics/Analytics';
import TripPlanner from '../pages/partner/trips/TripPlanner';
import Settings from '../pages/partner/settings/Settings';
import HelpCenter from '../pages/partner/help/HelpCenter';
import Dashboard from '../pages/partner/dashboard/Dashboard';

// Hotel Dashboard imports
import HotelDashboard from '../pages/hotels/dashboard/Dashboard';
import HotelListings from '../pages/hotels/listings/HotelListings';
import HotelDetails from '../pages/hotels/details/HotelDetails';
import RoomTypes from '../pages/hotels/rooms/RoomTypes';
import BookingsPage from '../pages/hotels/bookings/BookingsPage';
import HotelReviews from '../pages/hotels/reviews/HotelReviews';
import HotelReports from '../pages/hotels/reports/HotelReports';
import HotelSettings from '../pages/hotels/settings/HotelSettings';
import HotelCalendar from '../pages/hotels/calendar/HotelCalendar';
import PaymentsPage from '../pages/hotels/payments/PaymentsPage';
import BasicInfoStep from '../pages/AI-Trip-Create/BasicInfoStep';
import PreferenceInfoStep from '../pages/AI-Trip-Create/PreferenceInfoStep';
import AIGenerationStep from '../pages/AI-Trip-Create/AIGenerationStep';
// import { Users } from 'lucide-react';

export default function AppRoutes() {
    const { token } = useSelector((state) => state.auth);
    const isExpired = checkTokenExpiration(token);
    const isAuthenticated = token && !isExpired;

    return (
        <Routes>
            {/* Public routes available to all users */}
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/traveler-register' element={<TravelerRegister />} />
            <Route path="/destination/:id" element={<DestinationPage />} />

            {/* Independent Booking Pages */}
            <Route path='/bookings/guides' element={<GuideBooking />} />
            <Route path='/bookings/hotels' element={<HotelBooking />} />
            <Route path='/bookings/vehicles' element={<VehicleBooking />} />
            <Route path='/bookings/vehicle/:id/deal' element={<VehicleDeal />} />
            <Route path='/bookings/vehicle/:id/protection' element={<VehicleProtection />} />
            <Route path='/bookings/vehicle/:id/checkout' element={<VehicleCheckout />} />
            <Route path='/bookings/vehicle/:id/confirmation' element={<VehicleBookingConfirmation />} />

            {/* Partner login routes */}
            <Route
                path="/partner-login/*"
                element={
                    <FormProvider initialValues={loginPartnerAccountForm.formData}>
                        <Routes>
                            <Route index element={<Navigate to="step-1" replace />} />
                            <Route path='step-1' element={<PartnerLoginStep1 />} />
                            <Route path='step-2' element={<PartnerLoginStep2 />} />
                        </Routes>
                    </FormProvider>
                }
            />
            {/* Hotel and Vehicle search routes with FormProvider */}
            <Route path='/hotels-search' element={
                <FormProvider initialValues={initialTripFormData.formData}>
                    <Search />
                </FormProvider>
            } />
            <Route path='/vehicle-search' element={
                <FormProvider initialValues={initialTripFormData.formData}>
                    <SearchVehicles />
                </FormProvider>
            } />
            <Route path='/vehicle/:id' element={
                <FormProvider initialValues={initialTripFormData.formData}>
                    <Vehicle />
                </FormProvider>
            } />
            <Route path='/hotel/:id' element={
                <FormProvider initialValues={initialTripFormData.formData}>
                    <Hotel />
                </FormProvider>
            } />

            {/* Guide-related routes - available to all users */}
            <Route path='/guide-profile' element={<GuideProfile />} />
            <Route path='/guide-complaints' element={<GuideComplaints />} />
            <Route path='/guide-tour-request' element={<TourRequest />} />
            <Route path='/guide-accepted-tours' element={<AcceptedTours />} />
            <Route path='/guide-confirmed-tours' element={<ConfirmedTours />} />
            <Route path='/guide-active-tour' element={<ActiveTour />} />
            <Route path='/guide-dashboard' element={<GuideDashboard />} />
            <Route path='/guide-notifications' element={<GuideNotifications />} />
            <Route path='/guide-reviews' element={<GuideReviews />} />
            <Route path='/guide-availability' element={<GuideAvailability />} />

            {/* Authentication-based conditional routes */}
            {isAuthenticated ? (
                <>
                    {/* Protected routes for authenticated users */}
                    <Route path='/chat-bot' element={<ChatBot />} />
                    <Route path='/hotel-registration' element={<HotelRegistration />} />
                    <Route path='/hotel-pending' element={<HotelPending />} />
                    <Route path='/guide-registration' element={<GuideRegister />} />
                    <Route path='/guide-pending' element={<GuidePending />} />
                    <Route path='/vehicle-agency-pending' element={<VehicleAgencyPending />} />
                    <Route path='/rooms-add' element={<RoomsAdd />} />
                    <Route path='/partner-details' element={<Details />} />
                    <Route path='/choose-property' element={<ChooseProperty />} />
                    <Route path='/vehicle-registration' element={<VehicleRegistration />} />
                    <Route path='/agency-registration' element={<VehicleAgencyRegistration />} />
                    <Route path='/partner-details-forgot' element={<ForgotDetailsStep1 />} />
                    <Route path='/partner-forgot-password' element={<ForgotPassword />} />
                    <Route path='/partner-forgot-username' element={<ForgotUsername />} />
                    <Route path='/change-password' element={<ChangePassword />} />


                    {/* Admin routes */}
                    <Route path='/admin/dashboard' element={<AdminDashboard />} />
                    <Route path='/admin/users' element={<Users />} />
                    <Route path='/admin/listings' element={<Listings />} />
                    <Route path='/admin/reviews' element={<Reviews />} />
                    <Route path='/admin/reports' element={<Reports />} />
                    <Route path='/admin/notifications' element={<Notifications />} />
                    <Route path='/admin/payments' element={<Payments />} />
                    <Route path='/admin/bookings' element={<Bookings />} />
                    <Route path='/admin/settings' element={<AdminSettings />} />
                    <Route path='/admin/guide-review' element={<AdminGuideReview />} />
                    <Route path='/admin/hotel-review' element={<AdminHotelReview />} />
                    <Route path='/admin/vehicle-agency-review' element={<AdminVehicleAgencyReview />} />

                    {/* Hotel Dashboard routes */}
                    <Route path='/hotel/dashboard/:hotelId' element={<HotelDashboard />} />
                    <Route path='/hotel/dashboard' element={<HotelDashboard />} />
                    <Route path='/hotel/listings/:hotelId' element={<HotelListings />} />
                    <Route path='/hotel/listings' element={<HotelListings />} />
                    <Route path='/hotel/rooms/:hotelId' element={<RoomTypes />} />
                    <Route path='/hotel/rooms' element={<RoomTypes />} />
                    <Route path='/hotel/bookings/:hotelId' element={<BookingsPage />} />
                    <Route path='/hotel/bookings' element={<BookingsPage />} />
                    <Route path='/hotel/calendar/:hotelId' element={<HotelCalendar />} />
                    <Route path='/hotel/calendar' element={<HotelCalendar />} />
                    <Route path='/hotel/payments/:hotelId' element={<PaymentsPage />} />
                    <Route path='/hotel/payments' element={<PaymentsPage />} />
                    <Route path='/hotel/reviews/:hotelId' element={<HotelReviews />} />
                    <Route path='/hotel/reviews' element={<HotelReviews />} />
                    <Route path='/hotel/reports/:hotelId' element={<HotelReports />} />
                    <Route path='/hotel/reports' element={<HotelReports />} />
                    <Route path='/hotel/settings/:hotelId' element={<HotelSettings />} />
                    <Route path='/hotel/settings' element={<HotelSettings />} />
                    <Route path='/hotel/branch/:id' element={<HotelDetails />} />

                    {/* Partner Dashboard routes */}
                    <Route path='/partner/dashboard' element={<Dashboard />} />
                    <Route path='/partner/vehicles' element={<Vehicles />} />
                    <Route path='/partner/vehicles/add' element={<AddVehicle />} />
                    <Route path='/partner/bookings/active' element={<ActiveBookings />} />
                    <Route path='/partner/bookings/history' element={<BookingHistory />} />
                    <Route path='/partner/bookings/details/:id' element={<BookingDetails />} />
                    <Route path='/partner/booking-requests' element={<BookingRequests />} />
                    <Route path='/partner/calendar' element={<AvailabilityCalendar />} />
                    <Route path='/partner/messages' element={<Messages />} />
                    <Route path='/partner/inquiries' element={<SpecialInquiries />} />
                    <Route path='/partner/reviews' element={<PartnerReviews />} />
                    <Route path='/partner/tours/confirmed' element={<PartnerConfirmedTours />} />
                    <Route path='/partner/tours/active/:id' element={<ActiveTourDashboard />} />
                    <Route path='/partner/earnings' element={<EarningsAndPayments />} />
                    <Route path='/partner/analytics' element={<Analytics />} />
                    <Route path='/partner/trip-planner' element={<TripPlanner />} />
                    <Route path='/partner/settings' element={<Settings />} />
                    <Route path='/partner/help' element={<HelpCenter />} />

                    {/* Partner registration routes for authenticated users */}

                    <Route
                        path="/partner-register/*"
                        element={
                            <FormProvider initialValues={registerPartnerAccountForm.formData}>
                                <Routes>
                                    <Route index element={<Navigate to="step-1" replace />} />
                                    <Route path="step-1" element={<PartnerRegisterStep1 />} />
                                    <Route path="step-2" element={<PartnerRegisterStep2 />} />
                                    <Route path="choose-property" element={<ChooseProperty />} />
                                </Routes>
                            </FormProvider>
                        }
                    />


                    {/* Guide-related routes */}
                    <Route path='/guide-dashboard' element={<GuideDashboard />}/>
                    <Route path='/guide-profile' element={<GuideProfile />}/>
                    <Route path='/guide-complaints' element={<GuideComplaints />}/>
                    <Route path='/guide-tour-request' element={<TourRequest />} />
                    <Route path='/guide-accepted-tours' element={<AcceptedTours />} />
                    <Route path='/guide-confirmed-tours' element={<ConfirmedTours />} />
                    <Route path='/guide-active-tour' element={<ActiveTour />} />
                    <Route path='/guide-notifications' element={<Notifications />} />
                    <Route path='/guide-reviews' element={<GuideReviews />} />
                    <Route path='/guide-availability' element={<GuideAvailability />} />
                    <Route path='/guide-tour-history' element={<GuideTourHistory />} />

                    {/* Tour routes wrapped with TourProvider */}
                    <Route 
                        path="/tour/*"
                        element={
                            <FormProvider initialValues={initialTripFormData.formData}>
                                <Routes>
                                    <Route path="create-tour" element={<CreateTour/>}/>
                                    <Route path="select-guide" element={<SelectGuide/>}/>
                                    <Route path="select-hotel" element={<Search />} />
                                    <Route path="select-hotel/:id" element={<Hotel />} />
                                    <Route path="select-vehicle" element={<SearchVehicles/>}/>
                                    <Route path="select-vehicle/:id" element={<Vehicle/>} />
                                    <Route path="complete-request" element={<CompleteRequest/>}/>
                                    <Route path="request-sent" element={<RequestSent />} />
                                    <Route path="payment" element={<Payment/>} />
                                </Routes>
                            </FormProvider>
                        }
                    />
                    {/* Fallback for authenticated users */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                    
                    {/* Ai Trip creation part */}
                    <Route 
                        path='/ai-trip/*'
                        element={
                            <FormProvider initialValues={initialAiTripData.formData}>
                                <Routes>
                                    <Route path='basic-info' element={<BasicInfoStep/>} />
                                    <Route path='preference-info' element={<PreferenceInfoStep/>} />
                                    <Route path='generation' element={<AIGenerationStep/>} />
                                </Routes>
                            </FormProvider>
                        }
                    />
                </>
            ) : (
                <>
                    {/* Routes for unauthenticated users */}
                    <Route path='/welcome' element={<Welcome />} />

                    

                    {/* Partner registration routes for unauthenticated users */}
                    <Route
                        path="/partner-register/*"
                        element={
                            <FormProvider initialValues={registerPartnerAccountForm.formData}>
                                <Routes>
                                    <Route index element={<Navigate to="step-1" replace />} />
                                    <Route path='step-1' element={<PartnerRegisterStep1 />} />
                                    <Route path='step-2' element={<PartnerRegisterStep2 />} />
                                    <Route path='choose-property' element={<ChooseProperty />} />
                                </Routes>
                            </FormProvider>
                        }
                    />

                    {/* Redirect unknown routes to login for unauthenticated users */}
                    <Route path="*" element={<Navigate to="/partner-login/step-1" replace />} />
                </>
            )}
        </Routes>
    );
}
