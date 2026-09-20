export default function MessageBubble({ message, isMe }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMe ? 'flex-end' : 'flex-start',
        marginBottom: '12px'
      }}
      className="animate-fade-in-up"
    >
      <div
        style={{
          maxWidth: '75%',
          padding: '0.75rem 1.1rem',
          borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          background: isMe ? 'var(--primary-gradient)' : 'var(--bg-surface-hover)',
          color: isMe ? '#ffffff' : 'var(--text-primary)',
          border: isMe ? 'none' : '1px solid var(--border)',
          fontSize: '0.925rem',
          lineHeight: 1.45,
          wordBreak: 'break-word',
          boxShadow: isMe ? '0 4px 12px rgba(99, 102, 241, 0.25)' : 'var(--shadow-sm)'
        }}
      >
        {message.text}
      </div>
      <span
        style={{
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          marginTop: '3px',
          padding: '0 4px'
        }}
      >
        {message.timestamp}
      </span>
    </div>
  );
}
