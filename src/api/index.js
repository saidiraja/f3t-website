// src/api/index.js
let AUTH_TOKEN = null;

export function setToken(token) {
  AUTH_TOKEN = token;
}

// Fake network delay
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const api = {
  // Demo login: accepts only this pair
  async login(email, password) {
    await sleep(400);
    const ok = email === "admin@f3t.tn" && password === "admin123";
    if (!ok) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      throw err;
    }
    return { token: "demo-token-123" };
  },

  // Example protected call (not required now, but handy later)
  async getProfile() {
    await sleep(300);
    if (!AUTH_TOKEN) {
      const err = new Error("Unauthorized");
      err.status = 401;
      throw err;
    }
    return { email: "admin@f3t.tn", role: "admin" };
  },
};
