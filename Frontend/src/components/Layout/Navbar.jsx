import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // For Mobile View

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  // Simplified link style function
  const linkStyle = ({ isActive }) => 
    `transition-all duration-300 ${isActive ? "text-indigo-400" : "text-slate-300 hover:text-white"}`;

  return (
    <nav className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        
        {/* Brand Logo */}
        <NavLink to="/" className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          BlogApp
        </NavLink>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl">
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Navigation Links */}
        {!loading && (
          <div className={`${menuOpen ? "flex" : "hidden"} md:flex absolute md:static top-16 left-0 w-full md:w-auto bg-[#0f172a] md:bg-transparent flex-col md:flex-row items-center gap-6 p-6 md:p-0 border-b border-slate-800 md:border-none transition-all`}>
            {user ? (
              <>
                <NavLink to="/write" className={linkStyle} onClick={() => setMenuOpen(false)}>Write</NavLink>
                <NavLink to="/myblogs" className={linkStyle} onClick={() => setMenuOpen(false)}>My Blogs</NavLink>
                
                {/* Profile Pill */}
                <NavLink to="/profile" className="flex items-center gap-2 bg-slate-800 px-4 py-1.5 rounded-full hover:bg-slate-700 transition" onClick={() => setMenuOpen(false)}>
                  <span className="text-sm">👤 {user.username}</span>
                </NavLink>

                <button onClick={handleLogout} className="text-red-400 hover:text-red-300 font-medium transition">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkStyle} onClick={() => setMenuOpen(false)}>Login</NavLink>
                <NavLink to="/register" className="bg-indigo-600 px-5 py-2 rounded-xl text-white font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20" onClick={() => setMenuOpen(false)}>
                  Get Started
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}