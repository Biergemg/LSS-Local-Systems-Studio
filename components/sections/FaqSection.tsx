import { FAQ_ITEMS } from '@/data/content';

export default function FaqSection() {
  return (
    <section id="preguntas" className="fq" aria-labelledby="faq-h">
      <div className="container fq-wrap">
        <div>
          <h2 id="faq-h" className="fq-h">Antes de escribirnos.</h2>
        </div>
        <div className="fq-list">
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
