"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Award,
  Mail,
  ClipboardList,
  Settings,
  LogOut,
  Menu,
  X,
  Layers,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Konuşmacılar", href: "/admin/dashboard/speakers", icon: Users },
  { label: "Program", href: "/admin/dashboard/program", icon: Calendar },
  { label: "Sponsorlar", href: "/admin/dashboard/sponsors", icon: Award },
  { label: "Başvurular", href: "/admin/dashboard/registrations", icon: ClipboardList },
  { label: "Mesajlar", href: "/admin/dashboard/messages", icon: Mail },
  { label: "Ayarlar", href: "/admin/dashboard/settings", icon: Settings },
];

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.push("/admin");
      else setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "var(--bg)",
          color: "var(--text-tertiary)",
        }}
      >
        Yükleniyor...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* Sidebar */}
      <aside
        className="admin-sidebar"
        style={{
          width: 260,
          background: "var(--bg-elevated)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : undefined,
          bottom: 0,
          zIndex: 50,
          transition: "transform 0.3s",
        }}
      >
        {/* Brand */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/admin/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontWeight: 800,
              fontSize: "1rem",
              color: "var(--text-primary)",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, var(--purple), var(--blue))",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Layers size={16} color="white" />
            </div>
            Admin Panel
          </Link>
          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "var(--text-tertiary)",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  borderRadius: 10,
                  marginBottom: 4,
                  fontSize: "0.85rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "var(--accent-light)" : "var(--text-tertiary)",
                  background: isActive ? "var(--icon-bg)" : "transparent",
                  transition: "all 0.2s",
                }}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User & Logout */}
        <div
          style={{
            padding: "16px 20px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--text-tertiary)",
              marginBottom: 8,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user.email}
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "100%",
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--text-tertiary)",
              fontSize: "0.82rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >
            <LogOut size={16} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: 260, minHeight: "100vh" }}>
        {/* Top bar */}
        <div
          style={{
            padding: "16px 32px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(true)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            <Menu size={24} />
          </button>
          <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>
            Mucur AI Days 2026 — Yönetim Paneli
          </div>
          <Link
            href="/"
            target="_blank"
            style={{
              fontSize: "0.8rem",
              color: "var(--accent-light)",
              fontWeight: 600,
            }}
          >
            Siteyi Görüntüle ↗
          </Link>
        </div>

        {/* Page content */}
        <div style={{ padding: 32 }}>{children}</div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
        />
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .admin-sidebar {
            transform: translateX(${sidebarOpen ? "0" : "-100%"}) !important;
            width: 280px !important;
          }
          main {
            margin-left: 0 !important;
          }
          .sidebar-toggle {
            display: block !important;
          }
          .sidebar-close {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}