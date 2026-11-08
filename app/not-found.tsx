import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Página no encontrada | LSS',
  robots: { index: false, follow: true },
};

/* 404 propio: siempre ofrece volver al inicio. */
export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="contenido" className="legal">
        <div className="container legal-inner">
          <p className="eyebrow">Error 404 · LSS</p>
          <h1 className="display" style={{ marginTop: 28 }}>Esta página no existe o cambió de lugar.</h1>
          <p className="lede">Revisa que la dirección esté bien escrita o regresa al inicio para encontrar lo que buscabas.</p>
          <nav aria-label="Salidas desde la página no encontrada" className="legal-switch">
            <Link href="/#servicio">Qué incluye</Link>
            <Link href="/servicios/presencia-digital">Web, Google y WhatsApp</Link>
          </nav>
          <p style={{ marginTop: 48 }}><Link className="btn btn-primary" href="/">Volver al inicio</Link></p>
        </div>
      </main>
      <Footer />
    </>
  );
}
