'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const TIER_LABELS = {
  platinum: 'Platin Sponsor',
  gold: 'Altın Sponsor',
  silver: 'Gümüş Sponsor',
  standard: 'Destekçi',
};

const TIER_COLORS = {
  platinum: { color: '#e2e8f0', bg: 'rgba(226,232,240,0.08)', border: 'rgba(226,232,240,0.2)' },
  gold:     { color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)' },
  silver:   { color: '#94a3b8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.2)' },
  standard: { color: '#A78BFA', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)' },
};

const TIER_ORDER = ['platinum', 'gold', 'silver', 'standard'];

export default function SponsorlarPage() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      const { data } = await supabase
        .from('sponsors')
        .select('*')
        .eq('visible', true)
        .order('sort_order', { ascending: true });
      setSponsors(data || []);
      setLoading(false);
    };
    fetchSponsors();
  }, []);

  const grouped = TIER_ORDER.reduce((acc, tier) => {
    const items = sponsors.filter(s => s.tier === tier);
    if (items.length > 0) acc[tier] = items;
    return acc;
  }, {});

  return (
    <>
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span>Sponsorlarımız</span>
          </div>
          <h1 className="page-title">Etkinliği <span className="gradient-text">Destekleyenler</span></h1>
          <p className="page-desc">Mucur AI Days 2026'yı mümkün kılan kurum ve kuruluşlar. Destekleri için teşekkür ederiz.</p>
        </div>
      </div>

      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-tertiary)' }}>Yükleniyor...</div>
          ) : sponsors.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-tertiary)' }}>Henüz sponsor bilgisi eklenmemiş.</div>
          ) : (
            Object.entries(grouped).map(([tier, items]) => {
              const colors = TIER_COLORS[tier] || TIER_COLORS.standard;
              return (
                <div key={tier} style={{ marginBottom: 60 }}>
                  <div style={{ marginBottom: 24 }}>
                    <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 100, background: colors.bg, border: `1px solid ${colors.border}`, color: colors.color, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                      {TIER_LABELS[tier] || tier}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                    {items.map(s => (
                      <a key={s.id} href={s.website || '#'} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', borderRadius: 'var(--radius)', border: `1px solid ${colors.border}`, background: colors.bg, color: colors.color, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', transition: 'all 0.2s', minHeight: 100 }}>
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}