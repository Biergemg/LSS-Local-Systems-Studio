import { HERO, CONTACT } from '@/data/content';
import BrandArt, { seedOf } from '@/components/ui/BrandArt';

export default function Hero() {
  const s = HERO.sample;
  return (
    <section id="inicio" className="hero" aria-labelledby="h1">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1 id="h1" className="h1">{HERO.headline}</h1>
          <p className="lede">{HERO.body}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#prueba">{HERO.ctaPrimary}</a>
            <a className="btn btn-ghost" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{HERO.ctaSecondary}</a>
          </div>
        </div>

        <div className="hero-stage rise" role="img" aria-label={`${s.tag}: ${s.name}, ${s.line}. ${s.note}`}>
          <div className="hs-browser canvas" data-dir="atelier" style={{ ['--b-bg' as string]: '#f3f0e8', ['--b-fg' as string]: '#141414', ['--b-soft' as string]: '#e2dccb', ['--b-acc' as string]: '#141414', ['--b-on' as string]: '#f3f0e8', ['--b-mute' as string]: '#4a4a45', ['--b-hi' as string]: '#006b3c' }}>
            <div className="hs-bar"><i /><i /><i /><span>casaarroyo.example</span></div>
            <div className="site hs-site">
              <header className="site-nav on"><span className="mono">C</span><span className="site-brand">{s.name}</span><span className="site-links"><i /><i /><i /></span></header>
              <section className="site-cover on">
                <div className="cover-text">
                  <p className="kicker">Tampico</p>
                  <h2 className="cover-title">{s.name}</h2>
                  <p className="cover-sub">{s.line.split(' · ')[0]}</p>
                  <span className="site-btn">{s.cta} →</span>
                </div>
                <div className="cover-art"><BrandArt seed={seedOf(s.name)} letter="C" /></div>
              </section>
            </div>
          </div>
          <div className="hs-phone canvas" style={{ ['--b-bg' as string]: '#0b0b0b', ['--b-fg' as string]: '#f5f5f5', ['--b-soft' as string]: '#1a1a1a', ['--b-acc' as string]: '#00ff88', ['--b-on' as string]: '#000', ['--b-mute' as string]: '#b4b4b4', ['--b-hi' as string]: '#00ff88' }}>
            <div className="hp-art"><BrandArt seed={seedOf('Casa Arroyo noche')} letter="C" /></div>
            <p className="hp-name">{s.name}</p>
            <span className="site-btn sm">Abrir chat</span>
          </div>
          <p className="hs-tag">{s.tag} · {s.note}</p>
        </div>
      </div>

      <ul className="container hero-strip" aria-label="Qué incluye">
        {HERO.strip.map((t) => (<li key={t}>{t}</li>))}
      </ul>
    </section>
  );
}
