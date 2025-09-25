import { useEffect, useState } from 'react';
import { createText, updateText, deleteText, listTexts } from '../api';
import { useAdmin } from './AdminContext';

const PAGES = ['home','about','services','industries','clients','news'];

export default function TextsAdmin() {
  useAdmin(); // ensure logged in via your existing guard

  const [page, setPage] = useState('home');
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ key:'', fr:'', en:'' });
  const [err, setErr] = useState('');

  const load = async (p=page) => {
    setErr('');
    try { setRows(await listTexts(p)); } catch(e){ setErr(e.message); }
  };
  useEffect(() => { load(page); }, [page]);

  async function add() {
    if (!form.key.trim()) return alert('Key is required');
    try {
      const created = await createText({ page, key: form.key.trim(), fr: form.fr, en: form.en });
      setRows(r => [...r, created].sort((a,b)=>a.key.localeCompare(b.key)));
      setForm({ key:'', fr:'', en:'' });
    } catch(e){ setErr(e.message); }
  }

  async function save(id, patch) {
    try {
      const updated = await updateText(id, patch);
      setRows(r => r.map(x => x.id === id ? updated : x));
    } catch(e){ setErr(e.message); }
  }

  async function remove(id) {
    if (!confirm('Delete this text?')) return;
    try {
      await deleteText(id);
      setRows(r => r.filter(x => x.id !== id));
    } catch(e){ setErr(e.message); }
  }

  return (
    <div>
      <h3>Page Texts</h3>
      {err && <p style={{color:'crimson'}}>{err}</p>}

      <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:12 }}>
        <label>Page:{' '}
          <select value={page} onChange={e=>setPage(e.target.value)}>
            {PAGES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
      </div>

      <section style={{ border:'1px solid #eee', padding:12, borderRadius:8, marginBottom:16 }}>
        <h4>New slot</h4>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          <input placeholder="key (e.g. hero.title)" value={form.key} onChange={e=>setForm({...form, key:e.target.value})}/>
          <input placeholder="EN text" value={form.en} onChange={e=>setForm({...form, en:e.target.value})}/>
          <textarea placeholder="FR texte" rows={3} value={form.fr} onChange={e=>setForm({...form, fr:e.target.value})}/>
        </div>
        <button onClick={add} style={{ marginTop:8 }}>Add</button>
      </section>

      <table border="1" cellPadding="8" style={{ width:'100%' }}>
        <thead><tr><th>Key</th><th>FR</th><th>EN</th><th>Actions</th></tr></thead>
        <tbody>
          {rows.map(r => <Row key={r.id} r={r} onSave={save} onDelete={()=>remove(r.id)} />)}
          {!rows.length && <tr><td colSpan={4}>No slots yet. Use the form above.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function Row({ r, onSave, onDelete }) {
  const [e, setE] = useState(r);
  return (
    <tr>
      <td style={{whiteSpace:'nowrap'}}>{r.key}</td>
      <td><textarea rows={3} value={e.fr||''} onChange={v=>setE({...e, fr:v.target.value})}/></td>
      <td><textarea rows={3} value={e.en||''} onChange={v=>setE({...e, en:v.target.value})}/></td>
      <td style={{whiteSpace:'nowrap'}}>
        <button onClick={()=>onSave(r.id, { fr:e.fr, en:e.en })}>Save</button>
        <button onClick={onDelete} style={{ marginLeft:8 }}>Delete</button>
      </td>
    </tr>
  );
}
