# 🤖 Mucur AI Days — Yapay Zekâ Günleri

**Kırşehir Ahi Evran Üniversitesi, Mucur Meslek Yüksekokulu** tarafından düzenlenen 3 günlük Yapay Zekâ Günleri Çalıştayı'nın resmi web sitesi.

🔗 **Canlı Site:** [mucur-ai-days.vercel.app](https://mucur-ai-days.vercel.app)

---

## 📋 Proje Hakkında

Mucur AI Days, 9 bölüm ve 14 programı bir araya getiren kapsamlı bir yapay Zekâ etkinliğidir. Bu web sitesi etkinliğin tanıtımı, program akışı, konuşmacı bilgileri, kayıt işlemleri ve iletişim gibi tüm süreçleri dijital ortamda yönetmek amacıyla geliştirilmiştir.

### Etkinlik Özellikleri

| Özellik | Detay |
|---------|-------|
| 📅 Süre | 3 Gün |
| 📍 Konum | Mucur MYO, Kırşehir |
| 🎓 Bölüm | 9 |
| 📚 Program | 14 |
| 🛠️ Workshop | 10 |
| 💰 Katılım | Ücretsiz |

---

## 🛠️ Teknoloji Yığını

| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| [Next.js](https://nextjs.org/) | ^16.1.6 | React tabanlı full-stack framework (App Router) |
| [React](https://react.dev/) | ^19.2.4 | Kullanıcı arayüzü kütüphanesi |
| [Tailwind CSS](https://tailwindcss.com/) | — | Utility-first CSS framework |
| [Supabase](https://supabase.com/) | ^2.97.0 | Backend-as-a-Service (veritabanı & auth) |
| [Lucide React](https://lucide.dev/) | ^0.575.0 | Modern ikon kütüphanesi |
| [next-themes](https://github.com/pacocoursey/next-themes) | ^0.4.6 | Koyu/açık tema yönetimi |
| [Sonner](https://sonner.emilkowal.dev/) | ^2.0.7 | Toast bildirim kütüphanesi |

---

## 📁 Proje Yapısı

```
website/
├── public/                  # Statik dosyalar
├── src/
│   ├── app/                 # Next.js App Router sayfaları
│   │   ├── layout.js        # Ana layout (Navbar, Footer, ThemeProvider)
│   │   ├── page.js          # Ana sayfa
│   │   ├── globals.css      # Global stiller ve tasarım sistemi
│   │   ├── iletisim/        # İletişim sayfası
│   │   ├── kayit/           # Kayıt sayfası
│   │   ├── konusmacilar/    # Konuşmacılar sayfası
│   │   ├── odak-alanlari/   # Odak alanları sayfası
│   │   ├── program/         # Program sayfası
│   │   └── sponsorlar/      # Sponsorlar sayfası
│   │
│   ├── components/          # Yeniden kullanılabilir bileşenler
│   │   ├── forms/           # Form bileşenleri
│   │   │   └── NewsletterForm.jsx
│   │   ├── home/            # Ana sayfa bileşenleri
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── FocusAreas.jsx
│   │   │   ├── ProgramPreview.jsx
│   │   │   ├── SpeakersPreview.jsx
│   │   │   └── Sponsors.jsx
│   │   ├── iletisim/
│   │   │   └── IletisimForm.jsx
│   │   ├── kayit/
│   │   │   └── KayitForm.jsx
│   │   ├── konusmacilar/
│   │   │   └── SpeakerCard.jsx
│   │   ├── layout/          # Layout bileşenleri
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── Topbar.jsx
│   │   ├── program/
│   │   │   ├── ProgramCard.jsx
│   │   │   └── ProgramList.jsx
│   │   └── ui/              # Genel UI bileşenleri
│   │       └── ScrollReveal.jsx
│   │
│   └── constants/           # Sabit veriler
│       ├── siteConfig.js    # Site yapılandırması & navigasyon
│       ├── speakersData.js  # Konuşmacı bilgileri
│       └── programData.js   # Program akışı verileri
│
├── next.config.js           # Next.js yapılandırması
├── tailwind.config.js       # Tailwind CSS yapılandırması
├── jsconfig.json            # Path alias ayarları (@/ → ./src/)
├── package.json             # Bağımlılıklar ve scriptler
└── .gitignore
```

---

## 🚀 Kurulum & Çalıştırma

### Gereksinimler

- **Node.js** 18+ sürümü
- **npm** paket yöneticisi

### Adımlar

1. **Depoyu klonlayın:**
   ```bash
   git clone https://github.com/Beril711/website.git
   cd website
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```
   Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışır.

4. **Üretim derlemesi:**
   ```bash
   npm run build
   npm start
   ```

---

## 📄 Sayfalar

| Sayfa | Yol | Açıklama |
|-------|-----|----------|
| Ana Sayfa | `/` | Hero, özellikler, konuşmacı önizleme, program önizleme, odak alanları, sponsorlar |
| Program | `/program` | Etkinlik programının tam listesi |
| Konuşmacılar | `/konusmacilar` | Konuşmacı profilleri ve uzmanlık alanları |
| Odak Alanları | `/odak-alanlari` | Çalıştayın odaklandığı AI alanları |
| Sponsorlar | `/sponsorlar` | Sponsor kuruluşlar |
| İletişim | `/iletisim` | İletişim formu |
| Kayıt | `/kayit` | Etkinlik kayıt formu |

---

## 🎨 Tema Sistemi

Proje `next-themes` kütüphanesi ile **karanlık/aydınlık tema** desteğine sahiptir. Tema yönetimi CSS değişkenleri (`var()`) üzerinden yapılmaktadır. Varsayılan tema **karanlık** (dark) olarak ayarlanmıştır.

---

## 📬 İletişim

| Kanal | Bilgi |
|-------|-------|
| ✉️ E-posta | myo.calistay@ahievran.edu.tr |
| 🏫 Kurum | Kırşehir Ahi Evran Üniversitesi |
| 📍 Adres | Mucur Meslek Yüksekokulu, Mucur/Kırşehir |

---

## 📝 Lisans

Bu proje Kırşehir Ahi Evran Üniversitesi, Mucur Meslek Yüksekokulu bünyesinde geliştirilmektedir.
