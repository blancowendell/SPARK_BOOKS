var express = require("express");
const { Encrypter, EncrypterString } = require("../../services/repository/cryptography");
const mysql = require("../../services/repository/Database");
var router = express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { Select, Insert, Update, SelectParameter } = require("../../services/repository/dbconnect");
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
    InsertStatementTransCommit,
} = require("../../services/repository/customhelper");
const { STATUS_LOG } = require("../../services/repository/enum/enums");
const { Dashboard } = require("../../database/model/Dashboard");
const { log } = require("winston");
const { Transaction, TransactionWithReturn } = require("../../services/utility/utility");

const saveLayout = async (req, res) => {
    try {
    const { dashboard_id, widgets } = req.body;

    if (!dashboard_id || !Array.isArray(widgets)) {
      return res.status(400).json(JsonErrorResponse("Invalid request format"));
    }

    console.log("📥 Received dashboard layout:", JSON.stringify(req.body, null, 2));

    const configInserts = [];

    for (const widget of widgets) {
      const widgetSQL = InsertStatementTransCommit(
        Dashboard.dashboard_widgets.tablename,
        Dashboard.dashboard_widgets.prefix,
        Dashboard.dashboard_widgets.insertColumns
      );

      const widgetData = [
        dashboard_id,
        widget.type,
        widget.title,
        widget.position_x,
        widget.position_y,
        widget.width,
        widget.height,
      ];

      const result = await TransactionWithReturn([
        { sql: widgetSQL, values: widgetData },
      ]);

      const insertedWidgetId = result?.insertId;
      if (!insertedWidgetId) throw new Error("Failed to retrieve widget ID after insert");

      if (widget.config) {
        const configSQL = InsertStatementTransCommit(
          Dashboard.dashboard_widget_configs.tablename,
          Dashboard.dashboard_widget_configs.prefix,
          Dashboard.dashboard_widget_configs.insertColumns
        );

        const config = widget.config;

        // 🧠 Auto-handle "table" type widget data safely
        let tableColumns = [];
        let tableData = [];

        if (widget.type === "table") {
          // headers: "ID,Name,Status" → ["ID", "Name", "Status"]
          if (config.headers) {
            tableColumns = config.headers.split(",").map((h) => h.trim());
          }

          // tbody: "id|name|status" → [["id", "name", "status"]]
          if (config.tbody) {
            const rows = config.tbody.split("\n").map((row) =>
              row.split("|").map((col) => col.trim())
            );
            tableData = rows;
          }
        }

        const configData = [
          insertedWidgetId,
          config.cardType || "",
          config.content || "",
          config.param || "",
          config.apiId || null,
          config.chartType || "",
          JSON.stringify(tableColumns.length ? tableColumns : config.tableColumns || []),
          JSON.stringify(tableData.length ? tableData : config.tableData || []),
          JSON.stringify(config.customStyles || {}),
          config.refreshInterval || null,
          config.scorecardIcon || "",
        ];

        configInserts.push({ sql: configSQL, values: configData });
      }
    }

    if (configInserts.length > 0) {
      await Transaction(configInserts);
    }

    return res.json(JsonSuccess("✅ Dashboard layout saved successfully"));
  } catch (error) {
    console.error("❌ Save layout error:", error);
    return res.status(500).json(JsonErrorResponse(error.message || "Internal server error"));
  }
};

const loadLayout = async (req, res) => {
    try {
        let dashboard_id = req.session.user.dashboard_id;
        console.log("📥 Loading dashboard layout for ID:", dashboard_id);
        

        let widgetSql = `SELECT * FROM dashboard_widgets WHERE dw_dashboard_id = ?`;
        SelectParameter(widgetSql, [dashboard_id], (widgetErr, widgets) => {
            if (widgetErr) {
                console.error(widgetErr);
                return res.json(JsonErrorResponse(widgetErr));
            }

            let configSql = `SELECT * FROM dashboard_widget_configs
            INNER JOIN maintenance_api ON dashboard_widget_configs.dwc_api_id = ma_id
            WHERE ma_status = 'ACTIVE'`;
            Select(configSql, (configErr, configs) => {
                if (configErr) {
                    console.error(configErr);
                    return res.json(JsonErrorResponse(configErr));
                }

                const widgetsWithConfigs = widgets.map(widget => {
                    return {
                        ...widget,
                        configs: configs.filter(cfg => cfg.dwc_widget_id === widget.dw_id)
                    };
                });

                res.json(JsonDataResponse(widgetsWithConfigs));
            });
        });

    } catch (error) {
        console.error(error);
        res.json(JsonErrorResponse(error));
    }
};

module.exports = {
    saveLayout,
    loadLayout
};

router.post("/save-layout", async (req, res) => {
  
});


router.get("/load-layout", async (req, res) => {
    
});
