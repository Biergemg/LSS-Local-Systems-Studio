import { HERO, CONTACT, EMAIL_CONTACT_URL } from '@/data/content';
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
            <a className="btn btn-primary" data-hide-wa href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{HERO.ctaPrimary}</a>
            <a className="link-line" href="#proceso">{HERO.ctaSecondary}</a>
          </div>
          <p className="small hero-micro">{HERO.micro} <a href={EMAIL_CONTACT_URL} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, maxWidth: '100%' }}>¿Prefieres correo? Solicita la revisión por email.</a></p>
        </div>

        <figure className="hero-figure" aria-label={`${s.label}. ${s.desc}`}>
          <FlowMark />
          <figcaption>{s.label}</figcaption>
        </figure>
      </div>
    </section>
  );
}
