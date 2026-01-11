const { Master } = require("../../database/model/Master");
const { DataModeling } = require("../../services/data_modeling/Database");
const {
  SelectAllStatement,
  InsertStatementTransCommit,
  SelectStatement,
  GetCurrentDatetime,
} = require("../../services/repository/customhelper");
const {
  Select,
  Update,
  Check,
  SelectParameter,
} = require("../../services/repository/dbconnect");
const {
  STATUS_LOG,
} = require("../../services/repository/enum/enums");
const { UpdateStatement } = require("../../services/repository/helper");
const {
  JsonErrorResponse,
  JsonDataResponse,
  MessageStatus,
  JsonSuccess,
  JsonWarningResponse,
} = require("../../services/repository/response");
const { TransactionWithReturn } = require("../../services/utility/utility");

// GET
const loadMasterVendorType = async (req, res) => {
  try {
    let sql = SelectAllStatement(
      Master.master_vendor_type.tablename,
      Master.master_vendor_type.selectColumns
    );

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Master.master_vendor_type.prefix_);
        res.json(JsonDataResponse(data));
      } else {
        res.json(JsonDataResponse(result));
      }
    });
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// GET BY ID
const getMasterVendorType = async (req, res) => {
  try {
    const { id } = req.params;

    let sql =
      SelectAllStatement(
        Master.master_vendor_type.tablename,
        Master.master_vendor_type.selectColumns
      ) + " WHERE mvt_id = ?";

    SelectParameter(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Master.master_vendor_type.prefix_);
        res.json(JsonDataResponse(data));
      } else {
        res.json(JsonDataResponse(result));
      }
    });
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// POST
const addMasterVendorType = async (req, res) => {
  try {
    const { typeName, description } = req.body;

    if (!typeName || !description) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing required fields"));
    }

    const create_date = GetCurrentDatetime();
    const create_by = req.session.user.fullname;
    const status = STATUS_LOG.ACTIVE;

    const checkStatement = SelectStatement(
      `
      SELECT 1
      FROM master_vendor_type
      WHERE mvt_type_name = ?
      `,
      [typeName]
    );

    const exists = await Check(checkStatement);

    if (exists.length > 0) {
      return res
        .status(409)
        .json(JsonWarningResponse("Type name already exists"));
    }

    const sql = InsertStatementTransCommit(
      Master.master_vendor_type.tablename,
      Master.master_vendor_type.prefix,
      Master.master_vendor_type.insertColumns
    );

    const data = [
      typeName,
      description,
      create_by,
      create_date,
      create_date,
      status,
    ];

    await TransactionWithReturn([{ sql, values: data }]);

    return res.json(JsonSuccess());
  } catch (error) {
    console.error(error);
    return res.status(500).json(JsonErrorResponse(error));
  }
};

// PUT
const editMasterVendorType = async (req, res) => {
   try {
    const { id } = req.params;
    const { typeName, description, status } = req.body;

    if (!typeName || !description) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing required fields"));
    }

    let modify_date = GetCurrentDatetime();
    let modify_by = req.session.user.fullname;

    let sql = UpdateStatement(
      Master.master_vendor_type.tablename,
      Master.master_vendor_type.prefix,
      [
        Master.master_vendor_type.updateOptionColumns.type_name,
        Master.master_vendor_type.updateOptionColumns.description,
        Master.master_vendor_type.updateOptionColumns.update_date,
        Master.master_vendor_type.updateOptionColumns.create_by,
        Master.master_vendor_type.updateOptionColumns.status,
      ],
      [Master.master_vendor_type.updateOptionColumns.id]
    );

    let data = [typeName, description, modify_date, modify_by, status, id];

    // const checkStatementName = SelectStatement(
    //   `
    //   SELECT 1
    //   FROM master_vendor_type
    //   WHERE mvt_type_name = ?
    //   `,
    //   [typeName]
    // );

    // const exists = await Check(checkStatementName);

    // if (exists.length > 0) {
    //   return res
    //     .status(409)
    //     .json(JsonWarningResponse("Type name already exists"));
    // }

    let checkStatement = SelectStatement(
      "SELECT * FROM master_vendor_type WHERE mvt_id = ? AND mvt_type_name = ? AND mvt_description = ? AND mvt_status = ?",
      [id, typeName, description, status]
    );

    Check(checkStatement)
      .then((result) => {
        if (result != 0) {
          return res.status(400).json(JsonWarningResponse(MessageStatus.EXIST));
        } else {
          Update(sql, data, (err, result) => {
            if (err) {
              console.error(err);
              res.json(JsonErrorResponse(err));
            }
            res.json(JsonSuccess());
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.json(JsonErrorResponse(error));
      });
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

module.exports = {
  loadMasterVendorType,
  getMasterVendorType,
  addMasterVendorType,
  editMasterVendorType,
};
