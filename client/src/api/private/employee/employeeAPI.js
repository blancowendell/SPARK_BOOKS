import axiosInstance from '../../axiosInstance';

const EmployeeAPI = {
  loadEmployees: async () => {
    try {
      const response = await axiosInstance.get('/employees/load-employees');
      return response.data.data;
    } catch (error) {
      console.error("Error loading employees:", error);
      throw error;
    }
  },

  addEmployee: async (firstname, lastname, email, access, sequenceId) => {
    try {
      const response = await axiosInstance.post('/employees/add-employee', {
        firstname,
        lastname,
        email,
        access,
        sequenceId,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding employee:", error);
      throw error;
    }
  },

  getEmployee: async (employeeId) => {
    try {
      const response = await axiosInstance.get(`/employees/get-employee/${employeeId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching employee:", error);
      throw error;
    }
  },

  updateEmployee: async (employeeId, firstname, lastname, email, access, status) => {
    try {
      const response = await axiosInstance.put(`/employees/update-employee/${employeeId}`, {
        firstname,
        lastname,
        email,
        access,
        status,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
  },
};

export default EmployeeAPI;
