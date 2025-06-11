/**
 * Validates image, checking types size and other things
 * @param {Object} files - The image file to validate
 * @param {Array} limit - Number of image to upload
 * @param {Array} maxTotalSizeMB - Image size to upload
 * @param {Array} multiple - Check if uploaded multiple images or not
 * @returns {Object|null} Validation errors or null if valid
 */
export const validateImageUpload  = (files, maxTotalSizeMB,)  => {
    let error = '';
    const validExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/svg+xml'];
    const invalidFiles = files.filter(file => !validExtensions.includes(file.type));
    const totalSizeMB = files.reduce((total, file) => total + file.size, 0) / (1024 * 1024);

    if (!files || files.length === 0) {
        error = '*You must upload at least one image';
    }
    if (invalidFiles.length > 0) {
        error =  '*Only JPG, PNG, and SVG files are allowed';
    }
    if (totalSizeMB > maxTotalSizeMB) {
        error =  `*Total file size must not exceed ${maxTotalSizeMB} MB`;
    }

    return error;
}

/**
 * Validates form fields, checking only specified fields for emptiness
 * @param {Object} formData - The form data object to validate
 * @param {Array} fieldsToValidate - Array of field names to validate (optional)
 * @returns {Object|null} Validation errors or null if valid
 */
export const formValidator = (
    formData = {}, 
    fieldsToValidate = [],
    customValidations = {}
    ) => {
    const emptyFields = {};
    const specialErrors = {};

    if (formData) {
        // Validate required fields
        const fields = fieldsToValidate.length > 0 
        ? fieldsToValidate 
        : Object.keys(formData);

        fields.forEach((key) => {
        const value = formData[key];
        
        // Special case for arrays
            if (Array.isArray(value)) {
                if (value.length === 0) {
                emptyFields[key] = '*This field is required';
                }
                // Check for custom array length validation
                else if (customValidations[key]?.minLength && value.length < customValidations[key].minLength) {
                specialErrors[key] = customValidations[key].message || `*Minimum ${customValidations[key].minLength} items required`;
                }
                else if (customValidations[key]?.maxLength && value.length > customValidations[key].maxLength) {
                specialErrors[key] = customValidations[key].message || `*Maximum ${customValidations[key].maxLength} items allowed`;
                }
                else if (customValidations[key]?.exactLength && value.length !== customValidations[key].exactLength) {
                specialErrors[key] = customValidations[key].message || `*Exactly ${customValidations[key].exactLength} items required`;
                }
            } 
            // Normal field validation
            else if (!value || value.toString().trim() === '') {
                emptyFields[key] = '*This field is required';
            }
        });

        // Special validation for password match
        if (fields.includes('password') && fields.includes('confirmPassword')) {
            if (formData.password !== formData.confirmPassword) {
                specialErrors.confirmPassword = '*Passwords do not match';
            }
        }

        // ✅ Phone number validation for +94xxxxxxxxx format
        if (fields.includes('phoneNumber')) {
            const phoneRegex = /^\+94\d{9}$/;
            if (!phoneRegex.test(formData.phoneNumber)) {
                specialErrors.phoneNumber = '*Invalid phone number. Use format +947XXXXXXXX';
            }
        }

        // Special validation for email format
        if (fields.includes('email') && formData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            specialErrors.email = '*Please enter a valid email';
        }
    }

    const allErrors = { ...emptyFields, ...specialErrors };

    if (Object.keys(allErrors).length > 0) {
        return {
            message: '*Please fix the errors in the form',
            errors: allErrors,
        };
    }
}

    return null;
};