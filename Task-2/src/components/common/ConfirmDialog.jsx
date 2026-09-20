import Modal from './Modal.jsx';
import Button from './Button.jsx';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Item?',
  message = 'Are you sure you want to proceed? This action cannot be undone.',
  confirmText = 'Delete',
  confirmVariant = 'danger',
  cancelText = 'Cancel'
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="420px">
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <div
          style={{
            padding: '10px',
            borderRadius: '50%',
            backgroundColor: confirmVariant === 'danger' ? 'var(--danger-bg)' : 'var(--primary-light)',
            color: confirmVariant === 'danger' ? 'var(--danger)' : 'var(--primary)',
            flexShrink: 0
          }}
        >
          <AlertTriangle size={22} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 1.5rem 0', lineHeight: 1.5 }}>
            {message}
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button variant="secondary" size="md" onClick={onClose}>
              {cancelText}
            </Button>
            <Button
              variant={confirmVariant}
              size="md"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
