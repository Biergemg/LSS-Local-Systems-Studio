import { CTA_SECTION, CONTACT } from '@/data/content';
import Fig from '@/components/ui/Fig';

/* Toma final · fotograma clave 6 (visor al fondo del pasillo). Sin fondo propio: deja ver el escenario fijo. */
export default function FinaleSection() {
  return (
    <section id="contacto" className="beat beat-final" data-kf="6" data-kf-final data-kf-zone aria-labelledby="h-contacto">
      <div className="beat-in">
        <div className="wrap">
          <Fig k={6} />
          <div className="beat-copy">
            <p className="k"><i aria-hidden="true" />Contacto</p>
            <h2 id="h-contacto" className="t-beat">{CTA_SECTION.title}</h2>
            <p className="lede">{CTA_SECTION.description}</p>
            <p className="actions" data-hide-wa>
              <a className="btn btn-primary btn-lg" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{CTA_SECTION.submit}</a>
              <a className="btn btn-ghost btn-lg" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
            <p className="micro">{CTA_SECTION.micro}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
