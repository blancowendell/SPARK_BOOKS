var express = require("express");
const { JsonErrorResponse } = require("../../services/repository/response");

// GET
const loadUsers = async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    res.json(JsonErrorResponse(error));
  }
};

// GET BY ID PARAM
const getUsers = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json(JsonErrorResponse(error));
  }
};

// POST
const addUsers = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json(JsonErrorResponse(error));
  }
};

// PUT
const editUsers = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json(JsonErrorResponse(error));
  }
};

module.exports = {
  loadUsers,
  getUsers,
  addUsers,
  editUsers,
};
