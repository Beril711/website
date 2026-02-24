import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-dots" />
      <div className="hero-line" />

      <div className="container">
        <div className="hero-content">
          {/* TAG */}
          <div className="hero-tag">
            <span className="dot" />
            Geleceğin Teknolojisi, Eğitimin Gücü
          </div>

          {/* BAŞLIK */}
          <h1>
            Mucur <span className="gradient-text">Yapay</span><br />
            <span className="gradient-text">Zeka</span> Günleri
          </h1>

          {/* ALT BAŞLIK */}
          <p className="hero-sub">
            Akademi ve sektörün modern buluşma noktası. Yapay zekanın eğitimden
            endüstriye uzanan dönüştürücü gücünü bilimsel perspektifle keşfedin.
          </p>

          {/* CTA BUTONLARI */}
          <div className="hero-actions">
            <Link href="/kayit" className="btn btn-primary">
              Hemen Başvur
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14"/>
                <path d="M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link href="/program" className="btn btn-ghost">
              Detaylı Bilgi
            </Link>
          </div>

          {/* METRİKLER */}
          <div className="hero-metrics">
            <div className="hero-metric">
              <div className="hero-metric-val">6+</div>
              <div className="hero-metric-label">Konuşmacı</div>
            </div>
            <div className="hero-metric">
              <div className="hero-metric-val">500+</div>
              <div className="hero-metric-label">Katılımcı</div>
            </div>
            <div className="hero-metric">
              <div className="hero-metric-val">10+</div>
              <div className="hero-metric-label">Oturum</div>
            </div>
            <div className="hero-metric">
              <div className="hero-metric-val">1</div>
              <div className="hero-metric-label">Gün</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}