// src/pages/admin/ManageServices.jsx
import { useEffect, useState } from 'react';
import { api } from '../../api';

const EMPTY = { unit:'', name_fr:'', name_en:'', description_fr:'', description_en:'' };

export default function ManageServices() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [err, setErr] = useState('');

  const load = () => api.adminListServices().then(setList).catch(e=>setErr(e.message));
  useEffect(load, []);

  const create = async () => {
    setErr('');
    try {
      const created = await api.adminCreateService(form);
      setForm(EMPTY);
      setList(l => [created, ...l]);
    } catch (e) { setErr(e.message); }
  };

  const save = async (id, patch) => {
    setErr('');
    try {
      const updated = await api.adminUpdateService(id, patch);
      setList(l => l.map(x => x.id === id ? updated : x));
    } catch (e) { setErr(e.message); }
  };

  const del = async (id) => {
    if (!confirm('Delete service?')) return;
    setErr('');
    try {
      await api.adminDeleteService(id);
      setList(l => l.filter(x => x.id !== id));
    } catch (e) { setErr(e.message); }
  };

  return (
    <div>
      <h2>Services</h2>
      {err && <p style={{color:'crimson'}}>{err}</p>}

      <section style={{ border:'1px solid #ddd', padding:12, marginBottom:16 }}>
        <h4>New Service</h4>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          <label>Unit <input value={form.unit} onChange={e=>setForm({...form, unit:e.target.value})}/></label>
          <label>Name (FR) <input value={form.name_fr} onChange={e=>setForm({...form, name_fr:e.target.value})}/></label>
          <label>Name (EN) <input value={form.name_en} onChange={e=>setForm({...form, name_en:e.target.value})}/></label>
          <label>Description (FR) <textarea rows={3} value={form.description_fr} onChange={e=>setForm({...form, description_fr:e.target.value})}/></label>
          <label>Description (EN) <textarea rows={3} value={form.description_en} onChange={e=>setForm({...form, description_en:e.target.value})}/></label>
        </div>
        <button onClick={create} style={{ marginTop:8 }}>Create</button>
      </section>

      <table border="1" cellPadding="8" style={{ width:'100%' }}>
        <thead><tr><th>ID</th><th>Unit</th><th>Name FR</th><th>Name EN</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map(item => <Row key={item.id} item={item} onSave={save} onDelete={()=>del(item.id)} />)}
          {!list.length && <tr><td colSpan={5}>No services yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function Row({ item, onSave, onDelete }) {
  const [edit, setEdit] = useState(item);
  return (
    <tr>
      <td>{item.id}</td>
      <td><input value={edit.unit||''} onChange={e=>setEdit({...edit, unit:e.target.value})}/></td>
      <td><input value={edit.name_fr||''} onChange={e=>setEdit({...edit, name_fr:e.target.value})}/></td>
      <td><input value={edit.name_en||''} onChange={e=>setEdit({...edit, name_en:e.target.value})}/></td>
      <td style={{whiteSpace:'nowrap'}}>
        <button onClick={()=>onSave(item.id, edit)}>Save</button>
        <button onClick={onDelete} style={{marginLeft:8}}>Delete</button>
      </td>
    </tr>
  );
}
