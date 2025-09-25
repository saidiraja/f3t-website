// src/pages/admin/ManageAbout.jsx
import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function ManageAbout() {
  const [data, setData] = useState({ mission_fr:'', mission_en:'', vision_fr:'', vision_en:'', values_fr:'', values_en:'' });
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => { api.getAbout().then(setData).catch(e=>setErr(e.message)); }, []);

  const save = async () => {
    setErr('');
    try {
      await api.updateAbout(data);
      setSaved(true);
      setTimeout(()=>setSaved(false), 1200);
    } catch (e) { setErr(e.message); }
  };

  return (
    <div>
      <h2>About (FR/EN)</h2>
      {err && <p style={{color:'crimson'}}>{err}</p>}
      <TwoCol>
        <Field label="Mission (FR)" textarea value={data.mission_fr} onChange={v=>setData({...data, mission_fr:v})}/>
        <Field label="Mission (EN)" textarea value={data.mission_en} onChange={v=>setData({...data, mission_en:v})}/>
        <Field label="Vision (FR)" textarea value={data.vision_fr} onChange={v=>setData({...data, vision_fr:v})}/>
        <Field label="Vision (EN)" textarea value={data.vision_en} onChange={v=>setData({...data, vision_en:v})}/>
        <Field label="Values (FR)" textarea value={data.values_fr} onChange={v=>setData({...data, values_fr:v})}/>
        <Field label="Values (EN)" textarea value={data.values_en} onChange={v=>setData({...data, values_en:v})}/>
      </TwoCol>
      <button onClick={save}>Save</button> {saved && <em>Saved ✓</em>}
    </div>
  );
}

function Field({ label, value, onChange, textarea=false }) {
  return (
    <label style={{display:'grid', gap:6}}>
      <span>{label}</span>
      {textarea
        ? <textarea rows={5} value={value||''} onChange={e=>onChange(e.target.value)} />
        : <input value={value||''} onChange={e=>onChange(e.target.value)} />}
      <style>{`input,textarea{padding:8px}`}</style>
    </label>
  );
}
function TwoCol({children}) { return <div style={{display:'grid', gap:16, gridTemplateColumns:'1fr 1fr'}}>{children}</div>; }
