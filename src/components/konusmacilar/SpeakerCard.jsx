"use client";
import { User, Linkedin, Twitter } from "lucide-react";

export default function SpeakerCard({ speaker }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "36px 24px",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
        transition: "all 0.4s",
        cursor: "default",
      }}
      className="speaker-card-hover"
    >
      {/* Avatar */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          margin: "0 auto 18px",
          position: "relative",
          background: "linear-gradient(135deg, var(--icon-bg), rgba(26,93,171,0.08))",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -2,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--purple), var(--blue))",
            opacity: 0.5,
          }}
        />
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: "50%",
            background: "var(--bg-elevated)",
            display: "grid",
            placeItems: "center",
            position: "relative",
            zIndex: 1,
            color: "var(--text-tertiary)",
          }}
        >
          <User size={32} />
        </div>
      </div>

      {/* Info */}
      <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 3, letterSpacing: "-0.2px" }}>
        {speaker.name}
      </div>
      <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", marginBottom: 4 }}>
        {speaker.role}
      </div>
      <div style={{ fontSize: "0.73rem", fontWeight: 600, color: "var(--accent-light)", marginBottom: 12 }}>
        {speaker.org}
      </div>

      {/* Topics */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {speaker.topics.map((t) => (
          <span
            key={t}
            style={{
              padding: "3px 10px",
              borderRadius: 100,
              background: "var(--tag-bg)",
              border: "1px solid var(--tag-border)",
              color: "var(--tag-text)",
              fontSize: "0.65rem",
              fontWeight: 600,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Bio */}
      <p style={{ fontSize: "0.78rem", color: "var(--text-tertiary)", lineHeight: 1.6, marginBottom: 0 }}>
        {speaker.bio}
      </p>

      <style jsx>{`
        .speaker-card-hover:hover {
          border-color: var(--border-hover) !important;
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          background: var(--bg-card-hover) !important;
        }
      `}</style>
    </div>
  );
}