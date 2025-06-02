import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/home'

export default function UserRoute() {
    return (
            <Routes>
                <Route path='/home' element={<Home/>}/>
            </Routes>
    )
}
