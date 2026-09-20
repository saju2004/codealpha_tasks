import { useState } from 'react';
import { Calendar, MessageSquare, CheckSquare, AlertCircle } from 'lucide-react';
import Badge from '../common/Badge.jsx';
import Avatar from '../common/Avatar.jsx';
import { useProjects } from '../../context/ProjectContext.jsx';
import { formatShortDate, isOverdue } from '../../utils/dateUtils.js';

export default function TaskCard({ task, onSelectTask, onDragStart, onDragEnd }) {
  const { users } = useProjects();
  const [isDragging, setIsDragging] = useState(false);

  const assignee = users.find(u => u.id === task.assigneeId);
  const isTaskOverdue = isOverdue(task.dueDate, task.status);

  const subtasks = task.subtasks || [];
  const completedSubtasks = subtasks.filter(st => st.completed).length;

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
    if (onDragStart) onDragStart(task.id);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    if (onDragEnd) onDragEnd();
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onSelectTask(task.id)}
      className={`card task-card-hover ${isDragging ? 'task-card-dragging' : ''}`}
      style={{
        padding: '0.85rem 1rem',
        cursor: 'grab',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        backgroundColor: 'var(--card-bg)',
        userSelect: 'none'
      }}
    >
      {/* Top: Priority & Labels */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
        <Badge type="priority" value={task.priority} size="sm" />
        {task.labels && task.labels.length > 0 && (
          <div style={{ display: 'flex', gap: '4px' }}>
            <Badge type="label" value={task.labels[0]} size="sm" />
            {task.labels.length > 1 && (
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                +{task.labels.length - 1}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Title */}
      <h4
        style={{
          fontSize: '0.925rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.35,
          margin: 0
        }}
      >
        {task.title}
      </h4>

      {/* Description preview */}
      {task.description && (
        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.4,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {task.description}
        </p>
      )}

      {/* Subtasks progress (if any) */}
      {subtasks.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <CheckSquare size={13} color="var(--primary)" />
          <span>
            {completedSubtasks} / {subtasks.length} subtasks
          </span>
          <div
            style={{
              flex: 1,
              height: '4px',
              backgroundColor: 'var(--surface-secondary)',
              borderRadius: '2px',
              overflow: 'hidden',
              marginLeft: '4px'
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${(completedSubtasks / subtasks.length) * 100}%`,
                backgroundColor: completedSubtasks === subtasks.length ? 'var(--success)' : 'var(--primary)'
              }}
            />
          </div>
        </div>
      )}

      {/* Bottom Row: Due Date, Comments, Assignee */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.5rem',
          borderTop: '1px solid var(--border)',
          marginTop: '2px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Due date */}
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: isTaskOverdue ? 'var(--danger)' : 'var(--text-muted)'
            }}
          >
            {isTaskOverdue ? <AlertCircle size={13} /> : <Calendar size={13} />}
            <span>{formatShortDate(task.dueDate)}</span>
          </span>

          {/* Comments count */}
          {task.comments && task.comments.length > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <MessageSquare size={12} />
              <span>{task.comments.length}</span>
            </span>
          )}
        </div>

        {/* Assignee Avatar */}
        {assignee && (
          <Avatar src={assignee.avatar} alt={assignee.name} size="xs" />
        )}
      </div>
    </div>
  );
}
