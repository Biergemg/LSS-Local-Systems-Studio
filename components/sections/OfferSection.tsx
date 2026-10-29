import { OFFER, CONTACT } from '@/data/content';

export default function OfferSection() {
  return (
    <section id="oferta" className="section" aria-labelledby="offer-h">
      <div className="container">
        <p className="eyebrow">{OFFER.eyebrow}</p>
        <h2 id="offer-h" className="h2" style={{ maxWidth: '20ch' }}>{OFFER.title}</h2>
        <p className="lede">{OFFER.intro}</p>

        <ul className="groups">
          {OFFER.groups.map((g) => (
            <li className="group" key={g.title}>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
            </li>
          ))}
        </ul>

        <details className="disclose">
          <summary>{OFFER.detailsSummary}</summary>
          <p className="inner">{OFFER.details}</p>
        </details>

        <div className="band" style={{ marginTop: 40 }}>
          <h3 className="h3" style={{ fontSize: 22 }}>{OFFER.existing.title}</h3>
          <p className="muted" style={{ maxWidth: '64ch' }}>{OFFER.existing.text}</p>
          <p style={{ marginTop: 10, fontWeight: 700 }}>{OFFER.existing.seal}</p>
        </div>

        <p style={{ marginTop: 32 }}>
          <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{OFFER.cta}</a>
        </p>
      </div>
    </section>
  );
}
