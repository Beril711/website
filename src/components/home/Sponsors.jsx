const sponsors = [
  'Anadolu Üniversitesi',
  'TÜBİTAK',
  'ASELSAN',
  'KOSGEB',
  'Kırşehir Ahi Evran Üniversitesi',
];

export default function Sponsors() {
  // Duplicate the list for seamless infinite loop
  const items = [...sponsors, ...sponsors];

  return (
    <div className="sponsors" id="sponsors">
      <div className="container sponsors-inner reveal">
        <div className="section-eyebrow">Destekleyen Kuruluşlar</div>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          {items.map((name, i) => (
            <div key={i} className="sponsor-item">
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}