"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Save, X, Award } from "lucide-react";

const emptySponsor = { name: "", website: "", tier: "standard", sort_order: 0, visible: true };

export default function AdminSponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptySponsor);
  const [loading, setLoading] = useState(true);

  const fetchSponsors = async () => {
    const { data } = await supabase.from("sponsors").select("*").order("sort_order", { ascending: true });
    setSponsors(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchSponsors(); }, []);

  const handleNew = () => { setEditing("new"); setForm({ ...emptySponsor, sort_order: sponsors.length + 1 }); };
  const handleEdit = (s) => { setEditing(s.id); setForm({ ...s }); };
  const handleCancel = () => { setEditing(null); setForm(emptySponsor); };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    if (editing === "new") {
      await supabase.from("sponsors").insert([{ name: form.name, website: form.website, tier: form.tier, sort_order: form.sort_order, visible: form.visible }]);
    } else {
      await supabase.from("sponsors").update({ name: form.name, website: form.website, tier: form.tier, sort_order: form.sort_order, visible: form.visible }).eq("id", editing);
    }
    handleCancel();
    fetchSponsors();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu sponsoru silmek istediğinize emin misiniz?")) return;
    await supabase.from("sponsors").delete().eq("id", id);
    fetchSponsors();
  };

  const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text-primary)", fontFamily: "inherit", fontSize: "0.85rem", outline: "none" };
  const labelStyle = { display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-tertiary)", marginBottom: 4 };

  if (loading) return <p style={{ color: "var(--text-tertiary)" }}>Yükleniyor...</p>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>Sponsorlar</h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-tertiary)" }}>{sponsors.length} sponsor kayıtlı</p>
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

      {editing && (
        <div style={{ padding: 24, borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--bg-elevated)", marginBottom: 24 }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>{editing === "new" ? "Yeni Sponsor" : "Düzenle"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div><label style={labelStyle}>Kurum Adı *</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="Kurum adı" /></div>
            <div><label style={labelStyle}>Web Sitesi</label><input value={form.website || ""} onChange={(e) => setForm({ ...form, website: e.target.value })} style={inputStyle} placeholder="https://..." /></div>
            <div>
              <label style={labelStyle}>Seviye</label>
              <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="platinum">Platin</option>
                <option value="gold">Altın</option>
                <option value="standard">Standart</option>
              </select>
            </div>
            <div><label style={labelStyle}>Sıralama</label><input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} style={inputStyle} /></div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleSave} className="btn-primary-link" style={{ border: "none", cursor: "pointer", fontSize: "0.82rem" }}><Save size={14} /> Kaydet</button>
            <button onClick={handleCancel} className="btn-ghost-link" style={{ cursor: "pointer", fontSize: "0.82rem" }}><X size={14} /> İptal</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sponsors.map((s) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--bg-card)", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(245,158,11,0.1)", display: "grid", placeItems: "center", color: "#F59E0B", flexShrink: 0 }}><Award size={18} /></div>
              <div>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{s.name}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-tertiary)" }}>{s.tier === "platinum" ? "Platin" : s.tier === "gold" ? "Altın" : "Standart"}{s.website ? ` · ${s.website}` : ""}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => handleEdit(s)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--border)", background: "transparent", color: "var(--text-tertiary)", display: "grid", placeItems: "center", cursor: "pointer" }}><Pencil size={14} /></button>
              <button onClick={() => handleDelete(s.id)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.05)", color: "#ef4444", display: "grid", placeItems: "center", cursor: "pointer" }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}