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
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:via-blue-400 hover:to-purple-500 transition-all duration-300"
          >
            BlogApp
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <NavLink to="/write" className={linkStyle}>Write</NavLink>
                <NavLink to="/myblogs" className={linkStyle}>My Blogs</NavLink>
                <NavLink
                  to="/profile"
                  className="flex items-center gap-3 bg-gradient-to-r from-slate-700 to-slate-600 px-4 py-2 rounded-full hover:from-slate-600 hover:to-slate-500 transition-all duration-300 shadow-md"
                >
                  <span className="text-lg">👤</span> {user.username}
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 font-medium transition-all duration-300 hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkStyle}>Login</NavLink>
                <NavLink
                  to="/register"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 rounded-lg text-white font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-2xl focus:outline-none hover:text-cyan-400 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
<div
  className={`md:hidden bg-gradient-to-b from-slate-900 to-slate-800 border-t border-slate-700 transition-all duration-500 ease-in-out shadow-inner
  ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
>
  <div className="p-6 flex flex-col space-y-6">
    {!loading && (
      <>
        {user ? (
          <>
            <NavLink to="/write" className={linkStyle} onClick={() => setMenuOpen(false)}>Write</NavLink>
            <NavLink to="/myblogs" className={linkStyle} onClick={() => setMenuOpen(false)}>My Blogs</NavLink>
            <NavLink to="/profile" className="..." onClick={() => setMenuOpen(false)}>Profile</NavLink>
            <button onClick={handleLogout} className="...">Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={linkStyle} onClick={() => setMenuOpen(false)}>Login</NavLink>
            <NavLink to="/register" className="..." onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
          </>
        )}
      </>
    )}
  </div>
</div>
    </nav>
  );
}