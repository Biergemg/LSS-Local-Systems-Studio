import { EXPECTATIONS as E } from '@/data/content';

export default function ExpectationsSection() {
  return (
    <section id="presupuesto" className="section budget" aria-labelledby="exp-h">
      <div className="container">
        <div className="head-2">
          <div>
            <p className="eyebrow">{E.eyebrow}</p>
            <h2 id="exp-h" className="display reveal">{E.title}</h2>
          </div>
          <div className="reveal">
            <p className="lede">{E.body}</p>
            <p className="muted" style={{ marginTop: 14 }}>{E.sub}</p>
          </div>
        </div>

        <div className="compare-wrap">
          <h3 className="h2">{E.compareTitle}</h3>
          <p className="muted" style={{ maxWidth: '62ch' }}>{E.compareIntro}</p>
          <div className="compare" role="table" aria-label={E.compareTitle}>
            {E.compare.map((r) => (
              <div className="compare-row reveal" role="row" key={r.f}>
                <div className="lab" role="rowheader">{r.f}</div>
                <div className="lo" role="cell"><span className="tag">{E.lo}</span>{r.lo}</div>
                <div className="hi" role="cell"><span className="tag">{E.hi}</span>{r.hi}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="continuity reveal">
          <h3 className="statement"><span className="node" aria-hidden="true" />{E.continuityTitle}</h3>
          <p>{E.continuity}</p>
          <p className="small">{E.continuityMicro}</p>
        </div>
      </div>
    </section>
  );
}
