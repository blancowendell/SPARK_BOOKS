import axiosInstance from "../../axiosInstance";

const CustomerTypeAPI = {
  loadCustomerType: async () => {
    try {
      const response = await axiosInstance.get(
        "/master_customer_type/load-master_customer_type"
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error loading Customer Type:", error);
      throw error;
    }
  },

  getCustomerType: async (customer_type_id) => {
    try {
      const response = await axiosInstance.get(
        "/master_customer_type/get-master_customer_type/" + customer_type_id
      );
      return response.data.data;
    } catch (error) {
      console.error("Error loading Customer Type:", error);
      throw error;
    }
  },

  addCustomerType: async (typeName, description) => {
    try {
      const response = await axiosInstance.post(
        "/master_customer_type/add-master_customer_type",
        {
          typeName,
          description,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding Customer Type:", error);
      throw error;
    }
  },

  editCustomerType: async (id, typeName, description, status) => {
    try {
      const response = await axiosInstance.put(
        `/master_customer_type/edit-master_customer_type/${id}`,
        {
          typeName,
          description,
          status,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error editing Customer Type:", error);
      throw error;
    }
  },
};

export default CustomerTypeAPI;
