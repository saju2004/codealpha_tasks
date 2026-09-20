import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  FolderKanban 
} from 'lucide-react';
import ProgressBar from '../components/dashboard/ProgressBar.jsx';
import { useProjects } from '../context/ProjectContext.jsx';
import { useTasks } from '../context/TaskContext.jsx';

export default function Reports() {
  const { projects } = useProjects();
  const { tasks } = useTasks();

  const totalTasks = tasks.length || 1;
  const completedTasks = tasks.filter(t => t.status === 'DONE').length;
  const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length;
  const reviewTasks = tasks.filter(t => t.status === 'REVIEW').length;
  const todoTasks = tasks.filter(t => t.status === 'TODO').length;
  const backlogTasks = tasks.filter(t => t.status === 'BACKLOG').length;

  const overallCompletionRate = Math.round((completedTasks / totalTasks) * 100);

  // Status breakdown array
  const statusBreakdown = [
    { label: 'Done', count: completedTasks, color: 'var(--status-done)' },
    { label: 'In Progress', count: inProgressTasks, color: 'var(--status-in-progress)' },
    { label: 'Review', count: reviewTasks, color: 'var(--status-review)' },
    { label: 'To Do', count: todoTasks, color: 'var(--status-todo)' },
    { label: 'Backlog', count: backlogTasks, color: 'var(--status-backlog)' }
  ];

  // Weekly velocity mock
  const weeklyData = [
    { day: 'Mon', completed: 4 },
    { day: 'Tue', completed: 7 },
    { day: 'Wed', completed: 9 },
    { day: 'Thu', completed: 6 },
    { day: 'Fri', completed: 11 },
    { day: 'Sat', completed: 3 },
    { day: 'Sun', completed: 2 }
  ];

  const maxCompleted = Math.max(...weeklyData.map(d => d.completed));

  return (
    <div className="reports-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.65rem', fontWeight: 800, margin: 0 }}>
          Project Analytics & Reports
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
          Real-time productivity velocity, completion benchmarks, and workload distribution
        </p>
      </div>

      {/* Top Completion Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Overall Completion Rate
          </span>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>
            {overallCompletionRate}%
          </div>
          <ProgressBar value={overallCompletionRate} height={8} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px', display: 'block' }}>
            {completedTasks} of {tasks.length} total tasks delivered
          </span>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Active Velocity
          </span>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--status-in-progress)', margin: '4px 0' }}>
            {inProgressTasks + reviewTasks}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Tasks actively in execution or code review
          </span>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Total Workspaces
          </span>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>
            {projects.length}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Projects configured in TaskFlow
          </span>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {/* Weekly Velocity Chart */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
              Weekly Task Completion Velocity
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Completed task velocity by day of week
            </span>
          </div>

          <div
            style={{
              height: '180px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '12px',
              paddingTop: '1rem',
              borderBottom: '1px solid var(--border)'
            }}
          >
            {weeklyData.map((d) => {
              const heightPercent = Math.round((d.completed / maxCompleted) * 100);
              return (
                <div
                  key={d.day}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    height: '100%',
                    justifyContent: 'flex-end'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    {d.completed}
                  </span>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '36px',
                      height: `${heightPercent}%`,
                      backgroundColor: 'var(--primary)',
                      borderRadius: '6px 6px 0 0',
                      transition: 'height 0.5s ease'
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Task Status Distribution */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
              Task Status Breakdown
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Distribution across Kanban columns
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {statusBreakdown.map((item) => {
              const pct = Math.round((item.count / totalTasks) * 100);
              return (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>
                      {item.count} ({pct}%)
                    </span>
                  </div>
                  <ProgressBar value={pct} color={item.color} height={6} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
