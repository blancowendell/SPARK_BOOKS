const { Inventory } = require("../../database/model/Inventory");
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
  INVENTORY_OPERATIONS,
  INVENTORY_METHODS,
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
const loadInventoryQuantity = async (req, res) => {
  try {
    const sql = SelectWithJoinStatement(
      Inventory.inventory_quantity.tablename,
      Inventory.inventory_quantity.selectColumns,
      {},
      [
        Master.master_inventory.selectOptionColumns.item_id,
        Master.master_inventory.selectOptionColumns.item_price,
        Master.master_inventory.selectOptionColumns.description,
        Master.master_inventory.selectOptionColumns.item_class,
        Master.master_inventory.selectOptionColumns.stocking_uom
      ],
      [
        {
          type: "INNER",
          table: Master.master_inventory.tablename,
          on:
            Inventory.inventory_quantity.selectOptionColumns.inventory_id +
            " = " +
            Master.master_inventory.selectOptionColumns.id,
        },
      ],
    );    

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Inventory.inventory_quantity.prefix_);
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


module.exports = {
  loadInventoryQuantity,
};
