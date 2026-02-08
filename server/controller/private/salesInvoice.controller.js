const { Master } = require("../../database/model/Master");
const { DataModeling } = require("../../services/data_modeling/Database");
const {
  SelectAllStatement,
  InsertStatementTransCommit,
  SelectStatement,
  GetCurrentDatetime,
  SelectWhereStatement,
  SelectWithJoinStatement,
  InsertStatement,
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
  PAYMENT_METHODS,
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
  TransactionWithConnection,
} = require("../../services/utility/utility");
const { Sale } = require("../../database/model/Sale");
const { Invoice } = require("../../database/model/Invoice");
const { Account } = require("../../database/model/Account");
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

// const addSalesInvoice = async (req, res) => {
//   try {
//     const {
//       invoiceNo,
//       customerId,
//       salesRepId,
//       billToAddress,
//       billToName,
//       shipToAddress,
//       shipToName,
//       invoiceDate,
//       dueDate,
//       shippingDate,
//       salesTax,
//       freight,
//       invoiceTotal,
//       netDue,
//       itemDetails,
//     } = req.body;

//     console.log(req.body, "data");

//     const requiredFields = {
//       invoiceNo,
//       customerId,
//       salesRepId,
//       billToAddress,
//       billToName,
//       shipToAddress,
//       shipToName,
//       invoiceDate,
//       dueDate,
//     };

//     const missingFields = Object.entries(requiredFields)
//       .filter(
//         ([_, value]) => value === undefined || value === null || value === "",
//       )
//       .map(([key]) => key);

//     if (!Array.isArray(itemDetails)) {
//       missingFields.push("itemDetails");
//     }

//     if (missingFields.length > 0) {
//       return res
//         .status(400)
//         .json(
//           JsonWarningResponse(
//             `Missing required fields: ${missingFields.join(", ")}`,
//           ),
//         );
//     }

//     const created_at = GetCurrentDatetime();
//     const create_by = String(req.session?.user?.fullname || "SYSTEM");
//     const status = STATUS_LOG.ACTIVE;

//     /* =======================
//        FILTER VALID ITEMS
//     ======================= */
//     const validItems = itemDetails.filter(
//       (i) =>
//         i.item_id &&
//         Number(i.quantity) > 0 &&
//         Number(i.unit_price) > 0 &&
//         Number(i.amount) > 0,
//     );

//     if (validItems.length === 0) {
//       return res
//         .status(400)
//         .json(JsonWarningResponse("No valid invoice items"));
//     }

//     /* =======================
//        SINGLE REAL TRANSACTION
//     ======================= */
//     const result = await TransactionWithConnection(async (connection) => {
//       /* =======================
//          INVENTORY VALIDATION
//       ======================= */
//       for (const item of validItems) {
//         const checkQtySql = `
//           SELECT
//             iq.iq_id,
//             iq.iq_quantity,
//             mi.mi_item_price
//           FROM inventory_quantity iq
//           INNER JOIN master_inventory mi
//             ON iq.iq_inventory_id = mi.mi_id
//           WHERE iq.iq_id = ?
//           FOR UPDATE
//         `;

//         const [rows] = await connection.execute(checkQtySql, [
//           Number(item.item_id),
//         ]);

//         if (!rows.length) {
//           throw new Error("Inventory quantity not found");
//         }

//         if (Number(item.quantity) > Number(rows[0].iq_quantity)) {
//           throw new Error("Insufficient inventory quantity");
//         }

//         // Attach for later use
//         item._inventory = rows[0];
//       }

//       /* =======================
//          INSERT SALES INVOICE
//       ======================= */
//       const insertInvoiceSql = InsertStatementTransCommit(
//         Sale.sales_invoice.tablename,
//         Sale.sales_invoice.prefix,
//         Sale.sales_invoice.insertColumns,
//       );

//       const [invoiceResult] = await connection.execute(insertInvoiceSql, [
//         invoiceNo,
//         2,
//         customerId,
//         salesRepId,
//         billToAddress,
//         billToName,
//         shipToAddress,
//         shipToName,
//         invoiceDate,
//         dueDate,
//         shippingDate || null,
//         Number(salesTax) || 0,
//         Number(freight) || 0,
//         Number(invoiceTotal),
//         Number(netDue),
//         created_at,
//         create_by,
//         status,
//       ]);

//       const invoiceId = invoiceResult.insertId;

//       /* =======================
//          SQL TEMPLATES
//       ======================= */
//       const insertItemSql = InsertStatementTransCommit(
//         Invoice.invoice_items.tablename,
//         Invoice.invoice_items.prefix,
//         Invoice.invoice_items.insertColumns,
//       );

//       const insertHistorySql = InsertStatementTransCommit(
//         Inventory.inventory_history.tablename,
//         Inventory.inventory_history.prefix,
//         Inventory.inventory_history.insertColumns,
//       );

