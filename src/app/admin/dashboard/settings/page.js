"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Settings, CheckCircle } from "lucide-react";

const settingLabels = {
  event_name: "Etkinlik Adı",
  event_date: "Etkinlik Tarihi",
  event_location: "Etkinlik Yeri",
  contact_email: "İletişim E-posta",
  contact_phone: "İletişim Telefon",
};

export default function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchSettings = async () => {
    const { data } = await supabase.from("site_settings").select("*");
    const obj = {};
    (data || []).forEach((s) => (obj[s.key] = s.value));
    setSettings(obj);
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    for (const [key, value] of Object.entries(settings)) {
      await supabase.from("site_settings").upsert({ key, value, updated_at: new Date().toISOString() });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text-primary)", fontFamily: "inherit", fontSize: "0.88rem", outline: "none" };
  const labelStyle = { display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-tertiary)", marginBottom: 6 };

  if (loading) return <p style={{ color: "var(--text-tertiary)" }}>Yükleniyor...</p>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>Site Ayarları</h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-tertiary)" }}>Genel site bilgilerini buradan güncelleyebilirsiniz.</p>
        </div>
      </div>

      <div style={{ maxWidth: 600, padding: 28, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", background: "var(--bg-card)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 28 }}>
          {Object.keys(settingLabels).map((key) => (
            <div key={key}>
              <label style={labelStyle}>{settingLabels[key]}</label>
              <input value={settings[key] || ""} onChange={(e) => handleChange(key, e.target.value)} style={inputStyle} />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={handleSave} disabled={saving} className="btn-primary-link" style={{ border: "none", cursor: saving ? "wait" : "pointer", fontSize: "0.88rem", opacity: saving ? 0.7 : 1 }}>
            <Save size={16} /> {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
          {saved && (
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#34D399", fontWeight: 600 }}>
              <CheckCircle size={16} /> Kaydedildi
            </span>
          )}
        </div>
      </div>
    </div>
  );
}