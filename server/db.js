// server/db.js
import 'dotenv/config';

/**
 * Simple GitHub-backed JSON store for texts.
 * Stores an array like:
 *   [{ id, page, key, fr, en, updated_at }, ...]
 */

const GH_TOKEN   = process.env.GITHUB_TOKEN;
const GH_REPO    = process.env.GITHUB_REPO;    // e.g. "saidiraja/f3t-website"
const GH_BRANCH  = process.env.GITHUB_BRANCH || "main";
const GH_PATH    = process.env.GITHUB_PATH   || "cms/texts.json";

if (!GH_TOKEN || !GH_REPO) {
  console.warn("[DB] GitHub storage not fully configured. Set GITHUB_TOKEN and GITHUB_REPO.");
}

const GH_API = `https://api.github.com/repos/${GH_REPO}/contents/${encodeURIComponent(GH_PATH)}`;

const state = {
  texts: [], // in-memory cache
  sha: null, // last file SHA to update
};

function headers() {
  return {
    "Authorization": `Bearer ${GH_TOKEN}`,
    "Accept": "application/vnd.github+json",
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function fetchCurrentFile() {
  const url = `${GH_API}?ref=${encodeURIComponent(GH_BRANCH)}`;
  const res = await fetch(url, { headers: headers() });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`[GitHub] Read failed: ${res.status} ${await res.text()}`);
  return res.json();
}

function toBase64(obj) {
  return Buffer.from(JSON.stringify(obj, null, 2), "utf8").toString("base64");
}

async function writeFile(contentsArray, message) {
  const body = {
    message: message || "Update texts.json",
    content: toBase64(contentsArray),
    branch: GH_BRANCH,
    ...(state.sha ? { sha: state.sha } : {}),
  };
  const res = await fetch(GH_API, { method: "PUT", headers: headers(), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`[GitHub] Write failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  state.sha = data?.content?.sha || null;
}

export async function initDB() {
  // load from GitHub or create empty file
  try {
    const file = await fetchCurrentFile();
    if (!file) {
      // create empty file
      state.texts = [];
      state.sha = null;
      if (GH_TOKEN && GH_REPO) {
        await writeFile(state.texts, "Initialize texts.json");
        console.log("[DB] Created cms/texts.json on GitHub");
      } else {
        console.warn("[DB] Running without GitHub persist (env missing). Changes won't be saved.");
      }
    } else {
      state.sha = file.sha || null;
      const decoded = Buffer.from(file.content || "", "base64").toString("utf8");
      state.texts = Array.isArray(JSON.parse(decoded)) ? JSON.parse(decoded) : [];
      console.log(`[DB] Loaded ${state.texts.length} texts from GitHub`);
    }
  } catch (e) {
    console.error("[DB] Init failed:", e.message);
    // still boot with empty in-memory (no persist)
    state.texts = [];
    state.sha = null;
  }
}

export async function ensureAdminSeed(email, _password) {
  // Admin is via env (JWT on login); nothing to store in GitHub here.
  if (!email) console.warn("[DB] ADMIN_EMAIL not set (login will fail).");
}

// --- Helpers for texts ---
function nextId() {
  const max = state.texts.reduce((m, t) => Math.max(m, Number(t.id) || 0), 0);
  return max + 1;
}

export async function listTextsByPage(page) {
  return state.texts.filter(t => t.page === page).sort((a,b)=>a.key.localeCompare(b.key));
}

export async function upsertText({ page, key, fr = "", en = "" }) {
  const now = new Date().toISOString();
  const existing = state.texts.find(t => t.page === page && t.key === key);
  if (existing) {
    existing.fr = fr;
    existing.en = en;
    existing.updated_at = now;
  } else {
    state.texts.push({ id: nextId(), page, key, fr, en, updated_at: now });
  }
  if (GH_TOKEN && GH_REPO) await writeFile(state.texts, `Upsert ${page}:${key}`);
  return state.texts.find(t => t.page === page && t.key === key);
}

export async function updateTextById(id, { fr = "", en = "" }) {
  const idx = state.texts.findIndex(t => Number(t.id) === Number(id));
  if (idx === -1) return null;
  state.texts[idx] = { ...state.texts[idx], fr, en, updated_at: new Date().toISOString() };
  if (GH_TOKEN && GH_REPO) await writeFile(state.texts, `Update id=${id}`);
  return state.texts[idx];
}

export async function deleteTextById(id) {
  const before = state.texts.length;
  state.texts = state.texts.filter(t => Number(t.id) !== Number(id));
  if (state.texts.length === before) return false;
  if (GH_TOKEN && GH_REPO) await writeFile(state.texts, `Delete id=${id}`);
  return true;
}
