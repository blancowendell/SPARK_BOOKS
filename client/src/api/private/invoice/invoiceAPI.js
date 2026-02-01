import axiosInstance from "../../axiosInstance";

const InvoiceAPI = {
  loadInvoice: async () => {
    try {
      const response = await axiosInstance.get(
        "/sales_invoice/load-sales_invoice",
      );
      return response.data.data;
    } catch (error) {
      console.error("Error loading sales invoice:", error);
      throw error;
    }
  },

  addInvoice: async (
    invoiceNo,
    customerId,
    salesRepId,
    billToAddress,
    billToName,
    shipToAddress,
    shipToName,
    invoiceDate,
    dueDate,
    shippingDate,
    salesTax,
    freight,
    invoiceTotal,
    netDue,
    itemDetails,
  ) => {
    try {
      const response = await axiosInstance.post(
        "/sales_invoice/add-sales_invoice",
        {
          invoiceNo,
          customerId,
          salesRepId,
          billToAddress,
          billToName,
          shipToAddress,
          shipToName,
          invoiceDate,
          dueDate,
          shippingDate,
          salesTax,
          freight,
          invoiceTotal,
          netDue,
          itemDetails,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error adding employee:", error);
      throw error;
    }
  },

  getInvoice: async (invoiceId) => {
    try {
      const response = await axiosInstance.get(
        `/sales_invoice/get-sales_invoice/${invoiceId}`,
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching employee:", error);
      throw error;
    }
  },
};

export default InvoiceAPI;
