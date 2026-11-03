import { SERVICE as S, CONTACT } from '@/data/content';

export default function ServiceSection() {
  return (
    <section id="servicio" className="sx" aria-labelledby="sx-h">
      <div className="container">
        <h2 id="sx-h" className="sx-h reveal">{S.title}</h2>
        <ol className="sx-list">
          {S.items.map((i) => (
            <li className="sx-row reveal" key={i.n}>
              <span className="sx-n">{i.n}</span>
              <h3>{i.t}</h3>
              <p>{i.d}</p>
            </li>
          ))}
        </ol>
        <p className="sx-note reveal">{S.note}</p>
        <p className="cta-row" data-hide-wa>
          <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{S.cta}</a>
        </p>
      </div>
    </section>
  );
}
