import Link from 'next/link';

export const metadata = {
  title: 'Odak Alanları — Mucur AI Days 2025',
  description: 'Mucur AI Days etkinliğinin odaklandığı yapay zeka alanları ve uygulama konuları.',
};

const AREAS = [
  {
    emoji: '🤖',
    title: 'Makine Öğrenmesi',
    tag: 'Temel Alan',
    tagColor: '#A78BFA',
    tagBg: 'rgba(167,139,250,0.1)',
    tagBorder: 'rgba(167,139,250,0.2)',
    desc: 'Denetimli, denetimsiz ve pekiştirmeli öğrenme yöntemleri ile gerçek dünya uygulamaları. Sınıflandırma, regresyon ve kümeleme algoritmalarından oluşan kapsamlı bir içerik.',
    details: [
      'Karar ağaçları ve rastgele ormanlar',
      'Destek vektör makineleri (SVM)',
      'K-means ve hiyerarşik kümeleme',
      'Model değerlendirme ve hiperparametre optimizasyonu',
    ],
    sessions: ['Endüstride Makine Öğrenmesi Uygulamaları', 'Workshop: Python ile Veri Analizi'],
  },
  {
    emoji: '🧠',
    title: 'Derin Öğrenme',
    tag: 'İleri Seviye',
    tagColor: '#10b981',
    tagBg: 'rgba(16,185,129,0.08)',
    tagBorder: 'rgba(16,185,129,0.2)',
    desc: 'Sinir ağı mimarileri, görüntü tanıma, doğal dil işleme ve üretken modeller. CNN, RNN, Transformer ve büyük dil modellerinin teorisi ve pratiği.',
    details: [
      'Evrişimli sinir ağları (CNN)',
      'Tekrarlayan sinir ağları (LSTM, GRU)',
      'Transformer mimarisi ve dikkat mekanizmaları',
      'Üretken çekişmeli ağlar (GAN)',
    ],
    sessions: ['Açılış Konuşması: Yapay Zekanın Dönüştürücü Gücü'],
  },
  {
    emoji: '💬',
    title: 'Büyük Dil Modelleri & Prompt Mühendisliği',
    tag: 'Güncel',
    tagColor: '#F59E0B',
    tagBg: 'rgba(245,158,11,0.08)',
    tagBorder: 'rgba(245,158,11,0.2)',
    desc: 'ChatGPT, Claude, Gemini gibi büyük dil modellerinin çalışma prensipleri ve etkili kullanımı. Prompt tasarımı, fine-tuning ve RAG mimarileri.',
    details: [
      'Zero-shot ve few-shot öğrenme',
      'Chain-of-thought prompting',
      'Retrieval-Augmented Generation (RAG)',
      'API entegrasyonu ve otomasyon',
    ],
    sessions: ['Workshop: Prompt Mühendisliği — Uygulamalı Eğitim'],
  },
  {
    emoji: '📊',
    title: 'Veri Bilimi & Analitik',
    tag: 'Temel Alan',
    tagColor: '#A78BFA',
    tagBg: 'rgba(167,139,250,0.1)',
    tagBorder: 'rgba(167,139,250,0.2)',
    desc: 'Veri toplama, temizleme, analiz ve görselleştirme süreçleri. İstatistiksel modelleme ve keşifsel veri analizinden iş zekasına uzanan kapsamlı bir yolculuk.',
    details: [
      'Pandas ve NumPy ile veri manipülasyonu',
      'Matplotlib ve Seaborn ile görselleştirme',
      'İstatistiksel hipotez testleri',
      'Zaman serisi analizi',
    ],
    sessions: ['Workshop: Python ile Veri Analizi Temelleri'],
  },
  {
    emoji: '🎓',
    title: 'Eğitimde Yapay Zeka',
    tag: 'Öne Çıkan',
    tagColor: '#10b981',
    tagBg: 'rgba(16,185,129,0.08)',
    tagBorder: 'rgba(16,185,129,0.2)',
    desc: 'Yükseköğretim ve mesleki eğitimde yapay zeka araçlarının entegrasyonu. Müfredat tasarımı, öğrenci başarısı tahmini ve kişiselleştirilmiş öğrenme.',
    details: [
      'Adaptif öğrenme sistemleri',
      'Otomatik değerlendirme ve geri bildirim',
      'Eğitim analitiği ve başarı tahmini',
      'Etik ve akademik dürüstlük',
    ],
    sessions: ['Panel: Eğitimde Yapay Zeka — Fırsat mı, Tehdit mi?'],
  },
  {
    emoji: '⚙️',
    title: 'Endüstriyel & Sektörel AI',
    tag: 'Uygulama',
    tagColor: '#F59E0B',
    tagBg: 'rgba(245,158,11,0.08)',
    tagBorder: 'rgba(245,158,11,0.2)',
    desc: 'Savunma, üretim, lojistik ve sağlık sektörlerinde yapay zeka uygulamaları. Gerçek vaka çalışmaları ve sektörden uzman perspektifleri.',
    details: [
      'Öngörücü bakım ve anomali tespiti',
      'Görüntü tabanlı kalite kontrol',
      'Talep tahmini ve envanter optimizasyonu',
      'Otonom sistemler ve robotik',
    ],
    sessions: ['Sektör Buluşması: Sanayi-Akademi İşbirliği'],
  },
];

