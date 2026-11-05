import { CTA_SECTION, CONTACT } from '@/data/content';
import Ticker from '@/components/ui/Ticker';
import { DiagnosisMock } from '@/components/ui/Mocks';

export default function FinaleSection() {
  return (
    <section id="contacto" className="fin" aria-labelledby="cta-h">
      <div className="container fin-inner">
        <div className="fin-copy">
          <h2 id="cta-h" className="fin-h">{CTA_SECTION.title}</h2>
          <p className="fin-lede">{CTA_SECTION.description}</p>
          <p className="cta-row" data-hide-wa>
            <a className="btn btn-primary btn-lg" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{CTA_SECTION.submit}</a>
          </p>
          <p className="fin-micro">{CTA_SECTION.micro}</p>
        </div>
        <div className="fin-vis"><DiagnosisMock /></div>
      </div>
      <Ticker words={['Te encuentran', 'Pedir diagnóstico']} className="ticker-dark" />
    </section>
  );
}
