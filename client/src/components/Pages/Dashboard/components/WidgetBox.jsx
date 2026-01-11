import React, { useEffect, useState } from 'react';
import { iconMap } from './parts/IconMap';
import DashboardAPI from "../../../../api/private/dashboard/dashboardAPI";

const WidgetBox = ({ widget, config }) => {
  const {
    dw_title = 'Card',
  } = widget;

  const {
    dwc_param,
    dwc_custom_styles,
    dwc_card_icon,
    ma_api_name,
  } = config;

  const [apiData, setApiData] = useState(null);

  let customStyles = {};
  try {
    customStyles = JSON.parse(dwc_custom_styles || '{}');
  } catch (e) {
    console.warn("Invalid JSON in dwc_custom_styles:", dwc_custom_styles);
  }

  useEffect(() => {
    if (ma_api_name) {
      DashboardAPI.loadMaintenanceApi(ma_api_name)
        .then((data) => setApiData(data))
        .catch((err) => console.error("Error loading API data:", err));
    }
  }, [ma_api_name]);

  const metricValue = Array.isArray(apiData) && apiData.length > 0
    ? Object.values(apiData[0])[0]
    : '-';

  const IconComponent = iconMap[dwc_card_icon] || iconMap["FaChartBar"];

  return (
    <div className="bg-white shadow rounded-2xl p-5 w-full" style={customStyles}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-gray-700 text-sm font-bold">{dw_title}</div>
        <div className="text-blue-600 bg-blue-100 p-2 rounded-full">
          <IconComponent size={20} />
        </div>
      </div>

      <div className="text-3xl font-bold text-gray-900">
        {metricValue}
      </div>

      {dwc_param && (
        <div className="text-xs text-gray-400 mt-2">
          Param: {dwc_param}
        </div>
      )}
    </div>
  );



};

export default WidgetBox;
