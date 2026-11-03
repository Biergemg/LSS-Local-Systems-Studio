import { PROCESS } from '@/data/content';

export default function ProcessSection() {
  return (
    <section id="proceso" className="pr" aria-labelledby="proc-h">
      <div className="container">
        <h2 id="proc-h" className="pr-h reveal">{PROCESS.title}</h2>
        <ol className="pr-steps">
          {PROCESS.steps.map((s, i) => (
            <li className="pr-step reveal" key={s.title}>
              <span className="pr-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <ul className="pr-band">
        {PROCESS.assurances.map((a) => (<li key={a}>{a}</li>))}
      </ul>
    </section>
  );
}
