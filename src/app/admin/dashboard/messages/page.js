"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, Eye, Trash2, CheckCircle } from "lucide-react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id) => {
    await supabase.from("contact_messages").update({ read: true }).eq("id", id);
    fetchMessages();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    setSelected(null);
    fetchMessages();
  };

  if (loading) return <p style={{ color: "var(--text-tertiary)" }}>Yükleniyor...</p>;

  return (
    <div>
      <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>
        Mesajlar
      </h1>
      <p style={{ fontSize: "0.85rem", color: "var(--text-tertiary)", marginBottom: 24 }}>
        {messages.filter((m) => !m.read).length} okunmamış mesaj
      </p>

      {messages.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "var(--text-tertiary)" }}>
          <Mail size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p>Henüz mesaj bulunmuyor.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                padding: "16px 20px",
                borderRadius: "var(--radius)",
                border: `1px solid ${m.read ? "var(--border)" : "var(--accent-light)"}`,
                background: m.read ? "var(--bg-card)" : "var(--icon-bg)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onClick={() => {
                setSelected(m);
                if (!m.read) markAsRead(m.id);
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {m.name}
                    </span>
                    {!m.read && (
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "var(--accent-light)",
                          display: "inline-block",
                        }}
                      />
                    )}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-tertiary)" }}>
                    {m.subject || "Konu belirtilmemiş"} · {m.email}
                  </div>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-tertiary)", whiteSpace: "nowrap" }}>
                  {new Date(m.created_at).toLocaleDateString("tr-TR")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message detail modal */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "grid",
            placeItems: "center",
            zIndex: 100,
            padding: 20,
          }}
          onClick={() => setSelected(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 500,
              padding: 32,
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
              background: "var(--bg-elevated)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {selected.subject || "Mesaj"}
              </h3>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-tertiary)",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: 16, fontSize: "0.85rem" }}>
              <div style={{ color: "var(--text-tertiary)", marginBottom: 4 }}>
                <strong style={{ color: "var(--text-primary)" }}>Gönderen:</strong> {selected.name}
              </div>
              <div style={{ color: "var(--text-tertiary)", marginBottom: 4 }}>
                <strong style={{ color: "var(--text-primary)" }}>E-posta:</strong> {selected.email}
              </div>
              <div style={{ color: "var(--text-tertiary)" }}>
                <strong style={{ color: "var(--text-primary)" }}>Tarih:</strong>{" "}
                {new Date(selected.created_at).toLocaleString("tr-TR")}
              </div>
            </div>

            <div
              style={{
                padding: 16,
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                fontSize: "0.88rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: 20,
                whiteSpace: "pre-wrap",
              }}
            >
              {selected.message}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject || "Mucur AI Days"}`}
                className="btn-primary-link"
                style={{ fontSize: "0.82rem", border: "none" }}
              >
                <Mail size={14} /> Yanıtla
              </a>
              <button
                onClick={() => handleDelete(selected.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  borderRadius: 10,
                  border: "1px solid rgba(239,68,68,0.2)",
                  background: "rgba(239,68,68,0.05)",
                  color: "#ef4444",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <Trash2 size={14} /> Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}