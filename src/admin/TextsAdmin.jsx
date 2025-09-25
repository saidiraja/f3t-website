import { useEffect, useMemo, useState } from "react";

const PAGES = ["home","about","services","industries","certifications","clients","news"];

export default function TextsAdmin() {
  const [page, setPage] = useState("home");
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ key: "", fr: "", en: "" });
  const [filter, setFilter] = useState("");
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("f3t_token");

  async function load(p = page) {
    setMsg("");
    const res = await fetch(`/api/public/texts?page=${encodeURIComponent(p)}`);
    setRows(await res.json());
  }

  useEffect(() => { load(page); }, [page]);

  const filtered = useMemo(() => {
    const f = filter.trim().toLowerCase();
    if (!f) return rows;
    return rows.filter(r => r.key.toLowerCase().includes(f) || (r.fr||"").toLowerCase().includes(f) || (r.en||"").toLowerCase().includes(f));
  }, [rows, filter]);

  async function create() {
    if (!form.key.trim()) { setMsg("Key is required."); return; }
    const res = await fetch(`/api/admin/texts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ page, key: form.key.trim(), fr: form.fr, en: form.en })
    });
    if (!res.ok) return setMsg(`Create failed: ${res.status}`);
    const item = await res.json();
    setRows(r => [...r, item].sort((a,b)=>a.key.localeCompare(b.key)));
    setForm({ key:"", fr:"", en:"" });
    setMsg("Slot created.");
  }

  async function save(id, patch) {
    const res = await fetch(`/api/admin/texts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(patch)
    });
    if (!res.ok) return setMsg(`Save failed: ${res.status}`);
    const updated = await res.json();
    setRows(r => r.map(x => x.id === id ? updated : x));
    setMsg("Saved.");
  }

  async function remove(id) {
    if (!confirm("Delete this slot?")) return;
    const res = await fetch(`/api/admin/texts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return setMsg(`Delete failed: ${res.status}`);
    setRows(r => r.filter(x => x.id !== id));
    setMsg("Deleted.");
  }

  return (
    <div>
      <h2 style={{ marginBottom: 6 }}>Text Slots</h2>
      <p style={{ opacity: .8, marginTop: 0 }}>
        Change the wording inside existing pages (no layout changes).
      </p>

      <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "10px 0 14px" }}>
        <label>Page{" "}
          <select value={page} onChange={e=>setPage(e.target.value)}>
            {PAGES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <input placeholder="Filter…" value={filter} onChange={e=>setFilter(e.target.value)} style={{ flex: 1, padding: 6, borderRadius: 8, border: "1px solid #203b6a", background:"#0d1628", color:"#e5e7eb" }} />
        {!!msg && <span style={{ color: "#9ae6b4" }}>{msg}</span>}
      </div>

      <section style={box}>
        <h4 style={{ marginTop: 0 }}>New slot</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <input placeholder="key (e.g. hero.title)" value={form.key} onChange={e=>setForm(f=>({ ...f, key: e.target.value }))} />
          <input placeholder="English" value={form.en} onChange={e=>setForm(f=>({ ...f, en: e.target.value }))} />
          <textarea rows={3} placeholder="Français" value={form.fr} onChange={e=>setForm(f=>({ ...f, fr: e.target.value }))} />
        </div>
        <button onClick={create} style={btn}>Add</button>
      </section>

      <table cellPadding="8" style={table}>
        <thead><tr><th style={colKey}>Key</th><th>FR</th><th>EN</th><th>Actions</th></tr></thead>
        <tbody>
          {filtered.map(r => <Row key={r.id} r={r} onSave={save} onDelete={() => remove(r.id)} />)}
          {!filtered.length && <tr><td colSpan={4} style={{ opacity: .7 }}>No slots yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function Row({ r, onSave, onDelete }) {
  const [fr, setFr] = useState(r.fr || "");
  const [en, setEn] = useState(r.en || "");
  return (
    <tr>
      <td style={{ whiteSpace: "nowrap", fontWeight: 600 }}>{r.key}</td>
      <td><textarea rows={3} value={fr} onChange={e=>setFr(e.target.value)} /></td>
      <td><textarea rows={3} value={en} onChange={e=>setEn(e.target.value)} /></td>
      <td style={{ whiteSpace: "nowrap" }}>
        <button onClick={()=>onSave(r.id, { fr, en })} style={btnSmall}>Save</button>
        <button onClick={onDelete} style={{ ...btnSmall, background: "#b91c1c" }}>Delete</button>
      </td>
    </tr>
  );
}

const table = { width: "100%", borderCollapse: "separate", borderSpacing: 0, marginTop: 12, background: "#0d1628", border: "1px solid #203b6a", borderRadius: 10, overflow: "hidden" };
const colKey = { width: 220 };
const box = { border: "1px solid #203b6a", background:"#0d1628", padding: 12, borderRadius: 10, marginBottom: 12 };
const btn = { marginTop: 8, padding: "8px 10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" };
const btnSmall = { padding: "6px 8px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", marginRight: 6 };
