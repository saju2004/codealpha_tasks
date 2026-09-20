import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Compass, TrendingUp, Users, Hash, Clock, X } from 'lucide-react';
import SearchBar from '../components/common/SearchBar.jsx';
import TrendingTags from '../components/explore/TrendingTags.jsx';
import ExploreGrid from '../components/explore/ExploreGrid.jsx';
import Avatar from '../components/common/Avatar.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { usePosts } from '../context/PostContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Explore() {
  const { posts } = usePosts();
  const { users } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlTag = searchParams.get('tag');

  const [searchQuery, setSearchQuery] = useState(urlTag ? `#${urlTag}` : '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchHistory, setSearchHistory] = useState([
    '#DesignSystem',
    '#ReactJS',
    'Alex Rivera',
    '#Photography'
  ]);

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const handleSelectHistoryItem = (item) => {
    setSearchQuery(item);
  };

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      if (selectedCategory !== 'All' && post.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesContent = post.content.toLowerCase().includes(query);
        const matchesAuthor = post.authorName.toLowerCase().includes(query) || post.authorUsername.toLowerCase().includes(query);
        const matchesTag = post.tags?.some(t => t.toLowerCase().includes(query));
        return matchesContent || matchesAuthor || matchesTag;
      }
      return true;
    });
  }, [posts, selectedCategory, searchQuery]);

  // Live user search results
  const matchingUsers = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim().replace('@', '');
    return users.filter(
      u => u.name.toLowerCase().includes(query) || u.username.toLowerCase().includes(query)
    ).slice(0, 4);
  }, [users, searchQuery]);

  return (
    <div className="explore-page animate-fade-in-up">
      {/* Header & Search */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.85rem' }}>
          Explore SocialSphere
        </h2>
        <SearchBar
          value={searchQuery}
          onChange={(val) => {
            setSearchQuery(val);
            if (!val) setSearchParams({});
          }}
          onClear={() => {
            setSearchQuery('');
            setSearchParams({});
          }}
          placeholder="Search by creator name, topic, or #hashtag..."
        />
      </div>

      {/* Search history chips if no active query */}
      {!searchQuery && searchHistory.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Recent Searches
            </span>
            <button
              onClick={handleClearHistory}
              style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
            >
              Clear
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {searchHistory.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectHistoryItem(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-surface-hover)',
                  border: '1px solid var(--border)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)'
                }}
                className="interactive-btn"
              >
                <Clock size={12} />
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Live Matching Creators (if searching) */}
      {searchQuery && matchingUsers.length > 0 && (
        <div
          className="surface-card"
          style={{ padding: '1rem', marginBottom: '1.5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <Users size={16} color="var(--primary)" />
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Matching Creators</h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            {matchingUsers.map(user => (
              <Link
                key={user.id}
                to={`/profile/${user.username}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-hover)'
                }}
                className="interactive-btn"
              >
                <Avatar src={user.avatar} alt={user.name} size="sm" />
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    @{user.username}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <TrendingTags
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Explore Grid of Posts */}
      {filteredPosts.length > 0 ? (
        <ExploreGrid posts={filteredPosts} />
      ) : (
        <EmptyState
          icon={Compass}
          title="No results match your search"
          description="Try exploring other keywords, or switch categories to discover trending posts."
          actionText="View All Posts"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('All');
          }}
        />
      )}
    </div>
  );
}
