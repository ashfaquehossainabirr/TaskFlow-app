import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { cssVar } from "../utils/getCssColor";
import "../styles/EmployeeTaskChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EmployeeTaskChart({ employee }) {
  const STATUS_COLORS = [
    cssVar("--status-todo"),
    cssVar("--status-progress"),
    cssVar("--status-hold"),
    cssVar("--status-delivered"),
    cssVar("--status-cancelled"),
  ];

  const data = {
    labels: [
      "To Do",
      "In Progress",
      "On Hold",
      "Delivered",
      "Cancelled",
    ],
    datasets: [
      {
        data: [
          employee.todo ?? 0,
          employee["in-progress"] ?? 0,
          employee.hold ?? 0,
          employee.delivered ?? 0,
          employee.cancelled ?? 0,
        ],
        backgroundColor: STATUS_COLORS,
        hoverBackgroundColor: STATUS_COLORS,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",

    interaction: {
      intersect: true,
      mode: "nearest",
    },

    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          padding: 16,
          color: cssVar("--text-secondary"),
          font: { size: 11 },
        },
      },
      tooltip: {
        position: "nearest",
        yAlign: "bottom",
        xAlign: "center",
        caretPadding: 14,
        padding: 10,
        backgroundColor: cssVar("--bg-panel-raised"),
        titleColor: cssVar("--text-primary"),
        bodyColor: cssVar("--text-secondary"),
        borderColor: cssVar("--border-hairline"),
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="employee-chart-card">
      <div className="chart-title">Task Breakdown</div>
      <div className="chart-wrapper">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}