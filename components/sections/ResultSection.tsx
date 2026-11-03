import { RESULT as R, CONTACT } from '@/data/content';
import Mark from '@/components/ui/Mark';

export default function ResultSection() {
  return (
    <section id="resultado" className="section method" aria-labelledby="res-h">
      <Mark />
      <div className="container">
        <p className="eyebrow">{R.eyebrow}</p>
        <h2 id="res-h" className="mega reveal">{R.title}</h2>
        <ol className="lenses">
          {R.items.map((i) => (
            <li className="lens reveal" key={i.n}>
              <span className="idx">{i.n}</span>
              <h3>{i.t}</h3>
              <p>{i.d}</p>
            </li>
          ))}
        </ol>
        <p className="cta-row" data-hide-wa><a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{R.cta}</a></p>
      </div>
    </section>
  );
}
