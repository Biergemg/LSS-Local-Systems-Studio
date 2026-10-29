import { BELIEF, QUESTIONS } from '@/data/content';

export default function BeliefSection() {
  return (
    <>
      <section id="cambio" className="section on-raised" aria-labelledby="belief-h">
        <div className="container">
          <div className="split">
            <div>
              <p className="eyebrow">{BELIEF.eyebrow}</p>
              <h2 id="belief-h" className="h2">{BELIEF.title}</h2>
            </div>
            <p className="lede">{BELIEF.body}</p>
          </div>
          <ul className="scenes">
            {BELIEF.scenes.map((s) => (
              <li className="scene" key={s.channel}>
                <b>{s.channel}</b>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
          <p className="closing">{BELIEF.closing}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="q-h">
        <div className="container">
          <p className="eyebrow">{QUESTIONS.eyebrow}</p>
          <h2 id="q-h" className="h2" style={{ maxWidth: '22ch' }}>{QUESTIONS.title}</h2>
          <ol className="q-grid">
            {QUESTIONS.items.map((it, i) => (
              <li className="q-card" key={it.q}>
                <span className="num" aria-hidden="true">0{i + 1}</span>
                <h3>{it.q}</h3>
                <p>{it.a}</p>
              </li>
            ))}
          </ol>
          <p className="closing">{QUESTIONS.closing}</p>
        </div>
      </section>
    </>
  );
}
