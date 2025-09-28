// server/routes/content.js
import express from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Public: list texts by page
router.get('/public/texts', async (req, res) => {
  const page = (req.query.page || '').toString();
  const { rows } = await pool.query(
    `SELECT id, page, "key", fr, en, updated_at FROM texts WHERE page = $1 ORDER BY "key" ASC`,
    [page]
  );
  res.json(rows);
});

// Admin: upsert a text (page + key)
router.post('/admin/texts', requireAuth, async (req, res) => {
  const { page, key, fr = '', en = '' } = req.body || {};
  if (!page || !key) return res.status(400).json({ error: 'page and key are required' });

  const { rows } = await pool.query(
    `INSERT INTO texts (page, "key", fr, en)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (page, "key")
     DO UPDATE SET fr = EXCLUDED.fr, en = EXCLUDED.en, updated_at = now()
     RETURNING id, page, "key", fr, en, updated_at`,
    [page, key, fr, en]
  );
  res.json(rows[0]); // 200 OK on upsert
});

// Admin: update by id
router.put('/admin/texts/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const { fr = '', en = '' } = req.body || {};
  const { rows } = await pool.query(
    `UPDATE texts SET fr = $1, en = $2, updated_at = now() WHERE id = $3
     RETURNING id, page, "key", fr, en, updated_at`,
    [fr, en, id]
  );
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

// Admin: delete by id
router.delete('/admin/texts/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const { rowCount } = await pool.query(`DELETE FROM texts WHERE id = $1`, [id]);
  if (!rowCount) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true, id });
});

export default router;
