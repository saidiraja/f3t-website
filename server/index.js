// server/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { initDB, ensureAdminSeed } from './db.js';
import authRouter from './routes/auth.js';
import contentRouter from './routes/content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 5174);

// -------- CORS --------
// You can provide either CORS_ORIGIN (comma-separated) and/or FRONTEND_ORIGIN (single).
const defaults = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const extra = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
if (process.env.FRONTEND_ORIGIN) extra.push(process.env.FRONTEND_ORIGIN);

const ALLOWED = Array.from(new Set([...defaults, ...extra]));

// -------- DB init + seed admin --------
await initDB();
await ensureAdminSeed({
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
});

// -------- Security & logging --------
app.disable('x-powered-by');
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// -------- Body & CORS --------
app.use(express.json({ limit: '10mb' }));
app.use(
  cors({
    origin: (origin, cb) => {
      // Allow curl/Postman (no origin) and any allowed origin
      if (!origin || ALLOWED.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked: ${origin}`), false);
    },
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.options('*', cors());

// -------- Static uploads --------
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir, {
  setHeaders(res) {
    res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
  }
}));

// -------- API Routes --------
app.use('/api', authRouter);     // POST /api/login
app.use('/api', contentRouter);  // /api/public/* and /api/admin/*

// -------- Health --------
app.get('/', (_req, res) => res.json({ ok: true, service: 'F3T CMS API' }));
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// -------- 404 for unknown /api --------
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

// -------- Error handler --------
app.use((err, _req, res, _next) => {
  const message = err?.message || 'Internal server error';
  if (process.env.NODE_ENV !== 'production') console.error('Unhandled error:', err);
  else console.error('Unhandled error:', message);
  const status = message.startsWith('CORS blocked') ? 403 : 500;
  res.status(status).json({ error: message });
});

// -------- Start --------
app.listen(PORT, () => {
  console.log(`CMS server running on :${PORT}`);
  console.log('Allowed CORS origins:', ALLOWED.join(', '));
});
