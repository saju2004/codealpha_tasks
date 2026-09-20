import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Sparkles, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { usePosts } from '../../context/PostContext.jsx';
import Avatar from '../common/Avatar.jsx';
import Button from '../common/Button.jsx';

export default function RightSidebar() {
  const { users, currentUser } = useAuth();
  const { toggleFollowUser } = usePosts();
  const navigate = useNavigate();

  // Suggestions: users other than current user
  const suggestions = users
    .filter(u => u.id !== currentUser?.id)
    .slice(0, 4);

  const trendingTopics = [
    { tag: '#DesignSystem', posts: '12.4k posts', category: 'Design · Trending' },
    { tag: '#ReactJS', posts: '45.2k posts', category: 'Technology · Trending' },
    { tag: '#Minimalism', posts: '8.1k posts', category: 'Lifestyle · Trending' },
    { tag: '#IndieHacker', posts: '19.8k posts', category: 'Startups · Trending' },
    { tag: '#Cascades', posts: '5.6k posts', category: 'Photography · Trending' }
  ];

  return (
    <aside className="right-panel-column">
      {/* Who to follow */}
      <div
        className="surface-card"
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} color="var(--primary)" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Who to Follow</h4>
          </div>
          <Link
            to="/explore"
            style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}
          >
            See all
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {suggestions.map((user) => {
            const isFollowing = currentUser?.following?.includes(user.id);
            return (
              <div
                key={user.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}
              >
                <Link
                  to={`/profile/${user.username}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    overflow: 'hidden',
                    flex: 1
                  }}
                >
                  <Avatar src={user.avatar} alt={user.name} size="sm" />
                  <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <span
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                      }}
                    >
                      {user.name}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                      }}
                    >
                      @{user.username}
                    </span>
                  </div>
                </Link>

                <Button
                  variant={isFollowing ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => toggleFollowUser(user.id)}
                  style={{ minWidth: '76px', padding: '0.3rem 0.6rem' }}
                >
                  {isFollowing ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Check size={12} /> Following
                    </span>
                  ) : (
                    'Follow'
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trending Topics */}
      <div
        className="surface-card"
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={18} color="var(--accent)" />
          <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Trends for you</h4>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {trendingTopics.map((topic, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/explore?tag=${encodeURIComponent(topic.tag.replace('#', ''))}`)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                padding: '0.35rem 0',
                borderRadius: 'var(--radius-sm)',
                transition: 'background-color var(--transition-fast)'
              }}
              className="interactive-btn"
            >
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {topic.category}
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {topic.tag}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {topic.posts}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          padding: '0 0.5rem'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <Link to="/settings">Privacy</Link>
          <span>·</span>
          <Link to="/settings">Terms</Link>
          <span>·</span>
          <Link to="/explore">Explore</Link>
          <span>·</span>
          <Link to="/settings">Preferences</Link>
        </div>
        <div>© 2026 SocialSphere by Sajum · Modern Social Platform</div>
      </div>
    </aside>
  );
}
