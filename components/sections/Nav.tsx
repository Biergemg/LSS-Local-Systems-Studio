'use client';

import { useEffect, useRef, useState } from 'react';
import Logo from '@/components/ui/Logo';
import { NAV_LINKS, NAV_CTA, CONTACT } from '@/data/content';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState('');
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const measure = () => document.documentElement.style.setProperty('--nav-h', `${inner.getBoundingClientRect().height}px`);
    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    return () => { observer.disconnect(); document.documentElement.style.removeProperty('--nav-h'); };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 900px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('main > section'));
    const hrefs = NAV_LINKS.map((l) => l.href);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const h = '#' + en.target.id;
          setActive(hrefs.includes(h) ? h : '');
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY; const dy = y - last;
      if (Math.abs(dy) < 6) return;
      setHidden(y > 140 && dy > 0);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
    <header className={`nav${hidden && !open ? ' nav-hide' : ''}`} onFocusCapture={() => setHidden(false)}>
      <nav ref={innerRef} className="container nav-inner" aria-label="Navegación principal">
        <Logo />
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} aria-current={active === l.href ? 'location' : undefined}>{l.label}</a>
          ))}
          <a className="btn btn-primary" style={{ minHeight: 44, padding: '10px 18px' }} href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
            {NAV_CTA}
          </a>
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
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            {NAV_CTA}
          </a>
        </div>
      )}
    </header>
    <noscript>
      <style>{'.nav-toggle { display: none; } .nav { position: sticky; flex-shrink: 0; } .nav-fallback { padding-top: 12px; } .hx { padding-top: 20px; }'}</style>
      <nav className="container nav-fallback" aria-label="Enlaces de la página">
        {NAV_LINKS.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{NAV_CTA}</a>
      </nav>
    </noscript>
    </>
  );
}
