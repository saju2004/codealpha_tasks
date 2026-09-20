import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  MapPin, 
  Link as LinkIcon, 
  Calendar, 
  Edit3, 
  MessageSquare, 
  UserPlus, 
  UserCheck 
} from 'lucide-react';
import Avatar from '../common/Avatar.jsx';
import Button from '../common/Button.jsx';
import ProfileStats from './ProfileStats.jsx';
import EditProfileModal from './EditProfileModal.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { usePosts } from '../../context/PostContext.jsx';
import { useMessages } from '../../context/MessageContext.jsx';

export default function ProfileHeader({ user, isCurrentUser }) {
  const { currentUser } = useAuth();
  const { toggleFollowUser } = usePosts();
  const { startOrGetConversation } = useMessages();
  const navigate = useNavigate();

  const [editModalOpen, setEditModalOpen] = useState(false);

  const isFollowing = currentUser?.following?.includes(user?.id);

  const handleMessageUser = () => {
    if (!user) return;
    startOrGetConversation(user.id);
    navigate('/messages');
  };

  if (!user) return null;

  return (
    <div className="surface-card" style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
      {/* Cover Photo */}
      <div
        style={{
          height: '190px',
          width: '100%',
          position: 'relative',
          backgroundColor: 'var(--bg-surface-elevated)',
          backgroundImage: user.cover ? `url(${user.cover})` : 'var(--primary-gradient)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)'
          }}
        />
      </div>

      {/* Profile Details Container */}
      <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', position: 'relative' }}>
        {/* Avatar & Action Button Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginTop: '-50px',
            marginBottom: '1rem',
            position: 'relative',
            zIndex: 10
          }}
        >
          <div
            style={{
              padding: '4px',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: '50%',
              display: 'inline-block'
            }}
          >
            <Avatar src={user.avatar} alt={user.name} size="xl" />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {isCurrentUser ? (
              <Button
                variant="secondary"
                size="md"
                icon={Edit3}
                onClick={() => setEditModalOpen(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="md"
                  icon={MessageSquare}
                  onClick={handleMessageUser}
                >
                  Message
                </Button>
                <Button
                  variant={isFollowing ? 'secondary' : 'primary'}
                  size="md"
                  icon={isFollowing ? UserCheck : UserPlus}
                  onClick={() => toggleFollowUser(user.id)}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* User Titles */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{user.name}</h2>
            {user.verified && (
              <CheckCircle2 size={20} color="var(--primary)" fill="var(--primary-light)" />
            )}
          </div>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            @{user.username}
          </span>
        </div>

        {/* Bio */}
        {user.bio && (
          <p
            style={{
              margin: '0.85rem 0',
              fontSize: '0.95rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              maxWidth: '600px'
            }}
          >
            {user.bio}
          </p>
        )}

        {/* Meta Info (Location, Website, Joined) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.825rem',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem'
          }}
        >
          {user.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={15} color="var(--accent)" />
              <span>{user.location}</span>
            </div>
          )}
          {user.website && (
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: 'var(--primary)',
                fontWeight: 600
              }}
            >
              <LinkIcon size={14} />
              <span>{user.website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Calendar size={15} />
            <span>Joined {user.joined || 'Recently'}</span>
          </div>
        </div>

        {/* Follower / Following Stats */}
        <ProfileStats
          postsCount={user.postsCount || 0}
          followersCount={user.followersCount || 0}
          followingCount={user.followingCount || 0}
        />
      </div>

      {isCurrentUser && (
        <EditProfileModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
}
