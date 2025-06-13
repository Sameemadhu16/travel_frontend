import { createContext } from "react";

const INITIAL_STRING = '';
const INITIAL_NUMBER = 0;

const registerPartnerAccountForm = {
    formData: {
        email: INITIAL_STRING,
        firstName: INITIAL_STRING,
        lastName: INITIAL_STRING,
        phoneNumber: INITIAL_STRING,
    },
    setFormData: () => {},
}

const FormContext = createContext();

export default FormContext;
export { registerPartnerAccountForm }; 