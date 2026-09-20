import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import Avatar from '../common/Avatar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { usePosts } from '../../context/PostContext.jsx';

export default function CommentItem({ comment, postId }) {
  const { currentUser } = useAuth();
  const { toggleLikeComment, deleteComment } = usePosts();

  const isOwner = currentUser?.id === comment.authorId;

  return (
    <div
      className="animate-fade-in-up"
      style={{
        display: 'flex',
        gap: '10px',
        padding: '0.6rem 0',
        alignItems: 'flex-start'
      }}
    >
      <Link to={`/profile/${comment.authorUsername}`}>
        <Avatar src={comment.authorAvatar} alt={comment.authorName} size="xs" />
      </Link>

      <div style={{ flex: 1 }}>
        <div
          style={{
            backgroundColor: 'var(--bg-surface-hover)',
            padding: '0.65rem 0.9rem',
            borderRadius: 'var(--radius-md)',
            display: 'inline-block',
            maxWidth: '100%'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
            <Link
              to={`/profile/${comment.authorUsername}`}
              style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: 'var(--text-primary)'
              }}
            >
              {comment.authorName}
            </Link>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {comment.timestamp}
            </span>
          </div>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.45,
              wordBreak: 'break-word',
              margin: 0
            }}
          >
            {comment.content}
          </p>
        </div>

        {/* Action bar for comment */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '4px',
            marginLeft: '4px'
          }}
        >
          <button
            onClick={() => toggleLikeComment(comment.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: comment.isLiked ? 'var(--accent)' : 'var(--text-muted)'
            }}
            className="hover-bounce"
          >
            <Heart
              size={13}
              fill={comment.isLiked ? 'var(--accent)' : 'transparent'}
              color={comment.isLiked ? 'var(--accent)' : 'currentColor'}
            />
            <span>{comment.likesCount > 0 ? comment.likesCount : 'Like'}</span>
          </button>

          {isOwner && (
            <button
              onClick={() => deleteComment(comment.id, postId)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                transition: 'color var(--transition-fast)'
              }}
              title="Delete comment"
              className="hover-bounce"
            >
              <Trash2 size={13} />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
