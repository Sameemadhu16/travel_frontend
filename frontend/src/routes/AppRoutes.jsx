import { Route, Routes } from 'react-router-dom'
import Welcome from '../pages/Welcome'
import Search from '../pages/hotels/search/Search'
import Home from '../pages/home/Home'
import Hotel from '../pages/hotels/Hotel'

export default function AppRoutes() {
    return (
            <Routes>
                <Route path='/' element={<Welcome/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/hotels-search' element={<Search/>}/>
                <Route path='/hotel/:id' element={<Hotel/>}/>
            </Routes>
    )
}
