import { RESULTS_SECTION, CASE_STUDIES } from '@/data/content';

export default function ResultsSection() {
  return (
    <section
      id="resultados"
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
        <div style={{ marginBottom: '64px' }}>
          <p className="t-label" style={{ color: 'var(--accent)', marginBottom: '16px' }}>
            {RESULTS_SECTION.eyebrow}
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
            {RESULTS_SECTION.title}
          </h2>
        </div>

        {/* Case studies grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0',
            borderTop: '1px solid var(--border)',
            borderLeft: '1px solid var(--border)',
          }}
        >
          {CASE_STUDIES.map((study) => (
            <div
              key={study.client}
              style={{
                padding: '48px 32px',
                borderRight: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(40px, 6vw, var(--text-2xl))',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  letterSpacing: 'var(--tracking-tight)',
                  lineHeight: 1,
                  marginBottom: '16px',
                }}
              >
                {study.metric}
              </div>
              <p
                className="t-body"
                style={{ color: 'var(--fg)', marginBottom: '24px' }}
              >
                {study.description}
              </p>
              <div
                style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span className="t-body-sm" style={{ color: 'var(--fg2)' }}>
                  {study.client}
                </span>
                <span className="t-label" style={{ color: 'var(--fg3)' }}>
                  {study.timeframe}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p
          className="t-label"
          style={{ color: 'var(--fg3)', marginTop: '24px' }}
        >
          {RESULTS_SECTION.note}
        </p>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #resultados .cases-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          #resultados .cases-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
