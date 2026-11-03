import { PERCEPTION as P } from '@/data/content';

/* Ilustración del recorrido de un cliente nuevo: búsqueda → página → conversación.
   Maquetada en HTML/CSS con textos de ejemplo; no representa a un cliente real. */
export default function PerceptionSection() {
  return (
    <section id="percepcion" className="section on-paper percep" aria-labelledby="per-h">
      <div className="container">
        <div className="head-2">
          <div>
            <p className="eyebrow">{P.eyebrow}</p>
            <h2 id="per-h" className="display reveal">{P.title}</h2>
          </div>
          <p className="lede reveal">{P.body}</p>
        </div>

        <figure className="journey reveal" aria-label={P.caption}>
          <div className="journey-grid">
            <div className="screen" aria-hidden="true">
              <span className="screen-tag"><b>{P.frames[0].n}</b>{P.frames[0].t}</span>
              <div className="ui-search"><i className="ui-glass" />tu negocio</div>
              <div className="ui-result">
                <b>Tu negocio</b>
                <span>Servicio principal · Tu ciudad</span>
                <div className="ui-pills"><i>Horarios</i><i>Teléfono</i><i>Sitio web</i></div>
              </div>
              <div className="ui-line w80" /><div className="ui-line w55" />
            </div>

            <div className="screen screen-page" aria-hidden="true">
              <span className="screen-tag"><b>{P.frames[1].n}</b>{P.frames[1].t}</span>
              <div className="ui-bar"><i /><i /><i /></div>
              <div className="ui-hero-h">Lo que haces, explicado en una frase.</div>
              <div className="ui-line w80" /><div className="ui-line w65" />
              <div className="ui-cta">Escribir por WhatsApp</div>
              <div className="ui-cols"><i /><i /><i /></div>
            </div>

            <div className="screen screen-chat" aria-hidden="true">
              <span className="screen-tag"><b>{P.frames[2].n}</b>{P.frames[2].t}</span>
              <div className="ui-bubble in">Hola, vi tu página. ¿Me das una cotización?</div>
              <div className="ui-bubble out">Claro. Cuéntame qué necesitas.</div>
              <div className="ui-bubble in short">Es para el sábado.</div>
              <div className="ui-compose"><span>Escribe un mensaje</span></div>
            </div>
          </div>
          <figcaption>{P.caption}</figcaption>
        </figure>

        <p className="statement reveal"><span className="node" aria-hidden="true" />{P.closing}</p>
      </div>
    </section>
  );
}
