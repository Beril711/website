import Link from 'next/link';

export const metadata = {
  title: 'Sponsorlarımız — Mucur AI Days 2025',
  description: 'Mucur AI Days 2025 etkinliğini destekleyen kurum ve kuruluşlar. Sponsorluk fırsatları.',
};

const SPONSORS = {
  platinum: [
    {
      name: 'TÜBİTAK',
      fullName: 'Türkiye Bilimsel ve Teknolojik Araştırma Kurumu',
      desc: 'Türkiye\'nin önde gelen bilim ve teknoloji araştırma kurumu. Mucur AI Days\'in ana destekçisi olarak etkinliğimizin gerçekleşmesinde kritik rol üstlenmektedir.',
      website: 'https://tubitak.gov.tr',
    },
  ],
  gold: [
    {
      name: 'Kırşehir Ahi Evran Üniversitesi',
      fullName: 'Kırşehir Ahi Evran Üniversitesi',
      desc: 'Etkinliğimizin ev sahibi üniversitesi. Akademik altyapı ve organizasyon desteği ile Mucur AI Days\'i mümkün kılmaktadır.',
      website: 'https://ahievran.edu.tr',
    },
    {
      name: 'ASELSAN',
      fullName: 'ASELSAN A.Ş.',
      desc: 'Türkiye\'nin savunma sanayiinin öncü kuruluşu. Yapay zeka ve makine öğrenmesi alanındaki uygulamalarıyla etkinliğimize değerli katkılar sunmaktadır.',
      website: 'https://aselsan.com',
    },
  ],
  silver: [
    {
      name: 'Mucur Belediyesi',
      fullName: 'Mucur Belediye Başkanlığı',
      desc: 'İlçemizin gelişimine katkı sağlayan Mucur Belediyesi, etkinliğimize lojistik ve organizasyonel destek vermektedir.',
      website: '#',
    },
    {
      name: 'Kırşehir İl Özel İdaresi',
      fullName: 'Kırşehir İl Özel İdaresi',
      desc: 'Kırşehir\'in kalkınmasına öncülük eden İl Özel İdaresi, etkinliğimizin bölgesel destekçisidir.',
      website: '#',
    },
  ],
};

const PACKAGES = [
  {
    tier: 'Platin',
    color: '#A78BFA',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(75,17,168,0.1))',
    border: 'rgba(167,139,250,0.3)',
    price: 'İletişime Geçin',
    benefits: [
      'Ana sahne konuşma hakkı (15 dk)',
      'Tüm materyallerde logo (büyük boy)',
      'VIP masa & özel alan',
      'Sosyal medyada özel tanıtım',
      '10 katılımcı daveti',
      'Etkinlik sonrası rapor',
    ],
  },
  {
    tier: 'Altın',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.05))',
    border: 'rgba(245,158,11,0.3)',
    price: 'İletişime Geçin',
    benefits: [
      'Panel katılım hakkı',
      'Materyallerde logo (orta boy)',
      'Stant kurma hakkı',
      'Sosyal medyada tanıtım',
      '5 katılımcı daveti',
    ],
  },
  {
    tier: 'Gümüş',
    color: '#94a3b8',
    gradient: 'linear-gradient(135deg, rgba(148,163,184,0.1), rgba(148,163,184,0.04))',
    border: 'rgba(148,163,184,0.25)',
    price: 'İletişime Geçin',
    benefits: [
      'Materyallerde logo (küçük boy)',
      'Web sitesinde yer alma',
      '2 katılımcı daveti',
    ],
  },
];

