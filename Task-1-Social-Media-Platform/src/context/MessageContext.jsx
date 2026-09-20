import { createContext, useContext, useState, useEffect } from 'react';
import { initialConversations } from '../data/messages.js';
import { useAuth } from './AuthContext.jsx';

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const { currentUser, getUser } = useAuth();

  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('socialsphere_conversations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialConversations;
  });

  const [activeConversationId, setActiveConversationId] = useState('conv_1');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    localStorage.setItem('socialsphere_conversations', JSON.stringify(conversations));
  }, [conversations]);

  const activeConversation = conversations.find(c => c.id === activeConversationId) || conversations[0] || null;

  const markConversationRead = (convId) => {
    setConversations(prev =>
      prev.map(c => (c.id === convId ? { ...c, unreadCount: 0 } : c))
    );
  };

  const startOrGetConversation = (participantId) => {
    const existing = conversations.find(c => c.participantId === participantId);
    if (existing) {
      setActiveConversationId(existing.id);
      return existing.id;
    }

    const participant = getUser(participantId);
    if (!participant) return null;

    const newConv = {
      id: 'conv_' + Date.now(),
      participantId: participant.id,
      participantName: participant.name,
      participantUsername: participant.username,
      participantAvatar: participant.avatar,
      isOnline: true,
      unreadCount: 0,
      messages: [
        {
          id: 'msg_welcome_' + Date.now(),
          senderId: participant.id,
          text: `Hey there! Thanks for reaching out on SocialSphere 👋`,
          timestamp: 'Just now'
        }
      ]
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    return newConv.id;
  };

  const sendMessage = (conversationId, text) => {
    if (!text.trim() || !currentUser) return;

    const newMsg = {
      id: 'msg_' + Date.now(),
      senderId: currentUser.id,
      text: text.trim(),
      timestamp: 'Just now'
    };

    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMsg]
          };
        }
        return conv;
      })
    );

    // Realistic auto-reply simulation
    const targetConv = conversations.find(c => c.id === conversationId);
    if (targetConv) {
      setTimeout(() => {
        setIsTyping(true);
      }, 700);

      setTimeout(() => {
        setIsTyping(false);
        const replies = [
          `That sounds awesome! Totally agree with you.`,
          `Love that idea! Let's definitely collaborate on this soon.`,
          `Thanks for sharing! Checking out the details right now.`,
          `Super cool! SocialSphere is looking cleaner every single day 🔥`,
          `Appreciate the feedback, Sarah! Keep up the incredible work! ✨`
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        const autoReply = {
          id: 'msg_reply_' + Date.now(),
          senderId: targetConv.participantId,
          text: randomReply,
          timestamp: 'Just now'
        };

        setConversations(prev =>
          prev.map(c => {
            if (c.id === conversationId) {
              return {
                ...c,
                messages: [...c.messages, autoReply]
              };
            }
            return c;
          })
        );
      }, 2100);
    }
  };

  return (
    <MessageContext.Provider
      value={{
        conversations,
        activeConversationId,
        setActiveConversationId,
        activeConversation,
        isTyping,
        sendMessage,
        markConversationRead,
        startOrGetConversation
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
}
