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
const { Account } = require("../../database/model/Account");
const { Sale } = require("../../database/model/Sale");

// GET
const loadAccountsReceivableCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    const sql = SelectWithJoinStatement(
      Account.accounts_receivable.tablename,
      Account.accounts_receivable.selectColumns,
      {},
      [Sale.sales_invoice.selectOptionColumns.invoice_no],
      [
        {
          type: "LEFT",
          table: Sale.sales_invoice.tablename,
          on:
            Account.accounts_receivable.selectOptionColumns.invoice_id +
            " = " +
            Sale.sales_invoice.selectOptionColumns.id,
        },
      ],
      `ar_customer_id = ?`
    );

    SelectParameter(sql, [customerId], (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Account.accounts_receivable.prefix_);
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

const loadAccountsReceivableVendors = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const sql = SelectWithJoinStatement(
      Account.accounts_receivable.tablename,
      Account.accounts_receivable.selectColumns,
      {},
      [Sale.sales_invoice.selectOptionColumns.invoice_no],
      [
        {
          type: "LEFT",
          table: Sale.sales_invoice.tablename,
          on:
            Account.accounts_receivable.selectOptionColumns.invoice_id +
            " = " +
            Sale.sales_invoice.selectOptionColumns.id,
        },
      ],
      `ar_vendor_id = ?`
    );

    SelectParameter(sql, [vendorId], (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Account.accounts_receivable.prefix_);
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
const getAccountsReceivable = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// POST
const addAccountsReceivable = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// PUT
const editAccountsReceivable = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

module.exports = {
  loadAccountsReceivableCustomer,
  loadAccountsReceivableVendors,
  getAccountsReceivable,
  addAccountsReceivable,
  editAccountsReceivable,
};
