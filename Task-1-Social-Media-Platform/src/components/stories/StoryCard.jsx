import { Plus } from 'lucide-react';
import Avatar from '../common/Avatar.jsx';

export default function StoryCard({ story, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        width: '74px',
        flexShrink: 0
      }}
      className="interactive-btn"
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            padding: '2.5px',
            borderRadius: '50%',
            background: story.hasUnseen ? 'var(--primary-gradient)' : 'var(--border)',
            transition: 'transform var(--transition-fast)'
          }}
          className={story.hasUnseen ? 'story-ring-glow' : ''}
        >
          <div
            style={{
              padding: '2px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-body)'
            }}
          >
            <Avatar src={story.userAvatar} alt={story.userName} size="lg" />
          </div>
        </div>

        {story.isCurrentUser && (
          <div
            style={{
              position: 'absolute',
              bottom: '4px',
              right: '4px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--bg-body)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Plus size={13} strokeWidth={3} />
          </div>
        )}
      </div>

      <span
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontWeight: story.hasUnseen ? 600 : 400
        }}
      >
        {story.userName}
      </span>
    </div>
  );
}
