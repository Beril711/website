'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const ETIK_ILKELER = [
  { no: '01', ilke: 'İnsan Merkezlilik', aciklama: 'Yapay zeka sistemleri insan refahı ve onuruna hizmet etmek üzere tasarlanmalıdır.' },
  { no: '02', ilke: 'Şeffaflık ve Açıklanabilirlik', aciklama: 'Yapay zeka kararları anlaşılır, izlenebilir ve hesap verebilir olmalıdır. Kara kutu sistemlerde SHAP/LIME araçları kullanılmalıdır.' },
  { no: '03', ilke: 'Adalet ve Kapsayıcılık', aciklama: 'Yapay zeka uygulamaları demografik önyargıdan arındırılmış; herkese eşit hizmet sunacak biçimde geliştirilmelidir.' },
  { no: '04', ilke: 'Veri Gizliliği ve Güvenlik', aciklama: "Kişisel veriler KVKK ve GDPR çerçevesinde işlenmeli; workshop'larda anonimleştirilmiş veri tercih edilmelidir." },
  { no: '05', ilke: 'Hesap Verebilirlik', aciklama: 'Yapay zeka sistemlerinin olumsuz sonuçlarından insanlar sorumlu tutulabilmelidir; şikâyet mekanizmaları açık olmalıdır.' },
  { no: '06', ilke: 'Sürdürülebilirlik', aciklama: 'Yapay zeka çözümleri enerji tüketimi ve çevresel etki gözetilerek tasarlanmalıdır.' },
  { no: '07', ilke: 'Güvenlik', aciklama: 'Yapay zeka sistemleri kötüye kullanım, siber saldırı ve istem dışı zarara karşı güvenceli olmalıdır.' },
];

export default function KurullarPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data } = await supabase
        .from('kurullar')
        .select('*')
        .eq('visible', true)
        .order('sort_order', { ascending: true });
      setMembers(data || []);
      setLoading(false);
    };
    fetchMembers();
  }, []);

  const duzenleme = members.filter(m => m.kurul_tipi === 'duzenleme');
  const bilim = members.filter(m => m.kurul_tipi === 'bilim');
  const etik = members.filter(m => m.kurul_tipi === 'etik');

  if (loading) return (
    <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', color: 'var(--text-tertiary)' }}>
      Yükleniyor...
    </div>
  );

  return (
    <>
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span>Kurullar</span>
          </div>
          <h1 className="page-title">Çalıştay <span className="gradient-text">Kurulları</span></h1>
          <p className="page-desc">Kırşehir Ahi Evran Üniversitesi Mucur Meslek Yüksekokulu Yapay Zekâ Günleri Çalıştayı'nı yöneten üç kurul.</p>
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

        {/* DÜZENLEME KURULU */}
        <section id="duzenleme" style={{ paddingTop: 72, marginBottom: 72 }}>
          <div style={{ marginBottom: 28 }}>
            <div className="section-eyebrow">Düzenleme Kurulu</div>
            <h2 className="section-heading">Organizasyon <span className="gradient-text">Ekibi</span></h2>
            <p className="section-desc">Mucur MYO Yönetim Kurulu kararıyla oluşturulmuş; yönetim, WS koordinatörü ve destek ekibini kapsar.</p>
          </div>
          <div className="kurul-table-wrap">
            <table className="kurul-table">
              <thead>
                <tr><th>#</th><th>Ad Soyad / Unvan</th><th>Bölüm / Birim</th><th>Kurul Rolü</th><th>Sorumluluk</th></tr>
              </thead>
              <tbody>
                {duzenleme.map(u => (
                  <tr key={u.id}>
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
              {['Çalıştay programını ve workshop takvimini hazırlamak ve onaylamak','Workshop koordinatörleriyle düzenli toplantılar yapmak','Davetli konuşmacı ve sektör temsilcileriyle iletişimi sağlamak','Katılımcı başvurularını değerlendirmek; kontenjan planlamasını yapmak','Teknik altyapı, mekan düzeni ve lojistik ihtiyaçları karşılamak','Bütçe planlaması ve harcama takibini yürütmek','Etik Kurulu ile koordinasyonu sağlamak','Çalıştay sonrası değerlendirme raporunu hazırlamak'].map((g, i) => (
                <div key={i} className="kurul-gorev-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" style={{ width: 14, height: 14, flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                  {g}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BİLİM KURULU */}
        <section id="bilim" style={{ paddingTop: 72, marginBottom: 72 }}>
          <div style={{ marginBottom: 28 }}>
            <div className="section-eyebrow" style={{ color: '#10b981' }}>Bilim Kurulu</div>
            <h2 className="section-heading">Akademik <span className="gradient-text">Danışma Kurulu</span></h2>
            <p className="section-desc">Çalıştayın akademik kalitesini ve sektör yeterliliğini denetleyen danışma organı.</p>
          </div>
          <div className="kurul-cards">
            {bilim.map(u => (
              <div key={u.id} className="kurul-card">
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

        {/* ETİK KURULU */}
        <section id="etik" style={{ paddingTop: 72 }}>
          <div style={{ marginBottom: 28 }}>
            <div className="section-eyebrow" style={{ color: '#F59E0B' }}>Etik Kurulu</div>
            <h2 className="section-heading">Yapay Zeka Etik <span className="gradient-text">Kurulu</span></h2>
            <p className="section-desc">
              Çalıştayın Yapay zeka etiği boyutunu yönetir ve KVKK uyumunu denetler.{' '}
              <a href="mailto:etik@mucurmyo.edu.tr" style={{ color: '#A78BFA', fontWeight: 600 }}>etik@mucurmyo.edu.tr</a>
            </p>
          </div>
          <div className="kurul-table-wrap">
            <table className="kurul-table">
              <thead>
                <tr><th>#</th><th>Ad Soyad</th><th>Birim</th><th>Rol</th><th>Uzmanlık</th></tr>
              </thead>
              <tbody>
                {etik.map(u => (
                  <tr key={u.id}>
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
          <div style={{ marginTop: 40 }}>
            <h3 className="kurul-sub-title">7 Temel Yapay Zeka Etik İlkesi</h3>
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
          <div className="kurul-gorevler" style={{ marginTop: 32 }}>
            <h3 className="kurul-sub-title">Etik İhlal Bildirim Prosedürü</h3>
            <div className="kurul-gorev-grid">
              {['Bildirim etik@mucurmyo.edu.tr adresine veya Etik Kurulu Başkanına yazılı iletilir.','Etik Kurulu bildirimi 24 saat içinde değerlendirir.','İhlal doğrulanırsa Düzenleme Kurulu\'na bildirilir ve yaptırım uygulanır.','Bildirimde bulunan kişinin kimliği koşulsuz gizli tutulur.'].map((g, i) => (
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