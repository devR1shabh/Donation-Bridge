import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios";

const TOKEN_KEY = "donation_bridge_token";
const AuthContext = createContext(null);

function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedPayload = normalizedPayload.padEnd(
      normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
      "=",
    );
    return JSON.parse(window.atob(paddedPayload));
  } catch {
    return null;
  }
}

function getUserFromToken(token) {
  const payload = decodeJwt(token);

  if (!payload?._id || !payload?.role) {
    return null;
  }

  return {
    id: payload._id,
    role: payload.role,
  };
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    return savedToken ? getUserFromToken(savedToken) : null;
  });

  useEffect(() => {
    if (!token) {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
      return;
    }

    localStorage.setItem(TOKEN_KEY, token);
    setUser(getUserFromToken(token));
  }, [token]);

  async function login(credentials) {
    const { data } = await api.post("/auth/login", credentials);
    setToken(data.token);
    return getUserFromToken(data.token);
  }

  async function signup(payload) {
    return api.post("/auth/signup", payload);
  }

  function logout() {
    setToken(null);
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      login,
      signup,
      logout,
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
