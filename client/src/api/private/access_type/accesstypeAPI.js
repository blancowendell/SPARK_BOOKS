import axiosInstance from '../../axiosInstance';

const AccessTypeAPI = {
  getAccessType: async (accessId) => {
    try {
      const response = await axiosInstance.get(`/access_type/get-access-type/${accessId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching access type:", error);
      throw error;
    }
  },

  updateAccessType: async (accessTypeId, typeStatus) => {
    try {
      const response = await axiosInstance.put(`/access_type/update-access-type/${accessTypeId}`, {
        typeStatus,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating access type:", error);
      throw error;
    }
  },
};

export default AccessTypeAPI;
