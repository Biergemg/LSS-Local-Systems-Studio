import { OFFER, CONTACT } from '@/data/content';
import BrandArt, { seedOf } from '@/components/ui/BrandArt';

export default function OfferSection() {
  return (
    <section id="oferta" className="section on-paper offer" aria-labelledby="offer-h">
      <div className="container">
        <div className="offer-grid">
        <div>
        <p className="eyebrow">{OFFER.eyebrow}</p>
        <h2 id="offer-h" className="display reveal">{OFFER.title}</h2>
        <p className="lede reveal">{OFFER.intro}</p>

        <ul className="groups">
          {OFFER.groups.map((g) => (
            <li className="group reveal" key={g.title}>
              <span className="roman" aria-hidden="true">{g.n}</span>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
            </li>
          ))}
        </ul>

        <details className="disclose">
          <summary>{OFFER.detailsSummary}</summary>
          <p className="inner">{OFFER.details}</p>
        </details>

        <div className="existing reveal">
          <h3 className="serif-line">{OFFER.existing.title}</h3>
          <p>{OFFER.existing.text}</p>
        </div>

        <p className="cta-row" data-hide-wa>
          <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{OFFER.cta}</a>
        </p>
        </div>
        <figure className="plate" aria-hidden="true">
          <div className="canvas" style={{ ['--b-bg' as string]: '#e2dccb', ['--b-fg' as string]: '#141414', ['--b-soft' as string]: '#f3f0e8', ['--b-acc' as string]: '#141414', ['--b-on' as string]: '#f3f0e8', ['--b-mute' as string]: '#4a4a45', ['--b-hi' as string]: '#006b3c' }}>
            <BrandArt seed={seedOf('LSS Presencia Resuelta')} letter="L" />
          </div>
          <figcaption>Dirección de arte original de LSS.</figcaption>
        </figure>
        </div>
      </div>
    </section>
  );
}
