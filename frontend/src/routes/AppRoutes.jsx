import { Route, Routes } from 'react-router-dom'
import Welcome from '../pages/Welcome'
import Search from '../pages/hotels/search/Search'
import Hotel from '../pages/hotels/Details/Hotel'
import HotelRegistration from '../pages/hotels/auth/HotelRegistration'
import RoomsAdd from '../pages/hotels/Rooms/RoomsAdd'
import Home from '../pages/home/Home'
import Details from '../pages/partner/details/Details'
import SearchVehicles from '../pages/vehicles/search/SearchVehicles'
import GuideProfile from '../pages/guide/GuideProfile'
import GuideAvailability from '../pages/guide/GuideAvailability'
import Test from '../pages/guide/Test'
import GuideEarnings from '../pages/guide/GuideEarnings'
import GuideComplaints from '../pages/guide/GuideComplaints'
import GuideTourPackages from '../pages/guide/GuideTourPackages'
import GuideRegister from '../pages/guide/GuideRegister'

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

                {/* Guide Home Page */}
                <Route path='/guide-profile' element={<GuideProfile />} />
                <Route path='/guide-test' element={<Test/>} />
                <Route path='/guide-availability' element={<GuideAvailability />} />
                <Route path='/guide-earnings' element={<GuideEarnings />} />
                <Route path='/guide-complaints' element={<GuideComplaints />} />
                <Route path='/guide-tour-packages' element={<GuideTourPackages />} />
                <Route path='/guide-register' element={<GuideRegister />} />
            </Routes>
    )
}
