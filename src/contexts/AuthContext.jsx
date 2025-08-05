import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call - replace with actual API call
      // In a real application, you would send email and password to your backend
      // and receive a token or user data in response.
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

      if (email === 'test@example.com' && password === 'password') {
        const mockUser = {
          id: 1,
          name: 'Test User',
          email: email,
          avatar: null
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return { success: true };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call - replace with actual API call
      // In a real application, you would send userData to your backend
      // and receive a confirmation or user data in response.
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

      // For simplicity, directly log in the user after successful registration
      const mockUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        avatar: null
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

