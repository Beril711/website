'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SpeakerCard from '@/components/konusmacilar/SpeakerCard';
import { supabase } from '@/lib/supabase';

export default function KonusmacilarPage() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakers = async () => {
      const { data } = await supabase
        .from('speakers')
        .select('*')
        .eq('visible', true)
        .order('sort_order', { ascending: true });
      setSpeakers(data || []);
      setLoading(false);
    };
    fetchSpeakers();
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span>Konuşmacılar</span>
          </div>
          <h1 className="page-title">Etkinlik <span className="gradient-text">Konuşmacıları</span></h1>
          <p className="page-desc">Akademi ve sektörün önde gelen isimlerinden oluşan konuşmacı kadromuz. Yapay Zekâ, veri bilimi ve dijital dönüşüm alanlarında uzman isimleri bir araya getiriyoruz.</p>
        </div>
      </div>

      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <div style={{ marginBottom: '48px' }}>
            <div className="section-eyebrow">Tüm Konuşmacılar</div>
            <h2 className="section-heading">{loading ? '...' : speakers.length} <span className="gradient-text">Uzman</span> İsim</h2>
          </div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-tertiary)' }}>Yükleniyor...</div>
          ) : (
            <div className="speakers-grid-full">
              {speakers.map(s => <SpeakerCard key={s.id} speaker={s} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}