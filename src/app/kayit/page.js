'use client';
import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const WORKSHOPS = [
  { salon: 'A', title: 'YZ Destekli Grafik ve 3B Tasarım', bolum: 'Bilgisayar Teknolojileri Bölümü', oncelik: 'mucur' },
  { salon: 'B', title: 'Web Geliştirmede Yapay Zekâ', bolum: 'Bilgisayar Teknolojileri Bölümü', oncelik: 'mucur' },
  { salon: 'C', title: 'Kimya Endüstrisinde YZ Uygulamaları', bolum: 'Kimya ve Kimyasal İşlem Teknolojileri Bölümü', oncelik: 'mucur' },
  { salon: 'D', title: 'Afet Yönetiminde YZ: Erken Uyarı ve Risk Analizi', bolum: 'Mülkiyet Koruma ve Güvenlik Bölümü', oncelik: 'mucur' },
  { salon: 'E', title: 'Fintech ve YZ: Kredi, Risk ve Dolandırıcılık Tespiti', bolum: 'Finans – Bankacılık ve Sigortacılık Bölümü', oncelik: 'mucur' },
  { salon: 'F', title: 'Generatif YZ ile Grafik Tasarım', bolum: 'Tasarım Bölümü', oncelik: 'mucur' },
  { salon: 'G', title: 'Havacılık ve Posta Hizmetlerinde YZ', bolum: 'Ulaştırma Hizmetleri Bölümü', oncelik: 'mucur' },
  { salon: 'H', title: 'Medya Üretiminde Yapay Zekâ', bolum: 'Görsel, İşitsel Teknikler ve Medya Yapımcılığı Bölümü', oncelik: 'mucur' },
  { salon: 'I', title: 'Lojistik 4.0: YZ ile Tedarik Zinciri Yönetimi', bolum: 'Yönetim ve Organizasyon Bölümü', oncelik: 'mucur' },
  { salon: 'J', title: 'Oyun Geliştirmede YZ: NPC Davranışı ve Prosedürel İçerik', bolum: 'Yazılım, Uygulama Geliştirme ve Çözümleme Bölümü', oncelik: 'mucur' },
  { salon: 'K', title: 'Açık Seans – Temel YZ Araçları (ChatGPT, Gemini, Copilot)', bolum: 'Tüm Bölümler / Dış Katılımcılar', oncelik: 'herkese', acik: true },
  { salon: 'L', title: 'Teknofest Proje Hazırlama', bolum: 'Tüm Bölümler / Dış Katılımcılar', oncelik: 'herkese', acik: true },
];

const KATILIMCI_TURLERI = [
  { id: 'ogrenci', label: 'Öğrenci (Mucur MYO)' },
  { id: 'ogretim', label: 'Öğretim Elemanı (Mucur MYO)' },
  { id: 'dis_ogrenci', label: 'Dış Öğrenci (Diğer Üniversite)' },
  { id: 'dis_ogretim', label: 'Dış Öğretim El. (Diğer Üniversite)' },
  { id: 'sektor', label: 'Sektör / Paydaş Temsilcisi' },
];

