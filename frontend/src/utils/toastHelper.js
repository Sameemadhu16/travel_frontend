import { toast } from 'react-toastify';

export const showToastMessage = (type,message) => {
    toast[type](message,{
        position: 'top-right',
        autoClose: 3000,
        style: {
            width: '400px',
            fontFamily: 'Poppins',
            fontSize: '16px'
        }
    })
}
