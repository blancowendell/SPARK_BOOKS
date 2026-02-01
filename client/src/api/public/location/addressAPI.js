import axios from "axios";

const locationAPI = {
  /**
   * Load all regions
   */
  loadRegions: async () => {
    try {
      const response = await axios.get(
        "/api/address_location/load-regions",
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Load provinces by region code
   */
  loadProvinces: async (regionCode) => {
    try {
      const response = await axios.get(
        `/api/address_location/load-provinces/${regionCode}`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Load cities by province code
   */
  loadCities: async (provinceCode) => {
    try {
      const response = await axios.get(
        `/api/address_location/load-cities/${provinceCode}`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Load barangays by city code
   */
  loadBarangays: async (cityCode) => {
    try {
      const response = await axios.get(
        `/api/address_location/load-barangays/${cityCode}`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default locationAPI;
