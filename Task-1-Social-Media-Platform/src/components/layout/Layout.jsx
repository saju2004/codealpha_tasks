import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import RightSidebar from './RightSidebar.jsx';
import Navbar from './Navbar.jsx';
import BottomNav from './BottomNav.jsx';
import Toast from '../common/Toast.jsx';
import CreatePostModal from '../posts/CreatePostModal.jsx';

export default function Layout() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const location = useLocation();

  const isMessagesPage = location.pathname.startsWith('/messages');
  const isExplorePage = location.pathname.startsWith('/explore');
  const isProfilePage = location.pathname.startsWith('/profile');
  const isNotificationsPage = location.pathname.startsWith('/notifications');

  // Some pages like Messages look best with wider viewport allocation
  const hideRightSidebar = isMessagesPage;

  return (
    <div className="app-container">
      {/* Mobile Top Navbar */}
      <Navbar />

      {/* Desktop Left Sidebar */}
      <Sidebar onOpenCreateModal={() => setCreateModalOpen(true)} />

      {/* Main Content Area */}
      <div className="main-content-layout">
        <main
          className="center-feed-column"
          style={{
            maxWidth: isMessagesPage ? '980px' : isExplorePage ? '860px' : isProfilePage ? '780px' : 'var(--max-feed-width)'
          }}
        >
          <Outlet context={{ onOpenCreateModal: () => setCreateModalOpen(true) }} />
        </main>

        {/* Desktop Right Sidebar */}
        {!hideRightSidebar && <RightSidebar />}
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav onOpenCreateModal={() => setCreateModalOpen(true)} />

      {/* Global Create Post Modal */}
      <CreatePostModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />

      {/* Global Toast Notifications */}
      <Toast />
    </div>
  );
}
