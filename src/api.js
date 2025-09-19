// src/api.js
const API = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, ''); // '' -> use proxy
console.log('[API base]', API || '(vite proxy)');

let _token = null;
export function setToken(t) { _token = t; }

async function req(path, { method = 'GET', json } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (_token) headers.Authorization = `Bearer ${_token}`;

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: json ? JSON.stringify(json) : undefined,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || `HTTP ${res.status}`);
  }
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

export const api = {
  // PUBLIC
  getHome: () => req('/api/public/home'),
  getAbout: () => req('/api/public/about'),
  getServices: () => req('/api/public/services'),
  getIndustries: () => req('/api/public/industries'),
  getCertifications: () => req('/api/public/certifications'),
  getClients: () => req('/api/public/clients'),
  getNews: () => req('/api/public/news'),

  // AUTH
  login: (email, password) => req('/api/login', { method: 'POST', json: { email, password } }),

  // ADMIN
  updateHome: (payload) => req('/api/admin/home', { method: 'PUT', json: payload }),
  updateAbout: (payload) => req('/api/admin/about', { method: 'PUT', json: payload }),

  adminListServices: () => req('/api/public/services'),
  adminCreateService: (payload) => req('/api/admin/services', { method: 'POST', json: payload }),
  adminUpdateService: (id, payload) => req(`/api/admin/services/${id}`, { method: 'PUT', json: payload }),
  adminDeleteService: (id) => req(`/api/admin/services/${id}`, { method: 'DELETE' }),

  adminListIndustries: () => req('/api/public/industries'),
  adminCreateIndustry: (payload) => req('/api/admin/industries', { method: 'POST', json: payload }),
  adminUpdateIndustry: (id, payload) => req(`/api/admin/industries/${id}`, { method: 'PUT', json: payload }),
  adminDeleteIndustry: (id) => req(`/api/admin/industries/${id}`, { method: 'DELETE' }),

  adminListCertifications: () => req('/api/public/certifications'),
  adminCreateCertification: (payload) => req('/api/admin/certifications', { method: 'POST', json: payload }),
  adminUpdateCertification: (id, payload) => req(`/api/admin/certifications/${id}`, { method: 'PUT', json: payload }),
  adminDeleteCertification: (id) => req(`/api/admin/certifications/${id}`, { method: 'DELETE' }),

  adminListClients: () => req('/api/public/clients'),
  adminCreateClient: (payload) => req('/api/admin/clients', { method: 'POST', json: payload }),
  adminUpdateClient: (id, payload) => req(`/api/admin/clients/${id}`, { method: 'PUT', json: payload }),
  adminDeleteClient: (id) => req(`/api/admin/clients/${id}`, { method: 'DELETE' }),

  adminListNews: () => req('/api/public/news'),
  adminCreateNews: (payload) => req('/api/admin/news', { method: 'POST', json: payload }),
  adminUpdateNews: (id, payload) => req(`/api/admin/news/${id}`, { method: 'PUT', json: payload }),
  adminDeleteNews: (id) => req(`/api/admin/news/${id}`, { method: 'DELETE' }),
};
