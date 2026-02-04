import axiosInstance from '../../axiosInstance';

const AccountsReceivableAPI = {
  loadAccountsReceivableCustomer: async (customerId) => {
    try {
      const response = await axiosInstance.get(`/accounts_receivable/load-accounts_receivable_customer/${customerId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error loading Accounts Receivable:", error);
      throw error;
    }
  },

  loadAccountsReceivableVendors: async (vendorId) => {
    try {
      const response = await axiosInstance.get(`/accounts_receivable/load-accounts_receivable_vendor/${vendorId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error loading Accounts Receivable:", error);
      throw error;
    }
  },
};  

export default AccountsReceivableAPI;