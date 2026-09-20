import { useState, useMemo } from 'react';
import KanbanColumn from './KanbanColumn.jsx';
import TaskFilters from '../tasks/TaskFilters.jsx';
import TaskModal from '../tasks/TaskModal.jsx';
import TaskDetailsModal from '../tasks/TaskDetailsModal.jsx';
import { useTasks } from '../../context/TaskContext.jsx';

const COLUMNS = [
  { status: 'BACKLOG', title: 'Backlog', color: 'var(--status-backlog)' },
  { status: 'TODO', title: 'To Do', color: 'var(--status-todo)' },
  { status: 'IN_PROGRESS', title: 'In Progress', color: 'var(--status-in-progress)' },
  { status: 'REVIEW', title: 'Review', color: 'var(--status-review)' },
  { status: 'DONE', title: 'Done', color: 'var(--status-done)' }
];

export default function KanbanBoard({ projectId = null }) {
  const { tasks, moveTask } = useTasks();

  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('ALL');
  const [assignee, setAssignee] = useState('ALL');
  const [label, setLabel] = useState('ALL');

  const [activeTaskId, setActiveTaskId] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createModalStatus, setCreateModalStatus] = useState('TODO');

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Optional Project filter
      if (projectId && task.projectId !== projectId) return false;

      // Search query
      if (search.trim()) {
        const query = search.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = (task.description || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }

      // Priority
      if (priority !== 'ALL' && task.priority !== priority) return false;

      // Assignee
      if (assignee !== 'ALL' && task.assigneeId !== assignee) return false;

      // Label
      if (label !== 'ALL' && !(task.labels || []).includes(label)) return false;

      return true;
    });
  }, [tasks, projectId, search, priority, assignee, label]);

  const handleClearFilters = () => {
    setSearch('');
    setPriority('ALL');
    setAssignee('ALL');
    setLabel('ALL');
  };

  const handleOpenAddTask = (status) => {
    setCreateModalStatus(status);
    setCreateModalOpen(true);
  };

  const handleDropTask = (taskId, newStatus) => {
    moveTask(taskId, newStatus);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Filters Bar */}
      <TaskFilters
        search={search}
        onSearchChange={setSearch}
        priority={priority}
        onPriorityChange={setPriority}
        assignee={assignee}
        onAssigneeChange={setAssignee}
        label={label}
        onLabelChange={setLabel}
        onClearFilters={handleClearFilters}
      />

      {/* 5-Column Kanban Board */}
      <div
        className="kanban-board-container"
        style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          paddingBottom: '1.5rem',
          alignItems: 'flex-start'
        }}
      >
        {COLUMNS.map((col) => {
          const colTasks = filteredTasks.filter(t => t.status === col.status);
          return (
            <KanbanColumn
              key={col.status}
              status={col.status}
              title={col.title}
              color={col.color}
              tasks={colTasks}
              onSelectTask={(id) => setActiveTaskId(id)}
              onAddTask={handleOpenAddTask}
              onDropTask={handleDropTask}
            />
          );
        })}
      </div>

      {/* Task Modals */}
      {activeTaskId && (
        <TaskDetailsModal
          taskId={activeTaskId}
          isOpen={!!activeTaskId}
          onClose={() => setActiveTaskId(null)}
        />
      )}

      {createModalOpen && (
        <TaskModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          defaultStatus={createModalStatus}
          defaultProjectId={projectId}
        />
      )}
    </div>
  );
}
