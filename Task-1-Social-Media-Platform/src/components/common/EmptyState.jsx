import Button from './Button.jsx';

export default function EmptyState({
  icon: Icon,
  title = 'No items found',
  description = 'Try adjusting your search or explore new topics.',
  actionText,
  onAction
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3.5rem 1.5rem',
        textAlign: 'center',
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed var(--border)',
        backgroundColor: 'var(--bg-surface)'
      }}
      className="animate-fade-in-up"
    >
      {Icon && (
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem'
          }}
        >
          <Icon size={28} />
        </div>
      )}
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          maxWidth: '380px',
          marginBottom: actionText ? '1.5rem' : 0,
          lineHeight: 1.5
        }}
      >
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
