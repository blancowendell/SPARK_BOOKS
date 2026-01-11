const { Master } = require("../../database/model/Master");
const { Coa } = require("../../database/model/Coa");
const { DataModeling } = require("../../services/data_modeling/Database");
const {
  SelectAllStatement,
  InsertStatementTransCommit,
  SelectStatement,
  GetCurrentDatetime,
  SelectWithJoinStatement,
  SelectWhereStatement,
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
const loadCoaRunBal = async (req, res) => {
  try {
  
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};


// GET BY ID
const getCoaRunBal = async (req, res) => {
  try {
    const { id } = req.params;

    let sql = SelectWhereStatement(
      Coa.coa_run_bal.tablename,
      Coa.coa_run_bal.selectColumns,
      [Coa.coa_run_bal.selectOptionColumns.coa_id],
      [id]
    );

    SelectParameter(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Coa.coa_run_bal.prefix_);
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
const addCoaRunBal = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// PUT
const editCoaRunBal = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

module.exports = {
  loadCoaRunBal,
  getCoaRunBal,
  addCoaRunBal,
  editCoaRunBal,
};
