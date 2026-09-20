# TaskFlow — Smart Project Management 📋🚀

> **Task 2 — CodeAlpha Web Development Internship Project**  
> A high-performance, modern SaaS Project Management Dashboard built with **pure React.js, JavaScript, JSX, and CSS**.

---

## 🌟 Overview

**TaskFlow** is a comprehensive, production-grade project management application designed for modern high-velocity teams. Inspired by tools like Linear, Asana, and Jira, TaskFlow provides an intuitive and responsive interface featuring a native HTML5 drag-and-drop Kanban board, milestone tracking, deadline calendar, team management, and visual analytics—all persisted locally without any backend requirements.

---

## ✨ Key Features

### 📊 1. Executive Dashboard
- **Greeting & Overview**: Dynamic time-based greeting (*"Good morning, Alex"*) with project health status.
- **Key Metrics**: Interactive stat cards tracking *Total Projects*, *Active Tasks*, *Completed Tasks*, and *Overdue Tasks* with growth trend indicators.
- **Project Progress Carousel**: Detailed overview cards featuring progress bars, task counts, team avatars, and status badges.
- **Upcoming Deadlines**: Quick-glance list of imminent task due dates with priority tagging.

### 📋 2. Native Drag-and-Drop Kanban Board
- **5 Kanban Workflow Stages**:
  - `BACKLOG`: Tasks planned or queued for future sprints.
  - `TODO`: Ready for development.
  - `IN PROGRESS`: Currently active work.
  - `REVIEW`: Code review or QA verification.
  - `DONE`: Successfully finished tasks.
- **Native HTML5 Drag & Drop**: Zero third-party drag-and-drop libraries. Smooth visual elevation, drop targets highlighting, and instant LocalStorage synchronization.
- **Comprehensive Filtering**: Real-time filtering by priority (*Low*, *Medium*, *High*, *Urgent*), assignee, labels, and text search with a one-click *"Clear Filters"* button.

### 🎯 3. Rich Task & Project Lifecycle
- **Create & Edit Modals**: Full modal forms supporting task title, detailed description, project association, assignee, priority level, initial status, due date, and multi-tag labels (*Frontend*, *Backend*, *UI/UX*, *Bug*, *Feature*, *Testing*, *Documentation*).
- **Interactive Subtasks**: Subtask checklists with automatic completion percentage calculation and visual progress indicators.
- **Real-Time Comment Stream**: Task comments with author avatars, timestamps, and immediate optimistic updates.
- **Activity Audit Trail**: Automatic tracking of status updates and assignments.
- **Confirmation Modals**: Safeguarded deletion with confirmation dialogs.

### 📅 4. Interactive Project Calendar
- **Monthly Grid View**: Dynamic JavaScript Date-based month viewer with previous/next month navigation and "Today" button.
- **Due Date Markers**: Color-coded task chips displayed directly on their due dates.
- **Task Preview**: Clicking any calendar task directly opens its details modal.

### 👥 5. Team Management
- **Team Directory**: Visual cards for team members showing job roles (*Project Manager*, *UI/UX Designer*, *Frontend Developer*, *Backend Developer*), emails, and active assigned task counts.
- **Add Team Member**: Quick-invite modal to expand the team directory with automatic LocalStorage persistence.

### 📈 6. Visual Reports & Analytics
- **Project Analytics**: Real-time calculated completion rates and active task distributions.
- **Status Breakdown**: Visual status representation across all 5 workflow stages.
- **Weekly Activity Meter**: Interactive visual progress charts highlighting team throughput.

### 🔍 7. Global Search & Notifications
- **Instant Search**: Top-bar live search across all tasks, projects, and team members with classified result dropdowns.
- **Notification Dropdown**: Status notifications for milestone achievements, assignments, and approaching deadlines with an unread badge indicator.
- **Quick Add Menu**: One-click top navigation button to quickly create a task, project, or invite a team member.

### 🌓 8. Theme System & Polish
- **Dark & Light Mode**: Comprehensive CSS variable switching covering sidebars, headers, cards, modals, and charts. Saved in LocalStorage.
- **Micro-Animations**: Smooth keyframe transitions, card hover elevation, toast slides, and modal popups.
- **Mobile Responsive**: Adaptive sidebar collapsing, mobile top header, and bottom navigation bar for small screens.

---

## 🛠️ Technology Stack & Compliance

