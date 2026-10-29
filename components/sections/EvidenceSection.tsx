import { EVIDENCE, CONTACT } from '@/data/content';

function Glyph({ kind }: { kind: string }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  return (
    <svg viewBox="0 0 120 90" className="glyph" aria-hidden="true">
      {kind === 'phone' && (<g {...p}><rect x="42" y="8" width="36" height="74" rx="7" /><path d="M52 16h16M50 34h20M50 44h20M50 54h12" /><circle cx="60" cy="72" r="3" /></g>)}
      {kind === 'chat' && (<g {...p}><path d="M20 20h56a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H44l-14 12V54h-10a6 6 0 0 1-6-6V26a6 6 0 0 1 6-6Z" /><path d="M32 33h40M32 43h24" /><path d="M86 38h14a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6h-6v10l-12-10H70" /></g>)}
      {kind === 'list' && (<g {...p}><rect x="26" y="10" width="68" height="70" rx="6" /><path d="M38 28l5 5 9-10M60 28h24M38 48l5 5 9-10M60 48h24M38 68l5 5 9-10M60 68h24" /></g>)}
      {kind === 'key' && (<g {...p}><circle cx="42" cy="45" r="16" /><path d="M58 45h40M84 45v12M96 45v8" /></g>)}
      {kind === 'map' && (<g {...p}><path d="M60 78S34 56 34 36a26 26 0 0 1 52 0c0 20-26 42-26 42Z" /><circle cx="60" cy="36" r="9" /></g>)}
    </svg>
  );
}

export default function EvidenceSection() {
  return (
    <section id="entrega" className="section on-paper evidence" aria-labelledby="ev-h">
      <div className="container">
        <div className="split">
          <div>
            <p className="eyebrow">{EVIDENCE.eyebrow}</p>
            <h2 id="ev-h" className="display reveal">{EVIDENCE.title}</h2>
          </div>
          <p className="lede reveal">{EVIDENCE.body}</p>
        </div>
        <ul className="proofs">
          {EVIDENCE.items.map((it, i) => (
            <li className={`proof reveal p${i + 1}`} key={it.title}>
              <Glyph kind={it.kind} />
              <b>{it.title}</b>
              <span>{it.text}</span>
            </li>
          ))}
        </ul>
        <p className="small note">{EVIDENCE.note}</p>
        <p className="cta-row" data-hide-wa>
          <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{EVIDENCE.cta}</a>
        </p>
      </div>
    </section>
  );
}
