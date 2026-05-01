import { PROBLEM_ITEMS, PROBLEM_SECTION } from '@/data/content';

export default function ProblemSection() {
  return (
    <section
      id="problema"
      className="section-pad"
      style={{
        background: 'var(--surface-raised)',
        borderTop: '1px solid var(--border)',
        padding: '96px 0',
      }}
    >
      <div className="container">
        <div
          className="problem-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            marginBottom: '64px',
            alignItems: 'end',
          }}
        >
          <div>
            <p className="t-label" style={{ color: 'var(--accent)', marginBottom: '16px' }}>
              {PROBLEM_SECTION.eyebrow}
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
              {PROBLEM_SECTION.title}
            </h2>
          </div>
          <p className="t-body problem-desc" style={{ color: 'var(--fg2)' }}>
            {PROBLEM_SECTION.description}
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--border)' }}>
          {PROBLEM_ITEMS.map((item, index) => (
            <div
              key={item.title}
              className="problem-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr',
                gap: '32px',
                padding: '40px 0',
                borderBottom: '1px solid var(--border)',
                alignItems: 'start',
              }}
            >
              <span className="t-mono" style={{ paddingTop: 3 }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: 'var(--text-md)',
                    fontWeight: 500,
                    color: 'var(--fg)',
                    marginBottom: '10px',
                    letterSpacing: 'var(--tracking-wide)',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.title}
                </h3>
                <p className="t-body-sm" style={{ maxWidth: '640px' }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #problema .problem-header {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            margin-bottom: 40px !important;
          }
          #problema .problem-desc {
            display: none;
          }
          #problema .problem-row {
            grid-template-columns: 48px 1fr !important;
            gap: 20px !important;
            padding: 28px 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
