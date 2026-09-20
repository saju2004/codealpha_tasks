import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { usePosts } from '../../context/PostContext.jsx';

export default function PostActions({
  post,
  onToggleComments,
  onOpenShare,
  showComments
}) {
  const { toggleLikePost, toggleSavePost } = usePosts();
  const [animateLike, setAnimateLike] = useState(false);

  const handleLike = () => {
    setAnimateLike(true);
    toggleLikePost(post.id);
    setTimeout(() => setAnimateLike(false), 500);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.85rem',
        marginTop: '0.5rem',
        borderTop: '1px solid var(--border-subtle)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Like Button */}
        <button
          onClick={handleLike}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: post.isLiked ? 'var(--accent)' : 'var(--text-secondary)',
            transition: 'color var(--transition-fast)'
          }}
          className="interactive-btn"
          aria-label="Like post"
        >
          <div className={animateLike ? 'animate-heart-pop' : ''}>
            <Heart
              size={20}
              fill={post.isLiked ? 'var(--accent)' : 'transparent'}
              color={post.isLiked ? 'var(--accent)' : 'currentColor'}
            />
          </div>
          <span>{post.likesCount}</span>
        </button>

        {/* Comment Button */}
        <button
          onClick={onToggleComments}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: showComments ? 'var(--primary)' : 'var(--text-secondary)',
            transition: 'color var(--transition-fast)'
          }}
          className="interactive-btn"
          aria-label="View comments"
        >
          <MessageCircle size={20} />
          <span>{post.commentsCount}</span>
        </button>

        {/* Share Button */}
        <button
          onClick={onOpenShare}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            transition: 'color var(--transition-fast)'
          }}
          className="interactive-btn"
          aria-label="Share post"
        >
          <Share2 size={19} />
          <span>{post.sharesCount}</span>
        </button>
      </div>

      {/* Save / Bookmark Button */}
      <button
        onClick={() => toggleSavePost(post.id)}
        style={{
          display: 'flex',
          alignItems: 'center',
          color: post.isSaved ? 'var(--primary)' : 'var(--text-secondary)',
          transition: 'all var(--transition-fast)'
        }}
        className="hover-bounce"
        aria-label={post.isSaved ? 'Unsave post' : 'Save post'}
      >
        <Bookmark
          size={20}
          fill={post.isSaved ? 'var(--primary)' : 'transparent'}
          color={post.isSaved ? 'var(--primary)' : 'currentColor'}
        />
      </button>
    </div>
  );
}
