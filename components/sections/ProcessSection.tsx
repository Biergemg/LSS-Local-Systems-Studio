import { PROCESS } from '@/data/content';

export default function ProcessSection() {
  return (
    <section id="proceso" className="section process" aria-labelledby="proc-h">
      <div className="container">
        <p className="eyebrow">{PROCESS.eyebrow}</p>
        <h2 id="proc-h" className="display reveal">{PROCESS.title}</h2>
      </div>
      <ol className="steps container" aria-label="Pasos del proceso">
        {PROCESS.steps.map((s, i) => (
          <li className="step reveal" key={s.title}>
            <span className="step-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="container"><p className="small">{PROCESS.note}</p></div>
    </section>
  );
}
