import { useState } from 'react';
import { Send } from 'lucide-react';
import CommentItem from './CommentItem.jsx';
import Avatar from '../common/Avatar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { usePosts } from '../../context/PostContext.jsx';

export default function CommentSection({ postId }) {
  const { currentUser } = useAuth();
  const { comments, addComment } = usePosts();
  const [newCommentText, setNewCommentText] = useState('');

  const postComments = comments.filter(c => c.postId === postId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    addComment(postId, newCommentText);
    setNewCommentText('');
  };

  return (
    <div
      style={{
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '1rem',
        marginTop: '0.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}
      className="animate-fade-in-up"
    >
      {/* New comment input form */}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Avatar src={currentUser.avatar} alt={currentUser.name} size="xs" />
          <div
            style={{
              position: 'relative',
              flex: 1,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Write a supportive comment..."
              style={{
                width: '100%',
                padding: '0.55rem 2.5rem 0.55rem 0.85rem',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border)'
              }}
            />
            <button
              type="submit"
              disabled={!newCommentText.trim()}
              style={{
                position: 'absolute',
                right: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 30,
                height: 30,
                borderRadius: '50%',
                backgroundColor: newCommentText.trim() ? 'var(--primary)' : 'transparent',
                color: newCommentText.trim() ? '#ffffff' : 'var(--text-muted)',
                cursor: newCommentText.trim() ? 'pointer' : 'default',
                transition: 'all var(--transition-fast)'
              }}
              aria-label="Submit comment"
            >
              <Send size={14} />
            </button>
          </div>
        </form>
      )}

      {/* List of comments */}
      {postComments.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {postComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} postId={postId} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '0.75rem 0',
            color: 'var(--text-muted)',
            fontSize: '0.825rem'
          }}
        >
          No comments yet. Be the first to start the conversation!
        </div>
      )}
    </div>
  );
}
