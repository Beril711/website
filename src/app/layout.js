import { ThemeProvider } from 'next-themes';
import './globals.css';
import LayoutShell from '@/components/layout/LayoutShell';

export const metadata = {
  title: 'Kırşehir Ahi Evran Üniversitesi 1. Yapay Zeka Günleri',
  description: 'Akademi ve sektörün modern buluşma noktası. Yapay zekanın eğitimden endüstriye uzanan dönüştürücü gücünü bilimsel perspektifle keşfedin.',
  keywords: ['yapay zeka', 'AI', 'Mucur', 'Kırşehir', 'etkinlik', 'çalıştay'],
  openGraph: {
    title: 'Kırşehir Ahi Evran Üniversitesi 1. Yapay Zeka Günleri',
    description: '1. Yapay Zeka Günleri — 4-6 Mayıs 2026, Mucur/Kırşehir',
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
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}