| Requirement | Implementation | Status |
|---|---|---|
| **Core Framework** | React.js 19 | ✅ Pure React |
| **Language** | JavaScript (ES6+) & JSX only | ✅ Strict Non-TypeScript |
| **Styling** | Vanilla CSS3 (Custom Design System, Flexbox, Grid) | ✅ Zero Tailwind / Zero CSS-in-JS |
| **Routing** | `react-router-dom` v7 | ✅ React Router |
| **Icons** | `lucide-react` | ✅ Uniform Iconography |
| **State & Persistence** | React Context API + LocalStorage | ✅ Fully Functional Offline |
| **Drag & Drop** | Native HTML5 Drag and Drop API | ✅ Zero Dependency Overhead |

> **Strict Non-TypeScript Compliance**: TaskFlow contains **zero** `.ts` or `.tsx` files, type annotations, interfaces, types, `React.FC`, or TypeScript configurations. Every component is `.jsx` and every utility is `.js`.

---

## 📂 Project Architecture

```
Task-2/
├── index.html                    # Single-page entrypoint with SEO meta tags
├── package.json                  # Dependencies: react, react-dom, react-router-dom, lucide-react
├── vite.config.js                # Vite configuration (port 5174)
│
├── public/
│   └── favicon.svg               # TaskFlow branded SVG favicon
│
└── src/
    ├── main.jsx                  # Application root bootstrap with StrictMode
    ├── App.jsx                   # Router setup & global context hierarchy
    │
    ├── components/
    │   ├── common/               # Avatar, Badge, Button, ConfirmDialog, EmptyState, Modal, Toast
    │   ├── dashboard/            # StatCard, ProjectCard, ProgressBar
    │   ├── kanban/               # KanbanBoard, KanbanColumn, TaskCard
    │   ├── layout/               # Header, Sidebar, MobileNavigation, Layout
    │   ├── projects/             # ProjectModal
    │   ├── tasks/                # TaskModal, TaskDetailsModal, TaskFilters, SubtaskList
    │   └── team/                 # AddMemberModal
    │
    ├── context/
    │   ├── ProjectContext.jsx    # Projects & team member management
    │   ├── TaskContext.jsx       # Task CRUD, drag-and-drop status, subtasks, comments
    │   ├── ThemeContext.jsx      # Light / Dark mode persistence
    │   └── ToastContext.jsx      # Dynamic toast notification alerts
    │
    ├── data/
    │   ├── projects.js           # Realistic seed projects
    │   ├── tasks.js              # Comprehensive seed tasks across 5 stages
    │   ├── users.js              # Team member directory
    │   └── notifications.js      # Realistic alert notifications
    │
    ├── pages/
    │   ├── Dashboard.jsx         # Executive overview & statistics
    │   ├── Projects.jsx          # Project directory & creation
    │   ├── ProjectDetails.jsx    # Project board, task list & activities
    │   ├── MyTasks.jsx           # Personalized task view (Today, Upcoming, Done)
    │   ├── Calendar.jsx          # Month view with task due date pins
    │   ├── Team.jsx              # Member cards & task load
    │   ├── Reports.jsx           # Completion analytics & charts
    │   └── Settings.jsx          # User preferences & LocalStorage reset
    │
    ├── styles/
    │   ├── variables.css         # CSS design tokens, HSL colors, dark mode overrides
    │   ├── animations.css        # Keyframe animations, drag lift, toast slide
    │   ├── global.css            # Base typography, reset, scrollbars
    │   └── responsive.css        # Mobile breakpoint layouts
    │
    └── utils/
        ├── dateUtils.js          # Formatters, relative days, overdue checkers
        └── storage.js            # Safe LocalStorage serialization & error handling
```

---

## 🚀 Installation & Running Locally

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Navigate to Project Directory
```bash
cd Task-2
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```

The application will start on:  
👉 **`http://localhost:5174/`**

### 5. Build for Production
```bash
npm run build
```

---

## ⌨️ Quick Tips & Demo Interactions

1. **Kanban Drag-and-Drop**: Click and drag any task card across columns (*e.g., drag from `TODO` to `IN PROGRESS` or `DONE`*). Notice the status badge and project progress update immediately.
2. **Subtasks & Comments**: Click any task card to open the Task Details modal. Add new subtasks, check existing ones, or post comments.
3. **Quick Add**: Use the top-right `+ Add` button in the header to quickly create a Task, Project, or Team Member from any screen.
4. **Theme Switcher**: Click the Sun/Moon toggle at the bottom of the sidebar to switch between Light and Dark mode.
5. **Instant Reset**: To restore initial mock data, navigate to **Settings** and click *"Reset All Data"*.

---

*Developed by Sajith as part of the CodeAlpha Internship Program.*
