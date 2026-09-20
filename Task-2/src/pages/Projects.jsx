import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FolderKanban, Plus, Search } from 'lucide-react';
import ProjectCard from '../components/dashboard/ProjectCard.jsx';
import Button from '../components/common/Button.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { useProjects } from '../context/ProjectContext.jsx';

export default function Projects() {
  const { projects } = useProjects();
  const { onOpenCreateProject } = useOutletContext() || {};

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed' | 'archived'

  const filteredProjects = projects.filter((project) => {
    // Status filter
    if (filter !== 'all' && project.status !== filter) return false;

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      const matchName = project.name.toLowerCase().includes(q);
      const matchDesc = (project.description || '').toLowerCase().includes(q);
      const matchCat = (project.category || '').toLowerCase().includes(q);
      return matchName || matchDesc || matchCat;
    }
    return true;
  });

  return (
    <div className="projects-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, margin: 0 }}>
            Projects
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
            Manage and track all organizational workspaces and deliverables
          </p>
        </div>

        <Button variant="primary" size="md" icon={Plus} onClick={onOpenCreateProject}>
          New Project
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '0.85rem 1rem',
          backgroundColor: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            style={{ width: '100%', paddingLeft: '32px', height: '34px', fontSize: '0.825rem' }}
          />
        </div>

        {/* Status Filters */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {['all', 'active', 'completed', 'archived'].map((statusOption) => (
            <button
              key={statusOption}
              onClick={() => setFilter(statusOption)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                backgroundColor: filter === statusOption ? 'var(--primary-light)' : 'transparent',
                color: filter === statusOption ? 'var(--primary)' : 'var(--text-secondary)',
                border: filter === statusOption ? '1px solid var(--primary)' : '1px solid transparent',
                transition: 'all var(--transition-fast)'
              }}
              className="interactive-btn"
            >
              {statusOption}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px'
          }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FolderKanban}
          title="No projects match your search"
          description="Try modifying your search or click below to create a new project."
          actionText="Create Project"
          onAction={onOpenCreateProject}
        />
      )}
    </div>
  );
}
