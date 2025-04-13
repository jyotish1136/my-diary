import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeProvider";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { userAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#profile-menu")) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md p-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/home"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          My Notes
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/create-post"
            className="text-gray-700 dark:text-white hover:text-blue-500 transition"
          >
            Add Note
          </Link>

          {!userAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 dark:text-white hover:text-blue-500 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-700 dark:text-white hover:text-blue-500 transition"
              >
                Sign up
              </Link>
            </>
          ) : (
            <div className="relative" id="profile-menu">
              <button
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="flex items-center text-gray-700 dark:text-white hover:text-blue-500 transition"
              >
                <MdAccountCircle className="h-8 w-8" />
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg z-50">
                  <Link
                    to="/user-profile"
                    onClick={() => setProfileMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-xl"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setProfileMenuOpen(false);
                      navigate("/");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-xl"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-white hover:text-yellow-400 transition"
          >
            {theme === "dark" ? (
              <FaSun className="w-6 h-6" />
            ) : (
              <FaMoon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 dark:text-white text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div className="relative md:hidden">
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 shadow-xl rounded-lg z-50">
            <div className="flex flex-col px-5 py-4 space-y-3">
              <Link
                to="/create-post"
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 dark:text-white hover:text-blue-500 transition font-medium"
              >
                ➕ Add Note
              </Link>

              {!userAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-800 dark:text-white hover:text-blue-500 transition font-medium"
                  >
                    🔑 Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-800 dark:text-white hover:text-blue-500 transition font-medium"
                  >
                    📝 Sign up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/user-profile"
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-800 dark:text-white hover:text-blue-500 transition font-medium"
                  >
                    👤 Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                      navigate("/");
                    }}
                    className="text-left text-red-600 hover:text-red-500 transition font-medium"
                  >
                    🚪 Logout
                  </button>
                </>
              )}

              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-gray-800 dark:text-white hover:text-yellow-400 transition font-medium"
              >
                {theme === "dark" ? (
                  <>
                    <FaSun className="w-5 h-5" /> <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <FaMoon className="w-5 h-5" /> <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
