export default function Avatar({
  src,
  alt = 'User',
  size = 'md',
  isOnline = false,
  className = '',
  onClick
}) {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64
  };

  const dim = sizeMap[size] || sizeMap.md;

  return (
    <div
      onClick={onClick}
      className={`avatar-root ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dim,
        height: dim,
        borderRadius: '50%',
        flexShrink: 0,
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: 'var(--surface-secondary)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.textContent = alt ? alt.charAt(0).toUpperCase() : 'U';
            }}
          />
        ) : (
          <span
            style={{
              fontSize: size === 'xs' ? '0.65rem' : size === 'sm' ? '0.75rem' : '0.85rem',
              fontWeight: 700,
              color: 'var(--primary)'
            }}
          >
            {alt ? alt.charAt(0).toUpperCase() : 'U'}
          </span>
        )}
      </div>

      {isOnline && (
        <span
          title="Active now"
          style={{
            position: 'absolute',
            bottom: '1px',
            right: '1px',
            width: size === 'xs' ? '6px' : '9px',
            height: size === 'xs' ? '6px' : '9px',
            borderRadius: '50%',
            backgroundColor: 'var(--success)',
            border: '2px solid var(--surface)'
          }}
        />
      )}
    </div>
  );
}
