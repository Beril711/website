"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ClipboardList, Trash2, Download } from "lucide-react";

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    const { data } = await supabase.from("registrations").select("*").order("created_at", { ascending: false });
    setRegistrations(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchRegistrations(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bu başvuruyu silmek istediğinize emin misiniz?")) return;
    await supabase.from("registrations").delete().eq("id", id);
    fetchRegistrations();
  };

  const exportCSV = () => {
    if (registrations.length === 0) return;
    const headers = ["Ad Soyad", "E-posta", "Kurum", "Katılım Türü", "İlgi Alanları", "Mesaj", "Tarih"];
    const rows = registrations.map((r) => [
      r.full_name, r.email, r.organization || "", r.participation_type || "",
      (r.interest_areas || []).join("; "), r.message || "",
      new Date(r.created_at).toLocaleDateString("tr-TR"),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "basvurular.csv";
    a.click();
  };

  if (loading) return <p style={{ color: "var(--text-tertiary)" }}>Yükleniyor...</p>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>Başvurular</h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-tertiary)" }}>{registrations.length} başvuru</p>
        </div>
        {registrations.length > 0 && (
          <button onClick={exportCSV} className="btn-ghost-link" style={{ cursor: "pointer", fontSize: "0.82rem" }}>
            <Download size={14} /> CSV İndir
          </button>
        )}
      </div>

      {registrations.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "var(--text-tertiary)" }}>
          <ClipboardList size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p>Henüz başvuru bulunmuyor.</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Ad Soyad", "E-posta", "Kurum", "Tür", "Tarih", ""].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "var(--text-tertiary)", fontSize: "0.75rem" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "12px", fontWeight: 600, color: "var(--text-primary)" }}>{r.full_name}</td>
                  <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{r.email}</td>
                  <td style={{ padding: "12px", color: "var(--text-tertiary)" }}>{r.organization || "—"}</td>
                  <td style={{ padding: "12px", color: "var(--text-tertiary)" }}>{r.participation_type || "—"}</td>
                  <td style={{ padding: "12px", color: "var(--text-tertiary)", whiteSpace: "nowrap" }}>{new Date(r.created_at).toLocaleDateString("tr-TR")}</td>
                  <td style={{ padding: "12px" }}>
                    <button onClick={() => handleDelete(r.id)} style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.05)", color: "#ef4444", display: "grid", placeItems: "center", cursor: "pointer" }}><Trash2 size={12} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}