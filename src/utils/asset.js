// src/utils/asset.js
export const asset = (p) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${p.replace(/^\//, '')}`;
