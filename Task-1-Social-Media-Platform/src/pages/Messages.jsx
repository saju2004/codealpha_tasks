import { useState } from 'react';
import ConversationList from '../components/messages/ConversationList.jsx';
import ChatWindow from '../components/messages/ChatWindow.jsx';
import { useMessages } from '../context/MessageContext.jsx';
import { ArrowLeft } from 'lucide-react';

export default function Messages() {
  const { conversations, activeConversationId, setActiveConversationId, markConversationRead } = useMessages();
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const handleSelectConv = (id) => {
    setActiveConversationId(id);
    markConversationRead(id);
    setMobileShowChat(true);
  };

  return (
    <div
      className="messages-page surface-card animate-fade-in-up"
      style={{
        display: 'flex',
        height: 'calc(100vh - 120px)',
        minHeight: '520px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Left List Pane */}
      <div
        style={{
          width: '320px',
          flexShrink: 0,
          height: '100%',
          display: mobileShowChat ? 'none' : 'block',
          borderRight: '1px solid var(--border)'
        }}
        className="messages-list-pane"
      >
        <ConversationList
          conversations={conversations}
          activeId={activeConversationId}
          onSelect={handleSelectConv}
        />
      </div>

      {/* Right Chat Pane */}
      <div
        style={{
          flex: 1,
          height: '100%',
          display: !mobileShowChat && window.innerWidth <= 768 ? 'none' : 'flex',
          flexDirection: 'column'
        }}
        className="messages-chat-pane"
      >
        {/* Mobile Back Button */}
        {mobileShowChat && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              borderBottom: '1px solid var(--border)',
              backgroundColor: 'var(--bg-surface)'
            }}
          >
            <button
              onClick={() => setMobileShowChat(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                color: 'var(--primary)',
                fontWeight: 600
              }}
            >
              <ArrowLeft size={18} />
              <span>Back to chats</span>
            </button>
          </div>
        )}

        <ChatWindow />
      </div>
    </div>
  );
}
