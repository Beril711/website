import Link from 'next/link';
import KayitForm from '@/components/kayit/KayitForm';

export const metadata = {
  title: 'Kayıt Ol — Mucur AI Days 2025',
  description: 'Mucur AI Days 2025 etkinliğine ücretsiz kayıt olun.',
};

export default function KayitPage() {
  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container page-hero-inner" style={{ textAlign: 'center' }}>
          <div className="breadcrumb" style={{ justifyContent: 'center' }}>
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span>Kayıt Ol</span>
          </div>
          <h1 className="page-title">Etkinliğe <span className="gradient-text">Kayıt Olun</span></h1>
          <p className="page-desc" style={{ margin: '0 auto' }}>Ücretsiz katılım için aşağıdaki formu doldurun. Onay e-postası birkaç dakika içinde iletilecektir.</p>
        </div>
      </div>

      {/* KAYIT LAYOUT */}
      <section style={{ padding: '40px 0 100px' }}>
        <div className="container">
          <div className="kayit-grid">

            {/* FORM */}
            <KayitForm />

            {/* SAĞ PANEL */}
            <div className="info-panel">
              {/* Kontenjan */}
              <div className="highlight-card">
                <div className="number">360</div>
                <div className="number-label">Kalan Kontenjan</div>
                <div className="progress-bar-outer">
                  <div className="progress-bar-inner" style={{ width: '72%' }} />
                </div>
                <div className="progress-label"><span>360 / 500 dolu</span><span>%72</span></div>
              </div>

              {/* Etkinlik bilgileri */}
              <div className="info-card">
                <div className="info-card-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Etkinlik Bilgileri
                </div>
                <div className="info-list">
                  {[
                    { icon: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>, text: <><strong>20 Kasım 2025</strong>, Perşembe</> },
                    { icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>, text: <><strong>09:00 — 17:30</strong></> },
                    { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>, text: <><strong>Mucur MYO</strong>, Kırşehir</> },
                    { icon: <><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/></>, text: <><strong>Ücretsiz</strong> Katılım</> },
                  ].map((item, i) => (
                    <div key={i} className="info-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:'16px',height:'16px',flexShrink:0,color:'var(--text-tertiary)' }}>{item.icon}</svg>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Katılım içeriği */}
              <div className="info-card">
                <div className="info-card-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Katılım İçeriği
                </div>
                <div className="badge-list">
                  {[
                    { color: '#10b981', text: 'Tüm konuşma ve paneller' },
                    { color: 'var(--amber)', text: "Workshop'lara öncelikli kayıt" },
                    { color: '#A78BFA', text: 'Katılım sertifikası' },
                    { color: '#10b981', text: 'Öğle yemeği ve ikramlar' },
                    { color: 'var(--amber)', text: 'Networking etkinliği' },
                  ].map((b, i) => (
                    <div key={i} className="badge-item">
                      <div className="badge-dot" style={{ background: b.color }} />
                      {b.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}