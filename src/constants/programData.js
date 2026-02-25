// ─── 1. GÜN ───────────────────────────────────────────────────────────────
export const GUN1 = [
  { id: 'g1-1', time: '08:30', duration: '30 dk', type: 'opening', typeLabel: 'Lojistik', title: 'Kayıt ve Karşılama', desc: 'Katılımcı kaydı, isim kartı ve doküman dağıtımı.', speaker: null, speakerMultiple: false, location: 'Giriş Holü', highlight: false },
  { id: 'g1-2', time: '09:00', duration: '30 dk', type: 'opening', typeLabel: 'Tören', title: 'Açılış Töreni', desc: 'İstiklal Marşı, saygı duruşu, protokol fotoğrafı.', speaker: 'Protokol', speakerMultiple: false, location: 'Konferans Salonu', highlight: false },
  { id: 'g1-3', time: '09:30', duration: '30 dk', type: 'konusma', typeLabel: 'Konuşma', title: 'Rektör Açılış Konuşması', desc: 'Yapay zeka ve mesleki eğitimde üniversitenin vizyonu.', speaker: 'Prof. Dr. Mustafa Kasım Karahocagil', speakerMultiple: false, location: 'Konferans Salonu', highlight: true },
  { id: 'g1-4', time: '10:00', duration: '20 dk', type: 'konusma', typeLabel: 'Konuşma', title: 'MYO Müdürü Konuşması', desc: 'Mucur MYO\'nun 9 bölüm bazında yapay zeka stratejisi.', speaker: 'Prof. Dr. Murat Çanlı', speakerMultiple: false, location: 'Konferans Salonu', highlight: false },
  { id: 'g1-5', time: '10:20', duration: '20 dk', type: 'konusma', typeLabel: 'Paydaş', title: 'İlçe Kaymakamı Konuşması', desc: 'Bölgesel kalkınmada yapay zekanın rolü.', speaker: 'Emre Yeşilbay', speakerMultiple: false, location: 'Konferans Salonu', highlight: false },
  { id: 'g1-6', time: '10:40', duration: '20 dk', type: 'arasol', typeLabel: 'Ara', title: 'Kahve Molası & Networking', desc: 'Tanışma ve bilgi paylaşımı.', speaker: null, speakerMultiple: false, location: 'Fuaye', highlight: false },
  { id: 'g1-7', time: '11:00', duration: '45 dk', type: 'konusma', typeLabel: 'Sektör', title: 'Sektör Sunumu 1 — Sanayi & Üretim', desc: 'Kimya, makine ve üretim sektöründe yapay zeka uygulamaları ve eleman talepleri.', speaker: 'Sanayi Temsilcisi', speakerMultiple: false, location: 'Konferans Salonu', highlight: false },
  { id: 'g1-8', time: '11:45', duration: '45 dk', type: 'konusma', typeLabel: 'Sektör', title: 'Sektör Sunumu 2 — Lojistik & Ulaşım', desc: 'Taşımacılık, posta ve lojistik sektöründe yapay zeka ve otomasyon.', speaker: 'Lojistik Temsilcisi', speakerMultiple: false, location: 'Konferans Salonu', highlight: false },
  { id: 'g1-9', time: '12:30', duration: '60 dk', type: 'arasol', typeLabel: 'Ara', title: 'Öğle Yemeği', desc: '', speaker: null, speakerMultiple: false, location: 'Yemekhane', highlight: false },
  { id: 'g1-10', time: '13:30', duration: '45 dk', type: 'konusma', typeLabel: 'Sektör', title: 'Sektör Sunumu 3 — Finans & Bankacılık', desc: 'Kredi, risk, sigorta ve dijital bankacılıkta yapay zeka yenilikleri.', speaker: 'Finans Temsilcisi', speakerMultiple: false, location: 'Konferans Salonu', highlight: false },
  { id: 'g1-11', time: '14:15', duration: '45 dk', type: 'konusma', typeLabel: 'Sektör', title: 'Sektör Sunumu 4 — Medya, Tasarım & BT', desc: 'Grafik, oyun, yazılım ve medya sektöründe yapay zeka araçları ve istihdam.', speaker: 'Dijital Sektör Temsilcisi', speakerMultiple: false, location: 'Konferans Salonu', highlight: false },
  { id: 'g1-12', time: '15:00', duration: '15 dk', type: 'arasol', typeLabel: 'Ara', title: 'Kısa Mola', desc: '', speaker: null, speakerMultiple: false, location: '', highlight: false },
  { id: 'g1-13', time: '15:15', duration: '75 dk', type: 'panel', typeLabel: 'Panel', title: 'Panel: Sektörün YZ Talepleri ve Mesleki Yeterlilik', desc: 'Mucur MYO 9 bölümünden sektörlere yönelik işgücü beklentileri; moderatörlü tartışma.', speaker: 'Panel + Moderatör', speakerMultiple: true, location: 'Konferans Salonu', highlight: true },
  { id: 'g1-14', time: '16:30', duration: '30 dk', type: 'opening', typeLabel: 'Değerlendirme', title: 'Gün Sonu Değerlendirme', desc: 'Gün özeti ve yarınki workshop yönlendirmesi.', speaker: 'Prof. Dr. Murat Çanlı', speakerMultiple: false, location: 'Konferans Salonu', highlight: false },
];

