import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../utils/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await loginUser({ email, password });

    const userWithToken = {
      ...res.data.user,
      token: res.data.token,
    };

    setUser(userWithToken);
    localStorage.setItem("user", JSON.stringify(userWithToken));

    return res.data;
  };

  const register = async (username, email, password) => {
    const res = await registerUser({ username, email, password });

    const userWithToken = {
      ...res.data.user,
      token: res.data.token,
    };

    setUser(userWithToken);
    localStorage.setItem("user", JSON.stringify(userWithToken));

    return res.data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
