import { PROCESS } from '@/data/content';

export default function ProcessSection() {
  return (
    <section id="proceso" className="section process" aria-labelledby="proc-h">
      <div className="container">
        <p className="eyebrow">{PROCESS.eyebrow}</p>
        <h2 id="proc-h" className="display reveal">{PROCESS.title}</h2>
        <ol className="timeline">
          {PROCESS.steps.map((s, i) => (
            <li className="tl-step reveal" key={s.title}>
              <span className="tl-node" aria-hidden="true" />
              <span className="idx">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="small tl-note">{PROCESS.note}</p>
      </div>
    </section>
  );
}
