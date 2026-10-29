import { BELIEF, QUESTIONS } from '@/data/content';

export default function BeliefSection() {
  return (
    <section id="cambio" className="section on-paper manifesto" aria-labelledby="bel-h">
      <div className="container">
        <p className="eyebrow">{BELIEF.eyebrow}</p>
        <h2 id="bel-h" className="display reveal">{BELIEF.title}</h2>
        <p className="lede reveal">{BELIEF.body}</p>

        <ol className="scenes">
          {BELIEF.scenes.map((s) => (
            <li className="scene reveal" key={s.n}>
              <span className="scene-n" aria-hidden="true">{s.n}</span>
              <b>{s.channel}</b>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="serif-line reveal">{BELIEF.closing}</p>

        <div className="questions">
          <p className="eyebrow">{QUESTIONS.eyebrow}</p>
          <h3 className="h2">{QUESTIONS.title}</h3>
          <ul className="q-list">
            {QUESTIONS.items.map((q, i) => (
              <li className="q-row reveal" key={q.q}>
                <span className="q-i" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h4>{q.q}</h4>
                <p>{q.a}</p>
              </li>
            ))}
          </ul>
          <p className="serif-line reveal">{QUESTIONS.closing}</p>
        </div>
      </div>
    </section>
  );
}
