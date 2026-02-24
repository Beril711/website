import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-dots" />
      <div className="hero-line" />

      <div className="container">
        <div className="hero-content">

          <div className="hero-tag">
            <span className="dot" />
            Geleceğin Teknolojisi, Eğitimin Gücü
          </div>

          <h1>
            Mucur <span className="gradient-text">Yapay</span><br />
            <span className="gradient-text">Zeka</span> Günleri
          </h1>

          <p className="hero-sub">
            Kırşehir Ahi Evran Üniversitesi Mucur MYO'nun 9 bölüm ve 14 programını
            buluşturan 3 günlük yapay zeka çalıştayı. Sektör oturumları, uygulamalı
            workshoplar ve proje sunumlarıyla dolu yoğun bir program.
          </p>

          <div className="hero-actions">
            <Link href="/kayit" className="btn btn-primary">
              Ücretsiz Kayıt Ol
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link href="/program" className="btn btn-ghost">
              Programı İncele
            </Link>
          </div>

          <div className="hero-metrics">
            <div className="hero-metric">
              <div className="hero-metric-val">3</div>
              <div className="hero-metric-label">Gün</div>
            </div>
            <div className="hero-metric">
              <div className="hero-metric-val">9</div>
              <div className="hero-metric-label">Bölüm</div>
            </div>
            <div className="hero-metric">
              <div className="hero-metric-val">10</div>
              <div className="hero-metric-label">Workshop</div>
            </div>
            <div className="hero-metric">
              <div className="hero-metric-val">250+</div>
              <div className="hero-metric-label">Katılımcı</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}