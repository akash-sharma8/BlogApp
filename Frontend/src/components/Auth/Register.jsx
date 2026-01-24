import { useState } from "react";
import { registerUser } from "../../utils/authApi";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await registerUser(form);

      if (response.data?.success) {
        navigate("/login");
      } else {
        setError(response.data?.message || "Registration failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-black   flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8  rounded-2xl shadow-lg
                   animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-500 bg-red-50 py-2 rounded
                        animate-shake">
            {error}
          </p>
        )}

        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg outline-none
                       focus:ring-2 focus:ring-green-500
                       transition"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg outline-none
                       focus:ring-2 focus:ring-green-500
                       transition"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg outline-none
                       focus:ring-2 focus:ring-green-500
                       transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium
                     hover:bg-green-700 active:scale-95
                     transition-all duration-300
                     disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
