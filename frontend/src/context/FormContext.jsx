import { useEffect, useMemo, useState } from "react";
import FormContext from "./InitialValues";
import PropTypes from 'prop-types';

export const FormProvider = ({ children, initialValues = {} }) => {

    const [formData,setFormData] = useState(() => {
        try {
            const savedData = localStorage.getItem('formData');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                // Merge savedData with initialValues to ensure all required properties exist
                return {
                    ...initialValues,
                    ...parsedData,
                    // Ensure nested objects are properly merged
                    travelDetails: {
                        ...initialValues.travelDetails,
                        ...parsedData.travelDetails
                    },
                    contactInfo: {
                        ...initialValues.contactInfo,
                        ...parsedData.contactInfo
                    },
                    itinerary: parsedData.itinerary || initialValues.itinerary
                };
            }
        } catch (error) {
            console.error('Error parsing localStorage data:', error);
            // Clear corrupted localStorage data
            localStorage.removeItem('formData');
        }
        return initialValues;
    });

    useEffect(() => {
        try {
            localStorage.setItem('formData', JSON.stringify(formData));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
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
