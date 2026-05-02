import { DELIVERABLES_SECTION } from '@/data/content';

export default function DeliverablesSection() {
  return (
    <section
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
        <p className="t-label" style={{ color: 'var(--accent)', marginBottom: '16px' }}>
          {DELIVERABLES_SECTION.eyebrow}
        </p>
        <p
          className="t-body"
          style={{
            color: 'var(--fg2)',
            maxWidth: '560px',
            marginBottom: '48px',
          }}
        >
          {DELIVERABLES_SECTION.title}
        </p>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '0',
            borderTop: '1px solid var(--border)',
            borderLeft: '1px solid var(--border)',
          }}
        >
          {DELIVERABLES_SECTION.items.map((item, i) => (
            <li
              key={i}
              style={{
                borderRight: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 300,
                  color: 'var(--accent)',
                  letterSpacing: '0',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 300,
                  color: 'var(--fg2)',
                  lineHeight: 1.6,
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
