'use client';
import { useState } from 'react';
import Link from 'next/link';
import { GUN1, GUN2, GUN3 } from '@/constants/programData';

const TYPE_COLORS = {
  opening:  { bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.2)', text: '#94a3b8' },
  konusma:  { bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)', text: '#A78BFA' },
  panel:    { bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)',  text: '#10b981' },
  workshop: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)',  text: '#F59E0B' },
  arasol:   { bg: 'rgba(100,116,139,0.05)', border: 'rgba(100,116,139,0.1)', text: '#64748b' },
};

const GUNS = [
  { key: 'gun1', label: '1. Gün', sublabel: 'Açılış & Sektör Oturumları', items: GUN1, color: '#A78BFA' },
  { key: 'gun2', label: '2. Gün', sublabel: 'Workshop Günü',               items: GUN2, color: '#F59E0B' },
  { key: 'gun3', label: '3. Gün', sublabel: 'Sunumlar & Kapanış',          items: GUN3, color: '#10b981' },
];

const WORKSHOPS = [
  { salon:'A', title:'YZ Destekli Grafik ve 3B Tasarım',                   bolum:'Bilgisayar Teknolojileri', egitmen:'Öğr. Gör. Hüsnü Karadağ', arac:'Stable Diffusion, Midjourney, Adobe Firefly' },
  { salon:'B', title:'Web Geliştirmede Yapay Zekâ',                        bolum:'Bilgisayar Teknolojileri', egitmen:'Öğr. Gör. Hüsnü Karadağ', arac:'GitHub Copilot, ChatGPT API, Cursor IDE' },
  { salon:'C', title:'Kimya Endüstrisinde YZ Uygulamaları',                bolum:'Kimya ve Kimyasal İşlem Teknolojileri', egitmen:'Bölüm Başkanı', arac:'Python (scikit-learn), ChemDraw AI' },
  { salon:'D', title:'Afet Yönetiminde YZ: Erken Uyarı ve Risk Analizi',  bolum:'Mülkiyet Koruma ve Güvenlik', egitmen:'Bölüm Başkanı', arac:'ESRI ArcGIS AI, Python (LSTM)' },
  { salon:'E', title:'Fintech ve YZ: Kredi, Risk ve Dolandırıcılık Tespiti', bolum:'Finans – Bankacılık ve Sigortacılık', egitmen:'Bölüm Başkanı', arac:'Python (XGBoost, SHAP)' },
  { salon:'F', title:'Generatif YZ ile Grafik Tasarım',                    bolum:'Tasarım Bölümü', egitmen:'Bölüm Başkanı', arac:'Canva AI, Adobe Firefly, DALL-E 3' },
  { salon:'G', title:'Havacılık ve Posta Hizmetlerinde YZ',                bolum:'Ulaştırma Hizmetleri', egitmen:'Bölüm Başkanı', arac:'Python (OR-Tools), IBM Decision Optimization' },
  { salon:'H', title:'Medya Üretiminde Yapay Zekâ',                        bolum:'Görsel, İşitsel Teknikler ve Medya', egitmen:'Bölüm Başkanı', arac:'Runway ML, ElevenLabs, CapCut AI' },
  { salon:'I', title:'Lojistik 4.0: YZ ile Tedarik Zinciri Yönetimi',     bolum:'Yönetim ve Organizasyon', egitmen:'Bölüm Başkanı', arac:'Python (Prophet), SAP AI, Power BI AI' },
  { salon:'J', title:'Oyun Geliştirmede YZ: NPC ve Prosedürel İçerik',    bolum:'Yazılım, Uygulama Geliştirme ve Çözümleme', egitmen:'Bölüm Başkanı', arac:'Unity ML-Agents, Promethean AI' },
  { salon:'K', title:'Açık Seans — Temel YZ Araçları',                    bolum:'Tüm Bölümler / Dış Katılımcılar', egitmen:'Gönüllü Öğr. El.', arac:'ChatGPT, Gemini, Microsoft Copilot', acik:true },
];

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
            {item.typeLabel}
          </span>
          {item.location && <span className="prog-location">📍 {item.location}</span>}
        </div>
        <div className="prog-title">{item.title}</div>
        {item.desc && <div className="prog-desc">{item.desc}</div>}
        {item.speaker && (
          <div className="prog-speaker">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            {item.speaker}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProgramPage() {
  const [activeGun, setActiveGun] = useState('gun1');
  const [showWS, setShowWS] = useState(false);

  const activeData = GUNS.find(g => g.key === activeGun);

  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span>Program</span>
          </div>
          <h1 className="page-title">3 Günlük <span className="gradient-text">Çalıştay Programı</span></h1>
          <p className="page-desc">
            Açılış töreni ve sektör oturumlarından uygulamalı workshoplara, proje sunumlarından kapanış törenine uzanan yoğun bir program.
          </p>
          <div className="prog-stats">
            {[['3','Gün'],['10','Workshop Salonu'],['9','Bölüm'],['4','Sektör Sunumu']].map(([v,l]) => (
              <div key={l} className="prog-stat">
                <div className="prog-stat-val">{v}</div>
                <div className="prog-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 40px 100px' }}>

        {/* GÜN TABLARI */}
        <div className="prog-gun-tabs">
          {GUNS.map(g => (
            <button
              key={g.key}
              className={`prog-gun-tab${activeGun === g.key ? ' prog-gun-tab--active' : ''}`}
              style={activeGun === g.key ? { borderColor: g.color, color: g.color, background: `${g.color}12` } : {}}
              onClick={() => setActiveGun(g.key)}
            >
              <span className="prog-gun-tab-label">{g.label}</span>
              <span className="prog-gun-tab-sub">{g.sublabel}</span>
            </button>
          ))}
        </div>

        {/* PROGRAM AKIŞI */}
        <div className="prog-flow">
          {activeData.items.map(item => (
            <SessionRow key={item.id} item={item} />
          ))}
        </div>

        {/* WORKSHOP DETAY BÖLÜMÜ */}
        <div className="prog-ws-section">
          <button className="prog-ws-toggle" onClick={() => setShowWS(!showWS)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width:'20px', height:'20px', color:'#F59E0B' }}>
              <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
            </svg>
            Workshop Salon Detayları (2. Gün — Salon A–K)
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width:'16px', height:'16px', marginLeft:'auto', transform: showWS ? 'rotate(180deg)' : 'none', transition:'transform 0.3s' }}>
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

          {showWS && (
            <div className="prog-ws-grid">
              {WORKSHOPS.map(ws => (
                <div key={ws.salon} className={`prog-ws-card${ws.acik ? ' prog-ws-card--acik' : ''}`}>
                  <div className="prog-ws-salon">Salon {ws.salon}</div>
                  <div className="prog-ws-title">{ws.title}</div>
                  <div className="prog-ws-bolum">{ws.bolum}</div>
                  <div className="prog-ws-meta">
                    <span>👤 {ws.egitmen}</span>
                    <span>🛠 {ws.arac}</span>
                    {!ws.acik && <span>👥 Max. 25 kişi · 3 saat</span>}
                    {ws.acik  && <span>👥 Max. 30 kişi · 2 saat 10 dk · Herkese Açık</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="odak-cta" style={{ marginTop: '60px' }}>
          <h3>Yerinizi Ayırtın</h3>
          <p>Workshoplar sınırlı kontenjanla sunulmaktadır. Ücretsiz kaydınızı oluşturun.</p>
          <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/kayit" className="btn btn-primary" style={{ padding:'13px 32px' }}>
              Kayıt Ol
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width:'16px', height:'16px' }}>
                <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link href="/iletisim" className="btn btn-ghost" style={{ padding:'13px 32px' }}>İletişime Geçin</Link>
          </div>
        </div>

      </div>
    </>
  );
}