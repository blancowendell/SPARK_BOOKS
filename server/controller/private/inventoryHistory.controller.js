const { Inventory } = require("../../database/model/Inventory");
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
  SelectParameter,
  Check,
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
  UpdateNoPrefixStatement,
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

// GET
const loadInventoryHistory = async (req, res) => {
  try {
    const { inventoryId } = req.params;

    const sql = SelectWithJoinStatement(
      Inventory.inventory_history.tablename,
      Inventory.inventory_history.selectColumns,
      {},
      [Master.master_inventory.selectOptionColumns.item_id],
      [
        {
          type: "INNER",
          table: Master.master_inventory.tablename,
          on:
            Inventory.inventory_history.selectOptionColumns.inventory_id +
            " = " +
            Master.master_inventory.selectOptionColumns.id,
        },
      ],
      `mi_id = ?`,
    );

    SelectParameter(sql, [inventoryId], (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Inventory.inventory_history.prefix_);
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
const getInventoryHistory = async (req, res) => {
  try {
    const { historyId } = req.params;

    const sql = SelectWithJoinStatement(
      Inventory.inventory_history.tablename,
      Inventory.inventory_history.selectColumns,
      {},
      [
        Master.master_inventory.selectOptionColumns.item_id,
        Master.master_inventory.selectOptionColumns.item_price,
        Master.master_inventory.selectOptionColumns.description,
      ],
      [
        {
          type: "INNER",
          table: Master.master_inventory.tablename,
          on:
            Inventory.inventory_history.selectOptionColumns.inventory_id +
            " = " +
            Master.master_inventory.selectOptionColumns.id,
        },
      ],
      `ih_id = ?`,
    );

    SelectParameter(sql, [historyId], (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Inventory.inventory_history.prefix_);
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
const addInventoryHistory = async (req, res) => {
  try {
    const { quantityId, qty, operation, method } = req.body;

    if (!quantityId || !qty || !operation || !method) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing required fields"));
    }

    if (!Object.values(INVENTORY_OPERATIONS).includes(operation)) {
      return res
        .status(400)
        .json(JsonWarningResponse("Invalid operation value"));
    }

    if (!Object.values(INVENTORY_METHODS).includes(method)) {
      return res.status(400).json(JsonWarningResponse("Invalid method value"));
    }

    const create_date = GetCurrentDatetime();
    const create_by = req.session?.user?.fullname;

    if (!create_by) {
      return res.status(401).json(JsonWarningResponse("Session expired"));
    }

    const status = STATUS_LOG.ACTIVE;

    /* =======================
       GET INVENTORY INFO
    ======================= */
    const getInventoryInfo = `
      SELECT 
        mi.mi_id           AS inventory_id,
        mi.mi_item_price   AS item_price,
        iq.iq_quantity     AS iq_quantity
      FROM inventory_quantity iq
      INNER JOIN master_inventory mi
        ON iq.iq_inventory_id = mi.mi_id
      WHERE iq.iq_id = '${quantityId}'
    `;

    const inventoryInfo = await Check(getInventoryInfo);

    if (!inventoryInfo || inventoryInfo.length === 0) {
      return res
        .status(404)
        .json(JsonWarningResponse("Inventory quantity not found"));
    }

    const { inventory_id, item_price, iq_quantity } = inventoryInfo[0];

    const normalizedQty = Number(qty);
    const inventoryId = Number(inventory_id);
    const inventoryPrice = Number(item_price);
    const currentQuantity = Number(iq_quantity);

    if (
      Number.isNaN(normalizedQty) ||
      Number.isNaN(inventoryId) ||
      Number.isNaN(inventoryPrice)
    ) {
      return res
        .status(400)
        .json(JsonWarningResponse("Invalid inventory data"));
    }

    if (operation === "OUT" && normalizedQty > currentQuantity) {
      return res
        .status(400)
        .json(JsonWarningResponse("Insufficient inventory quantity"));
    }

    const newQuantity =
      operation === "IN"
        ? currentQuantity + normalizedQty
        : currentQuantity - normalizedQty;

    const inventoryCost = normalizedQty * inventoryPrice;

    let queries = [];

    const insertHistorySQL = InsertStatementTransCommit(
      Inventory.inventory_history.tablename,
      Inventory.inventory_history.prefix,
      Inventory.inventory_history.insertColumns,
    );

    queries.push({
      sql: insertHistorySQL,
      values: [
        inventoryId,
        Number(quantityId),
        normalizedQty,
        inventoryCost,
        operation,
        method,
        create_by,
        create_date,
        status,
      ],
    });

    const updateQuantitySQL = UpdateStatement(
      Inventory.inventory_quantity.tablename,
      Inventory.inventory_quantity.prefix,
      [Inventory.inventory_quantity.updateOptionColumns.quantity],
      [Inventory.inventory_quantity.updateOptionColumns.id],
    );

    const updateData = [newQuantity, Number(quantityId)];

    queries.push({
      sql: updateQuantitySQL,
      values: updateData,
    });

    /* =======================
       EXECUTE TRANSACTION
    ======================= */
    await Transaction(queries);

    return res.json(JsonSuccess());
  } catch (error) {
    console.error(error);
    return res.status(500).json(JsonErrorResponse(error));
  }
};

module.exports = {
  loadInventoryHistory,
  getInventoryHistory,
  addInventoryHistory,
};
