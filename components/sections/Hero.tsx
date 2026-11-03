import { HERO, CONTACT } from '@/data/content';
import Viewfinder from '@/components/ui/Viewfinder';

export default function Hero() {
  return (
    <section id="inicio" className="hx" aria-labelledby="h1">
      <div className="container hx-inner">
        <div className="hx-copy">
        <h1 id="h1" className="hx-h1">
          <span className="ln"><span>{HERO.pre}</span></span>{' '}
          <span className="ln"><span><span className="focus"><em>{HERO.em}</em><i className="vf vf-tl" /><i className="vf vf-tr" /><i className="vf vf-bl" /><i className="vf vf-br" /></span></span></span>{' '}
          <span className="ln"><span>{HERO.post}</span></span>
        </h1>
        <p className="hx-lede">{HERO.body}</p>
        <div className="hx-cta">
          <a className="btn btn-primary btn-lg" data-hide-wa href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{HERO.ctaPrimary}</a>
          <a className="link-line" href="#proceso">{HERO.ctaSecondary}</a>
        </div>
        <p className="hx-micro">{HERO.micro}</p>
        </div>
        <Viewfinder />
      </div>
    </section>
  );
}
