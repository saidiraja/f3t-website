// src/api.js
//
// Unified API client for F3T
// - Dev: uses Vite proxy (base = '')
// - Prod: set VITE_API_URL in .env.production (e.g. https://your-api.example.com)
// - Handles both route shapes:
//   * /api/login    OR /api/auth/login
//   * /api/public/* OR /api/*
//

const API = import.meta.env.PROD ? (import.meta.env.VITE_API_URL || "") : "";

// ---- Token handling ---------------------------------------------------------
let _token = null;

function loadToken() {
  try {
    const t = localStorage.getItem("f3t_token");
    if (t) _token = t;
  } catch {}
}
loadToken();

export function setToken(t) {
  _token = t || null;
  try {
    if (t) localStorage.setItem("f3t_token", t);
    else localStorage.removeItem("f3t_token");
  } catch {}
}

export function getToken() {
  return _token;
}

// ---- Low-level request helper ----------------------------------------------
async function req(path, { method = "GET", json, formData } = {}) {
  const headers = {};
  const body = formData ? formData : json ? JSON.stringify(json) : undefined;
  if (!formData) headers["Content-Type"] = "application/json";
  if (_token) headers.Authorization = `Bearer ${_token}`;

  const res = await fetch(`${API}${path}`, { method, headers, body });

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const e = await res.json();
      msg = e.error || e.message || JSON.stringify(e);
    } catch {
      try {
        msg = await res.text();
      } catch {}
    }
    throw new Error(msg);
  }

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// Utility: try multiple paths until one works (for public routes shape)
async function getWithFallback(paths) {
  let lastErr;
  for (const p of paths) {
    try {
      return await req(p);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}
async function writeWithFallback(paths, method, json) {
  let lastErr;
  for (const p of paths) {
    try {
      return await req(p, { method, json });
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

// ---- PUBLIC READS (work with /api/public/* OR /api/*) -----------------------
const P = (resource) => [`/api/public/${resource}`, `/api/${resource}`];

export const api = {
  // Public content
  getHome:         () => getWithFallback(P("home")),
  getAbout:        () => getWithFallback(P("about")),
  getServices:     () => getWithFallback(P("services")),
  getIndustries:   () => getWithFallback(P("industries")),
  getCertifications:() => getWithFallback(P("certifications")),
  getClients:      () => getWithFallback(P("clients")),
  getNews:         () => getWithFallback(P("news")),

  // Auth (supports /api/login and /api/auth/login)
  login: async (email, password) => {
    let data;
    try {
      data = await req("/api/login", { method: "POST", json: { email, password } });
    } catch {
      data = await req("/api/auth/login", { method: "POST", json: { email, password } });
    }
    // Accept either {token} or {accessToken}
    const tok = data?.token || data?.accessToken;
    if (!tok) throw new Error("Login succeeded but no token was returned.");
    setToken(tok);
    return { token: tok };
  },

  // Admin singleton pages
  updateHome:  (payload) => writeWithFallback(["/api/admin/home"],  "PUT", payload),
  updateAbout: (payload) => writeWithFallback(["/api/admin/about"], "PUT", payload),

  // Admin collections
  adminListServices:         ()        => getWithFallback(P("services")),
  adminCreateService:        (p)       => req("/api/admin/services",             { method: "POST", json: p }),
  adminUpdateService:        (id, p)   => req(`/api/admin/services/${id}`,       { method: "PUT",  json: p }),
  adminDeleteService:        (id)      => req(`/api/admin/services/${id}`,       { method: "DELETE" }),

  adminListIndustries:       ()        => getWithFallback(P("industries")),
  adminCreateIndustry:       (p)       => req("/api/admin/industries",           { method: "POST", json: p }),
  adminUpdateIndustry:       (id, p)   => req(`/api/admin/industries/${id}`,     { method: "PUT",  json: p }),
  adminDeleteIndustry:       (id)      => req(`/api/admin/industries/${id}`,     { method: "DELETE" }),

  adminListCertifications:   ()        => getWithFallback(P("certifications")),
  adminCreateCertification:  (p)       => req("/api/admin/certifications",       { method: "POST", json: p }),
  adminUpdateCertification:  (id, p)   => req(`/api/admin/certifications/${id}`, { method: "PUT",  json: p }),
  adminDeleteCertification:  (id)      => req(`/api/admin/certifications/${id}`, { method: "DELETE" }),

  adminListClients:          ()        => getWithFallback(P("clients")),
  adminCreateClient:         (p)       => req("/api/admin/clients",              { method: "POST", json: p }),
  adminUpdateClient:         (id, p)   => req(`/api/admin/clients/${id}`,        { method: "PUT",  json: p }),
  adminDeleteClient:         (id)      => req(`/api/admin/clients/${id}`,        { method: "DELETE" }),

  adminListNews:             ()        => getWithFallback(P("news")),
  adminCreateNews:           (p)       => req("/api/admin/news",                 { method: "POST", json: p }),
  adminUpdateNews:           (id, p)   => req(`/api/admin/news/${id}`,           { method: "PUT",  json: p }),
  adminDeleteNews:           (id)      => req(`/api/admin/news/${id}`,           { method: "DELETE" }),

  // Uploads (expects { url } from backend)
  uploadFile: (file) => {
    const fd = new FormData();
    fd.append("file", file);
    return req("/api/admin/upload", { method: "POST", formData: fd });
  },
};

export default api;
