import axiosInstance from '../../axiosInstance';

const CoaAPI = {
  loadCoa: async () => {
    try {
      const response = await axiosInstance.get('/master_coa/load-master_coa');
      return response.data.data;
    } catch (error) {
      console.error("Error loading COA:", error);
      throw error;
    }
  },

  getCoa: async (coaId) => {
    try {
      const response = await axiosInstance.get(`/master_coa/get-master_coa/${coaId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching COA:", error);
      throw error;
    }
  },

  addCoa: async (typeId, description, runningBal) => {
    try {
      const response = await axiosInstance.post('/master_coa/add-master_coa', {
        typeId,
        description,
        runningBal,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding COA:", error);
      throw error;
    }
  },

  editCoa: async (id, description, runningBal, status) => {
    try {
      const response = await axiosInstance.put(`/master_coa/edit-master_coa/${id}`, {
        description,
        runningBal,
        status,
      });
      return response.data;
    } catch (error) {
      console.error("Error editing COA:", error);
      throw error;
    }
  },
};  

export default CoaAPI;