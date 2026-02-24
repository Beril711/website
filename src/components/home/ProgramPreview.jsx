import Link from 'next/link';

const PREVIEW = [
  { time:'09:00', gun:'1. Gün', type:'Tören',    typeColor:'#94a3b8', title:'Açılış Töreni & Protokol Konuşmaları', speaker:'Rektör, MYO Müdürü, Kaymakam' },
  { time:'11:00', gun:'1. Gün', type:'Sektör',   typeColor:'#A78BFA', title:'4 Sektör Sunumu: Sanayi, Lojistik, Finans, Medya', speaker:'Sektör Temsilcileri' },
  { time:'15:15', gun:'1. Gün', type:'Panel',    typeColor:'#10b981', title:'Panel: Sektörün YZ Talepleri ve Mesleki Yeterlilik', speaker:'Panel Katılımcıları + Moderatör' },
  { time:'10:00', gun:'2. Gün', type:'Workshop', typeColor:'#F59E0B', title:'10 Paralel Workshop Salonu (A–K) — 5 saat', speaker:'Bölüm Öğretim Elemanları' },
  { time:'09:20', gun:'3. Gün', type:'Sunum',    typeColor:'#A78BFA', title:'Öğrenci Proje Sunumları — Jüri Değerlendirmesi', speaker:'Jüri Kurulu' },
  { time:'15:30', gun:'3. Gün', type:'Tören',    typeColor:'#10b981', title:'Sertifika & Katılım Belgesi Töreni + Kapanış', speaker:'MYO Müdürü' },
];

export default function ProgramPreview() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header section-header--center">
          <div className="section-eyebrow">Program</div>
          <h2 className="section-heading">
            3 Günlük <span className="gradient-text">Etkinlik Akışı</span>
          </h2>
          <p className="section-desc">
            Açılış töreninden workshop günlerine, proje sunumlarından kapanış törenine yoğun bir program.
          </p>
        </div>

        <div className="program-list">
          {PREVIEW.map((item) => (
            <div key={item.title} className="program-item">
              <div className="program-time">
                <div className="program-time-val">{item.time}</div>
                <span>{item.gun}</span>
              </div>
              <div className="program-body">
                <div>
                  <span style={{
                    display: 'inline-flex',
                    padding: '3px 10px',
                    borderRadius: '100px',
                    border: `1px solid ${item.typeColor}40`,
                    background: `${item.typeColor}18`,
                    color: item.typeColor,
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>
                    {item.type}
                  </span>
                  <div className="program-title">{item.title}</div>
                  <div className="program-desc">{item.speaker}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/program" className="btn btn-ghost">
            Tam Programı Gör
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: '16px', height: '16px' }}>
              <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}