const STATS = [
  { val: '6',  label: 'Odak Alanı'   },
  { val: '10+',label: 'Oturum'       },
  { val: '6+', label: 'Uzman Konuşmacı' },
  { val: '1',  label: 'Yoğun Gün'    },
];

export default function OdakAlanlariPage() {
  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span>Odak Alanları</span>
          </div>
          <h1 className="page-title">
            Keşfedilen <span className="gradient-text">Konular</span>
          </h1>
          <p className="page-desc">
            Mucur AI Days&apos;de ele alınan başlıca yapay zeka disiplinleri, uygulama alanları ve oturumlarla eşleştirilmiş içerik haritası.
          </p>

          {/* İSTATİSTİKLER */}
          <div className="odak-stats">
            {STATS.map(s => (
              <div key={s.label} className="odak-stat">
                <div className="odak-stat-val">{s.val}</div>
                <div className="odak-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ALAN KARTLARI */}
      <section style={{ padding: '20px 0 100px' }}>
        <div className="container">
          <div className="odak-grid">
            {AREAS.map((area) => (
              <div key={area.title} className="odak-card">
                {/* ÜST */}
                <div className="odak-card-top">
                  <div className="odak-emoji">{area.emoji}</div>
                  <span
                    className="odak-tag"
                    style={{ background: area.tagBg, borderColor: area.tagBorder, color: area.tagColor }}
                  >
                    {area.tag}
                  </span>
                </div>

                <h2 className="odak-title">{area.title}</h2>
                <p className="odak-desc">{area.desc}</p>

                {/* DETAYLAR */}
                <div className="odak-details">
                  {area.details.map(d => (
                    <div key={d} className="odak-detail-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {d}
                    </div>
                  ))}
                </div>

                {/* İLGİLİ OTURUMLAR */}
                {area.sessions.length > 0 && (
                  <div className="odak-sessions">
                    <div className="odak-sessions-label">İlgili Oturumlar</div>
                    {area.sessions.map(s => (
                      <div key={s} className="odak-session-chip">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ALT CTA */}
          <div className="odak-cta">
            <h3>Bu konuları canlı dinlemek ister misiniz?</h3>
            <p>Ücretsiz kaydınızı oluşturun, 20 Kasım&apos;da Mucur MYO&apos;da buluşalım.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/kayit" className="btn btn-primary" style={{ padding: '13px 32px' }}>
                Kayıt Ol
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: '16px', height: '16px' }}>
                  <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/program" className="btn btn-ghost" style={{ padding: '13px 32px' }}>
                Programı İncele
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}