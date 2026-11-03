import { HERO, CONTACT } from '@/data/content';
import BrandBoard from '@/components/ui/BrandBoard';
import Ticker from '@/components/ui/Ticker';

export default function Hero() {
  return (
    <section id="inicio" className="hx" aria-labelledby="h1">
      <div className="container hx-inner">
        <div className="hx-copy">
          <h1 id="h1" className="hx-h1">
            <span className="ln"><span>{HERO.pre}</span></span>{' '}
            <span className="ln"><span><span className="mk">{HERO.em}</span></span></span>{' '}
            <span className="ln"><span>{HERO.post}</span></span>
          </h1>
          <p className="hx-lede">{HERO.body}</p>
          <div className="hx-cta">
            <a className="btn btn-primary btn-lg" data-hide-wa href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{HERO.ctaPrimary}</a>
            <a className="link-line" href="#proceso">{HERO.ctaSecondary}</a>
          </div>
          <ul className="hx-ticks">
            {HERO.ticks.map((t) => (<li key={t}>{t}</li>))}
          </ul>
        </div>
        <BrandBoard />
      </div>
      <Ticker words={HERO.ticker} />
    </section>
  );
}
