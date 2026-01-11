var express = require("express");
const { Encrypter, EncrypterString } = require("../../services/repository/cryptography");
const mysql = require("../../services/repository/Database");
var router = express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { Select, Insert, Update, Check } = require("../../services/repository/dbconnect");
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
const { Master } = require("../../database/model/Master");
const { Maintenance } = require("../../database/model/Maintenance");
const { Transaction } = require("../../services/utility/utility");



//#region Sequence Id Maintenance

const loadSequence = async (req, res) => {
    try {
    let select_sql =
      SelectAllStatement(
        Maintenance.maintenance_sequence.tablename,
        Maintenance.maintenance_sequence.selectColumns
      )
    //   ) + " ORDER BY ms_employee_level ASC";

    Select(select_sql, (err, result) => {
      if (err) {
        return res.status(500).json(JsonErrorResponse(err));
      }

      if (result !== 0) {
        let data = DataModeling(result, Maintenance.maintenance_sequence.prefix_);
        const now = new Date();
        data.forEach((seq) => {
          const dateParts = [];
          if (seq.include_year) {
            const fullYear = now.getFullYear().toString();
            const formattedYear = seq.year_format === "YY" ? fullYear.slice(2) : fullYear;
            dateParts.push(formattedYear);
          }
          if (seq.include_month) {
            dateParts.push(String(now.getMonth() + 1).padStart(2, "0"));
          }
          if (seq.include_day) {
            dateParts.push(String(now.getDate()).padStart(2, "0"));
          }
          const datePart = dateParts.join(seq.separator || "");
          const paddedNum = String(seq.start_number).padStart(seq.padding_length, "0");
          seq.preview = `${seq.prefix}${datePart ? datePart + (seq.separator || "") : ""}${paddedNum}`;
        });
        res.status(200).json(JsonDataResponse(data));
      } else {
        res.status(200).json(JsonDataResponse(result));
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(JsonErrorResponse(error));
  }
};

const loadListSequence = async (req, res) => {
    try {
        let sql = `SELECT
        ms_id,
        ms_employee_level
        FROM maintenance_sequence`;

        Select(sql, (err, result) => {
            if (err) {
                console.error(err);
                res.json(JsonErrorResponse(err));
            }

            if (result != 0) {
                let data = DataModeling(result, "ms_");
                res.json(JsonDataResponse(data));
            } else {
                res.json(JsonDataResponse(result));
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(JsonErrorResponse(error));
    }
};

const addSequence = async (req, res) => {
    try {
        const {
            employee_level,
            prefix,
            seperator,
            start_number,
            padding_length,
            include_year,
            year_format,
            include_month,
            include_day
        } = req.body;

        if (!employee_level || !start_number || !padding_length) {
            return res.status(400).json(JsonErrorResponse("Missing required fields."));
        }

        console.log(req.body);
        

        const year = include_year ? 1 : 0;
        const month = include_month ? 1 : 0;
        const day = include_day ? 1 : 0;

        let insert_data = [[
            employee_level,
            prefix,
            seperator,
            start_number,
            padding_length,
            year,
            year_format,
            month,
            day,
        ]];

        let insert_sql = InsertStatement(
            Maintenance.maintenance_sequence.tablename,
            Maintenance.maintenance_sequence.prefix,
            Maintenance.maintenance_sequence.insertColumns
        );

        let validationQuery1 = SelectStatement(
            "SELECT * FROM maintenance_sequence WHERE ms_employee_level = ? ",
            [employee_level]
        );

        let validationQuery2 = SelectStatement(
            "SELECT * FROM maintenance_sequence WHERE ms_employee_level = ? AND ms_prefix = ? AND ms_separator = ? AND ms_start_number = ? AND ms_padding_length = ?",
            [employee_level, prefix, seperator, start_number, padding_length]
        );

        Check(validationQuery1)
            .then((result1) => {
                if (result1.length > 0) {
                    return Promise.reject(
                        JsonWarningResponse(MessageStatus.EXIST, MessageStatus.EXISTEMPTYPE)
                    );
                }
                return Check(validationQuery2);
            })
            .then((result2) => {
                if (result2.length > 0) {
                    return Promise.reject(
                        JsonWarningResponse(MessageStatus.EXIST)
                    );
                }
                Insert(insert_sql, insert_data, async (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.json(JsonErrorResponse(err));
                    }
                    res.status(200).json(JsonSuccess());
                });
            })
            .catch((error) => {
                console.log(error);
                return res.json(error);
            });
    } catch (error) {
        console.log(error);
        res.status(500).json(JsonErrorResponse(error));
    }
};

const getSequence = async (req, res) => {
    const { id } = req.body;
    try {
        let sql = `SELECT * FROM maintenance_sequence WHERE ms_id = '${id}'`;

        Select(sql, (err, result) => {
            if (err) {
                console.error(err);
                res.json(JsonErrorResponse(err));
            }

            if (result != 0) {
                let data = DataModeling(result, "ms_");
                res.json(JsonDataResponse(data));
            } else {
                res.json(JsonDataResponse(result));
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(JsonErrorResponse(error));
    }
};

const editSequence = async (req, res) => {
     try {
        const { id, padding_length } = req.body;

        let update_data = [padding_length, id];
        let update_sql = UpdateStatement(
            Maintenance.maintenance_sequence.tablename,
            Maintenance.maintenance_sequence.prefix,
            [
                Maintenance.maintenance_sequence.updateOptionColumns.padding_length,
            ],
            [Maintenance.maintenance_sequence.updateOptionColumns.id]
        );

        let checkStatement = SelectStatement(
            "SELECT * FROM maintenance_sequence WHERE ms_padding_length = ? AND ms_id = ?",
            [padding_length, id]
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
        console.log(error);

        res.status(500).json(JsonErrorResponse(error));
    }
};

module.exports = {
    loadSequence,
    loadListSequence,
    addSequence,
    getSequence,
    editSequence
};




//#endregion
