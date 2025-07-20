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
import { initialTripFormData, loginPartnerAccountForm, registerPartnerAccountForm } from '../context/InitialValues';
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
// Admin imports
import AdminDashboard from '../pages/admin/Dashboard';
import Users from '../pages/admin/Users';
import Listings from '../pages/admin/Listings';
import Reviews from '../pages/admin/Reviews';
import Reports from '../pages/admin/Reports';
import Notifications from '../pages/admin/Notifications';
import Payments from '../pages/admin/Payments';

export default function AppRoutes() {
    const { token } = useSelector((state) => state.auth);
    const isExpired = checkTokenExpiration(token);
    const isAuthenticated = token && !isExpired;

    return (
        <Routes>
            {/* Public routes available to all users */}
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/traveler-register' element={<TravelerRegister/>}/>
            <Route path="/destination/:id" element={<DestinationPage />} />
            <Route path='/hotel/:id' element={<Hotel/>}/>

            {/* Tour routes with TourProvider - available to all users */}
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

            {/* Guide-related routes - available to all users */}
            <Route path='/guide-profile' element={<GuideProfile />}/>
            <Route path='/guide-complaints' element={<GuideComplaints />}/>
            <Route path='/guide-tour-request' element={<TourRequest />} />
            <Route path='/guide-accepted-tours' element={<AcceptedTours />} />
            <Route path='/guide-confirmed-tours' element={<ConfirmedTours />} />
            <Route path='/guide-active-tour' element={<ActiveTour />} />

            {/* Authentication-based conditional routes */}
            {isAuthenticated ? (
                <>
                    {/* Protected routes for authenticated users */}
                    <Route path='/chat-bot' element={<ChatBot/>}/>
                    <Route path='/hotel-registration' element={<HotelRegistration/>}/>
                    <Route path='/rooms-add' element={<RoomsAdd/>}/>
                    <Route path='/partner-details' element={<Details/>}/>
                    <Route path='/choose-property' element={<ChooseProperty/>}/>
                    <Route path='/hotels-search' element={<Search/>}/>
                    <Route path='/vehicle-search' element={<SearchVehicles/>}/>
                    <Route path='/vehicle/:id' element={<Vehicle/>}/>
                    <Route path='/vehicle-registration' element={<VehicleRegistration/>}/>
                    <Route path='/agency-registration' element={<VehicleAgencyRegistration/>} />
                    <Route path='/partner-details-forgot' element={<ForgotDetailsStep1/>}/>
                    <Route path='/partner-forgot-password' element={<ForgotPassword/>}/>
                    <Route path='/partner-forgot-username' element={<ForgotUsername/>}/>
                    <Route path='/change-password' element={<ChangePassword/>}/>

                    {/* Admin routes */}
                    <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
                    <Route path='/admin/users' element={<Users/>}/>
                    <Route path='/admin/listings' element={<Listings/>}/>
                    <Route path='/admin/reviews' element={<Reviews/>}/>
                    <Route path='/admin/reports' element={<Reports/>}/>
                    <Route path='/admin/notifications' element={<Notifications/>}/>
                    <Route path='/admin/payments' element={<Payments/>}/>

                    {/* Partner registration routes for authenticated users */}
                    <Route
                        path="/partner-register/*"
                        element={
                            <FormProvider initialValues={registerPartnerAccountForm.formData}>
                                <Routes>
                                    <Route index element={<Navigate to="step-1" replace />} />
                                    <Route path="step-1" element={<PartnerRegisterStep1 />} />
                                    <Route path="step-2" element={<PartnerRegisterStep2 />} />
                                    <Route path="choose-property" element={<ChooseProperty/>}/>
                                </Routes>
                            </FormProvider>
                        }
                    />
                </>
            ) : (
                <>
                    {/* Routes for unauthenticated users */}
                    <Route path='/welcome' element={<Welcome/>}/>
                    
                    {/* Partner login routes */}
                    <Route 
                        path="/partner-login/*"
                        element={
                            <FormProvider initialValues={loginPartnerAccountForm.formData}>
                                <Routes>
                                    <Route index element={<Navigate to="step-1" replace />} />
                                    <Route path='step-1' element={<PartnerLoginStep1/>}/>
                                    <Route path='step-2' element={<PartnerLoginStep2/>}/>
                                </Routes>
                            </FormProvider>
                        }
                    />

                    {/* Partner registration routes for unauthenticated users */}
                    <Route 
                        path="/partner-register/*"
                        element={
                            <FormProvider initialValues={registerPartnerAccountForm.formData}>
                                <Routes>
                                    <Route index element={<Navigate to="step-1" replace />} />
                                    <Route path='step-1' element={<PartnerRegisterStep1/>}/>
                                    <Route path='step-2' element={<PartnerRegisterStep2/>}/>
                                    <Route path='choose-property' element={<ChooseProperty/>}/>
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
