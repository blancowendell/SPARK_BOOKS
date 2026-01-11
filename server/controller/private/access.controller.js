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
  Check,
  SelectParameter,
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
  InsertStatementTransCommit,
  SelectWithJoinStatement,
  SelectWhereStatementWithFormatDate,
} = require("../../services/repository/customhelper");
const { STATUS_LOG } = require("../../services/repository/enum/enums");
const { log } = require("winston");
const { Master } = require("../../database/model/Master");
const { Maintenance } = require("../../database/model/Maintenance");
const { Transaction, TransactionWithReturn } = require("../../services/utility/utility");

const getAccess = async (req, res) => {
    try {
    let sql = SelectAllStatement(
      Master.master_access.tablename,
      Master.master_access.selectColumns
    );

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Master.master_access.prefix_);
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

module.exports = {
    getAccess
}