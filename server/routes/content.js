import express from 'express';
import multer from 'multer';
import path from 'path';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// ---------- uploads ----------
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, 'uploads'),
  filename: (_, file, cb) => {
    const safe = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, safe);
  }
});
const upload = multer({ storage });

// Publicly serve uploads in index.js

router.post('/admin/upload', requireAuth, upload.single('file'), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});

// ---------- HOME (singleton) ----------
router.get('/public/home', (req, res) => {
  const row = db.prepare(`SELECT * FROM home WHERE id=1`).get();
  res.json(row);
});
router.put('/admin/home', requireAuth, (req, res) => {
  const { title_fr, title_en, intro_fr, intro_en } = req.body;
  db.prepare(`UPDATE home SET title_fr=?, title_en=?, intro_fr=?, intro_en=?, updated_at=datetime('now') WHERE id=1`)
    .run(title_fr ?? '', title_en ?? '', intro_fr ?? '', intro_en ?? '');
  res.json({ ok: true });
});

// ---------- ABOUT (singleton) ----------
router.get('/public/about', (req, res) => {
  const row = db.prepare(`SELECT * FROM about WHERE id=1`).get();
  res.json(row);
});
router.put('/admin/about', requireAuth, (req, res) => {
  const { mission_fr, mission_en, vision_fr, vision_en, values_fr, values_en } = req.body;
  db.prepare(`
    UPDATE about SET mission_fr=?, mission_en=?, vision_fr=?, vision_en=?, values_fr=?, values_en=?, updated_at=datetime('now')
    WHERE id=1
  `).run(mission_fr ?? '', mission_en ?? '', vision_fr ?? '', vision_en ?? '', values_fr ?? '', values_en ?? '');
  res.json({ ok: true });
});

// ---------- generic helpers ----------
function crudList(table) {
  return {
    list: () => db.prepare(`SELECT * FROM ${table} ORDER BY id DESC`).all(),
    get: (id) => db.prepare(`SELECT * FROM ${table} WHERE id=?`).get(id),
    create: (cols, vals) => {
      const placeholders = cols.map(() => '?').join(', ');
      const stmt = db.prepare(`INSERT INTO ${table} (${cols.join(',')}) VALUES (${placeholders})`);
      const info = stmt.run(...vals);
      return { id: info.lastInsertRowid };
    },
    update: (cols, vals, id) => {
      const sets = cols.map(c => `${c}=?`).join(', ');
      const stmt = db.prepare(`UPDATE ${table} SET ${sets} WHERE id=?`);
      stmt.run(...vals, id);
    },
    del: (id) => db.prepare(`DELETE FROM ${table} WHERE id=?`).run(id)
  };
}

// ---------- SERVICES ----------
const S = crudList('services');
router.get('/public/services', (req, res) => res.json(S.list()));
router.post('/admin/services', requireAuth, (req, res) => {
  const { unit, name_fr, name_en, description_fr, description_en } = req.body;
  const row = S.create(['unit','name_fr','name_en','description_fr','description_en'],
                       [unit||'', name_fr||'', name_en||'', description_fr||'', description_en||'']);
  res.json(row);
});
router.put('/admin/services/:id', requireAuth, (req, res) => {
  const { unit, name_fr, name_en, description_fr, description_en } = req.body;
  S.update(['unit','name_fr','name_en','description_fr','description_en'],
           [unit||'', name_fr||'', name_en||'', description_fr||'', description_en||''], req.params.id);
  res.json({ ok: true });
});
router.delete('/admin/services/:id', requireAuth, (req, res) => { S.del(req.params.id); res.json({ ok: true }); });

// ---------- INDUSTRIES ----------
const I = crudList('industries');
router.get('/public/industries', (req, res) => res.json(I.list()));
router.post('/admin/industries', requireAuth, (req, res) => {
  const { name_fr, name_en, description_fr, description_en, image_url } = req.body;
  const row = I.create(['name_fr','name_en','description_fr','description_en','image_url'],
                       [name_fr||'', name_en||'', description_fr||'', description_en||'', image_url||'']);
  res.json(row);
});
router.put('/admin/industries/:id', requireAuth, (req, res) => {
  const { name_fr, name_en, description_fr, description_en, image_url } = req.body;
  I.update(['name_fr','name_en','description_fr','description_en','image_url'],
           [name_fr||'', name_en||'', description_fr||'', description_en||'', image_url||''], req.params.id);
  res.json({ ok: true });
});
router.delete('/admin/industries/:id', requireAuth, (req, res) => { I.del(req.params.id); res.json({ ok: true }); });

// ---------- CERTIFICATIONS ----------
const C = crudList('certifications');
router.get('/public/certifications', (req, res) => res.json(C.list()));
router.post('/admin/certifications', requireAuth, (req, res) => {
  const row = C.create(['name'], [req.body.name||'']); res.json(row);
});
router.put('/admin/certifications/:id', requireAuth, (req, res) => {
  C.update(['name'], [req.body.name||''], req.params.id); res.json({ ok: true });
});
router.delete('/admin/certifications/:id', requireAuth, (req, res) => { C.del(req.params.id); res.json({ ok: true }); });

// ---------- CLIENTS ----------
const CL = crudList('clients');
router.get('/public/clients', (req, res) => res.json(CL.list()));
router.post('/admin/clients', requireAuth, (req, res) => {
  const row = CL.create(['name','logo_url'], [req.body.name||'', req.body.logo_url||'']); res.json(row);
});
router.put('/admin/clients/:id', requireAuth, (req, res) => {
  CL.update(['name','logo_url'], [req.body.name||'', req.body.logo_url||''], req.params.id); res.json({ ok: true });
});
router.delete('/admin/clients/:id', requireAuth, (req, res) => { CL.del(req.params.id); res.json({ ok: true }); });

// ---------- NEWS ----------
const N = crudList('news');
router.get('/public/news', (req, res) => res.json(N.list()));
router.post('/admin/news', requireAuth, (req, res) => {
  const { title_fr, title_en, body_fr, body_en, image_url } = req.body;
  const row = N.create(['title_fr','title_en','body_fr','body_en','image_url'],
                       [title_fr||'', title_en||'', body_fr||'', body_en||'', image_url||'']);
  res.json(row);
});
router.put('/admin/news/:id', requireAuth, (req, res) => {
  const { title_fr, title_en, body_fr, body_en, image_url } = req.body;
  N.update(['title_fr','title_en','body_fr','body_en','image_url'],
           [title_fr||'', title_en||'', body_fr||'', body_en||'', image_url||''], req.params.id);
  res.json({ ok: true });
});
router.delete('/admin/news/:id', requireAuth, (req, res) => { N.del(req.params.id); res.json({ ok: true }); });

export default router;
