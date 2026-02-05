import axiosInstance from '../../axiosInstance';

const InventoryQuantityAPI = {
  loadInventoryQuantity: async () => {
    try {
      const response = await axiosInstance.get('/inventory_quantity/load-inventory_quantity');
      return response.data.data;
    } catch (error) {
      console.error("Error loading inventory history:", error);
      throw error;
    }
  },
}

export default InventoryQuantityAPI;
