import { useNavigate } from 'react-router-dom'
import Header from './components/Header'
import AppRoutes from './routes/AppRoutes'
import { useEffect } from 'react';
import { setNavigator } from './core/navigateHelper';
import { ToastContainer } from 'react-toastify';
import { FormProvider } from './context/FormContext';

export default function App() {

  const navigate = useNavigate();

  useEffect(()=>{
    setNavigator(navigate);
  },[navigate]);
  
  return (
      <FormProvider>
        <Header/>
        <AppRoutes/>
        <ToastContainer theme="colored"/>
      </FormProvider>
    
  )
}
