import { BELIEF } from '@/data/content';

export default function BeliefSection() {
  return (
    <section id="cambio" className="section on-paper belief" aria-labelledby="bel-h">
      <div className="container">
        <div className="head-2">
          <div>
            <p className="eyebrow">{BELIEF.eyebrow}</p>
            <h2 id="bel-h" className="display reveal">{BELIEF.title}</h2>
          </div>
          <p className="lede reveal">{BELIEF.body}</p>
        </div>

        <ol className="channels">
          {BELIEF.channels.map((c) => (
            <li className="channel reveal" key={c.n}>
              <span className="idx">{c.n}</span>
              <b className="channel-name">{c.name}</b>
              <p>{c.text}</p>
            </li>
          ))}
        </ol>
        <p className="statement reveal"><span className="node" aria-hidden="true" />{BELIEF.closing}</p>
      </div>
    </section>
  );
}
