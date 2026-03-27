'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// ═══════════════════════════════════════════════════
// KONFİGÜRASYON — Admin panelden de ayarlanabilir
// ═══════════════════════════════════════════════════
const CONFIG = {
  maxWsPerUser: 2,              // Bir kişi en fazla kaç oturuma katılabilir
  salonCapacity: 25,            // Salon başına max katılımcı
  abstractDeadline: '24 Nisan 2026',
  // Kayıt formu gösterim penceresi (null = sınırsız)
  registrationStart: null,      // örn: '2026-03-15T00:00:00' veya null
  registrationEnd: null,        // örn: '2026-05-03T23:59:59' veya null
};

// ═══════════════════════════════════════════════════
// WORKSHOP OTURUMLARI — Gün ve saate göre gruplandı
// ═══════════════════════════════════════════════════
const WS_SESSIONS = [
  { id: 'oturum1', label: 'Oturum 1', gun: '5 Mayıs (2. Gün)', saat: '09:00 – 10:30' },
  { id: 'oturum2', label: 'Oturum 2', gun: '5 Mayıs (2. Gün)', saat: '10:45 – 12:30' },
  { id: 'oturum3', label: 'Oturum 3', gun: '5 Mayıs (2. Gün)', saat: '13:30 – 15:00' },
  { id: 'oturum4', label: 'Oturum 4', gun: '5 Mayıs (2. Gün)', saat: '15:15 – 17:00' },
];

const WORKSHOPS = [
  // Oturum 1
  { salon: '1', oturum: 'oturum1', title: 'Eğitimde Prompt Mühendisliği', bolum: 'UZEM', danismanlar: 'Doç. Dr. Uğur BAŞARMAK' },
  { salon: '2', oturum: 'oturum1', title: 'FIGMA', bolum: 'Bilgisayar Teknolojileri Bölümü', danismanlar: 'Öğr. Gör. Murat GÜZEL / Dr. Öğr. Üyesi Şaban FINDIK' },
  { salon: '3', oturum: 'oturum1', title: 'NotebookLM', bolum: 'Bilgisayar Teknolojileri Bölümü', danismanlar: 'Öğr. Gör. Ahmet Burak ÖZKAN / Öğr. Gör. Hüsnü KARADAĞ' },
  // Oturum 2
  { salon: '4', oturum: 'oturum2', title: 'Eğitimde Yapay Zeka Tabanlı İçerik Üretimi', bolum: 'UZEM', danismanlar: 'Doç. Dr. Uğur BAŞARMAK' },
  { salon: '5', oturum: 'oturum2', title: 'Claude / Gemini / ChatGPT', bolum: 'Bilgisayar Teknolojileri Bölümü', danismanlar: 'Öğr. Gör. Murat GÜZEL / Dr. Öğr. Üyesi Şaban FINDIK' },
  { salon: '6', oturum: 'oturum2', title: 'AntiGravity', bolum: 'Bilgisayar Teknolojileri Bölümü', danismanlar: 'Öğr. Gör. Ahmet Burak ÖZKAN / Öğr. Gör. Hüsnü KARADAĞ' },
  // Oturum 3
  { salon: '7', oturum: 'oturum3', title: 'Yapay Zeka ile Sosyal Medya İçerik Tasarımı: Canva Atölyesi', bolum: 'UZEM', danismanlar: 'Öğr. Gör. Tuğçe Bölükbaş' },
  { salon: '8', oturum: 'oturum3', title: 'Oyun Programlama', bolum: 'Bilgisayar Teknolojileri Bölümü', danismanlar: 'Öğr. Gör. İlker SEZER / Öğr. Gör. Barış Safa GÜRLER' },
  { salon: '9', oturum: 'oturum3', title: 'Warren AI', bolum: 'Bankacılık, Sigortacılık ve Finans Bölümü', danismanlar: 'Dr. Öğr. Üyesi Mücahit ÜLGER' },
  { salon: '10', oturum: 'oturum3', title: 'Meshy.ai ile 3D Model Üretimi', bolum: 'Bilgisayar Teknolojileri Bölümü', danismanlar: 'Öğr. Gör. Hüsnü KARADAĞ' },
  // Oturum 4
  { salon: '11', oturum: 'oturum4', title: '2D Animasyon', bolum: 'Bilgisayar Teknolojileri Bölümü', danismanlar: 'Öğr. Gör. İlker SEZER / Öğr. Gör. Barış Safa GÜRLER' },
  { salon: '12', oturum: 'oturum4', title: 'NanoBanana', bolum: 'Görsel İletişim Bölümü', danismanlar: 'Öğr. Gör. Dr. Ali KAYMAK' },
  { salon: '13', oturum: 'oturum4', title: 'Kendi Sesini ve Görüntünü Kullanmadan Video Üretmek', bolum: 'Bilgisayar Teknolojileri Bölümü', danismanlar: 'İsminaz — Heygen' },
  { salon: '14', oturum: 'oturum4', title: 'Eterik Pasifik: Üretken Minimalizm ve Akışkan Kimlikler', bolum: 'Tasarım Bölümü', danismanlar: 'Rumeysa — Gemini' },
  { salon: '15', oturum: 'oturum4', title: 'Prompt Kullanarak Yapay Zeka ile Görsel Üretim Süreci', bolum: 'Görsel İletişim Bölümü', danismanlar: 'Hanife — ChatGPT + ImageFX' },
];

