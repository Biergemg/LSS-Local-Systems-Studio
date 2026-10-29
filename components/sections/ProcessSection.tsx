import { PROCESS } from '@/data/content';

export default function ProcessSection() {
  return (
    <section id="proceso" className="section on-raised" aria-labelledby="proc-h">
      <div className="container">
        <p className="eyebrow">{PROCESS.eyebrow}</p>
        <h2 id="proc-h" className="h2" style={{ maxWidth: '22ch' }}>{PROCESS.title}</h2>
        <ol className="steps">
          {PROCESS.steps.map((s, i) => (
            <li className="step" key={s.title}>
              <span className="dot" aria-hidden="true">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="small" style={{ marginTop: 8, maxWidth: '64ch' }}>{PROCESS.note}</p>
      </div>
    </section>
  );
}
