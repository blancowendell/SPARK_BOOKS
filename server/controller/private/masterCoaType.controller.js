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
const loadMasterCoaType = async (req, res) => {
  try {
    let sql = SelectAllStatement(
      Master.master_coa_type.tablename,
      Master.master_coa_type.selectColumns
    );

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Master.master_coa_type.prefix_);
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
const getMasterCoaType = async (req, res) => {
  try {
    const { id } = req.params;

    let sql =
      SelectAllStatement(
        Master.master_coa_type.tablename,
        Master.master_coa_type.selectColumns
      ) + " WHERE mct_id = ?";

    SelectParameter(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Master.master_coa_type.prefix_);
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
const addMasterCoaType = async (req, res) => {
  try {
    const { accountName, accountType, segmentStart } = req.body;

    if (!accountName || !accountType || !segmentStart) {
      return res.status(400).json(
        JsonWarningResponse("Missing required fields")
      );
    }

    if (!COA_ACCOUNT_TYPES.includes(accountType)) {
      return res.status(400).json(
        JsonWarningResponse("Invalid account type value")
      );
    }

    if (!COA_SEGMENT_RANGES.includes(segmentStart)) {
      return res.status(400).json(
        JsonWarningResponse("Invalid segment range value")
      );
    }

    const create_date = GetCurrentDatetime();
    const create_by = req.session.user.username;
    const status = STATUS_LOG.ACTIVE;

    const segmentCheck = SelectStatement(
      `
      SELECT 1
      FROM master_coa_type
      WHERE mct_account_type = ?
        AND mct_segment_start = ?
      `,
      [accountType, segmentStart]
    );

    if (await Check(segmentCheck)) {
      return res.status(409).json(
        JsonWarningResponse(
          "Segment range is already used for this account type"
        )
      );
    }

    const sql = InsertStatementTransCommit(
      Master.master_coa_type.tablename,
      Master.master_coa_type.prefix,
      Master.master_coa_type.insertColumns
    );

    const data = [
      accountName,
      accountType,
      segmentStart,
      create_date,
      create_by,
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
const editMasterCoaType = async (req, res) => {
  try {
    const { id } = req.params;
    const { accountName, accountType, segmentStart } = req.body;

    if (!accountName || !accountType || !segmentStart) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing required fields"));
    }

    if (!COA_ACCOUNT_TYPES.includes(accountType)) {
      return res
        .status(400)
        .json(JsonWarningResponse("Invalid account type value"));
    }

    if (!COA_SEGMENT_RANGES.includes(segmentStart)) {
      return res
        .status(400)
        .json(JsonWarningResponse("Invalid segment range value"));
    }

    let modify_date = GetCurrentDatetime();
    let modify_by = req.session.user.fullname;

    let sql = UpdateStatement(
      Master.master_coa_type.tablename,
      Master.master_coa_type.prefix,
      [
        Master.master_coa_type.updateOptionColumns.account_name,
        Master.master_coa_type.updateOptionColumns.account_type,
        Master.master_coa_type.updateOptionColumns.segment_start,
        Master.master_coa_type.updateOptionColumns.update_date,
        Master.master_coa_type.updateOptionColumns.create_by,
      ],
      [Master.master_coa_type.updateOptionColumns.id]
    );

    let data = [
      accountName,
      accountType,
      segmentStart,
      modify_date,
      modify_by,
      id,
    ];

    let checkStatementFirst = SelectStatement(
      `
        SELECT 1
        FROM master_coa_type
        WHERE mct_account_type = ?
          AND mct_segment_start = ?
          AND mct_id != ?
        `,
      [accountType, segmentStart, id]
    );

    const result = await Check(checkStatementFirst);

    if (result !== 0) {
      return res
        .status(400)
        .json(
          JsonWarningResponse(
            "Segment range is already used for this account type"
          )
        );
    }

    let checkStatement = SelectStatement(
      "SELECT * FROM master_coa_type WHERE mct_id = ? AND mct_account_name = ? AND mct_account_type = ? AND mct_segment_start = ?",
      [id, accountName, accountType, segmentStart]
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
  loadMasterCoaType,
  getMasterCoaType,
  addMasterCoaType,
  editMasterCoaType,
};
