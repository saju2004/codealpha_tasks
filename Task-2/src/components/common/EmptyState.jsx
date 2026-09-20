import Button from './Button.jsx';

export default function EmptyState({
  icon: Icon,
  title = 'No items found',
  description = 'Get started by creating your first item.',
  actionText,
  onAction
}) {
  return (
    <div
      className="card animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3.5rem 1.5rem',
        textAlign: 'center',
        backgroundColor: 'var(--surface)',
        border: '1px dashed var(--border)'
      }}
    >
      {Icon && (
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem'
          }}
        >
          <Icon size={26} />
        </div>
      )}
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '380px', marginBottom: actionText ? '1.25rem' : 0, lineHeight: 1.5 }}>
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
