import axiosInstance from '../../axiosInstance';

const SalesOrderAPI = {
  loadSalesOrdersPending: async () => {
    try {
      const response = await axiosInstance.get('/sales_order/load-sales_orders-pending');
      return response.data.data;
    } catch (error) {
      console.error("Error loading sales orders:", error);
      throw error;
    }
  },

  loadSalesOrdersApproved: async () => {
    try {
      const response = await axiosInstance.get('/sales_order/load-sales_orders-approved');
      return response.data.data;
    } catch (error) {
      console.error("Error loading sales orders:", error);
      throw error;
    }
  },

  getSalesOrders: async (salesOrderId) => {
    try {
      const response = await axiosInstance.get(`/sales_order/get-sales_orders/${salesOrderId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching sales order:", error);
      throw error;
    }
  },


  actionSalesOrder: async (salesOrderId, action) => {
    try {
      const response = await axiosInstance.put(`/sales_order/action-sales_orders/${salesOrderId}`, {
        action,
      });
      return response.data;
    } catch (error) {
      console.error("Error editing sales order:", error);
      throw error;
    }
  },
};

export default SalesOrderAPI;