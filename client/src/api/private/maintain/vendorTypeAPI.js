import axiosInstance from "../../axiosInstance";

const VendorTypeAPI = {
  loadVendorType: async () => {
    try {
      const response = await axiosInstance.get(
        "/master_vendor_type/load-master_vendor_type"
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error loading Vendor Type:", error);
      throw error;
    }
  },

  getVendorType: async (vendor_type_id) => {
    try {
      const response = await axiosInstance.get(
        "/master_vendor_type/get-master_vendor_type/" + vendor_type_id
      );
      return response.data.data;
    } catch (error) {
      console.error("Error loading Vendor Type:", error);
      throw error;
    }
  },

  addVendorType: async (typeName, description) => {
    try {
      const response = await axiosInstance.post(
        "/master_vendor_type/add-master_vendor_type",
        {
          typeName,
          description,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding Vendor Type:", error);
      throw error;
    }
  },

  editVendorType: async (id, typeName, description, status) => {
    try {
      const response = await axiosInstance.put(
        `/master_vendor_type/edit-master_vendor_type/${id}`,
        {
          typeName,
          description,
          status,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error editing Vendor Type:", error);
      throw error;
    }
  },
};

export default VendorTypeAPI;
