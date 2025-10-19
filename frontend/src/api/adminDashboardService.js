import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5454';

export const getAdminDashboardStats = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/dashboard/stats`);
        return response.data;
    } catch (error) {
        console.error('Error fetching admin dashboard stats:', error);
        throw error;
    }
};
