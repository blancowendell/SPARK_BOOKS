var express = require("express");
const {
  Encrypter,
  EncrypterString,
} = require("../../services/repository/cryptography");
const mysql = require("../../services/repository/Database");
var router = express.Router();
const nodemailer = require("nodemailer");
const { UserLogin } = require("../../services/repository/helper");
const jwt = require("jsonwebtoken");
const {
  Select,
  SelectParameter,
} = require("../../services/repository/dbconnect");
const {
  JsonErrorResponse,
  JsonDataResponse,
  MessageStatus,
  JsonWarningResponse,
} = require("../../services/repository/response");
const { DataModeling } = require("../../services/data_modeling/Database");
const {
  SelectAllStatement,
  SelectWhereStatement,
} = require("../../services/repository/customhelper");
const { Master } = require("../../database/model/Master");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username, password);

    if (!username || !password) {
      return res
        .status(400)
        .json(JsonWarningResponse("Username and password are required."));
    }

    const select_sql = `
     SELECT
      mu_id,
      mu_employeeid,
      CONCAT(me_first_name,' ',me_last_name) as mu_fullname,
      mu_password,
      mu_access_id,
      ma_name as mu_role,
      mu_status
      FROM master_users
      INNER JOIN master_employee ON master_users.mu_employeeid = me_id
      INNER JOIN master_access ON master_users.mu_access_id = ma_id
      WHERE mu_username = ?
    `;

    SelectParameter(select_sql, [username], async (err, result) => {
      if (err) return res.status(500).json(JsonErrorResponse(err));

      if (result && result.length > 0) {
        const user = DataModeling(result, Master.master_users.prefix_)[0];

        const encryptedPassword = EncrypterString(password);

        if (user.password !== encryptedPassword) {
          return res
            .status(401)
            .json(JsonWarningResponse(MessageStatus.INCORRECT));
        }

        if (user.status !== "ACTIVE") {
          return res
            .status(403)
            .json(JsonWarningResponse(MessageStatus.INACTIVE));
        }

        const dashboardSql = SelectWhereStatement(
          "maintenance_dashboards",
          "md_id",
          ["md_user_id", "md_user_type"],
          [user.id, `'${user.role}'`]
        );

        Select(dashboardSql, (err, result) => {
          if (err) {
            console.error("Error fetching dashboard:", err);
            return res.status(500).json(JsonErrorResponse(err));
          }

          let dashboardId = result[0].md_id;

          const tokenPayload = {
            username: user.username,
            fullname: user.fullname,
          };

          const rawJwt = jwt.sign(
            JSON.stringify(tokenPayload),
            process.env._SECRET_KEY
          );
          const encryptedJwt = EncrypterString(rawJwt, {});

          req.session.jwt = encryptedJwt;
          req.session.user = {
            id: user.id,
            fullname: user.fullname,
            username: user.username,
            access_type: user.role,
            dashboard_id: dashboardId,
          };

          req.session.save((err) => {
            if (err)
              return res
                .status(500)
                .json(JsonErrorResponse("Failed to create session."));

            const { password, ...userWithoutPassword } = user;

            return res.status(200).json(
              JsonDataResponse({
                ...userWithoutPassword,
                token: encryptedJwt,
                access_type: user.role,
              })
            );
          });
        });
      } else {
        return res
          .status(401)
          .json(JsonWarningResponse(MessageStatus.INCORRECT));
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json(JsonErrorResponse(error.message));
  }
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.status(500).json(JsonErrorResponse("Failed to logout."));
    }

    res.clearCookie("connect.sid");

    return res.status(200).json({ msg: "Logged out successfully." });
  });
};

const session = async (req, res) => {
  if (req.session && req.session.user) {
    return res.status(200).json({
      success: true,
      user: req.session.user,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Not logged in.",
    });
  }
};

module.exports = {
  login,
  logout,
  session,
};
