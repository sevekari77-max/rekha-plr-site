import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Open_Sans } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { MobileStickyBook } from '@/components/mobile-sticky-book';
import { SpeedInsights } from '@vercel/speed-insights/next';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Past Life Regression | Professional Guided Sessions',
  description:
    'Professional guided Past Life Regression sessions for self-discovery, inner peace, and personal clarity. Safe, calm, and compassionate environment. Book your session today.',
  keywords: [
    'Past Life Regression',
    'PLR',
    'Guided Sessions',
    'Self-Discovery',
    'Inner Peace',
    'Personal Clarity',
    'Past Life Therapy',
    'Regression Therapy',
  ],
  authors: [{ name: 'PLR Therapy' }],
  openGraph: {
    title: 'Past Life Regression | Professional Guided Sessions',
    description:
      'Professional guided Past Life Regression sessions for self-discovery and inner peace. Book your session today.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Past Life Regression',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Past Life Regression',
    description:
      'Professional guided PLR sessions for self-discovery and inner peace.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${openSans.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <WhatsAppButton />
        <MobileStickyBook />
        <Toaster position="top-center" />
        <SpeedInsights />
      </body>
    </html>
  );
}
