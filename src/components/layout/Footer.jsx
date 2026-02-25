import Link from 'next/link';
import NewsletterForm from '../forms/NewsletterForm';

const quickLinks = [
  { href: '/program', label: 'Etkinlik Takvimi' },
  { href: '/konusmacilar', label: 'Konuşmacılar Hakkında' },
  { href: '/sponsorlar', label: 'Sponsorluk' },
  { href: '/sss', label: 'SSS' },
];

const legalLinks = [
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/iletisim', label: 'İletişim' },
  { href: '/blog', label: 'Blog' },
];

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          {/* MARKA */}
          <div className="footer-brand">
            <Link href="/" className="nav-brand">
              <div className="nav-brand-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              Mucur<span className="accent">AI</span>Days
            </Link>
            <p>Geleceği kodlayan zihinlerin buluşma noktası. Bilim ve teknoloji ışığında yeni ufuklara.</p>
          </div>

          {/* HIZLI ERİŞİM */}
          <div className="footer-col">
            <h4>Hızlı Erişim</h4>
            <ul>
              {quickLinks.map(({ href, label }) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* İLETİŞİM */}
          <div className="footer-col">
            <h4>İletişim</h4>
            <ul>
              <li>
                <a href="mailto:info@mucuraidays.com">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polyline points="22,4 12,13 2,4" />
                  </svg>
                  info@mucuraidays.com
                </a>
              </li>
              <li>
                <a href="tel:+903861234567">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  +90 386 123 45 67
                </a>
              </li>
              <li>
                <a href="https://maps.google.com/?q=Mucur,Kırşehir" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Mucur, Kırşehir
                </a>
              </li>
            </ul>
          </div>

          {/* BÜLTEN */}
          <div className="footer-col">
            <h4>Bülten</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', marginBottom: '14px', lineHeight: '1.6' }}>
              Gelişmelerden haberdar olmak için abone olun.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Mucur Yapay Zeka Günleri. Tüm hakları saklıdır.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            {legalLinks.map(({ href, label }) => (
              <Link key={href} href={href} style={{ color: 'var(--text-tertiary)', fontSize: '0.74rem', transition: 'color 0.3s' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}