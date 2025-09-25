import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function ManageHome() {
  const [data, setData] = useState({ title_fr:'', title_en:'', intro_fr:'', intro_en:'' });
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => { api.getHome().then(setData).catch(e=>setErr(e.message)); }, []);

  const save = async () => {
    setErr('');
    try {
      await api.updateHome(data);
      setSaved(true);
      setTimeout(()=>setSaved(false), 1200);
    } catch (e) { setErr(e.message); }
  };

  return (
    <div>
      <h2>Home (FR/EN)</h2>
      {err && <p style={{color:'crimson'}}>{err}</p>}
      <TwoCol>
        <Field label="Titre (FR)" value={data.title_fr} onChange={v=>setData({...data, title_fr:v})}/>
        <Field label="Title (EN)" value={data.title_en} onChange={v=>setData({...data, title_en:v})}/>
        <Field label="Introduction (FR)" textarea value={data.intro_fr} onChange={v=>setData({...data, intro_fr:v})}/>
        <Field label="Intro (EN)" textarea value={data.intro_en} onChange={v=>setData({...data, intro_en:v})}/>
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
