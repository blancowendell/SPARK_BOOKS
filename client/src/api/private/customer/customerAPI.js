import axiosInstance from '../../axiosInstance';

const CustomerAPI = {
    loadCustomerGeneral: async () => {
        try {
            const response = await axiosInstance.get(`/master_customer_general/load-master_customer_general`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching Customer General:", error);
            throw error;
        }
    },

    getCustomerGeneral: async (customerId) => {
        try {
            const response = await axiosInstance.get(`/master_customer_general/get-master_customer_general/${customerId}`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching Customer General:", error);
            throw error;
        }
    },

    addCustomerGeneral: async (sequenceId, typeId, name, isProspect, accountNumber, billingAddress, country, region, province, city, zipCode, baranggayStreet, isTax, telephone, fax, email, website) => {
        try {
            const response = await axiosInstance.post('/master_customer_general/add-master_customer_general', {
                sequenceId,
                typeId,
                name,
                isProspect,
                accountNumber,
                billingAddress,
                country,
                region,
                province,
                city,
                zipCode,
                baranggayStreet,
                isTax,
                telephone,
                fax,
                email,
                website
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching Customer General:", error);
            throw error;
        }
    },

    editCustomerGeneral: async (customerId, typeId, name, isProspect, accountNumber, billingAddress, country, region, province, city, zipCode, baranggayStreet, isTax, telephone, fax, email, website, status) => {
        try {
            const response = await axiosInstance.put(`/master_customer_general/edit-master_customer_general/${customerId}`, {
                typeId,
                name,
                isProspect,
                accountNumber,
                billingAddress,
                country,
                region,
                province,
                city,
                zipCode,
                baranggayStreet,
                isTax,
                telephone,
                fax,
                email,
                website,
                status,
            });
            return response.data;
        } catch (error) {
            console.error("Error editing Customer General:", error);
            throw error;
        }
    },
}

export default CustomerAPI;