// Date utilities for TaskFlow using native JavaScript Date APIs

export const formatDate = (dateString) => {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatShortDate = (dateString) => {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const isOverdue = (dateString, status) => {
  if (!dateString || status === 'DONE') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(dateString);
  targetDate.setHours(0, 0, 0, 0);
  return targetDate < today;
};

export const isDueSoon = (dateString, status) => {
  if (!dateString || status === 'DONE') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(dateString);
  targetDate.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 3;
};

export const isDueToday = (dateString) => {
  if (!dateString) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(dateString);
  targetDate.setHours(0, 0, 0, 0);
  return targetDate.getTime() === today.getTime();
};
