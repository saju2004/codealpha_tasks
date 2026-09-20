import { useState } from 'react';
import { Sun, Moon, Bell, RotateCcw, User, Shield } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import Avatar from '../components/common/Avatar.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useProjects } from '../context/ProjectContext.jsx';
import { useTasks } from '../context/TaskContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Settings() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { currentUser } = useProjects();
  const { resetAllData } = useTasks();
  const { showToast } = useToast();

  const [notifTaskAssigned, setNotifTaskAssigned] = useState(true);
  const [notifDueDates, setNotifDueDates] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleToggleNotif = (setter, label) => {
    setter(prev => !prev);
    showToast(`Preferences for ${label} updated`, 'info');
  };

  return (
    <div className="settings-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '780px' }}>
      <div>
        <h2 style={{ fontSize: '1.65rem', fontWeight: 800, margin: 0 }}>
          Settings & Preferences
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
          Manage your TaskFlow workspace, appearance, and alerts
        </p>
      </div>

      {/* Profile Overview */}
      <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Avatar src={currentUser?.avatar} alt={currentUser?.name} size="lg" isOnline={true} />
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
              {currentUser?.name}
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>
              {currentUser?.role}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>
              {currentUser?.email}
            </span>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Theme Appearance</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Toggle between clean Light and dark charcoal night themes
            </p>
          </div>

          <button
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: 'var(--text-primary)'
            }}
            className="interactive-btn"
          >
            {isDark ? <Moon size={16} color="#818cf8" /> : <Sun size={16} color="#f59e0b" />}
            <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={18} color="var(--primary)" />
          <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Alert Notifications</h4>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Task Assignment Alerts</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Notify me when assigned to tasks or reviews</div>
          </div>
          <input
            type="checkbox"
            checked={notifTaskAssigned}
            onChange={() => handleToggleNotif(setNotifTaskAssigned, 'task assignments')}
            style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Deadline Reminders</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Alerts for tasks due within 48 hours</div>
          </div>
          <input
            type="checkbox"
            checked={notifDueDates}
            onChange={() => handleToggleNotif(setNotifDueDates, 'deadline reminders')}
            style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Danger Zone: Reset Data */}
      <div className="card" style={{ padding: '1.25rem', border: '1px dashed var(--danger)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--danger)', margin: 0 }}>
              Reset Demo Storage
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
              Restore all mock tasks, projects, comments, and members back to initial state.
            </p>
          </div>

          <Button
            variant="danger"
            size="md"
            icon={RotateCcw}
            onClick={() => setShowResetConfirm(true)}
          >
            Reset
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={resetAllData}
        title="Reset All Workspace Data?"
        message="This will reset your local storage changes and restore the pristine initial demo data. The page will reload."
        confirmText="Reset Everything"
        confirmVariant="danger"
      />
    </div>
  );
}
