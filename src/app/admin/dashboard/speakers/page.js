"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Save, X, User } from "lucide-react";

const emptySpeaker = {
  name: "",
  role: "",
  org: "",
  bio: "",
  topics: [],
  sort_order: 0,
  visible: true,
};

export default function AdminSpeakers() {
  const [speakers, setSpeakers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptySpeaker);
  const [topicInput, setTopicInput] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSpeakers = async () => {
    const { data } = await supabase
      .from("speakers")
      .select("*")
      .order("sort_order", { ascending: true });
    setSpeakers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const handleEdit = (speaker) => {
    setEditing(speaker.id);
    setForm({ ...speaker });
    setTopicInput("");
  };

  const handleNew = () => {
    setEditing("new");
    setForm({ ...emptySpeaker, sort_order: speakers.length + 1 });
    setTopicInput("");
  };

  const handleCancel = () => {
    setEditing(null);
    setForm(emptySpeaker);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;

    if (editing === "new") {
      await supabase.from("speakers").insert([
        {
          name: form.name,
          role: form.role,
          org: form.org,
          bio: form.bio,
          topics: form.topics,
          sort_order: form.sort_order,
          visible: form.visible,
        },
      ]);
    } else {
      await supabase
        .from("speakers")
        .update({
          name: form.name,
          role: form.role,
          org: form.org,
          bio: form.bio,
          topics: form.topics,
          sort_order: form.sort_order,
          visible: form.visible,
        })
        .eq("id", editing);
    }

    setEditing(null);
    setForm(emptySpeaker);
    fetchSpeakers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu konuşmacıyı silmek istediğinize emin misiniz?")) return;
    const { error } = await supabase.from("speakers").delete().eq("id", id);
    if (error) {
      alert("Silme hatası: " + error.message);
      console.error("Delete error:", error);
      return;
    }
    fetchSpeakers();
  };

  const addTopic = () => {
    if (topicInput.trim() && !form.topics.includes(topicInput.trim())) {
      setForm({ ...form, topics: [...form.topics, topicInput.trim()] });
      setTopicInput("");
    }
  };

  const removeTopic = (t) => {
    setForm({ ...form, topics: form.topics.filter((x) => x !== t) });
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)",
    background: "var(--bg-card)",
    color: "var(--text-primary)",
    fontFamily: "inherit",
    fontSize: "0.85rem",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "var(--text-tertiary)",
    marginBottom: 4,
  };

  if (loading) return <p style={{ color: "var(--text-tertiary)" }}>Yükleniyor...</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Konuşmacılar
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-tertiary)" }}>
            {speakers.length} konuşmacı kayıtlı
          </p>
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

      {/* Edit / New Form */}
      {editing && (
        <div
          style={{
            padding: 24,
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            background: "var(--bg-elevated)",
            marginBottom: 24,
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: 16,
            }}
          >
            {editing === "new" ? "Yeni Konuşmacı" : "Düzenle"}
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Ad Soyad *</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                placeholder="Prof. Dr. ..."
              />
            </div>
            <div>
              <label style={labelStyle}>Ünvan / Rol</label>
              <input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                style={inputStyle}
                placeholder="Rektör, Bölüm Başkanı..."
              />
            </div>
            <div>
              <label style={labelStyle}>Kurum</label>
              <input
                value={form.org}
                onChange={(e) => setForm({ ...form, org: e.target.value })}
                style={inputStyle}
                placeholder="Üniversite, Şirket..."
              />
            </div>
            <div>
              <label style={labelStyle}>Sıralama</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Biyografi</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder="Kısa özgeçmiş..."
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Konular</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTopic())}
                style={{ ...inputStyle, flex: 1 }}
                placeholder="Konu ekle + Enter"
              />
              <button
                type="button"
                onClick={addTopic}
                style={{
                  padding: "8px 16px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.82rem",
                }}
              >
                Ekle
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(form.topics || []).map((t) => (
                <span
                  key={t}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 10px",
                    borderRadius: 100,
                    background: "var(--tag-bg)",
                    border: "1px solid var(--tag-border)",
                    color: "var(--tag-text)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                  }}
                >
                  {t}
                  <button
                    onClick={() => removeTopic(t)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--tag-text)",
                      cursor: "pointer",
                      padding: 0,
                      fontSize: "0.8rem",
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleSave}
              className="btn-primary-link"
              style={{ border: "none", cursor: "pointer", fontSize: "0.82rem" }}
            >
              <Save size={14} /> Kaydet
            </button>
            <button
              onClick={handleCancel}
              className="btn-ghost-link"
              style={{ cursor: "pointer", fontSize: "0.82rem" }}
            >
              <X size={14} /> İptal
            </button>
          </div>
        </div>
      )}

      {/* Speaker List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {speakers.map((s) => (
          <div
            key={s.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "var(--icon-bg)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--accent-light)",
                  flexShrink: 0,
                }}
              >
                <User size={18} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {s.name}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-tertiary)" }}>
                  {s.role} · {s.org}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() => handleEdit(s)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--text-tertiary)",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  border: "1px solid rgba(239,68,68,0.2)",
                  background: "rgba(239,68,68,0.05)",
                  color: "#ef4444",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}