//       const updateQtySql = UpdateStatement(
//         Inventory.inventory_quantity.tablename,
//         Inventory.inventory_quantity.prefix,
//         [Inventory.inventory_quantity.updateOptionColumns.quantity],
//         [Inventory.inventory_quantity.updateOptionColumns.id],
//       );

//       /* =======================
//          ITEMS + INVENTORY
//       ======================= */
//       for (const item of validItems) {
//         const { iq_id, iq_quantity, mi_item_price } = item._inventory;

//         /* INVOICE ITEM */
//         await connection.execute(insertItemSql, [
//           invoiceId,
//           Number(item.item_id),
//           Number(item.quantity),
//           String(item.oum),
//           String(item.item_description),
//           Number(item.unit_price),
//           Number(item.amount),
//           created_at,
//           status,
//         ]);

//         /* INVENTORY HISTORY */
//         const inventoryCost =
//           Number(item.quantity) * Number(item.base_price || mi_item_price);

//         const inventoryMap = {};

//         for (const item of validItems) {
//           if (!inventoryMap[item.item_id]) {
//             inventoryMap[item.item_id] = {
//               ...item,
//               quantity: 0,
//             };
//           }

//           inventoryMap[item.item_id].quantity += Number(item.quantity);
//         }

//         for (const inv of Object.values(inventoryMap)) {
//           const [rows] = await connection.execute(checkQtySql, [
//             Number(inv.item_id),
//           ]);

//           if (!rows.length) {
//             throw new Error("Inventory quantity not found");
//           }

//           if (inv.quantity > Number(rows[0].iq_quantity)) {
//             throw new Error("Insufficient inventory quantity");
//           }

//           inv._inventory = rows[0];
//         }

//         for (const inv of Object.values(inventoryMap)) {
//           const { iq_id, iq_quantity, mi_item_price } = inv._inventory;

//           const totalCost =
//             Number(inv.quantity) * Number(inv.base_price || mi_item_price);

//           // INVENTORY HISTORY (ONE ROW)
//           await connection.execute(insertHistorySql, [
//             Number(inv.item_id),
//             Number(iq_id),
//             Number(inv.quantity),
//             Number(totalCost),
//             INVENTORY_OPERATIONS.OUT,
//             INVENTORY_METHODS.INVOICE,
//             create_by,
//             created_at,
//             status,
//           ]);

//           // UPDATE INVENTORY QUANTITY (ONE UPDATE)
//           await connection.execute(updateQtySql, [
//             Number(iq_quantity) - Number(inv.quantity),
//             Number(iq_id),
//           ]);
//         }

//         await connection.execute(insertHistorySql, [
//           Number(item.item_id),
//           Number(iq_id),
//           Number(item.quantity),
//           Number(inventoryCost),
//           INVENTORY_OPERATIONS.OUT,
//           INVENTORY_METHODS.INVOICE,
//           create_by,
//           created_at,
//           status,
//         ]);

//         /* UPDATE INVENTORY QUANTITY */
//         await connection.execute(updateQtySql, [
//           Number(iq_quantity) - Number(item.quantity),
//           Number(iq_id),
//         ]);
//       }

//       return invoiceId;
//     });

//     return res.json(
//       JsonSuccess({
//         invoice_id: result,
//       }),
//     );
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(400)
//       .json(JsonWarningResponse(error.message || "Transaction failed"));
//   }
// };

// PUT

