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
  COA_ACCOUNT_TYPES,
  COA_SEGMENT_RANGES,
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
const loadMasterInventoryMethods = async (req, res) => {
  try {
    let sql = SelectAllStatement(
      Master.master_inventory_methods.tablename,
      Master.master_inventory_methods.selectColumns
    );

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Master.master_inventory_methods.prefix_);
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
const getMasterInventoryMethods = async (req, res) => {
  try {
    const { id } = req.params;

    let sql =
      SelectAllStatement(
        Master.master_inventory_methods.tablename,
        Master.master_inventory_methods.selectColumns
      ) + " WHERE mim_id = ?";

    SelectParameter(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Master.master_inventory_methods.prefix_);
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
const addMasterInventoryMethods = async (req, res) => {
  try {
    const { code, methodName, methodDescription } = req.body;

    if (!code || !methodName || !methodDescription) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing required fields"));
    }

    const create_date = GetCurrentDatetime();
    // const create_by = req.session.user.fullname;
    const status = STATUS_LOG.ACTIVE;

    const checkStatement = SelectStatement(
      `
      SELECT 1
      FROM master_inventory_methods
      WHERE mim_code = ?
      `,
      [code]
    );

    const exists = await Check(checkStatement);

    if (exists.length > 0) {
      return res
        .status(409)
        .json(JsonWarningResponse("Type name already exists"));
    }

    const sql = InsertStatementTransCommit(
      Master.master_inventory_methods.tablename,
      Master.master_inventory_methods.prefix,
      Master.master_inventory_methods.insertColumns
    );

    const data = [
      code,
      methodName,
      methodDescription,
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
const editMasterInventoryMethods = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, methodName, methodDescription, status } = req.body;

    if (!code || !methodName || !methodDescription) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing required fields"));
    }

    let modify_date = GetCurrentDatetime();
    // let modify_by = req.session.user.fullname;

    let sql = UpdateStatement(
      Master.master_inventory_methods.tablename,
      Master.master_inventory_methods.prefix,
      [
        Master.master_inventory_methods.updateOptionColumns.code,
        Master.master_inventory_methods.updateOptionColumns.method_name,
        Master.master_inventory_methods.updateOptionColumns.method_description,
        Master.master_inventory_methods.updateOptionColumns.update_date,
        Master.master_inventory_methods.updateOptionColumns.status,
      ],
      [Master.master_inventory_methods.updateOptionColumns.id]
    );

    let data = [code, methodName, methodDescription, modify_date, status, id];

    // const checkStatementName = SelectStatement(
    //   `
    //   SELECT 1
    //   FROM master_inventory_methods
    //   WHERE mim_code = ?
    //   `,
    //   [code]
    // );

    // const exists = await Check(checkStatementName);

    // if (exists.length > 0) {
    //   return res
    //     .status(409)
    //     .json(JsonWarningResponse("Type name already exists"));
    // }

    let checkStatement = SelectStatement(
      "SELECT * FROM master_inventory_methods WHERE mim_id = ? AND mim_code = ? AND mim_method_name = ? AND mim_method_description = ? AND mim_status = ?",
      [id, code, methodName, methodDescription, status]
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
  loadMasterInventoryMethods,
  getMasterInventoryMethods,
  addMasterInventoryMethods,
  editMasterInventoryMethods,
};
