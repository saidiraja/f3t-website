// src/cms/PageContentContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAdmin } from "../admin/AdminContext";

const Ctx = createContext({
  page: "",
  texts: {},                 // { key: {id, page, key, fr, en} }
  reload: () => {},
  upsert: async () => {},    // (key, {fr, en}) => item
  remove: async () => {},    // (key) => void
  loggedIn: false,
});

function apiUrl(path) {
  // Accept both "/api/..." and "api/..." inputs
  const p = path.startsWith("/") ? path : `/${path}`;
  const base = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
  return `${base}${p}`;
}

async function jsonOrThrow(res, fallbackMsg = "Request failed") {
  const text = await res.text().catch(() => "");
  let body;
  try { body = text ? JSON.parse(text) : null; } catch { body = null; }
  if (!res.ok) {
    const msg = body?.error || body?.message || text || `${fallbackMsg} (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  return body;
}

export function PageContentProvider({ page, children }) {
  const [map, setMap] = useState({});
  const { loggedIn } = useAdmin();

  async function load() {
    const res = await fetch(apiUrl(`api/public/texts?page=${encodeURIComponent(page)}`));
    const list = await jsonOrThrow(res, "Failed to load texts");
    const m = {};
    for (const t of list) m[t.key] = t;
    setMap(m);
  }

  useEffect(() => { load().catch(() => setMap({})); }, [page]);

  async function upsert(key, { fr = "", en = "" }) {
    const token = localStorage.getItem("f3t_token");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const prev = map[key];

    let res;
    if (!prev) {
      res = await fetch(apiUrl("api/admin/texts"), {
        method: "POST",
        headers,
        body: JSON.stringify({ page, key, fr, en }),
      });
    } else {
      res = await fetch(apiUrl(`api/admin/texts/${prev.id}`), {
        method: "PUT",
        headers,
        body: JSON.stringify({ fr, en }),
      });
    }
    const item = await jsonOrThrow(res, "Save failed");

    // Optimistic update
    setMap((m) => ({ ...m, [key]: item }));

    // Freshen from server in background
    queueMicrotask(() => load().catch(() => {}));

    return item;
  }

  async function remove(key) {
    const token = localStorage.getItem("f3t_token");
    const prev = map[key];
    if (!prev) return;

    const res = await fetch(apiUrl(`api/admin/texts/${prev.id}`), {
      method: "DELETE",
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });
    await jsonOrThrow(res, "Delete failed");

    setMap((m) => {
      const n = { ...m };
      delete n[key];
      return n;
    });

    queueMicrotask(() => load().catch(() => {}));
  }

  const value = useMemo(
    () => ({ page, texts: map, reload: load, upsert, remove, loggedIn }),
    [page, map, loggedIn]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const usePageContent = () => useContext(Ctx);
