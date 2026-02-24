"use client";
import { useState } from "react";
import ProgramCard from "./ProgramCard";
import { programSessions, programTypes } from "@/constants/programData";

export default function ProgramList() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? programSessions
      : programSessions.filter((s) => s.type === activeFilter);

  return (
    <div>
      {/* Filter bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginBottom: 40,
          flexWrap: "wrap",
        }}
      >
        {programTypes.map((t) => (
          <button
            key={t.value}
            onClick={() => setActiveFilter(t.value)}
            style={{
              padding: "8px 20px",
              borderRadius: 100,
              border: "1px solid",
              borderColor:
                activeFilter === t.value ? "var(--accent-light)" : "var(--border)",
              background:
                activeFilter === t.value ? "var(--icon-bg)" : "transparent",
              color:
                activeFilter === t.value
                  ? "var(--accent-light)"
                  : "var(--text-tertiary)",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s",
              fontFamily: "inherit",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sessions */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 780,
          margin: "0 auto",
        }}
      >
        {filtered.map((session) => (
          <ProgramCard key={session.id} session={session} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "var(--text-tertiary)",
            marginTop: 40,
            fontSize: "0.9rem",
          }}
        >
          Bu kategoride henüz oturum bulunmuyor.
        </p>
      )}
    </div>
  );
}