export default function Avatar({
  src,
  alt = 'User avatar',
  size = 'md',
  borderGradient = false,
  isOnline = false,
  className = '',
  onClick
}) {
  const sizeClasses = {
    xs: { dim: 28, text: '0.7rem' },
    sm: { dim: 36, text: '0.8rem' },
    md: { dim: 44, text: '0.95rem' },
    lg: { dim: 60, text: '1.25rem' },
    xl: { dim: 96, text: '2rem' },
    xxl: { dim: 120, text: '2.5rem' }
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: currentSize.dim,
        height: currentSize.dim,
        borderRadius: '50%',
        cursor: onClick ? 'pointer' : 'default',
        padding: borderGradient ? '2px' : '0',
        background: borderGradient
          ? 'var(--primary-gradient)'
          : 'transparent',
        flexShrink: 0
      }}
      className={`avatar-wrapper ${className}`}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          background: 'var(--bg-surface-elevated)',
          border: borderGradient ? '2px solid var(--bg-body)' : '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.textContent = alt ? alt.charAt(0).toUpperCase() : 'U';
            }}
          />
        ) : (
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              color: 'var(--primary)',
              fontSize: currentSize.text
            }}
          >
            {alt ? alt.charAt(0).toUpperCase() : 'U'}
          </span>
        )}
      </div>

      {isOnline && (
        <span
          title="Online"
          style={{
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: size === 'xs' || size === 'sm' ? '8px' : '12px',
            height: size === 'xs' || size === 'sm' ? '8px' : '12px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            border: '2px solid var(--bg-surface)',
            boxShadow: '0 0 4px rgba(16, 185, 129, 0.5)'
          }}
        />
      )}
    </div>
  );
}
