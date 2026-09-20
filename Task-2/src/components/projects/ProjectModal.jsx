import { useState } from 'react';
import Modal from '../common/Modal.jsx';
import Button from '../common/Button.jsx';
import { useProjects } from '../../context/ProjectContext.jsx';

const COLOR_OPTIONS = [
  '#4f46e5', // Indigo
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6'  // Violet
];

export default function ProjectModal({ isOpen, onClose }) {
  const { createProject } = useProjects();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Frontend & Design');
  const [color, setColor] = useState(COLOR_OPTIONS[0]);
  const [priority, setPriority] = useState('MEDIUM');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    createProject({
      name: name.trim(),
      description: description.trim(),
      category,
      color,
      priority,
      dueDate: dueDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
    });

    setName('');
    setDescription('');
    setDueDate('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project" subtitle="Set up a workspace for your team" maxWidth="520px">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Project Name <span style={{ color: 'var(--danger)' }}>*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Mobile Banking App"
            style={{ width: '100%' }}
            autoFocus
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief overview of the project objectives..."
            rows={3}
            style={{ width: '100%', resize: 'none' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="form-grid-2">
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Design, Mobile, Cloud"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
              Priority
            </label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ width: '100%' }}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="form-grid-2">
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
              Target Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
              Theme Accent Color
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {COLOR_OPTIONS.map((c) => (
                <div
                  key={c}
                  onClick={() => setColor(c)}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: c,
                    cursor: 'pointer',
                    outline: color === c ? '2px solid var(--text-primary)' : 'none',
                    outlineOffset: '2px'
                  }}
                  className="interactive-btn"
                />
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '0.5rem' }}>
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit" disabled={!name.trim()}>
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
}
