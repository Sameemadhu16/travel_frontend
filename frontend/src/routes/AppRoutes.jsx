import { Route, Routes } from 'react-router-dom'
import Welcome from '../pages/Welcome'
import Home from '../pages/home/home'
import Search from '../pages/hotels/search/Search'

export default function AppRoutes() {
    return (
            <Routes>
                <Route path='/' element={<Welcome/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/hotels-search' element={<Search/>}/>
            </Routes>
    )
}
