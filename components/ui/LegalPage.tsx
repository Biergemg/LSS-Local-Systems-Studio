import type { ReactNode } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <main id="contenido" className="legal">
      <div className="container legal-inner">
        <Logo />
        <p className="eyebrow">Información legal · LSS</p>
        <h1 className="display" style={{ marginTop: 28 }}>{title}</h1>
        <p className="small">Última actualización: {updated}</p>
        <nav aria-label="Documentos legales" className="legal-switch">
          <Link href="/privacidad">Aviso de privacidad</Link>
          <Link href="/terminos">Términos de uso</Link>
        </nav>
        <div className="legal-body">{children}</div>
        <p style={{ marginTop: 48 }}><Link className="btn btn-ghost" href="/">Volver al inicio</Link></p>
      </div>
    </main>
  );
}
