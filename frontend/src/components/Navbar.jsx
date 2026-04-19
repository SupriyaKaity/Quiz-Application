import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { navbarStyles } from "../assets/dummyStyles";
import { Award, LogIn, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ logoSrc }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // Check if exam is active (you may need to pass this as prop or use context)
  const [isExamActive, setIsExamActive] = useState(false);

  // Listen for exam start/end events
  useEffect(() => {
    const handleExamStart = () => setIsExamActive(true);
    const handleExamEnd = () => setIsExamActive(false);

    window.addEventListener("examStart", handleExamStart);
    window.addEventListener("examEnd", handleExamEnd);

    return () => {
      window.removeEventListener("examStart", handleExamStart);
      window.removeEventListener("examEnd", handleExamEnd);
    };
  }, []);

  // Auto logout after 24 hours
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const loginTime = localStorage.getItem("loginTime");

      if (token && loginTime) {
        const twentyFourHours = 24 * 60 * 60 * 1000;
        const timeElapsed = Date.now() - parseInt(loginTime);

        if (timeElapsed >= twentyFourHours) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("token");
          localStorage.removeItem("currentUser");
          localStorage.removeItem("loginTime");
          window.location.href = "/login";
        }
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  // Don't show navbar during exam
  if (isExamActive) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 shadow-2xl py-3 sm:py-4 px-4 sm:px-6 lg:px-10">
      <div
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 15c-12.5 0-22.5 10-22.5 22.5h10c0-7 5.5-12.5 12.5-12.5s12.5 5.5 12.5 12.5c0 5-3 7.5-7.5 10-4.5 2.5-7.5 7.5-7.5 12.5v5h10v-5c0-2.5 1.5-4 5-5.5 5.5-2.5 10-6.5 10-12 0-12.5-10-22.5-22.5-22.5zm0 55c-2.75 0-5 2.25-5 5s2.25 5 5 5 5-2.25 5-5-2.25-5-5-5z' fill='%23646464'/%3E%3C/svg%3E")`,
        }}
        className="absolute inset-0 opacity-10 pointer-events-none hidden sm:block"
      ></div>

      <div className="hidden md:block absolute top-10 left-1/4 w-36 h-36 sm:w-40 sm:h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float-slow"></div>
      <div className="hidden lg:block absolute bottom-5 right-20 w-28 h-28 lg:w-32 lg:h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float-slower"></div>
      <div className="hidden md:block absolute top-1/3 left-20 w-20 h-20 md:w-24 md:h-24 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float-slowest"></div>

      <div className="max-w-6xl mx-auto flex items-center justify-between relative z-10">
        {/* Logo - Click to go home */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => {
              console.log("Logo clicked - navigating to home");
              window.location.href = "/";
            }}
            className="inline-flex items-center p-0 bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transform transition-transform duration-200 cursor-pointer"
          >
            <div className="relative bg-linear-to-br from-blue-400 to-purple-600 p-0.5 rounded-full">
              <div className="bg-linear-to-b from-blue-900 to-purple-900 p-1 rounded-full">
                <img
                  src={
                    logoSrc ||
                    "https://img.freepik.com/premium-vector/quiz-sign-flat-purple-quiz-time-quiz-circle-vector-icon_399089-8630.jpg"
                  }
                  alt="QuizMaster logo"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-purple-300"
                />
              </div>
            </div>
          </button>
        </div>

        <div className="flex-1 flex justify-center px-3">
          <div className="bg-linear-to-r from-blue-600/25 via-purple-600/25 to-indigo-600/25 xl:ml-40 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/10 shadow-md max-w-full">
            <h1 className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold font-[pacifico] text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 text-center truncate">
              Stranger Quiz Application
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center cursor-pointer shrink-0 space-x-3">
          <div className="hidden sm:block w-2"></div>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/result"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-linear-to-r from-emerald-500 to-green-500 text-white text-sm font-medium shadow-md cursor-pointer transform transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
              >
                <Award className="h-4 w-4 shrink-0" />
                My Result
              </NavLink>
              <button
                onClick={handleLogout}
                className="inline-flex cursor-pointer items-center gap-2 px-3 py-2 rounded-full bg-linear-to-r from-red-500 to-pink-500 text-white text-sm font-medium shadow-md transform transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="inline-flex cursor-pointer items-center gap-2 px-3 py-2 rounded-full bg-linear-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium shadow-md transform transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
            >
              <LogIn className="h-4 w-4 shrink-0" />
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="inline-flex items-center justify-center p-2 rounded-full bg-white/90 shadow-sm hover:scale-105 transform transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="absolute right-4 top-full mt-3 w-48 bg-white rounded-lg shadow-lg border z-50 overflow-hidden md:hidden">
          <ul className="divide-y">
            {isAuthenticated && (
              <li>
                <NavLink
                  to="/result"
                  className="w-full text-left px-4 py-3 flex items-center gap-2 text-sm hover:bg-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  <Award className="h-4 w-4" />
                  My Result
                </NavLink>
              </li>
            )}
            {isAuthenticated ? (
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 flex items-center gap-2 text-sm hover:bg-gray-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className="w-full text-left px-4 py-3 flex items-center gap-2 text-sm hover:bg-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}

      <style>{`
        @keyframes float-slow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-slower {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-slowest {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 9s ease-in-out infinite; }
        .animate-float-slowest { animation: float-slowest 11s ease-in-out infinite; }
      `}</style>
    </nav>
  );
};

export default Navbar;
