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

  // Modern Link Style
  const linkStyle = ({ isActive }) =>
    `transition-colors duration-300 font-medium ${
      isActive ? "text-indigo-400" : "text-slate-300 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            BlogApp
          </NavLink>

          {/* Desktop Navigation - Hidden on Mobile */}
          {!loading && (
            <div className="hidden md:flex items-center gap-8">
              {user ? (
                <>
                  <NavLink to="/write" className={linkStyle}>Write</NavLink>
                  <NavLink to="/myblogs" className={linkStyle}>My Blogs</NavLink>
                  <NavLink to="/profile" className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-1.5 rounded-full hover:bg-slate-700 transition">
                    <span className="text-sm">👤 {user.username}</span>
                  </NavLink>
                  <button onClick={handleLogout} className="text-red-400 hover:text-red-300 text-sm font-medium transition">
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-6">
                  <NavLink to="/login" className={linkStyle}>Login</NavLink>
                  <NavLink to="/register" className="bg-indigo-600 px-5 py-2 rounded-xl text-white font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20">
                    Get Started
                  </NavLink>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden text-white text-2xl p-2 focus:outline-none"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar - Attractive Slide-out */}
      <div className={`md:hidden fixed top-16 right-0 w-full h-screen bg-[#0f172a] transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col gap-6 p-8">
          {user ? (
            <>
              <NavLink to="/write" className="text-xl text-slate-300" onClick={() => setMenuOpen(false)}>Write</NavLink>
              <NavLink to="/myblogs" className="text-xl text-slate-300" onClick={() => setMenuOpen(false)}>My Blogs</NavLink>
              <NavLink to="/profile" className="text-xl text-indigo-400" onClick={() => setMenuOpen(false)}>Profile ({user.username})</NavLink>
              <button onClick={handleLogout} className="text-left text-xl text-red-400 pt-4 border-t border-slate-800">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-xl text-slate-300" onClick={() => setMenuOpen(false)}>Login</NavLink>
              <NavLink to="/register" className="bg-indigo-600 text-white text-center py-4 rounded-2xl font-bold" onClick={() => setMenuOpen(false)}>Get Started</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}