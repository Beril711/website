import Link from 'next/link';

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Sektör & Akademi Buluşması',
    desc: 'Sanayi, lojistik, finans ve medya sektörlerinden temsilciler 1. gün 4 sunum ve panel oturumunda akademisyen ve öğrencilerle bir araya geliyor.',
    link: '/program',
    linkText: 'Programı Gör',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: '10 Paralel Workshop Salonu',
    desc: '9 bölüm kendi uzmanlık alanında ayrı bir salon yürütüyor. Salon K tüm dış katılımcılara açık. Her workshop uygulamalı ve proje tabanlı.',
    link: '/odak-alanlari',
    linkText: 'Workshop\'ları Keşfet',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    title: 'Proje Sunumu & Ödül',
    desc: '3. gün tüm workshop çıktıları jüri önünde sunuluyor. En iyi 3 projeye teşvik ödülü, tüm katılımcılara ise resmi Katılım Belgesi veriliyor.',
    link: '/program',
    linkText: 'Detaylara Bak',
  },
];

export default function Features() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section-header section-header--center">

          <h2 className="section-heading">
            Neden <span className="gradient-text">Katılmalısınız?</span>
          </h2>
          <p className="section-desc">
            3 günlük ücretsiz yapay zeka deneyimi: workshoplar, paneller ve proje sunumları.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <Link href={f.link} className="feature-link">
                {f.linkText}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}