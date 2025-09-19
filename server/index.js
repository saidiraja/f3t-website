// server/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { initDB, ensureAdminSeed } from './db.js';
import authRouter from './routes/auth.js';
import contentRouter from './routes/content.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// 1) Initialize LowDB and seed admin (must come BEFORE routes)
await initDB();
ensureAdminSeed({
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
});

// 2) Middlewares
app.use(cors({
  origin: (origin, cb) => cb(null, true),     // allow http://localhost:5173, 127.0.0.1, LAN, etc.
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.options('*', cors()); // handle preflight

app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// 3) Static uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
app.use('/uploads', express.static(uploadsDir));

// 4) Routes
app.use('/api', authRouter);
app.use('/api', contentRouter);

// 5) Health
app.get('/', (_, res) => res.json({ ok: true, service: 'F3T CMS API (LowDB)' }));

// 6) Start
app.listen(PORT, () => console.log(`CMS server running on :${PORT}`));
