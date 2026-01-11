import axiosInstance from "../../axiosInstance";

const SecurityAPI = {
  checkPasswordStatus: async () => {
    try {
      const response = await axiosInstance.get("/security/get-password-status");
      return response.data.data;
    } catch (error) {
      console.error("Error loading Security:", error);
      throw error;
    }
  },

  editUsernamePassword: async (username, currentPassword, password, confirmPassword) => {
    try {
      const response = await axiosInstance.put(
        "/security/update-password",
        {
          username: username,
          currentPassword: currentPassword,
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating Security:", error);
      throw error;
    }
  },
};

export default SecurityAPI;
