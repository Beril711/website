import Link from 'next/link';
import IletisimForm from '@/components/iletisim/IletisimForm';
import { siteConfig } from '@/constants/siteConfig';

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

const CONTACT_INFO = [
  {
    icon: <><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22,4 12,13 2,4" /></>,
    label: 'E-posta',
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></>,
    label: 'Telefon',
    value: '+90 386 123 45 67',
    href: 'tel:+903861234567',
    sub: 'Hafta içi 09:00 – 17:00',
  },
  {
    icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>,
    label: 'Adres',
    value: siteConfig.contact.school,
    sub: `${siteConfig.contact.district}, ${siteConfig.contact.city}`,
  },
];

export default function IletisimPage() {
  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <div className="container page-hero-inner" style={{ textAlign: 'center' }}>
          <div className="breadcrumb" style={{ justifyContent: 'center' }}>
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span>İletişim</span>
          </div>
          <h1 className="page-title">Bize <span className="gradient-text">Ulaşın</span></h1>
          <p className="page-desc" style={{ margin: '0 auto' }}>
            Sorularınız, önerileriniz veya sponsorluk teklifleriniz için bize ulaşın. En kısa sürede dönüş yapacağız.
          </p>
        </div>
      </div>

      {/* ANA İÇERİK */}
      <section className="ct-section">
        <div className="container">
          <div className="ct-grid">

            {/* SOL: FORM */}
            <div className="ct-form-panel">
              <div className="ct-panel-header">
                <h2 className="ct-panel-title">Mesaj Gönderin</h2>
                <p className="ct-panel-desc">Formu doldurun, size en kısa sürede dönelim.</p>
              </div>
              <IletisimForm />
            </div>

            {/* SAĞ: İLETİŞİM BİLGİLERİ */}
            <div className="ct-info-panel">
              <div className="ct-info-card">
                <h3 className="ct-info-title">İletişim Bilgileri</h3>
                <div className="ct-info-items">
                  {CONTACT_INFO.map((item, i) => (
                    <div key={i} className="ct-info-item">
                      <div className="ct-info-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.icon}</svg>
                      </div>
                      <div>
                        <div className="ct-info-label">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="ct-info-value">{item.value}</a>
                        ) : (
                          <div className="ct-info-value">{item.value}</div>
                        )}
                        {item.sub && <div className="ct-info-sub">{item.sub}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* HARİTA */}
              <div className="ct-map-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.0!2d34.383!3d39.067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMucur+Meslek+Y%C3%BCksekokulu!5e0!3m2!1str!2str!4v1"
                  className="ct-map-iframe"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mucur MYO Konum"
                />
                <div className="ct-map-footer">
                  <div>
                    <div className="ct-map-name">Mucur Meslek Yüksekokulu</div>
                    <div className="ct-map-address">Mucur, Kırşehir, Türkiye</div>
                  </div>
                  <a href="https://maps.google.com/?q=Mucur+MYO+Kırşehir" target="_blank" rel="noopener noreferrer" className="ct-map-link">
                    Yol Tarifi
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: 14, height: 14 }}>
                      <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="ct-faq-section">
        <div className="container">
          <div className="section-header section-header--center">
            <div className="section-eyebrow">Sık Sorulan Sorular</div>
            <h2 className="section-heading">Merak Ettikleriniz</h2>
          </div>
          <div className="ct-faq-grid">
            {FAQ.map((item, i) => (
              <div key={i} className="ct-faq-card">
                <div className="ct-faq-q">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18, flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  {item.q}
                </div>
                <div className="ct-faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}