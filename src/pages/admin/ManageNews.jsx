import { useEffect, useState } from 'react';
import { api } from '../../api';

const EMPTY = { title_fr:'', title_en:'', body_fr:'', body_en:'', image_url:'' };

export default function ManageNews() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [err, setErr] = useState('');

  const load = () => api.adminListNews().then(setList).catch(e=>setErr(e.message));
  useEffect(load, []);

  async function maybeUpload() {
    if (!file) return null;
    const up = await api.uploadFile(file);
    return up?.url || null;
  }

  const create = async () => {
    setErr('');
    try {
      const url = await maybeUpload();
      const created = await api.adminCreateNews({ ...form, image_url: url || form.image_url });
      setForm(EMPTY);
      setFile(null);
      setList(l => [created, ...l]);
    } catch (e) { setErr(e.message); }
  };

  const save = async (id, patch, newFile) => {
    setErr('');
    try {
      let url = patch.image_url || '';
      if (newFile) {
        const up = await api.uploadFile(newFile);
        url = up?.url || url;
      }
      const updated = await api.adminUpdateNews(id, { ...patch, image_url: url });
      setList(l => l.map(x => x.id === id ? updated : x));
    } catch (e) { setErr(e.message); }
  };

  const del = async (id) => {
    if (!confirm('Delete news item?')) return;
    setErr('');
    try {
      await api.adminDeleteNews(id);
      setList(l => l.filter(x => x.id !== id));
    } catch (e) { setErr(e.message); }
  };

  return (
    <div>
      <h2>News</h2>
      {err && <p style={{color:'crimson'}}>{err}</p>}

      <section style={{ border:'1px solid #ddd', padding:12, marginBottom:16 }}>
        <h4>New Article</h4>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          <label>Title (FR) <input value={form.title_fr} onChange={e=>setForm({...form, title_fr:e.target.value})}/></label>
          <label>Title (EN) <input value={form.title_en} onChange={e=>setForm({...form, title_en:e.target.value})}/></label>
          <label>Body (FR) <textarea rows={3} value={form.body_fr} onChange={e=>setForm({...form, body_fr:e.target.value})}/></label>
          <label>Body (EN) <textarea rows={3} value={form.body_en} onChange={e=>setForm({...form, body_en:e.target.value})}/></label>
          <label>Image URL <input value={form.image_url} onChange={e=>setForm({...form, image_url:e.target.value})}/></label>
          <label>OR Upload <input type="file" onChange={e=>setFile(e.target.files?.[0] || null)}/></label>
        </div>
        <button onClick={create} style={{ marginTop:8 }}>Create</button>
      </section>

      <table border="1" cellPadding="8" style={{ width:'100%' }}>
        <thead><tr><th>ID</th><th>Title FR</th><th>Title EN</th><th>Image</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map(item => <Row key={item.id} item={item} onSave={save} onDelete={()=>del(item.id)} />)}
          {!list.length && <tr><td colSpan={5}>No news yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function Row({ item, onSave, onDelete }) {
  const [e, setE] = useState(item);
  const [file, setFile] = useState(null);
  return (
    <tr>
      <td>{item.id}</td>
      <td><input value={e.title_fr||''} onChange={ev=>setE({...e, title_fr:ev.target.value})}/></td>
      <td><input value={e.title_en||''} onChange={ev=>setE({...e, title_en:ev.target.value})}/></td>
      <td style={{maxWidth:220}}>
        <input value={e.image_url||''} onChange={ev=>setE({...e, image_url:ev.target.value})}/>
        <div style={{marginTop:6}}><input type="file" onChange={ev=>setFile(ev.target.files?.[0] || null)} /></div>
      </td>
      <td style={{whiteSpace:'nowrap'}}>
        <button onClick={()=>onSave(item.id, e, file)}>Save</button>
        <button onClick={onDelete} style={{marginLeft:8}}>Delete</button>
      </td>
    </tr>
  );
}
