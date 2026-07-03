import Sidebar from './Sidebar';

export default function PageShell({ title, subtitle, actions, children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '32px 40px', maxWidth: 1240 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 28,
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 26,
                fontWeight: 700,
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)', fontSize: 14 }}>{subtitle}</p>
            )}
          </div>
          {actions && <div style={{ display: 'flex', gap: 10 }}>{actions}</div>}
        </div>
        {children}
      </main>
    </div>
  );
}
