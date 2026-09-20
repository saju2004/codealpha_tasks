import { useParams, Navigate } from 'react-router-dom';
import { UserX } from 'lucide-react';
import ProfileHeader from '../components/profile/ProfileHeader.jsx';
import ProfileTabs from '../components/profile/ProfileTabs.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { usePosts } from '../context/PostContext.jsx';

export default function UserProfile() {
  const { username } = useParams();
  const { getUser, currentUser } = useAuth();
  const { posts } = usePosts();

  const user = getUser(username);

  // If this is the current user, redirect to /profile
  if (user && currentUser && user.id === currentUser.id) {
    return <Navigate to="/profile" replace />;
  }

  if (!user) {
    return (
      <div style={{ paddingTop: '2rem' }}>
        <EmptyState
          icon={UserX}
          title="User not found"
          description={`The creator @${username} doesn't exist on SocialSphere or may have updated their handle.`}
        />
      </div>
    );
  }

  const userPosts = posts.filter(p => p.authorId === user.id);

  return (
    <div className="user-profile-page animate-fade-in-up">
      <ProfileHeader user={user} isCurrentUser={false} />

      <ProfileTabs
        posts={userPosts}
        isCurrentUser={false}
      />
    </div>
  );
}
