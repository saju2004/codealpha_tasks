import { useState, useMemo } from 'react';
import { 
  CheckSquare, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  Clock 
} from 'lucide-react';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import TaskDetailsModal from '../components/tasks/TaskDetailsModal.jsx';
import TaskModal from '../components/tasks/TaskModal.jsx';
import { useProjects } from '../context/ProjectContext.jsx';
import { useTasks } from '../context/TaskContext.jsx';
import { formatDate, isOverdue, isDueToday } from '../utils/dateUtils.js';

export default function MyTasks() {
  const { currentUser, projects } = useProjects();
  const { tasks, updateTask } = useTasks();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'today' | 'upcoming' | 'completed' | 'overdue'
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Filter tasks assigned to current user
  const myTasks = useMemo(() => {
    return tasks.filter(t => t.assigneeId === currentUser?.id);
  }, [tasks, currentUser]);

  const filteredTasks = useMemo(() => {
    return myTasks.filter((task) => {
      const isLate = isOverdue(task.dueDate, task.status);
      const isToday = isDueToday(task.dueDate);

      if (activeFilter === 'today') return isToday && task.status !== 'DONE';
      if (activeFilter === 'upcoming') return !isLate && !isToday && task.status !== 'DONE';
      if (activeFilter === 'completed') return task.status === 'DONE';
      if (activeFilter === 'overdue') return isLate;
      return true; // 'all'
    });
  }, [myTasks, activeFilter]);

  const counts = {
    all: myTasks.length,
    today: myTasks.filter(t => isDueToday(t.dueDate) && t.status !== 'DONE').length,
    upcoming: myTasks.filter(t => !isOverdue(t.dueDate, t.status) && !isDueToday(t.dueDate) && t.status !== 'DONE').length,
    completed: myTasks.filter(t => t.status === 'DONE').length,
    overdue: myTasks.filter(t => isOverdue(t.dueDate, t.status)).length
  };

  return (
    <div className="my-tasks-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, margin: 0 }}>
            My Tasks
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
            Action items and deliverables assigned directly to you
          </p>
        </div>

        <Button variant="primary" size="md" icon={Plus} onClick={() => setCreateModalOpen(true)}>
          New Task
        </Button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
        {[
          { id: 'all', label: 'All Tasks', count: counts.all },
          { id: 'today', label: 'Due Today', count: counts.today },
          { id: 'upcoming', label: 'Upcoming', count: counts.upcoming },
          { id: 'completed', label: 'Completed', count: counts.completed },
          { id: 'overdue', label: 'Overdue', count: counts.overdue, danger: counts.overdue > 0 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.45rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: activeFilter === tab.id ? 700 : 500,
              backgroundColor: activeFilter === tab.id ? 'var(--primary-light)' : 'transparent',
              color: activeFilter === tab.id ? 'var(--primary)' : 'var(--text-secondary)',
              border: activeFilter === tab.id ? '1px solid var(--primary)' : '1px solid transparent',
              transition: 'all var(--transition-fast)'
            }}
            className="interactive-btn"
          >
            <span>{tab.label}</span>
            <span
              style={{
                fontSize: '0.725rem',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: tab.danger ? 'var(--danger)' : activeFilter === tab.id ? 'var(--primary)' : 'var(--surface-secondary)',
                color: tab.danger || activeFilter === tab.id ? '#ffffff' : 'var(--text-muted)'
              }}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tasks List */}
      {filteredTasks.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredTasks.map((task) => {
            const project = projects.find(p => p.id === task.projectId);
            const isLate = isOverdue(task.dueDate, task.status);
            const subtasks = task.subtasks || [];
            const completedCount = subtasks.filter(st => st.completed).length;

            return (
              <div
                key={task.id}
                onClick={() => setSelectedTaskId(task.id)}
                className="card task-card-hover"
                style={{
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  cursor: 'pointer',
                  flexWrap: 'wrap'
                }}
              >
                {/* Left: Quick checkbox & Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '240px' }}>
                  <input
                    type="checkbox"
                    checked={task.status === 'DONE'}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateTask(task.id, { status: e.target.checked ? 'DONE' : 'IN_PROGRESS' });
                    }}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: 'var(--success)',
                      cursor: 'pointer'
                    }}
                  />

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          color: task.status === 'DONE' ? 'var(--text-muted)' : 'var(--text-primary)',
                          textDecoration: task.status === 'DONE' ? 'line-through' : 'none'
                        }}
                      >
                        {task.title}
                      </span>
                      <Badge type="priority" value={task.priority} size="sm" />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      <span>{project?.name || 'Project'}</span>
                      {subtasks.length > 0 && (
                        <span>· {completedCount}/{subtasks.length} subtasks</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Due Date & Status Dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600, color: isLate ? 'var(--danger)' : 'var(--text-muted)' }}>
                    <Calendar size={14} />
                    <span>{formatDate(task.dueDate)}</span>
                  </div>

                  <select
                    value={task.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateTask(task.id, { status: e.target.value });
                    }}
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <option value="BACKLOG">Backlog</option>
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="REVIEW">Review</option>
                    <option value="DONE">Done</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={CheckSquare}
          title="No tasks match this filter"
          description={
            activeFilter === 'overdue'
              ? 'Great job! You have no overdue tasks.'
              : activeFilter === 'today'
              ? 'Nothing due today. Check your upcoming tasks!'
              : 'You are all caught up.'
          }
          actionText="Create New Task"
          onAction={() => setCreateModalOpen(true)}
        />
      )}

      {/* Modals */}
      {selectedTaskId && (
        <TaskDetailsModal
          taskId={selectedTaskId}
          isOpen={!!selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}

      {createModalOpen && (
        <TaskModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
        />
      )}
    </div>
  );
}
