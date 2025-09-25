// src/pages/admin/ManageCertifications.jsx
import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function ManageCertifications() {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const [err, setErr] = useState('');

  const load = () => api.adminListCertifications().then(setList).catch(e=>setErr(e.message));
  useEffect(load, []);

  const add = async () => {
    setErr('');
    try {
      const created = await api.adminCreateCertification({ name });
      setName('');
      setList(l => [created, ...l]);
    } catch (e) { setErr(e.message); }
  };

  const save = async (id, patch) => {
    setErr('');
    try {
      const updated = await api.adminUpdateCertification(id, patch);
      setList(l => l.map(x => x.id === id ? updated : x));
    } catch (e) { setErr(e.message); }
  };

  const del = async (id) => {
    if (!confirm('Delete certification?')) return;
    setErr('');
    try {
      await api.adminDeleteCertification(id);
      setList(l => l.filter(x => x.id !== id));
    } catch (e) { setErr(e.message); }
  };

  return (
    <div>
      <h2>Certifications</h2>
      {err && <p style={{color:'crimson'}}>{err}</p>}

      <section style={{ border:'1px solid #ddd', padding:12, marginBottom:16 }}>
        <h4>New Certification</h4>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Certification name" />
        <button onClick={add} style={{ marginLeft:8 }}>Add</button>
      </section>

      <table border="1" cellPadding="8" style={{ width:'100%' }}>
        <thead><tr><th>ID</th><th>Name</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map(item => <Row key={item.id} item={item} onSave={save} onDelete={()=>del(item.id)} />)}
          {!list.length && <tr><td colSpan={3}>No certifications yet.</td></tr>}
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
      <td style={{whiteSpace:'nowrap'}}>
        <button onClick={()=>onSave(item.id, e)}>Save</button>
        <button onClick={onDelete} style={{marginLeft:8}}>Delete</button>
      </td>
    </tr>
  );
}
