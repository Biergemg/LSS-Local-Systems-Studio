import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import TrackingConsent from '@/components/ui/TrackingConsent';
import './globals.css';
import { SITE } from '@/data/content';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { GA_ID, META_PIXEL_ID } from '@/lib/analytics';

/* Tipografías autoalojadas (OFL): Instrument Serif (titulares), Space Grotesk (interfaz) e IBM Plex Mono (etiquetas y texto del mensaje 3D). */
const serif = localFont({
  src: [
    { path: './fonts/instrument-serif-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif', display: 'swap',
});
const ui = localFont({ src: './fonts/space-grotesk-latin-wght-normal.woff2', weight: '300 700', variable: '--font-ui', display: 'swap' });
const mono = localFont({ src: './fonts/ibm-plex-mono-latin-500-normal.woff2', weight: '500', variable: '--font-mono', display: 'swap' });

const siteUrl = SITE.url;
const siteTitle = SITE.title;
const siteDescription = SITE.description;
const ogImage = `${SITE.url}/og-image.png`;

export const viewport: Viewport = { themeColor: '#120d0a', colorScheme: 'dark', viewportFit: 'cover' };

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

/* Decide ANTES del primer pintado si la portada usa la toma cinematográfica (disposición alta con escenario fijo) o la secuencia estática:
   sin movimiento reducido, sin ahorro de datos y con WebGL disponible. Si el motor falla después, VisorStage retira la clase. */
const GL_PROBE = "try{var d=document.documentElement,c=navigator.connection;if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!(c&&c.saveData)&&window.WebGLRenderingContext)d.classList.add('gl-able')}catch(e){}";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" className={`${serif.variable} ${ui.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: GL_PROBE }} />
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
