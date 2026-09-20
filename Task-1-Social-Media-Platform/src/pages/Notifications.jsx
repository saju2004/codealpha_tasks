import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Heart, 
  MessageCircle, 
  UserPlus, 
  Flame, 
  CheckCheck, 
  AtSign 
} from 'lucide-react';
import Avatar from '../components/common/Avatar.jsx';
import Button from '../components/common/Button.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { usePosts } from '../context/PostContext.jsx';

export default function Notifications() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = usePosts();
  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'like' | 'comment' | 'follow'

  const filteredNotifs = notifications.filter((notif) => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'like') return notif.type === 'like';
    if (filter === 'comment') return notif.type === 'comment';
    if (filter === 'follow') return notif.type === 'follow';
    return true; // 'all'
  });

  const getNotifIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart size={14} fill="#ec4899" color="#ec4899" />;
      case 'comment':
        return <MessageCircle size={14} fill="#6366f1" color="#6366f1" />;
      case 'follow':
        return <UserPlus size={14} color="#10b981" />;
      case 'trending':
        return <Flame size={14} fill="#f59e0b" color="#f59e0b" />;
      case 'mention':
        return <AtSign size={14} color="#3b82f6" />;
      default:
        return <Bell size={14} color="var(--primary)" />;
    }
  };

  return (
    <div className="notifications-page animate-fade-in-up">
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem'
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Notifications</h2>
        {notifications.some(n => !n.read) && (
          <Button
            variant="ghost"
            size="sm"
            icon={CheckCheck}
            onClick={markAllNotificationsAsRead}
          >
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '1.25rem',
          scrollbarWidth: 'none'
        }}
      >
        {['all', 'unread', 'like', 'comment', 'follow'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.825rem',
              fontWeight: 600,
              textTransform: 'capitalize',
              backgroundColor: filter === f ? 'var(--primary-light)' : 'var(--bg-surface)',
              color: filter === f ? 'var(--primary-dark)' : 'var(--text-secondary)',
              border: '1px solid var(--border)',
              transition: 'all var(--transition-fast)'
            }}
            className="interactive-btn"
          >
            {f === 'all' ? 'All Activity' : f}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filteredNotifs.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className="surface-card interactive-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '1rem',
                backgroundColor: notif.read ? 'var(--bg-surface)' : 'var(--primary-light)',
                borderLeft: notif.read ? '1px solid var(--border)' : '4px solid var(--primary)',
                position: 'relative'
              }}
            >
              {/* Avatar + Notification Icon Badge */}
              <div style={{ position: 'relative' }}>
                {notif.actorUsername ? (
                  <Link to={`/profile/${notif.actorUsername}`} onClick={(e) => e.stopPropagation()}>
                    <Avatar src={notif.actorAvatar} alt={notif.actorName} size="md" />
                  </Link>
                ) : (
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary)'
                    }}
                  >
                    <Flame size={22} />
                  </div>
                )}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {getNotifIcon(notif.type)}
                </div>
              </div>

              {/* Notification Message */}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0 }}>
                  {notif.actorName && (
                    <strong style={{ fontWeight: 700 }}>{notif.actorName} </strong>
                  )}
                  {notif.message}
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', display: 'block' }}>
                  {notif.timestamp}
                </span>
              </div>

              {/* Optional Post Thumbnail */}
              {notif.targetPostImage && (
                <img
                  src={notif.targetPostImage}
                  alt="Target post"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 'var(--radius-sm)',
                    objectFit: 'cover'
                  }}
                />
              )}

              {/* Unread indicator dot */}
              {!notif.read && (
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    flexShrink: 0
                  }}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bell}
          title="No notifications yet"
          description="When other members like, comment, or follow your updates, they will appear here."
        />
      )}
    </div>
  );
}
