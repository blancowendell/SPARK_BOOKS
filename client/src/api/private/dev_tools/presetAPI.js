import axiosInstance from '../../axiosInstance';

const PresetAPI = {
  loadPreSetApi: async () => {
    try {
      const response = await axiosInstance.get('/maintenance_api/load-api-list');
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error loading sequence:", error);
      throw error;
    }
  },

  addPresetApi: async (name, apiUrl, description) => {
    try {
      const response = await axiosInstance.post('/maintenance_api/add-api', {
        name,
        apiUrl,
        description,
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error adding preset API:", error);
      throw error;
    }
  },

  getPresetApi: async (id) => {
    try {
      const response = await axiosInstance.get(`/maintenance_api/get-api/${id}`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error getting preset API:", error);
      throw error;
    }
  },

  editPresetApi: async (id, name, apiUrl, description, status) => {
    try {
      const response = await axiosInstance.put('/maintenance_api/edit-api', {
        id,
        name,
        apiUrl,
        description,
        status,
      });
      return response.data;
    } catch (error) {
      console.error("Error editing preset API:", error);
      throw error;
    }
  },
};

export default PresetAPI;