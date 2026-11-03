import { STATEMENT as S } from '@/data/content';

export default function StatementSection() {
  return (
    <section id="percepcion" className="stm" aria-labelledby="stm-h">
      <div className="container">
        <h2 id="stm-h" className="stm-big reveal">
          <span className="stm-lead">{S.pre}</span>
          <span className="stm-hit">{S.em}</span>
          <span className="stm-tail">{S.post}</span>
        </h2>
        <p className="stm-side reveal">{S.side}</p>
        <ol className="sig">
          {S.steps.map((s, i) => (
            <li className="sig-step reveal" key={s.t}>
              <span className="sig-n">0{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
