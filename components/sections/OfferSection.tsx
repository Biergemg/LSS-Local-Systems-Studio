import Link from 'next/link';
import { OFFER, CONTACT } from '@/data/content';
import Corners from '@/components/ui/Corners';

export default function OfferSection() {
  return (
    <section id="oferta" className="section on-paper offer" aria-labelledby="offer-h">
      <div className="container">
        <div className="head-2">
          <div>
            <p className="eyebrow">{OFFER.eyebrow}</p>
            <h2 id="offer-h" className="display reveal">{OFFER.title}</h2>
          </div>
          <p className="lede reveal">{OFFER.intro}</p>
        </div>

        <div className="reveal" style={{ margin: '48px 0 40px' }}>
          <h3 className="h2">{OFFER.deliverablesTitle}</h3>
          <ul style={{ margin: '12px 0 0', paddingLeft: 20, display: 'grid', gap: 10, listStyle: 'disc' }}>
            {OFFER.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="small" style={{ marginTop: 16 }}><strong>{OFFER.excludesTitle}.</strong> {OFFER.excludes}</p>
        </div>

        <h3 className="h2 reveal" style={{ marginBottom: 12 }}>{OFFER.groupsTitle}</h3>
        <ol className="groups">
          {OFFER.groups.map((g) => (
            <li className="group reveal" key={g.n}>
              <span className="idx">{g.n}</span>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
            </li>
          ))}
        </ol>

        <p className="statement reveal"><span className="node" aria-hidden="true" />{OFFER.closing}</p>

        <details className="disclose">
          <summary>{OFFER.detailsSummary}</summary>
          <p className="inner">{OFFER.details}</p>
        </details>

        <div className="existing reveal">
          <Corners />
          <h3 className="h2">{OFFER.existing.title}</h3>
          <p>{OFFER.existing.text}</p>
        </div>

        <p style={{ marginTop: 20 }}><Link className="link-line" href="/servicios/presencia-digital">Leer qué incluye web, Google y contacto</Link></p>
        <p className="cta-row" data-hide-wa>
          <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{OFFER.cta}</a>
        </p>
      </div>
    </section>
  );
}
