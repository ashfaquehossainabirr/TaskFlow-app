import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { cssVar } from "../utils/getCssColor";
import "../styles/EmployeeTaskChart.css";

/* REGISTER CORE */
ChartJS.register(ArcElement, Tooltip, Legend);

/* CENTER TEXT PLUGIN */
const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart) {
    const { ctx, chartArea } = chart;
    const total = chart.options.plugins.centerText?.total;

    if (!total) return;

    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;

    ctx.save();

    /* BIG NUMBER */
    ctx.font = "700 30px var(--font-mono)";
    ctx.fillStyle = cssVar("--text-primary");
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(total, centerX, centerY - 6);

    /* LABEL */
    ctx.font = "16px var(--font-body)";
    ctx.fillStyle = cssVar("--text-muted");
    ctx.fillText("tasks", centerX, centerY + 18);

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
        backgroundColor: [
          cssVar("--status-todo"),
          cssVar("--status-progress"),
          cssVar("--status-hold"),
          cssVar("--status-delivered"),
          cssVar("--status-cancelled"),
        ],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",

    /* TOOLTIP ONLY ON ARCS */
    interaction: {
      mode: "nearest",
      intersect: true,
    },

    plugins: {
      centerText: {
        total,
      },

      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          padding: 16,
          color: cssVar("--text-secondary"),
          font: { size: 11 },
        },
      },

      /* TOOLTIP OUTSIDE CHART */
      tooltip: {
        position: "average",
        yAlign: "bottom",
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