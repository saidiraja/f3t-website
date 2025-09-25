// server/db.js
import path from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.join(__dirname, 'f3t.json');

const adapter = new JSONFile(file);
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
  // arrays you already had
  services: [],
  industries: [],
  certifications: [],
  clients: [],
  news: [],
  // NEW: key-value content slots (for page text)
  // { id, page, key, fr, en, created_at, updated_at }
  texts: [],
  // NEW: repeatable content blocks (for bullet lists/feature cards on a page)
  // { id, page, name, fr, en, image_url?, order?, created_at, updated_at }
  blocks: []
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
  await db.read();
  const exists = db.data.admin_users.find(u => u.email === email);
  if (!exists && email && password) {
    const password_hash = bcrypt.hashSync(password, 10);
    db.data.admin_users.push({ id: 1, email, password_hash, created_at: new Date().toISOString() });
    await db.write();
    console.log(`Seeded admin: ${email}`);
  }
}

export function nextId(collection) {
  const arr = db.data[collection] || [];
  return arr.length ? Math.max(...arr.map(x => x.id || 0)) + 1 : 1;
}
