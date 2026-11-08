'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Logo from '@/components/ui/Logo';
import { NAV_LINKS, NAV_CTA, CONTACT } from '@/data/content';

/* Cabecera fija. En la portada es transparente sobre la toma y se vuelve sólida al llegar a las salas de lectura; en el resto de
   las páginas siempre es sólida. Incluye el enlace «Saltar al contenido» (primer elemento enfocable de todas las páginas). */
export default function Nav({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(!home);
  const [active, setActive] = useState('');
  const toggleRef = useRef<HTMLButtonElement>(null);
  const prefix = home ? '' : '/';

  useEffect(() => {
    if (!home) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const rooms = Array.from(document.querySelectorAll('.room'));
      const y = 56;
      const hit = rooms.find((r) => { const b = r.getBoundingClientRect(); return b.top <= y && b.bottom > y; });
      setSolid(Boolean(hit));
      setActive(hit && NAV_LINKS.some((l) => l.href === '#' + hit.id) ? '#' + hit.id : '');
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [home]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className={`nav${solid || open ? ' nav-solid' : ''}`}>
        <nav className="nav-inner" aria-label="Navegación principal">
          <Logo />
          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={prefix + l.href} aria-current={active === l.href ? 'location' : undefined}>{l.label}</a>
            ))}
            <a className="btn btn-primary btn-sm" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{NAV_CTA}</a>
          </div>
          <button
            ref={toggleRef}
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </nav>
        {open && (
          <div id="menu-movil" className="nav-panel">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={prefix + l.href} onClick={() => setOpen(false)}>{l.label}</a>
            ))}
            <Link href="/servicios/presencia-digital" onClick={() => setOpen(false)}>Web, Google y contacto</Link>
            <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>{NAV_CTA}</a>
          </div>
        )}
      </header>
    </>
  );
}
