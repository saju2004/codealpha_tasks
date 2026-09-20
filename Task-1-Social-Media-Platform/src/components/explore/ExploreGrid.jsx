import { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import Modal from '../common/Modal.jsx';
import PostCard from '../posts/PostCard.jsx';

export default function ExploreGrid({ posts = [] }) {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '14px'
        }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="surface-card explore-grid-item"
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              cursor: 'pointer',
              height: '240px'
            }}
          >
            {post.image ? (
              <img
                src={post.image}
                alt={post.content}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'var(--primary-gradient-soft)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--primary)'
                    }}
                  >
                    @{post.authorUsername}
                  </span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      backgroundColor: 'var(--bg-surface)',
                      padding: '1px 6px',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    {post.category}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    lineHeight: 1.4,
                    color: 'var(--text-primary)',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {post.content}
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {post.timestamp}
                </div>
              </div>
            )}

            {/* Hover overlay with likes and comments */}
            <div
              className="explore-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.65)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                color: '#ffffff',
                opacity: 0,
                transition: 'opacity var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                <Heart size={18} fill="#ffffff" />
                <span>{post.likesCount}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                <MessageCircle size={18} fill="#ffffff" />
                <span>{post.commentsCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <Modal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          title={`Post by ${selectedPost.authorName}`}
          maxWidth="620px"
        >
          <PostCard post={selectedPost} />
        </Modal>
      )}
    </>
  );
}
