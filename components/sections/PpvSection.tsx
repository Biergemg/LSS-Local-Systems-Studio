import { PPV } from '@/data/content';
import PpvDemo from '@/components/ui/PpvDemo';

export default function PpvSection() {
  return (
    <section id="prueba" className="section ppv-section" aria-labelledby="ppv-h">
      <div className="container">
        <div className="ppv-head">
          <div>
            <p className="eyebrow">{PPV.eyebrow}</p>
            <h2 id="ppv-h" className="display" style={{ marginBottom: 0 }}>{PPV.title}</h2>
          </div>
          <div>
            <p className="lede">{PPV.body}</p>
            <ol className="ppv-steps" aria-label="Cómo funciona">
              {PPV.steps.map((s, i) => (<li key={s}><span aria-hidden="true">{i + 1}</span>{s}</li>))}
            </ol>
          </div>
        </div>
        <PpvDemo />
      </div>
    </section>
  );
}
