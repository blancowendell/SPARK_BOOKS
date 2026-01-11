import axiosInstance from "../../axiosInstance";

const CoaTypeAPI = {
  loadCoaType: async () => {
    try {
      const response = await axiosInstance.get(
        "/master_coa_type/load-master_coa_type"
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error loading CoaType:", error);
      throw error;
    }
  },

  getCoaType: async (coa_type_id) => {
    try {
      const response = await axiosInstance.get(
        "/master_coa_type/get-master_coa_type/" + coa_type_id
      );
      return response.data.data;
    } catch (error) {
      console.error("Error loading CoaType:", error);
      throw error;
    }
  },

  addCoaType: async (accountName, accountType, segmentStart) => {
    try {
      const response = await axiosInstance.post(
        "/master_coa_type/add-master_coa_type",
        {
          accountName,
          accountType,
          segmentStart,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding CoaType:", error);
      throw error;
    }
  },

  editCoaType: async (id, accountName, accountType, segmentStart) => {
    try {
      const response = await axiosInstance.put(
        `/master_coa_type/edit-master_coa_type/${id}`,
        {
          accountName,
          accountType,
          segmentStart,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error editing CoaType:", error);
      throw error;
    }
  },
};

export default CoaTypeAPI;