const KATILIMCI_TURLERI = [
  { id: 'ogrenci', label: 'Öğrenci (Ahi Evran)' },
  { id: 'akademisyen', label: 'Akademisyen (Ahi Evran)' },
  { id: 'dis_ogrenci', label: 'Dış Öğrenci (Diğer Üniversite)' },
  { id: 'dis_akademisyen', label: 'Dış Akademisyen (Diğer Üniversite)' },
  { id: 'sektor', label: 'Sektör / Paydaş Temsilcisi' },
];

function isRegistrationOpen() {
  const now = new Date();
  if (CONFIG.registrationStart && now < new Date(CONFIG.registrationStart)) return false;
  if (CONFIG.registrationEnd && now > new Date(CONFIG.registrationEnd)) return false;
  return true;
}

export default function KayitPage() {
  const [form, setForm] = useState({
    ad: '', soyad: '', email: '', telefon: '', kurum: '', bolum: '', unvan: '',
    katilimciTuru: '', selectedWs: {}, kvkk: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [wsCounts, setWsCounts] = useState({});

  useEffect(() => {
    const fetchWsCounts = async () => {
      const { data } = await supabase.from('registrations').select('interest_areas');
      if (!data) return;
      const counts = {};
      WORKSHOPS.forEach(w => { counts[w.salon] = 0; });
      data.forEach(reg => {
        if (Array.isArray(reg.interest_areas)) {
          reg.interest_areas.forEach(wsTitle => {
            const ws = WORKSHOPS.find(w => w.title === wsTitle);
            if (ws) counts[ws.salon] = (counts[ws.salon] || 0) + 1;
          });
        }
      });
      setWsCounts(counts);
    };
    fetchWsCounts();
  }, []);

  const isWsFull = (salon) => (wsCounts[salon] || 0) >= CONFIG.salonCapacity;
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const selectedCount = Object.values(form.selectedWs).filter(Boolean).length;

  const toggleWs = (oturumId, salonId) => {
    setForm(prev => {
      const current = prev.selectedWs[oturumId];
      const newSelected = { ...prev.selectedWs };

      if (current === salonId) {
        delete newSelected[oturumId];
      } else {
        // Aynı oturumdan zaten seçili varsa değiştir
        // Max seçim kontrolü
        const currentCount = Object.values(newSelected).filter(Boolean).length;
        const isReplacing = !!newSelected[oturumId];
        if (!isReplacing && currentCount >= CONFIG.maxWsPerUser) {
          return prev; // limit aşıldı, değişiklik yapma
        }
        newSelected[oturumId] = salonId;
      }
      return { ...prev, selectedWs: newSelected };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const selectedSalons = Object.values(form.selectedWs).filter(Boolean);
    const selectedTitles = selectedSalons.map(s => WORKSHOPS.find(w => w.salon === s)?.title).filter(Boolean);

    // Dolu mu kontrol
    for (const salon of selectedSalons) {
      if (isWsFull(salon)) {
        const ws = WORKSHOPS.find(w => w.salon === salon);
        setError(`"${ws?.title}" workshop kontenjanı dolmuştur. Lütfen başka bir workshop seçiniz.`);
        setLoading(false);
        return;
      }
    }

    const wsDetails = selectedSalons.map(s => {
      const ws = WORKSHOPS.find(w => w.salon === s);
      const session = WS_SESSIONS.find(ses => ses.id === ws?.oturum);
      return `${session?.label}: ${ws?.title} (${ws?.danismanlar})`;
    });

    const { error: dbError } = await supabase.from('registrations').insert([{
      full_name: `${form.ad} ${form.soyad}`,
      email: form.email,
      organization: form.kurum || null,
      participation_type: form.katilimciTuru || null,
      interest_areas: selectedTitles,
      message: [
        form.telefon ? `Tel: ${form.telefon}` : null,
        form.bolum ? `Bölüm: ${form.bolum}` : null,
        form.unvan ? `Unvan: ${form.unvan}` : null,
        ...wsDetails.map((d, i) => `WS${i + 1}: ${d}`),
      ].filter(Boolean).join(' | '),
    }]);

    setLoading(false);
    if (dbError) {
      setError('Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } else {
      setSubmitted(true);
    }
  };

  // Kayıt formu kapalıysa
  if (!isRegistrationOpen()) {
    return (
      <div className="page-hero" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center', padding: '60px 40px' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>🔒</div>
          <h1 className="page-title" style={{ marginBottom: '16px' }}>Kayıt Şu An Kapalı</h1>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            Kayıt formu henüz açılmamış veya kayıt süresi sona ermiş olabilir. Güncel bilgiler için iletişime geçiniz.
          </p>
          <Link href="/" className="btn btn-primary" style={{ padding: '13px 28px' }}>Ana Sayfaya Dön</Link>
        </div>
      </div>
    );
  }

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
            <form onSubmit={handleSubmit} className="kayit-form">

              {/* A. KİŞİSEL BİLGİLER */}
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

              {/* B. KATILIMCI TÜRÜ */}
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

              {/* C. WORKSHOP TERCİHLERİ — Oturum bazlı */}
              <div className="form-section">
                <div className="form-section-title">C. Workshop Tercihleri</div>
                <p className="form-section-desc">
                  Her oturumdan en fazla <strong>1 workshop</strong> seçebilirsiniz. Toplamda en fazla <strong>{CONFIG.maxWsPerUser} oturum</strong> tercih edebilirsiniz.
                  Kontenjan salon başına {CONFIG.salonCapacity} kişi ile sınırlıdır.
                </p>

                {selectedCount > 0 && (
                  <div style={{ padding: '8px 14px', borderRadius: 8, background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', color: '#A78BFA', fontSize: '0.78rem', fontWeight: 600, marginBottom: 16 }}>
                    {selectedCount}/{CONFIG.maxWsPerUser} oturum seçildi
                  </div>
                )}

                {WS_SESSIONS.map(session => {
                  const sessionWs = WORKSHOPS.filter(w => w.oturum === session.id);
                  const selectedInSession = form.selectedWs[session.id];

                  return (
                    <div key={session.id} style={{ marginBottom: 24 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#F59E0B', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', padding: '3px 10px', borderRadius: 100 }}>
                          {session.label}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
                          {session.gun} · {session.saat}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {sessionWs.map(w => {
                          const full = isWsFull(w.salon);
                          const count = wsCounts[w.salon] || 0;
                          const isSelected = selectedInSession === w.salon;
                          const canSelect = !full && (isSelected || selectedCount < CONFIG.maxWsPerUser || !!selectedInSession);

                          return (
                            <div
                              key={w.salon}
                              onClick={() => canSelect && !full && toggleWs(session.id, w.salon)}
                              style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '14px 18px', borderRadius: 'var(--radius-sm)',
                                border: `1.5px solid ${isSelected ? '#A78BFA' : full ? 'rgba(239,68,68,0.2)' : 'var(--border)'}`,
                                background: isSelected ? 'rgba(167,139,250,0.06)' : full ? 'rgba(239,68,68,0.02)' : 'var(--bg-card)',
                                opacity: full ? 0.5 : canSelect ? 1 : 0.4,
                                cursor: canSelect && !full ? 'pointer' : 'not-allowed',
                                transition: 'all 0.2s',
                                gap: 12,
                              }}
                            >
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
                                  {w.title}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                                  {w.bolum} · {w.danismanlar}
                                </div>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                                {full ? (
                                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ef4444' }}>❌ DOLU</span>
                                ) : isSelected ? (
                                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A78BFA' }}>✓ Seçildi</span>
                                ) : (
                                  <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Seç</span>
                                )}
                                <span style={{ fontSize: '0.65rem', color: full ? '#ef4444' : 'var(--text-tertiary)', fontWeight: 500 }}>
                                  {count}/{CONFIG.salonCapacity}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* D. KVKK */}
              <div className="form-section">
                <div className="form-section-title">D. KVKK Onayı</div>
                <p className="form-section-desc">
                  Kişisel verileriniz (ad-soyad, kurum, iletişim), 6698 sayılı KVKK kapsamında yalnızca çalıştay organizasyonu ve katılım belgesi düzenlenmesi amacıyla işlenecek; üçüncü taraflarla paylaşılmayacaktır.
                </p>
                <label className={`checkbox-item${form.kvkk ? ' checkbox-item--active' : ''}`}>
                  <input type="checkbox" required checked={form.kvkk} onChange={e => set('kvkk', e.target.checked)} />
                  <span>Evet, KVKK Aydınlatma Metnini okudum ve onaylıyorum. <span className="req">*</span></span>
                </label>
              </div>

              {error && (
                <p style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center', marginBottom: '16px' }}>{error}</p>
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
              <div className="kayit-info-card" style={{ background: 'linear-gradient(135deg,rgba(239,68,68,0.04),rgba(245,158,11,0.04))', borderColor: 'rgba(239,68,68,0.15)' }}>
                <div className="kayit-info-title">📌 Özet Gönderimi</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '8px 0 0' }}>
                  Bildiri özet gönderimi için son tarih: <strong style={{ color: '#ef4444' }}>{CONFIG.abstractDeadline}</strong>
                </p>
              </div>

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
                    { gun: '1. Gün', label: 'Açılış & Paneller', color: '#A78BFA', desc: 'Rektör/Kaymakam konuşmaları, paneller, eğitim' },
                    { gun: '2. Gün', label: 'Workshop & Konferans', color: '#F59E0B', desc: 'Workshop salonları (A–D), konferans sunumları' },
                    { gun: '3. Gün', label: 'Sunum & Kapanış', color: '#10b981', desc: 'Poster/bildiri sunumları, ödül töreni, sertifika' },
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
                  <li>Her workshop max. {CONFIG.salonCapacity} kişi</li>
                  <li>Bir kişi en fazla {CONFIG.maxWsPerUser} oturuma katılabilir</li>
                  <li>Her oturumdan yalnızca 1 workshop seçilebilir</li>
                  <li>Kontenjanı dolan workshoplar seçilemez</li>
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