import type { Metadata } from 'next';
import TrackingConsent from '@/components/ui/TrackingConsent';
import { Inter_Tight, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SITE } from '@/data/content';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { GA_ID, META_PIXEL_ID } from '@/lib/analytics';

const interTight = Inter_Tight({ 
  subsets: ['latin'], 
  variable: '--font-inter-tight', 
  weight: ['400','700'], 
  display: 'swap' 
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-space-grotesk', 
  weight: ['700'], 
  display: 'swap' 
});

const siteUrl = SITE.url;
const siteTitle = SITE.title;
const siteDescription = SITE.description;
const ogImage = `${SITE.url}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: '/',
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    images: [{ url: ogImage, width: 1200, height: 630, alt: siteTitle }]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage]
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" className={`${interTight.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema]) }}
        />
        {children}
        <TrackingConsent pixelId={META_PIXEL_ID} gaId={GA_ID} />
      </body>
    </html>
  );
}
