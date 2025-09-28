// server/db.js
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use Render persistent disk if provided, else local file next to this file
const filePath =
  process.env.DB_FILE ||
  (process.env.RENDER ? '/data/db.json' : path.join(__dirname, 'f3t.json'));

// Ensure directory exists
fs.mkdirSync(path.dirname(filePath), { recursive: true });

const adapter = new JSONFile(filePath);
export const db = new Low(adapter, {
  admin_users: [],
  // single objects
  home: { id: 1, title_fr: '', title_en: '', intro_fr: '', intro_en: '', updated_at: new Date().toISOString() },
  about: {
    id: 1,
    mission_fr: '', mission_en: '',
    vision_fr: '',  vision_en:  '',
    values_fr: '',  values_en:  '',
    updated_at: new Date().toISOString()
  },
  // arrays
  services: [],
  industries: [],
  certifications: [],
  clients: [],
  news: [],
  // page text slots & blocks
  texts: [],  // { id, page, key, fr, en, created_at, updated_at }
  blocks: []  // { id, page, name, fr, en, image_url, order, created_at, updated_at }
});

export async function initDB() {
  await db.read();
  if (!db.data || !db.data.admin_users) {
    db.data = {
      admin_users: [],
      home: { id: 1, title_fr: '', title_en: '', intro_fr: '', intro_en: '', updated_at: new Date().toISOString() },
      about: {
        id: 1,
        mission_fr: '', mission_en: '',
        vision_fr: '',  vision_en:  '',
        values_fr: '',  values_en:  '',
        updated_at: new Date().toISOString()
      },
      services: [],
      industries: [],
      certifications: [],
      clients: [],
      news: [],
      texts: [],
      blocks: []
    };
    await db.write();
  }
}

export async function ensureAdminSeed({ email, password }) {
  if (!email || !password) return;
  await db.read();
  const exists = db.data.admin_users.find(u => u.email === email);
  if (!exists) {
    const password_hash = bcrypt.hashSync(password, 10);
    db.data.admin_users.push({ id: 1, email, password_hash, created_at: new Date().toISOString() });
    await db.write();
    console.log(`Seeded admin: ${email}`);
  }
}

export function nextId(collection) {
  const arr = db.data[collection] || [];
  return arr.length ? Math.max(...arr.map(x => Number(x.id) || 0)) + 1 : 1;
}