// ─── 2. GÜN ───────────────────────────────────────────────────────────────
export const GUN2 = [
  { id: 'g2-1', time: '09:00', duration: '20 dk', type: 'opening', typeLabel: 'Bilgilendirme', title: 'Gün Açılışı & Workshop Yönlendirme', desc: '9 bölüm için salon atamaları ve rehber bilgi.', speaker: 'Org. Sorumlusu', speakerMultiple: false, location: 'Konferans Salonu', highlight: false },
  { id: 'g2-2', time: '09:20', duration: '30 dk', type: 'konusma', typeLabel: 'Anahtar Konuşma', title: "Davetli Konuşmacı: Türkiye'de YZ Ekosistemi", desc: 'Güncel yapay zeka modelleri, sektörel dönüşüm ve kariyer rehberliği.', speaker: 'Davetli Akademisyen / Sektör Uzmanı', speakerMultiple: false, location: 'Konferans Salonu', highlight: true },
  { id: 'g2-3', time: '09:50', duration: '10 dk', type: 'arasol', typeLabel: 'Lojistik', title: 'Salon Geçişleri', desc: 'Workshop salonlarına ve laboratuvarlara yönlendirme.', speaker: null, speakerMultiple: false, location: 'Tüm Salonlar', highlight: false },
  { id: 'g2-4', time: '10:00', duration: '120 dk', type: 'workshop', typeLabel: 'Workshop', title: 'WS Bloku 1 — 9 Bölüm Paralel Seanslar', desc: 'Salon A–J\'de 9 bölüm workshopu eş zamanlı. Her salon max. 25 katılımcı. Araçlar ve projeler üzerinde çalışma.', speaker: 'Bölüm Öğretim Elemanları', speakerMultiple: true, location: 'A–J Salonları', highlight: true },
  { id: 'g2-5', time: '12:00', duration: '60 dk', type: 'arasol', typeLabel: 'Ara', title: 'Öğle Yemeği', desc: '', speaker: null, speakerMultiple: false, location: 'Yemekhane', highlight: false },
  { id: 'g2-6', time: '13:00', duration: '120 dk', type: 'workshop', typeLabel: 'Workshop', title: 'WS Bloku 2 — Proje Geliştirme & Çıktı Üretimi', desc: '9 bölüm workshopu devamı. Proje geliştirme ve sunum hazırlığı.', speaker: 'Bölüm Öğretim Elemanları', speakerMultiple: true, location: 'A–J Salonları', highlight: false },
  { id: 'g2-7', time: '15:00', duration: '20 dk', type: 'arasol', typeLabel: 'Ara', title: 'Mola', desc: '', speaker: null, speakerMultiple: false, location: 'Fuaye', highlight: false },
  { id: 'g2-8', time: '15:20', duration: '70 dk', type: 'workshop', typeLabel: 'Açık Seans', title: 'WS Bloku 3 — Açık Seans (Salon K)', desc: 'Tüm dış katılımcılara açık temel yapay zeka araçları workshopu. ChatGPT, Gemini ve Microsoft Copilot uygulamaları. Kontenjan: 30 kişi.', speaker: 'Gönüllü Öğr. El.', speakerMultiple: false, location: 'Salon K', highlight: false },
  { id: 'g2-9', time: '16:30', duration: '30 dk', type: 'panel', typeLabel: 'Paylaşım', title: 'Workshop Çıktıları — Bölümlerarası Paylaşım', desc: 'Her bölümden workshop çıktısı özet sunumu (3–5 dk/bölüm).', speaker: 'Düzenleme Kurulu', speakerMultiple: true, location: 'Konferans Salonu', highlight: false },
];

