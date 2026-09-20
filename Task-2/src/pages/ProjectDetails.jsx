import { useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { 
  FolderKanban, 
  Calendar, 
  Users, 
  Plus, 
  Kanban, 
  ListTodo, 
  History, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import KanbanBoard from '../components/kanban/KanbanBoard.jsx';
import ProgressBar from '../components/dashboard/ProgressBar.jsx';
import Badge from '../components/common/Badge.jsx';
import Avatar from '../components/common/Avatar.jsx';
import Button from '../components/common/Button.jsx';
import TaskModal from '../components/tasks/TaskModal.jsx';
import TaskDetailsModal from '../components/tasks/TaskDetailsModal.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { useProjects } from '../context/ProjectContext.jsx';
import { useTasks } from '../context/TaskContext.jsx';
import { formatDate } from '../utils/dateUtils.js';

export default function ProjectDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const taskQueryParam = searchParams.get('task');

  const { getProject, users } = useProjects();
  const { tasks, getProjectProgress } = useTasks();

  const [activeTab, setActiveTab] = useState('board'); // 'board' | 'list' | 'activity'
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(taskQueryParam || null);

  const project = getProject(id);

  if (!project) {
    return (
      <div style={{ paddingTop: '2rem' }}>
        <EmptyState
          icon={FolderKanban}
          title="Project not found"
          description="The requested project could not be found or may have been removed."
          actionText="Back to Projects"
          onAction={() => window.history.back()}
        />
      </div>
    );
  }

  const projectTasks = tasks.filter(t => t.projectId === project.id);
  const progress = getProjectProgress(project.id);

  const memberUsers = (project.members || [])
    .map(uid => users.find(u => u.id === uid))
    .filter(Boolean);

  // All activities from tasks in this project
  const allActivities = projectTasks
    .flatMap(t => (t.activityHistory || []).map(act => ({ ...act, taskTitle: t.title })))
    .slice(0, 15);

  return (
    <div className="project-details-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Back button & Title Row */}
      <div>
        <Link
          to="/projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Projects</span>
        </Link>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                backgroundColor: `${project.color}20`,
                color: project.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FolderKanban size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, margin: 0 }}>
                  {project.name}
                </h2>
                <Badge type="priority" value={project.priority} size="sm" />
              </div>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                {project.category} · Due {formatDate(project.dueDate)}
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => setCreateTaskModalOpen(true)}
          >
            Add Task
          </Button>
        </div>
      </div>

      {/* Project Overview Card: Description, Members, and Progress Bar */}
      <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', borderTop: '1px solid var(--border)', paddingTop: '0.85rem' }}>
          {/* Members */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Team:</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {memberUsers.map((m, idx) => (
                <div key={m.id} style={{ marginLeft: idx === 0 ? 0 : '-6px', border: '2px solid var(--surface)', borderRadius: '50%' }}>
                  <Avatar src={m.avatar} alt={m.name} size="xs" />
                </div>
              ))}
            </div>
          </div>

          {/* Progress summary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '220px', flex: 1, maxWidth: '360px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>
              Progress ({progress}%):
            </span>
            <div style={{ flex: 1 }}>
              <ProgressBar value={progress} color={project.color} />
            </div>
          </div>
        </div>
      </div>

      {/* View Tabs: Board (Kanban) | List | Activity */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', gap: '8px' }}>
        <button
          onClick={() => setActiveTab('board')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.65rem 1.15rem',
            fontSize: '0.9rem',
            fontWeight: activeTab === 'board' ? 700 : 500,
            color: activeTab === 'board' ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'board' ? '2px solid var(--primary)' : '2px solid transparent'
          }}
          className="interactive-btn"
        >
          <Kanban size={16} />
          <span>Kanban Board</span>
        </button>

        <button
          onClick={() => setActiveTab('list')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.65rem 1.15rem',
            fontSize: '0.9rem',
            fontWeight: activeTab === 'list' ? 700 : 500,
            color: activeTab === 'list' ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'list' ? '2px solid var(--primary)' : '2px solid transparent'
          }}
          className="interactive-btn"
        >
          <ListTodo size={16} />
          <span>Task List ({projectTasks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.65rem 1.15rem',
            fontSize: '0.9rem',
            fontWeight: activeTab === 'activity' ? 700 : 500,
            color: activeTab === 'activity' ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'activity' ? '2px solid var(--primary)' : '2px solid transparent'
          }}
          className="interactive-btn"
        >
          <History size={16} />
          <span>Activity</span>
        </button>
      </div>

      {/* Tab 1: Kanban Board */}
      {activeTab === 'board' && (
        <div style={{ marginTop: '0.5rem' }}>
          <KanbanBoard projectId={project.id} />
        </div>
      )}

      {/* Tab 2: List View */}
      {activeTab === 'list' && (
        <div className="card animate-fade-in" style={{ padding: '0.5rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>Task</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>Priority</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>Assignee</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {projectTasks.map(task => {
                const assignee = users.find(u => u.id === task.assigneeId);
                return (
                  <tr
                    key={task.id}
                    onClick={() => setSelectedTaskId(task.id)}
                    style={{ borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }}
                    className="interactive-btn"
                  >
                    <td style={{ padding: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {task.title}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <Badge type="status" value={task.status} size="sm" />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <Badge type="priority" value={task.priority} size="sm" />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Avatar src={assignee?.avatar} alt={assignee?.name} size="xs" />
                        <span>{assignee?.name || 'Unassigned'}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>
                      {formatDate(task.dueDate)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Activity Log */}
      {activeTab === 'activity' && (
        <div className="card animate-fade-in" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {allActivities.length > 0 ? (
            allActivities.map((act, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 0',
                  borderBottom: idx !== allActivities.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{act.taskTitle}:</span>
                <span style={{ color: 'var(--text-secondary)', flex: 1 }}>{act.text}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{act.timestamp}</span>
              </div>
            ))
          ) : (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>
              No recent activity recorded for this project.
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {createTaskModalOpen && (
        <TaskModal
          isOpen={createTaskModalOpen}
          onClose={() => setCreateTaskModalOpen(false)}
          defaultProjectId={project.id}
          defaultStatus="TODO"
        />
      )}

      {selectedTaskId && (
        <TaskDetailsModal
          taskId={selectedTaskId}
          isOpen={!!selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </div>
  );
}
