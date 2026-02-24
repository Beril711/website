import Link from 'next/link';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
    title: 'Sorun Tespiti',
    desc: 'Endüstriyel ve akademik süreçlerdeki darboğazları yapay zeka perspektifiyle analiz ediyor, veri odaklı teşhisler koyuyoruz.',
    href: '/odak-alanlari',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
      </svg>
    ),
    title: 'Yetenek Ölçümü',
    desc: 'Mevcut insan kaynağının ve dijital altyapının yapay zeka adaptasyonuna uygunluğunu ölçen modern metrikler geliştiriyoruz.',
    href: '/odak-alanlari',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
      </svg>
    ),
    title: 'Müfredat Entegrasyonu',
    desc: 'Eğitim kurumlarında yapay zeka okuryazarlığını artırmak için yenilikçi müfredat modelleri ve çerçeve stratejileri oluşturuyoruz.',
    href: '/odak-alanlari',
  },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
  </svg>
);

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-header section-header--center reveal">
          <div className="section-eyebrow">Etkinlik Hedefleri</div>
          <h2 className="section-heading">
            Yapay Zeka <span className="gradient-text">Vizyonumuz</span>
          </h2>
          <p className="section-desc">
            Sektörel sorunlardan eğitim entegrasyonuna kadar kapsamlı bir çözüm haritası sunuyoruz.
          </p>
        </div>

        <div className="features-grid stagger">
          {features.map(({ icon, title, desc, href }) => (
            <div key={title} className="feature-card">
              <div className="feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <Link href={href} className="feature-link">
                Daha fazla <ArrowIcon />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}