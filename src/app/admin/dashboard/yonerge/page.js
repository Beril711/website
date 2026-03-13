"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Save, X, FileText } from "lucide-react";

const BOLUM_TIPLERI = [
  { value: "amac", label: "Madde 1 — Amaç ve Kapsam" },
  { value: "bolumler", label: "Madde 2 — Bölümler" },
  { value: "amaclar", label: "Madde 3 — Amaçlar" },
  { value: "organizasyon", label: "Madde 4 — Organizasyon" },
  { value: "katilim", label: "Madde 5 — Katılım" },
  { value: "workshop", label: "Madde 6 — Workshop İlkeleri" },
  { value: "sertifika", label: "Madde 7 — Belgeler" },
  { value: "yururluk", label: "Madde 8 — Yürürlük" },
  { value: "genel", label: "Genel" },
];

const emptyItem = {
  bolum_tipi: "genel",
  baslik: "",
  icerik: "",
  sort_order: 0,
  visible: true,
};

export default function AdminYonerge() {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState("genel");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyItem);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase
      .from("yonerge")
      .select("*")
      .order("sort_order", { ascending: true });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const filtered = items.filter((i) => i.bolum_tipi === activeTab);

  const handleNew = () => {
    setEditing("new");
    setForm({ ...emptyItem, bolum_tipi: activeTab, sort_order: filtered.length + 1 });
  };

  const handleEdit = (item) => { setEditing(item.id); setForm({ ...item }); };
  const handleCancel = () => { setEditing(null); setForm(emptyItem); };

  const handleSave = async () => {
    if (!form.baslik.trim()) return;
    setSaving(true);
    const payload = {
      bolum_tipi: form.bolum_tipi,
      baslik: form.baslik,
      icerik: form.icerik,
      sort_order: form.sort_order,
      visible: form.visible,
    };
    if (editing === "new") {
      await supabase.from("yonerge").insert([payload]);
    } else {
      await supabase.from("yonerge").update(payload).eq("id", editing);
    }
    setSaving(false);
    handleCancel();
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu maddeyi silmek istediğinize emin misiniz?")) return;
    await supabase.from("yonerge").delete().eq("id", id);
    fetchItems();
  };

  const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text-primary)", fontFamily: "inherit", fontSize: "0.85rem", outline: "none" };
  const labelStyle = { display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-tertiary)", marginBottom: 4 };

  if (loading) return <p style={{ color: "var(--text-tertiary)" }}>Yükleniyor...</p>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>Yönerge</h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-tertiary)" }}>{items.length} madde kayıtlı</p>
        </div>
        <button
          onClick={handleNew}
          style={{ width: 42, height: 42, borderRadius: 12, border: "none", background: "linear-gradient(135deg, var(--purple), var(--blue))", color: "#fff", display: "grid", placeItems: "center", cursor: "pointer", boxShadow: "0 2px 12px var(--glow-1)" }}
          title="Yeni Ekle"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Tabs - scroll yatay */}
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--border)", minWidth: "max-content" }}>
          {BOLUM_TIPLERI.map((t) => (
            <button
              key={t.value}
              onClick={() => { setActiveTab(t.value); setEditing(null); }}
              style={{
                padding: "8px 14px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "0.78rem",
                fontWeight: activeTab === t.value ? 700 : 500,
                color: activeTab === t.value ? "var(--accent-light)" : "var(--text-tertiary)",
                borderBottom: activeTab === t.value ? "2px solid var(--accent-light)" : "2px solid transparent",
                marginBottom: -1,
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {t.label} ({items.filter((i) => i.bolum_tipi === t.value).length})
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      {editing && (
        <div style={{ padding: 24, borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--bg-elevated)", marginBottom: 24 }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
            {editing === "new" ? "Yeni Madde" : "Düzenle"}
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 100px", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={labelStyle}>Bölüm</label>
              <select value={form.bolum_tipi} onChange={(e) => setForm({ ...form, bolum_tipi: e.target.value })} style={inputStyle}>
                {BOLUM_TIPLERI.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Başlık *</label>
              <input value={form.baslik} onChange={(e) => setForm({ ...form, baslik: e.target.value })} style={inputStyle} placeholder="Madde başlığı..." />
            </div>
            <div>
              <label style={labelStyle}>Sıralama</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>İçerik</label>
            <textarea
              value={form.icerik}
              onChange={(e) => setForm({ ...form, icerik: e.target.value })}
              rows={5}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder="Madde içeriği..."
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
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
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 60, color: "var(--text-tertiary)" }}>
            <FileText size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
            <p>Bu bölümde henüz madde yok.</p>
          </div>
        )}
        {filtered.map((item) => (
          <div key={item.id} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "16px 20px", borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--bg-card)", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{item.baslik}</div>
              {item.icerik && (
                <div style={{ fontSize: "0.78rem", color: "var(--text-tertiary)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {item.icerik}
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <button onClick={() => handleEdit(item)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--border)", background: "transparent", color: "var(--text-tertiary)", display: "grid", placeItems: "center", cursor: "pointer" }}><Pencil size={14} /></button>
              <button onClick={() => handleDelete(item.id)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.05)", color: "#ef4444", display: "grid", placeItems: "center", cursor: "pointer" }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}