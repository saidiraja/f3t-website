import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function ManageNews() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title_fr:'', title_en:'', body_fr:'', body_en:'', image_url:'' });
  const [file, setFile] = useState(null);
  const load = () => api.getNews().then(setList);
  useEffect(load, []);

  const add = async () => {
    let image_url = form.image_url;
    if (file) { const up = await api.upload(file); image_url = up.url; }
    await api.addNews({ ...form, image_url });
    setForm({ title_fr:'', title_en:'', body_fr:'', body_en:'', image_url:'' }); setFile(null); load();
  };
  const save = async (id, row) => { await api.updateNews(id, row); load(); };
  const del = async (id) => { await api.deleteNews(id); load(); };

  return (
    <div>
      <h2>News</h2>
      <div style={{display:'grid', gap:8}}>
        <input placeholder="Title FR" value={form.title_fr} onChange={e=>setForm({...form, title_fr:e.target.value})}/>
        <input placeholder="Title EN" value={form.title_en} onChange={e=>setForm({...form, title_en:e.target.value})}/>
        <textarea placeholder="Body FR" rows={3} value={form.body_fr} onChange={e=>setForm({...form, body_fr:e.target.value})}/>
        <textarea placeholder="Body EN" rows={3} value={form.body_en} onChange={e=>setForm({...form, body_en:e.target.value})}/>
        <input placeholder="Image URL (optional)" value={form.image_url} onChange={e=>setForm({...form, image_url:e.target.value})}/>
        <div><input type="file" onChange={e=>setFile(e.target.files[0])}/> <button onClick={add}>Add post</button></div>
      </div>

      <ul style={{marginTop:16, display:'grid', gap:12}}>
        {list.map(n => <NewsItem key={n.id} n={n} onSave={save} onDelete={del} />)}
      </ul>
    </div>
  );
}

function NewsItem({ n, onSave, onDelete }) {
  const [e, setE] = useState(n);
  return (
    <li style={{border:'1px solid #ddd', borderRadius:8, padding:12}}>
      {e.image_url && <img src={e.image_url} alt="" style={{maxHeight:120}} />}
      <div style={{display:'grid', gap:6}}>
        <input value={e.title_fr||''} onChange={ev=>setE({...e, title_fr:ev.target.value})}/>
        <input value={e.title_en||''} onChange={ev=>setE({...e, title_en:ev.target.value})}/>
        <textarea rows={3} value={e.body_fr||''} onChange={ev=>setE({...e, body_fr:ev.target.value})}/>
        <textarea rows={3} value={e.body_en||''} onChange={ev=>setE({...e, body_en:ev.target.value})}/>
        <input value={e.image_url||''} onChange={ev=>setE({...e, image_url:ev.target.value})}/>
      </div>
      <div style={{marginTop:8}}>
        <button onClick={()=>onSave(e.id, e)}>Save</button>
        <button onClick={()=>onDelete(e.id)} style={{marginLeft:8}}>Delete</button>
      </div>
    </li>
  );
}
