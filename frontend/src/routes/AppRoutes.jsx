import { Route, Routes } from 'react-router-dom'
import Welcome from '../pages/Welcome'
import Search from '../pages/hotels/search/Search'
import Hotel from '../pages/hotels/Details/Hotel'
import HotelRegistration from '../pages/hotels/auth/HotelRegistration'
import RoomsAdd from '../pages/hotels/Rooms/RoomsAdd'
import Home from '../pages/home/home'
import Details from '../pages/partner/details/Details'

export default function AppRoutes() {
    return (
            <Routes>
                <Route path='/' element={<Welcome/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/hotels-search' element={<Search/>}/>
                <Route path='/hotel/:id' element={<Hotel/>}/>

                {/* hotels*/}
                <Route path='/hotel-registration' element={<HotelRegistration/>}/>

                {/* rooms */}
                <Route path='/rooms-add' element={<RoomsAdd/>}/>

                {/* partner */}
                <Route path='/partner-details' element={<Details/>}/>
            </Routes>
    )
}
