const { Master } = require("../../database/model/Master");
const { DataModeling } = require("../../services/data_modeling/Database");
const {
  SelectAllStatement,
  InsertStatementTransCommit,
  SelectStatement,
  GetCurrentDatetime,
  SelectWithJoinStatement,
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
const loadMasterCoa = async (req, res) => {
  try {
    // let sql = SelectAllStatement(
    //   Master.master_coa.tablename,
    //   Master.master_coa.selectColumns
    // );

    let sql = SelectWithJoinStatement(
      Master.master_coa.tablename,
      Master.master_coa.selectColumns,
      {},
      [
        Master.master_coa_type.selectOptionColumns.account_type
      ],
      [
        {
          type: "INNER",
          table: Master.master_coa_type.tablename,
          on:
            Master.master_coa.selectOptionColumns.coa_type_id +
            " = " +
            Master.master_coa_type.selectOptionColumns.id,
        },
      ]
    );

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Master.master_coa.prefix_);
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
const getMasterCoa = async (req, res) => {
  try {
    const { id } = req.params;

    let sql =
      SelectAllStatement(
        Master.master_coa.tablename,
        Master.master_coa.selectColumns
      ) + " WHERE mc_id = ?";

    SelectParameter(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Master.master_coa.prefix_);
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
const addMasterCoa = async (req, res) => {
  try {
    const { typeId, description, runningBal } = req.body;

    if (!typeId || !description || runningBal === undefined) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing required fields"));
    }

    const create_date = GetCurrentDatetime();
    const create_by = req.session.user.fullname;
    const status = STATUS_LOG.ACTIVE;

    // 1️⃣ Get segment range
    const segmentSql = SelectStatement(
      `
      SELECT mct_segment_start
      FROM master_coa_type
      WHERE mct_id = ?
        AND mct_status = 'ACTIVE'
      `,
      [typeId]
    );

    const segmentResult = await Check(segmentSql);

    if (!segmentResult || segmentResult.length === 0) {
      return res.status(400).json(JsonWarningResponse("Invalid COA Type"));
    }

    const [startStr, endStr] = segmentResult[0].mct_segment_start.split("-");

    const rangeStart = parseInt(startStr, 10);
    const rangeEnd = parseInt(endStr, 10);

    // 2️⃣ Get next account code
    const maxSql = SelectStatement(
      `
      SELECT MAX(mc_account_code) AS maxCode
      FROM master_coa
      WHERE mc_coa_type_id = ?
        AND mc_account_code BETWEEN ? AND ?
      `,
      [typeId, rangeStart, rangeEnd]
    );

    const maxResult = await Check(maxSql);

    const nextAccountCode = maxResult[0].maxCode
      ? parseInt(maxResult[0].maxCode, 10) + 1
      : rangeStart;

    // 3️⃣ Prevent overflow
    if (nextAccountCode > rangeEnd) {
      return res
        .status(409)
        .json(JsonWarningResponse("Account range exhausted for this COA type"));
    }

    // 4️⃣ Insert
    const sql = InsertStatementTransCommit(
      Master.master_coa.tablename,
      Master.master_coa.prefix,
      Master.master_coa.insertColumns
    );

    const data = [
      typeId,
      nextAccountCode,
      description,
      runningBal,
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
const editMasterCoa = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, runningBal, status } = req.body;

    if (!id || !description || runningBal === undefined || !status) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing required fields"));
    }

    if (![STATUS_LOG.ACTIVE, STATUS_LOG.INACTIVE].includes(status)) {
      return res.status(400).json(JsonWarningResponse("Invalid status value"));
    }

    const checkSql = SelectStatement(
      `
      SELECT 1
      FROM master_coa
      WHERE mc_id = ?
      `,
      [id]
    );

    const exists = await Check(checkSql);

    if (!exists || exists.length === 0) {
      return res
        .status(404)
        .json(JsonWarningResponse("Chart of Account not found"));
    }

    const modify_date = GetCurrentDatetime();
    const modify_by = req.session.user.fullname;

    const sql = UpdateStatement(
      Master.master_coa.tablename,
      Master.master_coa.prefix,
      [
        Master.master_coa.updateOptionColumns.description,
        Master.master_coa.updateOptionColumns.running_bal,
        Master.master_coa.updateOptionColumns.update_date,
        Master.master_coa.updateOptionColumns.create_by,
        Master.master_coa.updateOptionColumns.status,
      ],
      [Master.master_coa.updateOptionColumns.id]
    );

    const data = [description, runningBal, modify_date, modify_by, status, id];

    Update(sql, data, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json(JsonErrorResponse(err));
      }

      return res.json(JsonSuccess());
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(JsonErrorResponse(error));
  }
};

module.exports = {
  loadMasterCoa,
  getMasterCoa,
  addMasterCoa,
  editMasterCoa,
};
