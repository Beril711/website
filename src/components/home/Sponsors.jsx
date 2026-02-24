const sponsors = [
  'Anadolu Üniversitesi',
  'TÜBİTAK',
  'ASELSAN',
  'KOSGEB',
  'Kırşehir Ahi Evran Üniversitesi',
];

export default function Sponsors() {
  return (
    <div className="sponsors" id="sponsors">
      <div className="container sponsors-inner reveal">
        <div className="section-eyebrow">Destekleyen Kuruluşlar</div>
        <div className="sponsors-row">
          {sponsors.map((name) => (
            <div key={name} className="sponsor-item">
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}