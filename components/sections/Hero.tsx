'use client';

import { HERO, CONTACT } from '@/data/content';

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'var(--surface-base)',
        paddingTop: 'var(--nav-h)',
        overflow: 'hidden',
      }}
    >
      {/* Grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          opacity: 0.18,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 'var(--max-w)',
          margin: '0 auto',
          padding: '80px 24px 64px',
          width: '100%',
        }}
      >
        {/* Eyebrow */}
        <p
          className="t-label"
          style={{
            color: 'var(--accent)',
            marginBottom: '32px',
          }}
        >
          {HERO.eyebrow}
        </p>

        {/* Main headline */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 9vw, 104px)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 'var(--tracking-wider)',
            lineHeight: 0.95,
            color: 'var(--fg)',
            marginBottom: '48px',
            whiteSpace: 'pre-line',
          }}
        >
          {HERO.headline}
        </h1>

        {/* Body */}
        <p
          className="t-body"
          style={{
            color: 'var(--fg2)',
            maxWidth: '560px',
            marginBottom: '48px',
          }}
        >
          {HERO.body}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '80px',
          }}
        >
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
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
            {HERO.ctaPrimary}
          </a>
          <a
            href="#sistema"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              backgroundColor: 'transparent',
              color: 'var(--fg)',
              border: '1px solid var(--fg)',
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'border-color 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--fg)';
              e.currentTarget.style.color = 'var(--fg)';
            }}
          >
            {HERO.ctaSecondary}
          </a>
        </div>

        {/* CEC method marker */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            flexWrap: 'wrap',
            rowGap: '16px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              color: 'var(--accent)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              marginRight: '20px',
            }}
          >
            MÉTODO CEC
          </span>
          <div className="cec-pillars" style={{ display: 'flex', gap: '0', borderLeft: '1px solid var(--border)' }}>
            {['Claridad', 'Evidencia', 'Contacto'].map((pillar, i) => (
              <div
                key={pillar}
                style={{
                  padding: '8px 24px',
                  borderRight: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 300,
                    color: 'var(--fg3)',
                    letterSpacing: '0',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="t-label"
                  style={{ color: 'var(--fg2)' }}
                >
                  {pillar}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          #hero .cec-pillars { flex-direction: column !important; border-left: none !important; }
          #hero .cec-pillars > div { border-right: none !important; border-bottom: 1px solid var(--border); padding: 10px 0 !important; }
        }
      `}</style>
    </section>
  );
}
