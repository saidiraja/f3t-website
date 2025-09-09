import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function ManageCertifications() {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const load = () => api.getCertifications().then(setList);
  useEffect(load, []);

  const add = async () => { await api.addCert({ name }); setName(''); load(); };
  const save = async (id, name) => { await api.updateCert(id, { name }); load(); };
  const del = async (id) => { await api.deleteCert(id); load(); };

  return (
    <div>
      <h2>Certifications</h2>
      <div><input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} /> <button onClick={add}>Add</button></div>
      <ul>
        {list.map(c => <li key={c.id}>
          <input value={c.name} onChange={e=>save(c.id, e.target.value)} />
          <button onClick={()=>del(c.id)} style={{marginLeft:8}}>Delete</button>
        </li>)}
      </ul>
    </div>
  );
}
