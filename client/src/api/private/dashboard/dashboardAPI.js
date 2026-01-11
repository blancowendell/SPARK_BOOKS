import axiosInstance from '../../axiosInstance';

const DashboardAPI = {

    addWidgets: async (payload) => {
        try {
            const response = await axiosInstance.post('/dashboard/save-layout', payload);
            return response.data;
        } catch (error) {
            console.error("Error adding widgets:", error);
            throw error;
        }
    },

    loadLayout: async () => {
        try {
            const response = await axiosInstance.get('/dashboard/load-layout');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.error("Error loading layout:", error);
            throw error;
        }
    },

    loadMaintenanceApi: async (apiUrl) => {
        try {
            const response = await axiosInstance.get(`/dashboard_api/${apiUrl}`);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }  
    },
};

export default DashboardAPI;  