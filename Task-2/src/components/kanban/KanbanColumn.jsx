import { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard.jsx';

export default function KanbanColumn({
  status,
  title,
  color,
  tasks = [],
  onSelectTask,
  onAddTask,
  onDropTask,
  onDragStart,
  onDragEnd
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    // Only remove highlight if actually leaving this column container
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onDropTask(taskId, status);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`kanban-column ${isDragOver ? 'column-drag-target' : ''}`}
      style={{
        width: '300px',
        minWidth: '300px',
        backgroundColor: 'var(--column-bg)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'calc(100vh - 210px)',
        padding: '0.85rem',
        border: '1px solid var(--border)',
        transition: 'background-color var(--transition-fast)'
      }}
    >
      {/* Column Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '0.75rem',
          marginBottom: '0.5rem',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: color
            }}
          />
          <h3 style={{ fontSize: '0.925rem', fontWeight: 700, margin: 0 }}>
            {title}
          </h3>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '1px 7px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--surface)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)'
            }}
          >
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => onAddTask(status)}
          style={{
            width: '26px',
            height: '26px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--surface)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border)'
          }}
          className="interactive-btn"
          title={`Add task to ${title}`}
          aria-label={`Add task to ${title}`}
        >
          <Plus size={15} />
        </button>
      </div>

      {/* Task Cards Stream */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          paddingRight: '2px',
          minHeight: '80px'
        }}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onSelectTask={onSelectTask}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}

        {tasks.length === 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100px',
              border: '1px dashed var(--border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              textAlign: 'center',
              padding: '1rem'
            }}
          >
            Drop tasks here or click + to add
          </div>
        )}
      </div>
    </div>
  );
}
