const { Master } = require("../../database/model/Master");
const { DataModeling } = require("../../services/data_modeling/Database");
const {
  SelectAllStatement,
  InsertStatementTransCommit,
  SelectStatement,
  GetCurrentDatetime,
  SelectWhereStatement,
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
  INVENTORY_OPERATIONS,
  INVENTORY_METHODS,
} = require("../../services/repository/enum/enums");
const {
  UpdateStatement,
  generateUniquePartyId,
} = require("../../services/repository/helper");
const {
  JsonErrorResponse,
  JsonDataResponse,
  MessageStatus,
  JsonSuccess,
  JsonWarningResponse,
} = require("../../services/repository/response");
const {
  TransactionWithReturn,
  Transaction,
} = require("../../services/utility/utility");
const { Sale } = require("../../database/model/Sale");
const { Invoice } = require("../../database/model/Invoice");
const { Inventory } = require("../../database/model/Inventory");

// GET
const loadSalesInvoice = async (req, res) => {
  try {
    let sql = SelectWithJoinStatement(
      Sale.sales_invoice.tablename,
      Sale.sales_invoice.selectColumns,
      {},
      [Master.master_customer_general.selectOptionColumns.name],
      [
        {
          type: "INNER",
          table: Master.master_customer_general.tablename,
          on:
            Sale.sales_invoice.selectOptionColumns.customer_id +
            " = " +
            Master.master_customer_general.selectOptionColumns.id,
        },
      ],
    );

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Sale.sales_invoice.prefix_);
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
const getSalesInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.params;

    let sql = SelectWithJoinStatement(
      Sale.sales_invoice.tablename,
      Sale.sales_invoice.selectColumns,
      {},
      [Master.master_customer_general.selectOptionColumns.name],
      [
        {
          type: "INNER",
          table: Master.master_customer_general.tablename,
          on:
            Sale.sales_invoice.selectOptionColumns.customer_id +
            " = " +
            Master.master_customer_general.selectOptionColumns.id,
        },
      ],
      [
        {
          type: "INNER",
          table: Invoice.invoice_items.tablename,
          on:
            Sale.sales_invoice.selectOptionColumns.id +
            " = " +
            Invoice.invoice_items.selectOptionColumns.invoice_id,
        },
      ],
      `si_id = ?`,
    );

    SelectParameter(sql, [invoiceId], (err, result) => {
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
const addSalesInvoice = async (req, res) => {
  try {
    const {
      invoiceNo,
      customerId,
      salesRepId,
      billToAddress,
      billToName,
      shipToAddress,
      shipToName,
      invoiceDate,
      dueDate,
      shippingDate,
      salesTax,
      freight,
      invoiceTotal,
      netDue,
      itemDetails,
    } = req.body;

    if (
      !invoiceNo ||
      !customerId ||
      !salesRepId ||
      !billToAddress ||
      !billToName ||
      !shipToAddress ||
      !shipToName ||
      !invoiceDate ||
      !dueDate ||
      !Array.isArray(itemDetails)
    ) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing required fields"));
    }

    const created_at = GetCurrentDatetime();
    const create_by = String(req.session?.user?.fullname || "SYSTEM");
    const status = STATUS_LOG.ACTIVE;

    /* =======================
       INSERT SALES INVOICE
    ======================= */
    const insertInvoiceSql = InsertStatementTransCommit(
      Sale.sales_invoice.tablename,
      Sale.sales_invoice.prefix,
      Sale.sales_invoice.insertColumns
    );

    const invoiceValues = [
      invoiceNo,
      customerId,
      salesRepId,
      billToAddress,
      billToName,
      shipToAddress,
      shipToName,
      invoiceDate,
      dueDate,
      shippingDate || null,
      Number(salesTax) || 0,
      Number(freight) || 0,
      Number(invoiceTotal),
      Number(netDue),
      created_at,
      create_by,
      status,
    ];

    const invoiceResult = await TransactionWithReturn([
      { sql: insertInvoiceSql, values: invoiceValues },
    ]);

    const invoiceId = invoiceResult.insertId;

    /* =======================
       FILTER VALID ITEMS
    ======================= */
    const validItems = itemDetails.filter(
      (i) =>
        i.item_id &&
        Number(i.quantity) > 0 &&
        Number(i.unit_price) > 0 &&
        Number(i.amount) > 0
    );

    if (validItems.length === 0) {
      return res
        .status(400)
        .json(JsonWarningResponse("No valid invoice items"));
    }

    /* =======================
       INSERT ITEMS + INVENTORY OUT
    ======================= */
    const insertItemSql = InsertStatementTransCommit(
      Invoice.invoice_items.tablename,
      Invoice.invoice_items.prefix,
      Invoice.invoice_items.insertColumns
    );

    for (const item of validItems) {
      /* -------- INSERT INVOICE ITEM -------- */
      const itemValues = [
        invoiceId,
        Number(item.item_id),
        Number(item.quantity),
        String(item.oum),
        String(item.item_description),
        Number(item.unit_price),
        Number(item.amount),
        created_at,
        status,
      ];

      await TransactionWithReturn([
        { sql: insertItemSql, values: itemValues },
      ]);

      /* -------- GET INVENTORY QUANTITY ID -------- */

      const inventoryQtySql = `
      SELECT 
        mi.mi_id           AS inventory_id,
        mi.mi_item_price   AS item_price,
        iq.iq_quantity     AS iq_quantity,
        iq.iq_id           AS iq_id
      FROM inventory_quantity iq
      INNER JOIN master_inventory mi
        ON iq.iq_inventory_id = mi.mi_id
      WHERE iq.iq_id = '${item.item_id}'
    `;

    const inventoryQty = await Check(inventoryQtySql);

      if (!inventoryQty || inventoryQty.length === 0) {
        return res
          .status(404)
          .json(JsonWarningResponse("Inventory quantity not found"));
      }

      const { iq_id, iq_quantity } = inventoryQty[0];

      if (Number(item.quantity) > Number(iq_quantity)) {
        return res
          .status(400)
          .json(JsonWarningResponse("Insufficient inventory quantity"));
      }

      /* -------- INVENTORY HISTORY INSERT -------- */
      const insertHistorySQL = InsertStatementTransCommit(
        Inventory.inventory_history.tablename,
        Inventory.inventory_history.prefix,
        Inventory.inventory_history.insertColumns
      );

      const inventoryCost =
        Number(item.quantity) * Number(item.base_price || item.unit_price);

      await TransactionWithReturn([
        {
          sql: insertHistorySQL,
          values: [
            Number(item.item_id),
            Number(iq_id),
            Number(item.quantity),
            Number(inventoryCost),
            INVENTORY_OPERATIONS.OUT,
            INVENTORY_METHODS.INVOICE,
            create_by,
            created_at,
            status,
          ],
        },
      ]);

      /* -------- UPDATE INVENTORY QUANTITY -------- */
      const updateQtySql = UpdateStatement(
        Inventory.inventory_quantity.tablename,
        Inventory.inventory_quantity.prefix,
        [Inventory.inventory_quantity.updateOptionColumns.quantity],
        [Inventory.inventory_quantity.updateOptionColumns.id]
      );

      await TransactionWithReturn([
        {
          sql: updateQtySql,
          values: [
            Number(iq_quantity) - Number(item.quantity),
            Number(iq_id),
          ],
        },
      ]);
    }

    return res.json(
      JsonSuccess({
        invoice_id: invoiceId,
      })
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(JsonErrorResponse(error));
  }
};


// PUT
const editSalesInvoice = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json(JsonErrorResponse(error));
  }
};

module.exports = {
  loadSalesInvoice,
  getSalesInvoice,
  addSalesInvoice,
  editSalesInvoice,
};
