import { useNavigate } from 'react-router-dom'
import Header from './components/Header'
import AppRoutes from './routes/AppRoutes'
import ScrollToTop from './components/ScrollToTop'
import { useEffect } from 'react';
import { setNavigator } from './core/navigateHelper';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './redux/store';
import Footer from './components/Footer';
import BotImage from './components/BotImage';

export default function App() {

  const navigate = useNavigate();

  useEffect(()=>{
    setNavigator(navigate);
  },[navigate]);
  
  return (
      <Provider store={store}>
        <ScrollToTop />
        <Header/>
        <AppRoutes/>
        <ToastContainer theme="colored"/>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <BotImage/>
        <Footer/>
      </Provider>
    
  )
}
