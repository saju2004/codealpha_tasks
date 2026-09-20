// Realistic mock notifications for SocialSphere
export const initialNotifications = [
  {
    id: 'notif_1',
    type: 'like',
    actorId: 'user_3',
    actorName: 'Elena Rostova',
    actorUsername: 'elenarostova',
    actorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    message: 'liked your post "Just deployed the new design system components..."',
    targetPostId: 'post_1',
    targetPostImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    timestamp: '15m ago',
    read: false
  },
  {
    id: 'notif_2',
    type: 'comment',
    actorId: 'user_2',
    actorName: 'Alex Rivera',
    actorUsername: 'alexrivera',
    actorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    message: 'commented: "The glassmorphic depth and soft shadows here are top tier!"',
    targetPostId: 'post_1',
    targetPostImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    timestamp: '1h ago',
    read: false
  },
  {
    id: 'notif_3',
    type: 'follow',
    actorId: 'user_4',
    actorName: 'Marcus Vance',
    actorUsername: 'marcustech',
    actorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    message: 'started following you',
    targetPostId: null,
    targetPostImage: null,
    timestamp: '2h ago',
    read: false
  },
  {
    id: 'notif_4',
    type: 'trending',
    actorId: null,
    actorName: 'SocialSphere Trends',
    actorUsername: 'socialsphere',
    actorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    message: 'Your post is trending in #DesignSystem with 340+ reactions! 🚀',
    targetPostId: 'post_1',
    targetPostImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    timestamp: '3h ago',
    read: true
  },
  {
    id: 'notif_5',
    type: 'comment',
    actorId: 'user_5',
    actorName: 'Chloe Davis',
    actorUsername: 'chloedavis',
    actorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    message: 'commented on your photo: "Outfit + Inter looks so clean together!"',
    targetPostId: 'post_1',
    targetPostImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    timestamp: '5h ago',
    read: true
  },
  {
    id: 'notif_6',
    type: 'mention',
    actorId: 'user_6',
    actorName: 'Liam Chen',
    actorUsername: 'liamcodes',
    actorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    message: 'mentioned you in a post: "Loving the new component tokens from @sarahjenkins"',
    targetPostId: 'post_6',
    targetPostImage: null,
    timestamp: '1d ago',
    read: true
  }
];
