import "../styles/EmployeeDetailModal.css";

export default function EmployeeDetailModal({ employee, onClose }) {
  return (
    <>
      <div className="modal-overlay" onClick={onClose} />

      <div className="employee-modal">
        <header className="modal-header">
          <div>
            <h2>{employee.name}</h2>
            <p className="mono">{employee.email}</p>
            {employee.department && (
              <span className="modal-dept">{employee.department}</span>
            )}
          </div>

          <button className="modal-close" onClick={onClose}>✕</button>
        </header>

        <section className="modal-content">
          <div className="modal-stat">
            <span>Total Projects</span>
            <strong>{employee.projects}</strong>
          </div>

          <div className="modal-stat">
            <span>Total Tasks</span>
            <strong>{employee.total}</strong>
          </div>

          <div className="modal-grid">
            {Object.entries(employee).map(([key, value]) =>
              typeof value === "number" ? (
                <div key={key} className="modal-grid-item">
                  <span>{key}</span>
                  <strong>{value}</strong>
                </div>
              ) : null
            )}
          </div>
        </section>
      </div>
    </>
  );
}