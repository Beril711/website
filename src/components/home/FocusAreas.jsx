import Link from 'next/link';

const focusItems = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    label: 'Yapay Zeka Okuryazarlığı',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 010 20"/></svg>,
    label: 'Endüstri 4.0 Uygulamaları',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    label: 'Eğitimde Dijital Dönüşüm',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    label: 'İş Birliği ve Ağ Oluşturma',
  },
];

export default function FocusAreas() {
  return (
    <section className="section section--alt" id="focus">
      <div className="container">
        <div className="cta-grid">
          {/* SOL: Odak Listesi */}
          <div className="reveal">
            <div className="section-eyebrow">Odak Alanları</div>
            <h2 className="section-heading">
              Gündemin <span className="gradient-text">Merkezinde</span>
            </h2>
            <p className="section-desc">
              Dört temel odak noktası etrafında şekillenen etkinliğimiz, bölgenin AI vizyonunu ortaya koyuyor.
            </p>

            <div className="focus-list stagger">
              {focusItems.map(({ icon, label }) => (
                <div key={label} className="focus-item">
                  <div className="focus-icon">{icon}</div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SAĞ: CTA Kartı */}
          <div className="cta-card reveal">
            <div className="cta-card-bg">
              <canvas id="nodeCanvas" />
            </div>
            <div className="cta-card-content">
              <div className="cta-badge">Sınırlı Kontenjan</div>
              <h3>Yerinizi Şimdi<br />Ayırtın</h3>
              <p>500 katılımcı kapasiteli etkinlikte yerinizi güvence altına alın. Erken kayıt fırsatını kaçırmayın.</p>
              <Link href="/kayit" className="btn btn-primary">
                Başvur
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}