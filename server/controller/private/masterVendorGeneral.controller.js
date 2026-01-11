const { JsonErrorResponse } = require("../../services/repository/response");

// GET
const loadMasterVendorGeneral = async (req, res) => {
  try {
  
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// GET BY ID
const getMasterVendorGeneral = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// POST
const addMasterVendorGeneral = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// PUT
const editMasterVendorGeneral = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

module.exports = {
  loadMasterVendorGeneral,
  getMasterVendorGeneral,
  addMasterVendorGeneral,
  editMasterVendorGeneral,
};
