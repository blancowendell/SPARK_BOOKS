var express = require("express");
const { Encrypter, EncrypterString } = require("../../services/repository/cryptography");
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

const loadDashboardOwner = async (req, res) => {
    try {
    let sql = `SELECT
        md_id,
        md_user_id,
        CONCAT(me_first_name, ' ', me_last_name) as md_fullname,
        md_user_type,
        md_title,
        md_description,
        md_owner,
        md_created_at
    FROM maintenance_dashboards
    INNER JOIN master_users ON md_user_id = mu_id
    INNER JOIN master_employee ON mu_employeeid = me_id`;

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result && result.length > 0) {
        const data = DataModeling(result, "md_");
        res.json(JsonDataResponse(data));
      } else {
        res.json(JsonDataResponse([]));
      }
    });
  } catch (error) {
    console.log(error);
    res.json(JsonErrorResponse(error));
  }
};

const loadDashboardOwnerByUser = async (req, res) => {
    try {
    let sql = `
    SELECT 
    mu_id AS md_user_id,
    me_id AS md_employee_id,
    CONCAT(me_first_name,' ',me_last_name) AS md_full_name,
    ma_name AS md_access_name,
    md_title,
    md_owner,
    md_description
    FROM maintenance_dashboards 
    INNER JOIN master_users ON md_user_id = mu_id
    INNER JOIN master_access ON mu_access_id = ma_id
    INNER JOIN master_employee ON mu_employeeid = me_id`;

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        return res.json(JsonErrorResponse(err));
      }

      if (result && result.length > 0) {
        const data = DataModeling(result, "md_");
        res.json(JsonDataResponse(data));
      } else {
        res.json(JsonDataResponse([]));
      }
    });
  } catch (error) {
    console.log(error);
    res.json(JsonErrorResponse(error));
  }
};

const addDashboardOwner = async (req, res) => {
    try {
    const { userId, userType, title, description, owner } = req.body;

    if (!userId || !userType || !title || !description || !owner) {
      return res
        .status(400)
        .json(
          JsonWarningResponse(
            MessageStatus.REQUIRED +
              "Name, Dashboard ID, and Description are required."
          )
        );
    }

    let insert_data = [[userId, userType, title, description, owner]];

    let insert_sql = InsertStatement(
      Maintenance.maintenance_dashboards.tablename,
      Maintenance.maintenance_dashboards.prefix,
      Maintenance.maintenance_dashboards.insertColumns
    );

    let checkStatement = SelectStatement(
      "SELECT * FROM maintenance_dashboards WHERE md_user_id = ? AND md_user_type = ?",
      [userId, userType]
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

module.exports = {
  loadDashboardOwner,
  loadDashboardOwnerByUser,
  addDashboardOwner,
};
