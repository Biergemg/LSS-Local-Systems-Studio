import { SERVICE as S, CONTACT, NAV_LINKS, waLink } from '@/data/content';

/* Sala de lectura 1 · qué incluye. Textos y destinos de WhatsApp del sitio oficial. */
export default function ServiceSection() {
  return (
    <section id="servicio" className="room room-dark" aria-labelledby="h-servicio">
      <div className="wrap">
        <p className="k"><i aria-hidden="true" />{NAV_LINKS[0].label}</p>
        <h2 id="h-servicio" className="t-room">{S.title}</h2>
        <ol className="svc">
          {S.items.map((i) => (
            <li className="svc-row" key={i.n}>
              <span className="svc-n" aria-hidden="true">{i.n}</span>
              <h3>{i.t}</h3>
              <p>{i.d}</p>
              <a
                className="svc-cta"
                aria-label={`${S.rowCta}: ${i.t}`}
                href={waLink(`DIAGNÓSTICO. Me interesa: ${i.t}. Nombre: ___ | Ciudad: ___ | Tipo de negocio: ___ | Mi Google o Instagram: ___`)}
                target="_blank"
                rel="noopener noreferrer"
              >{S.rowCta} <i aria-hidden="true">→</i></a>
            </li>
          ))}
        </ol>
        <div className="room-foot">
          <p className="note">{S.note}</p>
          <p data-hide-wa><a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{S.cta}</a></p>
        </div>
      </div>
    </section>
  );
}
