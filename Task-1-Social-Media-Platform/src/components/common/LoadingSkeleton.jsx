export default function LoadingSkeleton({ type = 'post', count = 1 }) {
  const renderItem = (key) => {
    if (type === 'post') {
      return (
        <div
          key={key}
          className="surface-card"
          style={{ padding: '1.25rem', marginBottom: '1.25rem' }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div
              className="skeleton-shimmer"
              style={{ width: 44, height: 44, borderRadius: '50%' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              <div
                className="skeleton-shimmer"
                style={{ width: '35%', height: '14px', borderRadius: '4px' }}
              />
              <div
                className="skeleton-shimmer"
                style={{ width: '20%', height: '10px', borderRadius: '4px' }}
              />
            </div>
          </div>

          {/* Text lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem' }}>
            <div
              className="skeleton-shimmer"
              style={{ width: '90%', height: '12px', borderRadius: '4px' }}
            />
            <div
              className="skeleton-shimmer"
              style={{ width: '70%', height: '12px', borderRadius: '4px' }}
            />
          </div>

          {/* Image block */}
          <div
            className="skeleton-shimmer"
            style={{ width: '100%', height: '240px', borderRadius: 'var(--radius-md)' }}
          />
        </div>
      );
    }

    if (type === 'user') {
      return (
        <div
          key={key}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '0.75rem 0'
          }}
        >
          <div className="skeleton-shimmer" style={{ width: 40, height: 40, borderRadius: '50%' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="skeleton-shimmer" style={{ width: '40%', height: '12px', borderRadius: '4px' }} />
            <div className="skeleton-shimmer" style={{ width: '25%', height: '10px', borderRadius: '4px' }} />
          </div>
        </div>
      );
    }

    return (
      <div
        key={key}
        className="skeleton-shimmer"
        style={{ width: '100%', height: '20px', borderRadius: '4px', marginBottom: '8px' }}
      />
    );
  };

  return (
    <div>
      {Array.from({ length: count }).map((_, idx) => renderItem(idx))}
    </div>
  );
}
