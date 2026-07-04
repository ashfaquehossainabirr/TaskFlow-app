import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { cssVar } from "../utils/getCssColor";
import "../styles/EmployeeTaskChart.css";

/* REGISTER */
ChartJS.register(ArcElement, Tooltip, Legend);

/* CENTER TEXT PLUGIN */
const centerTextPlugin = {
  id: "centerText",
  beforeDraw(chart) {
    const { width, height, ctx } = chart;
    const total = chart.config.options.plugins.centerText?.total;

    if (!total) return;

    ctx.save();

    ctx.font = "700 22px var(--font-mono)";
    ctx.fillStyle = cssVar("--text-primary");
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(total, width / 2, height / 2 - 6);

    ctx.font = "11px var(--font-body)";
    ctx.fillStyle = cssVar("--text-muted");
    ctx.fillText("tasks", width / 2, height / 2 + 14);

    ctx.restore();
  },
};

ChartJS.register(centerTextPlugin);

export default function EmployeeTaskChart({ employee }) {
  if (!employee) return null;

  const total =
    (employee.todo ?? 0) +
    (employee["in-progress"] ?? 0) +
    (employee.hold ?? 0) +
    (employee.delivered ?? 0) +
    (employee.cancelled ?? 0);

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
      intersect: true, // ✅ tooltip only on arcs
      mode: "nearest",
    },
    plugins: {
      centerText: {
        total,
      },
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
        caretPadding: 14,
        backgroundColor: cssVar("--bg-panel-raised"),
        titleColor: cssVar("--text-primary"),
        bodyColor: cssVar("--text-secondary"),
        borderColor: cssVar("--border-hairline"),
        borderWidth: 1,
        padding: 10,
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