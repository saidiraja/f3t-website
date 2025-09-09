import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function ManageAbout() {
  const [data, setData] = useState({ mission_fr:'', mission_en:'', vision_fr:'', vision_en:'', values_fr:'', values_en:'' });
  const [saved, setSaved] = useState(false);
  useEffect(()=>{ api.getAbout().then(setData); },[]);
  const save = async () => { await api.saveAbout(data); setSaved(true); setTimeout(()=>setSaved(false), 1200); };

  return (
    <div>
      <h2>About (FR/EN)</h2>
      <Grid>
        <Field label="Mission (FR)" textarea value={data.mission_fr} onChange={v=>setData({...data, mission_fr:v})}/>
        <Field label="Mission (EN)" textarea value={data.mission_en} onChange={v=>setData({...data, mission_en:v})}/>
        <Field label="Vision (FR)" textarea value={data.vision_fr} onChange={v=>setData({...data, vision_fr:v})}/>
        <Field label="Vision (EN)" textarea value={data.vision_en} onChange={v=>setData({...data, vision_en:v})}/>
        <Field label="Valeurs (FR)" textarea value={data.values_fr} onChange={v=>setData({...data, values_fr:v})}/>
        <Field label="Values (EN)" textarea value={data.values_en} onChange={v=>setData({...data, values_en:v})}/>
      </Grid>
      <button onClick={save}>Save</button> {saved && <em>Saved ✓</em>}
    </div>
  );
}

function Field({ label, value, onChange, textarea=false }) {
  return <label style={{display:'grid', gap:6}}>
    <span>{label}</span>
    {textarea ? <textarea rows={4} value={value||''} onChange={e=>onChange(e.target.value)} /> :
                <input value={value||''} onChange={e=>onChange(e.target.value)} />}
    <style>{`input,textarea{padding:8px}`}</style>
  </label>;
}
function Grid({children}) { return <div style={{display:'grid', gap:16, gridTemplateColumns:'1fr 1fr'}}>{children}</div>; }
