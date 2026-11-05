import { HERO, CONTACT } from '@/data/content';
import HeroTitle from '@/components/ui/HeroTitle';
import Ticker from '@/components/ui/Ticker';
import { ChatMock, Phone } from '@/components/ui/Mocks';

export default function Hero() {
  return (
    <section id="inicio" className="hx" aria-labelledby="h1">
      <div className="container hx-inner">
        <HeroTitle pre={HERO.pre} em={HERO.em} post={HERO.post} />
        <div className="hx-row">
          <p className="hx-lede">{HERO.body}</p>
          <div className="hx-act">
            <div className="hx-cta">
              <a className="btn btn-primary btn-lg" data-hide-wa href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{HERO.ctaPrimary}</a>
              <a className="link-line" href="#proceso">{HERO.ctaSecondary}</a>
            </div>
            <ul className="hx-ticks">
              {HERO.ticks.map((t) => (<li key={t}>{t}</li>))}
            </ul>
          </div>
        </div>
        <div className="hx-visual">
          <Phone caption="Ejemplo ilustrativo: una conversación de WhatsApp guiada."><ChatMock /></Phone>
        </div>
      </div>
      <Ticker words={HERO.ticker} />
    </section>
  );
}
