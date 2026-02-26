'use client';
import Link from 'next/link';

const BOLUMLER = [
  { no: 1, bolum: 'Bilgisayar Teknolojileri Bölümü',                        prog: 'Bilgisayar Destekli Tasarım ve Animasyon · Web Tasarımı ve Kodlama', ws: 2 },
  { no: 2, bolum: 'Kimya ve Kimyasal İşlem Teknolojileri Bölümü',           prog: 'Kimya Teknolojisi',                                                    ws: 1 },
  { no: 3, bolum: 'Mülkiyet Koruma ve Güvenlik Bölümü',                     prog: 'Acil Durum ve Afet Yönetimi · Sivil Savunma ve İtfaiyecilik',         ws: 1 },
  { no: 4, bolum: 'Finans – Bankacılık ve Sigortacılık Bölümü',             prog: 'Bankacılık ve Sigortacılık',                                            ws: 1 },
  { no: 5, bolum: 'Tasarım Bölümü',                                          prog: 'Grafik Tasarımı',                                                      ws: 1 },
  { no: 6, bolum: 'Ulaştırma Hizmetleri Bölümü',                            prog: 'Sivil Hava Ulaştırma İşletmeciliği · Posta Hizmetleri',               ws: 1 },
  { no: 7, bolum: 'Görsel, İşitsel Teknikler ve Medya Yapımcılığı Bölümü',  prog: 'Fotoğrafçılık ve Kameramanlık · Görsel İletişim',                     ws: 1 },
  { no: 8, bolum: 'Yönetim ve Organizasyon Bölümü',                         prog: 'Lojistik',                                                              ws: 1 },
  { no: 9, bolum: 'Yazılım, Uygulama Geliştirme ve Çözümleme Bölümü',      prog: 'Oyun Geliştirme ve Programlama',                                       ws: 1 },
];

