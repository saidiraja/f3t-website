// server/routes/content.js
import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  listTextsByPage,
  upsertText,
  updateTextById,
  deleteTextById
} from '../db.js';

const router = express.Router();

// Public: list texts by page
router.get('/public/texts', async (req, res) => {
  const page = (req.query.page || '').toString();
  const list = await listTextsByPage(page);
  res.json(list);
});

// Admin: upsert by page+key
router.post('/admin/texts', requireAuth, async (req, res) => {
  const { page, key, fr = '', en = '' } = req.body || {};
  if (!page || !key) return res.status(400).json({ error: 'page and key are required' });
  try {
    const item = await upsertText({ page, key, fr, en });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Save failed' });
  }
});

// Admin: update by id
router.put('/admin/texts/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const { fr = '', en = '' } = req.body || {};
  try {
    const item = await updateTextById(id, { fr, en });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Save failed' });
  }
});

// Admin: delete by id
router.delete('/admin/texts/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const ok = await deleteTextById(id);
    if (!ok) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true, id });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Delete failed' });
  }
});

export default router;