function SponsorCard({ sponsor, size }) {
  const isLarge = size === 'large';
  const isMedium = size === 'medium';

  return (
    <div className={`sponsor-card sponsor-card--${size}`}>
      <div className="sponsor-card-logo">
        <span style={{
          fontSize: isLarge ? '1.8rem' : isMedium ? '1.4rem' : '1.1rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, var(--purple), var(--blue))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {sponsor.name}
        </span>
      </div>
      <div className="sponsor-card-body">
        <div className="sponsor-card-fullname">{sponsor.fullName}</div>
        <p className="sponsor-card-desc">{sponsor.desc}</p>
        {sponsor.website !== '#' && (
          <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="sponsor-card-link">
            Web Sitesi
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: '12px', height: '12px' }}>
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

export default function SponsorlarPage() {
  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container page-hero-inner" style={{ textAlign: 'center' }}>
          <div className="breadcrumb" style={{ justifyContent: 'center' }}>
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span>Sponsorlarımız</span>
          </div>
          <h1 className="page-title">
            Değerli <span className="gradient-text">Destekçilerimiz</span>
          </h1>
          <p className="page-desc" style={{ margin: '0 auto' }}>
            Mucur AI Days&apos;i mümkün kılan kurum ve kuruluşlara sonsuz teşekkürlerimizi sunarız.
          </p>
        </div>
      </div>

      {/* PLATIN SPONSORLAR */}
      <section style={{ padding: '20px 0 60px' }}>
        <div className="container">
          <div className="sponsor-tier-header">
            <div className="sponsor-tier-badge" style={{ background: 'rgba(167,139,250,0.1)', borderColor: 'rgba(167,139,250,0.25)', color: '#A78BFA' }}>
              ✦ Platin Sponsor
            </div>
          </div>
          <div className="sponsor-tier-grid sponsor-tier-grid--platinum">
            {SPONSORS.platinum.map(s => <SponsorCard key={s.name} sponsor={s} size="large" />)}
          </div>
        </div>
      </section>

      {/* ALTIN SPONSORLAR */}
      <section style={{ padding: '0 0 60px' }}>
        <div className="container">
          <div className="sponsor-tier-header">
            <div className="sponsor-tier-badge" style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.25)', color: '#F59E0B' }}>
              ★ Altın Sponsorlar
            </div>
          </div>
          <div className="sponsor-tier-grid sponsor-tier-grid--gold">
            {SPONSORS.gold.map(s => <SponsorCard key={s.name} sponsor={s} size="medium" />)}
          </div>
        </div>
      </section>

      {/* GÜMÜŞ SPONSORLAR */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div className="sponsor-tier-header">
            <div className="sponsor-tier-badge" style={{ background: 'rgba(148,163,184,0.08)', borderColor: 'rgba(148,163,184,0.2)', color: '#94a3b8' }}>
              ◆ Gümüş Sponsorlar
            </div>
          </div>
          <div className="sponsor-tier-grid sponsor-tier-grid--silver">
            {SPONSORS.silver.map(s => <SponsorCard key={s.name} sponsor={s} size="small" />)}
          </div>
        </div>
      </section>

      {/* SPONSORLUK PAKETLERİ */}
      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Sponsorluk Fırsatları</div>
            <h2 className="section-heading">Siz de <span className="gradient-text">Destekçimiz</span> Olun</h2>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Markanızı yapay zeka alanında uzmanlaşmış 500+ katılımcıyla buluşturun.
            </p>
          </div>

          <div className="packages-grid">
            {PACKAGES.map(pkg => (
              <div
                key={pkg.tier}
                className="package-card"
                style={{ background: pkg.gradient, borderColor: pkg.border }}
              >
                <div className="package-tier" style={{ color: pkg.color }}>{pkg.tier}</div>
                <div className="package-price">{pkg.price}</div>
                <div className="package-divider" />
                <ul className="package-benefits">
                  {pkg.benefits.map(b => (
                    <li key={b}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: pkg.color }}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Özel paket talepleriniz için bizimle iletişime geçin.
            </p>
            <Link href="/iletisim" className="btn btn-primary" style={{ padding: '13px 32px' }}>
              Sponsorluk Teklifi Gönderin
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: '16px', height: '16px' }}>
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}