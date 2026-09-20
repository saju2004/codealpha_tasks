// Realistic notifications for TaskFlow
export const initialNotifications = [
  {
    id: 'notif_1',
    title: 'Task Completed',
    message: 'Sarah Wilson marked "Dark mode theme token calibration" as Done',
    type: 'success',
    time: '15m ago',
    read: false,
    taskId: 'task_9'
  },
  {
    id: 'notif_2',
    title: 'Upcoming Deadline',
    message: 'Task "Fix authentication session refresh bug" is due tomorrow',
    type: 'warning',
    time: '1h ago',
    read: false,
    taskId: 'task_1'
  },
  {
    id: 'notif_3',
    title: 'New Task Assignment',
    message: 'You were assigned to "Review automated Cypress test suite"',
    type: 'info',
    time: '3h ago',
    read: false,
    taskId: 'task_8'
  },
  {
    id: 'notif_4',
    title: 'Milestone Achieved',
    message: '"Website Redesign" reached 75% overall completion! 🚀',
    type: 'success',
    time: '1d ago',
    read: true,
    projectId: 'proj_1'
  }
];
