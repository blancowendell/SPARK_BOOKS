const { Philippine } = require("../../database/model/Philippine");
const { Select, Insert, Update, Check } = require("../../services/repository/dbconnect");
const {
  JsonErrorResponse,
  JsonDataResponse,
  MessageStatus,
  JsonWarningResponse,
  JsonSuccess,
} = require("../../services/repository/response");
const { DataModeling } = require("../../services/data_modeling/Database");
const {
  SelectAllStatement,
  SelectWhereStatement,
  InsertStatement,
  UpdateStatement,
  SelectStatement,
  GetCurrentDatetime,
} = require("../../services/repository/customhelper");

const loadRegions = async (req, res) => {
  try {
    let sql = SelectAllStatement(
      Philippine.philippine_regions.tablename,
      Philippine.philippine_regions.selectColumns
    );

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Philippine.philippine_regions.prefix_);
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

const loadProvinces = async (req, res) => {
  try {
    const { regionCode } = req.params;

    let sql = SelectWhereStatement(
      Philippine.philippine_provinces.tablename,
      Philippine.philippine_provinces.selectColumns,
      [Philippine.philippine_provinces.selectOptionColumns.region_code],
      [regionCode]
    );

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Philippine.philippine_provinces.prefix_);
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

const loadCities = async (req, res) => {
  try {
    const { provinceCode } = req.params;

    let sql = SelectWhereStatement(
      Philippine.philippine_cities.tablename,
      Philippine.philippine_cities.selectColumns,
      [Philippine.philippine_cities.selectOptionColumns.province_code],
      [provinceCode]
    );

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        return res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Philippine.philippine_cities.prefix_);
        return res.json(JsonDataResponse(data));
      }

      res.json(JsonDataResponse(result));
    });
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

/**
 * Load barangays by city
 */
const loadBarangays = async (req, res) => {
  try {
    const { cityCode } = req.params;

    let sql = SelectWhereStatement(
      Philippine.philippine_barangays.tablename,
      Philippine.philippine_barangays.selectColumns,
      [Philippine.philippine_barangays.selectOptionColumns.city_code],
      [cityCode]
    );

    Select(sql, (err, result) => {
      if (err) {
        console.error(err);
        return res.json(JsonErrorResponse(err));
      }

      if (result != 0) {
        let data = DataModeling(result, Philippine.philippine_barangays.prefix_);
        return res.json(JsonDataResponse(data));
      }

      res.json(JsonDataResponse(result));
    });
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};


module.exports = {
  loadRegions,
  loadProvinces,
  loadCities,
  loadBarangays,
};
