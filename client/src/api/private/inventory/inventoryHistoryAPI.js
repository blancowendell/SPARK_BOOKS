import axiosInstance from '../../axiosInstance';

const InventoryHistoryAPI = {
  loadInventoryHistory: async (inventoryId) => {
    try {
      const response = await axiosInstance.get(`/inventory_history/load-inventory_history/${inventoryId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error loading inventory history:", error);
      throw error;
    }
  },

  getInventoryHistory: async (historyId) => {
    try {
      const response = await axiosInstance.get(`/inventory_history/get-inventory_history/${historyId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching inventory history:", error);
      throw error;
    }
  },

  addInventoryHistory: async (quantityId, qty, operation, method) => {
    try {
      const response = await axiosInstance.post('/inventory_history/add-inventory_history', {
        quantityId,
        qty,
        operation,
        method,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding inventory history:", error);
      throw error;
    }
  },

}

export default InventoryHistoryAPI;
