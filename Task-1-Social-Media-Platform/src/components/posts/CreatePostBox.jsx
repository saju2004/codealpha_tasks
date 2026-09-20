import { Image, Smile, MapPin } from 'lucide-react';
import Avatar from '../common/Avatar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function CreatePostBox({ onOpenModal }) {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div
      className="surface-card"
      style={{
        padding: '1.15rem 1.25rem',
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
        <div
          onClick={onOpenModal}
          style={{
            flex: 1,
            backgroundColor: 'var(--bg-input)',
            borderRadius: 'var(--radius-full)',
            padding: '0.65rem 1.25rem',
            color: 'var(--text-muted)',
            fontSize: '0.925rem',
            cursor: 'pointer',
            border: '1px solid var(--border)',
            transition: 'all var(--transition-fast)'
          }}
          className="interactive-btn"
        >
          What are you working on, {currentUser.name.split(' ')[0]}?
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '0.65rem'
        }}
      >
        <button
          onClick={onOpenModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-secondary)'
          }}
          className="interactive-btn"
        >
          <Image size={18} color="#10b981" />
          <span>Photo</span>
        </button>

        <button
          onClick={onOpenModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-secondary)'
          }}
          className="interactive-btn"
        >
          <Smile size={18} color="#f59e0b" />
          <span>Feeling</span>
        </button>

        <button
          onClick={onOpenModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-secondary)'
          }}
          className="interactive-btn"
        >
          <MapPin size={18} color="#ec4899" />
          <span>Location</span>
        </button>
      </div>
    </div>
  );
}
