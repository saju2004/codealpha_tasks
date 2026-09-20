# CodeAlpha Internship Tasks 🚀

Welcome to my **CodeAlpha Web Development Internship** task repository! This repository showcases the projects completed during the internship program, built using modern web development standards and best practices.

---

## 📌 Tasks Overview

| # | Task Name | Description | Tech Stack | Status | Folder Link |
|---|---|---|---|---|---|
| **01** | **SocialSphere** | Production-quality Social Media Platform with real-time style feed, stories, micro-interactions, dark mode, and direct messaging. | React.js, JavaScript (JSX), CSS3, Context API, React Router, LocalStorage | **Completed** ✅ | [View Project](./Task-1-Social-Media-Platform) |
| **02** | **TaskFlow** | Smart SaaS Project Management Dashboard with native HTML5 drag-and-drop Kanban board, milestone tracking, deadline calendar, team directory, and visual analytics. | React.js, JavaScript (JSX), CSS3, Context API, React Router, LocalStorage, Lucide Icons | **Completed** ✅ | [View Project](./Task-2) |
| **03** | **Task 3** | Upcoming Internship Assignment 3 | *To be announced* | ⏳ *Pending* | [View Folder](./Task-3) |

---

## 🌟 Task 1: SocialSphere — Modern Social Media Platform

A modern, responsive, and visually stunning social media web application featuring:

- **Original Visual Identity**: Inspired by Instagram, Threads, and Twitter/X with a signature indigo-violet gradient aesthetic.
- **Home Feed**: Story reel with fullscreen timer viewer, create post bar, and feed filters (*For You*, *Following*, *Trending*).
- **Smooth Micro-Interactions**: Heart bounce like animations, double-tap floating hearts, smooth comment insertion, and toast notifications.
- **Interactive Explore Page**: Live search for creators, posts, and hashtags with recent search history and hoverable media masonry grid.
- **Direct Messaging**: Split-pane messaging interface with realistic typing indicators and automated contextual simulation replies.
- **Dark & Light Mode**: Seamless theme switching persisted in LocalStorage.
- **Multi-User Demo Suite**: 1-click test account switching (*Sarah Jenkins*, *Alex Rivera*, *Marcus Vance*) for effortless presentations.
- **Strictly Pure React**: 100% JavaScript + JSX + CSS (zero TypeScript).

👉 **[Read full Task 1 Documentation & Setup Guide](./Task-1-Social-Media-Platform/README.md)**

---

## 🌟 Task 2: TaskFlow — Smart Project Management

A full-featured, production-grade Project Management SaaS application featuring:

- **Executive Dashboard**: Real-time project overview, active metric counters, progress cards, and upcoming deadline list.
- **Kanban Board with Native Drag-and-Drop**: 5 horizontal workflow stages (*Backlog*, *Todo*, *In Progress*, *Review*, *Done*) with fluid HTML5 drag & drop and instant LocalStorage synchronization.
- **Task Lifecycle & Subtasks**: Complete modal editors, priority flags (*Low*, *Medium*, *High*, *Urgent*), subtask checklist with dynamic progress bar, and audit activity trail.
- **Live Comments**: Instant comment streams on every task with author badges and relative timestamps.
- **Interactive Project Calendar**: Month view displaying task due date badges with click-to-view modal preview.
- **Team Management**: Team directory with role badges, avatar cards, and active task load metrics.
- **Visual Analytics & Reports**: CSS-powered status breakdown charts, project completion percentages, and weekly activity tracker.
- **Global Search & Quick Add**: Instant header search across tasks, projects, and team members; 1-click quick creation menus.
- **Dark / Light Mode**: Seamless theme toggling persisted across sessions.
- **Strictly Pure React**: 100% JavaScript + JSX + CSS (zero TypeScript).

👉 **[Read full Task 2 Documentation & Setup Guide](./Task-2/README.md)**

---

## 🛠️ Repository Structure

```
codealpha_tasks/
│
├── README.md                                 # Master Portfolio Overview
├── .gitignore                                # Global ignores (node_modules, build caches)
│
├── Task-1-Social-Media-Platform/             # Task 1: SocialSphere Web Application
│   ├── public/                               # Favicons and static assets
│   ├── src/
│   │   ├── components/                       # Modular UI components
│   │   ├── context/                          # Auth, Theme, Post, and Message Contexts
│   │   ├── data/                             # Realistic interactive mock data
│   │   ├── pages/                            # React Router page views
│   │   ├── styles/                           # CSS design tokens & animations
│   │   ├── App.jsx                           # Application router
│   │   └── main.jsx                          # Root entrypoint
│   ├── index.html                            # HTML5 root with SEO tags
│   ├── package.json                          # Dependencies & scripts
│   ├── vite.config.js                        # Vite bundler configuration (Port 5173)
│   └── README.md                             # Detailed Task 1 documentation
│
├── Task-2/                                   # Task 2: TaskFlow Project Management Tool
│   ├── public/                               # Favicons and static assets
│   ├── src/
│   │   ├── components/                       # Kanban, Dashboard, Tasks, Team & Common UI
│   │   ├── context/                          # Task, Project, Theme, and Toast Contexts
│   │   ├── data/                             # Seed projects, tasks, users, notifications
│   │   ├── pages/                            # Dashboard, Board, MyTasks, Calendar, Team, Reports
│   │   ├── styles/                           # CSS design system & animation keyframes
│   │   ├── utils/                            # Date helpers & safe LocalStorage handlers
│   │   ├── App.jsx                           # Application router & providers
│   │   └── main.jsx                          # Root entrypoint
│   ├── index.html                            # HTML5 root with SEO tags
│   ├── package.json                          # Dependencies: react, react-dom, react-router-dom, lucide-react
│   ├── vite.config.js                        # Vite bundler configuration (Port 5174)
│   └── README.md                             # Detailed Task 2 documentation
│
└── Task-3/                                   # Task 3 (Ready for upcoming assignment)
    └── README.md
```

---

## 🚀 Getting Started

### Running Task 1 (SocialSphere) Locally

```bash
cd Task-1-Social-Media-Platform
npm install
npm run dev
# Running on http://localhost:5173/
```

### Running Task 2 (TaskFlow) Locally

```bash
cd Task-2
npm install
npm run dev
# Running on http://localhost:5174/
```

---

## 👨‍💻 Intern Details

- **Intern Name**: Sajith
- **GitHub**: [@saju2004](https://github.com/saju2004)
- **Repository**: [codealpha_tasks](https://github.com/saju2004/codealpha_tasks)
- **Organization**: CodeAlpha

---
*Developed with ❤️ as part of the CodeAlpha Internship Program.*
