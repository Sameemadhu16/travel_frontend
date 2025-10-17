import axios from 'axios';

export const handleSelect = (setFormData, name, value) => {
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
};

export const API_BASE_URL = 'http://localhost:5454';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
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

export const putRequest = async (endpoint, data = {}) => {
    try {
        const response = await apiClient.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('PUT request error:', error);
        throw error;
    }
};