import { useState } from "react";
import EmployeeDetailModal from "./EmployeeDetailModal";
import "../styles/EmployeeStatCard.css";

const MINI_STATS = [
  { key: "todo", label: "To Do", color: "var(--status-todo)" },
  { key: "in-progress", label: "In Progress", color: "var(--status-progress)" },
  { key: "hold", label: "On Hold", color: "var(--status-hold)" },
  { key: "delivered", label: "Delivered", color: "var(--status-delivered)" },
  { key: "cancelled", label: "Cancelled", color: "var(--status-cancelled)" },
];

export default function EmployeeStatCard({ employee }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="employee-card" onClick={() => setOpen(true)}>
        <div className="employee-header">
          <div>
            <div className="employee-name">{employee.name}</div>
            <div className="employee-email mono">{employee.email}</div>
            {employee.department && (
              <div className="employee-dept">{employee.department}</div>
            )}
          </div>

          <div className="project-count">
            <div className="project-number mono">{employee.projects}</div>
            <div className="project-label">Projects</div>
          </div>
        </div>

        <div className="employee-stats">
          {MINI_STATS.map((s) => (
            <div key={s.key} className="mini-stat">
              <span
                className="stat-bar"
                style={{ background: s.color }}
              />
              <div className="mini-value mono">
                {employee[s.key] ?? 0}
              </div>
              <div className="mini-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="employee-total">
          <span className="mono">{employee.total}</span> tasks total
        </div>
      </div>

      {open && (
        <EmployeeDetailModal
          employee={employee}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}