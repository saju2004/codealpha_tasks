export default function ProgressBar({ value = 0, color = 'var(--primary)', height = 7 }) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      style={{
        width: '100%',
        height: `${height}px`,
        backgroundColor: 'var(--surface-secondary)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${clampedValue}%`,
          backgroundColor: color,
          borderRadius: 'var(--radius-full)',
          transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />
    </div>
  );
}
