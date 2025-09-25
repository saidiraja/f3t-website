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

// Build allowed origins list (comma-separated)
const DEFAULT_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const ALLOWED = (process.env.CORS_ORIGIN || DEFAULT_ORIGINS.join(','))
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// 1) DB init + seed admin
await initDB();
await ensureAdminSeed({
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
});

// 2) Security & logging
app.disable('x-powered-by');
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// 3) CORS + body
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // Vite proxy / curl
    if (ALLOWED.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked: ${origin}`), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors());

app.use(express.json({ limit: '10mb' }));

// 4) Static /uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir, {
  setHeaders(res) {
    res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
  }
}));

// 5) API Routes
app.use('/api', authRouter);     // POST /api/login
app.use('/api', contentRouter);  // /api/public/*, /api/admin/*

// 6) Health
app.get('/', (_req, res) => res.json({ ok: true, service: 'F3T CMS API' }));
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// 7) Optionally serve the built frontend (no CORS in prod)
//    Set SERVE_FRONTEND=true and build the app to ../dist
if (process.env.SERVE_FRONTEND === 'true') {
  const clientDir = path.resolve(__dirname, '..', 'dist');
  if (fs.existsSync(clientDir)) {
    app.use(express.static(clientDir));
    app.get(/^(?!\/api|\/uploads).+/, (req, res) =>
      res.sendFile(path.join(clientDir, 'index.html'))
    );
    console.log('Serving frontend from', clientDir);
  } else {
    console.warn('SERVE_FRONTEND=true but dist folder not found:', clientDir);
  }
}

// 8) 404 for unknown /api paths
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

// 9) Error handler
app.use((err, _req, res, _next) => {
  const message = err?.message || 'Internal server error';
  if (process.env.NODE_ENV !== 'production') console.error('Unhandled error:', err);
  else console.error('Unhandled error:', message);
  const status = message.startsWith('CORS blocked') ? 403 : 500;
  res.status(status).json({ error: message });
});

// 10) Start
app.listen(PORT, () => {
  console.log(`CMS server running on http://localhost:${PORT}`);
  console.log(`Allowed CORS origins: ${ALLOWED.join(', ')}`);
});
