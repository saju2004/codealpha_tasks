export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const sizeStyles = {
    sm: { padding: '0.35rem 0.75rem', fontSize: '0.8125rem', gap: '0.35rem', borderRadius: 'var(--radius-sm)' },
    md: { padding: '0.55rem 1.15rem', fontSize: '0.9375rem', gap: '0.5rem', borderRadius: 'var(--radius-md)' },
    lg: { padding: '0.75rem 1.5rem', fontSize: '1.05rem', gap: '0.65rem', borderRadius: 'var(--radius-lg)' }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--primary-gradient)',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)',
          border: 'none'
        };
      case 'secondary':
        return {
          background: 'var(--bg-surface-elevated)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)'
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: 'var(--text-secondary)',
          border: 'none'
        };
      case 'danger':
        return {
          background: 'var(--danger)',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
          border: 'none'
        };
      case 'outline':
        return {
          background: 'transparent',
          color: 'var(--primary)',
          border: '1px solid var(--primary)'
        };
      case 'soft':
        return {
          background: 'var(--primary-light)',
          color: 'var(--primary-dark)',
          border: 'none'
        };
      default:
        return {};
    }
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;
  const currentVariant = getVariantStyles();

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`interactive-btn ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        width: fullWidth ? '100%' : 'auto',
        ...currentSize,
        ...currentVariant,
        userSelect: 'none'
      }}
      {...props}
    >
      {loading && (
        <span
          style={{
            width: '1em',
            height: '1em',
            border: '2px solid currentColor',
            borderRightColor: 'transparent',
            borderRadius: '50%',
            animation: 'storyBorderRotate 0.8s linear infinite',
            display: 'inline-block'
          }}
        />
      )}
      {!loading && Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 17} />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 17} />}
    </button>
  );
}
