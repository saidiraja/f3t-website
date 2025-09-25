// src/admin/AdminContext.jsx
import { createContext, useContext, useMemo, useState } from "react";
import api, { setToken, getToken } from "../api";

const Ctx = createContext(null);

export default function AdminProvider({ children }) {
  // initialize from API client's stored token
  const [loggedIn, setLoggedIn] = useState(!!getToken());

  async function login(email, password) {
    // api.login will set the token internally via setToken()
    await api.login(email, password);
    setLoggedIn(true);
  }

  function logout() {
    setToken(null);        // clears token from memory + localStorage
    setLoggedIn(false);
  }

  const value = useMemo(() => ({ loggedIn, login, logout }), [loggedIn]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAdmin = () => useContext(Ctx);
