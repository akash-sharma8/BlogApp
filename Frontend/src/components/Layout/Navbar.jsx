import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded text-sm ${
      isActive ? "text-blue-500 font-semibold" : "text-gray-700 hover:text-blue-500"
    }`;

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="text-xl font-bold text-blue-600">
            BlogApp
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {loading ? (
              <span className="text-gray-500">Loading...</span>
            ) : user ? (
              <>
                <NavLink to="/write" className={linkClass}>Write</NavLink>
                <NavLink to="/myblogs" className={linkClass}>My Blogs</NavLink>
                <NavLink to="/profile" className={linkClass}>Profile</NavLink>
                <button
                  onClick={handleLogout}
                  className="text-red-500 text-sm hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClass}>Login</NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
          {loading ? (
            <span className="text-gray-500">Loading...</span>
          ) : user ? (
            <>
              <NavLink to="/write" className={linkClass} onClick={() => setOpen(false)}>Write</NavLink>
              <NavLink to="/myblogs" className={linkClass} onClick={() => setOpen(false)}>My Blogs</NavLink>
              <NavLink to="/profile" className={linkClass} onClick={() => setOpen(false)}>Profile</NavLink>
              <button
                onClick={handleLogout}
                className="text-red-500 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>Login</NavLink>
              <NavLink
                to="/register"
                className="block text-center bg-blue-600 text-white py-2 rounded"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
