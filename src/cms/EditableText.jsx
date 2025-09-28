// src/cms/EditableText.jsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePageContent } from "./PageContentContext";
import { useI18n } from "../i18n/useI18n";

/**
 * Professional inline editor:
 * - Shows a small "🖉 Edit" pill button next to text for admins (high-contrast).
 * - Editor opens in a portal (z-index 10000) → never clipped by overflow.
 * - Clear Save / Cancel / Delete buttons, Esc to cancel, Ctrl/Cmd+S to save.
 */
export default function EditableText({
  k,
  as = "span",
  fr = "",
  en = "",
  className = "",
  style,
}) {
  const { lang } = useI18n();
  const { texts, upsert, remove, loggedIn } = usePageContent();

  const Comp = as;
  const t = texts[k] || {};
  const currentValue = (lang === "fr" ? (t.fr ?? fr) : (t.en ?? en)) || "";

  const anchorRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ fr: t.fr ?? fr, en: t.en ?? en });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  // Editor position near the element
  const [pos, setPos] = useState({ top: 0, left: 0 });

  // Sync form values from latest texts on reopen
  useEffect(() => {
    if (!open) setForm({ fr: texts[k]?.fr ?? fr, en: texts[k]?.en ?? en });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texts[k]?.fr, texts[k]?.en]);

  function onOpen() {
    setErr("");
    setForm({ fr: texts[k]?.fr ?? fr, en: texts[k]?.en ?? en });
    setOpen(true);
  }

  function onCancel() {
    setOpen(false);
    setSaving(false);
    setErr("");
  }

  async function onSave() {
    try {
      setSaving(true);
      await upsert(k, form);  // Context does an optimistic update + ensures freshness
      setOpen(false);
    } catch (e) {
      setErr(e?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!confirm("Delete this text?")) return;
    try {
      setSaving(true);
      await remove(k);
      setOpen(false);
    } catch (e) {
      setErr(e?.message || "Delete failed");
    } finally {
      setSaving(false);
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); onCancel(); }
      else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") { e.preventDefault(); onSave(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, form]);

  // Compute editor position (below or above the anchor, within viewport)
  useLayoutEffect(() => {
    if (!open || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const margin = 8;
    let top = rect.bottom + margin + window.scrollY;
    let left = rect.left + window.scrollX;

    const editorWidth = 360;
    const editorHeight = 260;

    const maxLeft = window.scrollX + window.innerWidth - editorWidth - margin;
    if (left > maxLeft) left = maxLeft;
    if (left < window.scrollX + margin) left = window.scrollX + margin;

    const maxBottom = window.scrollY + window.innerHeight - editorHeight - margin;
    if (top > maxBottom) {
      top = rect.top + window.scrollY - editorHeight - margin;
      if (top < window.scrollY + margin) top = window.scrollY + margin;
    }
    setPos({ top, left });
  }, [open]);

  // Click outside to cancel
  const modalRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (!modalRef.current) return;
      if (modalRef.current.contains(e.target)) return;
      if (anchorRef.current && anchorRef.current.contains(e.target)) return;
      onCancel();
    };
    setTimeout(() => document.addEventListener("mousedown", onClick), 0);
    return () => document.removeEventListener("mousedown", onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <span
      ref={anchorRef}
      style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Comp className={className} style={style}>{currentValue}</Comp>

      {loggedIn && !open && (
        <button
          type="button"
          onClick={onOpen}
          title="Edit"
          aria-label="Edit"
          style={{
            ...pillBtn,
            display: hover ? "inline-flex" : "none",
          }}
        >
          <span aria-hidden="true">🖉</span>
          <span>Edit</span>
        </button>
      )}

      {open && createPortal(
        <div
          ref={modalRef}
          style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            zIndex: 10000,
            width: 360,
            background: "#ffffff",
            border: "1px solid #e0e0e0",
            borderRadius: 12,
            boxShadow: "0 16px 40px rgba(0,0,0,.18)",
            padding: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
            <strong style={{ fontSize: 14, color: "#111" }}>Edit “{k}”</strong>
            <div style={{ marginLeft: "auto", fontSize: 12, opacity: 0.7, color: "#333" }}>
              Esc = Cancel · Ctrl/Cmd+S = Save
            </div>
          </div>

          <label style={lbl}>Texte (FR)</label>
          <textarea
            value={form.fr}
            onChange={(e) => setForm({ ...form, fr: e.target.value })}
            rows={3}
            style={ta}
            placeholder="Texte français…"
          />

          <label style={lbl}>Text (EN)</label>
          <textarea
            value={form.en}
            onChange={(e) => setForm({ ...form, en: e.target.value })}
            rows={3}
            style={ta}
            placeholder="English text…"
          />

          {err && <div style={{ color: "crimson", fontSize: 12, marginTop: 6 }}>{err}</div>}

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 10 }}>
            <button type="button" onClick={onCancel} disabled={saving} style={btnCancel}>Cancel</button>
            <button type="button" onClick={onDelete} disabled={saving} style={btnDanger}>Delete</button>
            <button type="button" onClick={onSave} disabled={saving} style={btnPrimary}>
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>,
        document.body
      )}
    </span>
  );
}

const pillBtn = {
  padding: "5px 12px",
  borderRadius: 999,
  border: "1px solid #c9c9c9",
  background: "#f7f7f7",
  color: "#222",
  boxShadow: "0 2px 6px rgba(0,0,0,.06)",
  cursor: "pointer",
  alignItems: "center",
  gap: 6,
  fontSize: 13,
  lineHeight: 1,
  fontWeight: 600,
};

const lbl = { fontSize: 12, color: "#333", marginBottom: 4, display: "block", fontWeight: 600 };
const ta = {
  width: "100%",
  borderRadius: 8,
  border: "1px solid #cfcfcf",
  padding: "10px 12px",
  fontSize: 14,
  outline: "none",
  resize: "vertical",
  marginBottom: 10,
  color: "#111",
  background: "#fff",
};
const btnBase = {
  padding: "9px 14px",
  borderRadius: 8,
  border: "1px solid transparent",
  fontSize: 14,
  cursor: "pointer",
  fontWeight: 600,
};
const btnCancel = { ...btnBase, background: "#f2f2f2", borderColor: "#d0d0d0", color: "#111" };
const btnDanger = { ...btnBase, background: "#ffe5e5", borderColor: "#ffbcbc", color: "#8a1b1b" };
const btnPrimary= { ...btnBase, background: "#0d6efd", color: "#fff" };
