var express = require("express");
const { Encrypter, EncrypterString } = require("../../services/repository/cryptography");
const mysql = require("../../services/repository/Database");
var router = express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { Select, Insert, Update } = require("../../services/repository/dbconnect");
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


const ticketNewToday = async (req, res) => {
    try {
        let sql = `SELECT COUNT(*) as t_new_ticket  FROM tickets WHERE DATE(t_created_at) = CURDATE()
        AND t_status = 'REQUESTED'`;

        Select(sql, (err, result) => {
            if (err) {
                console.error(err);
                res.json(JsonErrorResponse(err));
            }

            if (result != 0) {
                let data = DataModeling(result, "t_");
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

const ticketGraphAllStatus = async (req, res) => {
    try {
        let sql = `SELECT 
        t_status,
        COUNT(*) AS t_status_count
        FROM tickets
        WHERE 
        t_created_at >= DATE_FORMAT(CURDATE(), '%Y-%m-01') AND 
        t_created_at < DATE_FORMAT(CURDATE() + INTERVAL 1 MONTH, '%Y-%m-01')
        GROUP BY t_status`;

        Select(sql, (err, result) => {
            if (err) {
                console.error(err);
                res.json(JsonErrorResponse(err));
            }

            if (result != 0) {
                let data = DataModeling(result, "t_");
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
    ticketNewToday,
    ticketGraphAllStatus
};