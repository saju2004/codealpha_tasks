import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, FolderKanban } from 'lucide-react';
import ProgressBar from './ProgressBar.jsx';
import Avatar from '../common/Avatar.jsx';
import Badge from '../common/Badge.jsx';
import { useProjects } from '../../context/ProjectContext.jsx';
import { useTasks } from '../../context/TaskContext.jsx';
import { formatDate } from '../../utils/dateUtils.js';

export default function ProjectCard({ project }) {
  const { users } = useProjects();
  const { tasks, getProjectProgress } = useTasks();

  const projectTasks = tasks.filter(t => t.projectId === project.id);
  const doneTasks = projectTasks.filter(t => t.status === 'DONE').length;
  const progress = getProjectProgress(project.id);

  const memberUsers = (project.members || [])
    .map(uid => users.find(u => u.id === uid))
    .filter(Boolean);

  return (
    <Link
      to={`/projects/${project.id}`}
      className="card task-card-hover animate-fade-in"
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '14px',
        textDecoration: 'none',
        color: 'inherit'
      }}
    >
      {/* Top: Project Icon & Priority */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 'var(--radius-md)',
              backgroundColor: `${project.color}20`,
              color: project.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FolderKanban size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
              {project.name}
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {project.category}
            </span>
          </div>
        </div>

        <Badge type="priority" value={project.priority} size="sm" />
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.45,
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {project.description}
      </p>

      {/* Progress */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.785rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Progress</span>
          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{progress}%</span>
        </div>
        <ProgressBar value={progress} color={project.color} />
      </div>

      {/* Bottom Footer: Members & Deadline */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border)',
          fontSize: '0.775rem'
        }}
      >
        {/* Avatars stack */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {memberUsers.slice(0, 3).map((m, idx) => (
            <div
              key={m.id}
              style={{
                marginLeft: idx === 0 ? 0 : '-8px',
                border: '2px solid var(--surface)',
                borderRadius: '50%'
              }}
            >
              <Avatar src={m.avatar} alt={m.name} size="xs" />
            </div>
          ))}
          {memberUsers.length > 3 && (
            <span style={{ marginLeft: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              +{memberUsers.length - 3}
            </span>
          )}
        </div>

        {/* Task counter & deadline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <CheckCircle2 size={13} color="var(--success)" />
            {doneTasks}/{projectTasks.length}
          </span>
          <span>·</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Calendar size={13} />
            {formatDate(project.dueDate)}
          </span>
        </div>
      </div>
    </Link>
  );
}
