import { useState } from 'react';
import { Copy, Share2, Send, Check, MessageSquare } from 'lucide-react';
import Modal from '../common/Modal.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function ShareModal({ isOpen, onClose, post }) {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (!post) return null;

  const postUrl = `${window.location.origin}/post/${post.id}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(postUrl);
    }
    setCopied(true);
    showToast('Link copied to clipboard! 📋', 'success');
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  const handleShareToFeed = () => {
    showToast('Shared to your feed! 🚀', 'success');
    onClose();
  };

  const handleSendDM = () => {
    onClose();
    navigate('/messages');
    showToast(`Sharing post with connections in Messages`, 'info');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Post" maxWidth="460px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Post summary snippet */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '0.85rem',
            backgroundColor: 'var(--bg-surface-elevated)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)'
          }}
        >
          {post.image ? (
            <img
              src={post.image}
              alt="Post preview"
              style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)'
              }}
            >
              <Share2 size={24} />
            </div>
          )}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {post.authorName}
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {post.content}
            </div>
          </div>
        </div>

        {/* Share options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={handleCopyLink}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.9rem 1.15rem',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}
            className="interactive-btn"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: copied ? 'var(--success-light)' : 'var(--primary-light)',
                  color: copied ? 'var(--success)' : 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </div>
              <span>{copied ? 'Link Copied!' : 'Copy Link to Post'}</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Direct URL</span>
          </button>

          <button
            onClick={handleShareToFeed}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.9rem 1.15rem',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}
            className="interactive-btn"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(236, 72, 153, 0.15)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Share2 size={18} />
              </div>
              <span>Repost to SocialSphere Feed</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Instant</span>
          </button>

          <button
            onClick={handleSendDM}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.9rem 1.15rem',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}
            className="interactive-btn"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: 'var(--info-light)',
                  color: 'var(--info)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <MessageSquare size={18} />
              </div>
              <span>Send in Direct Message</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>To a friend</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
