'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import OdakStats from '@/components/odak/OdakStats';
import { supabase } from '@/lib/supabase';

export default function OdakAlanlariPage() {
  const [bolumler, setBolumler] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      const { data } = await supabase
        .from('odak_alanlari')
        .select('*')
        .eq('visible', true)
        .order('sort_order', { ascending: true });
      setBolumler(data || []);
      setLoading(false);
    };
    fetchAreas();
  }, []);

  const totalWs = bolumler.reduce((sum, b) => sum + (b.ws_count || 0), 0);

  return (
    <>
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span>Odak Alanları</span>
          </div>
          <h1 className="page-title">
            5 Bölüm, <span className="gradient-text">12 Workshop</span>
          </h1>
          <p className="page-desc">
            Mucur MYO&apos;nun tüm bölümleri kendi uzmanlık alanlarıyla örtüşen yapay zeka workshoplarıyla çalıştayda yer alıyor. Her workshop uygulamalı, interaktif ve proje tabanlı.
          </p>
          <OdakStats />
        </div>
      </div>

      <section style={{ padding: '20px 0 100px' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-tertiary)' }}>Yükleniyor...</div>
          ) : (
            <div className="odak-grid">
              {bolumler.map(b => {
                const workshops = Array.isArray(b.workshops) ? b.workshops : [];
                const programlar = Array.isArray(b.programlar) ? b.programlar : [];
                return (
                  <div key={b.id} className="odak-card">
                    <div className="odak-card-top">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="odak-emoji">{b.emoji}</div>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '1px' }}>BÖLÜM {b.no}</span>
                      </div>
                      <span className="odak-tag" style={{ background: b.tag_bg, borderColor: b.tag_border, color: b.tag_color }}>{b.tag}</span>
                    </div>
                    <h2 className="odak-title">{b.bolum}</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {programlar.map(p => (
                        <span key={p} style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', background: 'var(--icon-bg)', border: '1px solid var(--icon-border)', color: 'var(--text-secondary)' }}>{p}</span>
                      ))}
                    </div>
                    <div className="odak-details">
                      {workshops.map(w => (
                        <div key={w.salon} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: b.tag_color, letterSpacing: '1px', flexShrink: 0 }}>SALON {w.salon}</span>
                            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{w.title}</span>
                          </div>
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', lineHeight: 1.5, margin: 0 }}>{w.desc}</p>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', padding: '4px 8px', background: 'var(--code-bg)', borderRadius: '6px', marginTop: '2px' }}>
                            🛠 {w.araclar}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div className="odak-cta">
            <h3>Workshop&apos;lara Katılmak İster misiniz?</h3>
            <p>Tüm workshoplar ücretsizdir. Sınırlı kontenjan için kaydınızı oluşturun.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/kayit" className="btn btn-primary" style={{ padding: '13px 32px' }}>
                Ücretsiz Kayıt Ol
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: '16px', height: '16px' }}>
                  <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/program" className="btn btn-ghost" style={{ padding: '13px 32px' }}>3 Günlük Programı İncele</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}