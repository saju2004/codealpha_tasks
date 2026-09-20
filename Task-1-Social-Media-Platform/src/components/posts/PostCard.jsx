import { useState } from 'react';
import PostHeader from './PostHeader.jsx';
import PostContent from './PostContent.jsx';
import PostActions from './PostActions.jsx';
import CommentSection from './CommentSection.jsx';
import ShareModal from './ShareModal.jsx';
import ConfirmDialog from '../common/ConfirmDialog.jsx';
import { usePosts } from '../../context/PostContext.jsx';

export default function PostCard({ post }) {
  const { deletePost } = usePosts();
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <article
      className="surface-card surface-card-interactive animate-fade-in-up"
      style={{
        padding: '1.25rem',
        marginBottom: '1.25rem'
      }}
    >
      <PostHeader
        post={post}
        onDeleteClick={() => setShowDeleteConfirm(true)}
      />

      <PostContent post={post} />

      <PostActions
        post={post}
        showComments={showComments}
        onToggleComments={() => setShowComments(prev => !prev)}
        onOpenShare={() => setShowShareModal(true)}
      />

      {showComments && <CommentSection postId={post.id} />}

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        post={post}
      />

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => deletePost(post.id)}
        title="Delete Post"
        message="Are you sure you want to delete this post? It will be permanently removed from SocialSphere."
        confirmText="Delete Post"
        confirmVariant="danger"
      />
    </article>
  );
}
