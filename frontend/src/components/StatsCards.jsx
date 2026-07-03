const CARDS = [
  { key: 'todo', label: 'To Do', color: 'var(--status-todo)' },
  { key: 'in-progress', label: 'In Progress', color: 'var(--status-progress)' },
  { key: 'hold', label: 'On Hold', color: 'var(--status-hold)' },
  { key: 'delivered', label: 'Delivered', color: 'var(--status-delivered)' },
  { key: 'cancelled', label: 'Cancelled', color: 'var(--status-cancelled)' },
];

export default function StatsCards({ stats, loading }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: 12,
        marginBottom: 28,
      }}
    >
      {CARDS.map((c) => (
        <div
          key={c.key}
          style={{
            background: 'var(--bg-panel)',
            border: '1px solid var(--border-hairline-soft)',
            borderRadius: 'var(--radius-lg)',
            padding: '18px 18px 16px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 3,
              height: '100%',
              background: c.color,
            }}
          />
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: 10,
            }}
          >
            {c.label}
          </div>
          <div className="mono" style={{ fontSize: 30, fontWeight: 600, color: 'var(--text-primary)' }}>
            {loading ? '—' : stats?.[c.key] ?? 0}
          </div>
        </div>
      ))}
    </div>
  );
}
