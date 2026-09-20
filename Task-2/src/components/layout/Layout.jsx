import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import MobileNavigation from './MobileNavigation.jsx';
import Toast from '../common/Toast.jsx';
import TaskModal from '../tasks/TaskModal.jsx';
import ProjectModal from '../projects/ProjectModal.jsx';
import AddMemberModal from '../team/AddMemberModal.jsx';

export default function Layout() {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [memberModalOpen, setMemberModalOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Desktop Left Sidebar */}
      <Sidebar onOpenCreateTask={() => setTaskModalOpen(true)} />

      {/* Main Content Pane */}
      <div className="main-wrapper">
        {/* Mobile Top Header */}
        <MobileNavigation onOpenCreateTask={() => setTaskModalOpen(true)} />

        {/* Desktop Top Header */}
        <div className="desktop-header-container">
          <Header
            onOpenCreateTask={() => setTaskModalOpen(true)}
            onOpenCreateProject={() => setProjectModalOpen(true)}
            onOpenAddMember={() => setMemberModalOpen(true)}
          />
        </div>

        {/* Page View */}
        <main className="page-content">
          <Outlet
            context={{
              onOpenCreateTask: () => setTaskModalOpen(true),
              onOpenCreateProject: () => setProjectModalOpen(true),
              onOpenAddMember: () => setMemberModalOpen(true)
            }}
          />
        </main>
      </div>

      {/* Global Modals */}
      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
      />

      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />

      <AddMemberModal
        isOpen={memberModalOpen}
        onClose={() => setMemberModalOpen(false)}
      />

      {/* Global Toast Stack */}
      <Toast />
    </div>
  );
}
