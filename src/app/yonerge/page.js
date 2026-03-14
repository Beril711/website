'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const BOLUMLER = [
  { no: 1, bolum: 'Bilgisayar Teknolojileri Bölümü', prog: 'Bilgisayar Destekli Tasarım ve Animasyon · Web Tasarımı ve Kodlama', ws: 2 },
  { no: 2, bolum: 'Kimya ve Kimyasal İşlem Teknolojileri Bölümü', prog: 'Kimya Teknolojisi', ws: 1 },
  { no: 3, bolum: 'Mülkiyet Koruma ve Güvenlik Bölümü', prog: 'Acil Durum ve Afet Yönetimi · Sivil Savunma ve İtfaiyecilik', ws: 1 },
  { no: 4, bolum: 'Finans – Bankacılık ve Sigortacılık Bölümü', prog: 'Bankacılık ve Sigortacılık', ws: 1 },
  { no: 5, bolum: 'Tasarım Bölümü', prog: 'Grafik Tasarımı', ws: 1 },
  { no: 6, bolum: 'Ulaştırma Hizmetleri Bölümü', prog: 'Sivil Hava Ulaştırma İşletmeciliği · Posta Hizmetleri', ws: 1 },
  { no: 7, bolum: 'Görsel, İşitsel Teknikler ve Medya Yapımcılığı Bölümü', prog: 'Fotoğrafçılık ve Kameramanlık · Görsel İletişim', ws: 1 },
  { no: 8, bolum: 'Yönetim ve Organizasyon Bölümü', prog: 'Lojistik', ws: 1 },
  { no: 9, bolum: 'Yazılım, Uygulama Geliştirme ve Çözümleme Bölümü', prog: 'Oyun Geliştirme ve Programlama', ws: 1 },
];

const SIDEBAR = [
  { href: '#amac', label: 'Madde 1 — Amaç ve Kapsam' },
  { href: '#bolumler', label: 'Madde 2 — Bölümler' },
  { href: '#amaclar', label: 'Madde 3 — Amaçlar' },
  { href: '#organizasyon', label: 'Madde 4 — Organizasyon' },
  { href: '#katilim', label: 'Madde 5 — Katılım' },
  { href: '#workshop', label: 'Madde 6 — Workshop İlkeleri' },
  { href: '#sertifika', label: 'Madde 7 — Belgeler' },
  { href: '#yururluk', label: 'Madde 8 — Yürürlük' },
];

const BOLUM_ID_MAP = {
  amac: 'amac', bolumler: 'bolumler', amaclar: 'amaclar',
  organizasyon: 'organizasyon', katilim: 'katilim',
  workshop: 'workshop', sertifika: 'sertifika', yururluk: 'yururluk',
};

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"
    style={{ width: 14, height: 14, flexShrink: 0, marginTop: 2 }}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function YonergePage() {
  const [maddeler, setMaddeler] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaddeler = async () => {
      const { data } = await supabase
        .from('yonerge')
        .select('*')
        .eq('visible', true)
        .order('sort_order', { ascending: true });
      setMaddeler(data || []);
      setLoading(false);
    };
    fetchMaddeler();
  }, []);

  const getMadde = (tip) => maddeler.find(m => m.bolum_tipi === tip);

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
            T.C. Kırşehir Ahi Evran Üniversitesi Mucur Meslek Yüksekokulu Yapay Zeka Günleri Çalıştayı resmi yönergesi.
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
          <div className="yonerge-content">

            <div className="yonerge-resmi-kutu">
              <div className="yonerge-resmi-baslik">T.C. KIRŞEHİR AHİ EVRAN ÜNİVERSİTESİ · MUCUR MESLEK YÜKSEKOKULU</div>
              <div className="yonerge-resmi-alt">YAPAY ZEKA GÜNLERİ ÇALIŞTAYI — RESMİ YÖNERGESİ</div>
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-tertiary)' }}>Yükleniyor...</div>
            ) : (
              <>
                {/* Madde 1 */}
                <div className="yonerge-madde" id="amac">
                  <div className="yonerge-madde-baslik"><span className="yonerge-madde-no">Madde 1</span>Amaç ve Kapsam</div>
                  <div className="yonerge-madde-icerik">
                    <p>{getMadde('amac')?.icerik || 'Bu yönerge; Kırşehir Ahi Evran Üniversitesi Mucur Meslek Yüksekokulu\'nda düzenlenecek "Yapay Zeka Günleri Çalıştayı"nın amaçlarını belirlemek amacıyla hazırlanmıştır.'}</p>
                  </div>
                </div>

                {/* Madde 2 — Bölümler tablosu sabit */}
                <div className="yonerge-madde" id="bolumler">
                  <div className="yonerge-madde-baslik"><span className="yonerge-madde-no">Madde 2</span>Kapsam: Bölümler ve Programlar</div>
                  <div className="yonerge-madde-icerik">
                    <p>{getMadde('bolumler')?.icerik || 'Çalıştay, Mucur MYO bünyesindeki tüm aktif bölüm ve programları kapsamaktadır:'}</p>
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

                {/* Madde 3-8 dinamik */}
                {['amaclar','organizasyon','katilim','workshop','sertifika','yururluk'].map((tip, idx) => {
                  const madde = getMadde(tip);
                  if (!madde) return null;
                  return (
                    <div key={tip} className="yonerge-madde" id={tip}>
                      <div className="yonerge-madde-baslik">
                        <span className="yonerge-madde-no">Madde {idx + 3}</span>{madde.baslik.replace(/Madde \d+ — /, '')}
                      </div>
                      <div className="yonerge-madde-icerik">
                        <p>{madde.icerik}</p>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {/* İmza */}
            <div className="yonerge-imza">
              <div className="yonerge-imza-grid">
                <div className="yonerge-imza-item">
                  <div className="yonerge-imza-hat" />
                  <div className="yonerge-imza-ad">Düzenleme Kurulu Başkanı</div>
                  <div className="yonerge-imza-unvan">Mucur MYO Yönetim Kurulu adına</div>
                </div>
                <div className="yonerge-imza-item">
                  <div className="yonerge-imza-hat" />
                  <div className="yonerge-imza-ad">Bilim Kurulu Başkanı</div>
                  <div className="yonerge-imza-unvan">Akademik Danışma Kurulu adına</div>
                </div>
                <div className="yonerge-imza-item">
                  <div className="yonerge-imza-hat" />
                  <div className="yonerge-imza-ad">Etik Kurulu Başkanı</div>
                  <div className="yonerge-imza-unvan">YZ Etik Kurulu adına</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="yonerge-sidebar">
            <div className="yonerge-sidebar-inner">
              <div className="yonerge-sidebar-baslik">İçindekiler</div>
              <nav>
                {SIDEBAR.map(s => (
                  <a key={s.href} href={s.href} className="yonerge-sidebar-link">{s.label}</a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}