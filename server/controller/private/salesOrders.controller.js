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
const { Inventory } = require("../../database/model/Inventory");

// GET
const loadSalesOrders = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// GET BY ID
const getSalesOrders = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// POST
const addSalesOrders = async (req, res) => {
  try {
    const {
      customerId,
      salesRepId,
      create_by,
      billToAddress,
      billToName,
      shipToAddress,
      shipToName,
      salesOrderDate,
      dueDate,
      shippingDate,
      salesTax,
      freight,
      salesOrderTotal,
      netDue,
      itemDetails,
    } = req.body;

    if (
      !customerId ||
      !salesRepId ||
      !billToAddress ||
      !billToName ||
      !shipToAddress ||
      !shipToName ||
      !salesOrderDate ||
      !dueDate ||
      !Array.isArray(itemDetails)
    ) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing required fields"));
    }

    const created_at = GetCurrentDatetime();
    // const create_by = String(req.session?.user?.fullname || "SYSTEM");
    const status = STATUS_LOG.ACTIVE;
    const sequenceId = 3;

    /* =======================
       FILTER VALID ITEMS
    ======================= */
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

    /* =======================
       SINGLE REAL TRANSACTION
    ======================= */
    const result = await TransactionWithConnection(async (connection) => {

      const soId = await generateUniquePartyId({
        sequenceKey: sequenceId,
        tableName: "sales_orders",
        idColumn: "so_sales_order_id",
      });

      /* =======================
         INVENTORY VALIDATION
      ======================= */
      for (const item of validItems) {
        const checkQtySql = `
          SELECT 
            iq.iq_id,
            iq.iq_quantity,
            mi.mi_item_price
          FROM inventory_quantity iq
          INNER JOIN master_inventory mi
            ON iq.iq_inventory_id = mi.mi_id
          WHERE iq.iq_id = ?
          FOR UPDATE
        `;

        const [rows] = await connection.execute(checkQtySql, [
          Number(item.item_id),
        ]);

        if (!rows.length) {
          throw new Error("Inventory quantity not found");
        }

        if (Number(item.quantity) > Number(rows[0].iq_quantity)) {
          throw new Error("Insufficient inventory quantity");
        }

        // Attach for later use
        item._inventory = rows[0];
      }

      /* =======================
         INSERT SALES INVOICE
      ======================= */
      const insertSoSql = InsertStatementTransCommit(
        Sale.sales_orders.tablename,
        Sale.sales_orders.prefix,
        Sale.sales_orders.insertColumns,
      );

      const [soResult] = await connection.execute(insertSoSql, [
        soId,
        customerId,
        null,
        salesRepId,
        billToAddress,
        billToName,
        shipToAddress,
        shipToName,
        salesOrderDate,
        shippingDate || null,
        Number(salesTax) || 0,
        Number(freight) || 0,
        Number(salesOrderTotal),
        Number(netDue),
        created_at,
        create_by,
        status,
      ]);

      const salesOrderId = soResult.insertId;

      /* =======================
         SQL TEMPLATES
      ======================= */
      const insertItemSql = InsertStatementTransCommit(
        Sale.sales_orders_items.tablename,
        Sale.sales_orders_items.prefix,
        Sale.sales_orders_items.insertColumns,
      );

      // const insertHistorySql = InsertStatementTransCommit(
      //   Inventory.inventory_history.tablename,
      //   Inventory.inventory_history.prefix,
      //   Inventory.inventory_history.insertColumns,
      // );

      // const updateQtySql = UpdateStatement(
      //   Inventory.inventory_quantity.tablename,
      //   Inventory.inventory_quantity.prefix,
      //   [Inventory.inventory_quantity.updateOptionColumns.quantity],
      //   [Inventory.inventory_quantity.updateOptionColumns.id],
      // );

      /* =======================
         ITEMS + INVENTORY
      ======================= */
      for (const item of validItems) {
        // const { iq_id, iq_quantity, mi_item_price } = item._inventory;

        /* INVOICE ITEM */
        await connection.execute(insertItemSql, [
          salesOrderId,
          Number(item.item_id),
          Number(item.quantity),
          String(item.oum),
          String(item.item_description),
          Number(item.unit_price),
          Number(item.amount),
          created_at,
          status,
        ]);

        /* INVENTORY HISTORY */
        // const inventoryCost =
        //   Number(item.quantity) * Number(item.base_price || mi_item_price);

        // await connection.execute(insertHistorySql, [
        //   Number(item.item_id),
        //   Number(iq_id),
        //   Number(item.quantity),
        //   Number(inventoryCost),
        //   INVENTORY_OPERATIONS.OUT,
        //   INVENTORY_METHODS.INVOICE,
        //   create_by,
        //   created_at,
        //   status,
        // ]);

        // /* UPDATE INVENTORY QUANTITY */
        // await connection.execute(updateQtySql, [
        //   Number(iq_quantity) - Number(item.quantity),
        //   Number(iq_id),
        // ]);
      }

      return salesOrderId;
    });

    return res.json(
      JsonSuccess({
        sales_order_id: result,
      }),
    );
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json(JsonWarningResponse(error.message || "Transaction failed"));
  }
};

// PUT
const editSalesOrders = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

module.exports = {
  loadSalesOrders,
  getSalesOrders,
  addSalesOrders,
  editSalesOrders,
};
