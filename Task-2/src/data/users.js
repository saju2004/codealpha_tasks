// Realistic team members for TaskFlow
export const currentUser = {
  id: 'user_1',
  name: 'Alex Johnson',
  role: 'Project Manager',
  email: 'alex.johnson@taskflow.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  status: 'active',
  department: 'Product & Engineering',
  assignedTasksCount: 6
};

export const initialUsers = [
  currentUser,
  {
    id: 'user_2',
    name: 'Sarah Wilson',
    role: 'Lead UI/UX Designer',
    email: 'sarah.wilson@taskflow.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    status: 'active',
    department: 'Design',
    assignedTasksCount: 5
  },
  {
    id: 'user_3',
    name: 'David Kumar',
    role: 'Senior Frontend Engineer',
    email: 'david.kumar@taskflow.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    status: 'active',
    department: 'Frontend',
    assignedTasksCount: 8
  },
  {
    id: 'user_4',
    name: 'Michael Lee',
    role: 'Backend Architect',
    email: 'michael.lee@taskflow.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    status: 'active',
    department: 'Backend',
    assignedTasksCount: 4
  },
  {
    id: 'user_5',
    name: 'Emily Chen',
    role: 'DevOps & QA Specialist',
    email: 'emily.chen@taskflow.io',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    status: 'away',
    department: 'Infrastructure',
    assignedTasksCount: 3
  }
];
