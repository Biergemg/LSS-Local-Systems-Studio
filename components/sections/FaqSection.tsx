import Link from 'next/link';
import { FAQ_ITEMS, NAV_LINKS } from '@/data/content';

/* Sala de lectura 3 · preguntas. Acordeón nativo (details/summary): funciona sin JavaScript y con teclado. */
export default function FaqSection() {
  return (
    <section id="preguntas" className="room room-dark" aria-labelledby="h-faq">
      <div className="wrap faq-wrap">
        <div>
          <p className="k"><i aria-hidden="true" />{NAV_LINKS[2].label}</p>
          <h2 id="h-faq" className="t-room">Antes de escribirnos.</h2>
          <p className="faq-more"><Link className="link-line" href="/servicios/presencia-digital">Más respuestas antes de contratar</Link></p>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((f) => (
            <details key={f.question}>
              <summary>{f.question}</summary>
              <p className="ans">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
