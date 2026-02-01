const { Master } = require("../../database/model/Master");
const { DataModeling } = require("../../services/data_modeling/Database");
const {
  SelectAllStatement,
  InsertStatementTransCommit,
  SelectStatement,
  GetCurrentDatetime,
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
const { TransactionWithReturn } = require("../../services/utility/utility");

// GET
const loadMasterCustomerGeneral = async (req, res) => {
  try {
    let sql = SelectAllStatement(
      Master.master_customer_general.tablename,
      Master.master_customer_general.selectColumns,
    );

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Master.master_customer_general.prefix_);
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
const getMasterCustomerGeneral = async (req, res) => {
  try {
    const { customerId } = req.params;

    let sql = SelectWhereStatement(
      Master.master_customer_general.tablename,
      Master.master_customer_general.selectColumns,
      [Master.master_customer_general.selectOptionColumns.id],
      [`'${customerId}'`],
    );

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Master.master_customer_general.prefix_);
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
const addMasterCustomerGeneral = async (req, res) => {
  try {
    const {
      sequenceId,
      typeId,
      name,
      isProspect,
      accountNumber,
      billingAddress,
      country,
      region,
      province,
      city,
      zipCode,
      baranggayStreet,
      isTax,
      telephone,
      fax,
      email,
      website,
    } = req.body;

    if (
      !sequenceId ||
      !typeId ||
      !name ||
      !accountNumber ||
      !billingAddress ||
      !telephone
    ) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing required fields"));
    }

    const create_date = GetCurrentDatetime();
    const create_by = req.session.user.fullname;
    const status = STATUS_LOG.ACTIVE;

    const customerId = await generateUniquePartyId({
      sequenceKey: sequenceId,
      tableName: "master_customer_general",
      idColumn: "mcg_id",
    });

    const segmentCheck = SelectStatement(
      `
      SELECT 1
      FROM master_customer_general
      WHERE mcg_type_id = ?
        AND mcg_name = ?
      `,
      [typeId, name],
    );

    const exists = await Check(segmentCheck);

    if (exists.length > 0) {
      return res
        .status(409)
        .json(JsonWarningResponse("Name is already used for this type"));
    }

    const sql = InsertStatementTransCommit(
      Master.master_customer_general.tablename,
      Master.master_customer_general.prefix,
      Master.master_customer_general.insertColumns,
    );

    const data = [
      customerId,
      typeId,
      name,
      isProspect,
      accountNumber,
      billingAddress,
      country,
      region,
      province,
      city,
      zipCode,
      baranggayStreet,
      isTax,
      telephone,
      fax,
      email,
      website,
      create_by,
      create_date,
      create_date,
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
const editMasterCustomerGeneral = async (req, res) => {
  try {
    const { customerId } = req.params;
    const {
      typeId,
      name,
      isProspect,
      accountNumber,
      billingAddress,
      country,
      region,
      province,
      city,
      zipCode,
      baranggayStreet,
      isTax,
      telephone,
      fax,
      email,
      website,
      status,
    } = req.body;

    if (
      !typeId ||
      !name ||
      !accountNumber ||
      !billingAddress ||
      !region ||
      !province ||
      !city ||
      !telephone
    ) {
      return res
        .status(400)
        .json(JsonWarningResponse("Missing required fields"));
    }

    let modify_date = GetCurrentDatetime();
    let modify_by = req.session.user.fullname;

    let sql = UpdateStatement(
      Master.master_customer_general.tablename,
      Master.master_customer_general.prefix,
      [
        Master.master_customer_general.updateOptionColumns.type_id,
        Master.master_customer_general.updateOptionColumns.name,
        Master.master_customer_general.updateOptionColumns.is_prospect,
        Master.master_customer_general.updateOptionColumns.account_number,
        Master.master_customer_general.updateOptionColumns.billing_address,
        Master.master_customer_general.updateOptionColumns.country,
        Master.master_customer_general.updateOptionColumns.region,
        Master.master_customer_general.updateOptionColumns.province,
        Master.master_customer_general.updateOptionColumns.city,
        Master.master_customer_general.updateOptionColumns.zip_code,
        Master.master_customer_general.updateOptionColumns.baranggay_street,
        Master.master_customer_general.updateOptionColumns.is_tax,
        Master.master_customer_general.updateOptionColumns.telephone,
        Master.master_customer_general.updateOptionColumns.fax,
        Master.master_customer_general.updateOptionColumns.email,
        Master.master_customer_general.updateOptionColumns.website,
        Master.master_customer_general.updateOptionColumns.update_date,
        Master.master_customer_general.updateOptionColumns.create_by,
        Master.master_customer_general.updateOptionColumns.status,
      ],
      [Master.master_customer_general.updateOptionColumns.id],
    );    

    let data = [
      typeId,
      name,
      isProspect,
      accountNumber,
      billingAddress,
      country,
      region,
      province,
      city,
      zipCode,
      baranggayStreet,
      isTax,
      telephone,
      fax,
      email,
      website,
      modify_date,
      modify_by,
      status,
      customerId,
    ];

    // let checkStatementFirst = SelectStatement(
    //   `
    //     SELECT 1
    //     FROM master_customer_general
    //     WHERE mcg_type_id = ?
    //       AND mcg_name = ?
    //       AND mcg_id != ?
    //     `,
    //   [typeId, name, customerId]
    // );

    // const result = await Check(checkStatementFirst);

    // if (result !== 0) {
    //   return res
    //     .status(400)
    //     .json(
    //       JsonWarningResponse(
    //         "Name is already used for this type"
    //       )
    //     );
    // }

    let checkStatement = SelectStatement(
      "SELECT * FROM master_customer_general WHERE mcg_id = ? AND mcg_account_number = ? AND mcg_type_id = ? AND mcg_name = ? AND mcg_status = ? AND mcg_billing_address = ? AND mcg_country = ? AND mcg_region = ? AND mcg_province = ? AND mcg_city = ? AND mcg_zip_code = ? AND mcg_baranggay_street = ? AND mcg_is_tax = ? AND mcg_telephone = ? AND mcg_fax = ? AND mcg_email = ? AND mcg_website = ?",
      [
        customerId,
        accountNumber,
        typeId,
        name,
        status,
        billingAddress,
        country,
        region,
        province,
        city,
        zipCode,
        baranggayStreet,
        isTax,
        telephone,
        fax,
        email,
        website,
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
  loadMasterCustomerGeneral,
  getMasterCustomerGeneral,
  addMasterCustomerGeneral,
  editMasterCustomerGeneral,
};
