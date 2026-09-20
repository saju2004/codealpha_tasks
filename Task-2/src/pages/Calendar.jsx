import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import TaskDetailsModal from '../components/tasks/TaskDetailsModal.jsx';
import Badge from '../components/common/Badge.jsx';
import { useTasks } from '../context/TaskContext.jsx';
import { isOverdue } from '../utils/dateUtils.js';

export default function Calendar() {
  const { tasks } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // September 2026
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Navigation
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  // Month info
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Map tasks by YYYY-MM-DD
  const tasksByDate = {};
  tasks.forEach((task) => {
    if (task.dueDate) {
      if (!tasksByDate[task.dueDate]) tasksByDate[task.dueDate] = [];
      tasksByDate[task.dueDate].push(task);
    }
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calendar cells
  const calendarCells = [];
  // Empty leading cells
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push({ empty: true, id: `empty-${i}` });
  }
  // Days of month
  const todayStr = new Date().toISOString().split('T')[0];

  for (let d = 1; d <= daysInMonth; d++) {
    const formattedDay = d < 10 ? `0${d}` : `${d}`;
    const formattedMonth = (month + 1) < 10 ? `0${month + 1}` : `${month + 1}`;
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    const dayTasks = tasksByDate[dateStr] || [];
    const isToday = dateStr === todayStr;

    calendarCells.push({
      empty: false,
      day: d,
      dateStr,
      isToday,
      tasks: dayTasks
    });
  }

  return (
    <div className="calendar-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, margin: 0 }}>
            Project Calendar
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
            Track deadlines, sprint schedules, and milestone delivery dates
          </p>
        </div>

        {/* Navigation Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={goToToday}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}
            className="interactive-btn"
          >
            Today
          </button>

          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <button
              onClick={prevMonth}
              style={{ padding: '6px 10px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <span style={{ fontSize: '0.925rem', fontWeight: 700, padding: '0 8px', minWidth: '150px', textAlign: 'center' }}>
              {monthName}
            </span>
            <button
              onClick={nextMonth}
              style={{ padding: '6px 10px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div
        className="card"
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--surface)',
          overflowX: 'auto'
        }}
      >
        {/* Days of week header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '8px', minWidth: '700px' }}>
          {weekDays.map(day => (
            <div
              key={day}
              style={{
                textAlign: 'center',
                padding: '6px 0',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase'
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', minWidth: '700px' }}>
          {calendarCells.map((cell, idx) => {
            if (cell.empty) {
              return (
                <div
                  key={cell.id}
                  style={{
                    minHeight: '105px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--surface-secondary)',
                    opacity: 0.3
                  }}
                />
              );
            }

            return (
              <div
                key={idx}
                style={{
                  minHeight: '105px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: cell.isToday ? 'var(--primary-light)' : 'var(--surface-secondary)',
                  border: cell.isToday ? '2px solid var(--primary)' : '1px solid var(--border)',
                  padding: '6px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: cell.isToday ? 800 : 600,
                      color: cell.isToday ? 'var(--primary)' : 'var(--text-primary)'
                    }}
                  >
                    {cell.day}
                  </span>
                  {cell.isToday && (
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>
                      Today
                    </span>
                  )}
                </div>

                {/* Tasks pills on this date */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '2px' }}>
                  {cell.tasks.map(task => {
                    const isLate = isOverdue(task.dueDate, task.status);
                    return (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTaskId(task.id)}
                        style={{
                          fontSize: '0.725rem',
                          fontWeight: 600,
                          padding: '3px 6px',
                          borderRadius: '4px',
                          backgroundColor: task.status === 'DONE' ? 'var(--success-bg)' : isLate ? 'var(--danger-bg)' : 'var(--surface)',
                          color: task.status === 'DONE' ? 'var(--success)' : isLate ? 'var(--danger)' : 'var(--text-primary)',
                          border: '1px solid var(--border)',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        className="interactive-btn"
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedTaskId && (
        <TaskDetailsModal
          taskId={selectedTaskId}
          isOpen={!!selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </div>
  );
}
