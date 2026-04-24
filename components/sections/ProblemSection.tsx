import { PROBLEM_ITEMS, PROBLEM_SECTION } from '@/data/content';

export default function ProblemSection() {
  return (
    <section id="problema" className="section-pad" style={{ background: 'var(--surface-raised)', borderTop: '1px solid var(--border)', padding: '96px 0' }}>
      <div className="container">
        <div className="header-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 64, alignItems: 'end' }}>
          <div>
            <p className="t-label" style={{ color: 'var(--accent)', marginBottom: 16 }}>{PROBLEM_SECTION.eyebrow}</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,var(--text-3xl))', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', lineHeight: 1, color: 'var(--fg)', whiteSpace: 'pre-line' }}>{PROBLEM_SECTION.title}</h2>
          </div>
          <p className="t-body" style={{ color: 'var(--fg2)' }}>{PROBLEM_SECTION.description}</p>
        </div>
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {PROBLEM_ITEMS.map((item, index) => (
            <div key={item.title} style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 40, padding: '40px 0', borderBottom: '1px solid var(--border)', alignItems: 'start' }}>
              <span className="t-mono" style={{ paddingTop: 3 }}>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: 'var(--text-md)', fontWeight: 500, color: 'var(--fg)', marginBottom: 10, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>{item.title}</h3>
                <p className="t-body-sm" style={{ maxWidth: 640 }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
