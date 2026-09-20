import { NavLink, Link } from 'react-router-dom';
import { Home, Compass, Plus, MessageSquare, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useMessages } from '../../context/MessageContext.jsx';
import Avatar from '../common/Avatar.jsx';

export default function BottomNav({ onOpenCreateModal }) {
  const { currentUser } = useAuth();
  const { conversations } = useMessages();
  const unreadMessages = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return (
    <nav
      className="mobile-bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--bottom-nav-height)',
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--border)',
        zIndex: 90,
        display: 'none',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 0.5rem'
      }}
    >
      <NavLink
        to="/"
        end
        style={({ isActive }) => ({
          color: isActive ? 'var(--primary)' : 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          padding: '6px'
        })}
      >
        <Home size={22} />
        <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Home</span>
      </NavLink>

      <NavLink
        to="/explore"
        style={({ isActive }) => ({
          color: isActive ? 'var(--primary)' : 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          padding: '6px'
        })}
      >
        <Compass size={22} />
        <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Explore</span>
      </NavLink>

      {/* Prominent Center Create Button */}
      <button
        onClick={onOpenCreateModal}
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'var(--primary-gradient)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
          marginBottom: '8px'
        }}
        className="interactive-btn"
        aria-label="Create Post"
      >
        <Plus size={24} />
      </button>

      <NavLink
        to="/messages"
        style={({ isActive }) => ({
          position: 'relative',
          color: isActive ? 'var(--primary)' : 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          padding: '6px'
        })}
      >
        <MessageSquare size={22} />
        <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Messages</span>
        {unreadMessages > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '8px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--danger)'
            }}
          />
        )}
      </NavLink>

      <NavLink
        to="/profile"
        style={({ isActive }) => ({
          color: isActive ? 'var(--primary)' : 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          padding: '6px'
        })}
      >
        {currentUser ? (
          <Avatar src={currentUser.avatar} alt={currentUser.name} size="xs" />
        ) : (
          <User size={22} />
        )}
        <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Profile</span>
      </NavLink>
    </nav>
  );
}
