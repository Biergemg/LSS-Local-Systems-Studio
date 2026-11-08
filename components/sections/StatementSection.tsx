import { STATEMENT as S } from '@/data/content';
import Fig from '@/components/ui/Fig';

/* Tomas 1–5 · la búsqueda, la comprensión, el iris (transición vacía a propósito), el mensaje y la agenda.
   Cada sección ancla un fotograma clave del Visor en su centro (data-kf); los textos salen de data/content.ts. */
function Step({ n, kf, fig, name, title, text }: { n: number; kf: number; fig: 1 | 2 | 4 | 5; name: string; title: string; text: string }) {
  return (
    <section className="beat" data-kf={kf} aria-labelledby={`h-step-${n}`}>
      <div className="beat-in">
        <div className="wrap">
          <Fig k={fig} />
          <div className="beat-copy">
            <p className="k"><i aria-hidden="true" />0{n} / 04 · {name}</p>
            <h3 id={`h-step-${n}`} className="t-step">{title}</h3>
            <p className="lede">{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function StatementSection() {
  return (
    <>
      <section className="beat beat-statement" data-kf="1" aria-labelledby="h-statement">
        <div className="beat-in">
          <div className="wrap">
            <div className="beat-copy">
              <h2 id="h-statement" className="t-beat">{S.pre} <em>{S.em}</em> {S.post}</h2>
              <p className="lede">{S.side}</p>
            </div>
          </div>
        </div>
      </section>
      <Step n={1} kf={1} fig={1} name={S.steps[0].t} title={S.steps[0].h} text={S.steps[0].d} />
      <Step n={2} kf={2} fig={2} name={S.steps[1].t} title={S.steps[1].h} text={S.steps[1].d} />
      <div className="beat beat-iris" data-kf="3" aria-hidden="true"><Fig k={3} /></div>
      <Step n={3} kf={4} fig={4} name={S.steps[2].t} title={S.steps[2].h} text={S.steps[2].d} />
      <Step n={4} kf={5} fig={5} name={S.steps[3].t} title={S.steps[3].h} text={S.steps[3].d} />
    </>
  );
}
