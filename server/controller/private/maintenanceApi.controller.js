var express = require("express");
const {
  Encrypter,
  EncrypterString,
} = require("../../services/repository/cryptography");
const mysql = require("../../services/repository/Database");
var router = express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const {
  Select,
  Insert,
  Update,
  SelectParameter,
  Check,
} = require("../../services/repository/dbconnect");
const {
  JsonErrorResponse,
  JsonDataResponse,
  MessageStatus,
  JsonWarningResponse,
  JsonSuccess,
} = require("../../services/repository/response");
const { DataModeling } = require("../../services/data_modeling/Database");
const {
  SelectAllStatement,
  SelectWhereStatement,
  InsertStatement,
  UpdateStatement,
  SelectStatement,
  GetCurrentDatetime,
} = require("../../services/repository/customhelper");
const { STATUS_LOG } = require("../../services/repository/enum/enums");
const { log } = require("winston");
const { Maintenance } = require("../../database/model/Maintenance");

const loadApiList = async (req, res) => {
  try {
    let sql = SelectAllStatement(
      Maintenance.maintenance_api.tablename,
      Maintenance.maintenance_api.selectColumns
    );

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Maintenance.maintenance_api.prefix_);

        res.json(JsonDataResponse(data));
      } else {
        res.json(JsonDataResponse(result));
      }
    });
  } catch (error) {
    console.log(error);
    res.json(JsonErrorResponse(error));
  }
};

const addApi = async (req, res) => {
  try {
    const { name, apiUrl, description } = req.body;

    if (!name || !apiUrl || !description) {
      return res
        .status(400)
        .json(
          JsonWarningResponse(
            MessageStatus.REQUIRED +
              "Name, API URL, and Description are required."
          )
        );
    }

    let insert_data = [[name, apiUrl, description]];

    let insert_sql = InsertStatement(
      Maintenance.maintenance_api.tablename,
      Maintenance.maintenance_api.prefix,
      Maintenance.maintenance_api.insertColumns
    );

    let checkStatement = SelectStatement(
      "SELECT * FROM maintenance_api WHERE ma_api_name = ?",
      [name]
    );

    Check(checkStatement)
      .then((result) => {
        if (result != 0) {
          return res.json(JsonWarningResponse(MessageStatus.EXIST));
        } else {
          Insert(insert_sql, insert_data, (err, result) => {
            if (err) {
              res.status(500).json(JsonErrorResponse(err));
            }
            res.status(200).json(JsonSuccess());
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.json(JsonErrorResponse(error));
      });
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

const getApi = async (req, res) => {
  try {
    const { id } = req.params;

    let sql =
      SelectAllStatement(
        Maintenance.maintenance_api.tablename,
        Maintenance.maintenance_api.selectColumns
      ) + " WHERE ma_id = ?";

    SelectParameter(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Maintenance.maintenance_api.prefix_);

        res.json(JsonDataResponse(data));
      } else {
        res.json(JsonDataResponse(result));
      }
    });
  } catch (error) {
    console.log(error);
    res.json(JsonErrorResponse(error));
  }
};

const editApi = async (req, res) => {
  try {
    const { id, name, apiUrl, description, status } = req.body;

    let update_data = [name, apiUrl, description, status, id];
    let update_sql = UpdateStatement(
      Maintenance.maintenance_api.tablename,
      Maintenance.maintenance_api.prefix,
      [
        Maintenance.maintenance_api.updateOptionColumns.name,
        Maintenance.maintenance_api.updateOptionColumns.api_name,
        Maintenance.maintenance_api.updateOptionColumns.api_description,
        Maintenance.maintenance_api.updateOptionColumns.status,
      ],
      [Maintenance.maintenance_api.updateOptionColumns.id]
    );

    let checkStatement = SelectStatement(
      "SELECT * FROM maintenance_api WHERE ma_id = ? AND ma_name = ? AND ma_api_description = ? AND ma_api_name = ? AND ma_status = ?",
      [id, name, description, apiUrl, status]
    );

    Check(checkStatement)
      .then((result) => {
        if (result != 0) {
          return res.json(JsonWarningResponse(MessageStatus.EXIST));
        } else {
          Update(update_sql, update_data, (err, result) => {
            if (err) {
              res.status(500).json(JsonErrorResponse(err));
            }

            res.status(200).json(JsonSuccess());
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.json(JsonErrorResponse(error));
      });
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

module.exports = {
  loadApiList,
  addApi,
  getApi,
  editApi,
};
