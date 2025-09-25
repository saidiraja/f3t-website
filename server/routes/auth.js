// server/routes/auth.js
import express from 'express';
import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Missing email/password' });

  await db.read();
  const row = db.data.admin_users.find(u => u.email === email);
  if (!row) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = bcrypt.compareSync(password, row.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: row.id, email: row.email }, process.env.JWT_SECRET, { expiresIn: '12h' });
  res.json({ token });
});

export default router;
