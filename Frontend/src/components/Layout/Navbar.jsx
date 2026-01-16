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
    `block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300
     ${isActive ? "text-indigo-400" : "text-slate-300 hover:text-white"}`;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16 items-center">
      
      {/* Logo */}
      <NavLink
        to="/"
        className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
      >
        BlogApp
      </NavLink>

      {/* Desktop Menu (visible from md and up) */}
      {!loading && (
        <div className="md:flex items-center space-x-6">
          {user ? (
            <>
              <NavLink to="/write" className={linkStyle}>Write</NavLink>
              <NavLink to="/myblogs" className={linkStyle}>My Blogs</NavLink>
              <NavLink
                to="/profile"
                className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full hover:bg-slate-700 transition"
              >
                👤 {user.username}
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkStyle}>Login</NavLink>
              <NavLink
                to="/register"
                className="bg-indigo-600 px-5 py-2 rounded-lg text-white font-semibold hover:bg-indigo-500 transition"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      )}

      {/* Mobile Hamburger (only visible below md) */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Menu (only visible below md) */}
  <div
    className={`md:hidden bg-slate-900 border-t border-slate-800 transition-transform duration-300 ease-in-out
    ${menuOpen ? "translate-x-0" : "translate-x-full"} fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] p-6 flex flex-col space-y-4`}
  >
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
          className="mt-auto text-red-400 hover:text-red-300"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <NavLink to="/login" className={linkStyle} onClick={() => setMenuOpen(false)}>Login</NavLink>
        <NavLink
          to="/register"
          className="bg-indigo-600 px-5 py-2 rounded-lg text-center text-white font-semibold hover:bg-indigo-500 transition"
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