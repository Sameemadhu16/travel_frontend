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

export default function AppRoutes() {
    return (
            <Routes>
                <Route path='/' element={<Welcome/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/hotels-search' element={<Search/>}/>
                <Route path='/vehicle-search' element={<SearchVehicles/>}/>
                <Route path='/hotel/:id' element={<Hotel/>}/>

                {/* hotels*/}
                <Route path='/hotel-registration' element={<HotelRegistration/>}/>

                {/* rooms */}
                <Route path='/rooms-add' element={<RoomsAdd/>}/>

                {/* partner register */}
                <Route path='/partner-details' element={<Details/>}/>
                <Route path='/partner-register-step-1' element={<PartnerRegisterStep1/>}/>
                <Route path='/partner-register-step-2' element={<PartnerRegisterStep2/>}/>

                {/* partner login */}
                <Route path='/partner-login-step-1' element={<PartnerLoginStep1/>}/>
                <Route path='/partner-login-step-2' element={<PartnerLoginStep2/>}/>

                {/* partner details forgot */}
                <Route path='/partner-details-forgot' element={<ForgotDetailsStep1/>}/>
                <Route path='/partner-forgot-password' element={<ForgotPassword/>}/>
            </Routes>
    )
}
