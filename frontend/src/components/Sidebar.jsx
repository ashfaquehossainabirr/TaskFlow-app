import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const linkStyle = ({ isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 14px',
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 500,
  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
  background: isActive ? 'var(--bg-panel-raised)' : 'transparent',
  border: isActive ? '1px solid var(--border-hairline)' : '1px solid transparent',
});

export default function Sidebar() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <aside
      style={{
        width: 232,
        flexShrink: 0,
        background: 'var(--bg-panel)',
        borderRight: '1px solid var(--border-hairline-soft)',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 14px',
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '4px 8px 26px' }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 7,
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--status-progress))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: 13,
            color: '#0b1017',
          }}
        >
          T
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em' }}>
          TaskFlow
        </span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <NavLink to="/" end style={linkStyle}>
          Overview
        </NavLink>
        <NavLink to="/tasks" style={linkStyle}>
          {isAdmin ? 'All Tasks' : 'My Tasks'}
        </NavLink>
        <NavLink to="/deadlines" style={linkStyle}>
          Deadline Watch
        </NavLink>
        {isAdmin && (
          <NavLink to="/users" style={linkStyle}>
            Team &amp; Access
          </NavLink>
        )}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border-hairline-soft)' }}>
        <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name}</span>
          <span
            className="mono"
            style={{
              fontSize: 11,
              color: user?.role === 'admin' ? 'var(--accent-cyan)' : 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {user?.role}
          </span>
        </div>
        <button
          onClick={logout}
          style={{
            width: '100%',
            marginTop: 8,
            padding: '9px 12px',
            borderRadius: 8,
            background: 'transparent',
            border: '1px solid var(--border-hairline)',
            color: 'var(--text-secondary)',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
