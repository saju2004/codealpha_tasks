import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { ProjectProvider } from './context/ProjectContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';

import Layout from './components/layout/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetails from './pages/ProjectDetails.jsx';
import MyTasks from './pages/MyTasks.jsx';
import Calendar from './pages/Calendar.jsx';
import Team from './pages/Team.jsx';
import Reports from './pages/Reports.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ProjectProvider>
          <TaskProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="tasks" element={<MyTasks />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="projects/:id" element={<ProjectDetails />} />
                  <Route path="calendar" element={<Calendar />} />
                  <Route path="team" element={<Team />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TaskProvider>
        </ProjectProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
