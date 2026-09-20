import { useState } from 'react';
import StoryCard from './StoryCard.jsx';
import StoryModal from './StoryModal.jsx';
import { usePosts } from '../../context/PostContext.jsx';

export default function StorySection({ onOpenCreateModal }) {
  const { stories } = usePosts();
  const [activeStoryIdx, setActiveStoryIdx] = useState(null);

  const handleStoryClick = (idx, story) => {
    if (story.isCurrentUser) {
      // You can either open current story or prompt to create
      setActiveStoryIdx(idx);
    } else {
      setActiveStoryIdx(idx);
    }
  };

  return (
    <div
      className="surface-card"
      style={{
        padding: '1rem',
        marginBottom: '1.25rem',
        overflowX: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      {stories.map((story, idx) => (
        <StoryCard
          key={story.id}
          story={story}
          onClick={() => handleStoryClick(idx, story)}
        />
      ))}

      {activeStoryIdx !== null && (
        <StoryModal
          isOpen={activeStoryIdx !== null}
          onClose={() => setActiveStoryIdx(null)}
          stories={stories}
          initialStoryIndex={activeStoryIdx}
        />
      )}
    </div>
  );
}
