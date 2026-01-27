import axiosInstance from "../../axiosInstance";

const PricingAPI = {
  loadPricingFormula: async () => {
    try {
      const response = await axiosInstance.get(
        "/pricing_formula/load-pricing_formula"
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error loading Pricing Formula:", error);
      throw error;
    }
  },

  getPricingFormula: async (pricingId) => {
    try {
      const response = await axiosInstance.get(
        "/pricing_formula/get-pricing_formula/" + pricingId
      );
      return response.data.data;
    } catch (error) {
      console.error("Error loading Pricing Formula:", error);
      throw error;
    }
  },

  addPricingFormula: async (code, name, pricingType, operation, value, roundingPrecision) => {
    try {
      const response = await axiosInstance.post(
        "/pricing_formula/add-pricing_formula",
        {
          code,
          name,
          pricingType,
          operation,
          value,
          roundingPrecision
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding Pricing Formula:", error);
      throw error;
    }
  },

  editPricingFormula: async (id, code, name, pricingType, operation, value, roundingPrecision, status) => {
    try {
      const response = await axiosInstance.put(
        `/pricing_formula/edit-pricing_formula/${id}`,
        {
          code,
          name,
          pricingType,
          operation,
          value,
          roundingPrecision,
          status
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error editing Pricing Formula:", error);
      throw error;
    }
  },
};

export default PricingAPI;