export default function KayitPage() {
  const [form, setForm] = useState({
    ad: '', soyad: '', email: '', telefon: '', kurum: '', bolum: '', unvan: '',
    katilimciTuru: '', ws1: '', ws2: '', kvkk: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const ws1Title = WORKSHOPS.find(w => w.salon === form.ws1)?.title || null;
    const ws2Title = WORKSHOPS.find(w => w.salon === form.ws2)?.title || null;

    const { error: dbError } = await supabase.from('registrations').insert([
      {
        full_name: `${form.ad} ${form.soyad}`,
        email: form.email,
        organization: form.kurum || null,
        participation_type: form.katilimciTuru || null,
        interest_areas: [ws1Title, ws2Title].filter(Boolean),
        message: [
          form.telefon ? `Tel: ${form.telefon}` : null,
          form.bolum ? `Bölüm: ${form.bolum}` : null,
          form.unvan ? `Unvan: ${form.unvan}` : null,
          form.ws1 ? `WS1: Salon ${form.ws1} - ${ws1Title}` : null,
          form.ws2 ? `WS2: Salon ${form.ws2} - ${ws2Title}` : null,
        ].filter(Boolean).join(' | '),
      },
    ]);

    setLoading(false);

    if (dbError) {
      setError('Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="page-hero" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center', padding: '60px 40px' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>✅</div>
          <h1 className="page-title" style={{ marginBottom: '16px' }}>Başvurunuz Alındı!</h1>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            Kayıt bilgileriniz <strong>{form.email}</strong> adresine gönderilecektir.
            Çalıştay öncesi nihai program e-posta ile iletilecektir.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/program" className="btn btn-primary" style={{ padding: '13px 28px' }}>Programı İncele</Link>
            <Link href="/" className="btn btn-ghost" style={{ padding: '13px 28px' }}>Ana Sayfaya Dön</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span>Kayıt Ol</span>
          </div>
          <h1 className="page-title">Ücretsiz <span className="gradient-text">Kayıt</span></h1>
          <p className="page-desc">
            Katılım tamamen ücretsizdir. Workshoplar sınırlı kontenjanla sunulmaktadır — yerinizi şimdiden ayırtın.
          </p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '24px', flexWrap: 'wrap' }}>
            {[['🗓', '3 Günlük Etkinlik'], ['🏛', 'Mucur MYO, Kırşehir'], ['💰', 'Ücretsiz Katılım'], ['📜', 'Katılım Belgesi']].map(([e, l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                <span>{e}</span>{l}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section style={{ padding: '40px 0 100px' }}>
        <div className="container">
          <div className="kayit-grid">

            {/* FORM */}
            <form onSubmit={handleSubmit} className="kayit-form">

              {/* KİŞİSEL BİLGİLER */}
              <div className="form-section">
                <div className="form-section-title">A. Kişisel Bilgiler</div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Ad <span className="req">*</span></label>
                    <input type="text" required placeholder="Adınız" value={form.ad} onChange={e => set('ad', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Soyad <span className="req">*</span></label>
                    <input type="text" required placeholder="Soyadınız" value={form.soyad} onChange={e => set('soyad', e.target.value)} />
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>E-posta <span className="req">*</span></label>
                    <input type="email" required placeholder="ornek@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Telefon</label>
                    <input type="tel" placeholder="05XX XXX XX XX" value={form.telefon} onChange={e => set('telefon', e.target.value)} />
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Kurum / Üniversite <span className="req">*</span></label>
                    <input type="text" required placeholder="Kurumunuz" value={form.kurum} onChange={e => set('kurum', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Bölüm / Program</label>
                    <input type="text" placeholder="Bölümünüz" value={form.bolum} onChange={e => set('bolum', e.target.value)} />
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Unvan</label>
                    <input type="text" placeholder="Örn: Prof. Dr., Genel Müdür, Öğrenci" value={form.unvan} onChange={e => set('unvan', e.target.value)} />
                  </div>
                  <div className="form-group" />
                </div>
              </div>

              {/* KATILIMCI TÜRÜ */}
              <div className="form-section">
                <div className="form-section-title">B. Katılımcı Türü <span className="req">*</span></div>
                <div className="radio-group">
                  {KATILIMCI_TURLERI.map(t => (
                    <label key={t.id} className={`radio-item${form.katilimciTuru === t.id ? ' radio-item--active' : ''}`}>
                      <input type="radio" name="katilimciTuru" value={t.id} required onChange={e => set('katilimciTuru', e.target.value)} />
                      {t.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* WORKSHOP TERCİHLERİ */}
              <div className="form-section">
                <div className="form-section-title">C. Workshop Tercihleri</div>
                <p className="form-section-desc">En fazla 2 workshop seçebilirsiniz. Salon K (Açık Seans) herkese açıktır. Diğer salonlar ilgili bölüm öğrencilerine önceliklidir.</p>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>1. Tercih</label>
                    <select value={form.ws1} onChange={e => set('ws1', e.target.value)}>
                      <option value="">Seçiniz...</option>
                      {WORKSHOPS.map(w => (
                        <option key={w.salon} value={w.salon}>Salon {w.salon} — {w.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>2. Tercih</label>
                    <select value={form.ws2} onChange={e => set('ws2', e.target.value)}>
                      <option value="">Seçiniz...</option>
                      {WORKSHOPS.filter(w => w.salon !== form.ws1).map(w => (
                        <option key={w.salon} value={w.salon}>Salon {w.salon} — {w.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* WS TABLOSU */}
                <div className="ws-table">
                  {WORKSHOPS.map(w => (
                    <div key={w.salon} className={`ws-table-row${w.acik ? ' ws-table-row--acik' : ''}`}>
                      <div className="ws-table-salon">Salon {w.salon}</div>
                      <div className="ws-table-info">
                        <div className="ws-table-title">{w.title}</div>
                        <div className="ws-table-bolum">{w.bolum}</div>
                      </div>
                      <div className="ws-table-badge" style={w.acik ? { color: '#10b981', background: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.2)' } : {}}>
                        {w.acik ? 'Herkese Açık' : 'Bölüme Öncelikli'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* KVKK */}
              <div className="form-section">
                <div className="form-section-title">D. KVKK Onayı</div>
                <p className="form-section-desc">
                  Kişisel verileriniz (ad-soyad, kurum, iletişim), 6698 sayılı KVKK kapsamında yalnızca çalıştay organizasyonu ve katılım belgesi düzenlenmesi amacıyla işlenecek; üçüncü taraflarla paylaşılmayacaktır. Etkinlik fotoğraf/video ile belgelenebilir; bu materyaller yalnızca kurumsal tanıtım amaçlı kullanılacaktır.
                </p>
                <label className={`checkbox-item${form.kvkk ? ' checkbox-item--active' : ''}`}>
                  <input type="checkbox" required checked={form.kvkk} onChange={e => set('kvkk', e.target.checked)} />
                  <span>Evet, KVKK Aydınlatma Metnini okudum ve onaylıyorum. <span className="req">*</span></span>
                </label>
              </div>

              {error && (
                <p style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center', marginBottom: '16px' }}>
                  {error}
                </p>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '0.95rem', justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Gönderiliyor...' : (
                  <>
                    Başvuruyu Tamamla
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: '16px', height: '16px' }}>
                      <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* SIDEBAR */}
            <div className="kayit-sidebar">
              <div className="kayit-info-card">
                <div className="kayit-info-title">📋 Etkinlik Özeti</div>
                <div className="kayit-info-list">
                  <div className="kayit-info-item"><span>Süre</span><strong>3 Gün</strong></div>
                  <div className="kayit-info-item"><span>Yer</span><strong>Mucur MYO, Kırşehir</strong></div>
                  <div className="kayit-info-item"><span>Format</span><strong>Yüz yüze</strong></div>
                  <div className="kayit-info-item"><span>Katılım</span><strong>Ücretsiz</strong></div>
                  <div className="kayit-info-item"><span>Belge</span><strong>Katılım Sertifikası</strong></div>
                  <div className="kayit-info-item"><span>Kayıt</span><a href="mailto:ahiaigunleri@ahievran.edu.tr" style={{ color: 'var(--purple)', fontWeight: 600, fontSize: '0.8rem' }}>ahiaigunleri@ahievran.edu.tr</a></div>
                </div>
              </div>

              <div className="kayit-info-card">
                <div className="kayit-info-title">⚡ Program Özeti</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
                  {[
                    { gun: '1. Gün', label: 'Açılış & Sektör', color: '#A78BFA', desc: 'Rektör/Kaymakam konuşmaları, 4 sektör sunumu, panel' },
                    { gun: '2. Gün', label: 'Workshop Günü', color: '#F59E0B', desc: '10 paralel workshop salonu (A–K), açık seans' },
                    { gun: '3. Gün', label: 'Sunum & Kapanış', color: '#10b981', desc: 'Jüri sunumları, ödül töreni, sertifika takdimi' },
                  ].map(g => (
                    <div key={g.gun} style={{ padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--code-bg)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: g.color }}>{g.gun}</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{g.label}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{g.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="kayit-info-card" style={{ background: 'linear-gradient(135deg,rgba(75,17,168,0.06),rgba(26,93,171,0.04))', borderColor: 'rgba(75,17,168,0.15)' }}>
                <div className="kayit-info-title">ℹ️ Önemli Notlar</div>
                <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '8px' }}>
                  <li>Laptop/tablet getirmeniz tavsiye edilir</li>
                  <li>Her workshop max. 25 kişi (Salon K: 30)</li>
                  <li>Salon K dışı workshoplar ilgili bölüme önceliklidir</li>
                  <li>Nihai program e-posta ile iletilecektir</li>
                  <li>Katılım belgesi töreni 3. gün verilecektir</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}