'use client';
import Link from 'next/link';

/* ─── VERİ ─── */

const DUZENLEME = [
  { no: 1,  ad: 'MYO Müdürü',                        birim: 'MYO Müdürlüğü',                                             rol: 'Kurul Başkanı',     sorumluluk: 'Genel koordinasyon, resmi temsil' },
  { no: 2,  ad: 'MYO Müdür Yardımcısı',              birim: 'MYO Müdürlüğü',                                             rol: 'Başkan Yrd.',       sorumluluk: 'Genel organizasyon takibi' },
  { no: 3,  ad: 'MYO Sekreteri',                      birim: 'İdari Birim',                                               rol: 'Sekreter',          sorumluluk: 'Resmi yazışmalar, tutanaklar' },
  { no: 4,  ad: 'Öğr. Gör. Hüsnü KARADAĞ',           birim: 'Bilgisayar Teknolojileri Bölümü',                           rol: 'WS Koordinatörü',   sorumluluk: 'Salon A & B' },
  { no: 5,  ad: 'Bölüm Başkanı',                      birim: 'Kimya ve Kimyasal İşlem Teknolojileri Bölümü',              rol: 'WS Koordinatörü',   sorumluluk: 'Salon C' },
  { no: 6,  ad: 'Bölüm Başkanı',                      birim: 'Mülkiyet Koruma ve Güvenlik Bölümü',                        rol: 'WS Koordinatörü',   sorumluluk: 'Salon D' },
  { no: 7,  ad: 'Bölüm Başkanı',                      birim: 'Finans – Bankacılık ve Sigortacılık Bölümü',                rol: 'WS Koordinatörü',   sorumluluk: 'Salon E' },
  { no: 8,  ad: 'Bölüm Başkanı',                      birim: 'Tasarım Bölümü',                                            rol: 'WS Koordinatörü',   sorumluluk: 'Salon F' },
  { no: 9,  ad: 'Bölüm Başkanı',                      birim: 'Ulaştırma Hizmetleri Bölümü',                               rol: 'WS Koordinatörü',   sorumluluk: 'Salon G' },
  { no: 10, ad: 'Bölüm Başkanı',                      birim: 'Görsel, İşitsel Teknikler ve Medya Yapımcılığı Bölümü',     rol: 'WS Koordinatörü',   sorumluluk: 'Salon H' },
  { no: 11, ad: 'Bölüm Başkanı',                      birim: 'Yönetim ve Organizasyon Bölümü',                            rol: 'WS Koordinatörü',   sorumluluk: 'Salon I' },
  { no: 12, ad: 'Bölüm Başkanı',                      birim: 'Yazılım, Uygulama Geliştirme ve Çözümleme Bölümü',          rol: 'WS Koordinatörü',   sorumluluk: 'Salon J' },
  { no: 13, ad: 'Öğr. Gör.',                          birim: 'Teknik Birim',                                              rol: 'Teknik Sorumlu',    sorumluluk: 'Teknik altyapı, AV sistemleri' },
  { no: 14, ad: 'Öğr. Gör.',                          birim: 'Tanıtım Birimi',                                            rol: 'Tanıtım Sorumlusu', sorumluluk: 'Sosyal medya, basın, afiş' },
  { no: 15, ad: 'Öğrenci Temsilcisi',                 birim: 'Öğrenci Konseyi',                                           rol: 'Üye',               sorumluluk: 'Kayıt masası, yönlendirme' },
  { no: 16, ad: 'Öğrenci Temsilcisi',                 birim: 'Öğrenci Konseyi',                                           rol: 'Üye',               sorumluluk: 'Lojistik destek' },
];

const BILIM = [
  { ad: 'Prof. Dr. / Doç. Dr.',        birim: 'Kırşehir Ahi Evran Üniversitesi',      alan: 'Yapay Zeka, Makine Öğrenmesi' },
  { ad: 'Öğr. Gör. Dr. Şaban FINDIK', birim: 'Mucur MYO — Bilgisayar Teknolojileri', alan: 'YZ Uygulamaları, Bulanık Mantık, Elektrik Mühendisliği' },
  { ad: 'Akademisyen',                 birim: 'Kırşehir Ahi Evran Üniversitesi',      alan: 'Veri Bilimi, Mühendislik' },
  { ad: 'Sektör Temsilcisi',           birim: 'Sanayi / Teknoloji Firması',           alan: 'Endüstriyel YZ Uygulamaları' },
  { ad: 'Sektör Temsilcisi',           birim: 'Fintech / Lojistik Sektörü',          alan: 'Lojistik 4.0, Fintech' },
];

