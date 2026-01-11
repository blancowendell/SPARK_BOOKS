import axiosInstance from '../../axiosInstance';

const UsersAPI = {
  loadUsers: async () => {
    try {
      const response = await axiosInstance.get('/maintenance_users/load-maintenance-users');
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error loading Users:", error);
      throw error;
    }
  },

  addUsers: async (ticket_sequence_id, fullname, username, password) => {
    try {
      const response = await axiosInstance.post('/maintenance_users/add-maintenance-users', {
        ticket_sequence_id,
        fullname,
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding Users:", error);
      throw error;
    }
  },

  getUsers: async (users_id) => {
    try {
      const response = await axiosInstance.post('/maintenance_users/get-maintenance-users', {
        id: users_id,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error loading Users:", error);
      throw error;
    }
  },

  editUsers: async (id, ticket_sequence_id, fullname, username, status) => {
    try {
      const response = await axiosInstance.put('/maintenance_users/edit-maintenance-users', {
        id: id,
        ticket_sequence_id: ticket_sequence_id,
        fullname: fullname,
        username: username,
        status: status,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding Users:", error);
      throw error;
    }
  },
};

export default UsersAPI;