import axiosInstance from "../../axiosInstance";

const DashboardAPI = {
  loadDashboardOwner: async () => {
    try {
      const response = await axiosInstance.get(
        "/maintenance_dashboard/load-dashboard-owner"
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error loading dashboard owner:", error);
      throw error;
    }
  },

  loadDashboardOwnerByUser: async () => {
    try {
      const response = await axiosInstance.get(
        "/maintenance_dashboard/load-dashboard-owner-by-user"
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error loading dashboard owner:", error);
      throw error;
    }
  },

  addDashboardOwner: async (userId, userType, title, description, owner) => {
    try {
      const response = await axiosInstance.post("/maintenance_dashboard/add-dashboard-owner", {
        userId,
        userType,
        title,
        description,
        owner,
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error adding dashboard owner:", error);
      throw error;
    }
  },

  getPresetApi: async (id) => {
    try {
      const response = await axiosInstance.get(
        `/maintenance_api/get-api/${id}`
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error getting preset API:", error);
      throw error;
    }
  },

  editPresetApi: async (id, name, apiUrl, description, status) => {
    try {
      const response = await axiosInstance.put("/maintenance_api/edit-api", {
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

export default DashboardAPI;
