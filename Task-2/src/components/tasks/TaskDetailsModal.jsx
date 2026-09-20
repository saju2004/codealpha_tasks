import { useState } from 'react';
import { 
  Calendar, 
  User, 
  Trash2, 
  MessageSquare, 
  History, 
  Send, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import Modal from '../common/Modal.jsx';
import Button from '../common/Button.jsx';
import Badge from '../common/Badge.jsx';
import Avatar from '../common/Avatar.jsx';
import ConfirmDialog from '../common/ConfirmDialog.jsx';
import SubtaskList from './SubtaskList.jsx';
import { useTasks } from '../../context/TaskContext.jsx';
import { useProjects } from '../../context/ProjectContext.jsx';
import { formatDate, isOverdue } from '../../utils/dateUtils.js';

export default function TaskDetailsModal({ taskId, isOpen, onClose }) {
  const { tasks, updateTask, deleteTask, addComment, deleteComment } = useTasks();
  const { projects, users, currentUser } = useProjects();

  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'comments' | 'history'
  const [commentInput, setCommentInput] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const task = tasks.find(t => t.id === taskId);
  if (!task || !isOpen) return null;

  const project = projects.find(p => p.id === task.projectId);
  const assignee = users.find(u => u.id === task.assigneeId);
  const isTaskOverdue = isOverdue(task.dueDate, task.status);

  const handleStatusChange = (newStatus) => {
    updateTask(task.id, { status: newStatus });
  };

  const handlePriorityChange = (newPriority) => {
    updateTask(task.id, { priority: newPriority });
  };

  const handleAssigneeChange = (newAssigneeId) => {
    updateTask(task.id, { assigneeId: newAssigneeId });
  };

  const handleAddCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(task.id, commentInput);
    setCommentInput('');
  };

  const handleDeleteTaskConfirm = () => {
    deleteTask(task.id);
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={task.title} maxWidth="640px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Top Quick Status & Action Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 10px'
                }}
              >
                <option value="BACKLOG">Backlog</option>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="REVIEW">Review</option>
                <option value="DONE">Done</option>
              </select>

              <select
                value={task.priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 10px'
                }}
              >
                <option value="LOW">Low Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="HIGH">High Priority</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: 'var(--danger)',
                fontSize: '0.8rem',
                fontWeight: 600,
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)'
              }}
              className="interactive-btn"
            >
              <Trash2 size={14} />
              <span>Delete Task</span>
            </button>
          </div>

          {/* Metadata Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px',
              padding: '0.85rem 1rem',
              backgroundColor: 'var(--surface-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)'
            }}
          >
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                Project
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {project?.name || 'Unassigned'}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                Assignee
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <Avatar src={assignee?.avatar} alt={assignee?.name} size="xs" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  {assignee?.name || 'Unassigned'}
                </span>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                Due Date
              </span>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: isTaskOverdue ? 'var(--danger)' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Calendar size={13} />
                {formatDate(task.dueDate)} {isTaskOverdue && '(Overdue)'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Description
            </h4>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-primary)', lineHeight: 1.55, margin: 0 }}>
              {task.description || 'No description provided for this task.'}
            </p>
          </div>

          {/* Labels */}
          {task.labels && task.labels.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {task.labels.map((lbl, idx) => (
                <Badge key={idx} type="label" value={lbl} />
              ))}
            </div>
          )}

          {/* Tabs: Details (Subtasks) vs Comments vs Activity History */}
          <div style={{ borderBottom: '1px solid var(--border)', display: 'flex', gap: '16px' }}>
            <button
              onClick={() => setActiveTab('details')}
              style={{
                padding: '0.5rem 0',
                fontSize: '0.875rem',
                fontWeight: activeTab === 'details' ? 700 : 500,
                color: activeTab === 'details' ? 'var(--primary)' : 'var(--text-secondary)',
                borderBottom: activeTab === 'details' ? '2px solid var(--primary)' : '2px solid transparent'
              }}
            >
              Subtasks ({task.subtasks?.length || 0})
            </button>

            <button
              onClick={() => setActiveTab('comments')}
              style={{
                padding: '0.5rem 0',
                fontSize: '0.875rem',
                fontWeight: activeTab === 'comments' ? 700 : 500,
                color: activeTab === 'comments' ? 'var(--primary)' : 'var(--text-secondary)',
                borderBottom: activeTab === 'comments' ? '2px solid var(--primary)' : '2px solid transparent'
              }}
            >
              Comments ({task.comments?.length || 0})
            </button>

            <button
              onClick={() => setActiveTab('history')}
              style={{
                padding: '0.5rem 0',
                fontSize: '0.875rem',
                fontWeight: activeTab === 'history' ? 700 : 500,
                color: activeTab === 'history' ? 'var(--primary)' : 'var(--text-secondary)',
                borderBottom: activeTab === 'history' ? '2px solid var(--primary)' : '2px solid transparent'
              }}
            >
              Activity History
            </button>
          </div>

          {/* Tab 1: Subtasks */}
          {activeTab === 'details' && (
            <div className="animate-fade-in">
              <SubtaskList task={task} />
            </div>
          )}

          {/* Tab 2: Comments */}
          {activeTab === 'comments' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <form onSubmit={handleAddCommentSubmit} style={{ display: 'flex', gap: '8px' }}>
                <Avatar src={currentUser?.avatar} alt={currentUser?.name} size="sm" />
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Write a comment..."
                  style={{ flex: 1, fontSize: '0.875rem' }}
                />
                <Button variant="primary" size="sm" type="submit" disabled={!commentInput.trim()}>
                  <Send size={14} />
                </Button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                {task.comments && task.comments.length > 0 ? (
                  task.comments.map(c => (
                    <div
                      key={c.id}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        padding: '8px',
                        backgroundColor: 'var(--surface-secondary)',
                        borderRadius: 'var(--radius-md)',
                        position: 'relative'
                      }}
                    >
                      <Avatar src={c.authorAvatar} alt={c.authorName} size="xs" />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{c.authorName}</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.timestamp}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', margin: '2px 0 0 0' }}>
                          {c.text}
                        </p>
                      </div>
                      {c.authorId === currentUser?.id && (
                        <button
                          onClick={() => deleteComment(task.id, c.id)}
                          style={{ color: 'var(--text-muted)', padding: '2px' }}
                          title="Delete comment"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>
                    No comments yet.
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: History */}
          {activeTab === 'history' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {task.activityHistory && task.activityHistory.length > 0 ? (
                task.activityHistory.map((act) => (
                  <div
                    key={act.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.825rem',
                      color: 'var(--text-secondary)',
                      padding: '4px 0'
                    }}
                  >
                    <Clock size={14} color="var(--primary)" />
                    <span style={{ flex: 1 }}>{act.text}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{act.timestamp}</span>
                  </div>
                ))
              ) : (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No recorded activity yet.</span>
              )}
            </div>
          )}
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteTaskConfirm}
        title="Delete this task?"
        message={`Are you sure you want to delete "${task.title}"? All subtasks and comments will be permanently removed.`}
        confirmText="Delete Task"
        confirmVariant="danger"
      />
    </>
  );
}
