# Task 1: SocialSphere — Modern Social Media Platform

A complete, production-quality social media web application built with **React.js, JavaScript, JSX, and CSS only** (strictly zero TypeScript). Designed for the **CodeAlpha Internship**.

---

## 📸 Key Features

### 1. Feed & Engagement
- **Interactive Story Reel**: Horizontal avatar reel with gradient unread glow rings.
- **Fullscreen Story Viewer**: 5-second auto-progress bar timer, tap & hold to pause, next/prev navigation, and quick reply input.
- **Heart Bounce Micro-Interaction**: Like button with smooth bounce animation and real-time counter updates.
- **Double-Tap Floating Heart**: Double-clicking or double-tapping any post image produces a large floating heart pop animation (`.floating-heart`).
- **Instant Comment System**: Post comments immediately without page reload, with animated entry, comment like toggles, and author deletion.
- **Share Modal**: Copy direct post URL to clipboard (with toast notification), repost to feed, or forward via DM.
- **Saved Collection**: Save/unsave posts into the user's private collection under their Profile.
- **Follow System**: Live follow/unfollow updates follower and following counts across the platform.

### 2. Search & Explore
- **Live Search**: Autocomplete search matching creators, post descriptions, and `#hashtags`.
- **Search History**: Recent searches saved as clickable chips with a "Clear" button.
- **Category Filter Pills**: Quick filter by *All*, *Design*, *Tech*, *Photography*, *Code*, and *Lifestyle*.
- **Masonry Grid**: Hover overlay displays live likes & comments; clicking opens a full post detail view modal.

### 3. Direct Messaging (Chat)
- **Split-Pane Layout**: Active conversation list with online status indicators on the left, active chat window on the right.
- **Automated Response Simulation**: Sending a message triggers a realistic typing indicator after ~700ms followed by an intelligent contextual reply at ~2100ms.
- **Mobile Responsive**: Smoothly shifts between conversation list and chat pane.

### 4. User Profiles
- **Profile Header**: Cover banner, avatar, verified badge, bio, location, website, and joined date.
- **Stats Dashboard**: Dynamic metrics for Posts, Followers, and Following.
- **Tabbed Collections**: Seamlessly switch between *Posts*, *Media*, and *Saved* tabs.
- **Edit Profile**: Modal allowing customization of full name, bio, location, website, and photo upload.
- **Creator Profiles**: Dynamic route (`/profile/:username`) to inspect other members' profiles.

### 5. Theme & Settings
- **Dark / Light Mode**: Smooth theme transitions powered by CSS variables persisted in LocalStorage.
- **Preferences**: Push notifications, audio chime toggles, and private account switches.
- **Reset Demo Data**: One-click reset to restore the original interactive mock dataset.

### 6. Authentication & Demo Suite
- **Login & Register**: Complete validation.
- **1-Click Demo Logins**: Instant login buttons for **Sarah Jenkins**, **Alex Rivera**, and **Marcus Vance** for effortless presentation and review.

---

## 🛠️ Technology Stack

- **Framework**: React.js (v19)
- **Bundler**: Vite
- **Routing**: React Router (v7)
- **Icons**: Lucide React
- **State Management**: React Hooks & Context API (`AuthContext`, `PostContext`, `ThemeContext`, `MessageContext`, `ToastContext`)
- **Persistence**: LocalStorage
- **Styling**: Vanilla CSS with CSS Custom Properties and Keyframe Animations
- **TypeScript**: **0%** (Pure JS + JSX)

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Production build verification
npm run build
```

The application runs at **`http://localhost:5173/`**.

---

*CodeAlpha Internship — Task 1: Social Media Platform*
