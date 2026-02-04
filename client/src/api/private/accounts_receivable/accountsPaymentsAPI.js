import axiosInstance from "../../axiosInstance";

const AccountsPaymentsAPI = {
  addAccountsPayments: async (
    receivableId,
    accountType,
    coaId,
    customerId,
    vendorId,
    invoiceIds,
    purchaseOrderIds,
    referenceNo,
    recieptNo,
    amountPayment,
    paymentMethod,
    paymentDate,
  ) => {
    try {
      const response = await axiosInstance.post(
        "/accounts_payments/add-accounts_payments",
        {
          receivableId,
          accountType,
          coaId,
          customerId,
          vendorId,
          invoiceIds,
          purchaseOrderIds,
          referenceNo,
          recieptNo,
          amountPayment,
          paymentMethod,
          paymentDate,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Customer General:", error);
      throw error;
    }
  },
};

export default AccountsPaymentsAPI;
