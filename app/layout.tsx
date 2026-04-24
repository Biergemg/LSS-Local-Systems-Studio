import type { Metadata } from 'next';
import { Inter_Tight, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SITE } from '@/data/content';
import { faqSchema, localBusinessSchema, websiteSchema } from '@/lib/schema';

const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight', weight: ['300','400','500','700'], display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', weight: ['500','700'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: { type: 'website', locale: 'es_MX', url: SITE.url, siteName: SITE.name, title: SITE.title, description: SITE.description, images: [{ url: '/og-image.png', width: 1200, height: 630, alt: SITE.name }] },
  twitter: { card: 'summary_large_image', title: SITE.title, description: SITE.description, images: ['/og-image.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-MX" className={`${interTight.variable} ${spaceGrotesk.variable}`}><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, websiteSchema, faqSchema]) }} />{children}</body></html>;
}
