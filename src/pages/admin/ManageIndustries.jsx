// src/pages/admin/ManageIndustries.jsx
import { useEffect, useState } from 'react';
import { api } from '../../api';

const EMPTY = { name_fr:'', name_en:'', description_fr:'', description_en:'', image_url:'' };

export default function ManageIndustries() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [err, setErr] = useState('');

  const load = () => api.adminListIndustries().then(setList).catch(e=>setErr(e.message));
  useEffect(load, []);

  async function maybeUpload(selectedFile) {
    if (!selectedFile) return null;
    const up = await api.uploadFile(selectedFile);
    return up?.url || null;
  }

  const create = async () => {
    setErr('');
    try {
      const url = await maybeUpload(file);
      const created = await api.adminCreateIndustry({ ...form, image_url: url || form.image_url });
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
      const updated = await api.adminUpdateIndustry(id, { ...patch, image_url: url });
      setList(l => l.map(x => x.id === id ? updated : x));
    } catch (e) { setErr(e.message); }
  };

  const del = async (id) => {
    if (!confirm('Delete industry?')) return;
    setErr('');
    try {
      await api.adminDeleteIndustry(id);
      setList(l => l.filter(x => x.id !== id));
    } catch (e) { setErr(e.message); }
  };

  return (
    <div>
      <h2>Industries</h2>
      {err && <p style={{color:'crimson'}}>{err}</p>}

      <section style={{ border:'1px solid #ddd', padding:12, marginBottom:16 }}>
        <h4>New Industry</h4>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          <label>Name (FR) <input value={form.name_fr} onChange={e=>setForm({...form, name_fr:e.target.value})}/></label>
          <label>Name (EN) <input value={form.name_en} onChange={e=>setForm({...form, name_en:e.target.value})}/></label>
          <label>Description (FR) <textarea rows={3} value={form.description_fr} onChange={e=>setForm({...form, description_fr:e.target.value})}/></label>
          <label>Description (EN) <textarea rows={3} value={form.description_en} onChange={e=>setForm({...form, description_en:e.target.value})}/></label>
          <label>Image URL <input value={form.image_url} onChange={e=>setForm({...form, image_url:e.target.value})}/></label>
          <label>OR Upload <input type="file" onChange={e=>setFile(e.target.files?.[0] || null)}/></label>
        </div>
        <button onClick={create} style={{ marginTop:8 }}>Create</button>
      </section>

      <table border="1" cellPadding="8" style={{ width:'100%' }}>
        <thead><tr><th>ID</th><th>Name FR</th><th>Name EN</th><th>Image</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map(item => <Row key={item.id} item={item} onSave={save} onDelete={()=>del(item.id)} />)}
          {!list.length && <tr><td colSpan={5}>No industries yet.</td></tr>}
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
      <td><input value={e.name_fr||''} onChange={ev=>setE({...e, name_fr:ev.target.value})}/></td>
      <td><input value={e.name_en||''} onChange={ev=>setE({...e, name_en:ev.target.value})}/></td>
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
