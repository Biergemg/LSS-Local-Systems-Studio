import { STATEMENT as S } from '@/data/content';

export default function StatementSection() {
  return (
    <section id="percepcion" className="stm" aria-labelledby="stm-h">
      <div className="container">
        <div className="stm-grid">
          <h2 id="stm-h" className="stm-big reveal">{S.pre} <em>{S.em}</em> {S.post}</h2>
          <p className="stm-side reveal">{S.side}</p>
        </div>
      </div>
    </section>
  );
}
