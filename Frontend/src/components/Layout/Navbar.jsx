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
    `relative block px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
     ${isActive ? "text-indigo-400 after:w-full" : "text-slate-200 hover:text-white"}
     after:content-[''] after:block after:h-[2px] after:bg-indigo-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300`;

  return (
    <nav className="backdrop-blur-md bg-slate-900/70 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
          >
            BlogApp
          </NavLink>

          {/* Desktop Menu */}
          {!loading && (
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <>
                  <NavLink to="/write" className={linkStyle}>Write</NavLink>
                  <NavLink to="/myblogs" className={linkStyle}>My Blogs</NavLink>
                  <NavLink
                    to="/profile"
                    className="flex items-center gap-2 bg-slate-800/70 px-4 py-2 rounded-full shadow hover:bg-slate-700 transition"
                  >
                    👤 {user.username}
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={linkStyle}>Login</NavLink>
                  <NavLink
                    to="/register"
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          )}

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-2xl focus:outline-none transition-transform duration-300"
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-slate-900/90 backdrop-blur-sm transform transition-transform duration-300 ease-in-out
        ${menuOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
      >
        <div className="p-8 flex flex-col space-y-6 text-lg">
          {user ? (
            <>
              <NavLink to="/write" className={linkStyle} onClick={() => setMenuOpen(false)}>Write</NavLink>
              <NavLink to="/myblogs" className={linkStyle} onClick={() => setMenuOpen(false)}>My Blogs</NavLink>
              <NavLink
                to="/profile"
                className="bg-slate-800 px-4 py-2 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                👤 {user.username}
              </NavLink>
              <button
                onClick={handleLogout}
                className="mt-6 bg-gradient-to-r from-red-500 to-pink-500 px-5 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkStyle} onClick={() => setMenuOpen(false)}>Login</NavLink>
              <NavLink
                to="/register"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 rounded-lg text-center text-white font-semibold hover:opacity-90 transition"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}