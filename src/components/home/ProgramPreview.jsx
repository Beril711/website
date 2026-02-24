import Link from 'next/link';

const programItems = [
  { time: '09:00', duration: '30dk',  title: 'Açılış ve Kayıt',              desc: 'Hoş geldiniz, kayıt ve tanışma',              location: 'Ana Salon'    },
  { time: '09:30', duration: '60dk',  title: 'Açılış Konuşması',             desc: 'Yapay zekanın dünü, bugünü ve yarını',         location: 'Ana Salon'    },
  { time: '10:30', duration: '90dk',  title: 'Panel: AI ve Eğitim',          desc: 'Eğitimde yapay zeka dönüşümü',                location: 'Konferans Salonu'},
  { time: '13:00', duration: '45dk',  title: 'Workshop: Prompt Mühendisliği',desc: 'Uygulamalı prompt tasarımı eğitimi',           location: 'Lab 1'        },
  { time: '15:00', duration: '60dk',  title: 'Sektör Buluşması',             desc: 'Sanayi-akademi iş birliği oturumu',           location: 'Toplantı Odası'},
];

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

export default function ProgramPreview() {
  return (
    <section className="section" id="program">
      <div className="container">
        <div className="section-header section-header--center reveal">
          <div className="section-eyebrow">Program</div>
          <h2 className="section-heading">
            Etkinlik <span className="gradient-text">Takvimi</span>
          </h2>
          <p className="section-desc">
            20 Kasım 2025 tarihli etkinliğin öne çıkan oturumları.
          </p>
        </div>

        <div className="program-list stagger">
          {programItems.map((item, i) => (
            <div key={i} className="program-item">
              <div className="program-time">
                {item.time}
                <span>{item.duration}</span>
              </div>
              <div className="program-body">
                <div>
                  <div className="program-title">{item.title}</div>
                  <div className="program-desc">{item.desc}</div>
                </div>
                <div className="program-location">
                  <LocationIcon />
                  {item.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer reveal">
          <Link href="/program" className="btn-view-all">
            Tamamını İncele
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}