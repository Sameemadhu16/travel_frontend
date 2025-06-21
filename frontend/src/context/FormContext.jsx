import { useEffect, useMemo, useState } from "react";
import FormContext, { registerPartnerAccountForm } from "./InitialValues";
import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";

export const FormProvider = ({ children, initialValues = {} }) => {

    const [formData,setFormData] = useState(() => {
        const savedData = localStorage.getItem('formData');
        return savedData ? JSON.parse(savedData): initialValues
    });

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    const context = useMemo(()=>({
        formData,
        setFormData
    }),[formData,setFormData]);

    return (
        <FormContext.Provider value={ context }>
            {children}
        </FormContext.Provider>
    )
};

FormProvider.propTypes = {
    children: PropTypes.node.isRequired,
    initialValues: PropTypes.object,
};
