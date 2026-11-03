/* Cinta tipográfica: movimiento lento y continuo que da ritmo al corte entre secciones. Decorativa; se detiene con prefers-reduced-motion. */
export default function Ticker({ words, className = '' }: { words: string[]; className?: string }) {
  const row = words.map((w, i) => (<span key={i}>{w}<i /></span>));
  return (
    <div className={`ticker ${className}`} aria-hidden="true">
      <div className="tk-track">{row}{row}{row}{row}</div>
    </div>
  );
}
