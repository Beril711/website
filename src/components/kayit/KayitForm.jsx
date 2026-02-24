"use client";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function KayitForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    organization: "",
    participationType: "",
    interestAreas: [],
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const interestOptions = [
    "Mühendislik ve Robotik",
    "Biyoteknoloji ve Sağlık",
    "Tarım ve Gıda Teknolojileri",
    "Sosyal ve Beşerî Bilimler",
    "Eğitimde AI",
    "Veri Bilimi",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleInterest = (area) => {
    setForm((prev) => ({
      ...prev,
      interestAreas: prev.interestAreas.includes(area)
        ? prev.interestAreas.filter((a) => a !== area)
        : [...prev.interestAreas, area],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    // TODO: Supabase API bağlantısı
    setTimeout(() => setStatus("success"), 1000);
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <CheckCircle size={48} style={{ color: "var(--amber)", marginBottom: 16 }} />
        <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
          Başvurunuz Alındı!
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--text-tertiary)", maxWidth: 400, margin: "0 auto" }}>
          Kayıt bilgileriniz başarıyla iletildi. Onay e-postası kısa süre içinde adresinize gönderilecektir.
        </p>
      </div>
    );
  }

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
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div>
          <label style={labelStyle}>Ad Soyad *</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            placeholder="Adınız Soyadınız"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>E-posta *</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="ornek@email.com"
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div>
          <label style={labelStyle}>Kurum / Üniversite</label>
          <input
            name="organization"
            value={form.organization}
            onChange={handleChange}
            placeholder="Kurumunuz"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Katılım Türü *</label>
          <select
            name="participationType"
            value={form.participationType}
            onChange={handleChange}
            required
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="">Seçiniz</option>
            <option value="listener">Dinleyici</option>
            <option value="speaker">Konuşmacı</option>
            <option value="workshop">Workshop Katılımcısı</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>İlgi Alanları</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {interestOptions.map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => handleInterest(area)}
              style={{
                padding: "6px 14px",
                borderRadius: 100,
                border: "1px solid",
                borderColor: form.interestAreas.includes(area)
                  ? "var(--accent-light)"
                  : "var(--border)",
                background: form.interestAreas.includes(area)
                  ? "var(--icon-bg)"
                  : "transparent",
                color: form.interestAreas.includes(area)
                  ? "var(--accent-light)"
                  : "var(--text-tertiary)",
                fontSize: "0.78rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.3s",
                fontFamily: "inherit",
              }}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <label style={labelStyle}>Mesaj / Not (opsiyonel)</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Eklemek istediğiniz bir not varsa..."
          rows={4}
          style={{ ...inputStyle, resize: "vertical" }}
        />
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
          <>
            Başvuruyu Gönder <Send size={16} />
          </>
        )}
      </button>

      <style jsx>{`
        input:focus, select:focus, textarea:focus {
          border-color: var(--purple) !important;
        }
        input::placeholder, textarea::placeholder {
          color: var(--text-tertiary);
        }
        @media (max-width: 480px) {
          form > div:first-child,
          form > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </form>
  );
}