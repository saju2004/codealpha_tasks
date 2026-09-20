import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FolderKanban, 
  CalendarDays, 
  Users, 
  Sun, 
  Moon, 
  CheckCircle, 
  Plus 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useProjects } from '../../context/ProjectContext.jsx';
import Avatar from '../common/Avatar.jsx';

export default function MobileNavigation({ onOpenCreateTask }) {
  const { toggleTheme, isDark } = useTheme();
  const { currentUser } = useProjects();

  return (
    <>
      {/* Mobile Top Header */}
      <header
        className="mobile-header-bar"
        style={{
          height: '56px',
          backgroundColor: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
          position: 'sticky',
          top: 0,
          zIndex: 45
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 'var(--radius-sm)',
              background: 'var(--primary-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <CheckCircle size={16} strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            TaskFlow
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={toggleTheme}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: 'var(--surface-secondary)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <Moon size={16} color="#818cf8" /> : <Sun size={16} color="#f59e0b" />}
          </button>

          {currentUser && (
            <Link to="/settings">
              <Avatar src={currentUser.avatar} alt={currentUser.name} size="xs" />
            </Link>
          )}
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav
        className="mobile-nav-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 'var(--bottom-nav-height)',
          backgroundColor: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 45,
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
            fontSize: '0.65rem',
            fontWeight: 600
          })}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/tasks"
          style={({ isActive }) => ({
            color: isActive ? 'var(--primary)' : 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            fontSize: '0.65rem',
            fontWeight: 600
          })}
        >
          <CheckSquare size={20} />
          <span>My Tasks</span>
        </NavLink>

        {/* Center Create Button */}
        <button
          onClick={onOpenCreateTask}
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'var(--primary-gradient)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)'
          }}
          className="interactive-btn"
          aria-label="Create Task"
        >
          <Plus size={22} />
        </button>

        <NavLink
          to="/projects"
          style={({ isActive }) => ({
            color: isActive ? 'var(--primary)' : 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            fontSize: '0.65rem',
            fontWeight: 600
          })}
        >
          <FolderKanban size={20} />
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="/calendar"
          style={({ isActive }) => ({
            color: isActive ? 'var(--primary)' : 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            fontSize: '0.65rem',
            fontWeight: 600
          })}
        >
          <CalendarDays size={20} />
          <span>Calendar</span>
        </NavLink>
      </nav>
    </>
  );
}