const SIDEBAR = [
  { href: '#amac',         label: 'Madde 1 — Amaç ve Kapsam' },
  { href: '#bolumler',     label: 'Madde 2 — Bölümler' },
  { href: '#amaclar',      label: 'Madde 3 — Amaçlar' },
  { href: '#organizasyon', label: 'Madde 4 — Organizasyon' },
  { href: '#katilim',      label: 'Madde 5 — Katılım' },
  { href: '#workshop',     label: 'Madde 6 — Workshop İlkeleri' },
  { href: '#sertifika',    label: 'Madde 7 — Belgeler' },
  { href: '#yururluk',     label: 'Madde 8 — Yürürlük' },
];

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"
    style={{ width: 14, height: 14, flexShrink: 0, marginTop: 2 }}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function YonergePage() {
  return (
    <>
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span>Yönerge</span>
          </div>
          <h1 className="page-title">Çalıştay <span className="gradient-text">Yönergesi</span></h1>
          <p className="page-desc">
            T.C. Kırşehir Ahi Evran Üniversitesi Mucur Meslek Yüksekokulu Yapay Zeka Günleri Çalıştayı resmi yönergesi. Tüm katılımcılara şeffaf biçimde yayımlanmaktadır.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            {['Mucur MYO YK Kararı', '3 Günlük Etkinlik', '9 Bölüm · 14 Program'].map(t => (
              <span key={t} className="yonerge-meta-badge">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '0 40px 100px' }}>
        <div className="yonerge-layout">

          {/* İÇERİK */}
          <div className="yonerge-content">

            <div className="yonerge-resmi-kutu">
              <div className="yonerge-resmi-baslik">T.C. KIRŞEHİR AHİ EVRAN ÜNİVERSİTESİ · MUCUR MESLEK YÜKSEKOKULU</div>
              <div className="yonerge-resmi-alt">YAPAY ZEKA GÜNLERİ ÇALIŞTAYI — RESMİ YÖNERGESİ</div>
            </div>

            <div className="yonerge-madde" id="amac">
              <div className="yonerge-madde-baslik"><span className="yonerge-madde-no">Madde 1</span>Amaç ve Kapsam</div>
              <div className="yonerge-madde-icerik">
                <p>Bu yönerge; Kırşehir Ahi Evran Üniversitesi Mucur Meslek Yüksekokulu'nda düzenlenecek <strong>"Yapay Zeka Günleri Çalıştayı"</strong>nın amaçlarını, organizasyon yapısını, işleyiş esaslarını, katılım koşullarını ve etik ilkelerini belirlemek amacıyla hazırlanmıştır. Çalıştay; 9 bölüm ve 14 programa yönelik YZ workshop'larını, sektör oturumlarını ve tören programlarını kapsar.</p>
              </div>
            </div>

            <div className="yonerge-madde" id="bolumler">
              <div className="yonerge-madde-baslik"><span className="yonerge-madde-no">Madde 2</span>Kapsam: Bölümler ve Programlar</div>
              <div className="yonerge-madde-icerik">
                <p>Çalıştay, Mucur MYO bünyesindeki tüm aktif bölüm ve programları kapsamaktadır:</p>
                <div className="yonerge-bolum-tablo">
                  {BOLUMLER.map(b => (
                    <div key={b.no} className="yonerge-bolum-satir">
                      <div className="yonerge-bolum-no">{b.no}</div>
                      <div>
                        <div className="yonerge-bolum-adi">{b.bolum}</div>
                        <div className="yonerge-bolum-prog">{b.prog}</div>
                      </div>
                      <div className="yonerge-bolum-ws">{b.ws} WS</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="yonerge-madde" id="amaclar">
              <div className="yonerge-madde-baslik"><span className="yonerge-madde-no">Madde 3</span>Çalıştayın Amaçları</div>
              <div className="yonerge-madde-icerik">
                <div className="yonerge-liste">
                  {[
                    '9 bölüm ve 14 programdaki öğrenci ve öğretim elemanlarını yapay zekâ teknolojileriyle buluşturmak',
                    'Her bölümün kendi uzmanlık alanıyla örtüşen YZ uygulamalarını keşfetmesine zemin oluşturmak',
                    'Sektör temsilcilerinin ihtiyaç ve beklentilerini akademik programlara yansıtmak',
                    'Kırşehir ili ve Mucur ilçesi paydaşlarıyla sürdürülebilir işbirliği platformu oluşturmak',
                    'Yapay zekânın etik kullanımı konusunda farkındalık geliştirmek',
                    'Dışarıdan katılan öğrenci ve öğretim elemanlarıyla bilgi paylaşımı sağlamak',
                  ].map((a, i) => (
                    <div key={i} className="yonerge-liste-item"><Check/>{a}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="yonerge-madde" id="organizasyon">
              <div className="yonerge-madde-baslik"><span className="yonerge-madde-no">Madde 4</span>Organizasyon Yapısı</div>
              <div className="yonerge-madde-icerik">
                <p>Çalıştay; <strong>Düzenleme Kurulu</strong>, <strong>Bilim/Danışma Kurulu</strong> ve <strong>Etik Kurulu</strong> tarafından yönetilir.</p>
                <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
                  {[['duzenleme','Düzenleme Kurulu'],['bilim','Bilim Kurulu'],['etik','Etik Kurulu']].map(([id,label]) => (
                    <Link key={id} href={`/kurullar#${id}`} className="yonerge-kurul-link">{label} →</Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="yonerge-madde" id="katilim">
              <div className="yonerge-madde-baslik"><span className="yonerge-madde-no">Madde 5</span>Katılım Koşulları</div>
              <div className="yonerge-madde-icerik">
                <p>Çalıştay aşağıdaki gruplara açıktır:</p>
                <div className="yonerge-liste" style={{ marginTop: 12 }}>
                  {[
                    'Mucur MYO\'nun 9 bölüm ve 14 programındaki tüm öğrenci ve akademik personel',
                    'Kırşehir Ahi Evran Üniversitesi\'nin diğer birimlerinden öğrenci ve personel',
                    'Diğer yükseköğretim kurumlarından öğrenci ve öğretim elemanları (kontenjan dahilinde)',
                    'Kırşehir ili ve Mucur ilçesi kamu kurumu temsilcileri ve paydaşlar',
                    'Sektör ve sivil toplum kuruluşu temsilcileri',
                  ].map((g, i) => (
                    <div key={i} className="yonerge-liste-item">
                      <span className="yonerge-liste-no">{i+1}</span>{g}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="yonerge-madde" id="workshop">
              <div className="yonerge-madde-baslik"><span className="yonerge-madde-no">Madde 6</span>Workshop İlkeleri</div>
              <div className="yonerge-madde-icerik">
                <div className="yonerge-liste">
                  {[
                    'Her bölüm kendi uzmanlık alanıyla uyumlu en az 1 workshop düzenler.',
                    'Workshop\'lar uygulamalı, interaktif ve katılımcı odaklı planlanır.',
                    'Workshop çıktıları 3. gün sunum oturumunda jüri önünde değerlendirilir.',
                    'Tüm workshop\'lara katılım tamamen ücretsizdir.',
                    'Bölüm workshop\'larına max. 25, Salon K açık seansına max. 30 katılımcı alınır.',
                  ].map((w, i) => (
                    <div key={i} className="yonerge-liste-item"><Check/>{w}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="yonerge-madde" id="sertifika">
              <div className="yonerge-madde-baslik"><span className="yonerge-madde-no">Madde 7</span>Katılım Belgesi</div>
              <div className="yonerge-madde-icerik">
                <p>Çalıştaya katılan tüm bireyler <strong>"Katılım Belgesi"</strong>, aktif sunum veya workshop yapanlara ise <strong>"Katkı Belgesi"</strong> düzenlenir.</p>
              </div>
            </div>

            <div className="yonerge-madde" id="yururluk">
              <div className="yonerge-madde-baslik"><span className="yonerge-madde-no">Madde 8</span>Yürürlük</div>
              <div className="yonerge-madde-icerik">
                <p>Bu yönerge, Kırşehir Ahi Evran Üniversitesi Mucur Meslek Yüksekokulu Yönetim Kurulu onayıyla yürürlüğe girer.</p>
                <div className="yonerge-imza-grid">
                  <div className="yonerge-imza-kutu">
                    <div className="yonerge-imza-ust">Düzenleme Kurulu Başkanı</div>
                    <div className="yonerge-imza-alt">MYO Müdürü</div>
                  </div>
                  <div className="yonerge-imza-kutu">
                    <div className="yonerge-imza-ust">Onaylayan</div>
                    <div className="yonerge-imza-alt">Rektör — Kırşehir Ahi Evran Üniversitesi</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <aside className="yonerge-sidebar">
            <div className="yonerge-sidebar-card">
              <div className="yonerge-sidebar-title">İçindekiler</div>
              {SIDEBAR.map(s => (
                <a key={s.href} href={s.href} className="yonerge-sidebar-link">{s.label}</a>
              ))}
            </div>

            <div className="yonerge-sidebar-card">
              <div className="yonerge-sidebar-title">Etkinlik Bilgileri</div>
              {[
                ['Üniversite',      'Kırşehir Ahi Evran Üniversitesi'],
                ['Yüksekokul',      'Mucur Meslek Yüksekokulu'],
                ['İlçe',            'Mucur, Kırşehir'],
                ['Bölüm Sayısı',    '9 Bölüm'],
                ['Program Sayısı',  '14 Program'],
                ['Workshop Salonu', '10 Salon (A–K)'],
                ['Katılım',         'Ücretsiz'],
              ].map(([label, value]) => (
                <div key={label} className="yonerge-info-item">
                  <span>{label}</span><strong>{value}</strong>
                </div>
              ))}
            </div>

            <Link href="/kayit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 14 }}>
              Kayıt Ol
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: 16, height: 16 }}>
                <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </aside>

        </div>
      </div>
    </>
  );
}