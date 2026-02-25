import Link from 'next/link';
import SpeakerCard from '@/components/konusmacilar/SpeakerCard';
import { speakers } from '@/constants/speakersData';

export const metadata = {
  title: 'Konuşmacılar — Mucur AI Days 2026',
  description: 'Mucur AI Days 2026 etkinliği konuşmacıları.',
};

export default function KonusmacilarPage() {
  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span>Konuşmacılar</span>
          </div>
          <h1 className="page-title">Etkinlik <span className="gradient-text">Konuşmacıları</span></h1>
          <p className="page-desc">Akademi ve sektörün önde gelen isimlerinden oluşan konuşmacı kadromuz. Yapay zeka, veri bilimi ve dijital dönüşüm alanlarında uzman isimleri bir araya getiriyoruz.</p>
        </div>
      </div>

      {/* KONUŞMACILA GRID */}
      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <div style={{ marginBottom: '48px' }}>
            <div className="section-eyebrow">Tüm Konuşmacılar</div>
            <h2 className="section-heading">5 <span className="gradient-text">Uzman</span> İsim</h2>
          </div>
          <div className="speakers-grid-full">
            {speakers.map(s => <SpeakerCard key={s.id} speaker={s} />)}
          </div>
        </div>
      </section>
    </>
  );
}