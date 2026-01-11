import axiosInstance from "../../axiosInstance";

const InventoryMethodAPI = {
  loadInventoryMethods: async () => {
    try {
      const response = await axiosInstance.get(
        "/master_inventory_methods/load-master_inventory_methods"
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error loading Inventory Methods:", error);
      throw error;
    }
  },

  getInventoryMethod: async (inventory_method_id) => {
    try {
      const response = await axiosInstance.get(
        "/master_inventory_methods/get-master_inventory_methods/" + inventory_method_id
      );
      return response.data.data;
    } catch (error) {
      console.error("Error loading Inventory Methods:", error);
      throw error;
    }
  },

  addInventoryMethod: async (code, methodName, methodDescription) => {
    try {
      const response = await axiosInstance.post(
        "/master_inventory_methods/add-master_inventory_methods",
        {
          code,
          methodName,
          methodDescription,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding Inventory Methods:", error);
      throw error;
    }
  },

  editInventoryMethod: async (id, code, methodName, methodDescription, status) => {
    try {
      const response = await axiosInstance.put(
        `/master_inventory_methods/edit-master_inventory_methods/${id}`,
        {
          code,
          methodName,
          methodDescription,
          status,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error editing Inventory Methods:", error);
      throw error;
    }
  },
};

export default InventoryMethodAPI;