const ETIK = [
  { no: 1, ad: 'Öğr. Gör. / Dr.',            birim: 'Mucur MYO',                        rol: 'Başkan', alan: 'Araştırma etiği, veri gizliliği' },
  { no: 2, ad: 'Öğr. Gör. Dr. Şaban FINDIK', birim: 'Bilgisayar Teknolojileri Bölümü',  rol: 'Üye',    alan: 'YZ uygulamaları, elektrik mühendisliği' },
  { no: 3, ad: 'Dış Üye',                    birim: 'Kırşehir Barosu / Üniversite',     rol: 'Üye',    alan: 'Hukuk, KVKK / kişisel veri koruma' },
  { no: 4, ad: 'Dış Üye',                    birim: 'Sivil Toplum Kuruluşu',            rol: 'Üye',    alan: 'Sosyal etki, kapsayıcılık' },
  { no: 5, ad: 'Öğrenci Temsilcisi',         birim: 'Mucur MYO Öğrenci Konseyi',        rol: 'Üye',    alan: 'Öğrenci hakları' },
];

const ETIK_ILKELER = [
  { no: '01', ilke: 'İnsan Merkezlilik',             aciklama: 'YZ sistemleri insan refahı ve onuruna hizmet etmek üzere tasarlanmalıdır.' },
  { no: '02', ilke: 'Şeffaflık ve Açıklanabilirlik', aciklama: 'YZ kararları anlaşılır, izlenebilir ve hesap verebilir olmalıdır. Kara kutu sistemlerde SHAP/LIME araçları kullanılmalıdır.' },
  { no: '03', ilke: 'Adalet ve Kapsayıcılık',        aciklama: 'YZ uygulamaları demografik önyargıdan arındırılmış; herkese eşit hizmet sunacak biçimde geliştirilmelidir.' },
  { no: '04', ilke: 'Veri Gizliliği ve Güvenlik',   aciklama: 'Kişisel veriler KVKK ve GDPR çerçevesinde işlenmeli; workshop\'larda anonimleştirilmiş veri tercih edilmelidir.' },
  { no: '05', ilke: 'Hesap Verebilirlik',            aciklama: 'YZ sistemlerinin olumsuz sonuçlarından insanlar sorumlu tutulabilmelidir; şikâyet mekanizmaları açık olmalıdır.' },
  { no: '06', ilke: 'Sürdürülebilirlik',             aciklama: 'YZ çözümleri enerji tüketimi ve çevresel etki gözetilerek tasarlanmalıdır.' },
  { no: '07', ilke: 'Güvenlik',                      aciklama: 'YZ sistemleri kötüye kullanım, siber saldırı ve istem dışı zarara karşı güvenceli olmalıdır.' },
];

/* ─── COMPONENT ─── */

