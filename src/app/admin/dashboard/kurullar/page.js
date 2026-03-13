"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Save, X, Users } from "lucide-react";

const KURUL_TIPLERI = [
  { value: "duzenleme", label: "Düzenleme Kurulu" },
  { value: "bilim", label: "Bilim Kurulu" },
  { value: "etik", label: "Etik Kurulu" },
];

const emptyMember = {
  kurul_tipi: "duzenleme",
  no: "",
  ad: "",
  birim: "",
  rol: "",
  sorumluluk: "",
  alan: "",
  sort_order: 0,
  visible: true,
};

export default function AdminKurullar() {
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState("duzenleme");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyMember);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchMembers = async () => {
    const { data } = await supabase
      .from("kurullar")
      .select("*")
      .order("sort_order", { ascending: true });
    setMembers(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchMembers(); }, []);

  const filtered = members.filter((m) => m.kurul_tipi === activeTab);

  const handleNew = () => {
    setEditing("new");
    setForm({ ...emptyMember, kurul_tipi: activeTab, sort_order: filtered.length + 1, no: filtered.length + 1 });
  };

  const handleEdit = (m) => { setEditing(m.id); setForm({ ...m }); };
  const handleCancel = () => { setEditing(null); setForm(emptyMember); };

  const handleSave = async () => {
    if (!form.ad.trim()) return;
    setSaving(true);
    const payload = {
      kurul_tipi: form.kurul_tipi,
      no: form.no,
      ad: form.ad,
      birim: form.birim,
      rol: form.rol,
      sorumluluk: form.sorumluluk,
      alan: form.alan,
      sort_order: form.sort_order,
      visible: form.visible,
    };
    if (editing === "new") {
      await supabase.from("kurullar").insert([payload]);
    } else {
      await supabase.from("kurullar").update(payload).eq("id", editing);
    }
    setSaving(false);
    handleCancel();
    fetchMembers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu üyeyi silmek istediğinize emin misiniz?")) return;
    await supabase.from("kurullar").delete().eq("id", id);
    fetchMembers();
  };

  const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text-primary)", fontFamily: "inherit", fontSize: "0.85rem", outline: "none" };
  const labelStyle = { display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-tertiary)", marginBottom: 4 };

  if (loading) return <p style={{ color: "var(--text-tertiary)" }}>Yükleniyor...</p>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>Kurullar</h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-tertiary)" }}>{members.length} toplam üye</p>
        </div>
        <button
          onClick={handleNew}
          style={{ width: 42, height: 42, borderRadius: 12, border: "none", background: "linear-gradient(135deg, var(--purple), var(--blue))", color: "#fff", display: "grid", placeItems: "center", cursor: "pointer", boxShadow: "0 2px 12px var(--glow-1)" }}
          title="Yeni Ekle"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid var(--border)", paddingBottom: 0 }}>
        {KURUL_TIPLERI.map((t) => (
          <button
            key={t.value}
            onClick={() => { setActiveTab(t.value); setEditing(null); }}
            style={{
              padding: "8px 16px",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "0.82rem",
              fontWeight: activeTab === t.value ? 700 : 500,
              color: activeTab === t.value ? "var(--accent-light)" : "var(--text-tertiary)",
              borderBottom: activeTab === t.value ? "2px solid var(--accent-light)" : "2px solid transparent",
              marginBottom: -1,
              transition: "all 0.2s",
            }}
          >
            {t.label} ({members.filter((m) => m.kurul_tipi === t.value).length})
          </button>
        ))}
      </div>

      {/* Form */}
      {editing && (
        <div style={{ padding: 24, borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--bg-elevated)", marginBottom: 24 }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
            {editing === "new" ? "Yeni Üye" : "Düzenle"}
          </h3>

          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Kurul</label>
            <select value={form.kurul_tipi} onChange={(e) => setForm({ ...form, kurul_tipi: e.target.value })} style={{ ...inputStyle }}>
              {KURUL_TIPLERI.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={labelStyle}>No</label>
              <input type="number" value={form.no} onChange={(e) => setForm({ ...form, no: parseInt(e.target.value) || "" })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Ad Soyad *</label>
              <input value={form.ad} onChange={(e) => setForm({ ...form, ad: e.target.value })} style={inputStyle} placeholder="Prof. Dr. ..." />
            </div>
            <div>
              <label style={labelStyle}>Rol / Unvan</label>
              <input value={form.rol} onChange={(e) => setForm({ ...form, rol: e.target.value })} style={inputStyle} placeholder="Başkan, Üye..." />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={labelStyle}>Birim / Kurum</label>
              <input value={form.birim} onChange={(e) => setForm({ ...form, birim: e.target.value })} style={inputStyle} placeholder="Mucur MYO - Bilgisayar Bölümü" />
            </div>
            <div>
              <label style={labelStyle}>Sorumluluk / Alan</label>
              <input value={activeTab === "duzenleme" ? form.sorumluluk : form.alan}
                onChange={(e) => activeTab === "duzenleme"
                  ? setForm({ ...form, sorumluluk: e.target.value })
                  : setForm({ ...form, alan: e.target.value })}
                style={inputStyle}
                placeholder={activeTab === "duzenleme" ? "Teknik altyapı, AV sistemleri" : "Yapay Zeka, Makine Öğrenmesi"}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 100px", gap: 12, marginBottom: 14 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem", color: "var(--text-secondary)", cursor: "pointer" }}>
              <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
              Sitede Göster
            </label>
            <div>
              <label style={labelStyle}>Sıralama</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} style={inputStyle} />
            </div>
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
            <Users size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
            <p>Bu kurulda henüz üye yok.</p>
          </div>
        )}
        {filtered.map((m) => (
          <div key={m.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--bg-card)", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--icon-bg)", display: "grid", placeItems: "center", color: "var(--accent-light)", fontSize: "0.78rem", fontWeight: 700, flexShrink: 0 }}>
                {m.no}
              </div>
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{m.ad}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                  {m.rol} · {m.birim}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => handleEdit(m)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--border)", background: "transparent", color: "var(--text-tertiary)", display: "grid", placeItems: "center", cursor: "pointer" }}><Pencil size={14} /></button>
              <button onClick={() => handleDelete(m.id)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.05)", color: "#ef4444", display: "grid", placeItems: "center", cursor: "pointer" }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}