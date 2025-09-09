import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function ManageServices() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ unit:'', name_fr:'', name_en:'', description_fr:'', description_en:'' });

  const load = () => api.getServices().then(setList);
  useEffect(load, []);

  const add = async () => { await api.addService(form); setForm({ unit:'', name_fr:'', name_en:'', description_fr:'', description_en:'' }); load(); };
  const update = async (id, item) => { await api.updateService(id, item); load(); };
  const del = async (id) => { await api.deleteService(id); load(); };

  return (
    <div>
      <h2>Services</h2>
      <div style={{display:'grid', gap:8, gridTemplateColumns:'repeat(2,1fr)'}}>
        <input placeholder="Unit (e.g. Vacuum Heat Treatment Unit)" value={form.unit} onChange={e=>setForm({...form, unit:e.target.value})}/>
        <input placeholder="Name FR" value={form.name_fr} onChange={e=>setForm({...form, name_fr:e.target.value})}/>
        <input placeholder="Name EN" value={form.name_en} onChange={e=>setForm({...form, name_en:e.target.value})}/>
        <input placeholder="Desc FR" value={form.description_fr} onChange={e=>setForm({...form, description_fr:e.target.value})}/>
        <input placeholder="Desc EN" value={form.description_en} onChange={e=>setForm({...form, description_en:e.target.value})}/>
      </div>
      <button onClick={add} style={{marginTop:8}}>Add</button>

      <table style={{width:'100%', marginTop:16}}>
        <thead><tr><th>Unit</th><th>Name FR / EN</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map(item => <Row key={item.id} item={item} onSave={(it)=>update(item.id, it)} onDelete={()=>del(item.id)} />)}
        </tbody>
      </table>
    </div>
  );
}

function Row({ item, onSave, onDelete }) {
  const [edit, setEdit] = useState(item);
  return (
    <tr>
      <td><input value={edit.unit||''} onChange={e=>setEdit({...edit, unit:e.target.value})}/></td>
      <td>
        <input value={edit.name_fr||''} onChange={e=>setEdit({...edit, name_fr:e.target.value})}/>
        <input value={edit.name_en||''} onChange={e=>setEdit({...edit, name_en:e.target.value})}/>
      </td>
      <td>
        <button onClick={()=>onSave(edit)}>Save</button>
        <button onClick={onDelete} style={{marginLeft:8}}>Delete</button>
      </td>
    </tr>
  );
}
