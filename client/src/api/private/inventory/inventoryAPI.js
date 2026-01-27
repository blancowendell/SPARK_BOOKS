import axiosInstance from '../../axiosInstance';

const InventoryAPI = {
  loadMasterInventory: async () => {
    try {
      const response = await axiosInstance.get('/master_inventory/load-master_inventory');
      return response.data.data;
    } catch (error) {
      console.error("Error loading master inventory:", error);
      throw error;
    }
  },

  getMasterInventory: async (inventoryId) => {
    try {
      const response = await axiosInstance.get(`/master_inventory/get-master_inventory/${inventoryId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching master inventory:", error);
      throw error;
    }
  },

  addMasterInventory: async (description, descriptionSalesPurchase, itemClass, glSalesAccount, glInventoryAccount, glCogsAccount, itemPrice, upcSku, itemType, itemLocation, stockingUnit, size, weight, location, brand) => {
    try {
      const response = await axiosInstance.post('/master_inventory/add-master_inventory', {
        description,
        descriptionSalesPurchase,
        itemClass,
        glSalesAccount,
        glInventoryAccount,
        glCogsAccount,
        itemPrice,
        upcSku,
        itemType,
        itemLocation,
        stockingUnit,
        size,
        weight,
        location,
        brand,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding master inventory:", error);
      throw error;
    }
  },

  editMasterInventory: async (inventoryId, description, descriptionSalesPurchase, itemClass, glSalesAccount, glInventoryAccount, glCogsAccount, itemPrice, upcSku, itemType, itemLocation, stockingUnit, size, weight, location, brand, status) => {
    try {
      const response = await axiosInstance.put(`/master_inventory/edit-master_inventory/${inventoryId}`, {
        description,
        descriptionSalesPurchase,
        itemClass,
        glSalesAccount,
        glInventoryAccount,
        glCogsAccount,
        itemPrice,
        upcSku,
        itemType,
        itemLocation,
        stockingUnit,
        size,
        weight,
        location,
        brand,
        status,
      });
      return response.data;
    } catch (error) {
      console.error("Error editing master inventory:", error);
      throw error;
    }
  },
}

export default InventoryAPI;
