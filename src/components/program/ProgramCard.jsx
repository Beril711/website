"use client";
import { MapPin, User, Coffee, Mic, Users, Wrench } from "lucide-react";

const typeIcons = {
  keynote: Mic,
  panel: Users,
  workshop: Wrench,
  break: Coffee,
};

const typeLabels = {
  keynote: "Konuşma",
  panel: "Panel",
  workshop: "Workshop",
  break: "Mola",
};

export default function ProgramCard({ session }) {
  const Icon = typeIcons[session.type] || Mic;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        background: "var(--bg-card)",
        transition: "all 0.35s",
        cursor: "default",
      }}
      className="program-card-hover"
    >
      {/* Time */}
      <div
        style={{
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRight: "1px solid var(--border)",
          background: "var(--code-bg)",
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>
          {session.time}
        </div>
        <span style={{ fontSize: "0.68rem", fontWeight: 500, color: "var(--text-tertiary)", marginTop: 2 }}>
          {session.duration}
        </span>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "22px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "2px 8px",
                borderRadius: 6,
                background: "var(--icon-bg)",
                border: "1px solid var(--icon-border)",
                fontSize: "0.65rem",
                fontWeight: 600,
                color: "var(--accent-light)",
              }}
            >
              <Icon size={10} />
              {typeLabels[session.type]}
            </div>
          </div>
          <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4, letterSpacing: "-0.2px" }}>
            {session.title}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", marginBottom: session.speaker ? 6 : 0 }}>
            {session.description}
          </div>
          {session.speaker && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.75rem", fontWeight: 600, color: "var(--accent-light)", marginTop: 6 }}>
              <User size={12} />
              {session.speaker}
            </div>
          )}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: "0.7rem",
            fontWeight: 500,
            color: "var(--text-tertiary)",
            background: "var(--code-bg)",
            padding: "4px 10px",
            borderRadius: 6,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <MapPin size={12} style={{ opacity: 0.6 }} />
          {session.location}
        </div>
      </div>

      <style jsx>{`
        .program-card-hover:hover {
          border-color: var(--border-hover) !important;
          box-shadow: var(--shadow-md);
          transform: translateX(4px);
          background: var(--bg-card-hover) !important;
        }
        @media (max-width: 768px) {
          .program-card-hover {
            grid-template-columns: 110px 1fr !important;
          }
          .program-card-hover > div:last-child {
            flex-direction: column;
            align-items: flex-start !important;
          }
        }
        @media (max-width: 480px) {
          .program-card-hover {
            grid-template-columns: 1fr !important;
          }
          .program-card-hover > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid var(--border);
            padding: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}