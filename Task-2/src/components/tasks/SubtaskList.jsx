import { useState } from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';
import { useTasks } from '../../context/TaskContext.jsx';

export default function SubtaskList({ task }) {
  const { toggleSubtask, addSubtask, deleteSubtask } = useTasks();
  const [newTitle, setNewTitle] = useState('');

  const subtasks = task.subtasks || [];
  const completedCount = subtasks.filter(st => st.completed).length;
  const progressPercent = subtasks.length > 0 ? Math.round((completedCount / subtasks.length) * 100) : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addSubtask(task.id, newTitle);
    setNewTitle('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {/* Header & Progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
          Subtasks ({completedCount}/{subtasks.length})
        </h4>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>
          {progressPercent}%
        </span>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '6px',
          backgroundColor: 'var(--surface-secondary)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            backgroundColor: progressPercent === 100 ? 'var(--success)' : 'var(--primary)',
            transition: 'width 0.3s ease'
          }}
        />
      </div>

      {/* Subtasks List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {subtasks.map((st) => (
          <div
            key={st.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)'
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                flex: 1,
                userSelect: 'none'
              }}
            >
              <input
                type="checkbox"
                checked={st.completed}
                onChange={() => toggleSubtask(task.id, st.id)}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: 'var(--primary)',
                  cursor: 'pointer'
                }}
              />
              <span
                style={{
                  fontSize: '0.875rem',
                  color: st.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                  textDecoration: st.completed ? 'line-through' : 'none'
                }}
              >
                {st.title}
              </span>
            </label>

            <button
              onClick={() => deleteSubtask(task.id, st.id)}
              style={{
                color: 'var(--text-muted)',
                padding: '3px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Delete subtask"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Subtask Form */}
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a checklist item..."
          style={{ flex: 1, fontSize: '0.85rem', padding: '0.45rem 0.75rem' }}
        />
        <button
          type="submit"
          disabled={!newTitle.trim()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '0.45rem 0.85rem',
            backgroundColor: newTitle.trim() ? 'var(--primary)' : 'var(--surface-secondary)',
            color: newTitle.trim() ? '#ffffff' : 'var(--text-muted)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.825rem',
            fontWeight: 600,
            cursor: newTitle.trim() ? 'pointer' : 'default'
          }}
          className="interactive-btn"
        >
          <Plus size={14} />
          <span>Add</span>
        </button>
      </form>
    </div>
  );
}
