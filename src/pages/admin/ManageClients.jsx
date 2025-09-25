import { useEffect, useState } from 'react';
import { api } from '../../api';

const EMPTY = { name:'', logo_url:'' };

export default function ManageClients() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [err, setErr] = useState('');

  const load = () => api.adminListClients().then(setList).catch(e=>setErr(e.message));
  useEffect(load, []);

  const create = async () => {
    setErr('');
    try {
      const created = await api.adminCreateClient(form);
      setForm(EMPTY);
      setList(l => [created, ...l]);
    } catch (e) { setErr(e.message); }
  };

  const save = async (id, patch) => {
    setErr('');
    try {
      const updated = await api.adminUpdateClient(id, patch);
      setList(l => l.map(x => x.id === id ? updated : x));
    } catch (e) { setErr(e.message); }
  };

  const del = async (id) => {
    if (!confirm('Delete client?')) return;
    setErr('');
    try {
      await api.adminDeleteClient(id);
      setList(l => l.filter(x => x.id !== id));
    } catch (e) { setErr(e.message); }
  };

  return (
    <div>
      <h2>Clients</h2>
      {err && <p style={{color:'crimson'}}>{err}</p>}

      <section style={{ border:'1px solid #ddd', padding:12, marginBottom:16 }}>
        <h4>New Client</h4>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          <label>Name <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/></label>
          <label>Logo URL <input value={form.logo_url} onChange={e=>setForm({...form, logo_url:e.target.value})}/></label>
        </div>
        <button onClick={create} style={{ marginTop:8 }}>Create</button>
      </section>

      <table border="1" cellPadding="8" style={{ width:'100%' }}>
        <thead><tr><th>ID</th><th>Name</th><th>Logo URL</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map(item => <Row key={item.id} item={item} onSave={save} onDelete={()=>del(item.id)} />)}
          {!list.length && <tr><td colSpan={4}>No clients yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function Row({ item, onSave, onDelete }) {
  const [e, setE] = useState(item);
  return (
    <tr>
      <td>{item.id}</td>
      <td><input value={e.name||''} onChange={ev=>setE({...e, name:ev.target.value})}/></td>
      <td><input value={e.logo_url||''} onChange={ev=>setE({...e, logo_url:ev.target.value})}/></td>
      <td style={{whiteSpace:'nowrap'}}>
        <button onClick={()=>onSave(item.id, e)}>Save</button>
        <button onClick={onDelete} style={{marginLeft:8}}>Delete</button>
      </td>
    </tr>
  );
}
