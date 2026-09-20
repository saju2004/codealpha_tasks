import { createContext, useContext, useState, useEffect } from 'react';
import { initialTasks } from '../data/tasks.js';
import { initialNotifications } from '../data/notifications.js';
import { loadStorage, saveStorage, clearAllTaskFlowStorage } from '../utils/storage.js';
import { useToast } from './ToastContext.jsx';
import { useProjects } from './ProjectContext.jsx';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const { showToast } = useToast();
  const { currentUser } = useProjects();

  const [tasks, setTasks] = useState(() =>
    loadStorage('taskflow_tasks', initialTasks)
  );

  const [notifications, setNotifications] = useState(() =>
    loadStorage('taskflow_notifications', initialNotifications)
  );

  useEffect(() => {
    saveStorage('taskflow_tasks', tasks);
  }, [tasks]);

  useEffect(() => {
    saveStorage('taskflow_notifications', notifications);
  }, [notifications]);

  // Create Task
  const createTask = (taskData) => {
    const newTask = {
      id: 'task_' + Date.now(),
      status: 'BACKLOG',
      priority: 'MEDIUM',
      subtasks: [],
      comments: [],
      activityHistory: [
        {
          id: 'act_' + Date.now(),
          text: `Task created by ${currentUser?.name || 'Alex Johnson'}`,
          timestamp: 'Just now'
        }
      ],
      ...taskData
    };

    setTasks(prev => [newTask, ...prev]);
    showToast(`Task "${newTask.title}" created successfully! 🎯`, 'success');
    return newTask;
  };

  // Update Task
  const updateTask = (id, fields) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, ...fields } : t))
    );
    showToast('Task updated successfully', 'success');
  };

  // Delete Task
  const deleteTask = (id) => {
    const task = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(t => t.id !== id));
    showToast(`Task "${task?.title || ''}" deleted`, 'info');
  };

  // Move Task (Kanban Drag & Drop)
  const moveTask = (taskId, newStatus, targetTaskId = null) => {
    const taskToMove = tasks.find(t => t.id === taskId);
    if (!taskToMove) return;

    const oldStatus = taskToMove.status;
    const isStatusChange = oldStatus !== newStatus;

    // Build updated task
    const updatedTask = {
      ...taskToMove,
      status: newStatus,
      activityHistory: isStatusChange
        ? [
            {
              id: 'act_' + Date.now(),
              text: `Status changed from ${oldStatus.replace('_', ' ')} to ${newStatus.replace('_', ' ')}`,
              timestamp: 'Just now'
            },
            ...(taskToMove.activityHistory || [])
          ]
        : taskToMove.activityHistory
    };

    setTasks(prevTasks => {
      // Remove moved task
      const remainingTasks = prevTasks.filter(t => t.id !== taskId);

      if (targetTaskId && targetTaskId !== taskId) {
        const targetIndex = remainingTasks.findIndex(t => t.id === targetTaskId);
        if (targetIndex !== -1) {
          const newTasks = [...remainingTasks];
          newTasks.splice(targetIndex, 0, updatedTask);
          return newTasks;
        }
      }

      // If no specific drop position or dragging to empty column, append
      return [...remainingTasks, updatedTask];
    });

    if (isStatusChange) {
      const statusLabels = {
        BACKLOG: 'Backlog',
        TODO: 'Todo',
        IN_PROGRESS: 'In Progress',
        REVIEW: 'Review',
        DONE: 'Done'
      };
      showToast(
        `Task moved to ${statusLabels[newStatus] || newStatus}! 🚀`,
        newStatus === 'DONE' ? 'success' : 'info'
      );
    }
  };

  // Toggle Subtask
  const toggleSubtask = (taskId, subtaskId) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          const updatedSubtasks = (task.subtasks || []).map(st =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          return { ...task, subtasks: updatedSubtasks };
        }
        return task;
      })
    );
  };

  // Add Subtask
  const addSubtask = (taskId, title) => {
    if (!title.trim()) return;
    const newSt = {
      id: 'st_' + Date.now(),
      title: title.trim(),
      completed: false
    };

    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            subtasks: [...(task.subtasks || []), newSt]
          };
        }
        return task;
      })
    );
  };

  // Delete Subtask
  const deleteSubtask = (taskId, subtaskId) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            subtasks: (task.subtasks || []).filter(st => st.id !== subtaskId)
          };
        }
        return task;
      })
    );
  };

  // Add Comment
  const addComment = (taskId, text) => {
    if (!text.trim() || !currentUser) return;
    const newComment = {
      id: 'c_' + Date.now(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      text: text.trim(),
      timestamp: 'Just now'
    };

    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            comments: [...(task.comments || []), newComment]
          };
        }
        return task;
      })
    );
    showToast('Comment added', 'success');
  };

  // Delete Comment
  const deleteComment = (taskId, commentId) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            comments: (task.comments || []).filter(c => c.id !== commentId)
          };
        }
        return task;
      })
    );
    showToast('Comment removed', 'info');
  };

  // Notifications
  const markNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // Calculate project completion %
  const getProjectProgress = (projectId) => {
    const projectTasks = tasks.filter(t => t.projectId === projectId);
    if (projectTasks.length === 0) return 0;
    const doneTasks = projectTasks.filter(t => t.status === 'DONE').length;
    return Math.round((doneTasks / projectTasks.length) * 100);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        notifications,
        createTask,
        updateTask,
        deleteTask,
        moveTask,
        toggleSubtask,
        addSubtask,
        deleteSubtask,
        addComment,
        deleteComment,
        markNotificationRead,
        markAllNotificationsRead,
        getProjectProgress,
        resetAllData: clearAllTaskFlowStorage
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
}
