"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Save, X, Layers } from "lucide-react";

const emptyArea = {
  no: "",
  emoji: "🤖",
  bolum: "",
  programlar: [],
  ws_count: 1,
  tag: "1 Workshop",
  tag_color: "#A78BFA",
  tag_bg: "rgba(167,139,250,0.1)",
  tag_border: "rgba(167,139,250,0.2)",
  workshops: [],
  sort_order: 0,
  visible: true,
};

const emptyWorkshop = { salon: "", title: "", araclar: "", desc: "" };

export default function AdminOdakAlanlari() {
  const [areas, setAreas] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyArea);
  const [programInput, setProgramInput] = useState("");
  const [wsForm, setWsForm] = useState(emptyWorkshop);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchAreas = async () => {
    const { data } = await supabase
      .from("odak_alanlari")
      .select("*")
      .order("sort_order", { ascending: true });
    setAreas(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAreas(); }, []);

  const handleNew = () => {
    setEditing("new");
    setForm({ ...emptyArea, sort_order: areas.length + 1, no: String(areas.length + 1).padStart(2, "0") });
    setProgramInput("");
    setWsForm(emptyWorkshop);
  };

  const handleEdit = (a) => {
    setEditing(a.id);
    setForm({ ...a, workshops: a.workshops || [], programlar: a.programlar || [] });
    setProgramInput("");
    setWsForm(emptyWorkshop);
  };

  const handleCancel = () => { setEditing(null); setForm(emptyArea); };

  const handleSave = async () => {
    if (!form.bolum.trim()) return;
    setSaving(true);
    const payload = {
      no: form.no,
      emoji: form.emoji,
      bolum: form.bolum,
      programlar: form.programlar,
      ws_count: form.ws_count,
      tag: form.tag,
      tag_color: form.tag_color,
      tag_bg: form.tag_bg,
      tag_border: form.tag_border,
      workshops: form.workshops,
      sort_order: form.sort_order,
      visible: form.visible,
    };
    if (editing === "new") {
      await supabase.from("odak_alanlari").insert([payload]);
    } else {
      await supabase.from("odak_alanlari").update(payload).eq("id", editing);
    }
    setSaving(false);
    handleCancel();
    fetchAreas();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu odak alanını silmek istediğinize emin misiniz?")) return;
    await supabase.from("odak_alanlari").delete().eq("id", id);
    fetchAreas();
  };

  const addProgram = () => {
    if (programInput.trim() && !form.programlar.includes(programInput.trim())) {
      setForm({ ...form, programlar: [...form.programlar, programInput.trim()] });
      setProgramInput("");
    }
  };

  const removeProgram = (p) => setForm({ ...form, programlar: form.programlar.filter((x) => x !== p) });

  const addWorkshop = () => {
    if (wsForm.title.trim()) {
      setForm({ ...form, workshops: [...(form.workshops || []), { ...wsForm }] });
      setWsForm(emptyWorkshop);
    }
  };

  const removeWorkshop = (idx) => {
    setForm({ ...form, workshops: form.workshops.filter((_, i) => i !== idx) });
  };

  const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text-primary)", fontFamily: "inherit", fontSize: "0.85rem", outline: "none" };
  const labelStyle = { display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-tertiary)", marginBottom: 4 };

  if (loading) return <p style={{ color: "var(--text-tertiary)" }}>Yükleniyor...</p>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>Odak Alanları</h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-tertiary)" }}>{areas.length} bölüm kayıtlı</p>
        </div>
        <button
          onClick={handleNew}
          style={{ width: 42, height: 42, borderRadius: 12, border: "none", background: "linear-gradient(135deg, var(--purple), var(--blue))", color: "#fff", display: "grid", placeItems: "center", cursor: "pointer", boxShadow: "0 2px 12px var(--glow-1)" }}
          title="Yeni Ekle"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Form */}
      {editing && (
        <div style={{ padding: 24, borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--bg-elevated)", marginBottom: 24 }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
            {editing === "new" ? "Yeni Odak Alanı" : "Düzenle"}
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "80px 80px 1fr 120px", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>No</label>
              <input value={form.no} onChange={(e) => setForm({ ...form, no: e.target.value })} style={inputStyle} placeholder="01" />
            </div>
            <div>
              <label style={labelStyle}>Emoji</label>
              <input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} style={inputStyle} placeholder="🖥️" />
            </div>
            <div>
              <label style={labelStyle}>Bölüm Adı *</label>
              <input value={form.bolum} onChange={(e) => setForm({ ...form, bolum: e.target.value })} style={inputStyle} placeholder="Bilgisayar Teknolojileri Bölümü" />
            </div>
            <div>
              <label style={labelStyle}>Sıralama</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Tag Etiketi</label>
              <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} style={inputStyle} placeholder="2 Workshop" />
            </div>
            <div>
              <label style={labelStyle}>WS Sayısı</label>
              <input type="number" value={form.ws_count} onChange={(e) => setForm({ ...form, ws_count: parseInt(e.target.value) || 1 })} style={inputStyle} />
            </div>
          </div>

          {/* Programlar */}
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Programlar</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input value={programInput} onChange={(e) => setProgramInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addProgram())} style={{ ...inputStyle, flex: 1 }} placeholder="Program adı + Enter" />
              <button type="button" onClick={addProgram} style={{ padding: "8px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text-primary)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.82rem" }}>Ekle</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(form.programlar || []).map((p) => (
                <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 100, background: "var(--tag-bg)", border: "1px solid var(--tag-border)", color: "var(--tag-text)", fontSize: "0.72rem", fontWeight: 600 }}>
                  {p}
                  <button onClick={() => removeProgram(p)} style={{ background: "none", border: "none", color: "var(--tag-text)", cursor: "pointer", padding: 0, fontSize: "0.8rem" }}>×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Workshoplar */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ ...labelStyle, marginBottom: 8 }}>Workshoplar</label>
            <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: 12, marginBottom: 8, background: "var(--bg-card)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr", gap: 8, marginBottom: 8 }}>
                <div>
                  <label style={labelStyle}>Salon</label>
                  <input value={wsForm.salon} onChange={(e) => setWsForm({ ...wsForm, salon: e.target.value })} style={inputStyle} placeholder="A" />
                </div>
                <div>
                  <label style={labelStyle}>Başlık</label>
                  <input value={wsForm.title} onChange={(e) => setWsForm({ ...wsForm, title: e.target.value })} style={inputStyle} placeholder="Workshop başlığı" />
                </div>
                <div>
                  <label style={labelStyle}>Araçlar</label>
                  <input value={wsForm.araclar} onChange={(e) => setWsForm({ ...wsForm, araclar: e.target.value })} style={inputStyle} placeholder="Python, TensorFlow..." />
                </div>
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={labelStyle}>Açıklama</label>
                <textarea value={wsForm.desc} onChange={(e) => setWsForm({ ...wsForm, desc: e.target.value })} rows={2} style={{ ...inputStyle, resize: "vertical" }} placeholder="Workshop açıklaması..." />
              </div>
              <button type="button" onClick={addWorkshop} style={{ padding: "6px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--bg-elevated)", color: "var(--text-primary)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.8rem" }}>
                + Workshop Ekle
              </button>
            </div>
            {(form.workshops || []).map((ws, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--bg-card)", marginBottom: 4 }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  <strong style={{ color: "var(--accent-light)" }}>Salon {ws.salon}</strong> — {ws.title}
                </span>
                <button onClick={() => removeWorkshop(idx)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}><X size={14} /></button>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem", color: "var(--text-secondary)", cursor: "pointer" }}>
              <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
              Sitede Göster
            </label>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleSave} disabled={saving} className="btn-primary-link" style={{ border: "none", cursor: "pointer", fontSize: "0.82rem" }}>
              <Save size={14} /> {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button onClick={handleCancel} className="btn-ghost-link" style={{ cursor: "pointer", fontSize: "0.82rem" }}>
              <X size={14} /> İptal
            </button>
          </div>
        </div>
      )}

      {/* Liste */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {areas.length === 0 && (
          <div style={{ textAlign: "center", padding: 60, color: "var(--text-tertiary)" }}>
            <Layers size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
            <p>Henüz odak alanı eklenmemiş.</p>
          </div>
        )}
        {areas.map((a) => (
          <div key={a.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--bg-card)", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--icon-bg)", display: "grid", placeItems: "center", fontSize: "1.2rem", flexShrink: 0 }}>
                {a.emoji}
              </div>
              <div>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{a.bolum}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-tertiary)" }}>
                  {(a.programlar || []).join(" · ")} · {a.ws_count} workshop
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => handleEdit(a)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--border)", background: "transparent", color: "var(--text-tertiary)", display: "grid", placeItems: "center", cursor: "pointer" }}><Pencil size={14} /></button>
              <button onClick={() => handleDelete(a.id)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.05)", color: "#ef4444", display: "grid", placeItems: "center", cursor: "pointer" }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}