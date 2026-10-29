import { HERO, DOSSIER, CONTACT } from '@/data/content';

export default function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="h1">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1 id="h1" className="h1">{HERO.headline}</h1>
          <p className="lede">{HERO.body}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
              {HERO.ctaPrimary}
            </a>
            <a className="link-arrow" href="#prueba">{HERO.ctaSecondary} →</a>
          </div>
          <p className="small hero-note">{HERO.micro}</p>
          <p className="proof-line">{HERO.proof}</p>
        </div>

        <aside className="dossier rise rise-3" aria-label={DOSSIER.title}>
          <span className="dossier-tag">{DOSSIER.tag}</span>
          <p className="h3" style={{ marginTop: 14, marginBottom: 6 }}>{DOSSIER.title}</p>
          <div role="list">
            {DOSSIER.lenses.map((l) => (
              <div className="lens" role="listitem" key={l.n}>
                <span className="lens-n" aria-hidden="true">{l.n}</span>
                <div>
                  <p className="lens-q">{l.q}</p>
                  <p className="lens-a">{l.a}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="small" style={{ marginTop: 8 }}>{DOSSIER.note}</p>
        </aside>
      </div>
    </section>
  );
}