export default function KurullarPage() {
  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span>Kurullar</span>
          </div>
          <h1 className="page-title">Çalıştay <span className="gradient-text">Kurulları</span></h1>
          <p className="page-desc">
            Kırşehir Ahi Evran Üniversitesi Mucur Meslek Yüksekokulu Yapay Zeka Günleri Çalıştayı'nı yöneten üç kurul.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            {['#duzenleme','#bilim','#etik'].map((id, i) => (
              <a key={id} href={id} className="btn btn-ghost" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
                {['Düzenleme Kurulu','Bilim Kurulu','Etik Kurulu'][i]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '0 40px 100px' }}>

        {/* ══ DÜZENLEME KURULU ══ */}
        <section id="duzenleme" style={{ paddingTop: 72, marginBottom: 72 }}>
          <div style={{ marginBottom: 28 }}>
            <div className="section-eyebrow">Düzenleme Kurulu</div>
            <h2 className="section-heading">Organizasyon <span className="gradient-text">Ekibi</span></h2>
            <p className="section-desc">Mucur MYO Yönetim Kurulu kararıyla oluşturulmuş; yönetim, 9 bölüm WS koordinatörü ve destek ekibini kapsar.</p>
          </div>

          <div className="kurul-table-wrap">
            <table className="kurul-table">
              <thead>
                <tr>
                  <th>#</th><th>Ad Soyad / Unvan</th><th>Bölüm / Birim</th><th>Kurul Rolü</th><th>Sorumluluk</th>
                </tr>
              </thead>
              <tbody>
                {DUZENLEME.map(u => (
                  <tr key={u.no}>
                    <td className="kurul-no">{u.no}</td>
                    <td className="kurul-ad">{u.ad}</td>
                    <td className="kurul-birim">{u.birim}</td>
                    <td><span className="kurul-rol-badge">{u.rol}</span></td>
                    <td className="kurul-sorumluluk">{u.sorumluluk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="kurul-gorevler">
            <h3 className="kurul-sub-title">Görev ve Yetkiler</h3>
            <div className="kurul-gorev-grid">
              {[
                'Çalıştay programını ve workshop takvimini hazırlamak ve onaylamak',
                '9 bölümün workshop koordinatörleriyle düzenli toplantılar yapmak',
                'Davetli konuşmacı ve sektör temsilcileriyle iletişimi sağlamak',
                'Katılımcı başvurularını değerlendirmek; kontenjan planlamasını yapmak',
                'Teknik altyapı, mekan düzeni ve lojistik ihtiyaçları karşılamak',
                'Bütçe planlaması ve harcama takibini yürütmek',
                'Etik Kurulu ile koordinasyonu sağlamak',
                'Çalıştay sonrası değerlendirme raporunu hazırlamak',
              ].map((g, i) => (
                <div key={i} className="kurul-gorev-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" style={{ width: 14, height: 14, flexShrink: 0, marginTop: 2 }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {g}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BİLİM KURULU ══ */}
        <section id="bilim" style={{ paddingTop: 72, marginBottom: 72 }}>
          <div style={{ marginBottom: 28 }}>
            <div className="section-eyebrow" style={{ color: '#10b981' }}>Bilim Kurulu</div>
            <h2 className="section-heading">Akademik <span className="gradient-text">Danışma Kurulu</span></h2>
            <p className="section-desc">Çalıştayın akademik kalitesini ve sektör yeterliliğini denetleyen danışma organı.</p>
          </div>
          <div className="kurul-cards">
            {BILIM.map((u, i) => (
              <div key={i} className="kurul-card">
                <div className="kurul-card-avatar" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="kurul-card-name">{u.ad}</div>
                <div className="kurul-card-unvan">{u.birim}</div>
                <div className="kurul-card-alan">{u.alan}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ ETİK KURULU ══ */}
        <section id="etik" style={{ paddingTop: 72 }}>
          <div style={{ marginBottom: 28 }}>
            <div className="section-eyebrow" style={{ color: '#F59E0B' }}>Etik Kurulu</div>
            <h2 className="section-heading">YZ Etik <span className="gradient-text">Kurulu</span></h2>
            <p className="section-desc">
              Çalıştayın YZ etiği boyutunu yönetir ve KVKK uyumunu denetler.{' '}
              <a href="mailto:etik@mucurmyo.edu.tr" style={{ color: '#A78BFA', fontWeight: 600 }}>etik@mucurmyo.edu.tr</a>
            </p>
          </div>

          <div className="kurul-table-wrap">
            <table className="kurul-table">
              <thead>
                <tr><th>#</th><th>Ad Soyad</th><th>Birim</th><th>Rol</th><th>Uzmanlık</th></tr>
              </thead>
              <tbody>
                {ETIK.map(u => (
                  <tr key={u.no}>
                    <td className="kurul-no">{u.no}</td>
                    <td className="kurul-ad">{u.ad}</td>
                    <td className="kurul-birim">{u.birim}</td>
                    <td><span className="kurul-rol-badge" style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.2)', color: '#F59E0B' }}>{u.rol}</span></td>
                    <td className="kurul-sorumluluk">{u.alan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 7 İlke */}
          <div style={{ marginTop: 40 }}>
            <h3 className="kurul-sub-title">7 Temel YZ Etik İlkesi</h3>
            <div className="etik-ilkeler-grid">
              {ETIK_ILKELER.map(p => (
                <div key={p.no} className="etik-ilke-card">
                  <div className="etik-ilke-no">{p.no}</div>
                  <div className="etik-ilke-baslik">{p.ilke}</div>
                  <div className="etik-ilke-aciklama">{p.aciklama}</div>
                </div>
              ))}
            </div>
          </div>

          {/* İhlal prosedürü */}
          <div className="kurul-gorevler" style={{ marginTop: 32 }}>
            <h3 className="kurul-sub-title">Etik İhlal Bildirim Prosedürü</h3>
            <div className="kurul-gorev-grid">
              {[
                'Bildirim etik@mucurmyo.edu.tr adresine veya Etik Kurulu Başkanına yazılı iletilir.',
                'Etik Kurulu bildirimi 24 saat içinde değerlendirir.',
                'İhlal doğrulanırsa Düzenleme Kurulu\'na bildirilir ve yaptırım uygulanır.',
                'Bildirimde bulunan kişinin kimliği koşulsuz gizli tutulur.',
              ].map((g, i) => (
                <div key={i} className="kurul-gorev-item">
                  <span style={{ flexShrink: 0, minWidth: 20, height: 20, borderRadius: '50%', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', display: 'grid', placeItems: 'center', fontSize: '0.65rem', fontWeight: 800, color: '#F59E0B' }}>{i+1}</span>
                  {g}
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}