// ─── 3. GÜN ───────────────────────────────────────────────────────────────
export const GUN3 = [
  { id: 'g3-1', time: '09:00', duration: '20 dk', type: 'opening', typeLabel: 'Bilgilendirme', title: 'Son Gün Açılışı & Program Duyurusu', desc: 'Sunum takvimi ve jüri tanıtımı.', speaker: 'Org. Sorumlusu', speakerMultiple: false, location: 'Konferans Salonu', highlight: false },
  { id: 'g3-2', time: '09:20', duration: '100 dk', type: 'konusma', typeLabel: 'Sunum', title: 'Öğrenci Proje Sunumları — 1. Tur (Bölüm 1–5)', desc: 'Workshop çıktısı projelerin jüri önünde sunumu. Bilgisayar, Kimya, Mülkiyet, Finans ve Tasarım bölümleri.', speaker: 'Jüri', speakerMultiple: true, location: 'Konferans Salonu', highlight: true },
  { id: 'g3-3', time: '11:00', duration: '15 dk', type: 'arasol', typeLabel: 'Ara', title: 'Mola', desc: '', speaker: null, speakerMultiple: false, location: '', highlight: false },
  { id: 'g3-4', time: '11:15', duration: '75 dk', type: 'konusma', typeLabel: 'Sunum', title: 'Öğrenci Proje Sunumları — 2. Tur (Bölüm 6–9)', desc: 'Workshop çıktısı projelerin jüri önünde sunumu. Ulaştırma, Görsel-İşitsel, Yönetim ve Yazılım bölümleri.', speaker: 'Jüri', speakerMultiple: true, location: 'Konferans Salonu', highlight: false },
  { id: 'g3-5', time: '12:30', duration: '60 dk', type: 'arasol', typeLabel: 'Ara', title: 'Öğle Yemeği', desc: '', speaker: null, speakerMultiple: false, location: 'Yemekhane', highlight: false },
  { id: 'g3-6', time: '13:30', duration: '60 dk', type: 'konusma', typeLabel: 'Anahtar Konuşma', title: "Davetli Konuşmacı: YZ'nin Geleceği ve Kariyer", desc: 'Öğrenciler için yapay zeka kariyer rehberliği; sektörel öneri ve yol haritası.', speaker: 'Davetli Uzman', speakerMultiple: false, location: 'Konferans Salonu', highlight: true },
  { id: 'g3-7', time: '14:30', duration: '30 dk', type: 'panel', typeLabel: 'Değerlendirme', title: 'Jüri Değerlendirme & Ödül Açıklaması', desc: 'En iyi proje/workshop çıktısı seçimi ve teşvik ödülleri.', speaker: 'Jüri Başkanı', speakerMultiple: false, location: 'Konferans Salonu', highlight: true },
  { id: 'g3-8', time: '15:00', duration: '20 dk', type: 'konusma', typeLabel: 'Rapor', title: 'Etik Kurulu & Düzenleme Kurulu Önerileri', desc: 'Çalıştay etik raporu ve öneriler sunumu.', speaker: 'Kurul Başkanları', speakerMultiple: true, location: 'Konferans Salonu', highlight: false },
  { id: 'g3-9', time: '15:20', duration: '10 dk', type: 'arasol', typeLabel: 'Ara', title: 'Kısa Mola', desc: '', speaker: null, speakerMultiple: false, location: '', highlight: false },
  { id: 'g3-10', time: '15:30', duration: '30 dk', type: 'opening', typeLabel: 'Tören', title: 'Sertifika & Katılım Belgesi Töreni', desc: 'Katılım belgeleri ve katkı belgelerinin takdimi.', speaker: 'Prof. Dr. Murat Çanlı', speakerMultiple: false, location: 'Konferans Salonu', highlight: true },
  { id: 'g3-11', time: '16:00', duration: '30 dk', type: 'arasol', typeLabel: 'Sosyal', title: 'Kapanış Kokteyli & Networking', desc: 'Networking, mezun/öğrenci buluşması, hatıra fotoğrafı.', speaker: null, speakerMultiple: false, location: 'Fuaye', highlight: false },
  { id: 'g3-12', time: '16:30', duration: '', type: 'opening', typeLabel: 'Kapanış', title: 'Resmi Kapanış', desc: 'MYO Müdürü kapanış konuşması.', speaker: 'Prof. Dr. Murat Çanlı', speakerMultiple: false, location: 'Konferans Salonu', highlight: false },
];

// Tüm günler
export const PROGRAM_ITEMS = [...GUN1, ...GUN2, ...GUN3];

export const FILTER_TABS = [
  { key: 'tumu', label: 'Tümü' },
  { key: 'konusma', label: 'Konuşma' },
  { key: 'panel', label: 'Panel' },
  { key: 'workshop', label: 'Workshop' },
  { key: 'arasol', label: 'Ara' },
];

export const GUN_TABS = [
  { key: 'hepsi', label: 'Tüm Program' },
  { key: 'gun1', label: '1. Gün — Açılış & Sektör' },
  { key: 'gun2', label: '2. Gün — Workshoplar' },
  { key: 'gun3', label: '3. Gün — Sunumlar & Kapanış' },
];