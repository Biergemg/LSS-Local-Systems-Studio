import { COMPARISON_SECTION, COMPARISON_ROWS } from '@/data/content';

export default function ComparisonSection() {
  return (
    <section
      id="proceso"
      style={{
        backgroundColor: 'var(--surface-raised)',
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
        <p className="t-label" style={{ color: 'var(--accent)', marginBottom: '16px' }}>
          {COMPARISON_SECTION.eyebrow}
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, var(--text-2xl))',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 'var(--tracking-wider)',
            lineHeight: 1.2,
            color: 'var(--fg)',
            marginBottom: '64px',
          }}
        >
          {COMPARISON_SECTION.title}
        </h2>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '600px',
            }}
          >
            {/* Header */}
            <thead>
              <tr style={{ backgroundColor: 'var(--accent)' }}>
                <th
                  style={{
                    padding: '16px 24px',
                    textAlign: 'left',
                    fontFamily: 'var(--font-primary)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    color: '#000',
                    letterSpacing: 'var(--tracking-widest)',
                    textTransform: 'uppercase',
                    width: '30%',
                  }}
                >
                  CRITERIO
                </th>
                <th
                  style={{
                    padding: '16px 24px',
                    textAlign: 'left',
                    fontFamily: 'var(--font-primary)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    color: '#000',
                    letterSpacing: 'var(--tracking-widest)',
                    textTransform: 'uppercase',
                    width: '35%',
                  }}
                >
                  AGENCIA TRADICIONAL
                </th>
                <th
                  style={{
                    padding: '16px 24px',
                    textAlign: 'left',
                    fontFamily: 'var(--font-primary)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    color: '#000',
                    letterSpacing: 'var(--tracking-widest)',
                    textTransform: 'uppercase',
                    width: '35%',
                  }}
                >
                  LSS
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, index) => (
                <tr
                  key={row.feature}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <td
                    style={{
                      padding: '20px 24px',
                      fontFamily: 'var(--font-primary)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 500,
                      color: 'var(--fg2)',
                      letterSpacing: 'var(--tracking-widest)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {row.feature}
                  </td>
                  <td
                    style={{
                      padding: '20px 24px',
                      fontFamily: 'var(--font-primary)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 300,
                      color: 'var(--fg2)',
                    }}
                  >
                    {row.agency}
                  </td>
                  <td
                    style={{
                      padding: '20px 24px',
                      fontFamily: 'var(--font-primary)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 500,
                      color: 'var(--fg)',
                    }}
                  >
                    {row.lss}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
