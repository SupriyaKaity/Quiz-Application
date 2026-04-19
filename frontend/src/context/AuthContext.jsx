import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token validity on app load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("currentUser");
      const loginTime = localStorage.getItem("loginTime");

      if (token && userData && loginTime) {
        // Check if 24 hours have passed
        const twentyFourHours = 24 * 60 * 60 * 1000;
        const timeElapsed = Date.now() - parseInt(loginTime);

        if (timeElapsed >= twentyFourHours) {
          // Token expired
          logout();
        } else {
          try {
            // Check if token is still valid by decoding it
            const payload = JSON.parse(atob(token.split(".")[1]));
            const expiryTime = payload.exp * 1000;

            if (Date.now() >= expiryTime) {
              logout();
            } else {
              setUser(JSON.parse(userData));
              setIsAuthenticated(true);
            }
          } catch (error) {
            logout();
          }
        }
      }
      setLoading(false);
    };

    checkAuth();

    // Check every minute for expiry
    const interval = setInterval(checkAuth, 60000);
    return () => clearInterval(interval);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    localStorage.setItem("loginTime", Date.now().toString());
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loginTime");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
