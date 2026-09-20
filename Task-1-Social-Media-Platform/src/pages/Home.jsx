import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Sparkles, Users, TrendingUp, Flame } from 'lucide-react';
import StorySection from '../components/stories/StorySection.jsx';
import CreatePostBox from '../components/posts/CreatePostBox.jsx';
import PostCard from '../components/posts/PostCard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { usePosts } from '../context/PostContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Home() {
  const { posts } = usePosts();
  const { currentUser } = useAuth();
  const { onOpenCreateModal } = useOutletContext() || {};

  const [feedFilter, setFeedFilter] = useState('for_you'); // 'for_you' | 'following' | 'trending'

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    if (feedFilter === 'following') {
      return (
        currentUser?.following?.includes(post.authorId) ||
        post.authorId === currentUser?.id
      );
    }
    if (feedFilter === 'trending') {
      return post.likesCount > 400 || post.commentsCount > 30;
    }
    return true; // 'for_you'
  });

  return (
    <div className="home-feed-page">
      {/* Stories Section */}
      <StorySection onOpenCreateModal={onOpenCreateModal} />

      {/* Create Post Prompt Card */}
      <CreatePostBox onOpenModal={onOpenCreateModal} />

      {/* Feed Filter Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '1.25rem',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '0.75rem'
        }}
      >
        <button
          onClick={() => setFeedFilter('for_you')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.45rem 1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.875rem',
            fontWeight: 700,
            backgroundColor: feedFilter === 'for_you' ? 'var(--primary-light)' : 'transparent',
            color: feedFilter === 'for_you' ? 'var(--primary-dark)' : 'var(--text-secondary)',
            transition: 'all var(--transition-fast)'
          }}
          className="interactive-btn"
        >
          <Sparkles size={16} />
          <span>For You</span>
        </button>

        <button
          onClick={() => setFeedFilter('following')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.45rem 1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.875rem',
            fontWeight: 700,
            backgroundColor: feedFilter === 'following' ? 'var(--primary-light)' : 'transparent',
            color: feedFilter === 'following' ? 'var(--primary-dark)' : 'var(--text-secondary)',
            transition: 'all var(--transition-fast)'
          }}
          className="interactive-btn"
        >
          <Users size={16} />
          <span>Following</span>
        </button>

        <button
          onClick={() => setFeedFilter('trending')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.45rem 1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.875rem',
            fontWeight: 700,
            backgroundColor: feedFilter === 'trending' ? 'var(--primary-light)' : 'transparent',
            color: feedFilter === 'trending' ? 'var(--primary-dark)' : 'var(--text-secondary)',
            transition: 'all var(--transition-fast)'
          }}
          className="interactive-btn"
        >
          <Flame size={16} />
          <span>Trending</span>
        </button>
      </div>

      {/* Feed Stream */}
      {filteredPosts.length > 0 ? (
        <div>
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="No posts in this feed"
          description={
            feedFilter === 'following'
              ? 'Follow more creators on SocialSphere to populate your Following feed!'
              : 'Try selecting a different filter above.'
          }
          actionText="Explore Creators"
          onAction={() => setFeedFilter('for_you')}
        />
      )}
    </div>
  );
}
