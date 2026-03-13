"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Save, X, Calendar } from "lucide-react";

const emptySession = {
  id: "",
  gun: 1,
  time: "",
  duration: "",
  type: "konusma",
  type_label: "Konuşma",
  title: "",
  location: "",
  description: "",
  speaker: "",
  highlight: false,
  sort_order: 0,
};

const typeOptions = [
  { value: "konusma", label: "Konuşma" },
  { value: "panel", label: "Panel" },
  { value: "workshop", label: "Workshop" },
  { value: "opening", label: "Tören / Açılış" },
  { value: "arasol", label: "Mola / Ara" },
];

export default function AdminProgram() {
  const [sessions, setSessions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptySession);
  const [activeDay, setActiveDay] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    const { data } = await supabase
      .from("program_sessions")
      .select("*")
      .order("sort_order", { ascending: true });
    setSessions(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchSessions(); }, []);

  const filtered = sessions.filter((s) => s.gun === activeDay);

  const handleNew = () => {
    const dayItems = sessions.filter((s) => s.gun === activeDay);
    setEditing("new");
    setForm({
      ...emptySession,
      gun: activeDay,
      id: `g${activeDay}-${dayItems.length + 1}`,
      sort_order: dayItems.length + 1,
    });
  };

  const handleEdit = (session) => {
    setEditing(session.id);
    setForm({ ...session });
  };

  const handleCancel = () => {
    setEditing(null);
    setForm(emptySession);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.time.trim()) return;

    if (editing === "new") {
      await supabase.from("program_sessions").insert([{
        id: form.id,
        gun: form.gun,
        time: form.time,
        duration: form.duration,
        type: form.type,
        type_label: form.type_label,
        title: form.title,
        location: form.location,
        description: form.description,
        speaker: form.speaker || null,
        highlight: form.highlight,
        sort_order: form.sort_order,
      }]);
    } else {
      await supabase.from("program_sessions").update({
        gun: form.gun,
        time: form.time,
        duration: form.duration,
        type: form.type,
        type_label: form.type_label,
        title: form.title,
        location: form.location,
        description: form.description,
        speaker: form.speaker || null,
        highlight: form.highlight,
        sort_order: form.sort_order,
      }).eq("id", editing);
    }

    handleCancel();
    fetchSessions();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu oturumu silmek istediğinize emin misiniz?")) return;
    await supabase.from("program_sessions").delete().eq("id", id);
    fetchSessions();
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)", background: "var(--bg-card)",
    color: "var(--text-primary)", fontFamily: "inherit", fontSize: "0.85rem", outline: "none",
  };
  const labelStyle = { display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-tertiary)", marginBottom: 4 };

  if (loading) return <p style={{ color: "var(--text-tertiary)" }}>Yükleniyor...</p>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>Program</h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-tertiary)" }}>{sessions.length} oturum kayıtlı</p>
        </div>
        <button
          onClick={handleNew}
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(135deg, var(--purple), var(--blue))",
            color: "#fff",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            transition: "all 0.3s",
            boxShadow: "0 2px 12px var(--glow-1)",
          }}
          title="Yeni Ekle"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Day tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {[1, 2, 3].map((d) => (
          <button key={d} onClick={() => setActiveDay(d)} style={{
            padding: "8px 20px", borderRadius: 100,
            border: "1px solid", fontFamily: "inherit",
            borderColor: activeDay === d ? "var(--accent-light)" : "var(--border)",
            background: activeDay === d ? "var(--icon-bg)" : "transparent",
            color: activeDay === d ? "var(--accent-light)" : "var(--text-tertiary)",
            fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
          }}>
            {d}. Gün
          </button>
        ))}
      </div>

      {/* Edit form */}
      {editing && (
        <div style={{ padding: 24, borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--bg-elevated)", marginBottom: 24 }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
            {editing === "new" ? "Yeni Oturum" : "Düzenle"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Saat *</label>
              <input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} style={inputStyle} placeholder="10:00–11:00" />
            </div>
            <div>
              <label style={labelStyle}>Süre</label>
              <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} style={inputStyle} placeholder="60 dk" />
            </div>
            <div>
              <label style={labelStyle}>Tür</label>
              <select value={form.type} onChange={(e) => {
                const opt = typeOptions.find((o) => o.value === e.target.value);
                setForm({ ...form, type: e.target.value, type_label: opt?.label || "" });
              }} style={{ ...inputStyle, cursor: "pointer" }}>
                {typeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Başlık *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} placeholder="Oturum başlığı" />
            </div>
            <div>
              <label style={labelStyle}>Lokasyon</label>
              <input value={form.location || ""} onChange={(e) => setForm({ ...form, location: e.target.value })} style={inputStyle} placeholder="Konferans Salonu" />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Açıklama</label>
            <textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Konuşmacı</label>
              <input value={form.speaker || ""} onChange={(e) => setForm({ ...form, speaker: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Sıralama</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} style={inputStyle} />
            </div>
            <div style={{ display: "flex", alignItems: "end", paddingBottom: 4 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                <input type="checkbox" checked={form.highlight} onChange={(e) => setForm({ ...form, highlight: e.target.checked })} />
                Öne çıkan
              </label>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleSave} className="btn-primary-link" style={{ border: "none", cursor: "pointer", fontSize: "0.82rem" }}><Save size={14} /> Kaydet</button>
            <button onClick={handleCancel} className="btn-ghost-link" style={{ cursor: "pointer", fontSize: "0.82rem" }}><X size={14} /> İptal</button>
          </div>
        </div>
      )}

      {/* Session list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((s) => (
          <div key={s.id} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 20px", borderRadius: "var(--radius)",
            border: `1px solid ${s.highlight ? "var(--accent-light)" : "var(--border)"}`,
            background: s.highlight ? "var(--icon-bg)" : "var(--bg-card)", gap: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
              <div style={{ minWidth: 90, fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{s.time}</div>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{s.title}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                  {s.type_label}{s.location ? ` · ${s.location}` : ""}{s.speaker ? ` · ${s.speaker}` : ""}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => handleEdit(s)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--border)", background: "transparent", color: "var(--text-tertiary)", display: "grid", placeItems: "center", cursor: "pointer" }}><Pencil size={14} /></button>
              <button onClick={() => handleDelete(s.id)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.05)", color: "#ef4444", display: "grid", placeItems: "center", cursor: "pointer" }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p style={{ textAlign: "center", color: "var(--text-tertiary)", padding: 40 }}>Bu günde henüz oturum yok.</p>}
      </div>
    </div>
  );
}