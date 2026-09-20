import { useState } from 'react';
import { Grid, Image, Bookmark, Heart, MessageCircle } from 'lucide-react';
import PostCard from '../posts/PostCard.jsx';
import EmptyState from '../common/EmptyState.jsx';

export default function ProfileTabs({
  posts = [],
  savedPosts = [],
  isCurrentUser = false
}) {
  const [activeTab, setActiveTab] = useState('posts');

  const mediaPosts = posts.filter(p => !!p.image);

  return (
    <div>
      {/* Tabs navigation */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--border)',
          marginBottom: '1.25rem',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          padding: '4px'
        }}
      >
        <button
          onClick={() => setActiveTab('posts')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.9rem',
            fontWeight: activeTab === 'posts' ? 700 : 500,
            color: activeTab === 'posts' ? 'var(--primary)' : 'var(--text-secondary)',
            backgroundColor: activeTab === 'posts' ? 'var(--primary-light)' : 'transparent',
            transition: 'all var(--transition-fast)'
          }}
          className="interactive-btn"
        >
          <Grid size={18} />
          <span>Posts ({posts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('media')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.9rem',
            fontWeight: activeTab === 'media' ? 700 : 500,
            color: activeTab === 'media' ? 'var(--primary)' : 'var(--text-secondary)',
            backgroundColor: activeTab === 'media' ? 'var(--primary-light)' : 'transparent',
            transition: 'all var(--transition-fast)'
          }}
          className="interactive-btn"
        >
          <Image size={18} />
          <span>Media ({mediaPosts.length})</span>
        </button>

        {isCurrentUser && (
          <button
            onClick={() => setActiveTab('saved')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.9rem',
              fontWeight: activeTab === 'saved' ? 700 : 500,
              color: activeTab === 'saved' ? 'var(--primary)' : 'var(--text-secondary)',
              backgroundColor: activeTab === 'saved' ? 'var(--primary-light)' : 'transparent',
              transition: 'all var(--transition-fast)'
            }}
            className="interactive-btn"
          >
            <Bookmark size={18} />
            <span>Saved ({savedPosts.length})</span>
          </button>
        )}
      </div>

      {/* Tab Contents */}
      {activeTab === 'posts' && (
        <div>
          {posts.length > 0 ? (
            posts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <EmptyState
              icon={Grid}
              title="No posts published yet"
              description="Posts shared by this creator will appear here."
            />
          )}
        </div>
      )}

      {activeTab === 'media' && (
        <div>
          {mediaPosts.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '12px'
              }}
            >
              {mediaPosts.map(post => (
                <div
                  key={post.id}
                  style={{
                    position: 'relative',
                    aspectRatio: '1/1',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                  className="explore-grid-item"
                >
                  <img
                    src={post.image}
                    alt={post.content}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    className="explore-overlay"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.45)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '16px',
                      color: '#ffffff',
                      opacity: 0,
                      transition: 'opacity var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                      <Heart size={16} fill="#ffffff" />
                      <span>{post.likesCount}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                      <MessageCircle size={16} fill="#ffffff" />
                      <span>{post.commentsCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Image}
              title="No photos or media"
              description="Photos shared with posts will appear in this visual gallery."
            />
          )}
        </div>
      )}

      {activeTab === 'saved' && (
        <div>
          {savedPosts.length > 0 ? (
            savedPosts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <EmptyState
              icon={Bookmark}
              title="No saved posts yet"
              description="Save interesting posts to read or reference later."
            />
          )}
        </div>
      )}
    </div>
  );
}
