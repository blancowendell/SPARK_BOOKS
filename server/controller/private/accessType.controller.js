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
} = require("../../services/repository/customhelper");
const { STATUS_LOG } = require("../../services/repository/enum/enums");
const { log } = require("winston");
const { Master } = require("../../database/model/Master");
const { Maintenance } = require("../../database/model/Maintenance");
const {
  Transaction,
  TransactionWithReturn,
} = require("../../services/utility/utility");

const getAccessType = async (req, res) => {
  try {
    const { accessId } = req.params;

    const sql = SelectWithJoinStatement(
      Master.master_access_types.tablename,
      Master.master_access_types.selectColumns,
      {},
      [Master.master_access.selectOptionColumns.name],
      [
        {
          type: "LEFT",
          table: Master.master_access.tablename,
          on:
            Master.master_access_types.selectOptionColumns.access_id +
            " = " +
            Master.master_access.selectOptionColumns.id,
        },
      ],
      `ma_id = ?`
    );

    SelectParameter(sql, [accessId], (err, result) => {
      if (err) {
        console.error(err);
        return res.json(JsonErrorResponse(err));
      }

      if (result && result.length > 0) {
        const data = DataModeling(
          result,
          Master.master_access_types.prefix_
        ).map((item) => ({
          ...item,
          status:
            item.status === 1 || item.status === "1" ? "ACTIVE" : "INACTIVE",
        }));

        return res.json(JsonDataResponse(data));
      } else {
        return res.json(JsonDataResponse([]));
      }
    });
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

const updateAccessType = async (req, res) => {
  try {
    const { accessTypeId } = req.params;
    let createBy = req.session.user.fullname;
    let typeStatus = req.body.typeStatus;

    let booleanStatus = typeStatus === "ACTIVE" ? true : false;

    if (!typeStatus || !accessTypeId) {
      return res
        .status(400)
        .json(
          JsonWarningResponse(
            MessageStatus.REQUIRED + "Access Type, Status are required."
          )
        );
    }

    let updateSql = UpdateStatement(
      Master.master_access_types.tablename,
      Master.master_access_types.prefix,
      [
        Master.master_access_types.updateOptionColumns.status,
        Master.master_access_types.updateOptionColumns.create_by,
      ],
      [Master.master_access_types.updateOptionColumns.id]
    );

    let updateSqlData = [booleanStatus, createBy, accessTypeId];

    Update(updateSql, updateSqlData, (err, result) => {
      if (err) {
        res.status(500).json(JsonErrorResponse(err));
      }
      res.status(200).json(JsonSuccess());
    });
  } catch (error) {
    console.log(error);
    res.json(JsonErrorResponse(error));
  }
};

module.exports = {
  getAccessType,
  updateAccessType,
};

router.get("/get-access-type/:accessId", async (req, res) => {});

router.put("/update-access-type/:accessTypeId", async (req, res) => {});
