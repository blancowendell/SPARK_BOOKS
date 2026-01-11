import axiosInstance from '../../axiosInstance';

const AccessAPI = {
  loadAccess: async () => {
    try {
      const response = await axiosInstance.get('/access/load-access');
      return response.data.data;
    } catch (error) {
      console.error("Error loading access:", error);
      throw error;
    }
  },

  addAccess: async (accessName) => {
    try {
      const response = await axiosInstance.post('/access/add-access', {
        accessName,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding access:", error);
      throw error;
    }
  },

  getAccess: async (accessId) => {
    try {
      const response = await axiosInstance.get(`/access/get-access/${accessId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching access:", error);
      throw error;
    }
  },

  updateAccess: async (accessId, accessName, accessStatus) => {
    try {
      const response = await axiosInstance.put(`/access/update-access/${accessId}`, {
        accessName,
        accessStatus,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating access:", error);
      throw error;
    }
  },
};

export default AccessAPI;
