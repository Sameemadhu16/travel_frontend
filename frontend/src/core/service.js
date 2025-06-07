export const handleSelect = (setFormData, name, value) => {
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
};