import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Phone, Video, Info, Smile } from 'lucide-react';
import Avatar from '../common/Avatar.jsx';
import MessageBubble from './MessageBubble.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useMessages } from '../../context/MessageContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function ChatWindow() {
  const { currentUser } = useAuth();
  const { activeConversation, isTyping, sendMessage } = useMessages();
  const { showToast } = useToast();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;
    sendMessage(activeConversation.id, inputText);
    setInputText('');
  };

  const handleFeatureNotice = (feature) => {
    showToast(`${feature} will be enabled in next release! 📞`, 'info');
  };

  if (!activeConversation) {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)'
        }}
      >
        Select a conversation to start messaging
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.9rem 1.25rem',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--bg-surface)'
        }}
      >
        <Link
          to={`/profile/${activeConversation.participantUsername}`}
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <Avatar
            src={activeConversation.participantAvatar}
            alt={activeConversation.participantName}
            size="sm"
            isOnline={activeConversation.isOnline}
          />
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {activeConversation.participantName}
            </div>
            <div style={{ fontSize: '0.75rem', color: activeConversation.isOnline ? '#10b981' : 'var(--text-muted)' }}>
              {activeConversation.isOnline ? 'Active now' : 'Offline'}
            </div>
          </div>
        </Link>

        {/* Quick action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => handleFeatureNotice('Voice call')}
            style={{
              padding: '8px',
              borderRadius: '50%',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--bg-surface-hover)'
            }}
            className="interactive-btn"
            aria-label="Call"
          >
            <Phone size={17} />
          </button>
          <button
            onClick={() => handleFeatureNotice('Video call')}
            style={{
              padding: '8px',
              borderRadius: '50%',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--bg-surface-hover)'
            }}
            className="interactive-btn"
            aria-label="Video"
          >
            <Video size={17} />
          </button>
        </div>
      </div>

      {/* Messages list */}
      <div
        style={{
          flex: 1,
          padding: '1.25rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {activeConversation.messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isMe={msg.senderId === currentUser?.id}
          />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div
            className="animate-fade-in-up"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--bg-surface-hover)',
              padding: '8px 14px',
              borderRadius: '16px',
              width: 'fit-content',
              marginBottom: '10px'
            }}
          >
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {activeConversation.participantName.split(' ')[0]} is typing
            </span>
            <span
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                animation: 'pulse 1s infinite'
              }}
            />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <form
        onSubmit={handleSend}
        style={{
          padding: '0.85rem 1.25rem',
          borderTop: '1px solid var(--border)',
          backgroundColor: 'var(--bg-surface)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Message ${activeConversation.participantName}...`}
          style={{
            flex: 1,
            backgroundColor: 'var(--bg-input)',
            borderRadius: 'var(--radius-full)',
            padding: '0.65rem 1rem',
            fontSize: '0.9rem'
          }}
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: inputText.trim() ? 'var(--primary-gradient)' : 'var(--bg-surface-hover)',
            color: inputText.trim() ? '#ffffff' : 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: inputText.trim() ? 'pointer' : 'default',
            border: 'none',
            boxShadow: inputText.trim() ? '0 4px 12px rgba(99, 102, 241, 0.35)' : 'none'
          }}
          className="interactive-btn"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
