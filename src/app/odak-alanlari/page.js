import Link from 'next/link';

export const metadata = {
  title: 'Odak Alanları — Mucur AI Days Çalıştayı',
  description: 'Mucur MYO Yapay Zeka Günleri Çalıştayı\'nın 9 bölüm bazlı odak alanları ve workshop konuları.',
};

const BOLUMLER = [
  {
    no: '01',
    emoji: '🖥️',
    bolum: 'Bilgisayar Teknolojileri Bölümü',
    programlar: ['Bilgisayar Destekli Tasarım ve Animasyon', 'Web Tasarımı ve Kodlama'],
    wsCount: 2,
    tag: '2 Workshop',
    tagColor: '#A78BFA',
    tagBg: 'rgba(167,139,250,0.1)',
    tagBorder: 'rgba(167,139,250,0.2)',
    workshops: [
      { salon:'A', title:'YZ Destekli Grafik ve 3B Tasarım', araclar:'Stable Diffusion, Midjourney, Adobe Firefly', desc:'Üretken tasarım; YZ tabanlı animasyon ve 3B modelleme araçları.' },
      { salon:'B', title:'Web Geliştirmede Yapay Zekâ', araclar:'GitHub Copilot, ChatGPT API, Cursor IDE', desc:'YZ destekli front-end/back-end geliştirme ve hata ayıklama.' },
    ],
  },
  {
    no: '02',
    emoji: '⚗️',
    bolum: 'Kimya ve Kimyasal İşlem Teknolojileri Bölümü',
    programlar: ['Kimya Teknolojisi'],
    wsCount: 1,
    tag: '1 Workshop',
    tagColor: '#10b981',
    tagBg: 'rgba(16,185,129,0.08)',
    tagBorder: 'rgba(16,185,129,0.2)',
    workshops: [
      { salon:'C', title:'Kimya Endüstrisinde YZ Uygulamaları', araclar:'Python (scikit-learn), ChemDraw AI, Mendeleev AI', desc:'Proses optimizasyonu, kalite kontrol ve malzeme keşfinde yapay zeka.' },
    ],
  },
  {
    no: '03',
    emoji: '🛡️',
    bolum: 'Mülkiyet Koruma ve Güvenlik Bölümü',
    programlar: ['Acil Durum ve Afet Yönetimi', 'Sivil Savunma ve İtfaiyecilik'],
    wsCount: 1,
    tag: '1 Workshop',
    tagColor: '#F59E0B',
    tagBg: 'rgba(245,158,11,0.08)',
    tagBorder: 'rgba(245,158,11,0.2)',
    workshops: [
      { salon:'D', title:'Afet Yönetiminde YZ: Erken Uyarı ve Risk Analizi', araclar:'ESRI ArcGIS AI, Python (LSTM), OpenStreetMap AI', desc:'YZ destekli afet erken uyarı, drone/sensör verisi analizi, karar destek sistemleri.' },
    ],
  },
  {
    no: '04',
    emoji: '💳',
    bolum: 'Finans – Bankacılık ve Sigortacılık Bölümü',
    programlar: ['Bankacılık ve Sigortacılık'],
    wsCount: 1,
    tag: '1 Workshop',
    tagColor: '#10b981',
    tagBg: 'rgba(16,185,129,0.08)',
    tagBorder: 'rgba(16,185,129,0.2)',
    workshops: [
      { salon:'E', title:'Fintech ve YZ: Kredi, Risk ve Dolandırıcılık Tespiti', araclar:'Python (XGBoost, SHAP), Finans Lab araçları', desc:'Makine öğrenmesi ile kredi skorlaması, gerçek zamanlı dolandırıcılık tespiti.' },
    ],
  },
  {
    no: '05',
    emoji: '🎨',
    bolum: 'Tasarım Bölümü',
    programlar: ['Grafik Tasarımı'],
    wsCount: 1,
    tag: '1 Workshop',
    tagColor: '#A78BFA',
    tagBg: 'rgba(167,139,250,0.1)',
    tagBorder: 'rgba(167,139,250,0.2)',
    workshops: [
      { salon:'F', title:'Generatif YZ ile Grafik Tasarım', araclar:'Canva AI, Adobe Firefly, DALL-E 3, Ideogram', desc:'Logo, afiş ve dijital içerik üretimi; YZ destekli renk ve kompozisyon önerileri.' },
    ],
  },
  {
    no: '06',
    emoji: '✈️',
    bolum: 'Ulaştırma Hizmetleri Bölümü',
    programlar: ['Sivil Hava Ulaştırma İşletmeciliği', 'Posta Hizmetleri'],
    wsCount: 1,
    tag: '1 Workshop',
    tagColor: '#F59E0B',
    tagBg: 'rgba(245,158,11,0.08)',
    tagBorder: 'rgba(245,158,11,0.2)',
    workshops: [
      { salon:'G', title:'Havacılık ve Posta Hizmetlerinde YZ', araclar:'Python (OR-Tools), IBM Decision Optimization', desc:'Rota optimizasyonu, uçuş zamanı tahmini, otonom drone lojistiği.' },
    ],
  },
  {
    no: '07',
    emoji: '🎬',
    bolum: 'Görsel, İşitsel Teknikler ve Medya Yapımcılığı Bölümü',
    programlar: ['Fotoğrafçılık ve Kameramanlık', 'Görsel İletişim'],
    wsCount: 1,
    tag: '1 Workshop',
    tagColor: '#10b981',
    tagBg: 'rgba(16,185,129,0.08)',
    tagBorder: 'rgba(16,185,129,0.2)',
    workshops: [
      { salon:'H', title:'Medya Üretiminde Yapay Zekâ', araclar:'Runway ML, ElevenLabs, Topaz AI, CapCut AI', desc:'Video düzenleme otomasyonu, AI seslendirme, görsel içerik üretimi.' },
    ],
  },
  {
    no: '08',
    emoji: '📦',
    bolum: 'Yönetim ve Organizasyon Bölümü',
    programlar: ['Lojistik'],
    wsCount: 1,
    tag: '1 Workshop',
    tagColor: '#A78BFA',
    tagBg: 'rgba(167,139,250,0.1)',
    tagBorder: 'rgba(167,139,250,0.2)',
    workshops: [
      { salon:'I', title:'Lojistik 4.0: YZ ile Tedarik Zinciri Yönetimi', araclar:'Python (Prophet, OR-Tools), SAP AI, Power BI AI', desc:'YZ destekli talep tahmini, depo otomasyonu, son mil teslimat optimizasyonu.' },
    ],
  },
  {
    no: '09',
    emoji: '🎮',
    bolum: 'Yazılım, Uygulama Geliştirme ve Çözümleme Bölümü',
    programlar: ['Oyun Geliştirme ve Programlama'],
    wsCount: 1,
    tag: '1 Workshop',
    tagColor: '#F59E0B',
    tagBg: 'rgba(245,158,11,0.08)',
    tagBorder: 'rgba(245,158,11,0.2)',
    workshops: [
      { salon:'J', title:'Oyun Geliştirmede YZ: NPC Davranışı ve Prosedürel İçerik', araclar:'Unity ML-Agents, Promethean AI, GitHub Copilot', desc:'Akıllı NPC geliştirme, prosedürel harita/level üretimi, YZ destekli test otomasyonu.' },
    ],
  },
];

