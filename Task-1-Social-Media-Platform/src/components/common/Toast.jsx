import { useToast } from '../../context/ToastContext.jsx';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

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
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        const icon = isSuccess ? (
          <CheckCircle2 size={18} color="#10b981" />
        ) : isError ? (
          <AlertCircle size={18} color="#ef4444" />
        ) : (
          <Info size={18} color="#6366f1" />
        );

        return (
          <div
            key={toast.id}
            className="animate-toast"
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0.85rem 1.15rem',
              backgroundColor: 'var(--bg-surface-elevated)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border)',
              minWidth: '280px',
              maxWidth: '420px'
            }}
          >
            <div style={{ flexShrink: 0 }}>{icon}</div>
            <div
              style={{
                flex: 1,
                fontSize: '0.9rem',
                fontWeight: 500,
                lineHeight: 1.4
              }}
            >
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px',
                borderRadius: '4px'
              }}
              aria-label="Dismiss toast"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
