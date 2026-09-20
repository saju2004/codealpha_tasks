export default function ProfileStats({ postsCount = 0, followersCount = 0, followingCount = 0 }) {
  const stats = [
    { label: 'Posts', value: postsCount.toLocaleString() },
    { label: 'Followers', value: followersCount.toLocaleString() },
    { label: 'Following', value: followingCount.toLocaleString() }
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        margin: '1rem 0'
      }}
    >
      {stats.map((stat, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {stat.value}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
