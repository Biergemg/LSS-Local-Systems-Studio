import { CONTACT, HERO } from '@/data/content';
import Fig from '@/components/ui/Fig';

/* Toma 0 · apertura. Fotograma clave 0 del Visor. */
export default function Hero() {
  return (
    <section className="beat beat-hero" data-kf="0" aria-labelledby="h-hero">
      <div className="beat-in">
        <div className="wrap">
          <Fig k={0} />
          <div className="beat-copy">
            <h1 id="h-hero" className="t-hero">{HERO.pre} <em>{HERO.em}</em> {HERO.post}</h1>
            <p className="lede">{HERO.body}</p>
            <div className="actions" data-hide-wa>
              <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{HERO.ctaPrimary}</a>
              <a className="btn btn-ghost" href="#proceso">{HERO.ctaSecondary}</a>
            </div>
            <ul className="ticks">{HERO.ticks.map((t) => (<li key={t}>{t}</li>))}</ul>
            <p className="hint" aria-hidden="true">Desplaza: la cámara entra</p>
          </div>
        </div>
      </div>
    </section>
  );
}
