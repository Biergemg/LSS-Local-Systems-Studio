import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter_Tight, Instrument_Serif, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SITE } from '@/data/content';
import { faqSchema, organizationSchema, websiteSchema } from '@/lib/schema';

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

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: '400',
  style: ['italic'],
  preload: false,
  display: 'swap'
});

const siteUrl = SITE.url;
const siteTitle = SITE.title;
const siteDescription = SITE.description;
const ogImage = `${SITE.url}/og-image.png`;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

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
    <html lang="es-MX" className={`${interTight.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema, faqSchema]) }}
        />
        {metaPixelId ? (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaPixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
