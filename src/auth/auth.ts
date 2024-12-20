import axios from "axios";

export const checkAuth = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.get('/api/user');
    } catch (error: any) {
        console.error('User not authenticated:', error.message);
    }
};
