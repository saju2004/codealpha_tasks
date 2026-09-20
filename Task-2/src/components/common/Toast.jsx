import { useToast } from '../../context/ToastContext.jsx';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1100,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'none'
      }}
    >
      {toasts.map((toast) => {
        let icon = <Info size={18} color="var(--primary)" />;
        let borderColor = 'var(--border)';

        if (toast.type === 'success') {
          icon = <CheckCircle2 size={18} color="var(--success)" />;
          borderColor = 'rgba(16, 185, 129, 0.4)';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle size={18} color="var(--warning)" />;
          borderColor = 'rgba(245, 158, 11, 0.4)';
        } else if (toast.type === 'error') {
          icon = <AlertCircle size={18} color="var(--danger)" />;
          borderColor = 'rgba(239, 68, 68, 0.4)';
        }

        return (
          <div
            key={toast.id}
            className="animate-toast card"
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0.85rem 1.15rem',
              backgroundColor: 'var(--surface-elevated)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              border: `1px solid ${borderColor}`,
              minWidth: '280px',
              maxWidth: '400px'
            }}
          >
            <div style={{ flexShrink: 0 }}>{icon}</div>
            <span style={{ flex: 1, fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.4 }}>
              {toast.message}
            </span>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
              aria-label="Close toast"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
