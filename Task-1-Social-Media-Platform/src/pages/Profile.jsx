import ProfileHeader from '../components/profile/ProfileHeader.jsx';
import ProfileTabs from '../components/profile/ProfileTabs.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { usePosts } from '../context/PostContext.jsx';

export default function Profile() {
  const { currentUser } = useAuth();
  const { posts } = usePosts();

  if (!currentUser) return null;

  // Filter current user's posts
  const userPosts = posts.filter(p => p.authorId === currentUser.id);

  // Filter current user's saved posts
  const savedPosts = posts.filter(p => currentUser.savedPostIds?.includes(p.id));

  return (
    <div className="profile-page animate-fade-in-up">
      <ProfileHeader user={currentUser} isCurrentUser={true} />

      <ProfileTabs
        posts={userPosts}
        savedPosts={savedPosts}
        isCurrentUser={true}
      />
    </div>
  );
}
