'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DayTabs from '@/components/ui/DayTabs';
import { useCountUp, useInView } from '@/hooks/useCountUp';
import { supabase } from '@/lib/supabase';

const TYPE_COLORS = {
  opening: { bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.2)', text: '#94a3b8' },
  konusma: { bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)', text: '#A78BFA' },
  panel:   { bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)',  text: '#10b981' },
  workshop:{ bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)',  text: '#F59E0B' },
  arasol:  { bg: 'rgba(100,116,139,0.05)', border: 'rgba(100,116,139,0.1)', text: '#64748b' },
};

const STATS = [
  { value: 3, label: 'Gün' },
  { value: 10, label: 'Workshop Salonu' },
  { value: 9, label: 'Bölüm' },
  { value: 4, label: 'Sektör Sunumu' },
];

function AnimatedStat({ value, label, start }) {
  const count = useCountUp(value, 1200, start);
  return (
    <div className="prog-stat">
      <div className="prog-stat-val">{count}</div>
      <div className="prog-stat-label">{label}</div>
    </div>
  );
}

function SessionRow({ item }) {
  const color = TYPE_COLORS[item.type] || TYPE_COLORS.konusma;
  if (item.type === 'arasol') {
    return (
      <div className="prog-row prog-row--break">
        <div className="prog-time">{item.time}</div>
        <div className="prog-break-label">{item.title}{item.location ? ` — ${item.location}` : ''}</div>
      </div>
    );
  }
  return (
    <div className={`prog-row${item.highlight ? ' prog-row--highlight' : ''}`}>
      <div className="prog-time-col">
        <div className="prog-time">{item.time}</div>
        {item.duration && <div className="prog-dur">{item.duration}</div>}
      </div>
      <div className="prog-dot-col">
        <div className="prog-dot" style={{ background: color.text }} />
        <div className="prog-line" />
      </div>
      <div className="prog-card" style={{ borderColor: item.highlight ? color.border : 'var(--border)' }}>
        <div className="prog-card-top">
          <span className="prog-badge" style={{ background: color.bg, borderColor: color.border, color: color.text }}>
            {item.type_label || item.typeLabel}
          </span>
          {item.location && <span className="prog-location">📍 {item.location}</span>}
        </div>
        <div className="prog-title">{item.title}</div>
        {item.desc && <div className="prog-desc">{item.desc}</div>}
        {item.speaker && (
          <div className="prog-speaker">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            {item.speaker}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProgramPage() {
  const [sessions, setSessions] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [activeGun, setActiveGun] = useState('gun1');
  const [showWS, setShowWS] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statsRef, statsVisible] = useInView(0.3);

  useEffect(() => {
    const fetchData = async () => {
      const { data: sessionData } = await supabase
        .from('program_sessions')
        .select('*')
        .order('sort_order', { ascending: true });

      const { data: wsData } = await supabase
        .from('odak_alanlari')
        .select('*')
        .eq('visible', true)
        .order('sort_order', { ascending: true });

      setSessions(sessionData || []);

      // Workshop listesini odak_alanlari'ndan oluştur
      const wsList = [];
      (wsData || []).forEach(b => {
        (b.workshops || []).forEach(w => {
          wsList.push({
            salon: w.salon,
            title: w.title,
            bolum: b.bolum,
            egitmen: '',
            arac: w.araclar,
          });
        });
      });
      setWorkshops(wsList);
      setLoading(false);
    };
    fetchData();
  }, []);

  const gunMap = { gun1: 1, gun2: 2, gun3: 3 };
  const activeItems = sessions.filter(s => s.gun === gunMap[activeGun]);

  return (
    <>
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span>Program</span>
          </div>
          <h1 className="page-title">3 Günlük <span className="gradient-text">Çalıştay Programı</span></h1>
          <p className="page-desc">
            Açılış töreni ve sektör oturumlarından uygulamalı workshoplara, proje sunumlarından kapanış törenine uzanan yoğun bir program.
          </p>
          <div className="prog-stats" ref={statsRef}>
            {STATS.map((s) => (
              <AnimatedStat key={s.label} value={s.value} label={s.label} start={statsVisible} />
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 40px 100px' }}>
        <DayTabs activeDay={activeGun} onChange={setActiveGun} />

        <div className="prog-flow">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-tertiary)' }}>Yükleniyor...</div>
          ) : activeItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-tertiary)' }}>Bu güne ait program henüz eklenmemiş.</div>
          ) : (
            activeItems.map(item => <SessionRow key={item.id} item={item} />)
          )}
        </div>

        {/* WORKSHOP DETAY */}
        <div className="prog-ws-section">
          <button className="prog-ws-toggle" onClick={() => setShowWS(!showWS)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: '20px', height: '20px', color: '#F59E0B' }}>
              <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
            </svg>
            Workshop Salon Detayları (2. Gün — Salon A–K)
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: '16px', height: '16px', marginLeft: 'auto', transform: showWS ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {showWS && (
            <div className="prog-ws-grid">
              {workshops.map(ws => (
                <div key={ws.salon} className="prog-ws-card">
                  <div className="prog-ws-salon">Salon {ws.salon}</div>
                  <div className="prog-ws-title">{ws.title}</div>
                  <div className="prog-ws-bolum">{ws.bolum}</div>
                  <div className="prog-ws-meta">
                    <span>🛠 {ws.arac}</span>
                    <span>👥 Max. 25 kişi · 3 saat</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="odak-cta" style={{ marginTop: '60px' }}>
          <h3>Yerinizi Ayırtın</h3>
          <p>Workshoplar sınırlı kontenjanla sunulmaktadır. Ücretsiz kaydınızı oluşturun.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/kayit" className="btn btn-primary" style={{ padding: '13px 32px' }}>
              Kayıt Ol
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: '16px', height: '16px' }}>
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/iletisim" className="btn btn-ghost" style={{ padding: '13px 32px' }}>İletişime Geçin</Link>
          </div>
        </div>
      </div>
    </>
  );
}