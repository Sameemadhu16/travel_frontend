import { useNavigate } from 'react-router-dom'
import Header from './components/Header'
import AppRoutes from './routes/AppRoutes'
import { useEffect } from 'react';
import { setNavigator } from './core/navigateHelper';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './redux/store';
import Footer from './components/Footer';

export default function App() {

  const navigate = useNavigate();

  useEffect(()=>{
    setNavigator(navigate);
  },[navigate]);
  
  return (
      <Provider store={store}>
        <Header/>
        <AppRoutes/>
        <ToastContainer theme="colored"/>
        <Footer/>
      </Provider>
    
  )
}
