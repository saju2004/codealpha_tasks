import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Users, Mail, UserPlus, CheckCircle2 } from 'lucide-react';
import Avatar from '../components/common/Avatar.jsx';
import Button from '../components/common/Button.jsx';
import { useProjects } from '../context/ProjectContext.jsx';
import { useTasks } from '../context/TaskContext.jsx';

export default function Team() {
  const { users } = useProjects();
  const { tasks } = useTasks();
  const { onOpenAddMember } = useOutletContext() || {};

  return (
    <div className="team-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, margin: 0 }}>
            Team Management
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
            Collaborators, roles, and assigned sprint workloads across the workspace
          </p>
        </div>

        <Button variant="primary" size="md" icon={UserPlus} onClick={onOpenAddMember}>
          Add Member
        </Button>
      </div>

      {/* Team Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px'
        }}
      >
        {users.map((member) => {
          const memberTasks = tasks.filter(t => t.assigneeId === member.id);
          const activeTasks = memberTasks.filter(t => t.status !== 'DONE').length;

          return (
            <div
              key={member.id}
              className="card interactive-btn"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '12px'
              }}
            >
              <Avatar
                src={member.avatar}
                alt={member.name}
                size="lg"
                isOnline={member.status === 'active'}
              />

              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                  {member.name}
                </h3>
                <span style={{ fontSize: '0.825rem', color: 'var(--primary)', fontWeight: 600 }}>
                  {member.role}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                  {member.department || 'Product'}
                </span>
              </div>

              {/* Email link */}
              <a
                href={`mailto:${member.email}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)'
                }}
              >
                <Mail size={13} />
                <span>{member.email}</span>
              </a>

              {/* Workload metric pill */}
              <div
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: 'var(--surface-secondary)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-around',
                  fontSize: '0.8rem',
                  marginTop: '6px'
                }}
              >
                <div>
                  <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{activeTasks}</span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '4px' }}>Active Tasks</span>
                </div>
                <div>
                  <span style={{ fontWeight: 800, color: 'var(--success)' }}>
                    {memberTasks.length - activeTasks}
                  </span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '4px' }}>Done</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
