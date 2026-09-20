import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Plus, 
  CheckSquare, 
  FolderKanban, 
  UserPlus, 
  CheckCheck,
  X 
} from 'lucide-react';
import Avatar from '../common/Avatar.jsx';
import Button from '../common/Button.jsx';
import { useProjects } from '../../context/ProjectContext.jsx';
import { useTasks } from '../../context/TaskContext.jsx';

export default function Header({ onOpenCreateTask, onOpenCreateProject, onOpenAddMember }) {
  const { currentUser, projects, users } = useProjects();
  const { tasks, notifications, markNotificationRead, markAllNotificationsRead } = useTasks();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const quickAddRef = useRef(null);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (quickAddRef.current && !quickAddRef.current.contains(e.target)) {
        setShowQuickAdd(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Search matches
  const searchResults = {
    tasks: tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3),
    projects: projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3),
    users: users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
  };

  const hasResults =
    searchResults.tasks.length > 0 ||
    searchResults.projects.length > 0 ||
    searchResults.users.length > 0;

  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}
    >
      {/* Left Global Search */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }} ref={searchRef}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              color: 'var(--text-muted)',
              pointerEvents: 'none'
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => setShowSearchDropdown(true)}
            placeholder="Search tasks, projects, team..."
            style={{
              width: '100%',
              paddingLeft: '36px',
              paddingRight: searchQuery ? '32px' : '12px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setShowSearchDropdown(false);
              }}
              style={{
                position: 'absolute',
                right: '8px',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showSearchDropdown && searchQuery.trim() && (
          <div
            className="animate-dropdown card"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '6px',
              backgroundColor: 'var(--surface)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 100,
              maxHeight: '380px',
              overflowY: 'auto',
              padding: '0.75rem'
            }}
          >
            {hasResults ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Tasks */}
                {searchResults.tasks.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Tasks
                    </div>
                    {searchResults.tasks.map(t => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setShowSearchDropdown(false);
                          setSearchQuery('');
                          navigate(`/projects/${t.projectId}?task=${t.id}`);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 8px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                        className="interactive-btn"
                      >
                        <CheckSquare size={14} color="var(--primary)" />
                        <span style={{ fontWeight: 600 }}>{t.title}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Projects */}
                {searchResults.projects.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Projects
                    </div>
                    {searchResults.projects.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setShowSearchDropdown(false);
                          setSearchQuery('');
                          navigate(`/projects/${p.id}`);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 8px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                        className="interactive-btn"
                      >
                        <FolderKanban size={14} color="var(--secondary)" />
                        <span style={{ fontWeight: 600 }}>{p.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Users */}
                {searchResults.users.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Team Members
                    </div>
                    {searchResults.users.map(u => (
                      <div
                        key={u.id}
                        onClick={() => {
                          setShowSearchDropdown(false);
                          setSearchQuery('');
                          navigate('/team');
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 8px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                        className="interactive-btn"
                      >
                        <Avatar src={u.avatar} alt={u.name} size="xs" />
                        <div>
                          <span style={{ fontWeight: 600 }}>{u.name} </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({u.role})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No matches found for "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Actions: Quick Add, Notifications, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Quick Add Dropdown */}
        <div style={{ position: 'relative' }} ref={quickAddRef}>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setShowQuickAdd(prev => !prev)}
          >
            Add
          </Button>

          {showQuickAdd && (
            <div
              className="animate-dropdown card"
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                width: '180px',
                backgroundColor: 'var(--surface)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 100,
                padding: '6px'
              }}
            >
              <button
                onClick={() => {
                  setShowQuickAdd(false);
                  onOpenCreateTask();
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textAlign: 'left'
                }}
                className="interactive-btn"
              >
                <CheckSquare size={16} color="var(--primary)" />
                <span>New Task</span>
              </button>

              <button
                onClick={() => {
                  setShowQuickAdd(false);
                  onOpenCreateProject();
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textAlign: 'left'
                }}
                className="interactive-btn"
              >
                <FolderKanban size={16} color="var(--secondary)" />
                <span>New Project</span>
              </button>

              <button
                onClick={() => {
                  setShowQuickAdd(false);
                  onOpenAddMember();
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textAlign: 'left'
                }}
                className="interactive-btn"
              >
                <UserPlus size={16} color="var(--success)" />
                <span>Add Member</span>
              </button>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            onClick={() => setShowNotifications(prev => !prev)}
            style={{
              position: 'relative',
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--surface-secondary)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border)'
            }}
            className="interactive-btn"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadNotifs > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '3px',
                  right: '3px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--danger)'
                }}
              />
            )}
          </button>

          {showNotifications && (
            <div
              className="animate-dropdown card"
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                width: '320px',
                backgroundColor: 'var(--surface)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 100,
                padding: '1rem',
                maxHeight: '400px',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Notifications</h4>
                {unreadNotifs > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <CheckCheck size={14} /> Mark read
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markNotificationRead(notif.id)}
                    style={{
                      padding: '8px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: notif.read ? 'transparent' : 'var(--surface-secondary)',
                      borderLeft: notif.read ? 'none' : '3px solid var(--primary)',
                      cursor: 'pointer'
                    }}
                    className="interactive-btn"
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: notif.read ? 500 : 700, color: 'var(--text-primary)' }}>
                      {notif.title}
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {notif.message}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {notif.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        {currentUser && (
          <Link to="/settings">
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" isOnline={true} />
          </Link>
        )}
      </div>
    </header>
  );
}
