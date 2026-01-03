import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-zinc-600 w-full shadow-md py-4 px-4">
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo → Home */}
        <Link to="/" className="text-xl font-bold text-white">
          Home
        </Link>

        <div className="space-x-4 text-white">
          {user ? (
            <>
              <Link to="/write" className="hover:text-blue-400">Write</Link>

              {/* My Blogs */}
              <Link to="/myblogs" className="hover:text-blue-400">
                My Blogs
              </Link>

              <Link to="/profile" className="hover:text-blue-400">
                {user.username}
              </Link>

              <button
                onClick={handleLogout}
                className="hover:text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400">Login</Link>
              <Link to="/register" className="hover:text-blue-400">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
