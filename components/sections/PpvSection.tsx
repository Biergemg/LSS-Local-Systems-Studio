import { PPV, CONTACT } from '@/data/content';
import Mark from '@/components/ui/Mark';

export default function PpvSection() {
  return (
    <section id="prueba" className="section method" aria-labelledby="ppv-h">
      <Mark />
      <div className="container">
        <p className="eyebrow">{PPV.eyebrow}</p>
        <h2 id="ppv-h" className="mega reveal">{PPV.title}</h2>
        <p className="lede method-lede reveal">{PPV.body}</p>
        <p className="remote-note reveal">{PPV.remote}</p>
        <div className="fmt reveal" role="group" aria-label={`${PPV.docTitle} (${PPV.docTag.toLowerCase()}): cada una incluye ${PPV.docFields.join(', ').toLowerCase()}`}>
          <div className="fmt-head"><b>{PPV.docTitle}</b><span>{PPV.docTag}</span></div>
          <ol className="lenses">
            {PPV.steps.map((s) => (
              <li className="lens" key={s.n}>
                <span className="idx">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <div className="fmt-fields" aria-hidden="true">
                  {PPV.docFields.map((f) => (<span key={f}>{f}</span>))}
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="method-foot">
          <p className="reveal">{PPV.sample}</p>
          <p className="cta-row" data-hide-wa><a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{PPV.cta}</a></p>
        </div>
      </div>
    </section>
  );
}
