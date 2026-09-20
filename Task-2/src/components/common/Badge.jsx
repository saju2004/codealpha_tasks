import { AlertCircle, AlertTriangle, Clock, CheckCircle2, Circle } from 'lucide-react';

export default function Badge({ type = 'priority', value, size = 'sm' }) {
  if (!value) return null;

  if (type === 'priority') {
    const priorityConfig = {
      URGENT: {
        label: 'Urgent',
        color: 'var(--priority-urgent)',
        bg: 'var(--priority-urgent-bg)',
        icon: AlertCircle
      },
      HIGH: {
        label: 'High',
        color: 'var(--priority-high)',
        bg: 'var(--priority-high-bg)',
        icon: AlertTriangle
      },
      MEDIUM: {
        label: 'Medium',
        color: 'var(--priority-medium)',
        bg: 'var(--priority-medium-bg)',
        icon: Clock
      },
      LOW: {
        label: 'Low',
        color: 'var(--priority-low)',
        bg: 'var(--priority-low-bg)',
        icon: CheckCircle2
      }
    };

    const config = priorityConfig[value.toUpperCase()] || priorityConfig.MEDIUM;
    const Icon = config.icon;

    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: size === 'sm' ? '2px 7px' : '4px 9px',
          borderRadius: 'var(--radius-sm)',
          fontSize: size === 'sm' ? '0.725rem' : '0.8rem',
          fontWeight: 700,
          backgroundColor: config.bg,
          color: config.color,
          letterSpacing: '0.02em',
          textTransform: 'uppercase'
        }}
      >
        <Icon size={size === 'sm' ? 12 : 14} />
        <span>{config.label}</span>
      </span>
    );
  }

  if (type === 'status') {
    const statusConfig = {
      BACKLOG: { label: 'Backlog', color: 'var(--status-backlog)', bg: 'rgba(100, 116, 139, 0.15)' },
      TODO: { label: 'To Do', color: 'var(--status-todo)', bg: 'rgba(59, 130, 246, 0.15)' },
      IN_PROGRESS: { label: 'In Progress', color: 'var(--status-in-progress)', bg: 'rgba(139, 92, 246, 0.15)' },
      REVIEW: { label: 'Review', color: 'var(--status-review)', bg: 'rgba(245, 158, 11, 0.15)' },
      DONE: { label: 'Done', color: 'var(--status-done)', bg: 'rgba(16, 185, 129, 0.15)' }
    };

    const config = statusConfig[value.toUpperCase()] || statusConfig.TODO;

    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding: size === 'sm' ? '2px 8px' : '4px 10px',
          borderRadius: 'var(--radius-full)',
          fontSize: size === 'sm' ? '0.725rem' : '0.8rem',
          fontWeight: 600,
          backgroundColor: config.bg,
          color: config.color
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: config.color
          }}
        />
        <span>{config.label}</span>
      </span>
    );
  }

  // Generic or Tag label
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.725rem',
        fontWeight: 600,
        backgroundColor: 'var(--surface-secondary)',
        color: 'var(--text-secondary)',
        border: '1px solid var(--border)'
      }}
    >
      {value}
    </span>
  );
}