const addSalesInvoice = async (req, res) => {
  try {
    const {
      salesOrderId,
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

    const safeInvoiceDate = normalizeMySQLDateTime(invoiceDate);
    const safeDueDate = normalizeMySQLDateTime(dueDate);
    const safeShippingDate = normalizeMySQLDateTime(shippingDate);

    const requiredFields = {
      salesOrderId,
      invoiceNo,
      customerId,
      salesRepId,
      billToAddress,
      billToName,
      shipToAddress,
      shipToName,
      invoiceDate: safeInvoiceDate,
      dueDate: safeDueDate,
    };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, v]) => v === undefined || v === null || v === "")
      .map(([k]) => k);

    if (!Array.isArray(itemDetails)) {
      missingFields.push("itemDetails");
    }

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json(
          JsonWarningResponse(
            `Missing required fields: ${missingFields.join(", ")}`,
          ),
        );
    }

    const created_at = GetCurrentDatetime();
    const create_by = String(req.session?.user?.fullname || "SYSTEM");
    const status = STATUS_LOG.ACTIVE;

    const validItems = itemDetails.filter(
      (i) =>
        i.item_id &&
        Number(i.quantity) > 0 &&
        Number(i.unit_price) > 0 &&
        Number(i.amount) > 0,
    );

    if (validItems.length === 0) {
      return res
        .status(400)
        .json(JsonWarningResponse("No valid invoice items"));
    }

    const result = await TransactionWithConnection(async (connection) => {
      /* =====================
         GROUP BY INVENTORY ID
      ===================== */
      const inventoryMap = {};

      for (const item of validItems) {
        if (!inventoryMap[item.item_id]) {
          inventoryMap[item.item_id] = {
            ...item,
            quantity: 0,
          };
        }
        inventoryMap[item.item_id].quantity += Number(item.quantity);
      }

      /* =====================
         CORRECT INVENTORY LOCK
         (LOCK BY inventory_id)
      ===================== */
      const checkQtySql = `
        SELECT 
          iq.iq_id,
          iq.iq_quantity,
          mi.mi_item_price
        FROM inventory_quantity iq
        INNER JOIN master_inventory mi
          ON iq.iq_inventory_id = mi.mi_id
        WHERE iq.iq_inventory_id = ?
        FOR UPDATE
      `;

      for (const inv of Object.values(inventoryMap)) {
        const [rows] = await connection.execute(checkQtySql, [
          Number(inv.item_id),
        ]);

        if (!rows.length) {
          throw new Error("Inventory quantity not found");
        }

        if (inv.quantity > Number(rows[0].iq_quantity)) {
          throw new Error("Insufficient inventory quantity");
        }

        inv._inventory = rows[0];
      }

      /* =====================
         INSERT INVOICE
      ===================== */
      const insertInvoiceSql = InsertStatementTransCommit(
        Sale.sales_invoice.tablename,
        Sale.sales_invoice.prefix,
        Sale.sales_invoice.insertColumns,
      );

      const [invoiceResult] = await connection.execute(insertInvoiceSql, [
        invoiceNo,
        salesOrderId,
        customerId,
        salesRepId,
        billToAddress,
        billToName,
        shipToAddress,
        shipToName,
        safeInvoiceDate,
        safeDueDate,
        safeShippingDate,
        Number(salesTax) || 0,
        Number(freight) || 0,
        Number(invoiceTotal),
        Number(netDue),
        created_at,
        create_by,
        status,
      ]);

      const invoiceId = invoiceResult.insertId;

      const insertAccountsReceivableSql = InsertStatementTransCommit(
        Account.accounts_receivable.tablename,
        Account.accounts_receivable.prefix,
        Account.accounts_receivable.insertColumns,
      );

      await connection.execute(insertAccountsReceivableSql, [
        invoiceId,
        null,
        customerId,
        null,
        null,
        invoiceNo,
        Number(invoiceTotal),
        0,
        PAYMENT_METHODS.CHEQUE,
        null,
        created_at,
        create_by,
        status,
      ]);

      /* =====================
         SQL TEMPLATES
      ===================== */
      const insertItemSql = InsertStatementTransCommit(
        Invoice.invoice_items.tablename,
        Invoice.invoice_items.prefix,
        Invoice.invoice_items.insertColumns,
      );

      const insertHistorySql = InsertStatementTransCommit(
        Inventory.inventory_history.tablename,
        Inventory.inventory_history.prefix,
        Inventory.inventory_history.insertColumns,
      );

      const updateQtySql = `
        UPDATE inventory_quantity
        SET iq_quantity = iq_quantity - ?
        WHERE iq_id = ?
      `;

      /* =====================
         INSERT INVOICE ITEMS
      ===================== */
      for (const item of validItems) {
        await connection.execute(insertItemSql, [
          invoiceId,
          Number(item.item_id),
          Number(item.quantity),
          String(item.oum),
          String(item.item_description),
          Number(item.unit_price),
          Number(item.amount),
          created_at,
          status,
        ]);
      }

      /* =====================
         INVENTORY HISTORY + UPDATE
         (ONCE PER ITEM)
      ===================== */
      for (const inv of Object.values(inventoryMap)) {
        const { iq_id, mi_item_price } = inv._inventory;

        const totalCost =
          Number(inv.quantity) * Number(inv.base_price || mi_item_price);

        await connection.execute(insertHistorySql, [
          Number(inv.item_id),
          Number(iq_id),
          Number(inv.quantity),
          Number(totalCost),
          INVENTORY_OPERATIONS.OUT,
          INVENTORY_METHODS.INVOICE,
          create_by,
          created_at,
          status,
        ]);

        await connection.execute(updateQtySql, [
          Number(inv.quantity),
          Number(iq_id),
        ]);
      }

      return invoiceId;
    });

    return res.json(
      JsonSuccess({
        invoice_id: result,
      }),
    );
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json(JsonWarningResponse(error.message || "Transaction failed"));
  }
};

const editSalesInvoice = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json(JsonErrorResponse(error));
  }
};

//#region Functions

const normalizeMySQLDateTime = (value) => {
  if (!value) return null;

  // Already MySQL format
  if (/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(value)) {
    return value.length === 10 ? `${value} 00:00:00` : value;
  }

  // ISO string
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;

  return d.toISOString().slice(0, 19).replace("T", " ");
};

//#endregion

module.exports = {
  loadSalesInvoice,
  getSalesInvoice,
  addSalesInvoice,
  editSalesInvoice,
};
