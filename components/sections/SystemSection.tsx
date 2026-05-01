import { SYSTEM_SECTION, SYSTEM_STEPS } from '@/data/content';

export default function SystemSection() {
  return (
    <section
      id="sistema"
      className="section-pad"
      style={{
        backgroundColor: 'var(--surface-base)',
        borderTop: '1px solid var(--border)',
        padding: '96px 0',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-w)',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Header */}
        <div
          className="sistema-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            marginBottom: '80px',
            alignItems: 'end',
          }}
        >
          <div>
            <p className="t-label" style={{ color: 'var(--accent)', marginBottom: '16px' }}>
              {SYSTEM_SECTION.eyebrow}
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, var(--text-3xl))',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wider)',
                lineHeight: 1,
                color: 'var(--fg)',
                whiteSpace: 'pre-line',
              }}
            >
              {SYSTEM_SECTION.title}
            </h2>
          </div>
          <p className="t-body" style={{ color: 'var(--fg2)' }}>
            {SYSTEM_SECTION.description}
          </p>
        </div>

        {/* Steps grid */}
        <div
          className="steps-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: '1px solid var(--border)',
          }}
        >
          {SYSTEM_STEPS.map((step, index) => (
            <div
              key={step.number}
              className="step-card"
              style={{
                padding: '40px 32px',
                borderRight: index < SYSTEM_STEPS.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(64px, 8vw, var(--text-5xl))',
                  fontWeight: 700,
                  color: 'var(--fg3)',
                  lineHeight: 1,
                  marginBottom: '40px',
                  letterSpacing: 'var(--tracking-tight)',
                }}
              >
                {step.number}
              </div>
              <h3 className="t-h3" style={{ color: 'var(--fg)', marginBottom: '16px' }}>
                {step.title}
              </h3>
              <p className="t-body-sm" style={{ color: 'var(--fg2)' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #sistema .sistema-header { grid-template-columns: 1fr !important; gap: 24px !important; margin-bottom: 48px !important; }
          #sistema .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
          #sistema .step-card { border-right: none !important; border-bottom: 1px solid var(--border); }
          #sistema .step-card:nth-child(odd) { border-right: 1px solid var(--border) !important; }
        }
        @media (max-width: 640px) {
          #sistema .steps-grid { grid-template-columns: 1fr !important; }
          #sistema .step-card { border-right: none !important; }
          #sistema .step-card:nth-child(odd) { border-right: none !important; }
          #sistema .step-card { padding: 28px 0 !important; }
        }
      `}</style>
    </section>
  );
}
