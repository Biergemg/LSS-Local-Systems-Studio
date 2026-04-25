'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/ui/Logo';
import { NAV_LINKS, CONTACT } from '@/data/content';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--nav-h)',
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(11,11,11,0.97)' : 'var(--surface-base)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.2s ease',
      }}
      aria-label="Navegación principal"
    >
      <div
        style={{
          maxWidth: 'var(--max-w)',
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Logo />

        {/* Desktop links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                color: 'var(--fg2)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg2)')}
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: 'var(--accent)',
              color: '#000',
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-dim)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
          >
            DIAGNÓSTICO
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="nav-mobile-btn"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <span style={{ display: 'block', width: '22px', height: '1px', backgroundColor: 'var(--fg)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <span style={{ display: 'block', width: '22px', height: '1px', backgroundColor: 'var(--fg)', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
          <span style={{ display: 'block', width: '22px', height: '1px', backgroundColor: 'var(--fg)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--nav-h)',
            left: 0,
            right: 0,
            backgroundColor: 'var(--surface-raised)',
            borderBottom: '1px solid var(--border)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--text-base)',
                fontWeight: 500,
                color: 'var(--fg2)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: 'var(--accent)',
              color: '#000',
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            DIAGNÓSTICO
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
