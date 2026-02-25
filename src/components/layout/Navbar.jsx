'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import logoImg from '@/logo/logo2.png';

const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/program', label: 'Program' },
  { href: '/konusmacilar', label: 'Konuşmacılar' },
  { href: '/odak-alanlari', label: 'Odak Alanları' },
  { href: '/sponsorlar', label: 'Sponsorlarımız' },
  { href: '/iletisim', label: 'İletişim' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        {/* LOGO */}
        <Link href="/" className="nav-brand">
          <Image src={logoImg} alt="Mucur AI Days" width={42} height={42} style={{ borderRadius: 10 }} />
          Mucur<span className="accent">AI</span>Days
        </Link>

        {/* DESKTOP MENÜ */}
        <ul className="nav-menu">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>

        {/* AKSIYON BUTONLARI */}
        <div className="nav-actions">
          {/* Desktop tema butonu */}
          <div className="nav-theme-desktop">
            <ThemeToggle />
          </div>

          <Link href="/kayit" className="btn btn-primary nav-cta">
            Kayıt Ol
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Hamburger — en sağda */}
          <button
            className="hamburger"
            aria-label="Menü"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBİL MENÜ */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="mobile-menu-item"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link href="/kayit" className="btn btn-primary" style={{ margin: '8px 20px' }} onClick={() => setMenuOpen(false)}>
            Kayıt Ol
          </Link>
          <div className="mobile-menu-theme">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}