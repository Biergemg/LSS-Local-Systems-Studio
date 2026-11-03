import { INCLUDES as I, CONTACT } from '@/data/content';

export default function IncludesSection() {
  return (
    <section id="incluye" className="section on-paper includes" aria-labelledby="inc-h">
      <div className="container">
        <div className="head-2">
          <div>
            <p className="eyebrow">{I.eyebrow}</p>
            <h2 id="inc-h" className="display reveal">{I.title}</h2>
          </div>
          <p className="lede reveal">{I.intro}</p>
        </div>
        <ol className="groups">
          {I.items.map((g) => (
            <li className="group reveal" key={g.n}>
              <span className="idx">{g.n}</span>
              <h3>{g.t}</h3>
              <p>{g.d}</p>
            </li>
          ))}
        </ol>
        <p className="includes-note reveal">{I.note}</p>
        <p className="cta-row" data-hide-wa>
          <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{I.cta}</a>
        </p>
      </div>
    </section>
  );
}
