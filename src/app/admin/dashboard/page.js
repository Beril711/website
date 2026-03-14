"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Calendar, Award, Mail, ClipboardList, Bell } from "lucide-react";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    speakers: 0,
    sessions: 0,
    sponsors: 0,
    registrations: 0,
    messages: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [speakers, sessions, sponsors, registrations, messages, unread] =
        await Promise.all([
          supabase.from("speakers").select("id", { count: "exact", head: true }),
          supabase.from("program_sessions").select("id", { count: "exact", head: true }),
          supabase.from("sponsors").select("id", { count: "exact", head: true }),
          supabase.from("registrations").select("id", { count: "exact", head: true }),
          supabase.from("contact_messages").select("id", { count: "exact", head: true }),
          supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("read", false),
        ]);

      setStats({
        speakers: speakers.count || 0,
        sessions: sessions.count || 0,
        sponsors: sponsors.count || 0,
        registrations: registrations.count || 0,
        messages: messages.count || 0,
        unreadMessages: unread.count || 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Konuşmacı", value: stats.speakers, icon: Users, color: "#A78BFA" },
    { label: "Oturum", value: stats.sessions, icon: Calendar, color: "#60A5FA" },
    { label: "Sponsor", value: stats.sponsors, icon: Award, color: "#F59E0B" },
    { label: "Başvuru", value: stats.registrations, icon: ClipboardList, color: "#34D399" },
    { label: "Mesaj", value: stats.messages, icon: Mail, color: "#F472B6" },
    { label: "Okunmamış", value: stats.unreadMessages, icon: Bell, color: "#EF4444" },
  ];

  return (
    <div>
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 800,
          color: "var(--text-primary)",
          marginBottom: 8,
        }}
      >
        Dashboard
      </h1>
      <p style={{ fontSize: "0.88rem", color: "var(--text-tertiary)", marginBottom: 32 }}>
        Kırşehir Ahi Evran Üniversitesi 1. Yapay Zeka Günleri yönetim paneline hoş geldiniz.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 16,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.label}
            style={{
              padding: "24px 20px",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              transition: "all 0.3s",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <span
                style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-tertiary)" }}
              >
                {card.label}
              </span>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: `${card.color}15`,
                  display: "grid",
                  placeItems: "center",
                  color: card.color,
                }}
              >
                <card.icon size={18} />
              </div>
            </div>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-1px",
              }}
            >
              {stats.speakers === 0 && stats.sessions === 0 ? "—" : card.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}