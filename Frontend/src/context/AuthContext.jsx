import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user & token from localStorage on app start
  useEffect(() => {
     const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  // Login function
const login = async (email, password) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });


  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");

  const userWithToken = {
    ...data.user,
    token: data.token || data.user.token  };

  setUser(userWithToken);
  localStorage.setItem("user", JSON.stringify(userWithToken));

  return data;
};


  // Logout function
const logout = () => {
  setUser(null);
  localStorage.removeItem("user");
};


  // Register function
const register = async (username, email, password) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });


  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");

  const userWithToken = {
    ...data.user,
    token: data.token
  };

  setUser(userWithToken);
  localStorage.setItem("user", JSON.stringify(userWithToken));

  return data;
};


  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
