export const validateImageUpload  = (files , limit , maxTotalSizeMB, multiple)  => {
console.log(files);
    let error = '';
    const validExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/svg+xml'];
    const invalidFiles = files.filter(file => !validExtensions.includes(file.type));
    const totalSizeMB = files.reduce((total, file) => total + file.size, 0) / (1024 * 1024);

    if (!files || files.length === 0) {
        error = '*You must upload at least one image';
    }
    if (files.length !== 5 && multiple) {
        error = '*You should add 5 images to verify';
    }
    if (files.length > limit) {
        error = `*You can upload a maximum of ${limit} ${limit === 1 ? 'image':'images'}`;
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
export const formValidator = (formData = {}, fieldsToValidate = []) => {
    const emptyFields = {};
    const specialErrors = {};

    if (formData) {
        // Validate required fields
        const fields = fieldsToValidate.length > 0 
            ? fieldsToValidate 
            : Object.keys(formData);

        fields.forEach((key) => {
            const value = formData[key];
            
            // Special case for arrays (like amenities)
            if (Array.isArray(value)) {
                if (value.length === 0) {
                    emptyFields[key] = '*This field is required';
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
