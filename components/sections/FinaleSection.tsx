import { CTA_SECTION, CONTACT } from '@/data/content';
import Mark from '@/components/ui/Mark';

export default function FinaleSection() {
  return (
    <section id="contacto" className="fin" aria-labelledby="cta-h">
      <Mark />
      <div className="container fin-inner">
        <h2 id="cta-h" className="fin-h">{CTA_SECTION.title}</h2>
        <p className="fin-lede">{CTA_SECTION.description}</p>
        <p className="cta-row" data-hide-wa>
          <a className="btn btn-primary btn-lg" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{CTA_SECTION.submit}</a>
        </p>
        <p className="fin-micro">{CTA_SECTION.micro}</p>
      </div>
    </section>
  );
}
