import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FolderKanban, 
  CalendarDays, 
  Users, 
  BarChart3, 
  Settings, 
  Sun, 
  Moon, 
  CheckCircle,
  Plus
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useProjects } from '../../context/ProjectContext.jsx';
import { useTasks } from '../../context/TaskContext.jsx';
import Avatar from '../common/Avatar.jsx';

export default function Sidebar({ onOpenCreateTask }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const { currentUser } = useProjects();
  const { tasks } = useTasks();

  const myTasksCount = tasks.filter(t => t.assigneeId === currentUser?.id && t.status !== 'DONE').length;

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/tasks', label: 'My Tasks', icon: CheckSquare, badge: myTasksCount },
    { to: '/projects', label: 'Projects', icon: FolderKanban },
    { to: '/calendar', label: 'Calendar', icon: CalendarDays },
    { to: '/team', label: 'Team', icon: Users },
    { to: '/reports', label: 'Reports', icon: BarChart3 },
    { to: '/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside
      className="desktop-sidebar"
      style={{
        width: 'var(--sidebar-width)',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem 1rem',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 50,
        flexShrink: 0
      }}
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
            padding: '0.4rem 0.5rem',
            marginBottom: '1.75rem'
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.35)'
            }}
          >
            <CheckCircle size={20} strokeWidth={2.5} />
          </div>
          <div>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                display: 'block'
              }}
            >
              TaskFlow
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Smart Management
            </span>
          </div>
        </Link>

        {/* Navigation items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navLinks.map((item) => {
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
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  transition: 'all var(--transition-fast)'
                })}
                className="interactive-btn"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span
                    style={{
                      fontSize: '0.725rem',
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--primary)',
                      color: '#ffffff'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Quick New Task Button */}
        <button
          onClick={onOpenCreateTask}
          style={{
            marginTop: '1.5rem',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '0.65rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            fontWeight: 700,
            fontSize: '0.875rem',
            border: '1px dashed var(--primary)'
          }}
          className="interactive-btn"
        >
          <Plus size={16} />
          <span>New Task</span>
        </button>
      </div>

      {/* Bottom User Card & Theme Switcher */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
        <button
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.55rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--surface-secondary)',
            color: 'var(--text-secondary)',
            fontSize: '0.8rem',
            fontWeight: 600,
            border: '1px solid var(--border)'
          }}
          className="interactive-btn"
          aria-label="Toggle theme"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isDark ? <Moon size={15} color="#818cf8" /> : <Sun size={15} color="#f59e0b" />}
            <span>{isDark ? 'Dark Theme' : 'Light Theme'}</span>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Switch</span>
        </button>

        {currentUser && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--surface)'
            }}
          >
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" isOnline={true} />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {currentUser.role}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
