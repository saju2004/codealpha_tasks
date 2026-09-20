import { useState } from 'react';
import Modal from '../common/Modal.jsx';
import Button from '../common/Button.jsx';
import { useProjects } from '../../context/ProjectContext.jsx';
import { useTasks } from '../../context/TaskContext.jsx';

export default function TaskModal({ isOpen, onClose, defaultStatus = 'TODO', defaultProjectId = null }) {
  const { projects, users } = useProjects();
  const { createTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState(defaultProjectId || projects[0]?.id || '');
  const [assigneeId, setAssigneeId] = useState(users[0]?.id || '');
  const [status, setStatus] = useState(defaultStatus);
  const [priority, setPriority] = useState('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  const [labelInput, setLabelInput] = useState('Frontend');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !projectId) return;

    const labels = labelInput
      ? labelInput.split(/[\s,]+/).filter(l => l.trim().length > 0)
      : ['Feature'];

    createTask({
      title: title.trim(),
      description: description.trim(),
      projectId,
      assigneeId,
      status,
      priority,
      dueDate: dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      labels
    });

    // Reset
    setTitle('');
    setDescription('');
    setDueDate('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task" subtitle="Add a new task to your project workflow" maxWidth="560px">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
        {/* Title */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Task Title <span style={{ color: 'var(--danger)' }}>*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Implement user authentication flow"
            style={{ width: '100%' }}
            autoFocus
          />
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide context or acceptance criteria for this task..."
            rows={3}
            style={{ width: '100%', resize: 'none' }}
          />
        </div>

        {/* 2-column Grid for Project and Assignee */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="form-grid-2">
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
              Project <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              style={{ width: '100%' }}
              required
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
              Assignee
            </label>
            <select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              style={{ width: '100%' }}
            >
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3-column Grid for Status, Priority, Due Date */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '10px' }} className="form-grid-2">
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
              Status
            </label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '100%' }}>
              <option value="BACKLOG">Backlog</option>
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="REVIEW">Review</option>
              <option value="DONE">Done</option>
            </select>
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

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* Labels */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Labels (comma-separated)
          </label>
          <input
            type="text"
            value={labelInput}
            onChange={(e) => setLabelInput(e.target.value)}
            placeholder="Frontend, UI/UX, Bug, Security"
            style={{ width: '100%' }}
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '0.5rem' }}>
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit" disabled={!title.trim()}>
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
