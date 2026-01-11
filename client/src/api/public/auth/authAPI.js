import axios from 'axios';
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const authAPI = {
    login: async (username, password) => {
        try {
            await axios.post(`/api/login`, {
                username,
                password,
            }, {
                withCredentials: true,
            });

            const sessionResponse = await axios.get(`/api/session`, {
                withCredentials: true,
            });
            return sessionResponse.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    customerLogin: async (username, password) => {
        try {
            await axios.post(`/api/customer-login`, {
                username,
                password,
            }, {
                withCredentials: true,
            });

            const sessionResponse = await axios.get(`/api/session`, {
                withCredentials: true,
            });
            return sessionResponse.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },


    ownerLogin: async (username, password) => {
        try {
            await axios.post(`/api/owner-login`, {
                username,
                password,
            }, {
                withCredentials: true,
            });

            const sessionResponse = await axios.get(`/api/session`, {
                withCredentials: true,
            });
            return sessionResponse.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    logout: async () => {
        try {
            const response = await axios.post(`/api/logout`, {}, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    getSession: async () => {
        try {
            const response = await axios.get(`/api/session`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default authAPI;
