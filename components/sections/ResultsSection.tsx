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
        {/* Header — split layout */}
        <div
          className="results-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'end',
            marginBottom: '64px',
          }}
        >
          <div>
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
          <p
            className="t-label"
            style={{ color: 'var(--fg3)', alignSelf: 'end' }}
          >
            {RESULTS_SECTION.note}
          </p>
        </div>

        {/* Methodology list — horizontal rows, not card grid */}
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {CASE_STUDIES.map((study) => (
            <div
              key={study.client}
              className="results-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '64px 200px 1fr',
                gap: '40px',
                padding: '40px 0',
                borderBottom: '1px solid var(--border)',
                alignItems: 'start',
              }}
            >
              <span
                className="t-mono"
                style={{ paddingTop: 3 }}
              >
                {study.metric.padStart(2, '0')}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 700,
                    color: 'var(--fg)',
                    letterSpacing: 'var(--tracking-wide)',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  {study.client}
                </p>
                <span className="t-label" style={{ color: 'var(--fg3)' }}>
                  {study.timeframe}
                </span>
              </div>
              <p className="t-body-sm" style={{ color: 'var(--fg2)', maxWidth: '560px' }}>
                {study.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #resultados .results-header { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          #resultados .results-row {
            grid-template-columns: 48px 1fr !important;
            grid-template-rows: auto auto;
          }
          #resultados .results-row > p:last-child {
            grid-column: 2 / -1;
          }
        }
      `}</style>
    </section>
  );
}
