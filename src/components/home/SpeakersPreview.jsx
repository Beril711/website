import Link from 'next/link';

// Gerçek veriler Supabase'den gelecek — şimdilik statik
const speakers = [
  { id: 1, name: 'Dr. Ahmet Yusuf',  role: 'Yapay Zeka Araştırmacısı', org: 'Kırşehir Üniversitesi' },
  { id: 2, name: 'Prof. Elif Deniz', role: 'Veri Bilimci',              org: 'TÜBİTAK'               },
  { id: 3, name: 'Mert Kaya',        role: 'Makine Öğrenmesi Mühendisi', org: 'ASELSAN'              },
  { id: 4, name: 'Dr. Zeynep Arslan', role: 'Dijital Dönüşüm Danışmanı', org: 'Anadolu Üniversitesi' },
];

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

export default function SpeakersPreview() {
  return (
    <section className="section section--alt" id="speakers">
      <div className="container">
        <div className="section-header section-header--center reveal">
          <div className="section-eyebrow">Konuşmacılar</div>
          <h2 className="section-heading">
            Alanında <span className="gradient-text">Uzman</span> İsimler
          </h2>
          <p className="section-desc">
            Akademi ve sektörden bir araya gelen deneyimli konuşmacılar.
          </p>
        </div>

        <div className="speakers-grid stagger">
          {speakers.map((s) => (
            <div key={s.id} className="speaker-card">
              <div className="speaker-avatar">
                <div className="speaker-avatar-inner">
                  <PersonIcon />
                </div>
              </div>
              <div className="speaker-name">{s.name}</div>
              <div className="speaker-role">{s.role}</div>
              <div className="speaker-org">{s.org}</div>
            </div>
          ))}
        </div>

        <div className="section-footer reveal">
          <Link href="/konusmacilar" className="btn-view-all">
            Tüm Konuşmacıları Gör
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}