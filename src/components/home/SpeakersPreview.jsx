'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const speakers = [
  { id: 1, name: 'Dr. Öğr. Üyesi Şaban Fındık', role: 'Bilgisayar Teknolojileri Bölüm Başkanı', org: 'Mucur Meslek Yüksekokulu' },
  { id: 2, name: 'Prof. Dr. Mustafa Kasım Karahocagil', role: 'Rektör', org: 'Kırşehir Ahi Evran Üniversitesi' },
  { id: 3, name: 'Prof. Dr. Murat Çanlı', role: 'Müdür', org: 'Mucur Meslek Yüksekokulu' },
  { id: 4, name: 'Doç. Dr. Yusuf Ziya Olpak', role: 'Yapay Zeka Yardımcısı', org: 'Kırşehir Ahi Evran Üniversitesi' },
  { id: 5, name: 'Emre Yeşilbay', role: 'Kaymakam', org: 'Mucur Kaymakamlığı' },
];

function usePageSize() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    function update() {
      if (window.innerWidth <= 480) setCols(2);
      else if (window.innerWidth <= 768) setCols(2);
      else setCols(4);
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return cols;
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ArrowButton({ direction, onClick, disabled }) {
  const isLeft = direction === 'left';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={isLeft ? 'Önceki' : 'Sonraki'}
      className="speaker-arrow-btn"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: '1.5px solid var(--border)',
        background: disabled ? 'transparent' : 'var(--surface-elevated)',
        color: disabled ? 'var(--text-quaternary)' : 'var(--text-secondary)',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all 0.25s ease',
        flexShrink: 0,
        opacity: disabled ? 0.35 : 1,
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: 20, height: 20 }}>
        {isLeft
          ? <path d="M19 12H5M12 19l-7-7 7-7" />
          : <path d="M5 12h14M12 5l7 7-7 7" />
        }
      </svg>
    </button>
  );
}

export default function SpeakersPreview() {
  const cols = usePageSize();
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(speakers.length / cols);
  const visible = speakers.slice(page * cols, page * cols + cols);

  // Sayfa sayısı değiştiğinde geçersiz sayfayı sıfırla
  useEffect(() => {
    if (page >= totalPages) setPage(Math.max(0, totalPages - 1));
  }, [cols, totalPages, page]);

  const isMobile = cols <= 2;

  return (
    <section className="section section--alt" id="speakers">
      <div className="container">
        <div className="section-header section-header--center reveal">
          <div className="section-eyebrow">Konuşmacılar</div>
          <h2 className="section-heading">
            Alanında <span className="gradient-text">Uzman</span> İsimler
          </h2>
          <p className="section-desc">
            Akademi ve sektörden bir araya gelen deneyimli konuşmacılar.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: isMobile ? 20 : 16,
        }}>
          {!isMobile && (
            <ArrowButton
              direction="left"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0}
            />
          )}

          <div
            className="speakers-grid stagger"
            style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridAutoRows: isMobile ? 'auto' : 280,
              minHeight: isMobile ? 280 : 'auto',
              gap: isMobile ? 12 : 20,
              width: '100%',
            }}
          >
            {visible.map((s) => (
              <div key={s.id} className="speaker-card">
                <div className="speaker-avatar">
                  <div className="speaker-avatar-inner">
                    <PersonIcon />
                  </div>
                </div>
                <div className="speaker-name">{s.name}</div>
                <div className="speaker-role">{s.role}</div>
                <div className="speaker-org">{s.org}</div>
              </div>
            ))}
            {Array.from({ length: cols - visible.length }).map((_, i) => (
              <div key={`empty-${i}`} style={{ visibility: 'hidden' }} className="speaker-card" />
            ))}
          </div>

          {!isMobile && (
            <ArrowButton
              direction="right"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages - 1}
            />
          )}

          {isMobile && totalPages > 1 && (
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <ArrowButton
                direction="left"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 0}
              />
              <span style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--text-tertiary)',
              }}>
                {page + 1} / {totalPages}
              </span>
              <ArrowButton
                direction="right"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages - 1}
              />
            </div>
          )}
        </div>

        <div className="section-footer reveal">
          <Link href="/konusmacilar" className="btn-view-all">
            Tüm Konuşmacıları Gör
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}