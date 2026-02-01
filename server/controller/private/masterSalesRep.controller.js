const { JsonErrorResponse } = require("../../services/repository/response");

// GET
const loadMasterSalesRep = async (req, res) => {
  try {
  
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// GET BY ID
const getMasterSalesRep = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// POST
const addMasterSalesRep = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// PUT
const editMasterSalesRep = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

module.exports = {
  loadMasterSalesRep,
  getMasterSalesRep,
  addMasterSalesRep,
  editMasterSalesRep,
};
