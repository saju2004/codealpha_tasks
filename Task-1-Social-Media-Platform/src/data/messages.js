// Realistic mock direct messages for SocialSphere
export const initialConversations = [
  {
    id: 'conv_1',
    participantId: 'user_2',
    participantName: 'Alex Rivera',
    participantUsername: 'alexrivera',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    isOnline: true,
    unreadCount: 1,
    messages: [
      {
        id: 'msg_1',
        senderId: 'user_2',
        text: 'Hey Sarah! Loved your presentation on the design token architecture.',
        timestamp: '10:30 AM'
      },
      {
        id: 'msg_2',
        senderId: 'user_1',
        text: 'Thanks Alex! We spent a lot of time calibrating the dark theme contrast ratios.',
        timestamp: '10:32 AM'
      },
      {
        id: 'msg_3',
        senderId: 'user_2',
        text: 'It really shows. Are you pushing the latest button interaction components today?',
        timestamp: '10:35 AM'
      }
    ]
  },
  {
    id: 'conv_2',
    participantId: 'user_3',
    participantName: 'Elena Rostova',
    participantUsername: 'elenarostova',
    participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    isOnline: true,
    unreadCount: 0,
    messages: [
      {
        id: 'msg_4',
        senderId: 'user_3',
        text: 'Hi Sarah! When are you planning that trip to Washington? The wildflowers in the alpine meadows are in peak bloom right now! 🌸',
        timestamp: 'Yesterday'
      },
      {
        id: 'msg_5',
        senderId: 'user_1',
        text: 'Elena! Hopefully next month! I have my camera gear packed and ready to go 🎒',
        timestamp: 'Yesterday'
      }
    ]
  },
  {
    id: 'conv_3',
    participantId: 'user_4',
    participantName: 'Marcus Vance',
    participantUsername: 'marcustech',
    participantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    isOnline: false,
    unreadCount: 0,
    messages: [
      {
        id: 'msg_6',
        senderId: 'user_4',
        text: 'Hey! Did you check out the new AI layout generator demo I posted?',
        timestamp: '2 days ago'
      },
      {
        id: 'msg_7',
        senderId: 'user_1',
        text: 'Yes! The prompt-to-card parsing is super slick.',
        timestamp: '2 days ago'
      }
    ]
  },
  {
    id: 'conv_4',
    participantId: 'user_5',
    participantName: 'Chloe Davis',
    participantUsername: 'chloedavis',
    participantAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    isOnline: true,
    unreadCount: 0,
    messages: [
      {
        id: 'msg_8',
        senderId: 'user_5',
        text: 'Could you join our design podcast this Thursday? We are discussing the future of CSS container queries and micro-interactions.',
        timestamp: '3 days ago'
      }
    ]
  }
];
