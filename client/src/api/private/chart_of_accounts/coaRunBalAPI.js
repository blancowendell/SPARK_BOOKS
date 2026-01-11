import axiosInstance from '../../axiosInstance';

const CoaRunBalAPI = {
//   loadCoaRunBal: async () => {
//     try {
//       const response = await axiosInstance.get('/coa_run_bal/load-coa_run_bal');
//       return response.data.data;
//     } catch (error) {
//       console.error("Error loading COA Run Balance:", error);
//       throw error;
//     }
//   },

  getCoaRunBal: async (coaRunBalId) => {
    try {
      const response = await axiosInstance.get(`/coa_run_bal/get-coa_run_bal/${coaRunBalId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching COA Run Balance:", error);
      throw error;
    }
  },

//   addCoaRunBal: async (coaId, accountCode, description, runningBal) => {
//     try {
//       const response = await axiosInstance.post('/coa_run_bal/add-coa_run_bal', {
//         coaId,
//         accountCode,
//         description,
//         runningBal,
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error adding COA Run Balance:", error);
//       throw error;
//     }
//   },

//   editCoaRunBal: async (id, description, runningBal, status) => {
//     try {
//       const response = await axiosInstance.put(`/coa_run_bal/edit-coa_run_bal/${id}`, {
//         description,
//         runningBal,
//         status,
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error editing COA Run Balance:", error);
//       throw error;
//     }
//   },
};  

export default CoaRunBalAPI;