import { Link } from 'react-router-dom';
import { Sparkles, Bell, Sun, Moon, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { usePosts } from '../../context/PostContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import Avatar from '../common/Avatar.jsx';

export default function Navbar() {
  const { currentUser } = useAuth();
  const { notifications } = usePosts();
  const { toggleTheme, isDark } = useTheme();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header
      className="mobile-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 90,
        display: 'none',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'var(--header-height)',
        padding: '0 1rem',
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)'
      }}
    >
      {/* Brand */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 'var(--radius-sm)',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}
        >
          <Sparkles size={18} />
        </div>
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.25rem',
            fontWeight: 800,
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          SocialSphere
        </span>
      </Link>

      {/* Right icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link
          to="/explore"
          style={{
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            padding: '6px'
          }}
          aria-label="Search"
        >
          <Search size={20} />
        </Link>

        <button
          onClick={toggleTheme}
          style={{
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            padding: '6px'
          }}
          aria-label="Toggle Theme"
        >
          {isDark ? <Moon size={20} color="#818cf8" /> : <Sun size={20} color="#f59e0b" />}
        </button>

        <Link
          to="/notifications"
          style={{
            position: 'relative',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            padding: '6px'
          }}
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--danger)'
              }}
              className="unread-pulse"
            />
          )}
        </Link>

        {currentUser && (
          <Link to="/profile">
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="xs" />
          </Link>
        )}
      </div>
    </header>
  );
}
