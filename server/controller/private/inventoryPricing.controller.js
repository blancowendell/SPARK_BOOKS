const { JsonErrorResponse } = require("../../services/repository/response");

// GET
const loadInventoryPricing = async (req, res) => {
  try {
      let sql = SelectAllStatement(
        Master.master_inventory.tablename,
        Master.master_inventory.selectColumns,
      );
  
      Select(sql, (err, result) => {
        if (err) {
          console.error(err);
          res.json(JsonErrorResponse(err));
        }
  
        if (result != 0) {
          let data = DataModeling(result, Master.master_inventory.prefix_);
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
const getInventoryPricing = async (req, res) => {
  try {
    const { inventoryId } = req.params;

    let sql = SelectWhereStatement(
      Master.master_inventory.tablename,
      Master.master_inventory.selectColumns,
      [Master.master_inventory.selectOptionColumns.id],
      [inventoryId],
    );

    SelectParameter(sql, [inventoryId], (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Master.master_inventory.prefix_);
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
const addInventoryPricing = async (req, res) => {
  try {
    const {
      description,
      descriptionSalesPurchase,
      itemClass,
      glSalesAccount,
      glInventoryAccount,
      glCogsAccount,
      upcSku,
      itemType,
      itemLocation,
      stockingUnit,
      size,
      weight,
      location,
      brand,
    } = req.body;

    const create_date = GetCurrentDatetime();
    const create_by = req.session.user.username;
    const status = STATUS_LOG.ACTIVE;

    if (
      !description ||
      !descriptionSalesPurchase ||
      !itemClass ||
      !glSalesAccount ||
      !glInventoryAccount ||
      !glCogsAccount ||
      !upcSku ||
      !itemType ||
      !itemLocation ||
      !stockingUnit ||
      !size ||
      !weight ||
      !location ||
      !brand
    ) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing required fields"));
    }

    const generateItemId = (description) => {
      return description
        .trim()
        .split(/\s+/)
        .slice(0, 3)
        .join(" ")
        .toUpperCase();
    };

    const itemId = generateItemId(description);
    console.log(itemId, 'ITEMID');
    

    const segmentCheck = SelectStatement(
      `
      SELECT 1
      FROM master_inventory
      WHERE mi_description = ?
      `,
      [description]
    );

    const exists = await Check(segmentCheck);

    if (exists.length > 0) {
      return res
        .status(409)
        .json(JsonWarningResponse("Description already exists"));
    }

    const sql = InsertStatementTransCommit(
      Master.master_inventory.tablename,
      Master.master_inventory.prefix,
      Master.master_inventory.insertColumns,
    );

    const data = [
      itemId,
      description,
      descriptionSalesPurchase,
      itemClass,
      glSalesAccount,
      glInventoryAccount,
      glCogsAccount,
      upcSku,
      itemType,
      itemLocation,
      stockingUnit,
      size,
      weight,
      location,
      brand,
      create_date,
      create_by,
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
const editInventoryPricing = async (req, res) => {
  try {
    const { inventoryId } = req.params;
    const {
      description,
      descriptionSalesPurchase,
      itemClass,
      glSalesAccount,
      glInventoryAccount,
      glCogsAccount,
      upcSku,
      itemType,
      itemLocation,
      stockingUnit,
      size,
      weight,
      location,
      brand,
      status,
    } = req.body;

    if (!inventoryId) {
      return res
        .status(400)
        .json(JsonWarningResponse("Inventory ID is required"));
    }

    let modify_date = GetCurrentDatetime();
    let modify_by = req.session.user.fullname;

    let sql = UpdateStatement(
      Master.master_inventory.tablename,
      Master.master_inventory.prefix,
      [
        Master.master_inventory.updateOptionColumns.description,
        Master.master_inventory.updateOptionColumns.description_sales_purchase,
        Master.master_inventory.updateOptionColumns.item_class,
        Master.master_inventory.updateOptionColumns.gl_sales_account,
        Master.master_inventory.updateOptionColumns.gl_inventory_account,
        Master.master_inventory.updateOptionColumns.gl_cogs_account,
        Master.master_inventory.updateOptionColumns.upc_sku,
        Master.master_inventory.updateOptionColumns.item_type,
        Master.master_inventory.updateOptionColumns.item_location,
        Master.master_inventory.updateOptionColumns.stocking_uom,
        Master.master_inventory.updateOptionColumns.size,
        Master.master_inventory.updateOptionColumns.weight,
        Master.master_inventory.updateOptionColumns.location,
        Master.master_inventory.updateOptionColumns.brand,
        Master.master_inventory.updateOptionColumns.modify_date,
        Master.master_inventory.updateOptionColumns.modify_by,
        Master.master_inventory.updateOptionColumns.status,
      ],
      [Master.master_inventory.updateOptionColumns.id],
    );

    let data = [
      description,
      descriptionSalesPurchase,
      itemClass,
      glSalesAccount,
      glInventoryAccount,
      glCogsAccount,
      upcSku,
      itemType,
      itemLocation,
      stockingUnit,
      size,
      weight,
      location,
      brand,
      modify_date,
      modify_by,
      status,
      inventoryId,
    ];

    let checkStatement = SelectStatement(
      "SELECT * FROM master_inventory WHERE mi_id = ? AND mi_description = ? AND mi_description_sales_purchase = ? AND mi_item_class = ? AND mi_gl_sales_account = ? AND mi_gl_inventory_account = ? AND mi_gl_cogs_account = ? AND mi_upc_sku = ? AND mi_item_type = ? AND mi_item_location = ? AND mi_stocking_uom = ? AND mi_size = ? AND mi_weight = ? AND mi_location = ? AND mi_brand = ? AND mi_status = ?",
      [
        inventoryId,
        description,
        descriptionSalesPurchase,
        itemClass,
        glSalesAccount,
        glInventoryAccount,
        glCogsAccount,
        upcSku,
        itemType,
        itemLocation,
        stockingUnit,
        size,
        weight,
        location,
        brand,
        status,
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
  loadInventoryPricing,
  getInventoryPricing,
  addInventoryPricing,
  editInventoryPricing,
};
