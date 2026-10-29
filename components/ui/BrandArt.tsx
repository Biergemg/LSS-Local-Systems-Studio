/* Ilustración generativa original de LSS (SVG propio, sin recursos de terceros).
   Toma colores de las variables --b-* del contenedor. */

export function seedOf(text: string): number {
  let h = 7;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) % 9973;
  return h;
}

export default function BrandArt({ seed, letter }: { seed: number; letter: string }) {
  const a = 40 + (seed % 60);
  const b = 70 + ((seed >> 2) % 50);
  const r = 34 + (seed % 26);
  const tilt = (seed % 7) - 3;
  return (
    <svg className="art" viewBox="0 0 200 240" role="presentation" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect x="0" y="0" width="200" height="240" fill="var(--b-soft)" />
      <path d={`M${a} 240 V110 a${b / 2 + 20} ${b / 2 + 20} 0 0 1 ${b + 40} 0 V240 Z`} fill="var(--b-acc)" opacity="0.92" transform={`rotate(${tilt} 100 240)`} />
      <circle cx={150 - (seed % 30)} cy={58 + (seed % 20)} r={r} fill="var(--b-hi)" opacity="0.9" />
      <circle cx={150 - (seed % 30)} cy={58 + (seed % 20)} r={r + 14} fill="none" stroke="var(--b-fg)" strokeWidth="0.8" opacity="0.5" />
      <path d="M0 196 H200 M0 208 H200" stroke="var(--b-fg)" strokeWidth="0.6" opacity="0.35" />
      <text x="100" y="206" textAnchor="middle" fontFamily="var(--font-instrument-serif), serif" fontStyle="italic" fontSize="96" fill="var(--b-on)">{letter}</text>
    </svg>
  );
}
