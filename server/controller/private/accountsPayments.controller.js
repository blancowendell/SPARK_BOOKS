const { Account } = require("../../database/model/Account");
const { Coa } = require("../../database/model/Coa");
const { Master } = require("../../database/model/Master");
const {
  GetCurrentDatetime,
  InsertStatementTransCommit,
} = require("../../services/repository/customhelper");
const { RUNNING_BAL, PAYMENT_STATUS } = require("../../services/repository/enum/enums");
const { UpdateStatement } = require("../../services/repository/helper");
const {
  JsonErrorResponse,
  JsonSuccess,
} = require("../../services/repository/response");
const { TransactionWithReturn } = require("../../services/utility/utility");

// GET
const loadAccountsPayments = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// GET BY ID
const getAccountsPayments = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// POST
const addAccountsPayments = async (req, res) => {
  try {
    const {
      receivableId,
      accountType,
      coaId,
      customerId,
      vendorId,
      invoiceIds,
      purchaseOrderIds,
      referenceNo,
      recieptNo,
      amountPayment,
      paymentMethod,
      paymentDate,
    } = req.body;

    if (
      !coaId ||
      !referenceNo ||
      !recieptNo ||
      !amountPayment ||
      !paymentMethod ||
      !paymentDate
    ) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing required fields"));
    }

    if (accountType === "Customer" && (!customerId || !invoiceIds || !receivableId)) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing customer payment fields"));
    }

    if (accountType !== "Customer" && (!vendorId || !purchaseOrderIds)) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing vendor payment fields"));
    }

    const created_at = GetCurrentDatetime();
    const create_by = String(req.session?.user?.fullname || "SYSTEM");
    const status = STATUS_LOG.ACTIVE;

    const result = await TransactionWithReturn(async (connection) => {
      /* =====================================================
         1. GET CURRENT RECEIVABLE (FOR CALCULATION)
      ===================================================== */
      const [[receivable]] = await connection.execute(
        `SELECT ar_balance FROM ${Account.accounts_receivable.tablename} WHERE ar_id = ?`,
        [receivableId]
      );

      if (!receivable) {
        throw new Error("Accounts receivable not found");
      }

      /* =====================================================
         2. PAYMENT CALCULATION (THIS IS WHAT YOU WANT)
      ===================================================== */
      const previousBalance = Number(receivable.ar_balance);
      const paymentAmount = Number(amountPayment);

      const newBalance = previousBalance - paymentAmount;

      const paymentStatus =
        newBalance <= 0
          ? PAYMENT_STATUS.PAID
          : PAYMENT_STATUS.PARTIAL;

      const debits = paymentAmount; // cash/bank increase
      const credits = 0;

      const totalDebitCredit = debits - credits;
      const totalRunningBalance = debits;

      const additional = totalRunningBalance;


      const insertAccountsPaymentSql = InsertStatementTransCommit(
        Account.accounts_payments.tablename,
        Account.accounts_payments.prefix,
        Account.accounts_payments.insertColumns,
      );

      await connection.execute(insertAccountsPaymentSql, [
        coaId,
        customerId,
        null,
        JSON.stringify(invoiceIds),
        null,
        referenceNo,
        recieptNo,
        paymentAmount,
        paymentMethod,
        paymentDate,
        created_at,
        status,
        create_by,
      ]);

      /* =====================================================
         5. UPDATE ACCOUNTS RECEIVABLE
      ===================================================== */
      const updateAccountsReceivableSql = UpdateStatement(
        Account.accounts_receivable.tablename,
        Account.accounts_receivable.prefix,
        [
          "reference_no",
          "reciept_no",
          "amount_paid",
          "payment_method",
          "payment_date",
          "payment_status",
          "ar_balance",
        ],
        ["id"],
      );

      await connection.execute(updateAccountsReceivableSql, [
        referenceNo,
        recieptNo,
        paymentAmount,
        paymentMethod,
        paymentDate,
        paymentStatus,
        newBalance,
        receivableId,
      ]);

      /* =====================================================
         6. INSERT COA RUNNING BALANCE
      ===================================================== */
      const insertAccountsRunningBalSql = InsertStatementTransCommit(
        Coa.coa_run_bal.tablename,
        Coa.coa_run_bal.prefix,
        Coa.coa_run_bal.insertColumns,
      );

      await connection.execute(insertAccountsRunningBalSql, [
        coaId,
        created_at,
        debits,
        credits,
        totalDebitCredit,
        totalRunningBalance,
        create_by,
        created_at,
        RUNNING_BAL.ADDITIONAL,
      ]);

      /* =====================================================
         7. UPDATE MASTER COA
      ===================================================== */
      const updateAccountsCoaSql = UpdateStatement(
        Master.master_coa.tablename,
        Master.master_coa.prefix,
        [
          Master.master_coa.updateOptionColumns.running_bal,
          Master.master_coa.updateOptionColumns.update_date,
        ],
        [Master.master_coa.updateOptionColumns.id],
      );

      await connection.execute(updateAccountsCoaSql, [
        additional,
        created_at,
        coaId,
      ]);

      return true;
    });

    return res.status(200).json(JsonSuccess());
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json(JsonWarningResponse(error.message || "Transaction failed"));
  }
};

// PUT
const editAccountsPayments = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

module.exports = {
  loadAccountsPayments,
  getAccountsPayments,
  addAccountsPayments,
  editAccountsPayments,
};
