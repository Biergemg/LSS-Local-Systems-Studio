'use client';

import { HERO, HERO_STATS, CONTACT } from '@/data/content';

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
            fontSize: 'clamp(48px, 8vw, var(--text-4xl))',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 'var(--tracking-wider)',
            lineHeight: 1,
            color: 'var(--fg)',
            marginBottom: '40px',
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

        {/* Stats */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
          }}
        >
          {HERO_STATS.map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, var(--text-2xl))',
                  fontWeight: 700,
                  color: 'var(--fg)',
                  letterSpacing: 'var(--tracking-tight)',
                  marginBottom: '4px',
                }}
              >
                {stat.value}
              </div>
              <div className="t-label" style={{ color: 'var(--fg2)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <p
          className="t-label"
          style={{ color: 'var(--fg3)', marginTop: '16px' }}
        >
          * datos de referencia interna — se actualizarán con cifras reales
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #hero .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