export default function OdakAlanlariPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span>Odak Alanları</span>
          </div>
          <h1 className="page-title">
            9 Bölüm, <span className="gradient-text">10 Workshop</span>
          </h1>
          <p className="page-desc">
            Mucur MYO&apos;nun tüm bölümleri kendi uzmanlık alanlarıyla örtüşen yapay zeka workshoplarıyla çalıştayda yer alıyor. Her workshop uygulamalı, interaktif ve proje tabanlı.
          </p>
          <div className="odak-stats">
            {[['9','Bölüm'],['14','Program'],['10','Workshop Salonu'],['25','Kişi/Salon Kontenjan']].map(([v,l]) => (
              <div key={l} className="odak-stat">
                <div className="odak-stat-val">{v}</div>
                <div className="odak-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section style={{ padding:'20px 0 100px' }}>
        <div className="container">
          <div className="odak-grid">
            {BOLUMLER.map(b => (
              <div key={b.no} className="odak-card">
                <div className="odak-card-top">
                  <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <div className="odak-emoji">{b.emoji}</div>
                    <span style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--text-tertiary)', letterSpacing:'1px' }}>BÖLÜM {b.no}</span>
                  </div>
                  <span className="odak-tag" style={{ background:b.tagBg, borderColor:b.tagBorder, color:b.tagColor }}>{b.tag}</span>
                </div>

                <h2 className="odak-title">{b.bolum}</h2>

                <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                  {b.programlar.map(p => (
                    <span key={p} style={{ fontSize:'0.72rem', padding:'3px 8px', borderRadius:'6px', background:'var(--icon-bg)', border:'1px solid var(--icon-border)', color:'var(--text-secondary)' }}>{p}</span>
                  ))}
                </div>

                <div className="odak-details">
                  {b.workshops.map(w => (
                    <div key={w.salon} style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                        <span style={{ fontSize:'0.65rem', fontWeight:800, color:b.tagColor, letterSpacing:'1px', flexShrink:0 }}>SALON {w.salon}</span>
                        <span style={{ fontSize:'0.82rem', fontWeight:700, color:'var(--text-primary)', lineHeight:1.3 }}>{w.title}</span>
                      </div>
                      <p style={{ fontSize:'0.78rem', color:'var(--text-tertiary)', lineHeight:1.5, margin:0 }}>{w.desc}</p>
                      <div style={{ fontSize:'0.72rem', color:'var(--text-tertiary)', padding:'4px 8px', background:'var(--code-bg)', borderRadius:'6px', marginTop:'2px' }}>
                        🛠 {w.araclar}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* AÇIK SEANS */}
          <div style={{ border:'1px solid rgba(16,185,129,0.2)', borderRadius:'var(--radius-lg)', padding:'32px', background:'rgba(16,185,129,0.04)', marginBottom:'48px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px' }}>
              <span style={{ fontSize:'1.8rem' }}>🌐</span>
              <div>
                <div style={{ fontSize:'0.68rem', fontWeight:800, letterSpacing:'1.5px', textTransform:'uppercase', color:'#10b981' }}>SALON K — HERKESE AÇIK</div>
                <div style={{ fontSize:'1.05rem', fontWeight:800, color:'var(--text-primary)' }}>Açık Seans – Temel YZ Araçları</div>
              </div>
            </div>
            <p style={{ fontSize:'0.88rem', color:'var(--text-secondary)', lineHeight:1.7, margin:'0 0 12px' }}>
              15:20–16:30 saatleri arasında düzenlenecek Açık Seans, dışarıdan katılan tüm öğrenci ve öğretim elemanlarına yönelik temel yapay zeka araçları workshopudur. ChatGPT, Gemini ve Microsoft Copilot&apos;un günlük hayatta ve mesleki süreçlerde kullanımı uygulamalı olarak işlenecektir.
            </p>
            <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
              <span style={{ fontSize:'0.78rem', color:'var(--text-tertiary)' }}>👥 Kontenjan: 30 kişi</span>
              <span style={{ fontSize:'0.78rem', color:'var(--text-tertiary)' }}>⏱ Süre: 2 saat 10 dk</span>
              <span style={{ fontSize:'0.78rem', color:'var(--text-tertiary)' }}>🛠 ChatGPT, Gemini, Microsoft Copilot</span>
              <span style={{ fontSize:'0.78rem', fontWeight:700, color:'#10b981' }}>✅ Ön kayıt zorunludur</span>
            </div>
          </div>

          {/* CTA */}
          <div className="odak-cta">
            <h3>Workshop&apos;lara Katılmak İster misiniz?</h3>
            <p>Tüm workshoplar ücretsizdir. Sınırlı kontenjan için kaydınızı oluşturun.</p>
            <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
              <Link href="/kayit" className="btn btn-primary" style={{ padding:'13px 32px' }}>
                Ücretsiz Kayıt Ol
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width:'16px', height:'16px' }}>
                  <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/program" className="btn btn-ghost" style={{ padding:'13px 32px' }}>3 Günlük Programı İncele</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}