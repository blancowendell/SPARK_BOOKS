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
  SelectWithJoinStatement,
  InsertStatementTransCommit,
} = require("../../services/repository/customhelper");
const { STATUS_LOG, TOKEN_TYPE } = require("../../services/repository/enum/enums");
const { log } = require("winston");
const { Master } = require("../../database/model/Master");
const { Transaction, TransactionWithReturn } = require("../../services/utility/utility");
const e = require("express");
const {
  genPassword,
  generateUniqueEmployeeId,
  createToken,
} = require("../../services/repository/helper");
const { SendEmail } = require("../../services/repository/mailer");
const { Maintenance } = require("../../database/model/Maintenance");

const loadEmployees = async (req, res) => {
     try {
    let companyId = req.session.user.company_id;

    let sql = SelectWithJoinStatement(
      Master.master_employee.tablename,
      Master.master_employee.selectColumns,
      {},
      [
        Master.master_employee.selectMiscColumns.fullname,
        Master.master_access.selectOptionColumns.name,
        Master.master_users.selectOptionColumns.status,
      ],
      [
        {
          type: "INNER",
          table: Master.master_users.tablename,
          on:
            Master.master_employee.selectOptionColumns.id +
            " = " +
            Master.master_users.selectOptionColumns.employeeid,
        },
        {
          type: "INNER",
          table: Master.master_access.tablename,
          on:
            Master.master_users.selectOptionColumns.access_id +
            " = " +
            Master.master_access.selectOptionColumns.id,
        },
      ],
    );

    SelectParameter(sql, [companyId], (err, result) => {
      if (err) {
        console.error(err);
        return res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Master.master_employee.prefix_);
        data = DataModeling(data, Master.master_access.prefix_);

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

const addEmployee = async (req, res) => {
    try {
    const { firstname, lastname, email, access, sequenceId } = req.body;

    if (!firstname || !lastname || !access) {
      return res
        .status(400)
        .json(
          JsonWarningResponse(
            MessageStatus.REQUIRED +
              "First Name, Last Name, are required."
          )
        );
    }

    let employeeId = await generateUniqueEmployeeId(sequenceId);

    const { password } = await genPassword({
      id: employeeId,
    });

    let encryptedPassword = EncrypterString(password);
    const username = email;

    // Check email exists
    let checkEmailStatement = SelectStatement(
      "SELECT * FROM master_employee WHERE me_email = ?",
      [email]
    );
    let emailResult = await Check(checkEmailStatement);
    if (emailResult.length > 0) {
      return res.status(400).json(JsonWarningResponse("Email already exists."));
    }

    // Get access type
    let accessName = SelectStatement(
      "SELECT ma_name FROM master_access WHERE ma_id = ?",
      [access]
    );
    let accessNameResult = await Check(accessName);
    const accessType = accessNameResult[0]?.ma_name;
    if (!accessType) {
      return res.status(404).json(JsonWarningResponse("Access level not found"));
    }

    // ================================
    // 1. Insert into master_employee
    // ================================
    const insertMasterEmployee = InsertStatementTransCommit(
      Master.master_employee.tablename,
      Master.master_employee.prefix,
      Master.master_employee.insertColumns
    );

    await TransactionWithReturn([
      { sql: insertMasterEmployee, values: [employeeId, firstname, lastname, email] },
    ]);

    // ================================
    // 2. Insert into master_users and get userId
    // ================================
    const insertMasterUsers = InsertStatementTransCommit(
      Master.master_users.tablename,
      Master.master_users.prefix,
      Master.master_users.insertColumns
    );

    const userInsertResult = await TransactionWithReturn([
      { sql: insertMasterUsers, values: [employeeId, access, username, encryptedPassword, "SetUp"] },
    ]);

    const userId = userInsertResult.insertId;

    // ================================
    // 3. Insert into maintenance_dashboards using userId
    // ================================
    const insertMaintenanceDashboard = InsertStatementTransCommit(
      Maintenance.maintenance_dashboards.tablename,
      Maintenance.maintenance_dashboards.prefix,
      Maintenance.maintenance_dashboards.insertColumns
    );

    await TransactionWithReturn([
      { sql: insertMaintenanceDashboard, values: [userId, accessType, 'Dashboard', 'Dashboard', lastname] },
    ]);

    // ================================
    // 4. Send email with credentials
    // ================================
    const emailHtml = `
      <h2>Credential Setup Successful</h2>
      <p>Your Credential <b>${firstname} ${lastname}</b> has been successfully validated.</p>
      <p>Here are your login credentials:</p>
      <ul>
        <li><b>Username:</b> ${username}</li>
        <li><b>Password:</b> ${password}</li>
      </ul>
      <p>Please keep them secure and change your password after first login.</p>
    `;

    await SendEmail(email, "Credential Setup Successful", emailHtml);

    return res.status(200).json(
      JsonSuccess({
        message:
          "Credential setup validated successfully. Credentials sent via email.",
        employeeId: employeeId,
        email: email,
      })
    );
  } catch (error) {
    console.log(error);
    res.json(JsonErrorResponse(error));
  }
};

const getEmployee = async (req, res) => {
    try {
    const { employeeId } = req.params;

    let sql = `SELECT
    me_id,
    me_first_name,
    me_last_name,
    me_email, 
    ma_name as me_access,
    ma_id as me_access_id,
    mu_status as me_status
    FROM master_employee
    INNER JOIN master_users ON master_employee.me_id = mu_employeeid
    INNER JOIN master_access ON master_users.mu_access_id = ma_id
    WHERE me_id = ?`;

    SelectParameter(sql, [employeeId], (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Master.master_employee.prefix_);
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

const updateEmployee = async (req, res) => {
    try {
    const { employeeId } = req.params;
    const { firstname, lastname, email, access, status } = req.body;

    let accStatus = status === true ? "ACTIVE" : "INACTIVE";

    if (!firstname || !lastname || !access) {
      return res
        .status(400)
        .json(
          JsonWarningResponse(
            MessageStatus.REQUIRED +
              "First Name, Last Name, Branch, Access, and Status are required."
          )
        );
    }

    let userSql = SelectWhereStatement(
      Master.master_users.tablename,
      Master.master_users.selectColumns,
      [
        Master.master_users.selectOptionColumns.employeeid,
        Master.master_users.selectOptionColumns.access_id,
      ],
      [employeeId, access]
    );

    let userResult = await Check(userSql);
    if (!userResult || userResult.length === 0) {
      return res.status(404).json(JsonWarningResponse("User not found"));
    }
    const userData = userResult[0];

    let queries = [];

    let updateEmployeeSql = UpdateStatement(
      Master.master_employee.tablename,
      Master.master_employee.prefix,
      [
        Master.master_employee.updateOptionColumns.first_name,
        Master.master_employee.updateOptionColumns.last_name,
        Master.master_employee.updateOptionColumns.email,
      ],
      [Master.master_employee.updateOptionColumns.id]
    );

    queries.push({
      sql: updateEmployeeSql,
      values: [firstname, lastname, email, employeeId],
    });

    let updateEmployeeUserSql = UpdateStatement(
      Master.master_users.tablename,
      Master.master_users.prefix,
      [
        Master.master_users.updateOptionColumns.access_id,
        Master.master_users.updateOptionColumns.status,
      ],
      [Master.master_users.updateOptionColumns.id]
    );

    queries.push({
      sql: updateEmployeeUserSql,
      values: [access, accStatus, userData.mu_id],
    });

    await Transaction(queries);

    return res.status(200).json(JsonSuccess("Employee updated successfully"));
  } catch (error) {
    console.error(error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        status: "error",
        msg: "exist",
        detail: "Email already exists. Please use another one.",
      });
    }

    return res
      .status(500)
      .json(JsonErrorResponse("Something went wrong while updating employee."));
  }
};

module.exports = {
    loadEmployees,
    addEmployee,
    getEmployee,
    updateEmployee
};