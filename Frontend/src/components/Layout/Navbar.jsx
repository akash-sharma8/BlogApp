import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-zinc-900/80 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="text-2xl font-bold text-white tracking-wide hover:text-blue-400 transition"
        >
          BlogApp
        </NavLink>

        {!loading && (
          <div className="flex items-center gap-6 text-white text-sm font-medium">
            {user ? (
              <>
                <NavLink
                  to="/write"
                  className={({ isActive }) =>
                    `relative after:absolute after:left-0 after:-bottom-1
                     after:h-[2px] after:bg-blue-400 after:transition-all
                     ${isActive ? "after:w-full text-blue-400" : "after:w-0 hover:after:w-full"}`
                  }
                >
                  Write
                </NavLink>

                <NavLink
                  to="/myblogs"
                  className={({ isActive }) =>
                    `relative after:absolute after:left-0 after:-bottom-1
                     after:h-[2px] after:bg-blue-400 after:transition-all
                     ${isActive ? "after:w-full text-blue-400" : "after:w-0 hover:after:w-full"}`
                  }
                >
                  My Blogs
                </NavLink>

                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1 rounded-full
                     bg-white/10 hover:bg-white/20 transition
                     ${isActive ? "ring-2 ring-blue-400" : ""}`
                  }
                >
                  👤 {user.username}
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="px-4 py-1 rounded-full border border-red-400 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `relative after:absolute after:left-0 after:-bottom-1
                     after:h-[2px] after:bg-blue-400 after:transition-all
                     ${isActive ? "after:w-full text-blue-400" : "after:w-0 hover:after:w-full"}`
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="px-4 py-1 rounded-full bg-blue-500 hover:bg-blue-600 transition-all duration-300"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
