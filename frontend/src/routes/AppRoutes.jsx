import { Route, Routes } from 'react-router-dom'
import Welcome from '../pages/Welcome'
import Search from '../pages/hotels/search/Search'
import Hotel from '../pages/hotels/Details/Hotel'
import HotelRegistration from '../pages/hotels/auth/HotelRegistration'
import RoomsAdd from '../pages/hotels/Rooms/RoomsAdd'
import Home from '../pages/home/Home'
import Details from '../pages/partner/details/Details'
import SearchVehicles from '../pages/vehicles/search/SearchVehicles'
import PartnerRegisterStep1 from '../pages/partner/register/PartnerRegisterStep1'
import PartnerRegisterStep2 from '../pages/partner/register/PartnerRegisterStep2'
import PartnerLoginStep1 from '../pages/partner/login/PartnerLoginStep1'
import PartnerLoginStep2 from '../pages/partner/login/PartnerLoginStep2'
import ForgotDetailsStep1 from '../pages/partner/forgot_details/ForgotDetailsStep1'
import ForgotPassword from '../pages/partner/forgot_details/ForgotPassword'
import ForgotUsername from '../pages/partner/forgot_details/ForgotUsername'
import ChangePassword from '../pages/partner/forgot_details/ChangePassword'
import { FormProvider } from '../context/FormContext'
import { loginPartnerAccountForm, registerPartnerAccountForm } from '../context/InitialValues'
import ChatBot from '../pages/chatBot/ChatBot'
import TravelerRegister from '../pages/TravelerRegister'
import ChooseProperty from '../pages/partner/register/ChooseProperty'
import Vehicle from '../pages/vehicles/Details/components/vehicle'
import VehicleRegistration from '../pages/vehicles/auth/VehicleRegistration'

export default function AppRoutes() {
    return (
            <Routes>
                <Route path='/' element={<Welcome/>}/>
                <Route path='/home' element={<Home/>}/>
                
                <Route path='/hotel/:id' element={<Hotel/>}/>
                

                {/* hotels*/}
                <Route path='/hotel-registration' element={<HotelRegistration/>}/>
                <Route path='/hotels-search' element={<Search/>}/>

                {/* vehicles */}
                <Route path='/vehicle-search' element={<SearchVehicles />} />
                <Route path='/vehicle/:id' element={<Vehicle />} />
                <Route path='/vehicle-registration' element={<VehicleRegistration/>}/>

                {/* rooms */}
                <Route path='/rooms-add' element={<RoomsAdd/>}/>

                {/* partner register */}
                <Route path='/partner-details' element={<Details/>}/>
                <Route
                    path="/partner-register/*"
                    element={
                        <FormProvider initialValues={registerPartnerAccountForm.formData}>
                            <Routes>
                                <Route path="step-1" element={<PartnerRegisterStep1 />} />
                                <Route path="step-2" element={<PartnerRegisterStep2 />} />
                            </Routes>
                        </FormProvider>
                    }
                />
                {/* partner login */}
                <Route 
                    path="/partner-login/*"
                    element={
                        <FormProvider initialValues={loginPartnerAccountForm.formData}>
                            <Routes>
                                <Route path='step-1' element={<PartnerLoginStep1/>}/>
                                <Route path='step-2' element={<PartnerLoginStep2/>}/>
                            </Routes>
                        </FormProvider>
                    }
                />

                {/* partner details forgot */}
                <Route path='/partner-details-forgot' element={<ForgotDetailsStep1/>}/>
                <Route path='/partner-forgot-password' element={<ForgotPassword/>}/>
                <Route path='/partner-forgot-username' element={<ForgotUsername/>}/>
                <Route path='/change-password' element={<ChangePassword/>}/>
                <Route path='/choose-property' element={<ChooseProperty/>}/>

                <Route path='/traveler-register' element={<TravelerRegister/>}/>

                <Route path='/chat-bot' element={<ChatBot/>}/>
            </Routes>
    )
}
