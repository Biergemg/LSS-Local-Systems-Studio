import { PPV } from '@/data/content';
import PpvDemo from '@/components/ui/PpvDemo';

export default function PpvSection() {
  return (
    <section id="prueba" className="section on-paper" aria-labelledby="ppv-h">
      <div className="container">
        <div className="split">
          <div>
            <p className="eyebrow">{PPV.eyebrow}</p>
            <h2 id="ppv-h" className="h2">{PPV.title}</h2>
          </div>
          <div>
            <p className="lede">{PPV.body}</p>
            <p className="lede" style={{ marginTop: 14 }}>{PPV.sample}</p>
            <p className="small" style={{ marginTop: 14 }}>{PPV.precision}</p>
          </div>
        </div>
        <PpvDemo />
      </div>
    </section>
  );
}
