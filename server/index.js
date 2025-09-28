// server/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { initDB, ensureAdminSeed } from './db.js';
import authRouter from './routes/auth.js';
import contentRouter from './routes/content.js';

const app = express();
const PORT = Number(process.env.PORT || 5174);

// CORS allowlist
const defaults = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const extra = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
if (process.env.FRONTEND_ORIGIN) extra.push(process.env.FRONTEND_ORIGIN);
const ALLOWED = Array.from(new Set([...defaults, ...extra]));

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked: ${origin}`), false);
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));
app.options('*', cors());

app.use(express.json({ limit: '10mb' }));
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Routes
app.use('/api', authRouter);    // /api/login
app.use('/api', contentRouter); // /api/public/texts, /api/admin/texts...

// 404 for unknown /api
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

// Error handler
app.use((err, _req, res, _next) => {
  const msg = err?.message || 'Internal server error';
  const status = msg.startsWith('CORS blocked') ? 403 : 500;
  if (process.env.NODE_ENV !== 'production') console.error(err);
  res.status(status).json({ error: msg });
});

// Boot
initDB()
  .then(() => ensureAdminSeed(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD))
  .then(() => app.listen(PORT, () => {
    console.log(`API listening on :${PORT}`);
    console.log('Allowed CORS origins:', ALLOWED.join(', '));
  }))
  .catch((e) => {
    console.error('Failed to init DB:', e);
    process.exit(1);
  });
