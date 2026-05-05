import { RESULTS_SECTION, CASE_STUDIES } from '@/data/content';

export default function ResultsSection() {
  return (
    <section
      id="resultados"
      className="section-pad"
      style={{
        backgroundColor: 'var(--surface-base)',
        borderTop: '1px solid var(--border)',
        padding: '96px 0',
      }}
    >
      <div className="container">
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
          #resultados .results-header { grid-template-columns: 1fr !important; gap: 16px !important; margin-bottom: 40px !important; }
        }
        @media (max-width: 768px) {
          #resultados .results-row {
            grid-template-columns: 40px 1fr !important;
            gap: 16px !important;
            padding: 28px 0 !important;
          }
          #resultados .results-row > div:nth-child(2) {
            grid-column: 2;
          }
          #resultados .results-row > p:last-child {
            grid-column: 1 / -1;
            padding-top: 8px;
          }
        }
      `}</style>
    </section>
  );
}
