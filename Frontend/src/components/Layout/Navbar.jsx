import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const linkStyle = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-300
     ${isActive ? "text-indigo-400" : "text-slate-300 hover:text-white"}`;

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
        >
          BlogApp
        </NavLink>

        {/* Desktop Navbar */}
        {!loading && (
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <NavLink to="/write" className={linkStyle}>Write</NavLink>
                <NavLink to="/myblogs" className={linkStyle}>My Blogs</NavLink>

                <NavLink
                  to="/profile"
                  className="flex items-center gap-2 bg-slate-800 px-4 py-1.5 rounded-full hover:bg-slate-700 transition"
                >
                  👤 {user.username}
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkStyle}>
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="bg-indigo-600 px-5 py-2 rounded-xl text-white font-semibold hover:bg-indigo-500 transition"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        )}

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-3xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 right-0 w-72 h-[calc(100vh-4rem)]
        bg-slate-900 border-l border-slate-800 p-6 flex flex-col gap-6
        transform transition-transform duration-300 ease-out
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {user ? (
          <>
            <NavLink to="/write" className={linkStyle} onClick={() => setMenuOpen(false)}>
              Write
            </NavLink>
            <NavLink to="/myblogs" className={linkStyle} onClick={() => setMenuOpen(false)}>
              My Blogs
            </NavLink>

            <NavLink
              to="/profile"
              className="bg-slate-800 px-4 py-2 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              👤 {user.username}
            </NavLink>

            <button
              onClick={handleLogout}
              className="mt-auto text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={linkStyle} onClick={() => setMenuOpen(false)}>
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="bg-indigo-600 px-5 py-2 rounded-xl text-center text-white font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
