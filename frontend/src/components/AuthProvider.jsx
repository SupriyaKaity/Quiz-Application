// components/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const userStr = localStorage.getItem("currentUser");
      const loginTime = localStorage.getItem("loginTime");
      
      if (token && userStr && loginTime) {
        // Check if 24 hours have passed
        const twentyFourHours = 24 * 60 * 60 * 1000;
        const timeElapsed = Date.now() - parseInt(loginTime);
        
        if (timeElapsed >= twentyFourHours) {
          // Token expired
          logout();
        } else {
          setUser(JSON.parse(userStr));
        }
      }
      setLoading(false);
    };
    
    checkAuth();
    
    // Check every minute for expiry
    const interval = setInterval(checkAuth, 60000);
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loginTime");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};