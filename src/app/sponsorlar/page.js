import Link from 'next/link';

export const metadata = {
  title: 'Sponsorlarımız — Mucur AI Days 2026',
  description: 'Mucur AI Days 2026 etkinliğini destekleyen kurum ve kuruluşlar. Sponsorluk fırsatları.',
};

const SPONSORS = {
  platinum: [
    {
      name: 'TÜBİTAK',
      website: 'https://tubitak.gov.tr',
    },
  ],
  gold: [
    {
      name: 'Kırşehir Ahi Evran Üniversitesi',
      website: 'https://ahievran.edu.tr',
    },
    {
      name: 'ASELSAN',
      website: 'https://aselsan.com',
    },
  ],
  silver: [
    {
      name: 'Mucur Belediyesi',
      website: '#',
    },
    {
      name: 'Kırşehir İl Özel İdaresi',
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

function SponsorCard({ name }) {
  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      background: 'var(--bg-card)',
      padding: '28px 20px',
      display: 'grid',
      placeItems: 'center',
      textAlign: 'center',
      transition: 'all 0.35s',
      cursor: 'default',
      minHeight: '100px',
    }}
      className="sponsor-box"
    >
      <span style={{
        fontSize: '0.95rem',
        fontWeight: 800,
        lineHeight: 1.3,
        color: 'var(--text-primary)',
      }}>
        {name}
      </span>
    </div>
  );
}

const ALL_SPONSORS = [
  ...SPONSORS.platinum.map(s => s.name),
  ...SPONSORS.gold.map(s => s.name),
  ...SPONSORS.silver.map(s => s.name),
];

const sponsorGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '16px',
};

export default function SponsorlarPage() {
  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container page-hero-inner" style={{ textAlign: 'center' }}>
          <div className="breadcrumb" style={{ justifyContent: 'center' }}>
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
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
          <div style={sponsorGrid}>
            {SPONSORS.platinum.map(s => <SponsorCard key={s.name} name={s.name} />)}
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
          <div style={sponsorGrid}>
            {SPONSORS.gold.map(s => <SponsorCard key={s.name} name={s.name} />)}
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
          <div style={sponsorGrid}>
            {SPONSORS.silver.map(s => <SponsorCard key={s.name} name={s.name} />)}
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
                        <polyline points="20 6 9 17 4 12" />
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
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}