import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function ManageClients() {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);

  const load = () => api.getClients().then(setList);
  useEffect(load, []);

  const add = async () => {
    let logo_url = '';
    if (file) { const up = await api.upload(file); logo_url = up.url; }
    await api.addClient({ name, logo_url });
    setName(''); setFile(null); load();
  };

  const save = async (id, row) => { await api.updateClient(id, row); load(); };
  const del = async (id) => { await api.deleteClient(id); load(); };

  return (
    <div>
      <h2>Clients</h2>
      <div style={{display:'flex', gap:8, alignItems:'center'}}>
        <input placeholder="Client name" value={name} onChange={e=>setName(e.target.value)} />
        <input type="file" onChange={e=>setFile(e.target.files[0])}/>
        <button onClick={add}>Add</button>
      </div>
      <table style={{width:'100%', marginTop:16}}>
        <thead><tr><th>Logo</th><th>Name</th><th>Logo URL</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map(c => <Row key={c.id} c={c} onSave={save} onDelete={del} />)}
        </tbody>
      </table>
    </div>
  );
}

function Row({ c, onSave, onDelete }) {
  const [e, setE] = useState(c);
  return (
    <tr>
      <td>{e.logo_url && <img src={e.logo_url} alt={e.name} style={{height:36}} />}</td>
      <td><input value={e.name||''} onChange={ev=>setE({...e, name:ev.target.value})}/></td>
      <td><input value={e.logo_url||''} onChange={ev=>setE({...e, logo_url:ev.target.value})}/></td>
      <td>
        <button onClick={()=>onSave(e.id, e)}>Save</button>
        <button onClick={()=>onDelete(e.id)} style={{marginLeft:8}}>Delete</button>
      </td>
    </tr>
  );
}
