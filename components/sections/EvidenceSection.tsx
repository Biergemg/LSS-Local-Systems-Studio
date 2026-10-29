import { EVIDENCE, CONTACT } from '@/data/content';

export default function EvidenceSection() {
  return (
    <section id="entrega" className="section on-paper evidence" aria-labelledby="ev-h">
      <div className="container ev-grid">
        <div>
          <p className="eyebrow">{EVIDENCE.eyebrow}</p>
          <h2 id="ev-h" className="display reveal">{EVIDENCE.title}</h2>
          <p className="lede reveal">{EVIDENCE.body}</p>
          <p className="cta-row" data-hide-wa>
            <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{EVIDENCE.cta}</a>
          </p>
        </div>
        <div className="acta reveal" role="group" aria-label={`${EVIDENCE.docTitle} (${EVIDENCE.docTag.toLowerCase()})`}>
          <div className="acta-head"><b>{EVIDENCE.docTitle}</b><span>{EVIDENCE.docTag}</span></div>
          <ul>
            {EVIDENCE.docRows.map((r) => (
              <li key={r.t}><span className="box" aria-hidden="true" /><div><b>{r.t}</b><span>{r.d}</span></div></li>
            ))}
          </ul>
          <p className="acta-note">{EVIDENCE.docNote}</p>
        </div>
      </div>
    </section>
  );
}
