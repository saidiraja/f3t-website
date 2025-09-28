// server/routes/content.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { db, nextId } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  homeSchema, aboutSchema,
  serviceCreate, serviceUpdate,
  industryCreate, industryUpdate,
  certificationCreate, certificationUpdate,
  clientCreate, clientUpdate,
  newsCreate, newsUpdate,
  textCreate, textUpdate,
  blockItemCreate, blockItemUpdate
} from '../schemas.js';

const router = express.Router();

// ---------- utils ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function cleanUndefined(obj) {
  const out = {};
  Object.keys(obj || {}).forEach(k => {
    if (obj[k] !== undefined) out[k] = obj[k];
  });
  return out;
}
function sortForList(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.slice().sort((a, b) => {
    const ao = typeof a.order === 'number' ? a.order : null;
    const bo = typeof b.order === 'number' ? b.order : null;
    if (ao !== null || bo !== null) return (ao ?? 1e9) - (bo ?? 1e9);
    const ac = a?.created_at ? Date.parse(a.created_at) || 0 : 0;
    const bc = b?.created_at ? Date.parse(b.created_at) || 0 : 0;
    if (ac !== 0 || bc !== 0) return bc - ac;
    return (b.id || 0) - (a.id || 0);
  });
}

// ---------- uploads ----------
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const safeName =
      Date.now() +
      '-' +
      file.originalname
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w.\-]+/g, '_');
    cb(null, safeName);
  }
});
const upload = multer({ storage });

router.post('/admin/upload', requireAuth, upload.single('file'), (req, res) => {
  res.json({
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
    size: req.file.size,
    mimetype: req.file.mimetype
  });
});

// ---------- HOME (single object) ----------
router.get('/public/home', async (_req, res) => { await db.read(); res.json(db.data.home); });
router.put('/admin/home', requireAuth, validate(homeSchema), async (req, res) => {
  await db.read();
  db.data.home = { ...db.data.home, ...cleanUndefined(req.body), updated_at: new Date().toISOString() };
  await db.write();
  res.json(db.data.home);
});

// ---------- ABOUT (single object) ----------
router.get('/public/about', async (_req, res) => { await db.read(); res.json(db.data.about); });
router.put('/admin/about', requireAuth, validate(aboutSchema), async (req, res) => {
  await db.read();
  db.data.about = { ...db.data.about, ...cleanUndefined(req.body), updated_at: new Date().toISOString() };
  await db.write();
  res.json(db.data.about);
});

// ---------- generic CRUD for arrays ----------
function list(col){ return async(_req,res)=>{ await db.read(); res.json(sortForList(db.data[col]||[])); }; }
function getOne(col){ return async(req,res)=>{ await db.read(); const id=Number(req.params.id); const item=(db.data[col]||[]).find(x=>Number(x.id)===id); if(!item)return res.status(404).json({error:'Not found'}); res.json(item); }; }
function create(col, schema){ return async(req,res)=>{ await db.read(); const now=new Date().toISOString(); const payload=cleanUndefined(schema.parse(req.body||{})); const item={ id:nextId(col), ...payload, created_at:now, updated_at:now }; db.data[col].push(item); await db.write(); res.status(201).json(item); }; }
function update(col, schema){ return async(req,res)=>{ await db.read(); const id=Number(req.params.id); const idx=db.data[col].findIndex(x=>Number(x.id)===id); if(idx===-1)return res.status(404).json({error:'Not found'}); const partial=cleanUndefined(schema.parse(req.body||{})); const updated={ ...db.data[col][idx], ...partial, updated_at:new Date().toISOString() }; db.data[col][idx]=updated; await db.write(); res.json(updated); }; }
function remove(col){ return async(req,res)=>{ await db.read(); const id=Number(req.params.id); const before=db.data[col].length; db.data[col]=db.data[col].filter(x=>Number(x.id)!==id); if(db.data[col].length===before)return res.status(404).json({error:'Not found'}); await db.write(); res.json({ok:true,id}); }; }

// ---------- SERVICES ----------
router.get('/public/services', list('services'));
router.get('/public/services/:id', getOne('services'));
router.post('/admin/services', requireAuth, create('services', serviceCreate));
router.put('/admin/services/:id', requireAuth, update('services', serviceUpdate));
router.delete('/admin/services/:id', requireAuth, remove('services'));

// ---------- INDUSTRIES ----------
router.get('/public/industries', list('industries'));
router.get('/public/industries/:id', getOne('industries'));
router.post('/admin/industries', requireAuth, create('industries', industryCreate));
router.put('/admin/industries/:id', requireAuth, update('industries', industryUpdate));
router.delete('/admin/industries/:id', requireAuth, remove('industries'));

