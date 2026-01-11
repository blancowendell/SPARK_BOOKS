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
const { Transaction } = require("../../services/utility/utility");

const getPasswordStatus = async (req, res) => {
    try {
    let id = req.session.user.id;

    let sql = SelectWhereStatement(
      Master.master_users.tablename,
      Master.master_users.selectOptionColumns.is_update_password,
      [Master.master_users.selectOptionColumns.id],
      [id]
    );

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Master.master_users.prefix_);
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

const updatePassword = async (req, res) => {
    try {
    const { username, currentPassword, password, confirmPassword } = req.body;
    const id = req.session.user.id;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json(JsonWarningResponse("Passwords do not match"));
    }

    // Strong password policy (optional)
    // const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!strongPasswordRegex.test(password)) {
    //   return res.status(400).json(
    //     JsonWarningResponse(
    //       "Password must be at least 8 chars, with uppercase, lowercase, number, and special character."
    //     )
    //   );
    // }

    let userSql = SelectWhereStatement(
        Master.master_users.tablename,
        Master.master_users.selectColumns,
        [Master.master_users.selectOptionColumns.id],
        [id]
      );

    let userResult = await Check(userSql);
    if (!userResult || userResult.length === 0) {
      return res.status(404).json(JsonWarningResponse("User not found"));
    }
    const userData = userResult[0];

    const hashedCurrentPassword = EncrypterString(currentPassword);
    if (userData.mu_password !== hashedCurrentPassword) {
      return res
        .status(400)
        .json(JsonWarningResponse("Current password is incorrect"));
    }

    const hashedNewPassword = EncrypterString(password);
    if (userData.mu_password === hashedNewPassword) {
      return res
        .status(400)
        .json(JsonWarningResponse("You cannot reuse your old password."));
    }

    if (username && username !== userData.mu_username) {
      let existingUserSql = {
        sql: "SELECT mu_id FROM master_users WHERE mu_username = ? LIMIT 1",
        values: [username],
      };

      let existingUser = await Check(existingUserSql);
      if (existingUser.length > 0) {
        return res
          .status(400)
          .json(JsonWarningResponse("Username already exists."));
      }
    }

    // =====================
    // Build queries
    // =====================
    let queries = [];

    if (!username) {
      let updatePassword = UpdateStatement(
        Master.master_users.tablename,
        Master.master_users.prefix,
        [
          Master.master_users.updateOptionColumns.password,
          Master.master_users.updateOptionColumns.is_update_password,
        ],
        [Master.master_users.updateOptionColumns.id]
      );

      queries.push({
        sql: updatePassword,
        values: [hashedNewPassword, true, id],
      });
    } else {
      let updatePasswordUsername = UpdateStatement(
        Master.master_users.tablename,
        Master.master_users.prefix,
        [
          Master.master_users.updateOptionColumns.password,
          Master.master_users.updateOptionColumns.username,
          Master.master_users.updateOptionColumns.is_update_password,
        ],
        [Master.master_users.updateOptionColumns.id]
      );

      queries.push({
        sql: updatePasswordUsername,
        values: [hashedNewPassword, username, true, id],
      });
    }

    await Transaction(queries);

    return res
      .status(200)
      .json(JsonSuccess("Password updated successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(JsonErrorResponse(error));
  }
};

module.exports = {
    getPasswordStatus,
    updatePassword
};
