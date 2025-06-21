import axios from 'axios';

export const handleSelect = (setFormData, name, value) => {
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
};

const apiClient = axios.create({
    baseURL: 'http://localhost:5454',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getRequest = async (endpoint, params = {}) => {
    try {
        const response = await apiClient.get(endpoint, { params });
        return response.data;
    } catch (error) {
        console.error('GET request error:', error);
        throw error;
    }
};

export const postRequest = async (endpoint, data = {}) => {
    try {
        const response = await apiClient.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('POST request error:', error);
        throw error;
    }
};