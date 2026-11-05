import { STATEMENT as S } from '@/data/content';
import { AgendaMock, GoogleMock, Phone, SiteMock } from '@/components/ui/Mocks';

const VISUALS = [
  { mock: <GoogleMock />, caption: 'Ejemplo ilustrativo: cómo puede verse tu ficha cuando te buscan.' },
  { mock: <SiteMock />, caption: 'Ejemplo ilustrativo: tu sitio, explicado en segundos.' },
  { mock: <AgendaMock />, caption: 'Ejemplo ilustrativo: agendar sin vueltas.' },
];

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
              <div className="sig-vis"><Phone caption={VISUALS[i].caption}>{VISUALS[i].mock}</Phone></div>
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
