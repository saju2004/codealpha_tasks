import { useOutletContext, Link } from 'react-router-dom';
import { 
  FolderKanban, 
  CheckSquare, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Plus, 
  Calendar 
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard.jsx';
import ProjectCard from '../components/dashboard/ProjectCard.jsx';
import Button from '../components/common/Button.jsx';
import Badge from '../components/common/Badge.jsx';
import Avatar from '../components/common/Avatar.jsx';
import { useProjects } from '../context/ProjectContext.jsx';
import { useTasks } from '../context/TaskContext.jsx';
import { formatDate, isOverdue } from '../utils/dateUtils.js';

export default function Dashboard() {
  const { projects, currentUser, users } = useProjects();
  const { tasks } = useTasks();
  const { onOpenCreateTask, onOpenCreateProject } = useOutletContext() || {};

  // Metrics
  const activeProjectsCount = projects.filter(p => p.status === 'active').length;
  const activeTasksCount = tasks.filter(t => t.status !== 'DONE').length;
  const completedTasksCount = tasks.filter(t => t.status === 'DONE').length;
  const overdueTasks = tasks.filter(t => isOverdue(t.dueDate, t.status));

  // Urgent / upcoming tasks
  const urgentTasks = tasks
    .filter(t => t.status !== 'DONE')
    .slice(0, 4);

  return (
    <div className="dashboard-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Welcome Banner */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            Good morning, {currentUser?.name?.split(' ')[0] || 'Alex'} 👋
          </h2>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
            Here's what's happening with your projects and team today.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary" size="md" icon={FolderKanban} onClick={onOpenCreateProject}>
            New Project
          </Button>
          <Button variant="primary" size="md" icon={Plus} onClick={onOpenCreateTask}>
            Create Task
          </Button>
        </div>
      </div>

      {/* Overview Stat Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px'
        }}
      >
        <StatCard
          icon={FolderKanban}
          value={projects.length}
          label="Total Projects"
          trend="+2 this month"
          trendPositive={true}
          supportingText="Active workspace"
          color="var(--primary)"
          bg="var(--primary-light)"
        />
        <StatCard
          icon={CheckSquare}
          value={activeTasksCount}
          label="Active Tasks"
          trend={`${Math.round((completedTasksCount / (tasks.length || 1)) * 100)}% done`}
          trendPositive={true}
          supportingText="Across 5 columns"
          color="var(--status-in-progress)"
          bg="rgba(139, 92, 246, 0.15)"
        />
        <StatCard
          icon={CheckCircle2}
          value={completedTasksCount}
          label="Completed Tasks"
          trend="+5 this week"
          trendPositive={true}
          supportingText="High velocity"
          color="var(--success)"
          bg="var(--success-bg)"
        />
        <StatCard
          icon={AlertTriangle}
          value={overdueTasks.length}
          label="Overdue Tasks"
          trend={overdueTasks.length > 0 ? "Requires review" : "All clear"}
          trendPositive={overdueTasks.length === 0}
          supportingText="Past deadline"
          color="var(--danger)"
          bg="var(--danger-bg)"
        />
      </div>

      {/* Active Projects Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
            Active Projects ({projects.length})
          </h3>
          <Link
            to="/projects"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--primary)'
            }}
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px'
          }}
        >
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Priority Tasks Table / Cards */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
              Immediate Tasks & Deadlines
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Tasks requiring your attention
            </span>
          </div>

          <Link to="/tasks" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>
            See my task list →
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {urgentTasks.map((task) => {
            const project = projects.find(p => p.id === task.projectId);
            const assignee = users.find(u => u.id === task.assigneeId);
            const isLate = isOverdue(task.dueDate, task.status);

            return (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Badge type="status" value={task.status} size="sm" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {task.title}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    · {project?.name || 'Project'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Badge type="priority" value={task.priority} size="sm" />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.775rem', color: isLate ? 'var(--danger)' : 'var(--text-muted)' }}>
                    <Calendar size={13} />
                    <span>{formatDate(task.dueDate)}</span>
                  </div>
                  {assignee && <Avatar src={assignee.avatar} alt={assignee.name} size="xs" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
