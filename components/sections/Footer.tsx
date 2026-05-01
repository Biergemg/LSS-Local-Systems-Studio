'use client';

import Logo from '@/components/ui/Logo';
import { CONTACT } from '@/data/content';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--surface-base)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-w)',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Main footer row */}
        <div
          className="footer-inner"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            padding: '40px 0 32px',
          }}
        >
          <Logo muted />

          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              className="t-label"
              href={`mailto:${CONTACT.email}`}
              style={{ color: 'var(--fg2)', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg2)')}
            >
              {CONTACT.email}
            </a>
            <a
              className="t-label"
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--fg2)', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg2)')}
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            padding: '16px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p className="t-label" style={{ color: 'var(--fg3)' }}>
            © {new Date().getFullYear()} Local Systems Studio
          </p>
          <p className="t-label" style={{ color: 'var(--fg3)' }}>
            {CONTACT.location}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-inner { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  );
}
