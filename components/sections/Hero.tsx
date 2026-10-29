import { HERO, CONTACT } from '@/data/content';
import Corners from '@/components/ui/Corners';
import FlowMark from '@/components/ui/FlowMark';

export default function Hero() {
  const s = HERO.schematic;
  return (
    <section id="inicio" className="hero" aria-labelledby="h1">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1 id="h1" className="h1">{HERO.headline}</h1>
          <p className="lede">{HERO.body}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{HERO.ctaPrimary}</a>
            <a className="link-line" href="#proceso">{HERO.ctaSecondary}</a>
          </div>
          <p className="small hero-micro">{HERO.micro}</p>
        </div>

        <figure className="hero-figure" aria-label={s.label}>
          <Corners />
          <FlowMark />
          <ol className="hero-notes">
            {s.lines.map((l) => (
              <li key={l.n}><span className="note-n">{l.n}</span><b>{l.t}</b><span>{l.d}</span></li>
            ))}
          </ol>
          <figcaption>{s.label}</figcaption>
        </figure>
      </div>
      <div className="container"><p className="hero-proof">{HERO.proof}</p></div>
    </section>
  );
}
