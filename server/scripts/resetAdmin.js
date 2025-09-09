// server/scripts/resetAdmin.js
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { initDB, db } from '../db.js';

await initDB();

const email = process.env.ADMIN_EMAIL || 'admin@f3t.tn';
const password = process.env.ADMIN_PASSWORD || 'admin123';

const password_hash = bcrypt.hashSync(password, 10);
db.data.admin_users = [{ id: 1, email, password_hash }];
await db.write();

console.log(`✅ Admin reset: ${email}`);
