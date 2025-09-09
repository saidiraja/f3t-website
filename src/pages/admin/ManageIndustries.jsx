import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function ManageIndustries() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name_fr:'', name_en:'', description_fr:'', description_en:'', image_url:'' });
  const load = () => api.getIndustries().then(setList);
  useEffect(load, []);

  const add = async () => { await api.addIndustry(form); setForm({ name_fr:'', name_en:'', description_fr:'', description_en:'', image_url:'' }); load(); };
  const update = async (id, item) => { await api.updateIndustry(id, item); load(); };
  const del = async (id) => { await api.deleteIndustry(id); load(); };

  return (
    <div>
      <h2>Industries</h2>
      <div style={{display:'grid', gap:8, gridTemplateColumns:'repeat(2,1fr)'}}>
        <input placeholder="Name FR" value={form.name_fr} onChange={e=>setForm({...form, name_fr:e.target.value})}/>
        <input placeholder="Name EN" value={form.name_en} onChange={e=>setForm({...form, name_en:e.target.value})}/>
        <input placeholder="Desc FR" value={form.description_fr} onChange={e=>setForm({...form, description_fr:e.target.value})}/>
        <input placeholder="Desc EN" value={form.description_en} onChange={e=>setForm({...form, description_en:e.target.value})}/>
        <input placeholder="Image URL" value={form.image_url} onChange={e=>setForm({...form, image_url:e.target.value})}/>
      </div>
      <button onClick={add} style={{marginTop:8}}>Add</button>

      <table style={{width:'100%', marginTop:16}}>
        <thead><tr><th>Name FR/EN</th><th>Image</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map(item => <Row key={item.id} item={item} onSave={(it)=>update(item.id, it)} onDelete={()=>del(item.id)} />)}
        </tbody>
      </table>
    </div>
  );
}

function Row({ item, onSave, onDelete }) {
  const [e, setE] = useState(item);
  return (
    <tr>
      <td>
        <input value={e.name_fr||''} onChange={ev=>setE({...e, name_fr:ev.target.value})}/>
        <input value={e.name_en||''} onChange={ev=>setE({...e, name_en:ev.target.value})}/>
      </td>
      <td><input value={e.image_url||''} onChange={ev=>setE({...e, image_url:ev.target.value})}/></td>
      <td><button onClick={()=>onSave(e)}>Save</button><button onClick={onDelete} style={{marginLeft:8}}>Delete</button></td>
    </tr>
  );
}
