import { createContext, useContext, useState, useEffect } from 'react';
import { initialProjects } from '../data/projects.js';
import { initialUsers, currentUser as defaultUser } from '../data/users.js';
import { loadStorage, saveStorage } from '../utils/storage.js';
import { useToast } from './ToastContext.jsx';

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const { showToast } = useToast();

  const [projects, setProjects] = useState(() =>
    loadStorage('taskflow_projects', initialProjects)
  );

  const [users, setUsers] = useState(() =>
    loadStorage('taskflow_users', initialUsers)
  );

  const [currentUser, setCurrentUser] = useState(defaultUser);

  useEffect(() => {
    saveStorage('taskflow_projects', projects);
  }, [projects]);

  useEffect(() => {
    saveStorage('taskflow_users', users);
  }, [users]);

  const getProject = (id) => projects.find(p => p.id === id) || null;
  const getUser = (id) => users.find(u => u.id === id) || null;

  const createProject = (projectData) => {
    const newProject = {
      id: 'proj_' + Date.now(),
      status: 'active',
      members: ['user_1'],
      ...projectData
    };
    setProjects(prev => [newProject, ...prev]);
    showToast(`Project "${newProject.name}" created! 📁`, 'success');
    return newProject;
  };

  const updateProject = (id, fields) => {
    setProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, ...fields } : p))
    );
    showToast('Project updated successfully', 'success');
  };

  const deleteProject = (id) => {
    const project = getProject(id);
    setProjects(prev => prev.filter(p => p.id !== id));
    showToast(`Project "${project?.name || ''}" removed`, 'info');
  };

  const addUser = (userData) => {
    const newUser = {
      id: 'user_' + Date.now(),
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80`,
      status: 'active',
      assignedTasksCount: 0,
      ...userData
    };
    setUsers(prev => [...prev, newUser]);
    showToast(`Team member ${newUser.name} added! 👤`, 'success');
    return newUser;
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        users,
        currentUser,
        getProject,
        getUser,
        createProject,
        updateProject,
        deleteProject,
        addUser
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjects must be used within ProjectProvider');
  return context;
}
