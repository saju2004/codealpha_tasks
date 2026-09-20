import { Search, Filter, X } from 'lucide-react';
import { useProjects } from '../../context/ProjectContext.jsx';

export default function TaskFilters({
  search,
  onSearchChange,
  priority,
  onPriorityChange,
  assignee,
  onAssigneeChange,
  label,
  onLabelChange,
  onClearFilters
}) {
  const { users } = useProjects();

  const isFiltered = search || priority !== 'ALL' || assignee !== 'ALL' || label !== 'ALL';

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '10px',
        padding: '0.85rem 1rem',
        backgroundColor: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        marginBottom: '1.25rem'
      }}
    >
      {/* Search Input */}
      <div style={{ position: 'relative', minWidth: '180px', flex: 1 }}>
        <Search
          size={15}
          style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter tasks by name..."
          style={{ width: '100%', paddingLeft: '32px', height: '34px', fontSize: '0.825rem' }}
        />
      </div>

      {/* Priority Selector */}
      <select
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
        style={{ height: '34px', fontSize: '0.825rem' }}
      >
        <option value="ALL">All Priorities</option>
        <option value="URGENT">Urgent</option>
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </select>

      {/* Assignee Selector */}
      <select
        value={assignee}
        onChange={(e) => onAssigneeChange(e.target.value)}
        style={{ height: '34px', fontSize: '0.825rem' }}
      >
        <option value="ALL">All Assignees</option>
        {users.map(u => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      {/* Label Selector */}
      <select
        value={label}
        onChange={(e) => onLabelChange(e.target.value)}
        style={{ height: '34px', fontSize: '0.825rem' }}
      >
        <option value="ALL">All Labels</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="UI/UX">UI/UX</option>
        <option value="Bug">Bug</option>
        <option value="Security">Security</option>
        <option value="Testing">Testing</option>
        <option value="DevOps">DevOps</option>
      </select>

      {/* Clear Filters Button */}
      {isFiltered && (
        <button
          onClick={onClearFilters}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--primary)',
            padding: '4px 8px',
            borderRadius: 'var(--radius-sm)'
          }}
          className="interactive-btn"
        >
          <X size={14} />
          <span>Clear</span>
        </button>
      )}
    </div>
  );
}
