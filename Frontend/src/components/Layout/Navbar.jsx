import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react"; // Added useEffect for resize handling
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on window resize (e.g., rotating device)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  // Updated link styles with better focus states for accessibility
  const linkStyle = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400
     ${isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"}`;

  const buttonStyle =
    "px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo - Responsive sizing */}
          <NavLink
            to="/"
            className="text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:via-blue-400 hover:to-purple-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            BlogApp
          </NavLink>

          {/* Desktop Menu - Shows on lg and up for better tablet handling */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {loading ? (
              <span className="text-slate-400 text-sm">Loading...</span>
            ) : user ? (
              <>
                <NavLink to="/write" className={linkStyle}>Write</NavLink>
                <NavLink to="/myblogs" className={linkStyle}>My Blogs</NavLink>
                <NavLink to="/profile" className={linkStyle}>Profile</NavLink>
                <button 
                  onClick={handleLogout} 
                  className="text-red-400 hover:text-red-300 font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkStyle}>Login</NavLink>
                <NavLink to="/register" className={buttonStyle}>Sign Up</NavLink>
              </>
            )}
          </div>

          {/* Mobile Hamburger - Visible below lg */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-2xl focus:outline-none hover:text-cyan-400 transition-colors duration-300 focus:ring-2 focus:ring-cyan-400 p-1"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Improved with backdrop and smoother animation */}
      {menuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={() => setMenuOpen(false)} // Close on backdrop click
        ></div>
      )}
      <div
        className={`lg:hidden bg-gradient-to-b from-slate-900 to-slate-800 border-t border-slate-700 shadow-inner z-50 transition-all duration-500 ease-in-out transform
        ${menuOpen ? "translate-y-0 max-h-screen opacity-100" : "-translate-y-full max-h-0 opacity-0"} overflow-hidden`}
      >
        <div className="p-6 flex flex-col space-y-6">
          {loading ? (
            <span className="text-slate-400 text-sm">Loading...</span>
          ) : user ? (
            <>
              <NavLink to="/write" className={linkStyle} onClick={() => setMenuOpen(false)}>Write</NavLink>
              <NavLink to="/myblogs" className={linkStyle} onClick={() => setMenuOpen(false)}>My Blogs</NavLink>
              <NavLink to="/profile" className={linkStyle} onClick={() => setMenuOpen(false)}>Profile</NavLink>
              <button 
                onClick={handleLogout} 
                className="text-red-400 hover:text-red-300 font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkStyle} onClick={() => setMenuOpen(false)}>Login</NavLink>
              <NavLink to="/register" className={buttonStyle} onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}