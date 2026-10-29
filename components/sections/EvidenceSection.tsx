import { EVIDENCE, CONTACT } from '@/data/content';

export default function EvidenceSection() {
  return (
    <section id="entrega" className="section on-paper" aria-labelledby="ev-h">
      <div className="container">
        <div className="split">
          <div>
            <p className="eyebrow">{EVIDENCE.eyebrow}</p>
            <h2 id="ev-h" className="h2">{EVIDENCE.title}</h2>
          </div>
          <p className="lede">{EVIDENCE.body}</p>
        </div>
        <p className="badge" style={{ marginTop: 28, display: "block", fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--warn)" }}>{EVIDENCE.badge}</p>
        <ul className="proofs" style={{ marginTop: 12 }}>
          {EVIDENCE.items.map((it) => (
            <li className="proof" key={it.title}>
              <b>{it.title}</b>
              <span className="muted" style={{ fontSize: 15 }}>{it.text}</span>
            </li>
          ))}
        </ul>
        <p className="small" style={{ marginTop: 20, maxWidth: '70ch' }}>{EVIDENCE.note}</p>
        <p style={{ marginTop: 24 }}>
          <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{EVIDENCE.cta}</a>
        </p>
      </div>
    </section>
  );
}
