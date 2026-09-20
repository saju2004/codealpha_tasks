// Realistic mock tasks across all 5 Kanban stages for TaskFlow
export const initialTasks = [
  {
    id: 'task_1',
    title: 'Fix authentication session refresh bug',
    description: 'Ensure expired JWT access tokens trigger a seamless silent refresh without logging the user out unexpectedly.',
    projectId: 'proj_1',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    assigneeId: 'user_3',
    dueDate: '2026-09-24',
    labels: ['Security', 'Frontend', 'Bug'],
    subtasks: [
      { id: 'st_1', title: 'Implement Axios response interceptor', completed: true },
      { id: 'st_2', title: 'Handle race conditions with token mutex', completed: true },
      { id: 'st_3', title: 'Write integration test for 401 recovery', completed: false },
      { id: 'st_4', title: 'Update documentation for auth flow', completed: false }
    ],
    comments: [
      {
        id: 'c_1',
        authorId: 'user_1',
        authorName: 'Alex Johnson',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        text: 'Let us make sure Safari Private Browsing does not block cookie storage.',
        timestamp: '2 hours ago'
      }
    ],
    activityHistory: [
      { id: 'act_1', text: 'Task moved to In Progress by David Kumar', timestamp: 'Yesterday' }
    ]
  },
  {
    id: 'task_2',
    title: 'Design high-fidelity checkout micro-animations',
    description: 'Create interactive prototypes in Figma showcasing smooth order placement feedback, credit card flip, and receipt generation.',
    projectId: 'proj_1',
    status: 'TODO',
    priority: 'MEDIUM',
    assigneeId: 'user_2',
    dueDate: '2026-09-27',
    labels: ['UI/UX', 'Design'],
    subtasks: [
      { id: 'st_5', title: 'Card number formatting mask', completed: true },
      { id: 'st_6', title: 'Success confetti micro-interaction', completed: false },
      { id: 'st_7', title: 'Mobile sheet transition states', completed: false }
    ],
    comments: [],
    activityHistory: [
      { id: 'act_2', text: 'Task created by Alex Johnson', timestamp: '2 days ago' }
    ]
  },
  {
    id: 'task_3',
    title: 'Implement Biometric Fingerprint & FaceID login',
    description: 'Integrate WebAuthn and React Native biometrics keychain for instant one-touch login on mobile devices.',
    projectId: 'proj_2',
    status: 'BACKLOG',
    priority: 'URGENT',
    assigneeId: 'user_4',
    dueDate: '2026-10-05',
    labels: ['Security', 'Mobile', 'Feature'],
    subtasks: [
      { id: 'st_8', title: 'Audit hardware enclave compatibility', completed: false },
      { id: 'st_9', title: 'Fallback to 6-digit PIN', completed: false }
    ],
    comments: [],
    activityHistory: [
      { id: 'act_3', text: 'Task added to Backlog', timestamp: '3 days ago' }
    ]
  },
  {
    id: 'task_4',
    title: 'Optimize GraphQL product catalogue queries',
    description: 'Implement dataloader batching on product variant queries to eliminate N+1 database queries on high-traffic category pages.',
    projectId: 'proj_3',
    status: 'REVIEW',
    priority: 'HIGH',
    assigneeId: 'user_4',
    dueDate: '2026-09-22',
    labels: ['Backend', 'Performance'],
    subtasks: [
      { id: 'st_10', title: 'Add redis caching for category tags', completed: true },
      { id: 'st_11', title: 'Benchmark throughput with 10k mock items', completed: true },
      { id: 'st_12', title: 'Peer code review by Emily', completed: false }
    ],
    comments: [
      {
        id: 'c_2',
        authorId: 'user_5',
        authorName: 'Emily Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        text: 'Benchmark numbers look fantastic! Latency dropped by 64%. Reviewing PR now.',
        timestamp: '30 mins ago'
      }
    ],
    activityHistory: [
      { id: 'act_4', text: 'Task submitted for Review by Michael Lee', timestamp: '1 hour ago' }
    ]
  },
  {
    id: 'task_5',
    title: 'Deploy Stripe Webhook listener & idempotent retry handler',
    description: 'Safely handle asynchronous payment succeeded and subscription renewed webhooks with replay attack signatures.',
    projectId: 'proj_3',
    status: 'DONE',
    priority: 'URGENT',
    assigneeId: 'user_4',
    dueDate: '2026-09-18',
    labels: ['Backend', 'Security'],
    subtasks: [
      { id: 'st_13', title: 'Stripe signature verification', completed: true },
      { id: 'st_14', title: 'Database idempotency key table', completed: true },
      { id: 'st_15', title: 'Test event payloads with Stripe CLI', completed: true }
    ],
    comments: [
      {
        id: 'c_3',
        authorId: 'user_1',
        authorName: 'Alex Johnson',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        text: 'Verified in sandbox and production! Rock solid implementation.',
        timestamp: '2 days ago'
      }
    ],
    activityHistory: [
      { id: 'act_5', text: 'Task marked as DONE by Alex Johnson', timestamp: '2 days ago' }
    ]
  },
  {
    id: 'task_6',
    title: 'Customer cohort retention line charts',
    description: 'Visualize weekly and monthly retention curves with toggleable date ranges and CSV dataset downloads.',
    projectId: 'proj_4',
    status: 'TODO',
    priority: 'LOW',
    assigneeId: 'user_3',
    dueDate: '2026-10-12',
    labels: ['Frontend', 'Analytics', 'Feature'],
    subtasks: [
      { id: 'st_16', title: 'Configure SVG curve smoothing', completed: false },
      { id: 'st_17', title: 'Implement tooltip hover inspection', completed: false }
    ],
    comments: [],
    activityHistory: [
      { id: 'act_6', text: 'Created by Sarah Wilson', timestamp: '4 days ago' }
    ]
  },
  {
    id: 'task_7',
    title: 'Audit WCAG 2.1 AA accessibility contrast ratios',
    description: 'Ensure color contrast for text and interactive states in both light and dark themes strictly exceeds 4.5:1 ratio.',
    projectId: 'proj_1',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    assigneeId: 'user_2',
    dueDate: '2026-09-25',
    labels: ['UI/UX', 'Testing'],
    subtasks: [
      { id: 'st_18', title: 'Test with screen reader VoiceOver', completed: true },
      { id: 'st_19', title: 'Verify focus outlines on all modals', completed: true },
      { id: 'st_20', title: 'Calibrate muted gray text in dark mode', completed: false }
    ],
    comments: [],
    activityHistory: [
      { id: 'act_7', text: 'Sarah Wilson began work on task', timestamp: 'Yesterday' }
    ]
  },
  {
    id: 'task_8',
    title: 'Build automated end-to-end Cypress smoke test suite',
    description: 'Automate checkout, user login, and project board creation testing in GitHub Actions CI pipeline on every PR.',
    projectId: 'proj_2',
    status: 'REVIEW',
    priority: 'HIGH',
    assigneeId: 'user_5',
    dueDate: '2026-09-23',
    labels: ['Testing', 'DevOps'],
    subtasks: [
      { id: 'st_21', title: 'Setup GitHub Actions matrix runner', completed: true },
      { id: 'st_22', title: 'Record video artifacts on test failure', completed: true },
      { id: 'st_23', title: 'Add Slack alert bot notification', completed: true }
    ],
    comments: [],
    activityHistory: [
      { id: 'act_8', text: 'Emily Chen moved to Review', timestamp: '5 hours ago' }
    ]
  },
  {
    id: 'task_9',
    title: 'Dark mode theme token calibration',
    description: 'Define comprehensive CSS variables for all elevation surfaces, borders, and text states for ultra-clean night viewing.',
    projectId: 'proj_1',
    status: 'DONE',
    priority: 'LOW',
    assigneeId: 'user_2',
    dueDate: '2026-09-15',
    labels: ['Design', 'UI/UX', 'Frontend'],
    subtasks: [
      { id: 'st_24', title: 'Create variables.css tokens', completed: true },
      { id: 'st_25', title: 'Persist preference to LocalStorage', completed: true }
    ],
    comments: [],
    activityHistory: [
      { id: 'act_9', text: 'Completed by Sarah Wilson', timestamp: '5 days ago' }
    ]
  },
  {
    id: 'task_10',
    title: 'Redis multi-region read replicas setup',
    description: 'Configure active-passive Redis caches in us-east and eu-central to keep API response times under 50ms globally.',
    projectId: 'proj_3',
    status: 'BACKLOG',
    priority: 'MEDIUM',
    assigneeId: 'user_5',
    dueDate: '2026-10-20',
    labels: ['Backend', 'DevOps'],
    subtasks: [
      { id: 'st_26', title: 'Terraform script for AWS ElastiCache', completed: false }
    ],
    comments: [],
    activityHistory: [
      { id: 'act_10', text: 'Task added by Alex Johnson', timestamp: '1 week ago' }
    ]
  }
];
