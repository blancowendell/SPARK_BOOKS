const { JsonErrorResponse } = require("../../services/repository/response");

// GET
const loadSalesOrders = async (req, res) => {
  try {
  
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// GET BY ID
const getSalesOrders = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// POST
const addSalesOrders = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// PUT
const editSalesOrders = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

module.exports = {
  loadSalesOrders,
  getSalesOrders,
  addSalesOrders,
  editSalesOrders,
};
