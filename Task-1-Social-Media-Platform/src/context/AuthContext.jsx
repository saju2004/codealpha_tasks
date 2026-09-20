import { createContext, useContext, useState, useEffect } from 'react';
import { currentUser as defaultUser, mockUsers as initialMockUsers } from '../data/users.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('socialsphere_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse users from localStorage', e);
      }
    }
    return initialMockUsers;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('socialsphere_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse current user from localStorage', e);
      }
    }
    return defaultUser;
  });

  // Sync users to localStorage
  useEffect(() => {
    localStorage.setItem('socialsphere_users', JSON.stringify(users));
  }, [users]);

  // Sync currentUser to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('socialsphere_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('socialsphere_current_user');
    }
  }, [currentUser]);

  const login = (email, password) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      return { success: true, user: found };
    }
    // For demo purposes, allow demo login even if email isn't in mock data
    const genericUser = {
      id: 'user_' + Date.now(),
      name: email.split('@')[0],
      username: email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, ''),
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      bio: 'New explorer on SocialSphere ✨',
      location: 'Earth',
      website: '',
      joined: 'Recently',
      verified: false,
      postsCount: 0,
      followersCount: 0,
      followingCount: 0,
      following: [],
      savedPostIds: []
    };
    setUsers(prev => [genericUser, ...prev]);
    setCurrentUser(genericUser);
    return { success: true, user: genericUser };
  };

  const loginAs = (userId) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      return { success: true, user: found };
    }
    return { success: false, error: 'User not found' };
  };

  const register = ({ name, username, email }) => {
    const cleanUsername = username.toLowerCase().replace(/[^a-z0-9_]/g, '');
    const newUser = {
      id: 'user_' + Date.now(),
      name,
      username: cleanUsername,
      email,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=200&auto=format&fit=crop&q=80`,
      cover: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80',
      bio: 'Excited to connect with creators and developers on SocialSphere 🚀',
      location: 'Global',
      website: '',
      joined: 'Just now',
      verified: false,
      postsCount: 0,
      followersCount: 0,
      followingCount: 0,
      following: [],
      savedPostIds: []
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
  };

  const getUser = (identifier) => {
    return (
      users.find(
        u => u.id === identifier || u.username.toLowerCase() === identifier.toLowerCase()
      ) || null
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        isAuthenticated: !!currentUser,
        login,
        loginAs,
        register,
        logout,
        updateProfile,
        getUser,
        setUsers,
        setCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
