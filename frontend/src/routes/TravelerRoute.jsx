import { Route, Routes } from 'react-router-dom'
import Home from '../pages/ome/Home'

export default function UserRoute() {
    return (
            <Routes>
                <Route path='/home' element={<Home/>}/>
            </Routes>
            
    )
}
