import { QUESTIONS } from '@/data/content';

export default function QuestionsSection() {
  return (
    <section id="preguntas-cliente" className="section on-paper questions" aria-labelledby="q-h">
      <div className="container">
        <p className="eyebrow">{QUESTIONS.eyebrow}</p>
        <h2 id="q-h" className="display reveal">{QUESTIONS.title}</h2>
        <ol className="q-list">
          {QUESTIONS.items.map((q, i) => (
            <li className="q-row reveal" key={q.q}>
              <span className="idx">{String(i + 1).padStart(2, '0')}</span>
              <h3>{q.q}</h3>
              <p>{q.a}</p>
            </li>
          ))}
        </ol>
        <p className="statement reveal"><span className="node" aria-hidden="true" />{QUESTIONS.closing}</p>
      </div>
    </section>
  );
}
