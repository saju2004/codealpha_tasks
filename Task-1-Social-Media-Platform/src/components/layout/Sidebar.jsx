import { NavLink, Link } from 'react-router-dom';
import { 
  Home, 
  Compass, 
  Bell, 
  MessageSquare, 
  User, 
  Settings, 
  PlusCircle, 
  Sparkles,
  Sun,
  Moon,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { usePosts } from '../../context/PostContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useMessages } from '../../context/MessageContext.jsx';
import Avatar from '../common/Avatar.jsx';

export default function Sidebar({ onOpenCreateModal }) {
  const { currentUser, logout } = useAuth();
  const { notifications } = usePosts();
  const { conversations } = useMessages();
  const { theme, toggleTheme, isDark } = useTheme();

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const unreadMessages = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const navItems = [
    { to: '/', label: 'Home', icon: Home, badge: null },
    { to: '/explore', label: 'Explore', icon: Compass, badge: null },
    { to: '/notifications', label: 'Notifications', icon: Bell, badge: unreadNotifs },
    { to: '/messages', label: 'Messages', icon: MessageSquare, badge: unreadMessages },
    { to: '/profile', label: 'Profile', icon: User, badge: null },
    { to: '/settings', label: 'Settings', icon: Settings, badge: null }
  ];

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 'var(--sidebar-width)',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem 1.25rem',
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)',
        transition: 'background-color var(--transition-normal)'
      }}
      className="desktop-sidebar"
    >
      {/* Top Brand & Nav */}
      <div>
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '0.25rem 0.5rem',
            marginBottom: '2rem'
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
            }}
          >
            <Sparkles size={22} />
          </div>
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.45rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: 'var(--primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            SocialSphere
          </span>
        </Link>

        {/* Nav Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.975rem',
                  transition: 'all var(--transition-fast)'
                })}
                className="interactive-btn"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={21} />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span
                    style={{
                      background: 'var(--danger)',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-full)',
                      minWidth: '18px',
                      textAlign: 'center'
                    }}
                    className="unread-pulse"
                  >
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Create Post Button */}
        <button
          onClick={onOpenCreateModal}
          style={{
            marginTop: '1.75rem',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '0.85rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--primary-gradient)',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '1rem',
            boxShadow: '0 6px 18px rgba(99, 102, 241, 0.35)',
            border: 'none'
          }}
          className="interactive-btn"
        >
          <PlusCircle size={20} />
          <span>Create Post</span>
        </button>
      </div>

      {/* Bottom User Card & Quick Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Theme Toggle Quick Pill */}
        <button
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.65rem 0.9rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface-hover)',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem',
            fontWeight: 600,
            border: '1px solid var(--border)'
          }}
          className="interactive-btn"
          aria-label="Toggle theme"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isDark ? <Moon size={16} color="#818cf8" /> : <Sun size={16} color="#f59e0b" />}
            <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Switch</span>
        </button>

        {/* User Card */}
        {currentUser && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 0.75rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border)'
            }}
          >
            <Link
              to="/profile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                overflow: 'hidden',
                flex: 1
              }}
            >
              <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <span
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                >
                  {currentUser.name}
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
                  @{currentUser.username}
                </span>
              </div>
            </Link>

            <button
              onClick={logout}
              title="Log out"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-muted)',
                transition: 'color var(--transition-fast)'
              }}
              className="hover-bounce"
              aria-label="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
