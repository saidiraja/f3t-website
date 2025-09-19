// server/routes/content.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { db, nextId } from '../db.js';          // ✅ named import (not default)
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// ---------- uploads ----------
const uploadDir = path.join(process.cwd(), 'server', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const safe = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, safe);
  }
});
const upload = multer({ storage });

router.post('/admin/upload', requireAuth, upload.single('file'), (req, res) => {
  // public URL served by index.js: app.use('/uploads', express.static(...))
  res.json({ url: `/uploads/${req.file.filename}` });
});

// ---------- HOME ----------
router.get('/public/home', async (_req, res) => {
  await db.read();
  res.json(db.data.home);
});
router.put('/admin/home', requireAuth, async (req, res) => {
  await db.read();
  const { title_fr, title_en, intro_fr, intro_en } = req.body;
  db.data.home = {
    ...db.data.home,
    title_fr: title_fr ?? '',
    title_en: title_en ?? '',
    intro_fr: intro_fr ?? '',
    intro_en: intro_en ?? '',
    updated_at: new Date().toISOString()
  };
  await db.write();
  res.json({ ok: true });
});

// ---------- ABOUT ----------
router.get('/public/about', async (_req, res) => {
  await db.read();
  res.json(db.data.about);
});
router.put('/admin/about', requireAuth, async (req, res) => {
  await db.read();
  const { mission_fr, mission_en, vision_fr, vision_en, values_fr, values_en } = req.body;
  db.data.about = {
    ...db.data.about,
    mission_fr: mission_fr ?? '',
    mission_en: mission_en ?? '',
    vision_fr: vision_fr ?? '',
    vision_en: vision_en ?? '',
    values_fr: values_fr ?? '',
    values_en: values_en ?? '',
    updated_at: new Date().toISOString()
  };
  await db.write();
  res.json({ ok: true });
});

// ---------- generic CRUD helpers ----------
function list(col) {
  return async (_req, res) => {
    await db.read();
    res.json(db.data[col].slice().sort((a, b) => (b.id || 0) - (a.id || 0)));
  };
}
function create(col, pick) {
  return async (req, res) => {
    await db.read();
    const obj = pick(req.body);
    obj.id = nextId(col);
    db.data[col].push(obj);
    await db.write();
    res.json({ id: obj.id });
  };
}
function update(col, pick) {
  return async (req, res) => {
    await db.read();
    const id = Number(req.params.id);
    const idx = db.data[col].findIndex(x => x.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    db.data[col][idx] = { ...db.data[col][idx], ...pick(req.body) };
    await db.write();
    res.json({ ok: true });
  };
}
function del(col) {
  return async (req, res) => {
    await db.read();
    const id = Number(req.params.id);
    db.data[col] = db.data[col].filter(x => x.id !== id);
    await db.write();
    res.json({ ok: true });
  };
}

// ---------- SERVICES ----------
router.get('/public/services', list('services'));
router.post('/admin/services', requireAuth, create('services', (b) => ({
  unit: b.unit || '',
  name_fr: b.name_fr || '',
  name_en: b.name_en || '',
  description_fr: b.description_fr || '',
  description_en: b.description_en || ''
})));
router.put('/admin/services/:id', requireAuth, update('services', (b) => ({
  unit: b.unit ?? undefined,
  name_fr: b.name_fr ?? undefined,
  name_en: b.name_en ?? undefined,
  description_fr: b.description_fr ?? undefined,
  description_en: b.description_en ?? undefined
})));
router.delete('/admin/services/:id', requireAuth, del('services'));

// ---------- INDUSTRIES ----------
router.get('/public/industries', list('industries'));
router.post('/admin/industries', requireAuth, create('industries', (b) => ({
  name_fr: b.name_fr || '',
  name_en: b.name_en || '',
  description_fr: b.description_fr || '',
  description_en: b.description_en || '',
  image_url: b.image_url || ''
})));
router.put('/admin/industries/:id', requireAuth, update('industries', (b) => ({
  name_fr: b.name_fr ?? undefined,
  name_en: b.name_en ?? undefined,
  description_fr: b.description_fr ?? undefined,
  description_en: b.description_en ?? undefined,
  image_url: b.image_url ?? undefined
})));
router.delete('/admin/industries/:id', requireAuth, del('industries'));

// ---------- CERTIFICATIONS ----------
router.get('/public/certifications', list('certifications'));
router.post('/admin/certifications', requireAuth, create('certifications', (b) => ({
  name: b.name || ''
})));
router.put('/admin/certifications/:id', requireAuth, update('certifications', (b) => ({
  name: b.name ?? undefined
})));
router.delete('/admin/certifications/:id', requireAuth, del('certifications'));

// ---------- CLIENTS ----------
router.get('/public/clients', list('clients'));
router.post('/admin/clients', requireAuth, create('clients', (b) => ({
  name: b.name || '',
  logo_url: b.logo_url || ''
})));
router.put('/admin/clients/:id', requireAuth, update('clients', (b) => ({
  name: b.name ?? undefined,
  logo_url: b.logo_url ?? undefined
})));
router.delete('/admin/clients/:id', requireAuth, del('clients'));

// ---------- NEWS ----------
router.get('/public/news', list('news'));
router.post('/admin/news', requireAuth, create('news', (b) => ({
  title_fr: b.title_fr || '',
  title_en: b.title_en || '',
  body_fr: b.body_fr || '',
  body_en: b.body_en || '',
  image_url: b.image_url || '',
  created_at: new Date().toISOString()
})));
router.put('/admin/news/:id', requireAuth, update('news', (b) => ({
  title_fr: b.title_fr ?? undefined,
  title_en: b.title_en ?? undefined,
  body_fr: b.body_fr ?? undefined,
  body_en: b.body_en ?? undefined,
  image_url: b.image_url ?? undefined
})));
router.delete('/admin/news/:id', requireAuth, del('news'));

export default router;
