import { createContext, useContext, useState, useEffect } from 'react';
import { initialPosts } from '../data/posts.js';
import { initialComments } from '../data/comments.js';
import { initialStories } from '../data/stories.js';
import { initialNotifications } from '../data/notifications.js';
import { useAuth } from './AuthContext.jsx';
import { useToast } from './ToastContext.jsx';

const PostContext = createContext();

export function PostProvider({ children }) {
  const { currentUser, setCurrentUser, setUsers } = useAuth();
  const { showToast } = useToast();

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('socialsphere_posts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialPosts;
  });

  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('socialsphere_comments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialComments;
  });

  const [stories, setStories] = useState(() => {
    const saved = localStorage.getItem('socialsphere_stories');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialStories;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('socialsphere_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialNotifications;
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('socialsphere_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('socialsphere_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('socialsphere_stories', JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('socialsphere_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toggle Like on a Post
  const toggleLikePost = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          const likesCount = isLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1);

          // Add notification if liked and not user's own post
          if (isLiked && currentUser && post.authorId !== currentUser.id) {
            const newNotif = {
              id: 'notif_' + Date.now(),
              type: 'like',
              actorId: currentUser.id,
              actorName: currentUser.name,
              actorUsername: currentUser.username,
              actorAvatar: currentUser.avatar,
              message: `liked your post "${post.content.substring(0, 30)}..."`,
              targetPostId: post.id,
              targetPostImage: post.image || null,
              timestamp: 'Just now',
              read: false
            };
            setNotifications(prev => [newNotif, ...prev]);
          }

          return { ...post, isLiked, likesCount };
        }
        return post;
      })
    );
  };

  // Double tap like on post image
  const triggerImageDoubleTapLike = (postId) => {
    let wasLiked = false;
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          wasLiked = post.isLiked;
          if (!post.isLiked) {
            if (currentUser && post.authorId !== currentUser.id) {
              const newNotif = {
                id: 'notif_' + Date.now(),
                type: 'like',
                actorId: currentUser.id,
                actorName: currentUser.name,
                actorUsername: currentUser.username,
                actorAvatar: currentUser.avatar,
                message: `liked your post "${post.content.substring(0, 30)}..."`,
                targetPostId: post.id,
                targetPostImage: post.image || null,
                timestamp: 'Just now',
                read: false
              };
              setNotifications(prev => [newNotif, ...prev]);
            }
            return { ...post, isLiked: true, likesCount: post.likesCount + 1 };
          }
        }
        return post;
      })
    );
    return !wasLiked;
  };

  // Toggle Save Post
  const toggleSavePost = (postId) => {
    if (!currentUser) return;
    const isCurrentlySaved = currentUser.savedPostIds?.includes(postId);
    const updatedSaved = isCurrentlySaved
      ? currentUser.savedPostIds.filter(id => id !== postId)
      : [...(currentUser.savedPostIds || []), postId];

    const updatedUser = { ...currentUser, savedPostIds: updatedSaved };
    setCurrentUser(updatedUser);

    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, isSaved: !isCurrentlySaved } : p))
    );

    showToast(
      isCurrentlySaved ? 'Post removed from saved collection' : 'Post saved to your collection!',
      'success'
    );
  };

  // Follow / Unfollow User
  const toggleFollowUser = (targetUserId) => {
    if (!currentUser) return;
    const isFollowing = currentUser.following?.includes(targetUserId);

    const updatedFollowing = isFollowing
      ? currentUser.following.filter(id => id !== targetUserId)
      : [...(currentUser.following || []), targetUserId];

    const updatedCurrentUser = {
      ...currentUser,
      following: updatedFollowing,
      followingCount: isFollowing
        ? Math.max(0, currentUser.followingCount - 1)
        : currentUser.followingCount + 1
    };

    setCurrentUser(updatedCurrentUser);

    // Update target user's follower count
    setUsers(prevUsers =>
      prevUsers.map(u => {
        if (u.id === targetUserId) {
          return {
            ...u,
            followersCount: isFollowing
              ? Math.max(0, u.followersCount - 1)
              : u.followersCount + 1
          };
        }
        return u;
      })
    );

    // Notify if followed
    if (!isFollowing) {
      const newNotif = {
        id: 'notif_' + Date.now(),
        type: 'follow',
        actorId: currentUser.id,
        actorName: currentUser.name,
        actorUsername: currentUser.username,
        actorAvatar: currentUser.avatar,
        message: 'started following you',
        targetPostId: null,
        targetPostImage: null,
        timestamp: 'Just now',
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
    }

    showToast(isFollowing ? 'Unfollowed user' : 'You are now following this creator!', 'info');
  };

  // Add Comment
  const addComment = (postId, content) => {
    if (!currentUser || !content.trim()) return;

    const newComment = {
      id: 'comment_' + Date.now(),
      postId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      content: content.trim(),
      timestamp: 'Just now',
      likesCount: 0,
      isLiked: false
    };

    setComments(prev => [newComment, ...prev]);

    // Increment post's commentsCount
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p))
    );

    // Notify post author if not self
    const post = posts.find(p => p.id === postId);
    if (post && post.authorId !== currentUser.id) {
      const newNotif = {
        id: 'notif_' + Date.now(),
        type: 'comment',
        actorId: currentUser.id,
        actorName: currentUser.name,
        actorUsername: currentUser.username,
        actorAvatar: currentUser.avatar,
        message: `commented: "${content.trim().substring(0, 35)}..."`,
        targetPostId: post.id,
        targetPostImage: post.image || null,
        timestamp: 'Just now',
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
    }

    showToast('Comment posted!', 'success');
  };

  // Delete Comment
  const deleteComment = (commentId, postId) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
    setPosts(prev =>
      prev.map(p =>
        p.id === postId ? { ...p, commentsCount: Math.max(0, p.commentsCount - 1) } : p
      )
    );
    showToast('Comment deleted', 'info');
  };

  // Toggle Like on Comment
  const toggleLikeComment = (commentId) => {
    setComments(prev =>
      prev.map(c => {
        if (c.id === commentId) {
          const isLiked = !c.isLiked;
          return {
            ...c,
            isLiked,
            likesCount: isLiked ? c.likesCount + 1 : Math.max(0, c.likesCount - 1)
          };
        }
        return c;
      })
    );
  };

  // Create Post
  const createPost = ({ content, image, category = 'General', feeling = '', location = '', tags = [] }) => {
    if (!currentUser || !content.trim()) return null;

    const newPost = {
      id: 'post_' + Date.now(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      authorVerified: currentUser.verified || false,
      content: content.trim(),
      image: image || null,
      category,
      feeling: feeling || '',
      location: location || '',
      timestamp: 'Just now',
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: false,
      isSaved: false,
      tags: tags.length ? tags : ['#SocialSphere', '#Creative']
    };

    setPosts(prev => [newPost, ...prev]);

    // Update user post count
    const updatedUser = { ...currentUser, postsCount: (currentUser.postsCount || 0) + 1 };
    setCurrentUser(updatedUser);

    showToast('Your post is now live on SocialSphere! 🚀', 'success');
    return newPost;
  };

  // Delete Post
  const deletePost = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    setComments(prev => prev.filter(c => c.postId !== postId));
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        postsCount: Math.max(0, (currentUser.postsCount || 1) - 1)
      });
    }
    showToast('Post removed successfully', 'info');
  };

  // Mark notification read
  const markNotificationAsRead = (notifId) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // Reset all local storage to pristine mock demo data
  const resetAllData = () => {
    localStorage.removeItem('socialsphere_posts');
    localStorage.removeItem('socialsphere_comments');
    localStorage.removeItem('socialsphere_stories');
    localStorage.removeItem('socialsphere_notifications');
    localStorage.removeItem('socialsphere_conversations');
    localStorage.removeItem('socialsphere_users');
    localStorage.removeItem('socialsphere_current_user');
    window.location.reload();
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        comments,
        stories,
        notifications,
        toggleLikePost,
        triggerImageDoubleTapLike,
        toggleSavePost,
        toggleFollowUser,
        addComment,
        deleteComment,
        toggleLikeComment,
        createPost,
        deletePost,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        resetAllData
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
}
