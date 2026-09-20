import { useState } from 'react';
import Avatar from '../common/Avatar.jsx';
import SearchBar from '../common/SearchBar.jsx';

export default function ConversationList({
  conversations = [],
  activeId,
  onSelect
}) {
  const [search, setSearch] = useState('');

  const filtered = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(search.toLowerCase()) ||
    conv.participantUsername.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRight: '1px solid var(--border)'
      }}
    >
      {/* Search Bar */}
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.85rem' }}>Messages</h3>
        <SearchBar
          value={search}
          onChange={setSearch}
          onClear={() => setSearch('')}
          placeholder="Search chats..."
        />
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filtered.map((conv) => {
          const isActive = conv.id === activeId;
          const lastMsg = conv.messages[conv.messages.length - 1];

          return (
            <div
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.9rem 1rem',
                cursor: 'pointer',
                backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                transition: 'all var(--transition-fast)'
              }}
              className="interactive-btn"
            >
              <Avatar
                src={conv.participantAvatar}
                alt={conv.participantName}
                size="md"
                isOnline={conv.isOnline}
              />

              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: conv.unreadCount > 0 ? 800 : 600,
                      color: isActive ? 'var(--primary-dark)' : 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {conv.participantName}
                  </span>
                  {lastMsg && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {lastMsg.timestamp}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: conv.unreadCount > 0 ? 'var(--text-primary)' : 'var(--text-muted)',
                      fontWeight: conv.unreadCount > 0 ? 600 : 400,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      margin: 0,
                      maxWidth: '180px'
                    }}
                  >
                    {lastMsg?.text || 'Start conversation...'}
                  </p>

                  {conv.unreadCount > 0 && (
                    <span
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: '#ffffff',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
