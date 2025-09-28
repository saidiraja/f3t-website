// server/db.js
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Add it in Render → Web Service → Settings → Environment.");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // works with Neon/Supabase
});

export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS texts (
      id SERIAL PRIMARY KEY,
      page TEXT NOT NULL,
      "key" TEXT NOT NULL,
      fr TEXT NOT NULL DEFAULT '',
      en TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      CONSTRAINT texts_unique UNIQUE(page, "key")
    );
  `);
}

export async function ensureAdminSeed(email, password) {
  if (!email || !password) return;
  const { rows } = await pool.query(`SELECT id FROM admin_users WHERE email = $1 LIMIT 1`, [email]);
  if (rows.length === 0) {
    const hash = bcrypt.hashSync(password, 10);
    await pool.query(
      `INSERT INTO admin_users (email, password_hash) VALUES ($1, $2)`,
      [email, hash]
    );
    console.log(`[DB] Seeded admin: ${email}`);
  }
}
