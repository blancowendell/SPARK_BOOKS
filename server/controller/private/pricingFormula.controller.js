const { Pricing } = require("../../database/model/Pricing");
const { DataModeling } = require("../../services/data_modeling/Database");
const {
  SelectWhereStatement,
  SelectStatement,
  InsertStatementTransCommit,
  GetCurrentDatetime,
  UpdateStatement,
  SelectAllStatement,
} = require("../../services/repository/customhelper");
const {
  Select,
  SelectParameter,
  Update,
  Check,
} = require("../../services/repository/dbconnect");
const {
  JsonErrorResponse,
  JsonDataResponse,
  JsonSuccess,
  MessageStatus,
  JsonWarningResponse,
} = require("../../services/repository/response");
const { TransactionWithReturn } = require("../../services/utility/utility");
const { STATUS_LOG } = require("../../services/repository/enum/enums");

// GET
const loadPricingFormula = async (req, res) => {
  try {
    let sql = SelectAllStatement(
      Pricing.pricing_formula.tablename,
      Pricing.pricing_formula.selectColumns,
    );

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Pricing.pricing_formula.prefix_);
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
const getPricingFormula = async (req, res) => {
  try {
    const { pricingId } = req.params;

    let sql = SelectWhereStatement(
      Pricing.pricing_formula.tablename,
      Pricing.pricing_formula.selectColumns,
      [Pricing.pricing_formula.selectOptionColumns.id],
      [pricingId],
    );

    SelectParameter(sql, [pricingId], (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Pricing.pricing_formula.prefix_);
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
const addPricingFormula = async (req, res) => {
  try {
    const { code, name, pricingType, operation, value, roundingPrecision } =
      req.body;

    const create_date = GetCurrentDatetime();
    const create_by = req.session.user.username;

    if (
      !code ||
      !name ||
      !pricingType ||
      !operation ||
      !value ||
      !roundingPrecision
    ) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing required fields"));
    }

    const allowedOperations = ["INCREASE", "DECREASE"];
    const allowedPricingTypes = ["PERCENT", "AMOUNT"];
    const allowedRoundingRules = [
      "NONE",
      "ROUND_UP",
      "ROUND_DOWN",
      "ROUND_NEAREST",
    ];

    if (!allowedOperations.includes(operation)) {
      return res.status(400).json(JsonWarningResponse("Invalid operation"));
    }

    if (!allowedPricingTypes.includes(pricingType)) {
      return res.status(400).json(JsonWarningResponse("Invalid pricing type"));
    }

    if (!allowedRoundingRules.includes(roundingPrecision)) {
      return res
        .status(400)
        .json(JsonWarningResponse("Invalid rounding precision"));
    }

    const sql = InsertStatementTransCommit(
      Pricing.pricing_formula.tablename,
      Pricing.pricing_formula.prefix,
      Pricing.pricing_formula.insertColumns,
    );

    const data = [
      code,
      name,
      pricingType,
      operation,
      value,
      roundingPrecision,
      null,
      create_date,
      create_by,
    ];

    await TransactionWithReturn([{ sql, values: data }]);

    return res.json(JsonSuccess());
  } catch (error) {
    console.error(error);
    return res.status(500).json(JsonErrorResponse(error));
  }
};

// PUT
const editPricingFormula = async (req, res) => {
  try {
    const { pricingId } = req.params;
    const {
      code,
      name,
      pricingType,
      operation,
      value,
      roundingPrecision,
      status,
    } = req.body;

    if (!pricingId) {
      return res
        .status(400)
        .json(JsonWarningResponse("Pricing ID is required"));
    }

    let modify_date = GetCurrentDatetime();
    let modify_by = req.session.user.fullname;

    const allowedOperations = ["INCREASE", "DECREASE"];
    const allowedPricingTypes = ["PERCENT", "AMOUNT"];
    const allowedRoundingRules = [
      "NONE",
      "ROUND_UP",
      "ROUND_DOWN",
      "ROUND_NEAREST",
    ];

    if (!allowedOperations.includes(operation)) {
      return res.status(400).json(JsonWarningResponse("Invalid operation"));
    }

    if (!allowedPricingTypes.includes(pricingType)) {
      return res.status(400).json(JsonWarningResponse("Invalid pricing type"));
    }

    if (!allowedRoundingRules.includes(roundingPrecision)) {
      return res
        .status(400)
        .json(JsonWarningResponse("Invalid rounding precision"));
    }

    let sql = UpdateStatement(
      Pricing.pricing_formula.tablename,
      Pricing.pricing_formula.prefix,
      [
        Pricing.pricing_formula.updateOptionColumns.code,
        Pricing.pricing_formula.updateOptionColumns.name,
        Pricing.pricing_formula.updateOptionColumns.pricing_type,
        Pricing.pricing_formula.updateOptionColumns.operation,
        Pricing.pricing_formula.updateOptionColumns.value,
        Pricing.pricing_formula.updateOptionColumns.rounding_rule,
        Pricing.pricing_formula.updateOptionColumns.status,
        Pricing.pricing_formula.updateOptionColumns.created_at,
        Pricing.pricing_formula.updateOptionColumns.created_by,
      ],
      [Pricing.pricing_formula.updateOptionColumns.id],
    );

    let data = [
      code,
      name,
      pricingType,
      operation,
      value,
      roundingPrecision,
      status,
      modify_date,
      modify_by,
      pricingId,
    ];

    let checkStatement = SelectStatement(
      "SELECT * FROM pricing_formula WHERE pf_id = ? AND pf_code = ? AND pf_name = ? AND pf_pricing_type = ? AND pf_operation = ? AND pf_value = ? AND pf_rounding_rule = ? AND pf_status = ? AND pf_created_at = ? AND pf_created_by = ?",
      [
        pricingId,
        code,
        name,
        pricingType,
        operation,
        value,
        roundingPrecision,
        status,
        modify_date,
        modify_by,
      ],
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
  loadPricingFormula,
  getPricingFormula,
  addPricingFormula,
  editPricingFormula,
};
