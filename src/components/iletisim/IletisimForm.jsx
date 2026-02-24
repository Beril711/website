"use client";
import { useState } from "react";
import { Send, CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/constants/siteConfig";

export default function IletisimForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    // TODO: API bağlantısı
    setTimeout(() => setStatus("success"), 1000);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)",
    background: "var(--bg-card)",
    color: "var(--text-primary)",
    fontFamily: "inherit",
    fontSize: "0.88rem",
    outline: "none",
    transition: "border-color 0.3s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "var(--text-primary)",
    marginBottom: 6,
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="iletisim-grid">
      {/* Form */}
      <div>
        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <CheckCircle size={48} style={{ color: "var(--amber)", marginBottom: 16 }} />
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
              Mesajınız Gönderildi!
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-tertiary)" }}>
              En kısa sürede size dönüş yapacağız.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div>
                <label style={labelStyle}>Ad Soyad *</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Adınız" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>E-posta *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="ornek@email.com" style={inputStyle} />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Konu *</label>
              <input name="subject" value={form.subject} onChange={handleChange} required placeholder="Mesajınızın konusu" style={inputStyle} />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Mesaj *</label>
              <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Mesajınızı yazın..." rows={5} style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary-link"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "14px 28px",
                fontSize: "0.92rem",
                opacity: status === "loading" ? 0.7 : 1,
                cursor: status === "loading" ? "wait" : "pointer",
                border: "none",
              }}
            >
              {status === "loading" ? "Gönderiliyor..." : (
                <>Mesajı Gönder <Send size={16} /></>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Contact Info */}
      <div>
        <div
          style={{
            padding: "36px 30px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
          }}
        >
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 24 }}>
            İletişim Bilgileri
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: "var(--icon-bg)", border: "1px solid var(--icon-border)",
                display: "grid", placeItems: "center", color: "var(--accent-light)", flexShrink: 0,
              }}>
                <Mail size={18} />
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: 2 }}>E-posta</div>
                <a href={`mailto:${siteConfig.email}`} style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: "var(--icon-bg)", border: "1px solid var(--icon-border)",
                display: "grid", placeItems: "center", color: "var(--accent-light)", flexShrink: 0,
              }}>
                <Phone size={18} />
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: 2 }}>Telefon</div>
                <a href={`tel:${siteConfig.phone}`} style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: "var(--icon-bg)", border: "1px solid var(--icon-border)",
                display: "grid", placeItems: "center", color: "var(--accent-light)", flexShrink: 0,
              }}>
                <MapPin size={18} />
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: 2 }}>Adres</div>
                <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  {siteConfig.eventLocation}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div
          style={{
            marginTop: 20,
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
            height: 200,
            display: "grid",
            placeItems: "center",
            color: "var(--text-tertiary)",
            fontSize: "0.85rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <MapPin size={24} style={{ marginBottom: 8, opacity: 0.5 }} />
            <div>Google Maps Embed</div>
            <div style={{ fontSize: "0.72rem", marginTop: 4 }}>Mucur, Kırşehir</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        input:focus, textarea:focus {
          border-color: var(--purple) !important;
        }
        input::placeholder, textarea::placeholder {
          color: var(--text-tertiary);
        }
        @media (max-width: 768px) {
          .iletisim-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}