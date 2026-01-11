import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import DashboardAPI from "../../../../api/private/dashboard/dashboardAPI";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const ChartWidget = ({ widget, config }) => {
  const { dw_title = 'Chart Widget' } = widget;
  const { dwc_chart_type, ma_api_name } = config;

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (ma_api_name) {
      DashboardAPI.loadMaintenanceApi(ma_api_name)
        .then(data => {
          console.log("Raw API Data:", data);

          const labels = data.map(item => item.status);
          const values = data.map(item => item.status_count);

          setChartData({
            labels,
            datasets: [
              {
                label: dw_title,
                data: values,
                backgroundColor: [
                  '#60a5fa',
                  '#f87171',
                  '#34d399',
                  '#fbbf24',
                  '#f472b6',
                  '#38bdf8'
                ],
                borderWidth: 1,
              }
            ]
          });
        })
        .catch(err => console.error("Chart API load error:", err));
    }
  }, [ma_api_name, dw_title]);


  const chartMap = {
    bar: Bar,
    line: Line,
    pie: Pie,
    doughnut: Doughnut
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        enabled: true
      }
    }
  };

  const ChartComponent = chartMap[dwc_chart_type?.toLowerCase()] || Bar;

  return (
    <div className="bg-white p-5 rounded-2xl shadow w-full">
      <div className="text-gray-700 font-semibold text-lg mb-4">{dw_title}</div>
      <div className="relative h-64 min-h-[250px]">
        {chartData ? (
          <ChartComponent data={chartData} options={chartOptions} />
        ) : (
          <div className="text-gray-400 text-sm">Loading chart...</div>
        )}
      </div>
    </div>
  );
};

export default ChartWidget;
