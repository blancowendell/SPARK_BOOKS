const { JsonErrorResponse } = require("../../services/repository/response");

// GET
const loadPurchaseOrders = async (req, res) => {
  try {
  
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// GET BY ID
const getPurchaseOrders = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// POST
const addPurchaseOrders = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// PUT
const editPurchaseOrders = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

module.exports = {
  loadPurchaseOrders,
  getPurchaseOrders,
  addPurchaseOrders,
  editPurchaseOrders,
};
