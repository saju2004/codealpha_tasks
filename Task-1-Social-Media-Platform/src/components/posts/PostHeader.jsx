import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, CheckCircle2, MoreVertical, Trash2, Copy, Flag, UserPlus, UserCheck } from 'lucide-react';
import Avatar from '../common/Avatar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { usePosts } from '../../context/PostContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function PostHeader({ post, onDeleteClick }) {
  const { currentUser } = useAuth();
  const { toggleFollowUser } = usePosts();
  const { showToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isOwner = currentUser?.id === post.authorId;
  const isFollowing = currentUser?.following?.includes(post.authorId);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    }
    showToast('Post link copied to clipboard! 📋', 'success');
    setMenuOpen(false);
  };

  const handleReport = () => {
    showToast('Thank you! Post has been flagged for review.', 'info');
    setMenuOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.85rem'
      }}
    >
      {/* Author Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Link to={`/profile/${post.authorUsername}`}>
          <Avatar src={post.authorAvatar} alt={post.authorName} size="md" />
        </Link>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link
              to={`/profile/${post.authorUsername}`}
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.2
              }}
            >
              {post.authorName}
            </Link>
            {post.authorVerified && (
              <CheckCircle2 size={15} color="var(--primary)" fill="var(--primary-light)" />
            )}
            {post.category && (
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  padding: '1px 7px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-surface-hover)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)'
                }}
              >
                {post.category}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              @{post.authorUsername}
            </span>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>·</span>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              {post.timestamp}
            </span>
          </div>
        </div>
      </div>

      {/* Right controls: Follow button & Dropdown menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {!isOwner && currentUser && (
          <button
            onClick={() => toggleFollowUser(post.authorId)}
            style={{
              padding: '0.3rem 0.75rem',
              fontSize: '0.775rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: isFollowing ? 'var(--bg-surface-hover)' : 'var(--primary-light)',
              color: isFollowing ? 'var(--text-secondary)' : 'var(--primary-dark)',
              border: isFollowing ? '1px solid var(--border)' : 'none',
              transition: 'all var(--transition-fast)'
            }}
            className="interactive-btn"
          >
            {isFollowing ? (
              <>
                <UserCheck size={13} />
                <span>Following</span>
              </>
            ) : (
              <>
                <UserPlus size={13} />
                <span>Follow</span>
              </>
            )}
          </button>
        )}

        {/* Dropdown Menu */}
        <div style={{ position: 'relative' }} ref={menuRef}>
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            style={{
              padding: '6px',
              borderRadius: '50%',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="hover-bounce"
            aria-label="Post options"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <div
              className="animate-dropdown glass-card"
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '4px',
                width: '180px',
                zIndex: 50,
                padding: '6px',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <button
                onClick={handleCopyLink}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  textAlign: 'left'
                }}
                className="interactive-btn"
              >
                <Copy size={15} />
                <span>Copy Link</span>
              </button>

              {isOwner ? (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDeleteClick();
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    fontSize: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--danger)',
                    textAlign: 'left'
                  }}
                  className="interactive-btn"
                >
                  <Trash2 size={15} />
                  <span>Delete Post</span>
                </button>
              ) : (
                <button
                  onClick={handleReport}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    fontSize: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-secondary)',
                    textAlign: 'left'
                  }}
                  className="interactive-btn"
                >
                  <Flag size={15} />
                  <span>Report Post</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
