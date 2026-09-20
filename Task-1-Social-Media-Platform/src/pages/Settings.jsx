import { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Shield, 
  Bell, 
  User, 
  RotateCcw, 
  Check, 
  Lock 
} from 'lucide-react';
import Button from '../components/common/Button.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { usePosts } from '../context/PostContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Settings() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { currentUser, updateProfile } = useAuth();
  const { resetAllData } = usePosts();
  const { showToast } = useToast();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleToggleSound = () => {
    setSoundEnabled(prev => !prev);
    showToast(`Sound notifications ${!soundEnabled ? 'enabled' : 'disabled'}`, 'info');
  };

  const handleToggleNotifs = () => {
    setNotificationsEnabled(prev => !prev);
    showToast(`Notification alerts ${!notificationsEnabled ? 'enabled' : 'disabled'}`, 'info');
  };

  const handleTogglePrivacy = () => {
    setPrivateAccount(prev => !prev);
    showToast(`Account privacy updated to ${!privateAccount ? 'Private' : 'Public'}`, 'info');
  };

  return (
    <div className="settings-page animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Platform Settings</h2>

      {/* Theme Setting */}
      <div className="surface-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>Appearance</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Switch between Light and Dark mode on SocialSphere.
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
              backgroundColor: 'var(--bg-surface-hover)',
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
      <div className="surface-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={18} color="var(--primary)" />
          <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Notifications</h4>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Push Notifications</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Receive alerts for likes, comments, and mentions</div>
          </div>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleToggleNotifs}
            style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--primary)' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Notification Chimes</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Play subtle sound on direct messages</div>
          </div>
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={handleToggleSound}
            style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--primary)' }}
          />
        </div>
      </div>

      {/* Privacy */}
      <div className="surface-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={18} color="var(--accent)" />
          <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Privacy & Safety</h4>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Private Profile</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Only approved followers can view your full posts</div>
          </div>
          <input
            type="checkbox"
            checked={privateAccount}
            onChange={handleTogglePrivacy}
            style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--primary)' }}
          />
        </div>
      </div>

      {/* Demo Reset */}
      <div className="surface-card" style={{ padding: '1.25rem', border: '1px dashed var(--danger)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--danger)', marginBottom: '4px' }}>
              Reset Demo Storage
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Restore all mock posts, comments, stories, and messages back to the initial demo state.
            </p>
          </div>
          <Button
            variant="danger"
            size="md"
            icon={RotateCcw}
            onClick={() => setShowResetConfirm(true)}
          >
            Reset Data
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={resetAllData}
        title="Reset All Demo Data?"
        message="This will clear your local storage modifications and restore the pristine demo dataset. The page will reload."
        confirmText="Reset Everything"
        confirmVariant="danger"
      />
    </div>
  );
}
