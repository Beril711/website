import Link from 'next/link';
import IletisimForm from '@/components/iletisim/IletisimForm';

export const metadata = {
  title: 'İletişim — Mucur AI Days 2025',
  description: 'Mucur AI Days 2025 etkinliği iletişim bilgileri ve mesaj formu.',
};

const FAQ = [
  { q: 'Etkinliğe katılım ücreti var mı?', a: 'Hayır, Mucur AI Days tamamen ücretsiz bir etkinliktir. Kayıt yaptırmak yeterlidir.' },
  { q: "Workshop'lara nasıl kayıt olabilirim?", a: 'Kayıt formunda workshop tercihlerinizi işaretleyebilirsiniz. Kontenjanlar sınırlıdır.' },
  { q: 'Sertifika verilecek mi?', a: 'Evet, etkinliğe katılan herkese dijital katılım sertifikası verilecektir.' },
  { q: 'Otopark imkânı var mı?', a: 'Mucur MYO kampüsünde ücretsiz otopark bulunmaktadır.' },
  { q: 'Öğle yemeği dahil mi?', a: 'Evet, kayıtlı katılımcılara ücretsiz öğle yemeği ve ikramlar sağlanacaktır.' },
  { q: 'Sponsorluk fırsatları hakkında bilgi alabilir miyim?', a: 'İletişim formunu kullanarak "Sponsorluk Teklifi" konusu ile bize ulaşabilirsiniz.' },
];

const CONTACT_CARDS = [
  {
    icon: <><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></>,
    title: 'E-posta',
    content: <a href="mailto:info@mucuraidays.com">info@mucuraidays.com</a>,
  },
  {
    icon: <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></>,
    title: 'Telefon',
    content: <><a href="tel:+903861234567">+90 386 123 45 67</a><br /><span style={{ fontSize:'0.78rem',color:'var(--text-tertiary)' }}>Hafta içi 09:00 – 17:00</span></>,
  },
  {
    icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    title: 'Etkinlik Yeri',
    content: <>Mucur Meslek Yüksekokulu<br /><span style={{ fontSize:'0.82rem',color:'var(--text-tertiary)' }}>Mucur, Kırşehir, Türkiye</span></>,
  },
];

export default function IletisimPage() {
  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container page-hero-inner" style={{ textAlign: 'center' }}>
          <div className="breadcrumb" style={{ justifyContent: 'center' }}>
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span>İletişim</span>
          </div>
          <h1 className="page-title">Bize <span className="gradient-text">Ulaşın</span></h1>
          <p className="page-desc" style={{ margin: '0 auto' }}>Sorularınız için formu doldurun veya doğrudan iletişim bilgilerimizden ulaşın. En kısa sürede yanıt vereceğiz.</p>
        </div>
      </div>

      {/* İLETİŞİM GRID */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div className="contact-grid">

            {/* FORM */}
            <IletisimForm />

            {/* SAĞ PANEL */}
            <div className="contact-info">
              {CONTACT_CARDS.map((card, i) => (
                <div key={i} className="contact-card">
                  <div className="contact-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{card.icon}</svg>
                  </div>
                  <div className="contact-card-title">{card.title}</div>
                  <div className="contact-card-value">{card.content}</div>
                </div>
              ))}

              {/* HARİTA */}
              <div className="map-card">
                <div className="map-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <p>Mucur MYO — Kırşehir</p>
                </div>
                <div className="map-info">
                  <p>Kırşehir iline bağlı Mucur ilçesinde yer alan Meslek Yüksekokulu kampüsü.</p>
                  <a href="https://maps.google.com/?q=Mucur+MYO+Kırşehir" target="_blank" rel="noopener noreferrer" className="map-link">
                    Google Maps&apos;te Aç
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SSS */}
      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Sık Sorulan Sorular</div>
            <h2 className="section-heading">Merak Ettikleriniz</h2>
          </div>
          <div className="faq-grid">
            {FAQ.map((item, i) => (
              <div key={i} className="faq-card">
                <div className="faq-q">{item.q}</div>
                <div className="faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}