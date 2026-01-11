import React, { useEffect, useState } from "react";
import DashboardAPI from "../../../../api/private/dashboard/dashboardAPI";
import Table from "../../../Tables/index";

const TableWidget = ({ widget, config }) => {
  const { dw_title = "Table Widget" } = widget;
  const {
    dwc_custom_styles,
    dwc_table_columns,
    dwc_table_data,
    ma_api_name,
  } = config;

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Parse styles
  let customStyles = {};
  try {
    customStyles = JSON.parse(dwc_custom_styles || "{}");
  } catch (e) {
    console.warn("Invalid JSON in dwc_custom_styles:", dwc_custom_styles);
  }

  // Parse fallback data
  let tableColumns = [];
  let tableData = [];
  try {
    tableColumns = JSON.parse(dwc_table_columns || "[]");
    tableData = JSON.parse(dwc_table_data || "[]");
  } catch (e) {
    console.warn("Invalid JSON in dwc_table_columns or dwc_table_data:", e);
  }

  // Fetch API data dynamically
  useEffect(() => {
    const fetchData = async () => {
      if (!ma_api_name) return;
      setLoading(true);
      try {
        const data = await DashboardAPI.loadMaintenanceApi(ma_api_name);
        setApiData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading API data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ma_api_name]);

  // Determine which data to use
  const effectiveColumns =
    apiData && apiData.length > 0
      ? Object.keys(apiData[0])
      : tableColumns;

  const effectiveData =
    apiData && apiData.length > 0
      ? apiData
      : tableData.map((row) => {
          // Convert array rows (from old JSON) into key-value pairs
          const rowObj = {};
          tableColumns.forEach((col, idx) => {
            rowObj[col] = row[idx];
          });
          return rowObj;
        });

  return (
    <div
      className="bg-white shadow rounded-2xl p-4 w-full"
      style={customStyles}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-gray-700 text-sm font-bold">{dw_title}</div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-5">Loading data...</div>
      ) : (
        <Table
          headers={effectiveColumns}
          keys={effectiveColumns}
          data={effectiveData}
          rowsPerPage={5}
          withEdit={false}
          withDelete={false}
          withActions={false}
        />
      )}
    </div>
  );
};

export default TableWidget;
