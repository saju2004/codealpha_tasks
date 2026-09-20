export default function StatCard({
  icon: Icon,
  value,
  label,
  trend,
  trendPositive = true,
  supportingText,
  color = 'var(--primary)',
  bg = 'var(--primary-light)'
}) {
  return (
    <div
      className="card animate-fade-in interactive-btn"
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '12px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {label}
        </span>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 'var(--radius-md)',
            backgroundColor: bg,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {Icon && <Icon size={19} />}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
          {value}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
          {trend && (
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: trendPositive ? 'var(--success)' : 'var(--danger)',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              {trend}
            </span>
          )}
          {supportingText && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {supportingText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