// ---------- CERTIFICATIONS ----------
router.get('/public/certifications', list('certifications'));
router.get('/public/certifications/:id', getOne('certifications'));
router.post('/admin/certifications', requireAuth, create('certifications', certificationCreate));
router.put('/admin/certifications/:id', requireAuth, update('certifications', certificationUpdate));
router.delete('/admin/certifications/:id', requireAuth, remove('certifications'));

// ---------- CLIENTS ----------
router.get('/public/clients', list('clients'));
router.get('/public/clients/:id', getOne('clients'));
router.post('/admin/clients', requireAuth, create('clients', clientCreate));
router.put('/admin/clients/:id', requireAuth, update('clients', clientUpdate));
router.delete('/admin/clients/:id', requireAuth, remove('clients'));

// ---------- NEWS ----------
router.get('/public/news', list('news'));
router.get('/public/news/:id', getOne('news'));
router.post('/admin/news', requireAuth, create('news', newsCreate));
router.put('/admin/news/:id', requireAuth, update('news', newsUpdate));
router.delete('/admin/news/:id', requireAuth, remove('news'));

// ========== TEXT SLOTS (page key-value) ==========

// public: list by page
router.get('/public/texts', async (req, res) => {
  await db.read();
  const page = (req.query.page || '').toString();
  const items = (db.data.texts || []).filter(t => t.page === page);
  res.json(items.sort((a,b) => a.key.localeCompare(b.key)));
});

// admin: create OR update (idempotent upsert by page+key)
router.post('/admin/texts', requireAuth, validate(textCreate), async (req, res) => {
  await db.read();
  const { page, key, fr = '', en = '' } = req.body;
  const now = new Date().toISOString();
  const existing = db.data.texts.find(t => t.page === page && t.key === key);
  if (existing) {
    existing.fr = fr;
    existing.en = en;
    existing.updated_at = now;
    await db.write();
    return res.json(existing); // 200 OK on upsert
  }
  const item = { id: nextId('texts'), page, key, fr, en, created_at: now, updated_at: now };
  db.data.texts.push(item);
  await db.write();
  res.status(201).json(item);
});

// admin: update text by id
router.put('/admin/texts/:id', requireAuth, validate(textUpdate), async (req, res) => {
  await db.read();
  const id = Number(req.params.id);
  const idx = db.data.texts.findIndex(t => Number(t.id) === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const partial = cleanUndefined(req.body);
  db.data.texts[idx] = { ...db.data.texts[idx], ...partial, updated_at: new Date().toISOString() };
  await db.write();
  res.json(db.data.texts[idx]);
});

// admin: delete text by id
router.delete('/admin/texts/:id', requireAuth, async (req, res) => {
  await db.read();
  const id = Number(req.params.id);
  const before = db.data.texts.length;
  db.data.texts = db.data.texts.filter(t => Number(t.id) !== id);
  if (db.data.texts.length === before) return res.status(404).json({ error: 'Not found' });
  await db.write();
  res.json({ ok: true, id });
});

// ========== BLOCKS (page named arrays) ==========

// public: list by page+name
router.get('/public/blocks', async (req, res) => {
  await db.read();
  const page = (req.query.page || '').toString();
  const name = (req.query.name || '').toString();
  const items = (db.data.blocks || []).filter(b => b.page === page && b.name === name);
  res.json(sortForList(items));
});

// admin: create block item
router.post('/admin/blocks', requireAuth, validate(blockItemCreate), async (req, res) => {
  await db.read();
  const now = new Date().toISOString();
  const { page, name, fr = '', en = '', image_url = '', order } = req.body || {};
  const same = db.data.blocks.filter(b => b.page === page && b.name === name && typeof b.order === 'number');
  const maxOrder = Math.max(-1, ...same.map(b => b.order));
  const item = { id: nextId('blocks'), page, name, fr, en, image_url, order: (order ?? (maxOrder + 1)), created_at: now, updated_at: now };
  db.data.blocks.push(item);
  await db.write();
  res.status(201).json(item);
});

// admin: update block item
router.put('/admin/blocks/:id', requireAuth, validate(blockItemUpdate), async (req, res) => {
  await db.read();
  const id = Number(req.params.id);
  const idx = db.data.blocks.findIndex(b => Number(b.id) === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const partial = cleanUndefined(req.body);
  db.data.blocks[idx] = { ...db.data.blocks[idx], ...partial, updated_at: new Date().toISOString() };
  await db.write();
  res.json(db.data.blocks[idx]);
});

// admin: delete block item
router.delete('/admin/blocks/:id', requireAuth, async (req, res) => {
  await db.read();
  const id = Number(req.params.id);
  const before = db.data.blocks.length;
  db.data.blocks = db.data.blocks.filter(b => Number(b.id) !== id);
  if (db.data.blocks.length === before) return res.status(404).json({ error: 'Not found' });
  await db.write();
  res.json({ ok: true, id });
});

export default router;
