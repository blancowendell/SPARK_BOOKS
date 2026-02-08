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
  PROCESS_STATUS,
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

// GET
const loadSalesOrdersDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;

    const whereClause = `DATE(so_created_at) BETWEEN '${startDate}' AND '${endDate}'`;

    const sql = SelectWithJoinStatement(
      Sale.sales_orders.tablename,
      Sale.sales_orders.selectColumns,
      {},
      [Master.master_customer_general.selectOptionColumns.name],
      [
        {
          type: "INNER",
          table: Master.master_customer_general.tablename,
          on:
            Sale.sales_orders.selectOptionColumns.customer_id +
            " = " +
            Master.master_customer_general.selectOptionColumns.id,
        },
      ],
      whereClause
    );

    // ✅ CORRECT USAGE
    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        return res.json(JsonErrorResponse(err));
      }

      const data =
        result && result.length
          ? DataModeling(result, Sale.sales_orders.prefix_)
          : [];

      res.json(JsonDataResponse(data));
    });
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

const loadSalesOrdersPending = async (req, res) => {
  try {
    const status = PROCESS_STATUS.PENDING;
    let sql = SelectWithJoinStatement(
      Sale.sales_orders.tablename,
      Sale.sales_orders.selectColumns,
      {},
      [
        Master.master_customer_general.selectOptionColumns.name,
        Master.master_employee.selectMiscColumns.fullname,
      ],
      [
        {
          type: "INNER",
          table: Master.master_customer_general.tablename,
          on:
            Sale.sales_orders.selectOptionColumns.customer_id +
            " = " +
            Master.master_customer_general.selectOptionColumns.id,
        },
        {
          type: "INNER",
          table: Master.master_employee.tablename,
          on:
            Sale.sales_orders.selectOptionColumns.sales_rep_id +
            " = " +
            Master.master_employee.selectOptionColumns.id,
        },
      ],
      `so_process_status = ?`,
    );    

    // ✅ CORRECT USAGE
    SelectParameter(sql, [status], (err, result) => {
      if (err) {
        console.error(err);
        return res.json(JsonErrorResponse(err));
      }

      const data =
        result && result.length
          ? DataModeling(result, Sale.sales_orders.prefix_)
          : [];

      res.json(JsonDataResponse(data));
    });
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

const loadSalesOrdersApproved = async (req, res) => {
  try {
    const status = PROCESS_STATUS.APPROVED;
    let sql = SelectWithJoinStatement(
      Sale.sales_orders.tablename,
      Sale.sales_orders.selectColumns,
      {},
      [
        Master.master_customer_general.selectOptionColumns.name,
        Master.master_employee.selectMiscColumns.fullname,
      ],
      [
        {
          type: "INNER",
          table: Master.master_customer_general.tablename,
          on:
            Sale.sales_orders.selectOptionColumns.customer_id +
            " = " +
            Master.master_customer_general.selectOptionColumns.id,
        },
        {
          type: "INNER",
          table: Master.master_employee.tablename,
          on:
            Sale.sales_orders.selectOptionColumns.sales_rep_id +
            " = " +
            Master.master_employee.selectOptionColumns.id,
        },
      ],
      `so_process_status = ?`,
    );    

    SelectParameter(sql, [status], (err, result) => {
      if (err) {
        console.error(err);
        return res.json(JsonErrorResponse(err));
      }

      const data =
        result && result.length
          ? DataModeling(result, Sale.sales_orders.prefix_)
          : [];

      res.json(JsonDataResponse(data));
    });
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

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
    const { salesOrderId } = req.params;
    
    const sql = SelectWithJoinStatement(
      Sale.sales_orders.tablename,
      [
        ...Sale.sales_orders.selectColumns,
        ...Sale.sales_orders_items.selectColumns,
        Master.master_customer_general.selectOptionColumns.name,
        Master.master_employee.selectMiscColumns.fullname,
      ],
      {},
      [],
      [
        {
          type: "INNER",
          table: Sale.sales_orders_items.tablename,
          on:
            Sale.sales_orders.selectOptionColumns.id +
            " = " +
            Sale.sales_orders_items.selectOptionColumns.sales_order_id,
        },
        {
          type: "INNER",
          table: Master.master_customer_general.tablename,
          on:
            Sale.sales_orders.selectOptionColumns.customer_id +
            " = " +
            Master.master_customer_general.selectOptionColumns.id,
        },
        {
          type: "INNER",
          table: Master.master_employee.tablename,
          on:
            Sale.sales_orders.selectOptionColumns.sales_rep_id +
            " = " +
            Master.master_employee.selectOptionColumns.id,
        },
      ],
      `${Sale.sales_orders.selectOptionColumns.status} = 'ACTIVE' AND so_id = ?`,
    );

    /* ============================
       EXECUTE
    ============================ */
    SelectParameter(sql, [salesOrderId], (err, result) => {
      if (err) {
        console.error(err);
        return res.json(JsonErrorResponse(err));
      }
      

      if (!result || result.length === 0) {
        return res.json(JsonDataResponse([]));
      }

      /* ============================
         DATA MODELING (PREFIX BASED)
      ============================ */
      const modeled = DataModeling(result, {
        ...Sale.sales_orders.prefix_,
        ...Sale.sales_orders_items.prefix_,
      });

      /* ============================
         GROUP ITEMS PER SALES ORDER
      ============================ */
      const map = {};

      for (const row of modeled) {
        if (!map[row.so_id]) {
          map[row.so_id] = {
            so_id: row.so_id,
            so_sales_order_id: row.so_sales_order_id,
            so_customer_id: row.so_customer_id,
            so_customer_name: row.mcg_name,
            so_vendor_id: row.so_vendor_id,
            so_sales_rep_id: row.so_sales_rep_id,
            so_sales_rep: row.fullname,
            so_bill_to_address: row.so_bill_to_address,
            so_bill_to_name: row.so_bill_to_name,
            so_ship_to_address: row.so_ship_to_address,
            so_ship_to_name: row.so_ship_to_name,
            so_sales_order_date: row.so_sales_order_date,
            so_shipping_date: row.so_shipping_date,
            so_sales_tax: row.so_sales_tax,
            so_freight: row.so_freight,
            so_total: row.so_total,
            so_net_due: row.so_net_due,
            so_process_status: row.so_process_status,
            so_status: row.so_status,
            so_created_at: row.so_created_at,
            so_create_by: row.so_create_by,
            items: [],
          };
        }

        map[row.so_id].items.push({
          soi_id: row.soi_id,
          item_id: row.soi_item_id,
          quantity: row.soi_quantity,
          oum: row.soi_oum,
          description: row.soi_item_description,
          unit_price: row.soi_unit_price,
          amount: row.soi_amount,
          status: row.soi_status,
          created_at: row.soi_created_at,
        });        
      }

      return res.json(JsonDataResponse(Object.values(map)));
    });
  } catch (error) {
    console.error(error);
    return res.json(JsonErrorResponse(error));
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

    const requiredFields = {
      customerId,
      salesRepId,
      billToAddress,
      billToName,
      shipToAddress,
      shipToName,
      salesOrderDate,
      dueDate,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(
        ([_, value]) => value === undefined || value === null || value === "",
      )
      .map(([key]) => key);

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
        PROCESS_STATUS.PENDING,
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

const acctionSalesOrder = async (req, res) => {
  try {
    const { salesOrderId } = req.params;
    const { action } = req.body;

    const allowedActions = [PROCESS_STATUS.APPROVED, PROCESS_STATUS.REJECTED];
    if (!allowedActions.includes(action)) {
      return res.status(400).json(JsonWarningResponse("Invalid action"));
    }

    let sql = UpdateStatement(
      Sale.sales_orders.tablename,
      Sale.sales_orders.prefix,
      [Sale.sales_orders.updateOptionColumns.process_status],
      [Sale.sales_orders.updateOptionColumns.id],
    );

    let data = [action, salesOrderId];

    Update(sql, data, (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }
      res.json(JsonSuccess());
    });
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

module.exports = {
  loadSalesOrdersDateRange,
  loadSalesOrdersPending,
  loadSalesOrdersApproved,
  loadSalesOrders,
  getSalesOrders,
  addSalesOrders,
  editSalesOrders,
  acctionSalesOrder,
};
