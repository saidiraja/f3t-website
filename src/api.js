// src/api.js
// Force proxy mode in dev: leave API empty so we call same-origin + Vite proxy
const API = ''; // IMPORTANT: '' uses the Vite proxy (see vite.config.js)
console.log('[API base]', API || '(vite proxy)');

let _token = null;
export function setToken(t) { _token = t; }

async function req(path, { method = 'GET', json, formData } = {}) {
  const headers = {};
  if (!formData) headers['Content-Type'] = 'application/json';
  if (_token) headers.Authorization = `Bearer ${_token}`;

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: formData ? formData : (json ? JSON.stringify(json) : undefined),
  });

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try { const e = await res.json(); msg = e.error || JSON.stringify(e); }
    catch { try { msg = await res.text(); } catch {} }
    throw new Error(msg);
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

  // ADMIN (singles)
  updateHome:  (payload) => req('/api/admin/home',  { method: 'PUT', json: payload }),
  updateAbout: (payload) => req('/api/admin/about', { method: 'PUT', json: payload }),

  // ADMIN (collections)
  adminListServices:            ()       => req('/api/public/services'),
  adminCreateService:      (p)          => req('/api/admin/services',       { method: 'POST', json: p }),
  adminUpdateService:      (id, p)      => req(`/api/admin/services/${id}`, { method: 'PUT',  json: p }),
  adminDeleteService:      (id)         => req(`/api/admin/services/${id}`, { method: 'DELETE' }),

  adminListIndustries:          ()       => req('/api/public/industries'),
  adminCreateIndustry:     (p)          => req('/api/admin/industries',        { method: 'POST', json: p }),
  adminUpdateIndustry:     (id, p)      => req(`/api/admin/industries/${id}`,  { method: 'PUT',  json: p }),
  adminDeleteIndustry:     (id)         => req(`/api/admin/industries/${id}`,  { method: 'DELETE' }),

  adminListCertifications:      ()       => req('/api/public/certifications'),
  adminCreateCertification:(p)          => req('/api/admin/certifications',        { method: 'POST', json: p }),
  adminUpdateCertification:(id, p)      => req(`/api/admin/certifications/${id}`,  { method: 'PUT',  json: p }),
  adminDeleteCertification:(id)         => req(`/api/admin/certifications/${id}`,  { method: 'DELETE' }),

  adminListClients:             ()       => req('/api/public/clients'),
  adminCreateClient:       (p)          => req('/api/admin/clients',        { method: 'POST', json: p }),
  adminUpdateClient:       (id, p)      => req(`/api/admin/clients/${id}`,  { method: 'PUT',  json: p }),
  adminDeleteClient:       (id)         => req(`/api/admin/clients/${id}`,  { method: 'DELETE' }),

  adminListNews:                ()       => req('/api/public/news'),
  adminCreateNews:         (p)          => req('/api/admin/news',        { method: 'POST', json: p }),
  adminUpdateNews:         (id, p)      => req(`/api/admin/news/${id}`,  { method: 'PUT',  json: p }),
  adminDeleteNews:         (id)         => req(`/api/admin/news/${id}`,  { method: 'DELETE' }),

  // uploads
  uploadFile: (file) => {
    const fd = new FormData();
    fd.append('file', file);
    return req('/api/admin/upload', { method: 'POST', formData: fd });
  },
  
};
// --- Text slots ---
export const listTexts = (page) =>
  fetch(`/api/public/texts?page=${encodeURIComponent(page)}`).then(r => r.json());

export const createText = (payload) =>
  fetch(`/api/admin/texts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('f3t_token')}` },
    body: JSON.stringify(payload)
  }).then(r => r.json());

export const updateText = (id, payload) =>
  fetch(`/api/admin/texts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('f3t_token')}` },
    body: JSON.stringify(payload)
  }).then(r => r.json());

export const deleteText = (id) =>
  fetch(`/api/admin/texts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('f3t_token')}` }
  }).then(r => r.json());

// --- Blocks (repeaters) ---
export const listBlocks = (page, name) =>
  fetch(`/api/public/blocks?page=${encodeURIComponent(page)}&name=${encodeURIComponent(name)}`).then(r => r.json());

export const createBlock = (payload) =>
  fetch(`/api/admin/blocks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('f3t_token')}` },
    body: JSON.stringify(payload)
  }).then(r => r.json());

export const updateBlock = (id, payload) =>
  fetch(`/api/admin/blocks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('f3t_token')}` },
    body: JSON.stringify(payload)
  }).then(r => r.json());

export const deleteBlock = (id) =>
  fetch(`/api/admin/blocks/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('f3t_token')}` }
  }).then(r => r.json());

