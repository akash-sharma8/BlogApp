import API from "../utils/api";
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
  const { data } = await API.post("/auth/login", { email, password });

  const userWithToken = {
    ...data.user,
    token: data.token,
  };

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
  const { data } = await API.post("/auth/register", {
    username,
    email,
    password,
  });

  const userWithToken = {
    ...data.user,
    token: data.token,
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
