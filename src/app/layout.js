import { ThemeProvider } from 'next-themes';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

export const metadata = {
  title: 'Mucur AI Days — Yapay Zeka Günleri 2025',
  description: 'Akademi ve sektörün modern buluşma noktası. Yapay zekanın eğitimden endüstriye uzanan dönüştürücü gücünü bilimsel perspektifle keşfedin.',
  keywords: ['yapay zeka', 'AI', 'Mucur', 'Kırşehir', 'etkinlik', 'çalıştay'],
  openGraph: {
    title: 'Mucur AI Days 2025',
    description: 'Yapay Zeka Günleri — 20 Kasım 2025, Mucur/Kırşehir',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem={true}
        >
          <Topbar />
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}