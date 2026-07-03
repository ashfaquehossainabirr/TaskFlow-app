import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Sidebar.css";

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <>
      {/* MOBILE OVERLAY */}
      <div
        className={`sidebar-overlay ${open ? "show" : ""}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        {/* HEADER */}
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-logo">T</div>
            <span className="brand-name">TaskFlow</span>
          </div>

          <button className="close-btn" onClick={onClose} aria-label="Close menu">
            ✕
          </button>
        </div>

        {/* NAV */}
        <nav className="sidebar-nav">
          <NavLink to="/" end className="nav-link">
            Overview
          </NavLink>

          <NavLink to="/tasks" className="nav-link">
            {isAdmin ? "All Tasks" : "My Tasks"}
          </NavLink>

          <NavLink to="/deadlines" className="nav-link">
            Deadline Watch
          </NavLink>

          {isAdmin && (
            <NavLink to="/users" className="nav-link">
              Team &amp; Access
            </NavLink>
          )}
        </nav>

        {/* FOOTER */}
        <div className="sidebar-footer">
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span
              className={`user-role ${
                user?.role === "admin" ? "admin" : ""
              }`}
            >
              {user?.role}
            </span>
          </div>

          <button className="logout-btn" onClick={logout}>
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}