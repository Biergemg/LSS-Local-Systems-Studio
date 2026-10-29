import { EXPECTATIONS as E } from '@/data/content';

export default function ExpectationsSection() {
  return (
    <section id="presupuesto" className="section" aria-labelledby="exp-h">
      <div className="container">
        <div className="cols-2">
          <div>
            <p className="eyebrow">{E.eyebrow}</p>
            <h2 id="exp-h" className="h2">{E.title}</h2>
            <p className="lede">{E.body}</p>
            <p className="muted" style={{ marginTop: 14 }}>{E.sub}</p>
          </div>
          <div>
            <h3 className="h3" style={{ fontSize: 22 }}>{E.continuityTitle}</h3>
            <p className="muted">{E.continuity}</p>
            <p className="small" style={{ marginTop: 12 }}>{E.continuityMicro}</p>
          </div>
        </div>

        <div style={{ marginTop: 56 }}>
          <h3 className="h3" style={{ fontSize: 22 }}>{E.compareTitle}</h3>
          <p className="muted" style={{ maxWidth: '64ch' }}>{E.compareIntro}</p>
          <div className="compare" role="table" aria-label={E.compareTitle}>
            {E.compare.map((r) => (
              <div className="compare-row" role="row" key={r.f}>
                <div className="lab" role="rowheader">{r.f}</div>
                <div className="lo" role="cell"><span className="tag">{E.lo}</span>{r.lo}</div>
                <div className="hi" role="cell"><span className="tag">{E.hi}</span>{r.hi}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
