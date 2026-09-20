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
    md: { padding: '0.55rem 1.1rem', fontSize: '0.9rem', gap: '0.5rem', borderRadius: 'var(--radius-md)' },
    lg: { padding: '0.75rem 1.4rem', fontSize: '1rem', gap: '0.6rem', borderRadius: 'var(--radius-lg)' }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--primary-gradient)',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.35)',
          border: 'none'
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--surface)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)'
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--text-secondary)',
          border: 'none'
        };
      case 'danger':
        return {
          backgroundColor: 'var(--danger)',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
          border: 'none'
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--primary)',
          border: '1px solid var(--primary)'
        };
      case 'soft':
        return {
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)',
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
            animation: 'spin 0.8s linear infinite',
            display: 'inline-block'
          }}
        />
      )}
      {!loading && Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 19 : 16} />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 19 : 16} />}
    </button>
  );
}
