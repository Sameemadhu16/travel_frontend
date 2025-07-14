import { Route, Routes } from 'react-router-dom'
import Welcome from '../pages/Welcome'
import Search from '../pages/hotels/search/Search'
import Hotel from '../pages/hotels/Details/Hotel'
import HotelRegistration from '../pages/hotels/auth/HotelRegistration'
import RoomsAdd from '../pages/hotels/Rooms/RoomsAdd'
import Home from '../pages/home/Home'
import Details from '../pages/partner/details/Details'
import SearchVehicles from '../pages/vehicles/search/SearchVehicles'
import AdminDashboard from '../pages/admin/Dashboard' // Add this import
import Users from '../pages/admin/Users'
import Listings from '../pages/admin/Listings'
import Reviews from '../pages/admin/Reviews'
import Reports from '../pages/admin/Reports'
import Notifications from '../pages/admin/Notifications' // Import Notifications
import Payments from '../pages/admin/Payments'

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

                {/* partner */}
                <Route path='/partner-details' element={<Details/>}/>

                {/* admin */}
                <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
                <Route path='/admin/users' element={<Users/>}/>
                <Route path='/admin/listings' element={<Listings/>}/>
                <Route path='/admin/reviews' element={<Reviews/>}/>
                <Route path='/admin/reports' element={<Reports/>}/>
                <Route path='/admin/notifications' element={<Notifications/>}/> {/* Add Notifications route */}
                <Route path='/admin/payments' element={<Payments/>}/>
            </Routes>
    )
}
