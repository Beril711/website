import Link from 'next/link';
import ProgramList from '@/components/program/ProgramList';

export const metadata = {
  title: 'Program — Mucur AI Days 2025',
  description: '20 Kasım 2025 Mucur AI Days etkinliğinin detaylı programı.',
};

export default function ProgramPage() {
  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span>Program</span>
          </div>
          <h1 className="page-title">Etkinlik <span className="gradient-text">Programı</span></h1>
          <p className="page-desc">20 Kasım 2025 tarihinde gerçekleşecek Mucur AI Days etkinliğinin detaylı programı. Konuşmalar, paneller ve workshop&apos;lar tek sayfada.</p>
          <div className="page-meta">
            <div className="page-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              20 Kasım 2025, Perşembe
            </div>
            <div className="page-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              09:00 — 17:30
            </div>
            <div className="page-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Mucur MYO, Kırşehir
            </div>
            <div className="page-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              10+ Oturum
            </div>
          </div>
        </div>
      </div>

      {/* PROGRAM LİSTESİ (client) */}
      <ProgramList />
    </>
  );
}