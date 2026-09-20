import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Smile } from 'lucide-react';
import FloatingHeart from './FloatingHeart.jsx';
import { usePosts } from '../../context/PostContext.jsx';

export default function PostContent({ post }) {
  const navigate = useNavigate();
  const { triggerImageDoubleTapLike } = usePosts();
  const [showHeart, setShowHeart] = useState(false);
  const lastTapRef = useRef(0);

  const handleDoubleTap = (e) => {
    e.preventDefault();
    triggerImageDoubleTapLike(post.id);
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 900);
  };

  // Support mobile touch double-tap as well
  const handleTouchEnd = (e) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      handleDoubleTap(e);
    }
    lastTapRef.current = now;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Feelings / Activity & Location metadata */}
      {(post.feeling || post.location) && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}
        >
          {post.feeling && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: 'var(--bg-surface-hover)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <Smile size={13} color="var(--primary)" />
              <span>feeling {post.feeling}</span>
            </span>
          )}
          {post.location && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: 'var(--bg-surface-hover)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <MapPin size={13} color="var(--accent)" />
              <span>{post.location}</span>
            </span>
          )}
        </div>
      )}

      {/* Main post text content */}
      <p
        style={{
          fontSize: '0.975rem',
          lineHeight: 1.6,
          color: 'var(--text-primary)',
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}
      >
        {post.content}
      </p>

      {/* Hashtags */}
      {post.tags && post.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              onClick={() => navigate(`/explore?tag=${encodeURIComponent(tag.replace('#', ''))}`)}
              style={{
                fontSize: '0.825rem',
                fontWeight: 600,
                color: 'var(--primary)',
                cursor: 'pointer'
              }}
              className="hover-bounce"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Post Image with Double-Tap Like animation */}
      {post.image && (
        <div
          onDoubleClick={handleDoubleTap}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'relative',
            marginTop: '0.35rem',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <img
            src={post.image}
            alt="Post content"
            style={{
              width: '100%',
              maxHeight: '520px',
              objectFit: 'cover',
              transition: 'transform var(--transition-normal)'
            }}
            loading="lazy"
          />

          <FloatingHeart show={showHeart} />
        </div>
      )}
    </div>
  );
}
