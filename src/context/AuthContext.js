import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved user data on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login user
  const login = (userData) => {
    // In a real app, you would validate credentials with a backend
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  // Register user
  const register = (userData) => {
    // In a real app, you would send this data to a backend
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('savedRecipes');
    localStorage.removeItem('groceryList');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};