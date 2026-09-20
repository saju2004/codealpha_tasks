// Safe LocalStorage helpers for TaskFlow
export const loadStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return fallback;
  }
};

export const saveStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export const clearAllTaskFlowStorage = () => {
  localStorage.removeItem('taskflow_tasks');
  localStorage.removeItem('taskflow_projects');
  localStorage.removeItem('taskflow_users');
  localStorage.removeItem('taskflow_notifications');
  localStorage.removeItem('taskflow_theme');
  window.location.reload();
};
