import axiosInstance from '../../axiosInstance';

const SequenceAPI = {
  loadSequence: async () => {
    try {
      const response = await axiosInstance.get('/maintenance_sequence/load-sequence');
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error loading sequence:", error);
      throw error;
    }
  },

  loadNotInitialSequence: async () => {
    try {
      const response = await axiosInstance.get('/maintenance_sequence/wo-initial-sequence');
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error loading sequence:", error);
      throw error;
    }
  },

  addSequence: async (employee_level, prefix, seperator, start_number, padding_length, include_year, include_month, include_day) => {
    try {
      const response = await axiosInstance.post('/maintenance_sequence/add-sequence', {
        employee_level,
        prefix,
        seperator,
        start_number,
        padding_length,
        include_year,
        include_month,
        include_day,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding sequence:", error);
      throw error;
    }
  },

  getSequence: async (sequence_id) => {
    try {
      const response = await axiosInstance.post('/maintenance_sequence/get-sequence', {
        id: sequence_id,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error loading sequence:", error);
      throw error;
    }
  },

  editSequence: async (id, padding_length) => {
    try {
      const response = await axiosInstance.put('/maintenance_sequence/edit-sequence', {
        id: id,
        padding_length: padding_length,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding sequence:", error);
      throw error;
    }
  },
};

export default SequenceAPI;