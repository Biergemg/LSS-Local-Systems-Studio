import { NAV_LINKS, PROCESS } from '@/data/content';

/* Sala de lectura 2 · cómo trabajamos (papel crema: reposo después de la toma nocturna). */
export default function ProcessSection() {
  return (
    <section id="proceso" className="room room-paper" aria-labelledby="h-proceso">
      <div className="wrap">
        <p className="k"><i aria-hidden="true" />{NAV_LINKS[1].label}</p>
        <h2 id="h-proceso" className="t-room">{PROCESS.title}</h2>
        <ol className="steps">
          {PROCESS.steps.map((s, i) => (
            <li className="step" key={s.title}>
              <span className="step-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <ul className="assure">
          {PROCESS.assurances.map((a) => (<li key={a}>{a}</li>))}
        </ul>
      </div>
    </section>
  );
}
