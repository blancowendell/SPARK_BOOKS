import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FaUser,
  FaDollarSign,
  FaCheck,
  FaExclamationTriangle,
  FaStar,
} from "react-icons/fa";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const iconMap = {
  FaUser: <FaUser className="text-3xl text-indigo-500" />,
  FaDollarSign: <FaDollarSign className="text-3xl text-green-500" />,
  FaCheck: <FaCheck className="text-3xl text-green-600" />,
  FaExclamationTriangle: (
    <FaExclamationTriangle className="text-3xl text-yellow-500" />
  ),
  FaStar: <FaStar className="text-3xl text-yellow-400" />,
};


const WidgetPreview = ({ widget }) => {
  const commonClasses =
    "w-full h-full flex flex-col items-center justify-center text-sm font-medium p-2 overflow-auto";

  if (!widget) return null;

  // Static data for chart previews
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sample Data",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      y: { display: false },
      x: { display: false },
    },
  };

  switch (widget.type) {
    case "card":
      switch (widget.cardType) {
        case "leaderboard":
          return (
            <div
              className={`bg-white text-gray-800 p-4 rounded-lg shadow ${commonClasses}`}
            >
              <div className="font-bold w-full text-left text-sm mb-3">
                {widget.title || "Leaderboard"}
              </div>
              <ol className="space-y-3">
                {[
                  { name: "Alice", points: 150, image: "/avatars/alice.png" },
                  { name: "Bob", points: 140, image: "/avatars/bob.png" },
                  {
                    name: "Charlie",
                    points: 130,
                    image: "/avatars/charlie.png",
                  },
                ].map((user, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <span className="text-gray-600 font-semibold">
                      {user.points} pts
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          );

        case "statistics":
          return (
            <div className={`bg-indigo-100 text-indigo-800 ${commonClasses}`}>
              <div className="font-bold w-full text-left">
                {widget.title || "Statistics"}
              </div>
              <div className="grid grid-cols-2 gap-4 w-full mt-2 text-xs">
                <div className="p-2 bg-white rounded shadow text-center">
                  <div className="font-semibold">Visitors</div>
                  <div className="text-xl">1,234</div>
                </div>
                <div className="p-2 bg-white rounded shadow text-center">
                  <div className="font-semibold">Sales</div>
                  <div className="text-xl">$9,876</div>
                </div>
              </div>
            </div>
          );

        case "statusbar": // <--- Add this case                         
          const statusData = [
            {
              label: "Medium",
              value: 57,
              color: "from-pink-500 to-purple-500",
            },
            { label: "Low", value: 53, color: "from-green-400 to-green-600" },
            { label: "High", value: 8, color: "from-yellow-400 to-yellow-600" },
            { label: "Urgent", value: 5, color: "from-red-500 to-red-700" },
          ];
          const maxValue = Math.max(...statusData.map((s) => s.value));

          return (
            <div
              className={`bg-white text-gray-800 p-3 rounded-lg shadow-sm text-sm ${commonClasses}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold truncate">
                  {widget.title || "Ticket Priority"}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
                  </svg>
                </button>
              </div>

              {statusData.map((item, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <div className="flex justify-between mb-1">
                    <span className="truncate">{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                      style={{ width: `${(item.value / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          );

        case "scorecard":
          const cardWidth = widget.width || 200;
          const cardHeight = widget.height || 160;

          // Responsive font sizes
          const titleSize = cardWidth < 200 ? "text-xs" : "text-sm";
          const valueSize =
            cardWidth < 200
              ? "text-2xl"
              : cardWidth < 300
                ? "text-3xl"
                : "text-4xl";
          const subtitleSize = cardWidth < 200 ? "text-xs" : "text-sm";
          const changeSize = cardWidth < 200 ? "text-xs" : "text-sm";

          return (
            <div className="w-full h-full flex flex-col justify-between p-2 bg-white rounded shadow text-gray-800">
              {/* Top: Icon + Title */}
              <div className={`flex ${cardWidth < 160 ? "flex-col items-start" : "flex-row items-center justify-between"} gap-1`}>
                <div className={`flex items-center gap-2 ${titleSize}`}>
                  {widget.scorecardIcon && iconMap[widget.scorecardIcon]}
                  <span className="font-semibold truncate">{widget.title || "Score"}</span>
                </div>
                {cardWidth >= 160 && (
                  <div className={`text-indigo-600 font-bold ${valueSize}`}>
                    {widget.value || "92%"}
                  </div>
                )}
              </div>

              {/* Bottom: Value + Subtitle + Change */}
              <div className="flex flex-col items-end mt-auto">
                {cardWidth < 160 && (
                  <div className={`text-indigo-600 font-bold ${valueSize}`}>
                    {widget.value || "92%"}
                  </div>
                )}
                <div className="text-right leading-tight">
                  <div className={`${subtitleSize} truncate`}>
                    {widget.subtitle || "Satisfaction"}
                  </div>
                  <div
                    className={`font-medium ${changeSize} ${widget.change?.includes("-") ? "text-red-500" : "text-green-500"
                      }`}
                  >
                    {widget.change || "+3%"}
                  </div>
                </div>
              </div>
            </div>

          );

        case "default":
        default:
          return (
            <div className={`bg-blue-100 text-blue-800 ${commonClasses}`}>
              <div className="font-bold truncate w-full">
                {widget.title || "Card"}
              </div>
              <div className="text-xs mt-1 truncate w-full whitespace-normal">
                {widget.content || "Content..."}
              </div>
            </div>
          );
      }

    case "table":
      return (
        <div className={`bg-green-100 text-green-800 p-2 flex flex-col h-full`}>
          <div className="font-bold truncate w-full mb-2">
            {widget.title || "Table"}
          </div>
          <table className="min-w-full border-collapse border border-gray-400 text-xs">
            <thead>
              <tr className="bg-green-200">
                <th className="border border-gray-400 px-2 py-1">Name</th>
                <th className="border border-gray-400 px-2 py-1">Age</th>
                <th className="border border-gray-400 px-2 py-1">City</th>
                {widget.actions && (
                  <th className="border border-gray-400 px-2 py-1">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-green-50">
                <td className="border border-gray-400 px-2 py-1">John</td>
                <td className="border border-gray-400 px-2 py-1">30</td>
                <td className="border border-gray-400 px-2 py-1">NY</td>
                {widget.actions && (
                  <td className="border border-gray-400 px-2 py-1">
                    Edit | Delete
                  </td>
                )}
              </tr>
              <tr className="bg-green-100">
                <td className="border border-gray-400 px-2 py-1">Jane</td>
                <td className="border border-gray-400 px-2 py-1">25</td>
                <td className="border border-gray-400 px-2 py-1">LA</td>
                {widget.actions && (
                  <td className="border border-gray-400 px-2 py-1">
                    Edit | Delete
                  </td>
                )}
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-400 px-2 py-1">Mike</td>
                <td className="border border-gray-400 px-2 py-1">40</td>
                <td className="border border-gray-400 px-2 py-1">SF</td>
                {widget.actions && (
                  <td className="border border-gray-400 px-2 py-1">
                    Edit | Delete
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      );

    case "graph":
      if (!widget.chartType) {
        return (
          <div className={`bg-purple-100 text-purple-800 ${commonClasses}`}>
            <div className="font-bold truncate w-full">
              {widget.title || "Graph"}
            </div>
            <div className="text-xs mt-1 truncate w-full whitespace-normal">
              Select chart type
            </div>
          </div>
        );
      }

      if (widget.chartType === "bar") {
        return (
          <div
            className={`bg-purple-100 text-purple-800 ${commonClasses}`}
            style={{ height: "100%" }}
          >
            <Bar data={chartData} options={chartOptions} />
          </div>
        );
      }
      if (widget.chartType === "line") {
        return (
          <div
            className={`bg-purple-100 text-purple-800 ${commonClasses}`}
            style={{ height: "100%" }}
          >
            <Line data={chartData} options={chartOptions} />
          </div>
        );
      }
      if (widget.chartType === "pie") {
        return (
          <div
            className={`bg-purple-100 text-purple-800 ${commonClasses}`}
            style={{ height: "100%" }}
          >
            <Pie
              data={{
                labels: ["Red", "Blue", "Yellow"],
                datasets: [
                  {
                    data: [300, 50, 100],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        );
      }

      if (widget.chartType === "doughnut") {
        return (
          <div
            className={`bg-purple-100 text-purple-800 ${commonClasses}`}
            style={{ height: "100%" }}
          >
            <Pie
              data={{
                labels: ["Completed", "Remaining"],
                datasets: [
                  {
                    data: [70, 30],
                    backgroundColor: ["#10B981", "#E5E7EB"],
                    hoverBackgroundColor: ["#059669", "#D1D5DB"],
                    borderWidth: 0,
                  },
                ],
              }}
              options={{
                responsive: true,
                cutout: "70%",
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        );
      }

      return null;

    default:
      return null;
  }
};

export default WidgetPreview;
