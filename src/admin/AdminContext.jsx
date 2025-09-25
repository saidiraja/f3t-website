// src/admin/AdminContext.jsx
import { createContext, useContext, useMemo, useEffect, useState } from "react";
import { api, setToken } from "../api";

const Ctx = createContext();

export default function AdminProvider({ children }) {
  const [token, _setToken] = useState(() => localStorage.getItem("f3t_token") || null);

  useEffect(() => { setToken(token); }, [token]);

  const login = async (email, password) => {
    const data = await api.login(email, password); // { token }
    if (!data?.token) throw new Error("Invalid credentials");
    localStorage.setItem("f3t_token", data.token);
    _setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem("f3t_token");
    _setToken(null);
    setToken(null);
  };

  const value = useMemo(() => ({ loggedIn: !!token, token, login, logout }), [token]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAdmin = () => useContext(Ctx);
